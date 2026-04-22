

import { ProtectedRoute } from '@/components/ProtectedRoute';
import { Sidebar } from '@/components/Sidebar';
import { useState, useEffect } from 'react';
import api from '@/js/api/api';
import toast from 'react-hot-toast';
import { FiPlus, FiEdit2, FiTrash2, FiMapPin, FiUsers, FiDollarSign, FiCalendar } from 'react-icons/fi';
import { format } from 'date-fns';

export default function OrganizerDashboard() {
  const [events, setEvents] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchEvents = async () => {
    try {
      const userStr = localStorage.getItem('user');
      if (userStr) {
        const user = JSON.parse(userStr);
        const res = await api.get(`/events?organizer_id=${user.id}`);
        setEvents(res.data.events);
      }
    } catch (err) {
      toast.error('Failed to load events');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchEvents();
  }, []);

  const handleDelete = async (id: number) => {
    if (confirm('Are you sure you want to delete this event?')) {
      try {
        await api.delete(`/events/${id}`);
        toast.success('Event deleted');
        fetchEvents();
      } catch (err) {
        toast.error('Failed to delete event');
      }
    }
  };

  return (
    <ProtectedRoute allowedRoles={['organizer']}>
      <div className="flex bg-gray-50 min-h-screen">
        <Sidebar />
        <div className="ml-64 flex-1 p-8">
          <div className="flex justify-between items-center mb-8">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">My Events</h1>
              <p className="text-gray-500 mt-1">Manage all your organized events</p>
            </div>
            <button className="bg-teal-600 hover:bg-teal-700 text-white px-4 py-2 rounded-lg flex items-center space-x-2 transition-colors">
              <FiPlus />
              <span>Create Event</span>
            </button>
          </div>

          {loading ? (
            <div className="flex justify-center p-12">
              <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-teal-600"></div>
            </div>
          ) : events.length === 0 ? (
            <div className="bg-white rounded-xl border border-gray-200 border-dashed p-12 text-center">
              <div className="mx-auto w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mb-4">
                <FiCalendar className="text-2xl text-gray-400" />
              </div>
              <h3 className="text-lg font-medium text-gray-900 mb-2">No events found</h3>
              <p className="text-gray-500 mb-6">You haven't created any events yet.</p>
              <button className="inline-flex items-center space-x-2 bg-teal-600 text-white px-4 py-2 rounded-lg hover:bg-teal-700">
                <FiPlus />
                <span>Create Your First Event</span>
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {events.map((event) => (
                <div key={event.id} className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden hover:shadow-md transition-shadow">
                  <div className="h-48 bg-gradient-to-r from-teal-500 to-cyan-600 relative">
                    <div className="absolute top-4 right-4 space-x-2 flex">
                      <button className="p-2 bg-white/20 hover:bg-white/40 backdrop-blur-sm rounded-full text-white transition-colors">
                        <FiEdit2 />
                      </button>
                      <button 
                        onClick={() => handleDelete(event.id)}
                        className="p-2 bg-white/20 hover:bg-red-500 hover:text-white backdrop-blur-sm rounded-full text-white transition-colors"
                      >
                        <FiTrash2 />
                      </button>
                    </div>
                    {event.status === 'upcoming' && (
                       <span className="absolute bottom-4 left-4 bg-emerald-500 text-white text-xs font-bold px-3 py-1 rounded-full">
                         Upcoming
                       </span>
                    )}
                  </div>
                  <div className="p-5">
                    <h3 className="text-xl font-bold text-gray-900 mb-2 truncate">{event.title}</h3>
                    
                    <div className="space-y-2 mt-4 text-sm text-gray-600">
                      <div className="flex items-center space-x-2">
                        <FiCalendar className="text-gray-400" />
                        <span>{format(new Date(event.date), 'MMM dd, yyyy h:mm a')}</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <FiMapPin className="text-gray-400" />
                        <span className="truncate">{event.location || 'Location TBA'}</span>
                      </div>
                      <div className="flex items-center justify-between pt-4 mt-4 border-t border-gray-100">
                        <div className="flex items-center space-x-2 text-teal-600 font-medium">
                          <FiUsers />
                          <span>{event.participant_count} / {event.capacity}</span>
                        </div>
                        <div className="flex items-center space-x-1 text-emerald-600 font-medium">
                          <FiDollarSign />
                          <span>{event.ticket_price}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="bg-gray-50 p-4 border-t border-gray-200 flex justify-between">
                     <button className="text-sm font-medium text-teal-600 hover:text-teal-800">
                       View Registrations
                     </button>
                     <button className="text-sm font-medium text-gray-600 hover:text-gray-800">
                       Manage Vendors
                     </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </ProtectedRoute>
  );
}
