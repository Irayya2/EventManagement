

import { useAuth } from '@/hooks/useAuth';
import { useRouter } from 'next/router';
import { useEffect } from 'react';

export const ProtectedRoute = ({
  children,
  allowedRoles = [],
}: {
  children: React.ReactNode;
  allowedRoles?: string[];
}) => {
  const { user, loading, isAuthenticated } = useAuth();
  const router = useRouter();
  const pathname = router.pathname;

  useEffect(() => {
    if (!loading) {
      if (!isAuthenticated) {
        router.push(`/login?redirect=${pathname}`);
      } else if (allowedRoles.length > 0 && user && !allowedRoles.includes(user.role)) {
        // Redirect completely if wrong role
        if (user.role === 'admin') router.replace('/admin');
        else if (user.role === 'organizer') router.replace('/dashboard');
        else router.replace('/events');
      }
    }
  }, [loading, isAuthenticated, user, router, pathname, allowedRoles]);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-50/50 backdrop-blur-sm z-50 fixed inset-0">
        <div className="relative">
          <div className="absolute -inset-4 bg-gradient-to-r from-teal-500 to-cyan-500 rounded-full opacity-20 blur-lg animate-pulse"></div>
          <div className="animate-spin rounded-full h-12 w-12 border-2 border-transparent border-t-teal-500 border-r-cyan-500"></div>
          <div className="absolute inset-0 rounded-full border-2 border-slate-100 opacity-20"></div>
        </div>
      </div>
    );
  }

  if (!isAuthenticated || (allowedRoles.length > 0 && user && !allowedRoles.includes(user.role))) {
    return null;
  }

  return <>{children}</>;
};
