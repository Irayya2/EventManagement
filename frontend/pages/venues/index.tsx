

import { ProtectedRoute } from '@/components/ProtectedRoute';
import { Sidebar } from '@/components/Sidebar';
import { useState, useEffect } from 'react';
import api from '@/js/api/api';
import toast from 'react-hot-toast';
import { FiMapPin, FiPlus, FiEdit2, FiTrash2, FiUsers, FiDollarSign, FiSearch } from 'react-icons/fi';

export default function VenuesManagement() {
  const [venues, setVenues] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');

  const fetchVenues = async () => {
    try {
      const res = await api.get(`/venues?search=${search}`);
      setVenues(res.data.venues);
    } catch (err) {
      toast.error('Failed to load venues');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchVenues();
  }, [search]);

  const handleDelete = async (id: number) => {
    if (confirm('Are you sure you want to delete this venue?')) {
        try {
            await api.delete(`/venues/${id}`);
            toast.success('Venue deleted successfully');
            fetchVenues();
        } catch (err: any) {
            toast.error(err.response?.data?.error || 'Failed to delete venue');
        }
    }
  };

  return (
    <ProtectedRoute allowedRoles={['admin', 'organizer']}>
      <div className="flex bg-gray-50 min-h-screen">
        <Sidebar />
        <div className="ml-64 flex-1 p-8">
          <div className="flex justify-between items-center mb-8">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Venues</h1>
              <p className="text-gray-500 mt-1">Manage event locations and capacities</p>
            </div>
            <button className="bg-teal-600 hover:bg-teal-700 text-white px-4 py-2 rounded-lg flex items-center space-x-2 transition-colors">
              <FiPlus />
              <span>Add Venue</span>
            </button>
          </div>

          <div className="mb-6 relative max-w-md">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <FiSearch className="text-gray-400" />
            </div>
            <input
              type="text"
              placeholder="Search venues..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="pl-10 w-full rounded-lg border border-gray-300 py-2 shadow-sm focus:ring-teal-500 focus:border-teal-500"
            />
          </div>

          {loading ? (
            <div className="flex justify-center p-12">
              <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-teal-600"></div>
            </div>
          ) : venues.length === 0 ? (
            <div className="bg-white rounded-xl border border-dashed border-gray-300 p-12 text-center text-gray-500">
               No venues found.
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {venues.map((venue) => (
                <div key={venue.id} className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden hover:shadow-md transition-shadow">
                  <div className="p-6">
                    <div className="flex justify-between items-start mb-4">
                      <div className="flex items-center space-x-3">
                        <div className="w-10 h-10 rounded-lg bg-teal-50 flex items-center justify-center text-teal-600">
                          <FiMapPin className="text-xl" />
                        </div>
                        <div>
                          <h3 className="text-lg font-bold text-gray-900 leading-tight">{venue.name}</h3>
                          <span className={`text-xs font-medium px-2 py-0.5 rounded-full ${venue.is_available ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>
                            {venue.is_available ? 'Available' : 'Unavailable'}
                          </span>
                        </div>
                      </div>
                    </div>
                    
                    <p className="text-gray-600 text-sm mb-4 line-clamp-2">{venue.description || 'No description provided.'}</p>
                    
                    <div className="space-y-2 text-sm text-gray-600 border-t border-gray-100 pt-4">
                      <div className="flex items-center space-x-2">
                         <FiMapPin className="text-gray-400" />
                         <span className="truncate">{venue.location}</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-2">
                           <FiUsers className="text-gray-400" />
                           <span>Up to {venue.capacity} people</span>
                        </div>
                        <div className="flex items-center space-x-1 text-emerald-600 font-medium">
                           <FiDollarSign />
                           <span>{venue.price_per_day}/day</span>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="bg-gray-50 px-6 py-3 border-t border-gray-200 flex justify-end space-x-2">
                    <button className="text-gray-600 hover:text-teal-600 p-2 rounded transition-colors">
                      <FiEdit2 />
                    </button>
                    <button 
                      onClick={() => handleDelete(venue.id)}
                      className="text-gray-600 hover:text-red-600 p-2 rounded transition-colors"
                    >
                      <FiTrash2 />
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
