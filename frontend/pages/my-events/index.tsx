

import { ProtectedRoute } from '@/components/ProtectedRoute';
import { Sidebar } from '@/components/Sidebar';
import { useState, useEffect } from 'react';
import api from '@/js/api/api';
import toast from 'react-hot-toast';
import { FiCalendar, FiMapPin, FiClock, FiXCircle } from 'react-icons/fi';
import { format } from 'date-fns';

export default function MyEvents() {
  const [registrations, setRegistrations] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchMyEvents = async () => {
      try {
        const res = await api.get('/events/my-registrations');
        setRegistrations(res.data.registrations);
      } catch (err) {
        toast.error('Failed to load your events');
      } finally {
        setLoading(false);
      }
    };
    fetchMyEvents();
  }, []);

  return (
    <ProtectedRoute allowedRoles={['participant', 'admin', 'organizer', 'staff']}>
      <div className="flex bg-gray-50 min-h-screen">
        <Sidebar />
        <div className="ml-64 flex-1 p-8">
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-gray-900">My Registrations</h1>
            <p className="text-gray-500 mt-1">Events you are attending</p>
          </div>

          {loading ? (
            <div className="flex justify-center p-12">
              <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-teal-600"></div>
            </div>
          ) : registrations.length === 0 ? (
            <div className="bg-white rounded-xl border border-gray-200 border-dashed p-12 text-center">
              <div className="mx-auto w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mb-4">
                <FiCalendar className="text-2xl text-gray-400" />
              </div>
              <h3 className="text-lg font-medium text-gray-900 mb-2">No registrations found</h3>
              <p className="text-gray-500 mb-6">You haven't registered for any events yet.</p>
              <a href="/events" className="inline-flex bg-teal-600 hover:bg-teal-700 text-white px-6 py-2 rounded-lg font-medium transition-colors">
                Discover Events
              </a>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {registrations.map((reg) => (
                <div key={reg.id} className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden hover:shadow-md transition-shadow relative">
                  <div className="h-2 bg-teal-600 w-full"></div>
                  
                  <div className="absolute top-6 right-4">
                    <span className={`px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider
                      ${reg.status === 'registered' ? 'bg-green-100 text-green-700' : 
                        reg.status === 'attended' ? 'bg-cyan-100 text-cyan-700' : 
                        'bg-red-100 text-red-700'}`}>
                      {reg.status}
                    </span>
                  </div>

                  <div className="p-6">
                    <h3 className="text-xl font-bold text-gray-900 mb-4 pr-20">{reg.event_title}</h3>
                    
                    <div className="space-y-3 text-sm text-gray-600">
                      <div className="flex items-center space-x-3">
                        <div className="w-8 h-8 rounded-full bg-teal-50 flex items-center justify-center text-teal-500">
                           <FiCalendar />
                        </div>
                        <div>
                          <p className="font-medium text-gray-900">Registration Date</p>
                          <p>{format(new Date(reg.registration_date), 'MMM dd, yyyy')}</p>
                        </div>
                      </div>
                      
                      {reg.check_in_time && (
                         <div className="flex items-center space-x-3">
                          <div className="w-8 h-8 rounded-full bg-emerald-50 flex items-center justify-center text-emerald-500">
                             <FiClock />
                          </div>
                          <div>
                            <p className="font-medium text-gray-900">Check-in Time</p>
                            <p>{format(new Date(reg.check_in_time), 'MMM dd, yyyy h:mm a')}</p>
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                  
                  <div className="p-4 bg-gray-50 border-t border-gray-100 flex justify-end">
                     {reg.status === 'registered' && (
                       <button className="text-red-500 hover:text-red-700 text-sm font-medium flex items-center space-x-1">
                         <FiXCircle />
                         <span>Cancel Registration</span>
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
