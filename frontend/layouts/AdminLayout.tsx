'use client';

import React from 'react';
import { Sidebar } from '@/components/Sidebar';
import { ProtectedRoute } from '@/components/ProtectedRoute';
import { useAuth } from '@/hooks/useAuth';

interface AdminLayoutProps {
  children: React.ReactNode;
  allowedRoles?: string[];
  title?: string;
  description?: string;
}

export const AdminLayout: React.FC<AdminLayoutProps> = ({ 
  children, 
  allowedRoles = ['admin', 'organizer', 'staff'],
  title,
  description
}) => {
  const { user } = useAuth();

  const roleColors: Record<string, string> = {
    admin: 'from-teal-500 to-cyan-600',
    organizer: 'from-emerald-500 to-teal-600',
    staff: 'from-amber-500 to-orange-500',
    participant: 'from-cyan-500 to-blue-500',
  };

  const gradient = roleColors[user?.role || 'admin'] || 'from-teal-500 to-cyan-600';

  return (
    <ProtectedRoute allowedRoles={allowedRoles}>
      <div className="flex h-screen bg-gray-50/80 overflow-hidden font-sans">
        
        <Sidebar />

        <div className="flex-1 flex flex-col ml-64 overflow-hidden">
          
          {/* Top Header Bar */}
          <header className="bg-white border-b border-gray-100 h-16 flex items-center px-8 shadow-sm flex-shrink-0">
            <div className="flex items-center space-x-3">
              <div className={`w-2 h-8 rounded-full bg-gradient-to-b ${gradient}`}></div>
              <h2 className="text-lg font-bold text-gray-800">{title || 'Dashboard'}</h2>
            </div>
            <div className="ml-auto flex items-center space-x-4">
              <div className="text-right hidden sm:block">
                <p className="text-sm font-semibold text-gray-700">{user?.name}</p>
                <p className="text-[11px] text-gray-400 capitalize">{user?.role}</p>
              </div>
              <div className={`w-9 h-9 rounded-full bg-gradient-to-br ${gradient} flex items-center justify-center text-white font-bold text-sm shadow-sm`}>
                {user?.name?.charAt(0)?.toUpperCase() || 'U'}
              </div>
            </div>
          </header>

          {/* Scrollable Content */}
          <main className="flex-1 overflow-y-auto p-8">
            {(title || description) && (
              <div className="mb-8">
                {title && <h1 className="text-3xl font-extrabold text-gray-900 tracking-tight">{title}</h1>}
                {description && <p className="text-gray-500 mt-1.5 text-base">{description}</p>}
              </div>
            )}

            <div className="w-full max-w-7xl">
              {children}
            </div>
          </main>
        </div>
      </div>
    </ProtectedRoute>
  );
};
