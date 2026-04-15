import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';
import { Users, Building, Briefcase, FileText } from 'lucide-react';

const schemeData = [
  { name: 'NREGA', employees: 450 },
  { name: 'PMAY', employees: 320 },
  { name: 'SBM', employees: 210 },
  { name: 'NHM', employees: 580 },
];

const districtData = [
  { name: 'North District', value: 400 },
  { name: 'South District', value: 300 },
  { name: 'East District', value: 500 },
  { name: 'West District', value: 360 },
];

const COLORS = ['#f59e0b', '#d97706', '#fbbf24', '#b45309'];

export function PublicDashboard() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-4 gap-4 auto-rows-min">
      {/* Top Stats Row */}
      <div className="bg-white border border-slate-200 rounded-xl p-5 flex flex-col relative hover:-translate-y-1 hover:shadow-lg transition-all duration-300">
        <div className="text-xs font-semibold text-slate-500 uppercase tracking-wide mb-2">Total Employees</div>
        <div className="text-3xl font-bold text-slate-800">1,560</div>
        <div className="text-emerald-500 text-xs font-semibold mt-1">
          +124 this month
        </div>
      </div>

      <div className="bg-white border border-slate-200 rounded-xl p-5 flex flex-col relative hover:-translate-y-1 hover:shadow-lg transition-all duration-300">
        <div className="text-xs font-semibold text-slate-500 uppercase tracking-wide mb-2">Active Status</div>
        <div className="text-3xl font-bold text-slate-800">96.2%</div>
        <div className="grid grid-cols-10 gap-1 mt-2">
          {[...Array(10)].map((_, i) => (
            <div key={i} className={`w-2 h-2 rounded-full ${i < 9 ? 'bg-emerald-500' : 'bg-slate-200'}`}></div>
          ))}
        </div>
      </div>

      <div className="bg-white border border-slate-200 rounded-xl p-5 flex flex-col relative hover:-translate-y-1 hover:shadow-lg transition-all duration-300">
        <div className="text-xs font-semibold text-slate-500 uppercase tracking-wide mb-2">Total Offices</div>
        <div className="text-3xl font-bold text-slate-800">45</div>
        <div className="text-amber-600 text-xs font-semibold mt-1">
          Operational Centers
        </div>
      </div>

      <div className="bg-white border border-slate-200 rounded-xl p-5 flex flex-col relative hover:-translate-y-1 hover:shadow-lg transition-all duration-300">
        <div className="text-xs font-semibold text-slate-500 uppercase tracking-wide mb-2">Total Budget</div>
        <div className="text-3xl font-bold text-slate-800">₹4.2M</div>
        <div className="text-slate-500 text-xs font-semibold mt-1">
          Q3 Utilization
        </div>
      </div>

      {/* Bento Grid Large Cards */}
      <div className="bg-white border border-slate-200 rounded-xl p-5 flex flex-col relative md:col-span-2 md:row-span-2 min-h-[320px] hover:-translate-y-1 hover:shadow-lg transition-all duration-300">
        <div className="text-xs font-semibold text-slate-500 uppercase tracking-wide mb-4">Employees per Scheme</div>
        <div className="flex-1">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={schemeData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
              <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e2e8f0" />
              <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: '#64748b' }} dy={10} />
              <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: '#64748b' }} />
              <Tooltip cursor={{fill: '#f8fafc'}} contentStyle={{ borderRadius: '8px', border: '1px solid #e2e8f0', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }} />
              <Bar dataKey="employees" fill="#f59e0b" radius={[4, 4, 0, 0]} barSize={40} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      <div className="bg-white border border-slate-200 rounded-xl p-5 flex flex-col relative md:col-span-2 md:row-span-2 min-h-[320px] hover:-translate-y-1 hover:shadow-lg transition-all duration-300">
        <div className="text-xs font-semibold text-slate-500 uppercase tracking-wide mb-4">District-wise Distribution</div>
        <div className="flex-1 flex items-center justify-center">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={districtData}
                cx="50%"
                cy="50%"
                innerRadius={70}
                outerRadius={100}
                fill="#8884d8"
                paddingAngle={5}
                dataKey="value"
                stroke="none"
              >
                {districtData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} className="hover:opacity-80 transition-opacity cursor-pointer" />
                ))}
              </Pie>
              <Tooltip contentStyle={{ borderRadius: '8px', border: '1px solid #e2e8f0', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }} />
            </PieChart>
          </ResponsiveContainer>
          <div className="absolute right-8 top-1/2 -translate-y-1/2 flex flex-col gap-3">
            {districtData.map((entry, index) => (
              <div key={entry.name} className="flex items-center gap-2 text-sm text-slate-600">
                <div className="w-3 h-3 rounded-full" style={{ backgroundColor: COLORS[index % COLORS.length] }}></div>
                {entry.name}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
