"""Socket.IO real-time event broadcasting (Phase 4)."""

from flask_socketio import emit
from server import socketio

@socketio.on('connect')
def handle_connect():
    """Triggered when a frontend client connects successfully via WebSockets."""
    print('Client connected to Real-Time Feed.')
    emit('status', {'msg': 'Connected to EventMaster Real-Time Server!'})

@socketio.on('disconnect')
def handle_disconnect():
    print('Client disconnected.')

def broadcast_payment_success(invoice_num, amount):
    """Called from our payment routes to push data to the web client instantly."""
    payload = {
        'type': 'PAYMENT_SUCCESS',
        'message': f"A payment of ${amount} was just processed successfully!",
        'invoice': invoice_num
    }
    # Emits to all connected React clients 
    socketio.emit('live_notification', payload)

def broadcast_new_event(title, location):
    """Notify all users sitting on the dashboard that a new event just dropped."""
    payload = {
        'type': 'NEW_EVENT',
        'message': f"New Event Added: {title} in {location}!"
    }
    socketio.emit('live_notification', payload)
