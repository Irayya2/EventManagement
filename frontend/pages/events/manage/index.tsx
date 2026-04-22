

import { ProtectedRoute } from '@/components/ProtectedRoute';
import { Sidebar } from '@/components/Sidebar';
import { useState, useEffect } from 'react';
import api from '@/js/api/api';
import toast from 'react-hot-toast';
import { FiCalendar, FiMapPin, FiUsers, FiDollarSign, FiEdit2, FiPlus } from 'react-icons/fi';
import { format } from 'date-fns';
import { useAuth } from '@/hooks/useAuth';
import Link from 'next/link';
import { Badge } from '@/components/ui/Badge';

export default function ManageEvents() {
  const [events, setEvents] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const { user } = useAuth();

  useEffect(() => {
    const fetchOrganizerEvents = async () => {
      if (!user) return;
      try {
        const res = await api.get(`/events?organizer_id=${user.id}`);
        setEvents(res.data.events);
      } catch (err) {
        toast.error('Failed to load your hosted events');
      } finally {
        setLoading(false);
      }
    };
    fetchOrganizerEvents();
  }, [user]);

  if (loading) {
    return (
      <ProtectedRoute allowedRoles={['organizer', 'admin']}>
        <div className="flex bg-gray-50 min-h-screen">
          <Sidebar />
          <div className="ml-64 flex-1 p-8 flex items-center justify-center">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-teal-600"></div>
          </div>
        </div>
      </ProtectedRoute>
    );
  }

  return (
    <ProtectedRoute allowedRoles={['organizer', 'admin']}>
      <div className="flex bg-gray-50 min-h-screen">
        <Sidebar />
        <div className="ml-64 flex-1 p-8">
          <div className="flex justify-between items-center mb-8">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Manage My Events</h1>
              <p className="text-gray-500 mt-1">View and manage the events you are hosting</p>
            </div>
            <button className="bg-teal-600 hover:bg-teal-700 text-white px-5 py-2.5 rounded-lg flex items-center space-x-2 font-medium transition-colors shadow-sm">
              <FiPlus />
              <span>Create New Event</span>
            </button>
          </div>

          {events.length === 0 ? (
            <div className="bg-white rounded-xl border border-gray-200 border-dashed p-12 text-center">
              <div className="mx-auto w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mb-4">
                <FiCalendar className="text-2xl text-gray-400" />
              </div>
              <h3 className="text-lg font-medium text-gray-900 mb-2">No events hosted yet</h3>
              <p className="text-gray-500 mb-6">You haven't created any events to manage.</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
              {events.map((event) => (
                <div key={event.id} className="bg-white border text-left border-gray-200 rounded-2xl p-6 hover:shadow-md transition-all duration-300 relative group h-full flex flex-col">
                  
                  {/* Status Badge */}
                  <div className="absolute top-6 right-6">
                    <Badge variant={event.status === 'upcoming' ? 'success' : event.status === 'ongoing' ? 'warning' : 'default'}>
                      {event.status}
                    </Badge>
                  </div>
                  
                  <div className="mb-4 pr-24">
                    <h3 className="text-xl font-bold text-gray-900">{event.title}</h3>
                    <div className="flex items-center space-x-4 mt-2 text-sm text-gray-500">
                      <span className="flex items-center space-x-1.5 bg-gray-50 px-2.5 py-1 rounded-md border border-gray-100">
                        <FiCalendar className="text-teal-600" />
                        <span>{event.date ? format(new Date(event.date), 'MMM dd, yyyy') : 'TBD'}</span>
                      </span>
                      {event.location && (
                        <span className="flex items-center space-x-1.5 bg-gray-50 px-2.5 py-1 rounded-md border border-gray-100">
                          <FiMapPin className="text-teal-600" />
                          <span className="truncate max-w-[150px]">{event.location}</span>
                        </span>
                      )}
                    </div>
                  </div>
                  
                  <p className="text-gray-600 text-sm line-clamp-2 mb-6 flex-1">
                    {event.description || 'No description provided.'}
                  </p>
                  
                  <div className="grid grid-cols-2 gap-3 mb-6">
                    <div className="bg-gradient-to-br from-teal-50 to-cyan-50 p-3 rounded-lg border border-teal-100/50">
                      <div className="flex items-center space-x-2 text-teal-800 mb-1">
                        <FiUsers className="text-teal-600" />
                        <span className="text-xs font-bold uppercase tracking-wider">Capacity</span>
                      </div>
                      <p className="text-lg font-extrabold text-teal-900">{event.participant_count || 0} / {event.capacity}</p>
                    </div>
                    <div className="bg-gradient-to-br from-emerald-50 to-teal-50 p-3 rounded-lg border border-emerald-100/50">
                      <div className="flex items-center space-x-2 text-emerald-800 mb-1">
                        <FiDollarSign className="text-emerald-600" />
                        <span className="text-xs font-bold uppercase tracking-wider">Ticket Price</span>
                      </div>
                      <p className="text-lg font-extrabold text-emerald-900">
                        {event.ticket_price === 0 ? 'Free' : `$${event.ticket_price.toFixed(2)}`}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center justify-between pt-5 border-t border-gray-100">
                    <div className="text-xs text-gray-400 font-medium">
                      Created {event.created_at ? format(new Date(event.created_at), 'MMM dd, yyyy') : 'Unknown'}
                    </div>
                    <Link href={`/events/${event.id}`} className="group-hover:bg-teal-50 text-teal-600 font-semibold px-4 py-2 border border-transparent group-hover:border-teal-100 rounded-lg text-sm transition-all flex items-center space-x-2">
                       <FiEdit2 />
                       <span>Edit Event</span>
                    </Link>
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
