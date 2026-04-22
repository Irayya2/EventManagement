"""Participant model - tracks event registrations."""

from datetime import datetime, timezone
from server import db


class Participant(db.Model):
    __tablename__ = 'participants'

    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey('users.id'), nullable=False)
    event_id = db.Column(db.Integer, db.ForeignKey('events.id'), nullable=False)
    registration_date = db.Column(db.DateTime, default=lambda: datetime.now(timezone.utc))
    status = db.Column(db.String(20), default='registered')  # registered, attended, cancelled
    check_in_time = db.Column(db.DateTime, nullable=True)

    # Unique constraint: user can register once per event
    __table_args__ = (
        db.UniqueConstraint('user_id', 'event_id', name='unique_user_event'),
    )

    def to_dict(self):
        return {
            'id': self.id,
            'user_id': self.user_id,
            'event_id': self.event_id,
            'user_name': self.user.name if self.user else None,
            'user_email': self.user.email if self.user else None,
            'event_title': self.event.title if self.event else None,
            'registration_date': self.registration_date.isoformat() if self.registration_date else None,
            'status': self.status,
            'check_in_time': self.check_in_time.isoformat() if self.check_in_time else None,
        }

    def __repr__(self):
        return f'<Participant user={self.user_id} event={self.event_id}>'
