"""Reports & analytics routes."""

from flask import Blueprint, jsonify, request
from sqlalchemy import func
from server import db
from models.event import Event
from models.payment import Payment
from models.participant import Participant
from models.user import User
from middleware import role_required

reports_bp = Blueprint('reports', __name__)


@reports_bp.route('/financial', methods=['GET'])
@role_required('admin', 'organizer')
def financial_report():
    """Get financial report - revenue per event and totals."""
    event_id = request.args.get('event_id', type=int)

    if event_id:
        payments = Payment.query.filter_by(event_id=event_id).all()
        total_revenue = sum(p.amount for p in payments if p.status == 'completed')
        pending_amount = sum(p.amount for p in payments if p.status == 'pending')

        return jsonify({
            'event_id': event_id,
            'total_revenue': total_revenue,
            'pending_amount': pending_amount,
            'total_payments': len(payments),
            'payments': [p.to_dict() for p in payments]
        }), 200

    # Overall financial summary
    revenue_by_event = db.session.query(
        Event.id,
        Event.title,
        func.coalesce(func.sum(Payment.amount), 0).label('total_revenue'),
        func.count(Payment.id).label('payment_count')
    ).outerjoin(Payment, (Payment.event_id == Event.id) & (Payment.status == 'completed')
    ).group_by(Event.id, Event.title).all()

    total_revenue = db.session.query(
        func.coalesce(func.sum(Payment.amount), 0)
    ).filter(Payment.status == 'completed').scalar()

    total_pending = db.session.query(
        func.coalesce(func.sum(Payment.amount), 0)
    ).filter(Payment.status == 'pending').scalar()

    return jsonify({
        'total_revenue': float(total_revenue),
        'total_pending': float(total_pending),
        'events': [
            {
                'event_id': r[0],
                'event_title': r[1],
                'total_revenue': float(r[2]),
                'payment_count': r[3]
            }
            for r in revenue_by_event
        ]
    }), 200


@reports_bp.route('/registrations', methods=['GET'])
@role_required('admin', 'organizer')
def registration_report():
    """Get registration statistics."""
    registrations_by_event = db.session.query(
        Event.id,
        Event.title,
        Event.capacity,
        func.count(Participant.id).label('registered_count')
    ).outerjoin(Participant, Participant.event_id == Event.id
    ).group_by(Event.id, Event.title, Event.capacity).all()

    total_registrations = db.session.query(func.count(Participant.id)).scalar()

    return jsonify({
        'total_registrations': total_registrations,
        'events': [
            {
                'event_id': r[0],
                'event_title': r[1],
                'capacity': r[2],
                'registered': r[3],
                'fill_rate': round((r[3] / r[2] * 100) if r[2] > 0 else 0, 1)
            }
            for r in registrations_by_event
        ]
    }), 200


@reports_bp.route('/dashboard', methods=['GET'])
@role_required('admin', 'organizer')
def dashboard_stats():
    """Get dashboard overview statistics."""
    total_users = User.query.count()
    pending_users = User.query.filter_by(status='pending').count()
    total_events = Event.query.count()
    upcoming_events = Event.query.filter_by(status='upcoming').count()
    total_registrations = Participant.query.count()
    total_revenue = db.session.query(
        func.coalesce(func.sum(Payment.amount), 0)
    ).filter(Payment.status == 'completed').scalar()

    # Users by role
    users_by_role = db.session.query(
        User.role, func.count(User.id)
    ).group_by(User.role).all()

    # Recent registrations
    recent_registrations = Participant.query.order_by(
        Participant.registration_date.desc()
    ).limit(10).all()

    # Recent payments
    recent_payments = Payment.query.order_by(
        Payment.created_at.desc()
    ).limit(10).all()

    return jsonify({
        'total_users': total_users,
        'pending_users': pending_users,
        'total_events': total_events,
        'upcoming_events': upcoming_events,
        'total_registrations': total_registrations,
        'total_revenue': float(total_revenue),
        'users_by_role': {r[0]: r[1] for r in users_by_role},
        'recent_registrations': [r.to_dict() for r in recent_registrations],
        'recent_payments': [p.to_dict() for p in recent_payments]
    }), 200
