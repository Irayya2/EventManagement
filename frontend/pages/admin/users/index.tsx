

import React, { useState, useEffect } from 'react';
import { AdminLayout } from '@/layouts/AdminLayout';
import { Badge } from '@/components/ui/Badge';
import api from '@/js/api/api';
import toast from 'react-hot-toast';
import { FiSearch, FiCheck, FiX, FiTrash2, FiShield } from 'react-icons/fi';

export default function AdminUsers() {
  const [users, setUsers] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');

  const fetchUsers = async () => {
    try {
      const res = await api.get(`/users?search=${search}`);
      setUsers(res.data.users);
    } catch (err) {
      toast.error('Failed to load users');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { fetchUsers(); }, [search]);

  const handleApprove = async (userId: number) => {
    try {
      await api.post(`/auth/approve-user`, { user_id: userId, action: 'approve' });
      toast.success('User approved');
      fetchUsers();
    } catch (err) { toast.error('Failed to approve'); }
  };

  const handleReject = async (userId: number) => {
    try {
      await api.post(`/auth/approve-user`, { user_id: userId, action: 'reject' });
      toast.success('User rejected');
      fetchUsers();
    } catch (err) { toast.error('Failed to reject'); }
  };

  const handleDelete = async (userId: number) => {
    if (!confirm('Delete this user permanently?')) return;
    try {
      await api.delete(`/users/${userId}`);
      toast.success('User deleted');
      fetchUsers();
    } catch (err) { toast.error('Failed to delete'); }
  };

  const filteredUsers = users.filter(u =>
    u.username?.toLowerCase().includes(search.toLowerCase()) ||
    u.email?.toLowerCase().includes(search.toLowerCase())
  );

  const roleColors: Record<string, string> = {
    admin: 'bg-teal-50 text-teal-700 border-teal-100',
    organizer: 'bg-emerald-50 text-emerald-700 border-emerald-100',
    staff: 'bg-amber-50 text-amber-700 border-amber-100',
    participant: 'bg-cyan-50 text-cyan-700 border-cyan-100',
  };

  return (
    <AdminLayout
      allowedRoles={['admin']}
      title="User Management"
      description="View, approve, and manage all platform users."
    >
      {/* Search Bar */}
      <div className="mb-6 relative max-w-md">
        <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none">
          <FiSearch className="text-gray-400" />
        </div>
        <input
          type="text"
          placeholder="Search by name or email..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="pl-10 w-full bg-white border border-gray-200 text-gray-900 rounded-xl py-2.5 shadow-sm outline-none placeholder-gray-400 focus:ring-2 focus:ring-teal-500/20 focus:border-teal-500 transition-all text-sm"
        />
      </div>

      {/* Data Table */}
      <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
        {loading ? (
          <div className="p-12 flex justify-center">
            <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-teal-600"></div>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="min-w-full">
              <thead>
                <tr className="border-b border-gray-100 bg-gray-50/50">
                  <th className="px-6 py-4 text-left text-xs font-bold text-gray-500 uppercase tracking-wider">User</th>
                  <th className="px-6 py-4 text-left text-xs font-bold text-gray-500 uppercase tracking-wider">Role</th>
                  <th className="px-6 py-4 text-left text-xs font-bold text-gray-500 uppercase tracking-wider">Status</th>
                  <th className="px-6 py-4 text-left text-xs font-bold text-gray-500 uppercase tracking-wider">Phone</th>
                  <th className="px-6 py-4 text-right text-xs font-bold text-gray-500 uppercase tracking-wider">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-50">
                {filteredUsers.map((user) => (
                  <tr key={user.id} className="hover:bg-gray-50/50 transition-colors">
                    <td className="px-6 py-4">
                      <div className="flex items-center space-x-3">
                        <div className={`w-9 h-9 rounded-full bg-gradient-to-br from-teal-500 to-cyan-500 flex items-center justify-center text-white text-xs font-bold flex-shrink-0`}>
                          {user.username?.charAt(0)?.toUpperCase() || 'U'}
                        </div>
                        <div>
                          <p className="text-sm font-semibold text-gray-900">{user.username}</p>
                          <p className="text-xs text-gray-400">{user.email}</p>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <span className={`inline-flex items-center space-x-1 px-2.5 py-1 rounded-lg text-xs font-semibold border capitalize ${roleColors[user.role] || 'bg-gray-50 text-gray-700 border-gray-100'}`}>
                        <FiShield className="text-[10px]" />
                        <span>{user.role}</span>
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <Badge variant={user.status === 'approved' ? 'success' : user.status === 'pending' ? 'warning' : 'danger'}>
                        {user.status}
                      </Badge>
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-500">{user.phone || '—'}</td>
                    <td className="px-6 py-4 text-right">
                      <div className="flex items-center justify-end space-x-1">
                        {user.status === 'pending' && (
                          <>
                            <button onClick={() => handleApprove(user.id)} title="Approve"
                              className="p-2 rounded-lg text-emerald-600 hover:bg-emerald-50 transition-colors">
                              <FiCheck />
                            </button>
                            <button onClick={() => handleReject(user.id)} title="Reject"
                              className="p-2 rounded-lg text-amber-600 hover:bg-amber-50 transition-colors">
                              <FiX />
                            </button>
                          </>
                        )}
                        <button onClick={() => handleDelete(user.id)} title="Delete"
                          className="p-2 rounded-lg text-red-500 hover:bg-red-50 transition-colors">
                          <FiTrash2 />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
                {filteredUsers.length === 0 && (
                  <tr>
                    <td colSpan={5} className="px-6 py-12 text-center text-gray-400">No users found matching your search.</td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </AdminLayout>
  );
}
