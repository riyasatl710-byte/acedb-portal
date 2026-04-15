import React from 'react';
import { useAuthStore } from '../store/authStore';
import { IndianRupee, Users, AlertTriangle, CheckCircle2, Bell, FileText, CalendarClock, Mail, Server } from 'lucide-react';

export function InternalDashboard() {
  const user = useAuthStore((state) => state.user);

  return (
    <div className="grid grid-cols-1 md:grid-cols-4 gap-4 auto-rows-min">
      {/* Top Stats Row */}
      <div className="bg-white border border-slate-200 rounded-xl p-5 flex flex-col relative hover:-translate-y-1 hover:shadow-lg transition-all duration-300">
        <div className="text-xs font-semibold text-slate-500 uppercase tracking-wide mb-2">Total Salary Paid</div>
        <div className="text-3xl font-bold text-slate-800">₹45.2 L</div>
        <div className="text-emerald-500 text-xs font-semibold mt-1 flex items-center gap-1">
          <CheckCircle2 className="h-3 w-3" /> Cleared this month
        </div>
      </div>

      <div className="bg-white border border-slate-200 rounded-xl p-5 flex flex-col relative hover:-translate-y-1 hover:shadow-lg transition-all duration-300">
        <div className="text-xs font-semibold text-slate-500 uppercase tracking-wide mb-2">Pending Payments</div>
        <div className="text-3xl font-bold text-slate-800">₹3.8 L</div>
        <div className="text-red-500 text-xs font-semibold mt-1 flex items-center gap-1">
          <AlertTriangle className="h-3 w-3" /> 12 employees pending
        </div>
      </div>

      <div className="bg-white border border-slate-200 rounded-xl p-5 flex flex-col relative hover:-translate-y-1 hover:shadow-lg transition-all duration-300">
        <div className="text-xs font-semibold text-slate-500 uppercase tracking-wide mb-2">Active Contracts</div>
        <div className="text-3xl font-bold text-slate-800">1,420</div>
        <div className="text-slate-500 text-xs font-semibold mt-1">
          Across all schemes
        </div>
      </div>

      <div className="bg-white border border-slate-200 rounded-xl p-5 flex flex-col relative hover:-translate-y-1 hover:shadow-lg transition-all duration-300">
        <div className="text-xs font-semibold text-slate-500 uppercase tracking-wide mb-2">Expiring Soon</div>
        <div className="text-3xl font-bold text-slate-800">45</div>
        <div className="text-amber-500 text-xs font-semibold mt-1 flex items-center gap-1">
          <CalendarClock className="h-3 w-3" /> Contracts expiring in 30 days
        </div>
      </div>

      {/* Bento Grid Large Cards */}
      <div className="bg-white border border-slate-200 rounded-xl p-5 flex flex-col relative md:col-span-2 md:row-span-2 min-h-[320px] hover:-translate-y-1 hover:shadow-lg transition-all duration-300">
        <div className="text-xs font-semibold text-slate-500 uppercase tracking-wide mb-4">Monthly Honorarium Trend</div>
        <div className="flex-1 flex items-end gap-2 pt-2">
          {/* Mock Chart Bars */}
          <div className="flex-1 bg-slate-200 rounded-t-md transition-all duration-300 hover:bg-amber-400" style={{ height: '40%' }}></div>
          <div className="flex-1 bg-slate-200 rounded-t-md transition-all duration-300 hover:bg-amber-400" style={{ height: '55%' }}></div>
          <div className="flex-1 bg-slate-200 rounded-t-md transition-all duration-300 hover:bg-amber-400" style={{ height: '48%' }}></div>
          <div className="flex-1 bg-slate-200 rounded-t-md transition-all duration-300 hover:bg-amber-400" style={{ height: '70%' }}></div>
          <div className="flex-1 bg-slate-200 rounded-t-md transition-all duration-300 hover:bg-amber-400" style={{ height: '85%' }}></div>
          <div className="flex-1 bg-amber-500 rounded-t-md transition-all duration-300" style={{ height: '95%' }}></div>
        </div>
        <div className="flex justify-between mt-3 text-[10px] font-semibold text-slate-400">
          <span>APR</span><span>MAY</span><span>JUN</span><span>JUL</span><span>AUG</span><span>SEP</span>
        </div>
      </div>

      <div className="bg-white border border-slate-200 rounded-xl p-5 flex flex-col relative md:col-span-2 md:row-span-2 min-h-[320px] hover:-translate-y-1 hover:shadow-lg transition-all duration-300">
        <div className="text-xs font-semibold text-slate-500 uppercase tracking-wide mb-4">Recent Employee Updates</div>
        <div className="flex-1 overflow-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr>
                <th className="py-3 px-2 text-[10px] uppercase text-slate-500 border-b border-slate-200 font-semibold">Name</th>
                <th className="py-3 px-2 text-[10px] uppercase text-slate-500 border-b border-slate-200 font-semibold">Designation</th>
                <th className="py-3 px-2 text-[10px] uppercase text-slate-500 border-b border-slate-200 font-semibold">District</th>
                <th className="py-3 px-2 text-[10px] uppercase text-slate-500 border-b border-slate-200 font-semibold">Status</th>
              </tr>
            </thead>
            <tbody>
              <tr className="hover:bg-amber-50 transition-colors">
                <td className="py-3 px-2 text-sm border-b border-slate-100 text-slate-800">Kiran Kumar</td>
                <td className="py-3 px-2 text-sm border-b border-slate-100 text-slate-600">Field Officer</td>
                <td className="py-3 px-2 text-sm border-b border-slate-100 text-slate-600">Kottayam</td>
                <td className="py-3 px-2 text-sm border-b border-slate-100"><span className="inline-block w-2 h-2 rounded-full bg-emerald-500 mr-2"></span>Active</td>
              </tr>
              <tr className="hover:bg-amber-50 transition-colors">
                <td className="py-3 px-2 text-sm border-b border-slate-100 text-slate-800">Meera S.</td>
                <td className="py-3 px-2 text-sm border-b border-slate-100 text-slate-600">Data Entry</td>
                <td className="py-3 px-2 text-sm border-b border-slate-100 text-slate-600">Idukki</td>
                <td className="py-3 px-2 text-sm border-b border-slate-100"><span className="inline-block w-2 h-2 rounded-full bg-emerald-500 mr-2"></span>Active</td>
              </tr>
              <tr className="hover:bg-amber-50 transition-colors">
                <td className="py-3 px-2 text-sm border-b border-slate-100 text-slate-800">Rajesh P.</td>
                <td className="py-3 px-2 text-sm border-b border-slate-100 text-slate-600">Assistant</td>
                <td className="py-3 px-2 text-sm border-b border-slate-100 text-slate-600">Thrissur</td>
                <td className="py-3 px-2 text-sm border-b border-slate-100"><span className="inline-block w-2 h-2 rounded-full bg-red-500 mr-2"></span>Suspended</td>
              </tr>
              <tr className="hover:bg-amber-50 transition-colors">
                <td className="py-3 px-2 text-sm border-b border-slate-100 text-slate-800">Sreejith V.</td>
                <td className="py-3 px-2 text-sm border-b border-slate-100 text-slate-600">Driver</td>
                <td className="py-3 px-2 text-sm border-b border-slate-100 text-slate-600">Palakkad</td>
                <td className="py-3 px-2 text-sm border-b border-slate-100"><span className="inline-block w-2 h-2 rounded-full bg-amber-500 mr-2"></span>On Leave</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      <div className="bg-white border border-slate-200 rounded-xl p-5 flex flex-col relative md:col-span-2 md:row-span-2 min-h-[320px] hover:-translate-y-1 hover:shadow-lg transition-all duration-300">
        <div className="text-xs font-semibold text-slate-500 uppercase tracking-wide mb-4">Quick Actions</div>
        <div className="flex-1 grid grid-cols-1 sm:grid-cols-2 gap-4">
          {(user?.role === 'Super Admin' || user?.role === 'Section Admin') && (
            <button className="p-4 border border-slate-200 rounded-xl hover:border-amber-500 hover:shadow-sm transition-all text-left group bg-slate-50 hover:bg-white flex flex-col justify-center">
              <h4 className="font-semibold text-slate-800 group-hover:text-amber-600 text-sm">Update Honorarium</h4>
              <p className="text-xs text-slate-500 mt-1">Revise salary structures based on new GOs.</p>
            </button>
          )}
          
          {(user?.role === 'Super Admin' || user?.role === 'District Admin') && (
            <button className="p-4 border border-slate-200 rounded-xl hover:border-amber-500 hover:shadow-sm transition-all text-left group bg-slate-50 hover:bg-white flex flex-col justify-center">
              <h4 className="font-semibold text-slate-800 group-hover:text-amber-600 text-sm">Process Leave (CL/EL)</h4>
              <p className="text-xs text-slate-500 mt-1">Approve and track employee leave requests.</p>
            </button>
          )}

          {(user?.role === 'Super Admin' || user?.role === 'IT Admin') && (
            <button className="p-4 border border-slate-200 rounded-xl hover:border-amber-500 hover:shadow-sm transition-all text-left group bg-slate-50 hover:bg-white flex flex-col justify-center">
              <h4 className="font-semibold text-slate-800 group-hover:text-amber-600 text-sm">Manage Users</h4>
              <p className="text-xs text-slate-500 mt-1">Add new staff accounts or reset passwords.</p>
            </button>
          )}
        </div>
      </div>

      <div className="bg-white border border-slate-200 rounded-xl p-5 flex flex-col relative md:col-span-2 md:row-span-2 min-h-[320px] hover:-translate-y-1 hover:shadow-lg transition-all duration-300">
        <div className="text-xs font-semibold text-slate-500 uppercase tracking-wide mb-4">System Notifications</div>
        <div className="flex-1 flex flex-col">
          <div className="flex gap-3 py-3 border-b border-slate-100">
            <div className="w-8 h-8 bg-amber-50 text-amber-600 rounded-lg flex-shrink-0 flex items-center justify-center">
              <FileText className="h-4 w-4" />
            </div>
            <div>
              <div className="font-semibold text-sm text-slate-800">GO (RT) No. 45/2024 issued</div>
              <div className="text-xs text-slate-500 mt-0.5">Honorarium revision for Section Admins</div>
            </div>
          </div>
          <div className="flex gap-3 py-3 border-b border-slate-100">
            <div className="w-8 h-8 bg-amber-50 text-amber-600 rounded-lg flex-shrink-0 flex items-center justify-center">
              <AlertTriangle className="h-4 w-4" />
            </div>
            <div>
              <div className="font-semibold text-sm text-slate-800">Contract Expiry Alert</div>
              <div className="text-xs text-slate-500 mt-0.5">12 employees in District: Kannur</div>
            </div>
          </div>
          <div className="flex gap-3 py-3">
            <div className="w-8 h-8 bg-slate-100 text-slate-600 rounded-lg flex-shrink-0 flex items-center justify-center">
              <Server className="h-4 w-4" />
            </div>
            <div>
              <div className="font-semibold text-sm text-slate-800">System Maintenance Scheduled</div>
              <div className="text-xs text-slate-500 mt-0.5">Database optimization at 02:00 AM IST</div>
            </div>
          </div>
        </div>
      </div>

    </div>
  );
}
