

import { useState, useEffect } from 'react';
import { Sidebar } from '@/components/Sidebar';
import api from '@/js/api/api';
import toast from 'react-hot-toast';
import { FiCalendar, FiMapPin, FiClock, FiSearch, FiUsers, FiArrowRight } from 'react-icons/fi';
import { format } from 'date-fns';
import { useAuth } from '@/hooks/useAuth';
import { motion } from 'framer-motion';
import Link from 'next/link';

export default function EventListings() {
  const [events, setEvents] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const { user } = useAuth();
  const [registeringFor, setRegisteringFor] = useState<number | null>(null);

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

  const handleRegister = async (eventId: number) => {
    if (!user) {
      toast.error('Please login to register for events');
      return;
    }
    setRegisteringFor(eventId);
    try {
      await api.post(`/events/${eventId}/register`);
      toast.success('Successfully registered!');
      setEvents(events.map(e => e.id === eventId ? { ...e, participant_count: e.participant_count + 1 } : e));
    } catch (err: any) {
      toast.error(err.response?.data?.error || 'Registration failed');
    } finally {
      setRegisteringFor(null);
    }
  };

  const filteredEvents = events.filter(e =>
    e.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    (e.location && e.location.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  return (
    <div className="flex min-h-screen bg-gray-50 font-sans">
      {user && <Sidebar />}

      <div className={`flex-1 ${user ? 'ml-64' : ''}`}>
        
        {/* Top navbar for public unauthenticated view */}
        {!user && (
          <nav className="bg-white border-b border-gray-100 sticky top-0 z-40">
            <div className="max-w-7xl mx-auto flex items-center justify-between px-6 py-4">
              <Link href="/" className="flex items-center space-x-2">
                <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-teal-500 to-cyan-600 flex items-center justify-center text-white font-black text-sm">E</div>
                <span className="text-xl font-bold tracking-tight text-gray-900">EventMaster</span>
              </Link>
              <div className="flex items-center space-x-3">
                <Link href="/login" className="text-sm font-semibold text-gray-600 hover:text-gray-900 px-4 py-2">Log in</Link>
                <Link href="/register" className="text-sm font-semibold text-white bg-gradient-to-r from-teal-500 to-cyan-600 px-5 py-2.5 rounded-full shadow-md">Get Started</Link>
              </div>
            </div>
          </nav>
        )}

        <div className="p-8 max-w-7xl mx-auto">
          {/* Header */}
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-8">
            <div>
              <h1 className="text-3xl font-extrabold text-gray-900 tracking-tight">Discover Events</h1>
              <p className="text-gray-500 mt-1">Find and register for upcoming events near you.</p>
            </div>
            <div className="relative w-full md:w-80">
              <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none">
                <FiSearch className="text-gray-400" />
              </div>
              <input
                type="text"
                placeholder="Search events or locations..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 w-full bg-white border border-gray-200 text-gray-900 rounded-xl py-2.5 px-4 shadow-sm outline-none placeholder-gray-400 focus:ring-2 focus:ring-teal-500/20 focus:border-teal-500 transition-all text-sm"
              />
            </div>
          </div>

          {/* Event Grid */}
          {loading ? (
            <div className="flex justify-center p-12">
              <div className="animate-spin rounded-full h-10 w-10 border-t-2 border-b-2 border-teal-600"></div>
            </div>
          ) : filteredEvents.length === 0 ? (
            <div className="bg-white rounded-2xl border border-gray-200 p-16 text-center">
              <div className="mx-auto w-16 h-16 bg-teal-50 rounded-full flex items-center justify-center mb-4">
                <FiSearch className="text-2xl text-teal-400" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">No events found</h3>
              <p className="text-gray-500">Try adjusting your search or check back later.</p>
            </div>
          ) : (
            <motion.div
              initial="hidden"
              animate="show"
              variants={{ hidden: { opacity: 0 }, show: { opacity: 1, transition: { staggerChildren: 0.08 } } }}
              className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6"
            >
              {filteredEvents.map((event) => {
                const isFull = event.participant_count >= event.capacity;
                return (
                  <motion.div
                    key={event.id}
                    variants={{ hidden: { opacity: 0, y: 15 }, show: { opacity: 1, y: 0 } }}
                    className="bg-white rounded-2xl border border-gray-100 shadow-sm hover:shadow-lg hover:border-gray-200 transition-all duration-300 overflow-hidden group"
                  >
                    {/* Color bar at top */}
                    <div className={`h-1.5 w-full bg-gradient-to-r ${isFull ? 'from-red-400 to-orange-400' : 'from-teal-500 to-cyan-500'}`}></div>
                    
                    <div className="p-6">
                      <div className="flex items-start justify-between mb-4">
                        <h3 className="text-lg font-bold text-gray-900 leading-tight line-clamp-2 group-hover:text-teal-600 transition-colors">{event.title}</h3>
                        <span className={`ml-3 flex-shrink-0 text-xs font-bold px-3 py-1 rounded-full whitespace-nowrap ${
                          event.ticket_price === 0 
                            ? 'bg-emerald-50 text-emerald-700 border border-emerald-100' 
                            : 'bg-teal-50 text-teal-700 border border-teal-100'
                        }`}>
                          {event.ticket_price === 0 ? 'FREE' : `$${event.ticket_price}`}
                        </span>
                      </div>

                      <div className="space-y-2.5 mb-5 text-sm">
                        <div className="flex items-center space-x-3 text-gray-600">
                          <div className="w-8 h-8 rounded-lg bg-teal-50 flex items-center justify-center flex-shrink-0">
                            <FiCalendar className="text-teal-500 text-sm" />
                          </div>
                          <div>
                            <p className="font-medium text-gray-900">{format(new Date(event.date), 'MMMM d, yyyy')}</p>
                            <p className="text-xs text-gray-400">{format(new Date(event.date), 'h:mm a')}</p>
                          </div>
                        </div>
                        
                        <div className="flex items-center space-x-3 text-gray-600">
                          <div className="w-8 h-8 rounded-lg bg-rose-50 flex items-center justify-center flex-shrink-0">
                            <FiMapPin className="text-rose-500 text-sm" />
                          </div>
                          <span className="line-clamp-1">{event.location || 'Location TBA'}</span>
                        </div>
                        
                        <div className="flex items-center space-x-3 text-gray-600">
                          <div className="w-8 h-8 rounded-lg bg-amber-50 flex items-center justify-center flex-shrink-0">
                            <FiUsers className="text-amber-500 text-sm" />
                          </div>
                          <span>By <span className="font-medium text-gray-800">{event.organizer_name}</span></span>
                        </div>
                      </div>

                      {/* Footer */}
                      <div className="pt-4 border-t border-gray-100 flex items-center justify-between">
                        {/* Capacity bar */}
                        <div className="flex-1 mr-4">
                          <div className="flex items-center justify-between text-xs mb-1">
                            <span className="text-gray-400">Capacity</span>
                            <span className={`font-bold ${isFull ? 'text-red-500' : 'text-gray-700'}`}>{event.participant_count}/{event.capacity}</span>
                          </div>
                          <div className="h-1.5 bg-gray-100 rounded-full overflow-hidden">
                            <div 
                              className={`h-full rounded-full transition-all ${isFull ? 'bg-red-400' : 'bg-gradient-to-r from-teal-500 to-cyan-500'}`}
                              style={{ width: `${Math.min((event.participant_count / event.capacity) * 100, 100)}%` }}
                            ></div>
                          </div>
                        </div>
                        
                        <button
                          onClick={() => handleRegister(event.id)}
                          disabled={registeringFor === event.id || isFull}
                          className={`flex-shrink-0 flex items-center space-x-1.5 px-4 py-2 rounded-lg text-sm font-semibold transition-all ${
                            isFull 
                              ? 'bg-gray-100 text-gray-400 cursor-not-allowed' 
                              : 'bg-gradient-to-r from-teal-500 to-cyan-600 text-white shadow-md shadow-teal-200/50 hover:shadow-teal-300/50 hover:scale-[1.02]'
                          }`}
                        >
                          {registeringFor === event.id ? (
                            <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                          ) : isFull ? (
                            <span>Sold Out</span>
                          ) : (
                            <>
                              <span>Register</span>
                              <FiArrowRight className="text-xs" />
                            </>
                          )}
                        </button>
                      </div>
                    </div>
                  </motion.div>
                );
              })}
            </motion.div>
          )}
        </div>
      </div>
    </div>
  );
}
