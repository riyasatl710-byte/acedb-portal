import { create } from 'zustand';

export type Role = 'Super Admin' | 'Section Admin' | 'District Admin' | 'IT Admin' | 'Viewer';

interface User {
  id: string;
  name: string;
  role: Role;
  district?: string;
}

interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  login: (user: User) => void;
  logout: () => void;
}

// Simple mock auth store
export const useAuthStore = create<AuthState>((set) => ({
  user: null,
  isAuthenticated: false,
  login: (user) => set({ user, isAuthenticated: true }),
  logout: () => set({ user: null, isAuthenticated: false }),
}));
