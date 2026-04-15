import React, { useState } from 'react';
import { useAuthStore } from '../store/authStore';
import { useDataStore } from '../store/dataStore';
import { User, Shield, Bell, Database, AlertCircle, CheckCircle2, Key, Info, Trash2 } from 'lucide-react';

export function Settings() {
  const user = useAuthStore((state) => state.user);
  const { addEmployee, addScheme, addUser, notifications, markNotificationRead, clearNotifications } = useDataStore();
  const [activeTab, setActiveTab] = useState('profile');
  const [isSeeding, setIsSeeding] = useState(false);
  const [seedStatus, setSeedStatus] = useState<{ type: 'success' | 'error' | null, message: string }>({ type: null, message: '' });

  const handleSeedData = async () => {
    if (!window.confirm('Are you sure you want to seed initial data? This will add sample records to your database.')) {
      return;
    }

    setIsSeeding(true);
    setSeedStatus({ type: null, message: '' });

    try {
      // Seed Schemes
      await addScheme({ name: 'NREGA', description: 'National Rural Employment Guarantee Act', budget: 50000000 });
      await addScheme({ name: 'PMAY', description: 'Pradhan Mantri Awas Yojana', budget: 75000000 });
      await addScheme({ name: 'SBM', description: 'Swachh Bharat Mission', budget: 30000000 });

      // Seed Employees
      await addEmployee({ name: 'Kiran Kumar', designation: 'Field Officer', district: 'Kottayam', scheme: 'NREGA', status: 'Active', joiningDate: '2021-05-12', salary: 25000 });
      await addEmployee({ name: 'Meera S.', designation: 'Data Entry Operator', district: 'Idukki', scheme: 'PMAY', status: 'Active', joiningDate: '2022-01-15', salary: 18000 });
      await addEmployee({ name: 'Rajesh P.', designation: 'Assistant', district: 'Thrissur', scheme: 'SBM', status: 'Suspended', joiningDate: '2020-11-01', salary: 20000 });

      // Seed Users
      await addUser({ name: 'System Administrator', email: 'admin@acedb.gov.in', role: 'Super Admin' });
      await addUser({ name: 'Section Head', email: 'section@acedb.gov.in', role: 'Section Admin' });
      await addUser({ name: 'District Coordinator', email: 'district@acedb.gov.in', role: 'District Admin' });

      setSeedStatus({ type: 'success', message: 'Sample data seeded successfully!' });
    } catch (error) {
      setSeedStatus({ type: 'error', message: 'Failed to seed data. Please try again.' });
    } finally {
      setIsSeeding(false);
    }
  };

  return (
    <div className="flex flex-col max-w-5xl mx-auto w-full pb-10">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-slate-900">Settings</h1>
        <p className="text-slate-500 mt-1 text-sm">Manage your account and system preferences.</p>
      </div>

      <div className="bg-white border border-slate-200 rounded-xl shadow-sm overflow-hidden min-h-[600px] flex flex-col md:flex-row">
        {/* Settings Nav */}
        <div className="w-full md:w-64 border-b md:border-b-0 md:border-r border-slate-200 bg-slate-50/50 p-4 flex-shrink-0">
          <nav className="flex md:flex-col gap-1 overflow-x-auto md:overflow-visible pb-2 md:pb-0">
            <button 
              type="button"
              onClick={() => setActiveTab('profile')}
              className={`flex-shrink-0 md:w-full flex items-center gap-3 px-4 py-2.5 text-sm font-medium rounded-lg transition-colors ${activeTab === 'profile' ? 'bg-amber-50 text-amber-700' : 'text-slate-600 hover:bg-amber-50 hover:text-amber-700'}`}
            >
              <User className="h-4 w-4" />
              Profile
            </button>
            <button 
              type="button"
              onClick={() => setActiveTab('security')}
              className={`flex-shrink-0 md:w-full flex items-center gap-3 px-4 py-2.5 text-sm font-medium rounded-lg transition-colors ${activeTab === 'security' ? 'bg-amber-50 text-amber-700' : 'text-slate-600 hover:bg-amber-50 hover:text-amber-700'}`}
            >
              <Shield className="h-4 w-4" />
              Security
            </button>
            <button 
              type="button"
              onClick={() => setActiveTab('notifications')}
              className={`flex-shrink-0 md:w-full flex items-center gap-3 px-4 py-2.5 text-sm font-medium rounded-lg transition-colors ${activeTab === 'notifications' ? 'bg-amber-50 text-amber-700' : 'text-slate-600 hover:bg-amber-50 hover:text-amber-700'}`}
            >
              <Bell className="h-4 w-4" />
              Notifications
            </button>
            {(user?.role === 'Super Admin' || user?.role === 'IT Admin') && (
              <button 
                type="button"
                onClick={() => setActiveTab('system')}
                className={`flex-shrink-0 md:w-full flex items-center gap-3 px-4 py-2.5 text-sm font-medium rounded-lg transition-colors ${activeTab === 'system' ? 'bg-amber-50 text-amber-700' : 'text-slate-600 hover:bg-amber-50 hover:text-amber-700'}`}
              >
                <Database className="h-4 w-4" />
                System Config
              </button>
            )}
          </nav>
        </div>

        {/* Settings Content */}
        <div className="flex-1 p-6 md:p-8">
          {activeTab === 'profile' && (
            <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
              <h3 className="text-lg font-semibold text-slate-800 mb-6">Profile Information</h3>
              
              <div className="space-y-6 max-w-lg">
                <div className="flex items-center gap-6">
                  <div className="w-20 h-20 bg-amber-100 rounded-full flex items-center justify-center text-amber-600 text-2xl font-bold hover:scale-105 transition-transform cursor-pointer shadow-sm">
                    {user?.name.charAt(0)}
                  </div>
                  <div>
                    <button type="button" className="px-4 py-2 bg-white border border-slate-200 rounded-lg text-sm font-medium text-slate-700 hover:bg-slate-50 hover:border-amber-300 transition-colors">
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
                  <button type="button" className="px-5 py-2.5 bg-amber-500 text-slate-900 rounded-lg text-sm font-bold hover:bg-amber-600 transition-all shadow-sm hover:shadow-amber-500/30 active:scale-95">
                    Save Changes
                  </button>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'security' && (
            <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
              <h3 className="text-lg font-semibold text-slate-800 mb-6">Security Settings</h3>
              
              <div className="space-y-6 max-w-lg">
                <div className="bg-slate-50 border border-slate-200 rounded-xl p-5">
                  <h4 className="font-semibold text-slate-800 mb-4 flex items-center gap-2">
                    <Key className="h-4 w-4 text-amber-600" />
                    Change Password
                  </h4>
                  
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-slate-700 mb-1">Current Password</label>
                      <input type="password" placeholder="••••••••" className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-amber-500 outline-none" />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-slate-700 mb-1">New Password</label>
                      <input type="password" placeholder="••••••••" className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-amber-500 outline-none" />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-slate-700 mb-1">Confirm New Password</label>
                      <input type="password" placeholder="••••••••" className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-amber-500 outline-none" />
                    </div>
                    <button type="button" className="mt-2 px-4 py-2 bg-slate-800 text-white rounded-lg text-sm font-medium hover:bg-slate-700 transition-colors">
                      Update Password
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'notifications' && (
            <div className="animate-in fade-in slide-in-from-bottom-4 duration-500 h-full flex flex-col">
              <div className="flex justify-between items-center mb-6">
                <h3 className="text-lg font-semibold text-slate-800">Notification Center</h3>
                {notifications.length > 0 && (
                  <button 
                    onClick={clearNotifications}
                    className="text-sm text-red-600 hover:text-red-700 hover:bg-red-50 px-3 py-1.5 rounded-md transition-colors flex items-center gap-2"
                  >
                    <Trash2 className="h-4 w-4" />
                    Clear All
                  </button>
                )}
              </div>
              
              <div className="flex-1 overflow-y-auto pr-2 space-y-3">
                {notifications.length === 0 ? (
                  <div className="text-center py-10 text-slate-500 flex flex-col items-center">
                    <Bell className="h-10 w-10 text-slate-300 mb-3" />
                    <p>No new notifications.</p>
                  </div>
                ) : (
                  notifications.map(notif => (
                    <div 
                      key={notif.id} 
                      className={`p-4 rounded-xl border ${notif.read ? 'bg-white border-slate-200' : 'bg-amber-50/50 border-amber-200'} transition-colors flex gap-4`}
                    >
                      <div className="mt-1">
                        {notif.type === 'success' && <CheckCircle2 className="h-5 w-5 text-emerald-500" />}
                        {notif.type === 'warning' && <AlertCircle className="h-5 w-5 text-amber-500" />}
                        {notif.type === 'info' && <Info className="h-5 w-5 text-blue-500" />}
                      </div>
                      <div className="flex-1">
                        <div className="flex justify-between items-start">
                          <h4 className={`text-sm font-semibold ${notif.read ? 'text-slate-700' : 'text-slate-900'}`}>{notif.title}</h4>
                          <span className="text-xs text-slate-500">{new Date(notif.date).toLocaleDateString()}</span>
                        </div>
                        <p className={`text-sm mt-1 ${notif.read ? 'text-slate-500' : 'text-slate-700'}`}>{notif.message}</p>
                        {!notif.read && (
                          <button 
                            onClick={() => markNotificationRead(notif.id)}
                            className="text-xs text-amber-600 font-medium mt-2 hover:text-amber-700"
                          >
                            Mark as read
                          </button>
                        )}
                      </div>
                    </div>
                  ))
                )}
              </div>
            </div>
          )}

          {activeTab === 'system' && (
            <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
              <h3 className="text-lg font-semibold text-slate-800 mb-6">System Configuration</h3>
              
              <div className="space-y-6 max-w-lg">
                <div className="bg-slate-50 border border-slate-200 rounded-xl p-5">
                  <h4 className="font-semibold text-slate-800 mb-2 flex items-center gap-2">
                    <Database className="h-4 w-4 text-amber-600" />
                    Database Seeding
                  </h4>
                  <p className="text-sm text-slate-600 mb-4">
                    Populate the Google Sheets database with sample data. This is useful for initial setup or testing. 
                    <strong> Note: This will append to existing data.</strong>
                  </p>
                  
                  <button 
                    type="button"
                    onClick={handleSeedData}
                    disabled={isSeeding}
                    className="px-4 py-2 bg-amber-500 text-slate-900 rounded-lg text-sm font-bold hover:bg-amber-600 transition-all shadow-sm hover:shadow-amber-500/30 active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
                  >
                    {isSeeding ? 'Seeding Data...' : 'Seed Initial Data'}
                  </button>

                  {seedStatus.type && (
                    <div className={`mt-4 p-3 rounded-lg text-sm flex items-start gap-2 ${
                      seedStatus.type === 'success' ? 'bg-emerald-50 text-emerald-700 border border-emerald-200' : 'bg-red-50 text-red-700 border border-red-200'
                    }`}>
                      {seedStatus.type === 'success' ? <CheckCircle2 className="h-4 w-4 mt-0.5 flex-shrink-0" /> : <AlertCircle className="h-4 w-4 mt-0.5 flex-shrink-0" />}
                      <span>{seedStatus.message}</span>
                    </div>
                  )}
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
