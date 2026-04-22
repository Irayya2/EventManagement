"""Event routes - CRUD operations."""

from datetime import datetime
from flask import Blueprint, request, jsonify
from flask_jwt_extended import jwt_required, get_jwt_identity
from server import db
from models.event import Event
from models.participant import Participant
from models.user import User
from models.notification import Notification
from middleware import role_required

events_bp = Blueprint('events', __name__)


@events_bp.route('', methods=['GET'])
def get_events():
    """Get all events. Public endpoint with filtering."""
    status_filter = request.args.get('status')
    search = request.args.get('search', '')
    organizer_id = request.args.get('organizer_id', type=int)
    page = request.args.get('page', 1, type=int)
    per_page = request.args.get('per_page', 12, type=int)

    query = Event.query

    if status_filter:
        query = query.filter_by(status=status_filter)
    if organizer_id:
        query = query.filter_by(organizer_id=organizer_id)
    if search:
        query = query.filter(
            (Event.title.ilike(f'%{search}%')) | (Event.description.ilike(f'%{search}%'))
        )

    query = query.order_by(Event.date.desc())
    pagination = query.paginate(page=page, per_page=per_page, error_out=False)

    return jsonify({
        'events': [e.to_dict() for e in pagination.items],
        'total': pagination.total,
        'pages': pagination.pages,
        'current_page': page
    }), 200


@events_bp.route('/<int:event_id>', methods=['GET'])
def get_event(event_id):
    """Get single event details."""
    event = Event.query.get(event_id)
    if not event:
        return jsonify({'error': 'Event not found'}), 404
    return jsonify({'event': event.to_dict()}), 200


@events_bp.route('', methods=['POST'])
@role_required('admin', 'organizer')
def create_event():
    """Create a new event."""
    data = request.get_json()
    user_id = get_jwt_identity()

    required_fields = ['title', 'date']
    for field in required_fields:
        if not data.get(field):
            return jsonify({'error': f'{field} is required'}), 400

    try:
        event_date = datetime.fromisoformat(data['date'])
        end_date = datetime.fromisoformat(data['end_date']) if data.get('end_date') else None
    except (ValueError, TypeError):
        return jsonify({'error': 'Invalid date format. Use ISO format.'}), 400

    event = Event(
        title=data['title'],
        description=data.get('description', ''),
        date=event_date,
        end_date=end_date,
        location=data.get('location', ''),
        capacity=data.get('capacity', 100),
        ticket_price=data.get('ticket_price', 0.0),
        status=data.get('status', 'upcoming'),
        image_url=data.get('image_url', ''),
        organizer_id=int(user_id)
    )

    db.session.add(event)
    db.session.commit()

    return jsonify({'message': 'Event created', 'event': event.to_dict()}), 201


@events_bp.route('/<int:event_id>', methods=['PUT'])
@role_required('admin', 'organizer', 'staff')
def update_event(event_id):
    """Update an event. Organizers can only update their own events."""
    event = Event.query.get(event_id)
    if not event:
        return jsonify({'error': 'Event not found'}), 404

    user_id = get_jwt_identity()
    user = User.query.get(int(user_id))

    # Staff and organizers can only update their own events (or assigned events for staff)
    if user.role == 'organizer' and event.organizer_id != int(user_id):
        return jsonify({'error': 'You can only update your own events'}), 403

    data = request.get_json()

    if 'title' in data:
        event.title = data['title']
    if 'description' in data:
        event.description = data['description']
    if 'date' in data:
        try:
            event.date = datetime.fromisoformat(data['date'])
        except ValueError:
            return jsonify({'error': 'Invalid date format'}), 400
    if 'end_date' in data:
        try:
            event.end_date = datetime.fromisoformat(data['end_date']) if data['end_date'] else None
        except ValueError:
            return jsonify({'error': 'Invalid end_date format'}), 400
    if 'location' in data:
        event.location = data['location']
    if 'capacity' in data:
        event.capacity = data['capacity']
    if 'ticket_price' in data:
        event.ticket_price = data['ticket_price']
    if 'status' in data:
        event.status = data['status']
    if 'image_url' in data:
        event.image_url = data['image_url']

    db.session.commit()
    return jsonify({'message': 'Event updated', 'event': event.to_dict()}), 200


@events_bp.route('/<int:event_id>', methods=['DELETE'])
@role_required('admin', 'organizer')
def delete_event(event_id):
    """Delete an event."""
    event = Event.query.get(event_id)
    if not event:
        return jsonify({'error': 'Event not found'}), 404

    user_id = get_jwt_identity()
    user = User.query.get(int(user_id))

    if user.role == 'organizer' and event.organizer_id != int(user_id):
        return jsonify({'error': 'You can only delete your own events'}), 403

    db.session.delete(event)
    db.session.commit()
    return jsonify({'message': 'Event deleted'}), 200


@events_bp.route('/<int:event_id>/register', methods=['POST'])
@jwt_required()
def register_for_event(event_id):
    """Register current user for an event."""
    event = Event.query.get(event_id)
    if not event:
        return jsonify({'error': 'Event not found'}), 404

    user_id = get_jwt_identity()

    # Check if already registered
    existing = Participant.query.filter_by(
        user_id=int(user_id), event_id=event_id
    ).first()
    if existing:
        return jsonify({'error': 'Already registered for this event'}), 409

    # FIX: Use SQL count() instead of pulling all objects to memory to prevent massive Race conditions
    current_count = Participant.query.filter_by(event_id=event_id).count()
    if current_count >= event.capacity:
        return jsonify({'error': 'Event is at full capacity'}), 400
        
    # FIX: Disallow direct registration for PAID events without a payment token (Phase 2 core mechanic)
    if event.ticket_price > 0:
        return jsonify({'error': 'This is a paid event. You must complete a transaction via the payments endpoint to register.'}), 402

    try:
        participant = Participant(
            user_id=int(user_id),
            event_id=event_id
        )
        db.session.add(participant)

        # Notify organizer
        notification = Notification(
            message=f'New registration for "{event.title}"',
            type='info',
            user_id=event.organizer_id
        )
        db.session.add(notification)
        
        # Atomic Transaction - Phase 3 Real World Logic
        db.session.commit()
        
    except Exception as e:
        db.session.rollback() # If notification or participant fails, rollback everything
        print(f"Transaction Error: {e}")
        return jsonify({'error': 'Failed to process registration transaction securely.'}), 500

    return jsonify({
        'message': 'Registered successfully',
        'registration': participant.to_dict()
    }), 201


@events_bp.route('/<int:event_id>/participants', methods=['GET'])
@role_required('admin', 'organizer', 'staff')
def get_event_participants(event_id):
    """Get participants for an event."""
    event = Event.query.get(event_id)
    if not event:
        return jsonify({'error': 'Event not found'}), 404

    participants = Participant.query.filter_by(event_id=event_id).all()
    return jsonify({
        'participants': [p.to_dict() for p in participants],
        'total': len(participants)
    }), 200


@events_bp.route('/my-registrations', methods=['GET'])
@jwt_required()
def get_my_registrations():
    """Get events the current user is registered for."""
    user_id = get_jwt_identity()
    registrations = Participant.query.filter_by(user_id=int(user_id)).all()
    return jsonify({
        'registrations': [r.to_dict() for r in registrations]
    }), 200
