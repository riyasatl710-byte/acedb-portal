import React, { useEffect } from 'react';
import { Outlet, Link, useNavigate, useLocation } from 'react-router-dom';
import { useAuthStore } from '../store/authStore';
import { useDataStore } from '../store/dataStore';
import { motion, AnimatePresence } from 'motion/react';
import { 
  LayoutDashboard, 
  Users, 
  LogOut, 
  LogIn, 
  Building2, 
  FileText,
  Bell,
  Settings,
  FolderKanban,
  ShieldCheck
} from 'lucide-react';

export function Layout() {
  const { user, isAuthenticated, logout } = useAuthStore();
  const { fetchData, notifications } = useDataStore();
  const navigate = useNavigate();
  const location = useLocation();

  const unreadCount = notifications.filter(n => !n.read).length;

  useEffect(() => {
    if (isAuthenticated) {
      fetchData();
    }
  }, [isAuthenticated, fetchData]);

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  const navItems = isAuthenticated ? [
    { name: 'Dashboard', path: '/dashboard', icon: LayoutDashboard },
    { name: 'Employee Registry', path: '/employees', icon: Users },
    { name: 'Schemes', path: '/schemes', icon: FolderKanban },
    { name: 'User Management', path: '/users', icon: ShieldCheck, restricted: ['Super Admin', 'IT Admin'] },
    { name: 'Reports', path: '/reports', icon: FileText },
    { name: 'Settings', path: '/settings', icon: Settings },
  ].filter(item => !item.restricted || (user && item.restricted.includes(user.role))) : [
    { name: 'Public Dashboard', path: '/', icon: LayoutDashboard },
  ];

  return (
    <div className="h-screen w-full bg-slate-50 flex overflow-hidden font-sans text-slate-800">
      {/* Sidebar */}
      <aside className="w-60 bg-slate-900 text-white flex flex-col h-full py-6 flex-shrink-0 shadow-xl z-20">
        <div className="px-6 pb-8 font-bold text-xl flex items-center gap-3 tracking-tight">
          <div className="w-8 h-8 bg-amber-500 rounded-lg flex items-center justify-center shadow-lg shadow-amber-500/20">
            <Building2 className="h-5 w-5 text-slate-900" />
          </div>
          ACEDB
        </div>
        
        <nav className="flex-1 flex flex-col gap-1">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = location.pathname === item.path || (item.path !== '/' && location.pathname.startsWith(item.path));
            return (
              <Link
                key={item.name}
                to={item.path}
                className={`px-6 py-3 flex items-center gap-3 text-sm transition-all duration-300 border-l-4 ${
                  isActive 
                    ? 'text-amber-400 bg-white/10 border-amber-500' 
                    : 'text-slate-400 border-transparent hover:bg-white/5 hover:text-amber-200 hover:pl-8'
                }`}
              >
                <Icon className={`h-5 w-5 transition-transform duration-300 ${isActive ? 'scale-110' : ''}`} />
                <span>{item.name}</span>
              </Link>
            );
          })}
        </nav>

        {isAuthenticated && (
          <div className="px-6 mt-auto">
            <button 
              onClick={handleLogout}
              className="flex items-center gap-3 text-sm text-slate-400 hover:text-amber-400 transition-colors w-full py-3 group"
            >
              <LogOut className="h-5 w-5 group-hover:-translate-x-1 transition-transform" />
              <span>Logout</span>
            </button>
          </div>
        )}
      </aside>

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col h-full overflow-hidden relative">
        {/* Header */}
        <header className="h-16 border-b border-slate-200 bg-white/80 backdrop-blur-md flex items-center justify-between px-8 flex-shrink-0 z-10 sticky top-0">
          <div className="font-semibold text-lg text-slate-800">
            {isAuthenticated ? 'Department Overview' : 'Public Information'}
          </div>
          
          <div className="flex items-center gap-4">
            {isAuthenticated ? (
              <div className="flex items-center gap-4">
                <Link to="/settings" className="text-slate-400 hover:text-amber-500 transition-colors relative hover:scale-110 duration-200">
                  <Bell className="h-5 w-5" />
                  {unreadCount > 0 && (
                    <span className="absolute -top-1.5 -right-1.5 h-4 w-4 bg-red-500 text-white text-[10px] font-bold flex items-center justify-center rounded-full shadow-sm">
                      {unreadCount}
                    </span>
                  )}
                </Link>
                <div className="flex items-center gap-3 pl-4 border-l border-slate-200">
                  <span className="text-sm text-slate-600">Welcome, <strong className="text-slate-900">{user?.name}</strong></span>
                  <span className="bg-amber-100 text-amber-800 px-3 py-1 rounded-full text-xs font-semibold shadow-sm">
                    {user?.role}
                  </span>
                </div>
              </div>
            ) : (
              location.pathname !== '/login' && (
                <Link 
                  to="/login"
                  className="flex items-center gap-2 bg-amber-500 hover:bg-amber-600 text-slate-900 px-5 py-2.5 rounded-lg text-sm font-bold transition-all duration-300 hover:shadow-lg hover:shadow-amber-500/30 hover:-translate-y-0.5 active:scale-95"
                >
                  <LogIn className="h-4 w-4" />
                  <span>Staff Login</span>
                </Link>
              )
            )}
          </div>
        </header>

        {/* Scrollable Content with Page Transitions */}
        <main className="flex-1 overflow-auto p-6 bg-slate-50/50">
          <AnimatePresence mode="wait">
            <motion.div
              key={location.pathname}
              initial={{ opacity: 0, y: 15, scale: 0.98 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -15, scale: 0.98 }}
              transition={{ duration: 0.3, ease: "easeOut" }}
              className="h-full"
            >
              <Outlet />
            </motion.div>
          </AnimatePresence>
        </main>
      </div>
    </div>
  );
}
