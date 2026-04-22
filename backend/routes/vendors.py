"""Vendor routes - CRUD operations."""

from flask import Blueprint, request, jsonify
from server import db
from models.vendor import Vendor
from middleware import role_required

vendors_bp = Blueprint('vendors', __name__)


@vendors_bp.route('', methods=['GET'])
def get_vendors():
    """Get all vendors."""
    service_type = request.args.get('service_type')
    available_only = request.args.get('available', type=bool)
    search = request.args.get('search', '')

    query = Vendor.query
    if service_type:
        query = query.filter_by(service_type=service_type)
    if available_only:
        query = query.filter_by(is_available=True)
    if search:
        query = query.filter(
            (Vendor.name.ilike(f'%{search}%')) | (Vendor.service_type.ilike(f'%{search}%'))
        )

    vendors = query.order_by(Vendor.created_at.desc()).all()
    return jsonify({'vendors': [v.to_dict() for v in vendors]}), 200


@vendors_bp.route('/<int:vendor_id>', methods=['GET'])
def get_vendor(vendor_id):
    """Get single vendor."""
    vendor = Vendor.query.get(vendor_id)
    if not vendor:
        return jsonify({'error': 'Vendor not found'}), 404
    return jsonify({'vendor': vendor.to_dict()}), 200


@vendors_bp.route('', methods=['POST'])
@role_required('admin', 'organizer')
def create_vendor():
    """Create a new vendor."""
    data = request.get_json()

    required_fields = ['name', 'service_type']
    for field in required_fields:
        if not data.get(field):
            return jsonify({'error': f'{field} is required'}), 400

    vendor = Vendor(
        name=data['name'],
        service_type=data['service_type'],
        description=data.get('description', ''),
        contact_email=data.get('contact_email', ''),
        contact_phone=data.get('contact_phone', ''),
        price_range=data.get('price_range', ''),
        rating=data.get('rating', 0.0),
        is_available=data.get('is_available', True)
    )

    db.session.add(vendor)
    db.session.commit()
    return jsonify({'message': 'Vendor created', 'vendor': vendor.to_dict()}), 201


@vendors_bp.route('/<int:vendor_id>', methods=['PUT'])
@role_required('admin', 'organizer')
def update_vendor(vendor_id):
    """Update vendor."""
    vendor = Vendor.query.get(vendor_id)
    if not vendor:
        return jsonify({'error': 'Vendor not found'}), 404

    data = request.get_json()
    for field in ['name', 'service_type', 'description', 'contact_email',
                  'contact_phone', 'price_range', 'rating', 'is_available']:
        if field in data:
            setattr(vendor, field, data[field])

    db.session.commit()
    return jsonify({'message': 'Vendor updated', 'vendor': vendor.to_dict()}), 200


@vendors_bp.route('/<int:vendor_id>', methods=['DELETE'])
@role_required('admin', 'organizer')
def delete_vendor(vendor_id):
    """Delete vendor."""
    vendor = Vendor.query.get(vendor_id)
    if not vendor:
        return jsonify({'error': 'Vendor not found'}), 404

    db.session.delete(vendor)
    db.session.commit()
    return jsonify({'message': 'Vendor deleted'}), 200
