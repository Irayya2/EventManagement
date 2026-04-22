"""Authentication routes - register, login, approve user."""

from flask import Blueprint, request, jsonify
from werkzeug.security import generate_password_hash, check_password_hash
from flask_jwt_extended import create_access_token, jwt_required, get_jwt_identity
from server import db
from models.user import User
from models.notification import Notification
from middleware import role_required, send_notification_email

auth_bp = Blueprint('auth', __name__)


@auth_bp.route('/register', methods=['POST'])
def register():
    """Register a new user. Status defaults to 'pending' until admin approves."""
    data = request.get_json()

    # Validation
    required_fields = ['name', 'email', 'password']
    for field in required_fields:
        if not data.get(field):
            return jsonify({'error': f'{field} is required'}), 400

    # Check if email already exists
    if User.query.filter_by(email=data['email']).first():
        return jsonify({'error': 'Email already registered'}), 409

    # Validate role
    valid_roles = ['participant', 'organizer', 'staff']
    role = data.get('role', 'participant')
    if role not in valid_roles:
        return jsonify({'error': f'Invalid role. Must be one of: {valid_roles}'}), 400

    # Create user
    user = User(
        name=data['name'],
        email=data['email'],
        password_hash=generate_password_hash(data['password']),
        role=role,
        phone=data.get('phone', ''),
        status='pending'
    )

    db.session.add(user)
    db.session.commit()

    # Notify admins
    admins = User.query.filter_by(role='admin', status='approved').all()
    for admin in admins:
        notification = Notification(
            message=f'New user registration: {user.name} ({user.email}) as {user.role}',
            type='info',
            user_id=admin.id
        )
        db.session.add(notification)
    db.session.commit()

    return jsonify({
        'message': 'Registration successful! Please wait for admin approval.',
        'user': user.to_dict()
    }), 201


@auth_bp.route('/login', methods=['POST'])
def login():
    """Login - only approved users can log in."""
    data = request.get_json()

    if not data.get('email') or not data.get('password'):
        return jsonify({'error': 'Email and password are required'}), 400

    user = User.query.filter_by(email=data['email']).first()

    if not user or not check_password_hash(user.password_hash, data['password']):
        return jsonify({'error': 'Invalid email or password'}), 401

    if user.status == 'pending':
        return jsonify({'error': 'Your account is pending approval. Please wait for admin to approve.'}), 403

    if user.status == 'rejected':
        return jsonify({'error': 'Your account has been rejected. Please contact support.'}), 403

    # Generate JWT token
    access_token = create_access_token(identity=str(user.id))

    return jsonify({
        'message': 'Login successful',
        'access_token': access_token,
        'user': user.to_dict()
    }), 200


@auth_bp.route('/approve-user', methods=['POST'])
@role_required('admin')
def approve_user():
    """Admin approves or rejects a user registration."""
    data = request.get_json()
    user_id = data.get('user_id')
    action = data.get('action')  # 'approve' or 'reject'

    if not user_id or action not in ['approve', 'reject']:
        return jsonify({'error': 'user_id and action (approve/reject) are required'}), 400

    user = User.query.get(user_id)
    if not user:
        return jsonify({'error': 'User not found'}), 404

    user.status = 'approved' if action == 'approve' else 'rejected'
    
    # Notify the user
    notification = Notification(
        message=f'Your account has been {user.status} by admin.',
        type='success' if user.status == 'approved' else 'error',
        user_id=user.id
    )
    db.session.add(notification)
    db.session.commit()

    # Send email notification
    if user.status == 'approved':
        send_notification_email(
            user.email,
            'Account Approved - Event Manager',
            f'''
            <h2>Welcome, {user.name}!</h2>
            <p>Your account has been approved. You can now log in to the Event Management System.</p>
            <p>Role: <strong>{user.role.capitalize()}</strong></p>
            '''
        )

    return jsonify({
        'message': f'User {user.status} successfully',
        'user': user.to_dict()
    }), 200


@auth_bp.route('/me', methods=['GET'])
@jwt_required()
def get_current_user():
    """Get current logged-in user details."""
    user_id = get_jwt_identity()
    user = User.query.get(int(user_id))

    if not user:
        return jsonify({'error': 'User not found'}), 404

    return jsonify({'user': user.to_dict()}), 200


@auth_bp.route('/change-password', methods=['PUT'])
@jwt_required()
def change_password():
    """Change password for current user."""
    data = request.get_json()
    user_id = get_jwt_identity()
    user = User.query.get(int(user_id))

    if not user:
        return jsonify({'error': 'User not found'}), 404

    if not check_password_hash(user.password_hash, data.get('current_password', '')):
        return jsonify({'error': 'Current password is incorrect'}), 400

    user.password_hash = generate_password_hash(data['new_password'])
    db.session.commit()

    return jsonify({'message': 'Password changed successfully'}), 200
