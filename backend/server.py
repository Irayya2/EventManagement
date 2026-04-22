"""
Event Management System - Flask Backend
Main application factory and configuration.
"""

import os
from datetime import timedelta
from flask import Flask
from flask_cors import CORS
from flask_jwt_extended import JWTManager
from flask_mail import Mail
from flask_sqlalchemy import SQLAlchemy
from flask_socketio import SocketIO
from dotenv import load_dotenv

load_dotenv()

# Initialize extensions
db = SQLAlchemy()
jwt = JWTManager()
mail = Mail()
socketio = SocketIO()

def create_app():
    """Application factory pattern."""
    app = Flask(__name__)

    # --- Configuration ---
    app.config['SECRET_KEY'] = os.getenv('SECRET_KEY', 'dev-secret')
    app.config['SQLALCHEMY_DATABASE_URI'] = os.getenv(
        'DATABASE_URL', 'sqlite:///event_management.db'
    )
    app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False

    # JWT Configuration
    app.config['JWT_SECRET_KEY'] = os.getenv('JWT_SECRET_KEY', 'jwt-dev-secret')
    app.config['JWT_ACCESS_TOKEN_EXPIRES'] = timedelta(hours=24)

    # Mail Configuration
    app.config['MAIL_SERVER'] = os.getenv('MAIL_SERVER', 'smtp.gmail.com')
    app.config['MAIL_PORT'] = int(os.getenv('MAIL_PORT', 587))
    app.config['MAIL_USE_TLS'] = os.getenv('MAIL_USE_TLS', 'True') == 'True'
    app.config['MAIL_USERNAME'] = os.getenv('MAIL_USERNAME', '')
    app.config['MAIL_PASSWORD'] = os.getenv('MAIL_PASSWORD', '')
    app.config['MAIL_DEFAULT_SENDER'] = os.getenv('MAIL_DEFAULT_SENDER', 'noreply@eventmanager.com')

    # --- Initialize Extensions ---
    db.init_app(app)
    jwt.init_app(app)
    mail.init_app(app)
    
    # Enable Real-Time WebSockets globally
    socketio.init_app(app, cors_allowed_origins="*")

    # CORS
    frontend_url = os.getenv('FRONTEND_URL', 'http://localhost:3000')
    CORS(app, resources={r"/api/*": {"origins": [frontend_url, "http://localhost:3000"]}},
         supports_credentials=True)

    # --- Register Blueprints ---
    from routes.auth import auth_bp
    from routes.users import users_bp
    from routes.events import events_bp
    from routes.payments import payments_bp
    from routes.venues import venues_bp
    from routes.vendors import vendors_bp
    from routes.reports import reports_bp
    from routes.notifications import notifications_bp
    from routes.recommendations import recommendations_bp

    app.register_blueprint(auth_bp, url_prefix='/api/auth')
    app.register_blueprint(users_bp, url_prefix='/api/users')
    app.register_blueprint(events_bp, url_prefix='/api/events')
    app.register_blueprint(payments_bp, url_prefix='/api/payments')
    app.register_blueprint(venues_bp, url_prefix='/api/venues')
    app.register_blueprint(vendors_bp, url_prefix='/api/vendors')
    app.register_blueprint(reports_bp, url_prefix='/api/reports')
    app.register_blueprint(notifications_bp, url_prefix='/api/notifications')
    app.register_blueprint(recommendations_bp, url_prefix='/api/recommendations')

    # Create tables
    with app.app_context():
        import models  # noqa: F401
        import socket_events # Load Real-Time Handlers
        db.create_all()

        # Seed default database values
        _seed_default_data(app)

    return app


def _seed_default_data(app):
    """Seed comprehensive default data for testing and development."""
    from models.user import User
    from models.venue import Venue
    from models.vendor import Vendor
    from models.event import Event
    from werkzeug.security import generate_password_hash
    from datetime import datetime, timedelta, timezone

    # 1. Seed Users (Admin, Organizer, Participant)
    roles = [
        {'email': 'admin@eventmanager.com', 'name': 'Admin User', 'role': 'admin'},
        {'email': 'organizer@eventmanager.com', 'name': 'Pro Organizer', 'role': 'organizer'},
        {'email': 'participant@eventmanager.com', 'name': 'John Doe', 'role': 'participant'}
    ]
    for r in roles:
        if not User.query.filter_by(email=r['email']).first():
            u = User(name=r['name'], email=r['email'], password_hash=generate_password_hash('password123'), role=r['role'], status='approved')
            db.session.add(u)
    db.session.commit()

    organizer = User.query.filter_by(email='organizer@eventmanager.com').first()

    # 2. Seed Default Venues
    if not Venue.query.first():
        v1 = Venue(name="Grand Convention Center", location="123 Tech Blvd, Silicon Valley", capacity=5000, price_per_day=5000.0, is_available=True)
        v2 = Venue(name="Riverside Workshop Space", location="45 Innovation Dr, Austin", capacity=150, price_per_day=800.0, is_available=True)
        db.session.add_all([v1, v2])
        db.session.commit()

    # 3. Seed Default Vendors
    if not Vendor.query.first():
        vd1 = Vendor(name="Elite Catering", service_type="food", contact_email="contact@elitecater.com", rating=4.8)
        vd2 = Vendor(name="A/V Tech Pros", service_type="equipment", contact_email="hello@avtech.com", rating=4.9)
        db.session.add_all([vd1, vd2])
        db.session.commit()

    # 4. Seed Default Events
    if organizer and not Event.query.first():
        now = datetime.now(timezone.utc)
        e1 = Event(title="Global Tech Summit 2026", description="The biggest technology conference of the year.", date=now + timedelta(days=30), location="Grand Convention Center", capacity=5000, ticket_price=299.99, status='upcoming', organizer_id=organizer.id)
        e2 = Event(title="AI & Machine Learning Workshop", description="Hands-on coding with neural networks.", date=now + timedelta(days=15), location="Riverside Workshop Space", capacity=100, ticket_price=49.99, status='upcoming', organizer_id=organizer.id)
        e3 = Event(title="Free Startup Networking Mixer", description="Meet local founders and investors.", date=now + timedelta(days=5), location="Downtown Rooftop", capacity=200, ticket_price=0.0, status='upcoming', organizer_id=organizer.id)
        db.session.add_all([e1, e2, e3])
        db.session.commit()
    
    print("✅ System Seeded: Default Users, Venues, Vendors, and Events injected successfully!")
