import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuthStore, Role } from '../store/authStore';
import { Lock, User, AlertCircle, Building2 } from 'lucide-react';

export function Login() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const login = useAuthStore((state) => state.login);
  const navigate = useNavigate();

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Mock authentication logic based on username
    let role: Role | null = null;
    let name = '';

    if (username === 'superadmin' && password === 'admin123') {
      role = 'Super Admin';
      name = 'System Administrator';
    } else if (username === 'sectionadmin' && password === 'admin123') {
      role = 'Section Admin';
      name = 'Section Head';
    } else if (username === 'districtadmin' && password === 'admin123') {
      role = 'District Admin';
      name = 'District Coordinator';
    } else if (username === 'itadmin' && password === 'admin123') {
      role = 'IT Admin';
      name = 'IT Support';
    } else if (username === 'viewer' && password === 'viewer123') {
      role = 'Viewer';
      name = 'Guest Viewer';
    }

    if (role) {
      login({ id: '1', name, role, district: role === 'District Admin' ? 'North District' : undefined });
      navigate('/dashboard');
    } else {
      setError('Invalid credentials. Please try again.');
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 flex items-center justify-center p-4 font-sans">
      <div className="bg-white p-8 rounded-2xl shadow-sm border border-slate-200 w-full max-w-md">
        <div className="text-center mb-8 flex flex-col items-center">
          <div className="w-12 h-12 bg-amber-500 rounded-xl flex items-center justify-center mb-4 shadow-sm">
            <Building2 className="h-6 w-6 text-slate-900" />
          </div>
          <h2 className="text-2xl font-bold text-slate-900">ACEDB Login</h2>
          <p className="text-slate-500 mt-2 text-sm">Enter your credentials to access the system</p>
        </div>

        {error && (
          <div className="mb-6 p-4 bg-red-50 border-l-4 border-red-500 rounded-md flex items-start space-x-3">
            <AlertCircle className="h-5 w-5 text-red-500 mt-0.5" />
            <p className="text-sm text-red-700">{error}</p>
          </div>
        )}

        <form onSubmit={handleLogin} className="space-y-6">
          <div>
            <label className="block text-sm font-semibold text-slate-700 mb-2">Username</label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <User className="h-5 w-5 text-slate-400" />
              </div>
              <input
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="block w-full pl-10 pr-3 py-2.5 border border-slate-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-amber-500 sm:text-sm transition-colors text-slate-800"
                placeholder="e.g., superadmin"
                required
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-semibold text-slate-700 mb-2">Password</label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Lock className="h-5 w-5 text-slate-400" />
              </div>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="block w-full pl-10 pr-3 py-2.5 border border-slate-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-amber-500 sm:text-sm transition-colors text-slate-800"
                placeholder="••••••••"
                required
              />
            </div>
          </div>

          <button
            type="submit"
            className="w-full flex justify-center py-3 px-4 border border-transparent rounded-lg shadow-sm text-sm font-bold text-slate-900 bg-amber-500 hover:bg-amber-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-amber-500 transition-all hover:shadow-lg hover:shadow-amber-500/30 active:scale-95"
          >
            Sign In
          </button>
        </form>

        <div className="mt-8 pt-6 border-t border-slate-100">
          <h4 className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-3">Demo Accounts</h4>
          <div className="grid grid-cols-2 gap-2 text-xs text-slate-600">
            <div><span className="font-semibold text-slate-800">superadmin</span> / admin123</div>
            <div><span className="font-semibold text-slate-800">sectionadmin</span> / admin123</div>
            <div><span className="font-semibold text-slate-800">districtadmin</span> / admin123</div>
            <div><span className="font-semibold text-slate-800">itadmin</span> / admin123</div>
          </div>
        </div>
      </div>
    </div>
  );
}
