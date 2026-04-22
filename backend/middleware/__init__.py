"""Utility helpers for the backend."""

from functools import wraps
from flask import jsonify
from flask_jwt_extended import get_jwt_identity, verify_jwt_in_request
from models.user import User


def role_required(*roles):
    """Decorator to restrict access based on user roles."""
    def decorator(fn):
        @wraps(fn)
        def wrapper(*args, **kwargs):
            verify_jwt_in_request()
            user_id = get_jwt_identity()
            user = User.query.get(user_id)

            if not user:
                return jsonify({'error': 'User not found'}), 404

            if user.status != 'approved':
                return jsonify({'error': 'Account not approved'}), 403

            if user.role not in roles:
                return jsonify({'error': 'Insufficient permissions'}), 403

            return fn(*args, **kwargs)
        return wrapper
    return decorator


def generate_invoice_number():
    """Generate unique invoice number."""
    import uuid
    from datetime import datetime
    timestamp = datetime.now().strftime('%Y%m%d')
    unique = str(uuid.uuid4())[:8].upper()
    return f'INV-{timestamp}-{unique}'


def send_notification_email(user_email, subject, body):
    """Send email notification (fails silently if mail not configured)."""
    try:
        from flask_mail import Message
        from server import mail
        msg = Message(subject, recipients=[user_email])
        msg.html = body
        mail.send(msg)
        return True
    except Exception as e:
        print(f"⚠️ Email sending failed: {e}")
        return False
