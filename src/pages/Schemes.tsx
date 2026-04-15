import React, { useState } from 'react';
import { useAuthStore } from '../store/authStore';
import { useDataStore, Scheme } from '../store/dataStore';
import { Search, Plus, Edit2, Trash2, X, FolderKanban } from 'lucide-react';

export function Schemes() {
  const user = useAuthStore((state) => state.user);
  const { schemes, addScheme, updateScheme, deleteScheme } = useDataStore();
  
  const [searchTerm, setSearchTerm] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [formData, setFormData] = useState<Omit<Scheme, 'id'>>({ name: '', description: '', budget: 0 });

  const canEdit = user?.role === 'Super Admin';

  const handleOpenModal = (scheme?: Scheme) => {
    if (scheme) {
      setEditingId(scheme.id);
      setFormData({ name: scheme.name, description: scheme.description, budget: scheme.budget });
    } else {
      setEditingId(null);
      setFormData({ name: '', description: '', budget: 0 });
    }
    setIsModalOpen(true);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (editingId) {
      updateScheme(editingId, formData);
    } else {
      addScheme(formData);
    }
    setIsModalOpen(false);
  };

  const handleDelete = (id: string) => {
    if (window.confirm('Are you sure you want to delete this scheme?')) {
      deleteScheme(id);
    }
  };

  const filteredSchemes = schemes.filter(s => 
    s.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="h-full flex flex-col">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">Schemes Management</h1>
          <p className="text-slate-500 mt-1 text-sm">Manage government schemes and budgets.</p>
        </div>
        {canEdit && (
          <button 
            onClick={() => handleOpenModal()}
            className="flex items-center space-x-2 bg-amber-500 hover:bg-amber-600 text-slate-900 px-4 py-2 rounded-lg text-sm font-bold transition-all duration-300 hover:shadow-lg hover:shadow-amber-500/30 active:scale-95"
          >
            <Plus className="h-4 w-4" />
            <span>Add Scheme</span>
          </button>
        )}
      </div>

      {/* Search */}
      <div className="flex flex-col sm:flex-row justify-between gap-4 mb-6">
        <div className="relative flex-1 max-w-md">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <Search className="h-5 w-5 text-slate-400" />
          </div>
          <input
            type="text"
            placeholder="Search schemes..."
            className="block w-full pl-10 pr-3 py-2 border border-slate-200 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-amber-500 sm:text-sm text-slate-800 transition-colors"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </div>

      {/* Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 overflow-y-auto pb-6">
        {filteredSchemes.map((scheme) => (
          <div key={scheme.id} className="bg-white rounded-xl border border-slate-200 p-6 shadow-sm hover:shadow-md transition-all duration-300 group">
            <div className="flex justify-between items-start mb-4">
              <div className="h-12 w-12 rounded-lg bg-amber-100 flex items-center justify-center text-amber-600 group-hover:scale-110 transition-transform">
                <FolderKanban className="h-6 w-6" />
              </div>
              {canEdit && (
                <div className="flex space-x-2 opacity-0 group-hover:opacity-100 transition-opacity">
                  <button onClick={() => handleOpenModal(scheme)} className="p-1.5 text-slate-400 hover:text-amber-600 hover:bg-amber-50 rounded-md transition-colors"><Edit2 className="h-4 w-4" /></button>
                  <button onClick={() => handleDelete(scheme.id)} className="p-1.5 text-slate-400 hover:text-red-600 hover:bg-red-50 rounded-md transition-colors"><Trash2 className="h-4 w-4" /></button>
                </div>
              )}
            </div>
            <h3 className="text-lg font-bold text-slate-800 mb-1">{scheme.name}</h3>
            <p className="text-sm text-slate-500 mb-4 line-clamp-2">{scheme.description}</p>
            <div className="pt-4 border-t border-slate-100 flex justify-between items-center">
              <span className="text-xs font-medium text-slate-500 uppercase tracking-wider">Budget</span>
              <span className="text-sm font-bold text-slate-800">₹{Number(scheme.budget).toLocaleString()}</span>
            </div>
          </div>
        ))}
      </div>

      {/* Add/Edit Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-slate-900/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl shadow-xl w-full max-w-md overflow-hidden flex flex-col">
            <div className="px-6 py-4 border-b border-slate-200 flex justify-between items-center bg-slate-50">
              <h2 className="text-lg font-bold text-slate-800">{editingId ? 'Edit Scheme' : 'Add New Scheme'}</h2>
              <button onClick={() => setIsModalOpen(false)} className="text-slate-400 hover:text-slate-600 hover:bg-slate-200 p-1 rounded-md transition-colors">
                <X className="h-5 w-5" />
              </button>
            </div>
            
            <div className="p-6">
              <form id="schemeForm" onSubmit={handleSubmit} className="space-y-4">
                <div className="space-y-1.5">
                  <label className="text-sm font-semibold text-slate-700">Scheme Name</label>
                  <input required type="text" value={formData.name} onChange={e => setFormData({...formData, name: e.target.value})} className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-amber-500 outline-none transition-all" />
                </div>
                <div className="space-y-1.5">
                  <label className="text-sm font-semibold text-slate-700">Description</label>
                  <textarea required rows={3} value={formData.description} onChange={e => setFormData({...formData, description: e.target.value})} className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-amber-500 outline-none transition-all resize-none" />
                </div>
                <div className="space-y-1.5">
                  <label className="text-sm font-semibold text-slate-700">Budget Allocation (₹)</label>
                  <input required type="number" min="0" value={formData.budget} onChange={e => setFormData({...formData, budget: Number(e.target.value)})} className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-amber-500 outline-none transition-all" />
                </div>
              </form>
            </div>
            
            <div className="px-6 py-4 border-t border-slate-200 bg-slate-50 flex justify-end gap-3">
              <button onClick={() => setIsModalOpen(false)} className="px-4 py-2 text-sm font-semibold text-slate-600 hover:bg-slate-200 rounded-lg transition-colors">
                Cancel
              </button>
              <button form="schemeForm" type="submit" className="px-6 py-2 bg-amber-500 hover:bg-amber-600 text-slate-900 rounded-lg text-sm font-bold transition-all shadow-sm hover:shadow-amber-500/30">
                {editingId ? 'Save Changes' : 'Add Scheme'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
