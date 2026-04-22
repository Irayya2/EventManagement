"""Event model."""

from datetime import datetime, timezone
from server import db


class Event(db.Model):
    __tablename__ = 'events'

    id = db.Column(db.Integer, primary_key=True)
    title = db.Column(db.String(200), nullable=False)
    description = db.Column(db.Text, nullable=True)
    date = db.Column(db.DateTime, nullable=False)
    end_date = db.Column(db.DateTime, nullable=True)
    location = db.Column(db.String(200), nullable=True)
    capacity = db.Column(db.Integer, default=100)
    ticket_price = db.Column(db.Float, default=0.0)
    status = db.Column(db.String(20), default='upcoming')  # upcoming, ongoing, completed, cancelled
    image_url = db.Column(db.String(500), nullable=True)
    organizer_id = db.Column(db.Integer, db.ForeignKey('users.id'), nullable=False)
    created_at = db.Column(db.DateTime, default=lambda: datetime.now(timezone.utc))
    updated_at = db.Column(
        db.DateTime,
        default=lambda: datetime.now(timezone.utc),
        onupdate=lambda: datetime.now(timezone.utc)
    )

    # Relationships
    participants = db.relationship('Participant', backref='event', lazy=True, cascade='all, delete-orphan')
    payments = db.relationship('Payment', backref='event', lazy=True, cascade='all, delete-orphan')
    assignments = db.relationship('EventAssignment', backref='event', lazy=True, cascade='all, delete-orphan')

    def to_dict(self):
        return {
            'id': self.id,
            'title': self.title,
            'description': self.description,
            'date': self.date.isoformat() if self.date else None,
            'end_date': self.end_date.isoformat() if self.end_date else None,
            'location': self.location,
            'capacity': self.capacity,
            'ticket_price': self.ticket_price,
            'status': self.status,
            'image_url': self.image_url,
            'organizer_id': self.organizer_id,
            'organizer_name': self.organizer.name if self.organizer else None,
            'participant_count': len(self.participants),
            'created_at': self.created_at.isoformat() if self.created_at else None,
        }

    def __repr__(self):
        return f'<Event {self.title}>'
