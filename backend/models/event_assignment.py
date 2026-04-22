"""EventAssignment model - links events to venues and vendors."""

from datetime import datetime, timezone
from server import db


class EventAssignment(db.Model):
    __tablename__ = 'event_assignments'

    id = db.Column(db.Integer, primary_key=True)
    event_id = db.Column(db.Integer, db.ForeignKey('events.id'), nullable=False)
    venue_id = db.Column(db.Integer, db.ForeignKey('venues.id'), nullable=True)
    vendor_id = db.Column(db.Integer, db.ForeignKey('vendors.id'), nullable=True)
    status = db.Column(db.String(20), default='pending')  # pending, confirmed, rejected
    notes = db.Column(db.Text, nullable=True)
    assigned_at = db.Column(db.DateTime, default=lambda: datetime.now(timezone.utc))

    def to_dict(self):
        return {
            'id': self.id,
            'event_id': self.event_id,
            'event_title': self.event.title if self.event else None,
            'venue_id': self.venue_id,
            'venue_name': self.venue.name if self.venue else None,
            'vendor_id': self.vendor_id,
            'vendor_name': self.vendor.name if self.vendor else None,
            'status': self.status,
            'notes': self.notes,
            'assigned_at': self.assigned_at.isoformat() if self.assigned_at else None,
        }

    def __repr__(self):
        return f'<EventAssignment event={self.event_id}>'
