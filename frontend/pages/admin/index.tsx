

import React, { useState, useEffect } from 'react';
import { AdminLayout } from '@/layouts/AdminLayout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import api from '@/js/api/api';
import { FiUsers, FiCalendar, FiDollarSign, FiTrendingUp, FiArrowUpRight, FiActivity } from 'react-icons/fi';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

export default function AdminDashboard() {
  const [stats, setStats] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const [usersRes, eventsRes, paymentsRes] = await Promise.all([
          api.get('/users'),
          api.get('/events'),
          api.get('/reports/financial')
        ]);
        setStats({
          users: usersRes.data.users,
          events: eventsRes.data.events,
          financials: paymentsRes.data
        });
      } catch (err) {
        console.error('Failed to load stats', err);
      } finally {
        setLoading(false);
      }
    };
    fetchStats();
  }, []);

  if (loading || !stats) {
    return (
      <AdminLayout allowedRoles={['admin']} title="Admin Dashboard">
        <div className="flex justify-center p-20">
          <div className="animate-spin rounded-full h-10 w-10 border-t-2 border-b-2 border-teal-600"></div>
        </div>
      </AdminLayout>
    );
  }

  const chartData = stats.events.slice(0, 8).map((e: any, i: number) => ({
    name: e.title.substring(0, 8),
    registrations: e.participant_count,
    capacity: e.capacity
  }));

  const statCards = [
    {
      label: 'Total Users',
      value: stats.users.length,
      change: '+12%',
      icon: <FiUsers />,
      iconBg: 'bg-teal-50',
      iconColor: 'text-teal-600',
      gradient: 'from-teal-500 to-cyan-500'
    },
    {
      label: 'Total Revenue',
      value: `$${(stats.financials.total_revenue || 0).toLocaleString()}`,
      change: '+8.2%',
      icon: <FiDollarSign />,
      iconBg: 'bg-emerald-50',
      iconColor: 'text-emerald-600',
      gradient: 'from-emerald-500 to-teal-500'
    },
    {
      label: 'Active Events',
      value: stats.events.length,
      change: '+5',
      icon: <FiCalendar />,
      iconBg: 'bg-cyan-50',
      iconColor: 'text-cyan-600',
      gradient: 'from-cyan-500 to-blue-500'
    },
    {
      label: 'Pending Payments',
      value: `$${(stats.financials.total_pending || 0).toLocaleString()}`,
      change: 'Action needed',
      icon: <FiActivity />,
      iconBg: 'bg-amber-50',
      iconColor: 'text-amber-600',
      gradient: 'from-amber-500 to-orange-500'
    },
  ];

  return (
    <AdminLayout 
      allowedRoles={['admin']} 
      title="Admin Overview"
      description="Monitor platform activity, users, and revenue at a glance."
    >
      {/* Stat Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5 mb-8">
        {statCards.map((s, i) => (
          <div key={i} className="bg-white rounded-2xl border border-gray-100 p-5 shadow-sm hover:shadow-md transition-shadow">
            <div className="flex items-center justify-between mb-4">
              <div className={`w-11 h-11 rounded-xl ${s.iconBg} flex items-center justify-center ${s.iconColor} text-xl`}>
                {s.icon}
              </div>
              <span className="text-xs font-semibold text-emerald-600 bg-emerald-50 px-2 py-1 rounded-full flex items-center space-x-1">
                <FiArrowUpRight className="text-[10px]" />
                <span>{s.change}</span>
              </span>
            </div>
            <p className="text-2xl font-extrabold text-gray-900">{s.value}</p>
            <p className="text-sm text-gray-400 font-medium mt-0.5">{s.label}</p>
          </div>
        ))}
      </div>

      {/* Charts + Recent Users */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Area Chart */}
        <div className="lg:col-span-2 bg-white rounded-2xl border border-gray-100 p-6 shadow-sm">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h3 className="text-lg font-bold text-gray-900">Registrations Overview</h3>
              <p className="text-sm text-gray-400">Event capacity vs registrations</p>
            </div>
            <div className="flex items-center space-x-4 text-xs font-medium">
              <span className="flex items-center space-x-1.5"><span className="w-2.5 h-2.5 rounded-full bg-teal-500"></span><span className="text-gray-500">Registrations</span></span>
              <span className="flex items-center space-x-1.5"><span className="w-2.5 h-2.5 rounded-full bg-teal-200"></span><span className="text-gray-500">Capacity</span></span>
            </div>
          </div>
          <div className="h-[280px] w-full min-w-0">
            <ResponsiveContainer width="100%" height={280}>
              <AreaChart data={chartData}>
                <defs>
                  <linearGradient id="regGradient" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#14b8a6" stopOpacity={0.3} />
                    <stop offset="100%" stopColor="#14b8a6" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f3f4f6" />
                <XAxis dataKey="name" tick={{ fontSize: 12, fill: '#9ca3af' }} axisLine={false} tickLine={false} />
                <YAxis tick={{ fontSize: 12, fill: '#9ca3af' }} axisLine={false} tickLine={false} />
                <Tooltip 
                  contentStyle={{ borderRadius: '12px', border: '1px solid #e5e7eb', boxShadow: '0 4px 12px rgba(0,0,0,0.05)' }}
                />
                <Area type="monotone" dataKey="capacity" stroke="#99f6e4" strokeWidth={2} fill="transparent" />
                <Area type="monotone" dataKey="registrations" stroke="#14b8a6" strokeWidth={2.5} fill="url(#regGradient)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Recent Users */}
        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
          <div className="p-5 border-b border-gray-50">
            <h3 className="text-lg font-bold text-gray-900">Recent Users</h3>
            <p className="text-sm text-gray-400">Newest registrations</p>
          </div>
          <div className="divide-y divide-gray-50 max-h-[340px] overflow-y-auto">
            {stats.users.slice(0, 6).map((u: any) => (
              <div key={u.id} className="px-5 py-3.5 flex items-center justify-between hover:bg-gray-50/50 transition-colors">
                <div className="flex items-center space-x-3">
                  <div className="w-9 h-9 rounded-full bg-gradient-to-br from-teal-500 to-cyan-500 flex items-center justify-center text-white text-xs font-bold">
                    {u.username?.charAt(0)?.toUpperCase() || 'U'}
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-gray-800">{u.username}</p>
                    <p className="text-[11px] text-gray-400">{u.email}</p>
                  </div>
                </div>
                <Badge variant={u.status === 'approved' ? 'success' : u.status === 'pending' ? 'warning' : 'danger'}>
                  {u.status}
                </Badge>
              </div>
            ))}
          </div>
        </div>
      </div>
    </AdminLayout>
  );
}
