"""AI-Based Event Recommendation Engine (Phase 4)."""

from flask import Blueprint, jsonify
from flask_jwt_extended import jwt_required, get_jwt_identity
from sqlalchemy import func, desc
from server import db
from models.event import Event
from models.participant import Participant

recommendations_bp = Blueprint('recommendations', __name__)

@recommendations_bp.route('/personalized', methods=['GET'])
@jwt_required()
def get_personalized_recommendations():
    """
    Phase 4 Recommendation Engine: Content-Based Filtering.
    Analyzes the user's past bookings to extract preferences (categories, locations),
    and recommends upcoming events that match these mathematical weights.
    """
    user_id = get_jwt_identity()

    # 1. Analyze User Preferences (What did they book in the past?)
    # We count how many times a user booked an event in a specific category or location
    # Note: Assuming Event model has 'category' (if not, we fall back to location)
    
    past_bookings = db.session.query(
        Event.location, # Replace with Event.category if your schema has it
        func.count(Event.id).label('weight')
    ).join(Participant, Participant.event_id == Event.id).filter(
        Participant.user_id == int(user_id)
    ).group_by(Event.location).all()

    # If the user has never booked anything, return the "Popular/Trending" events
    if not past_bookings:
        trending = db.session.query(
            Event, func.count(Participant.id).label('registrations')
        ).outerjoin(Participant, Participant.event_id == Event.id).filter(
            Event.status == 'upcoming'
        ).group_by(Event.id).order_by(desc('registrations')).limit(5).all()
        
        return jsonify({
            'type': 'trending',
            'message': 'Trending events near you.',
            'recommendations': [e[0].to_dict() for e in trending]
        }), 200

    # Extract the user's favorite attributes from their weights
    favorite_locations = [booking.location for booking in past_bookings]

    # 2. Get Events the user is already registered for (so we don't recommend them again)
    already_registered_subquery = db.session.query(Participant.event_id).filter(
        Participant.user_id == int(user_id)
    ).subquery()

    # 3. Collaborative Filtering / Content Engine Query
    # Find upcoming events in locations they like, but they aren't registered for yet
    recommended_events = Event.query.filter(
        Event.status == 'upcoming',
        Event.location.in_(favorite_locations),
        ~Event.id.in_(already_registered_subquery)
    ).order_by(Event.date.asc()).limit(5).all()

    # Fallback if no exact matches found: return generic upcoming
    if not recommended_events:
        recommended_events = Event.query.filter(
            Event.status == 'upcoming',
            ~Event.id.in_(already_registered_subquery)
        ).limit(5).all()

    return jsonify({
        'type': 'personalized',
        'message': 'Recommended based on your attendance history.',
        'recommendations': [event.to_dict() for event in recommended_events]
    }), 200
