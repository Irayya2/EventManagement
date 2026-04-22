

import { ProtectedRoute } from '@/components/ProtectedRoute';
import { Sidebar } from '@/components/Sidebar';
import { useState, useEffect } from 'react';
import api from '@/js/api/api';
import toast from 'react-hot-toast';
import { FiCalendar, FiMapPin, FiUsers, FiCheckCircle } from 'react-icons/fi';
import { format } from 'date-fns';

export default function StaffDashboard() {
  const [events, setEvents] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const res = await api.get('/events?status=upcoming');
        setEvents(res.data.events);
      } catch (err) {
        toast.error('Failed to load events');
      } finally {
        setLoading(false);
      }
    };
    fetchEvents();
  }, []);

  const handleUpdateStatus = async (eventId: number, status: string) => {
    try {
      await api.put(`/events/${eventId}`, { status });
      toast.success('Event status updated');
      setEvents(events.map(e => e.id === eventId ? { ...e, status } : e));
    } catch (err) {
      toast.error('Failed to update event status');
    }
  };

  return (
    <ProtectedRoute allowedRoles={['staff', 'admin']}>
      <div className="flex bg-gray-50 min-h-screen">
        <Sidebar />
        <div className="ml-64 flex-1 p-8">
          <div className="flex justify-between items-center mb-8">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Staff Dashboard</h1>
              <p className="text-gray-500 mt-1">Manage operational tasks and assist events</p>
            </div>
          </div>

          {loading ? (
             <div className="flex justify-center p-12">
               <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-teal-600"></div>
             </div>
          ) : events.length === 0 ? (
            <div className="bg-white rounded-xl border border-gray-200 border-dashed p-12 text-center text-gray-500">
               No upcoming events to manage.
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {events.map((event) => (
                <div key={event.id} className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden hover:shadow-md transition-shadow">
                  <div className="p-6 border-b border-gray-100">
                    <h3 className="text-xl font-bold text-gray-900 mb-2 truncate">{event.title}</h3>
                    <div className="flex items-center space-x-2 text-sm text-gray-600 mb-4">
                      <FiCalendar className="text-teal-500" />
                      <span>{format(new Date(event.date), 'MMM dd, yyyy h:mm a')}</span>
                    </div>
                    <div className="flex items-center space-x-2 text-sm text-gray-600 bg-gray-50 p-2 rounded">
                      <FiMapPin className="text-gray-400" />
                      <span className="truncate">{event.location || 'Location TBA'}</span>
                    </div>
                    <div className="mt-4 flex items-center justify-between text-sm">
                        <div className="flex items-center space-x-1 font-medium text-gray-700">
                            <FiUsers className="text-gray-400"/>
                            <span>{event.participant_count} Registered</span>
                        </div>
                        <span className="px-2 py-1 rounded bg-emerald-100 text-emerald-700 text-xs font-bold uppercase">
                            Operational
                        </span>
                    </div>
                  </div>
                  <div className="bg-gray-50 p-4 flex flex-col gap-2">
                     <button className="w-full py-2 bg-teal-50 text-teal-700 font-medium rounded-lg hover:bg-teal-100 transition flex justify-center items-center space-x-2">
                        <FiCheckCircle />
                        <span>Check-In Participants</span>
                     </button>
                     {event.status === 'upcoming' && (
                        <button 
                          onClick={() => handleUpdateStatus(event.id, 'ongoing')}
                          className="w-full py-2 border border-gray-300 text-gray-700 font-medium rounded-lg hover:bg-gray-100 transition"
                        >
                           Mark as Ongoing
                        </button>
                     )}
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
