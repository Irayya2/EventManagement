

import Link from 'next/link';
import { useAuth } from '../hooks/useAuth';
import { useRouter } from 'next/router';
import { FiLogOut, FiCalendar, FiUsers, FiDollarSign, FiMapPin, FiTruck, FiPieChart, FiGrid, FiCheckSquare } from 'react-icons/fi';

export const Sidebar = () => {
  const { user, logout } = useAuth();
  const router = useRouter();
  const pathname = router.pathname;

  if (!user) return null;

  const getNavItems = () => {
    const items = [];
    
    if (user.role === 'admin') {
      items.push({ name: 'Dashboard', path: '/admin', icon: <FiGrid /> });
      items.push({ name: 'Users', path: '/admin/users', icon: <FiUsers /> });
      items.push({ name: 'Financials', path: '/admin/financials', icon: <FiDollarSign /> });
    }
    
    if (user.role === 'organizer') {
      items.push({ name: 'Dashboard', path: '/dashboard', icon: <FiGrid /> });
      items.push({ name: 'My Events', path: '/events/manage', icon: <FiCalendar /> });
      items.push({ name: 'Finances', path: '/organizer/finances', icon: <FiDollarSign /> });
    }
    
    if (['admin', 'organizer'].includes(user.role)) {
      items.push({ name: 'Venues', path: '/venues', icon: <FiMapPin /> });
      items.push({ name: 'Vendors', path: '/vendors', icon: <FiTruck /> });
    }
    
    if (user.role === 'staff') {
      items.push({ name: 'My Tasks', path: '/staff', icon: <FiCheckSquare /> });
    }
    
    items.push({ name: 'Discover Events', path: '/events', icon: <FiCalendar /> });
    
    if (user.role === 'participant') {
      items.push({ name: 'My Registrations', path: '/my-events', icon: <FiCalendar /> });
      items.push({ name: 'My Payments', path: '/my-payments', icon: <FiDollarSign /> });
    }

    return items;
  };

  const navItems = getNavItems();

  const roleColors: Record<string, string> = {
    admin: 'from-teal-500 to-cyan-600',
    organizer: 'from-emerald-500 to-teal-600',
    staff: 'from-amber-500 to-orange-500',
    participant: 'from-cyan-500 to-blue-500',
  };
  
  const roleBg = roleColors[user.role] || 'from-teal-500 to-cyan-600';

  return (
    <div className="w-64 bg-white min-h-screen flex flex-col fixed left-0 top-0 border-r border-gray-200/80 shadow-sm z-40">
      
      {/* Logo & Role Header */}
      <div className={`p-5 bg-gradient-to-br ${roleBg} text-white`}>
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 rounded-xl bg-white/20 backdrop-blur-sm flex items-center justify-center text-lg font-black">
            E
          </div>
          <div>
            <h1 className="text-lg font-bold tracking-tight">EventMaster</h1>
            <p className="text-[11px] uppercase tracking-widest opacity-80 font-semibold">{user.role} Panel</p>
          </div>
        </div>
      </div>
      
      {/* Navigation */}
      <nav className="flex-1 px-3 pt-5 space-y-1 overflow-y-auto">
        <p className="px-3 text-[10px] font-bold uppercase text-gray-400 tracking-widest mb-3">Navigation</p>
        {navItems.map((item) => {
          const isActive = pathname === item.path || (item.path !== '/events' && pathname?.startsWith(`${item.path}/`));
          return (
            <Link
              key={item.path}
              href={item.path}
              className={`flex items-center space-x-3 px-3 py-2.5 rounded-lg text-[13px] font-medium transition-all duration-200 ${
                isActive 
                  ? `bg-gradient-to-r ${roleBg} text-white shadow-md shadow-teal-200/50` 
                  : 'text-gray-600 hover:bg-gray-100 hover:text-gray-900'
              }`}
            >
              <span className={`text-base ${isActive ? 'text-white' : 'text-gray-400'}`}>{item.icon}</span>
              <span>{item.name}</span>
              {isActive && <span className="ml-auto w-1.5 h-1.5 rounded-full bg-white/80"></span>}
            </Link>
          );
        })}
      </nav>

      {/* User Footer */}
      <div className="p-3 border-t border-gray-100 bg-gray-50/50">
        <div className="flex items-center space-x-3 px-2 py-2">
          <div className={`w-9 h-9 rounded-full bg-gradient-to-br ${roleBg} flex items-center justify-center text-white font-bold text-sm shadow-sm`}>
            {user.name.charAt(0).toUpperCase()}
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-sm font-semibold text-gray-800 truncate">{user.name}</p>
            <p className="text-[11px] text-gray-400 truncate">{user.email}</p>
          </div>
        </div>
        <button
          onClick={logout}
          className="mt-2 w-full flex items-center justify-center space-x-2 px-4 py-2 rounded-lg text-sm font-medium text-red-600 bg-red-50 hover:bg-red-100 transition-colors"
        >
          <FiLogOut className="text-sm" />
          <span>Sign Out</span>
        </button>
      </div>
    </div>
  );
};
