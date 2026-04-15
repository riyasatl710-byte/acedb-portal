import React, { useState } from 'react';
import { useAuthStore } from '../store/authStore';
import { Search, Plus, Filter, MoreVertical, Edit2, Trash2, Calculator } from 'lucide-react';
import { format, differenceInYears, differenceInMonths, differenceInDays } from 'date-fns';

// Mock Data
const mockEmployees = [
  { id: 'EMP001', name: 'Rahul Sharma', designation: 'Data Entry Operator', scheme: 'NREGA', district: 'North District', joiningDate: '2020-05-15', status: 'Active', salary: 15000 },
  { id: 'EMP002', name: 'Priya Patel', designation: 'Field Coordinator', scheme: 'NHM', district: 'South District', joiningDate: '2019-08-01', status: 'Active', salary: 18000 },
  { id: 'EMP003', name: 'Amit Kumar', designation: 'Accountant', scheme: 'PMAY', district: 'North District', joiningDate: '2021-02-10', status: 'Suspended', salary: 20000 },
  { id: 'EMP004', name: 'Sneha Reddy', designation: 'Clerk', scheme: 'SBM', district: 'East District', joiningDate: '2022-11-20', status: 'Active', salary: 12000 },
];

export function Employees() {
  const user = useAuthStore((state) => state.user);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedEmployee, setSelectedEmployee] = useState<any>(null);

  const calculateService = (joiningDate: string) => {
    const start = new Date(joiningDate);
    const now = new Date();
    const years = differenceInYears(now, start);
    const months = differenceInMonths(now, start) % 12;
    const days = differenceInDays(now, start) % 30; // Approximate
    return `${years}y ${months}m ${days}d`;
  };

  const canEdit = user?.role === 'Super Admin' || user?.role === 'District Admin';

  return (
    <div className="h-full flex flex-col">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">Employee Registry</h1>
          <p className="text-slate-500 mt-1 text-sm">Manage contract and daily wage staff records.</p>
        </div>
        {canEdit && (
          <button className="flex items-center space-x-2 bg-amber-500 hover:bg-amber-600 text-slate-900 px-4 py-2 rounded-lg text-sm font-bold transition-all duration-300 hover:shadow-lg hover:shadow-amber-500/30 active:scale-95">
            <Plus className="h-4 w-4" />
            <span>Add Employee</span>
          </button>
        )}
      </div>

      {/* Filters and Search */}
      <div className="flex flex-col sm:flex-row justify-between gap-4 mb-6">
        <div className="relative flex-1 max-w-md">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <Search className="h-5 w-5 text-slate-400" />
          </div>
          <input
            type="text"
            placeholder="Search by name, ID, or designation..."
            className="block w-full pl-10 pr-3 py-2 border border-slate-200 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-amber-500 sm:text-sm text-slate-800 transition-colors"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <div className="flex space-x-2">
          <button className="flex items-center space-x-2 px-4 py-2 border border-slate-200 rounded-lg text-sm font-medium text-slate-700 hover:bg-slate-50 transition-colors bg-white hover:-translate-y-0.5 hover:shadow-sm">
            <Filter className="h-4 w-4" />
            <span>Filters</span>
          </button>
        </div>
      </div>

      {/* Table */}
      <div className="bg-white border border-slate-200 rounded-xl shadow-sm overflow-hidden flex-1 flex flex-col hover:shadow-md transition-shadow duration-300">
        <div className="overflow-x-auto flex-1">
          <table className="w-full text-left border-collapse">
            <thead className="bg-slate-50 sticky top-0 z-10">
              <tr>
                <th scope="col" className="px-6 py-3 text-xs font-semibold text-slate-500 uppercase tracking-wide border-b border-slate-200">Employee</th>
                <th scope="col" className="px-6 py-3 text-xs font-semibold text-slate-500 uppercase tracking-wide border-b border-slate-200">Scheme / District</th>
                <th scope="col" className="px-6 py-3 text-xs font-semibold text-slate-500 uppercase tracking-wide border-b border-slate-200">Service Length</th>
                <th scope="col" className="px-6 py-3 text-xs font-semibold text-slate-500 uppercase tracking-wide border-b border-slate-200">Salary</th>
                <th scope="col" className="px-6 py-3 text-xs font-semibold text-slate-500 uppercase tracking-wide border-b border-slate-200">Status</th>
                <th scope="col" className="relative px-6 py-3 border-b border-slate-200"><span className="sr-only">Actions</span></th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {mockEmployees.map((emp) => (
                <tr key={emp.id} className="hover:bg-amber-50/50 transition-colors group">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <div className="h-10 w-10 rounded-full bg-amber-100 flex items-center justify-center text-amber-700 font-bold group-hover:scale-110 transition-transform">
                        {emp.name.charAt(0)}
                      </div>
                      <div className="ml-4">
                        <div className="text-sm font-medium text-slate-800">{emp.name}</div>
                        <div className="text-xs text-slate-500 mt-0.5">{emp.id} • {emp.designation}</div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-slate-800">{emp.scheme}</div>
                    <div className="text-xs text-slate-500 mt-0.5">{emp.district}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center text-sm text-slate-800">
                      <Calculator className="h-4 w-4 text-slate-400 mr-2 group-hover:text-amber-500 transition-colors" />
                      {calculateService(emp.joiningDate)}
                    </div>
                    <div className="text-xs text-slate-500 mt-1">Joined: {format(new Date(emp.joiningDate), 'dd MMM yyyy')}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-800 font-medium">
                    ₹{emp.salary.toLocaleString()}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center text-sm text-slate-800">
                      <span className={`inline-block w-2 h-2 rounded-full mr-2 ${
                        emp.status === 'Active' ? 'bg-emerald-500' : 'bg-red-500'
                      }`}></span>
                      {emp.status}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                    {canEdit && (
                      <div className="flex items-center justify-end space-x-3 opacity-0 group-hover:opacity-100 transition-opacity">
                        <button className="text-slate-400 hover:text-amber-600 hover:bg-amber-100 p-1.5 rounded-md transition-colors"><Edit2 className="h-4 w-4" /></button>
                        <button className="text-slate-400 hover:text-red-600 hover:bg-red-100 p-1.5 rounded-md transition-colors"><Trash2 className="h-4 w-4" /></button>
                      </div>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
