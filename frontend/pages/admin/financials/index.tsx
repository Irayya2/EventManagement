

import { ProtectedRoute } from '@/components/ProtectedRoute';
import { Sidebar } from '@/components/Sidebar';
import { useState, useEffect } from 'react';
import api from '@/js/api/api';
import toast from 'react-hot-toast';
import { FiDollarSign, FiTrendingUp, FiActivity, FiDownload } from 'react-icons/fi';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line } from 'recharts';

export default function AdminFinancials() {
  const [report, setReport] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchReport = async () => {
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
  }, []);

  if (loading || !report) {
    return (
      <ProtectedRoute allowedRoles={['admin']}>
        <div className="flex min-h-screen bg-gray-50">
          <Sidebar />
          <div className="ml-64 flex-1 p-8 flex items-center justify-center">
             <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-teal-600"></div>
          </div>
        </div>
      </ProtectedRoute>
    );
  }

  // Cap events to top 5 for chart
  const eventRevenueData = report.events
    .sort((a: any, b: any) => b.total_revenue - a.total_revenue)
    .slice(0, 5)
    .map((e: any) => ({
      name: e.event_title.length > 15 ? e.event_title.substring(0, 15) + '...' : e.event_title,
      revenue: e.total_revenue,
      payments: e.payment_count
    }));

  return (
    <ProtectedRoute allowedRoles={['admin']}>
      <div className="flex bg-gray-50 min-h-screen">
        <Sidebar />
        
        <div className="ml-64 flex-1 p-8">
          <div className="flex justify-between items-center mb-8">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Financial Reports</h1>
              <p className="text-gray-500 mt-1">Platform revenue and payment tracking</p>
            </div>
            <button className="bg-white border border-gray-300 hover:bg-gray-50 text-gray-700 px-4 py-2 rounded-lg flex items-center space-x-2 transition-colors shadow-sm">
              <FiDownload />
              <span>Export CSV</span>
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-500">Total Validated Revenue</p>
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
                  <p className="text-sm font-medium text-gray-500">Pending Payments</p>
                  <p className="text-3xl font-bold text-gray-900 mt-2">${report.total_pending.toLocaleString(undefined, {minimumFractionDigits: 2})}</p>
                </div>
                <div className="p-3 bg-amber-50 rounded-lg">
                  <FiActivity className="text-2xl text-amber-600" />
                </div>
              </div>
            </div>

            <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-500">Total Successful Transactions</p>
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

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
            <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200 w-full min-w-0 h-[400px]">
              <h2 className="text-xl font-bold text-gray-800 mb-6">Top Events by Revenue</h2>
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

            <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden flex flex-col">
              <div className="p-6 border-b border-gray-100">
                <h2 className="text-xl font-bold text-gray-800">Revenue Breakdown by Event</h2>
              </div>
              <div className="overflow-y-auto flex-1 p-0">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50 sticky top-0">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Event</th>
                      <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase">Revenue</th>
                      <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase">Transactions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200 bg-white">
                    {report.events.map((event: any) => (
                      <tr key={event.event_id} className="hover:bg-gray-50">
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{event.event_title}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-right font-bold text-emerald-600">${event.total_revenue.toLocaleString(undefined, {minimumFractionDigits: 2})}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-right text-gray-500">{event.payment_count}</td>
                      </tr>
                    ))}
                    {report.events.length === 0 && (
                      <tr>
                        <td colSpan={3} className="px-6 py-8 text-center text-gray-500">No revenue data available</td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
    </ProtectedRoute>
  );
}
