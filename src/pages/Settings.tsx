import React, { useState } from 'react';
import { useAuthStore } from '../store/authStore';
import { useDataStore } from '../store/dataStore';
import { User, Shield, Bell, Database, AlertCircle, CheckCircle2 } from 'lucide-react';

export function Settings() {
  const user = useAuthStore((state) => state.user);
  const { addEmployee, addScheme, addUser } = useDataStore();
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
              <button 
                onClick={() => setActiveTab('profile')}
                className={`w-full flex items-center gap-3 px-4 py-2.5 text-sm font-medium rounded-lg transition-colors ${activeTab === 'profile' ? 'bg-amber-50 text-amber-700' : 'text-slate-600 hover:bg-amber-50 hover:text-amber-700'}`}
              >
                <User className="h-4 w-4" />
                Profile
              </button>
              <button 
                onClick={() => setActiveTab('security')}
                className={`w-full flex items-center gap-3 px-4 py-2.5 text-sm font-medium rounded-lg transition-colors ${activeTab === 'security' ? 'bg-amber-50 text-amber-700' : 'text-slate-600 hover:bg-amber-50 hover:text-amber-700'}`}
              >
                <Shield className="h-4 w-4" />
                Security
              </button>
              <button 
                onClick={() => setActiveTab('notifications')}
                className={`w-full flex items-center gap-3 px-4 py-2.5 text-sm font-medium rounded-lg transition-colors ${activeTab === 'notifications' ? 'bg-amber-50 text-amber-700' : 'text-slate-600 hover:bg-amber-50 hover:text-amber-700'}`}
              >
                <Bell className="h-4 w-4" />
                Notifications
              </button>
              {(user?.role === 'Super Admin' || user?.role === 'IT Admin') && (
                <button 
                  onClick={() => setActiveTab('system')}
                  className={`w-full flex items-center gap-3 px-4 py-2.5 text-sm font-medium rounded-lg transition-colors ${activeTab === 'system' ? 'bg-amber-50 text-amber-700' : 'text-slate-600 hover:bg-amber-50 hover:text-amber-700'}`}
                >
                  <Database className="h-4 w-4" />
                  System Config
                </button>
              )}
            </nav>
          </div>

          {/* Settings Content */}
          <div className="flex-1 p-8 overflow-y-auto">
            {activeTab === 'profile' && (
              <div>
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
            )}

            {activeTab === 'system' && (
              <div>
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

            {(activeTab === 'security' || activeTab === 'notifications') && (
              <div className="flex flex-col items-center justify-center h-64 text-slate-400">
                <AlertCircle className="h-12 w-12 mb-4 text-slate-300" />
                <p>This section is under construction.</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
