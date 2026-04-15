import React from 'react';
import { useAuthStore } from '../store/authStore';
import { User, Shield, Key, Bell, Database } from 'lucide-react';

export function Settings() {
  const user = useAuthStore((state) => state.user);

  return (
    <div className="h-full flex flex-col max-w-4xl mx-auto">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-slate-900">Settings</h1>
        <p className="text-slate-500 mt-1 text-sm">Manage your account and system preferences.</p>
      </div>

      <div className="bg-white border border-slate-200 rounded-xl shadow-sm overflow-hidden flex-1 hover:shadow-md transition-shadow duration-300">
        <div className="flex flex-col md:flex-row h-full">
          {/* Settings Nav */}
          <div className="w-full md:w-64 border-r border-slate-200 bg-slate-50/50 p-4">
            <nav className="space-y-1">
              <button className="w-full flex items-center gap-3 px-4 py-2.5 text-sm font-medium rounded-lg bg-amber-50 text-amber-700 transition-colors">
                <User className="h-4 w-4" />
                Profile
              </button>
              <button className="w-full flex items-center gap-3 px-4 py-2.5 text-sm font-medium rounded-lg text-slate-600 hover:bg-amber-50 hover:text-amber-700 transition-colors">
                <Shield className="h-4 w-4" />
                Security
              </button>
              <button className="w-full flex items-center gap-3 px-4 py-2.5 text-sm font-medium rounded-lg text-slate-600 hover:bg-amber-50 hover:text-amber-700 transition-colors">
                <Bell className="h-4 w-4" />
                Notifications
              </button>
              {(user?.role === 'Super Admin' || user?.role === 'IT Admin') && (
                <button className="w-full flex items-center gap-3 px-4 py-2.5 text-sm font-medium rounded-lg text-slate-600 hover:bg-amber-50 hover:text-amber-700 transition-colors">
                  <Database className="h-4 w-4" />
                  System Config
                </button>
              )}
            </nav>
          </div>

          {/* Settings Content */}
          <div className="flex-1 p-8">
            <h3 className="text-lg font-semibold text-slate-800 mb-6">Profile Information</h3>
            
            <div className="space-y-6 max-w-lg">
              <div className="flex items-center gap-6">
                <div className="w-20 h-20 bg-amber-100 rounded-full flex items-center justify-center text-amber-600 text-2xl font-bold hover:scale-105 transition-transform cursor-pointer shadow-sm">
                  {user?.name.charAt(0)}
                </div>
                <div>
                  <button className="px-4 py-2 bg-white border border-slate-200 rounded-lg text-sm font-medium text-slate-700 hover:bg-slate-50 hover:border-amber-300 transition-colors">
                    Change Avatar
                  </button>
                </div>
              </div>

              <div className="grid grid-cols-1 gap-6">
                <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-2">Full Name</label>
                  <input
                    type="text"
                    defaultValue={user?.name}
                    className="block w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-amber-500 sm:text-sm text-slate-800 transition-colors"
                    readOnly
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-2">Role</label>
                  <input
                    type="text"
                    defaultValue={user?.role}
                    className="block w-full px-3 py-2 border border-slate-200 bg-slate-50 rounded-lg sm:text-sm text-slate-500"
                    readOnly
                  />
                </div>

                {user?.district && (
                  <div>
                    <label className="block text-sm font-semibold text-slate-700 mb-2">Assigned District</label>
                    <input
                      type="text"
                      defaultValue={user?.district}
                      className="block w-full px-3 py-2 border border-slate-200 bg-slate-50 rounded-lg sm:text-sm text-slate-500"
                      readOnly
                    />
                  </div>
                )}
              </div>

              <div className="pt-6 border-t border-slate-200">
                <button className="px-5 py-2.5 bg-amber-500 text-slate-900 rounded-lg text-sm font-bold hover:bg-amber-600 transition-all shadow-sm hover:shadow-amber-500/30 active:scale-95">
                  Save Changes
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
