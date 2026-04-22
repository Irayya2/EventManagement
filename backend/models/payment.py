"""Payment model - tracks online and offline payments."""

from datetime import datetime, timezone
from server import db


class Payment(db.Model):
    __tablename__ = 'payments'

    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey('users.id'), nullable=False)
    event_id = db.Column(db.Integer, db.ForeignKey('events.id'), nullable=False)
    amount = db.Column(db.Float, nullable=False)
    payment_method = db.Column(db.String(30), default='online')  # online, offline, bank_transfer
    status = db.Column(db.String(20), default='pending')  # pending, completed, failed, refunded
    transaction_id = db.Column(db.String(100), nullable=True)
    invoice_number = db.Column(db.String(50), nullable=True)
    notes = db.Column(db.Text, nullable=True)
    payment_date = db.Column(db.DateTime, default=lambda: datetime.now(timezone.utc))
    created_at = db.Column(db.DateTime, default=lambda: datetime.now(timezone.utc))

    def to_dict(self):
        return {
            'id': self.id,
            'user_id': self.user_id,
            'event_id': self.event_id,
            'user_name': self.user.name if self.user else None,
            'event_title': self.event.title if self.event else None,
            'amount': self.amount,
            'payment_method': self.payment_method,
            'status': self.status,
            'transaction_id': self.transaction_id,
            'invoice_number': self.invoice_number,
            'notes': self.notes,
            'payment_date': self.payment_date.isoformat() if self.payment_date else None,
        }

    def __repr__(self):
        return f'<Payment {self.id} - {self.amount}>'
