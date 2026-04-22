

import { ProtectedRoute } from '@/components/ProtectedRoute';
import { Sidebar } from '@/components/Sidebar';
import { useState, useEffect } from 'react';
import api from '@/js/api/api';
import toast from 'react-hot-toast';
import { FiDollarSign, FiDownload, FiTrendingUp } from 'react-icons/fi';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { useAuth } from '@/hooks/useAuth';

export default function OrganizerFinances() {
  const [report, setReport] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const { user } = useAuth();

  useEffect(() => {
    const fetchReport = async () => {
      if (!user) return;
      try {
        const res = await api.get('/reports/financial');
        setReport(res.data);
      } catch (err) {
        toast.error('Failed to load financial data');
      } finally {
        setLoading(false);
      }
    };
    fetchReport();
  }, [user]);

  if (loading || !report) {
    return (
      <ProtectedRoute allowedRoles={['organizer']}>
        <div className="flex min-h-screen bg-gray-50">
          <Sidebar />
          <div className="ml-64 flex-1 p-8 flex items-center justify-center">
             <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-teal-600"></div>
          </div>
        </div>
      </ProtectedRoute>
    );
  }

  const eventRevenueData = report.events.map((e: any) => ({
    name: e.event_title.length > 15 ? e.event_title.substring(0, 15) + '...' : e.event_title,
    revenue: e.total_revenue,
  }));

  return (
    <ProtectedRoute allowedRoles={['organizer']}>
      <div className="flex bg-gray-50 min-h-screen">
        <Sidebar />
        
        <div className="ml-64 flex-1 p-8">
          <div className="flex justify-between items-center mb-8">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">My Finances</h1>
              <p className="text-gray-500 mt-1">Track revenue from your organized events</p>
            </div>
            <button className="bg-teal-600 hover:bg-teal-700 text-white px-4 py-2 rounded-lg flex items-center space-x-2 transition-colors">
              <FiDownload />
              <span>Export Report</span>
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
             <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-500">Total Event Revenue</p>
                  <p className="text-3xl font-bold text-gray-900 mt-2">${report.total_revenue.toLocaleString(undefined, {minimumFractionDigits: 2})}</p>
                </div>
                <div className="p-3 bg-emerald-50 rounded-lg">
                  <FiTrendingUp className="text-2xl text-emerald-600" />
                </div>
              </div>
            </div>
            <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-500">Total Successful Tickets</p>
                  <p className="text-3xl font-bold text-gray-900 mt-2">
                    {report.events.reduce((acc: number, curr: any) => acc + curr.payment_count, 0)}
                  </p>
                </div>
                <div className="p-3 bg-teal-50 rounded-lg">
                  <FiDollarSign className="text-2xl text-teal-600" />
                </div>
              </div>
            </div>
          </div>

          <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200 w-full min-w-0 mb-8 h-[400px]">
             <h2 className="text-xl font-bold text-gray-800 mb-6">Revenue Overview</h2>
             <ResponsiveContainer width="100%" height={300}>
                <BarChart data={eventRevenueData} margin={{top: 20, right: 30, left: 20, bottom: 5}}>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip cursor={{fill: '#f3f4f6'}} />
                  <Bar dataKey="revenue" fill="#14b8a6" radius={[4, 4, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
          </div>

        </div>
      </div>
    </ProtectedRoute>
  );
}
