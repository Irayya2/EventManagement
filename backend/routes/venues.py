"""Venue routes - CRUD operations."""

from flask import Blueprint, request, jsonify
from server import db
from models.venue import Venue
from middleware import role_required

venues_bp = Blueprint('venues', __name__)


@venues_bp.route('', methods=['GET'])
def get_venues():
    """Get all venues."""
    available_only = request.args.get('available', type=bool)
    search = request.args.get('search', '')

    query = Venue.query
    if available_only:
        query = query.filter_by(is_available=True)
    if search:
        query = query.filter(
            (Venue.name.ilike(f'%{search}%')) | (Venue.location.ilike(f'%{search}%'))
        )

    venues = query.order_by(Venue.created_at.desc()).all()
    return jsonify({'venues': [v.to_dict() for v in venues]}), 200


@venues_bp.route('/<int:venue_id>', methods=['GET'])
def get_venue(venue_id):
    """Get single venue."""
    venue = Venue.query.get(venue_id)
    if not venue:
        return jsonify({'error': 'Venue not found'}), 404
    return jsonify({'venue': venue.to_dict()}), 200


@venues_bp.route('', methods=['POST'])
@role_required('admin', 'organizer')
def create_venue():
    """Create a new venue."""
    data = request.get_json()

    if not data.get('name'):
        return jsonify({'error': 'name is required'}), 400

    venue = Venue(
        name=data['name'],
        location=data.get('location', ''),
        capacity=data.get('capacity', 0),
        description=data.get('description', ''),
        amenities=data.get('amenities', ''),
        contact_info=data.get('contact_info', ''),
        price_per_day=data.get('price_per_day', 0.0),
        is_available=data.get('is_available', True)
    )

    db.session.add(venue)
    db.session.commit()
    return jsonify({'message': 'Venue created', 'venue': venue.to_dict()}), 201


@venues_bp.route('/<int:venue_id>', methods=['PUT'])
@role_required('admin', 'organizer')
def update_venue(venue_id):
    """Update venue."""
    venue = Venue.query.get(venue_id)
    if not venue:
        return jsonify({'error': 'Venue not found'}), 404

    data = request.get_json()
    for field in ['name', 'location', 'capacity', 'description', 'amenities',
                  'contact_info', 'price_per_day', 'is_available']:
        if field in data:
            setattr(venue, field, data[field])

    db.session.commit()
    return jsonify({'message': 'Venue updated', 'venue': venue.to_dict()}), 200


@venues_bp.route('/<int:venue_id>', methods=['DELETE'])
@role_required('admin', 'organizer')
def delete_venue(venue_id):
    """Delete venue."""
    venue = Venue.query.get(venue_id)
    if not venue:
        return jsonify({'error': 'Venue not found'}), 404

    db.session.delete(venue)
    db.session.commit()
    return jsonify({'message': 'Venue deleted'}), 200
