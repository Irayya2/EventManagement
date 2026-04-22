"""Venue model."""

from datetime import datetime, timezone
from server import db


class Venue(db.Model):
    __tablename__ = 'venues'

    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(200), nullable=False)
    location = db.Column(db.String(300), nullable=True)
    capacity = db.Column(db.Integer, default=0)
    description = db.Column(db.Text, nullable=True)
    amenities = db.Column(db.Text, nullable=True)
    contact_info = db.Column(db.String(200), nullable=True)
    price_per_day = db.Column(db.Float, default=0.0)
    is_available = db.Column(db.Boolean, default=True)
    created_at = db.Column(db.DateTime, default=lambda: datetime.now(timezone.utc))

    assignments = db.relationship('EventAssignment', backref='venue', lazy=True)

    def to_dict(self):
        return {
            'id': self.id,
            'name': self.name,
            'location': self.location,
            'capacity': self.capacity,
            'description': self.description,
            'amenities': self.amenities,
            'contact_info': self.contact_info,
            'price_per_day': self.price_per_day,
            'is_available': self.is_available,
            'created_at': self.created_at.isoformat() if self.created_at else None,
        }

    def __repr__(self):
        return f'<Venue {self.name}>'
