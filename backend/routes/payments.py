"""Payment routes - create, list, track payments."""

from flask import Blueprint, request, jsonify
from flask_jwt_extended import jwt_required, get_jwt_identity
from server import db
from models.payment import Payment
from models.event import Event
from models.user import User
from models.notification import Notification
from middleware import role_required, generate_invoice_number, send_notification_email

payments_bp = Blueprint('payments', __name__)


@payments_bp.route('', methods=['GET'])
@jwt_required()
def get_payments():
    """Get payments. Admin sees all, users see their own."""
    user_id = get_jwt_identity()
    user = User.query.get(int(user_id))

    page = request.args.get('page', 1, type=int)
    per_page = request.args.get('per_page', 20, type=int)
    status_filter = request.args.get('status')
    event_id = request.args.get('event_id', type=int)

    if user.role in ['admin', 'organizer']:
        query = Payment.query
    else:
        query = Payment.query.filter_by(user_id=int(user_id))

    if status_filter:
        query = query.filter_by(status=status_filter)
    if event_id:
        query = query.filter_by(event_id=event_id)

    query = query.order_by(Payment.created_at.desc())
    pagination = query.paginate(page=page, per_page=per_page, error_out=False)

    return jsonify({
        'payments': [p.to_dict() for p in pagination.items],
        'total': pagination.total,
        'pages': pagination.pages,
        'current_page': page
    }), 200


@payments_bp.route('', methods=['POST'])
@jwt_required()
def create_payment():
    """Create a new payment record."""
    data = request.get_json()
    user_id = get_jwt_identity()

    required_fields = ['event_id']
    for field in required_fields:
        if not data.get(field):
            return jsonify({'error': f'{field} is required'}), 400

    event = Event.query.get(data['event_id'])
    if not event:
        return jsonify({'error': 'Event not found'}), 404

    # FIX: Never trust client-provided amounts! Pull directly from DB.
    payment = Payment(
        user_id=int(user_id),
        event_id=data['event_id'],
        amount=event.ticket_price, 
        payment_method=data.get('payment_method', 'online'),
        status=data.get('status', 'pending'),
        transaction_id=data.get('transaction_id'),
        invoice_number=generate_invoice_number(),
        notes=data.get('notes', '')
    )

    try:
        db.session.add(payment)
        
        # Notify user
        notification = Notification(
            message=f'Payment of ${payment.amount:.2f} recorded for "{event.title}". Invoice: {payment.invoice_number}',
            type='success',
            user_id=int(user_id)
        )
        db.session.add(notification)
        
        # Atomic Transaction Validation
        db.session.commit()
    except Exception as e:
        db.session.rollback()
        print(f"Transaction Error: {e}")
        return jsonify({'error': 'Payment transaction failed on the database level.'}), 500

    # Send invoice email
    user = User.query.get(int(user_id))
    send_notification_email(
        user.email,
        f'Payment Confirmation - {event.title}',
        f'''
        <h2>Payment Confirmation</h2>
        <p>Invoice: <strong>{payment.invoice_number}</strong></p>
        <p>Event: {event.title}</p>
        <p>Amount: ${payment.amount:.2f}</p>
        <p>Method: {payment.payment_method}</p>
        <p>Status: {payment.status}</p>
        '''
    )

    return jsonify({
        'message': 'Payment recorded',
        'payment': payment.to_dict()
    }), 201


@payments_bp.route('/<int:payment_id>', methods=['PUT'])
@role_required('admin', 'organizer')
def update_payment(payment_id):
    """Update payment status (admin/organizer only)."""
    payment = Payment.query.get(payment_id)
    if not payment:
        return jsonify({'error': 'Payment not found'}), 404

    data = request.get_json()

    if 'status' in data:
        payment.status = data['status']
    if 'notes' in data:
        payment.notes = data['notes']
    if 'payment_method' in data:
        payment.payment_method = data['payment_method']

    db.session.commit()

    # Notify user about status change
    notification = Notification(
        message=f'Payment {payment.invoice_number} status updated to: {payment.status}',
        type='info',
        user_id=payment.user_id
    )
    db.session.add(notification)
    db.session.commit()

    return jsonify({
        'message': 'Payment updated',
        'payment': payment.to_dict()
    }), 200


@payments_bp.route('/my-payments', methods=['GET'])
@jwt_required()
def get_my_payments():
    """Get current user's payment history."""
    user_id = get_jwt_identity()
    payments = Payment.query.filter_by(user_id=int(user_id)).order_by(Payment.created_at.desc()).all()
    return jsonify({
        'payments': [p.to_dict() for p in payments]
    }), 200
