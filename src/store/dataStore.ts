import { create } from 'zustand';

const API_URL = 'https://script.google.com/macros/s/AKfycbx6sDT0lsq2yxw0tNioma0Dgs63u2yfNC5gCjZ1vzLDUAkFTRcg6UyuMkeVpNxpIFs/exec';

export interface Employee {
  id: string;
  name: string;
  designation: string;
  district: string;
  scheme: string;
  status: 'Active' | 'Suspended' | 'On Leave';
  joiningDate: string;
  salary: number;
}

export interface Scheme {
  id: string;
  name: string;
  description: string;
  budget: number;
}

export interface SystemUser {
  id: string;
  name: string;
  email: string;
  role: string;
}

interface DataState {
  employees: Employee[];
  schemes: Scheme[];
  users: SystemUser[];
  isLoading: boolean;
  error: string | null;
  
  fetchData: () => Promise<void>;

  // Employee Actions
  addEmployee: (employee: Omit<Employee, 'id'>) => Promise<void>;
  updateEmployee: (id: string, employee: Partial<Employee>) => Promise<void>;
  deleteEmployee: (id: string) => Promise<void>;

  // Scheme Actions
  addScheme: (scheme: Omit<Scheme, 'id'>) => Promise<void>;
  updateScheme: (id: string, scheme: Partial<Scheme>) => Promise<void>;
  deleteScheme: (id: string) => Promise<void>;

  // User Actions
  addUser: (user: Omit<SystemUser, 'id'>) => Promise<void>;
  updateUser: (id: string, user: Partial<SystemUser>) => Promise<void>;
  deleteUser: (id: string) => Promise<void>;
}

const generateId = (prefix: string) => `${prefix}${Date.now().toString().slice(-6)}`;

export const useDataStore = create<DataState>((set, get) => ({
  employees: [],
  schemes: [],
  users: [],
  isLoading: false,
  error: null,

  fetchData: async () => {
    set({ isLoading: true, error: null });
    try {
      const [empRes, schemeRes, userRes] = await Promise.all([
        fetch(`${API_URL}?action=getEmployees`),
        fetch(`${API_URL}?action=getSchemes`),
        fetch(`${API_URL}?action=getUsers`)
      ]);

      const employees = await empRes.json();
      const schemes = await schemeRes.json();
      const users = await userRes.json();

      set({ 
        employees: Array.isArray(employees) && !employees.error ? employees : [], 
        schemes: Array.isArray(schemes) && !schemes.error ? schemes : [], 
        users: Array.isArray(users) && !users.error ? users : [], 
        isLoading: false 
      });
    } catch (error: any) {
      set({ error: error.message, isLoading: false });
      console.error("Fetch error:", error);
    }
  },

  addEmployee: async (emp) => {
    const newEmp = { ...emp, id: generateId('EMP') };
    set((state) => ({ employees: [...state.employees, newEmp as Employee] }));
    try {
      await fetch(API_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'text/plain;charset=utf-8' },
        body: JSON.stringify({ action: 'add', sheet: 'Employees', payload: newEmp }),
      });
    } catch (e) { console.error(e); get().fetchData(); }
  },
  
  updateEmployee: async (id, updatedData) => {
    set((state) => ({
      employees: state.employees.map(emp => emp.id === id ? { ...emp, ...updatedData } : emp)
    }));
    try {
      const emp = get().employees.find(e => e.id === id);
      await fetch(API_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'text/plain;charset=utf-8' },
        body: JSON.stringify({ action: 'update', sheet: 'Employees', payload: emp }),
      });
    } catch (e) { console.error(e); get().fetchData(); }
  },

  deleteEmployee: async (id) => {
    set((state) => ({ employees: state.employees.filter(emp => emp.id !== id) }));
    try {
      await fetch(API_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'text/plain;charset=utf-8' },
        body: JSON.stringify({ action: 'delete', sheet: 'Employees', payload: { id } }),
      });
    } catch (e) { console.error(e); get().fetchData(); }
  },

  addScheme: async (scheme) => {
    const newScheme = { ...scheme, id: generateId('SCH') };
    set((state) => ({ schemes: [...state.schemes, newScheme as Scheme] }));
    try {
      await fetch(API_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'text/plain;charset=utf-8' },
        body: JSON.stringify({ action: 'add', sheet: 'Schemes', payload: newScheme }),
      });
    } catch (e) { console.error(e); get().fetchData(); }
  },

  updateScheme: async (id, updatedData) => {
    set((state) => ({
      schemes: state.schemes.map(s => s.id === id ? { ...s, ...updatedData } : s)
    }));
    try {
      const scheme = get().schemes.find(s => s.id === id);
      await fetch(API_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'text/plain;charset=utf-8' },
        body: JSON.stringify({ action: 'update', sheet: 'Schemes', payload: scheme }),
      });
    } catch (e) { console.error(e); get().fetchData(); }
  },

  deleteScheme: async (id) => {
    set((state) => ({ schemes: state.schemes.filter(s => s.id !== id) }));
    try {
      await fetch(API_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'text/plain;charset=utf-8' },
        body: JSON.stringify({ action: 'delete', sheet: 'Schemes', payload: { id } }),
      });
    } catch (e) { console.error(e); get().fetchData(); }
  },

  addUser: async (user) => {
    const newUser = { ...user, id: generateId('USR') };
    set((state) => ({ users: [...state.users, newUser as SystemUser] }));
    try {
      await fetch(API_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'text/plain;charset=utf-8' },
        body: JSON.stringify({ action: 'add', sheet: 'Users', payload: newUser }),
      });
    } catch (e) { console.error(e); get().fetchData(); }
  },

  updateUser: async (id, updatedData) => {
    set((state) => ({
      users: state.users.map(u => u.id === id ? { ...u, ...updatedData } : u)
    }));
    try {
      const user = get().users.find(u => u.id === id);
      await fetch(API_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'text/plain;charset=utf-8' },
        body: JSON.stringify({ action: 'update', sheet: 'Users', payload: user }),
      });
    } catch (e) { console.error(e); get().fetchData(); }
  },

  deleteUser: async (id) => {
    set((state) => ({ users: state.users.filter(u => u.id !== id) }));
    try {
      await fetch(API_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'text/plain;charset=utf-8' },
        body: JSON.stringify({ action: 'delete', sheet: 'Users', payload: { id } }),
      });
    } catch (e) { console.error(e); get().fetchData(); }
  },
}));
