import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { Layout } from './components/Layout';
import { PublicDashboard } from './pages/PublicDashboard';
import { Login } from './pages/Login';
import { InternalDashboard } from './pages/InternalDashboard';
import { Employees } from './pages/Employees';
import { Settings } from './pages/Settings';
import { Schemes } from './pages/Schemes';
import { Users } from './pages/Users';
import { useAuthStore } from './store/authStore';

// Protected Route Wrapper
const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated);
  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }
  return <>{children}</>;
};

export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<PublicDashboard />} />
          <Route path="login" element={<Login />} />
          
          {/* Protected Routes */}
          <Route path="dashboard" element={
            <ProtectedRoute>
              <InternalDashboard />
            </ProtectedRoute>
          } />
          <Route path="employees" element={
            <ProtectedRoute>
              <Employees />
            </ProtectedRoute>
          } />
          <Route path="schemes" element={
            <ProtectedRoute>
              <Schemes />
            </ProtectedRoute>
          } />
          <Route path="users" element={
            <ProtectedRoute>
              <Users />
            </ProtectedRoute>
          } />
          <Route path="settings" element={
            <ProtectedRoute>
              <Settings />
            </ProtectedRoute>
          } />
          
          {/* Fallback for undefined routes */}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Route>
      </Routes>
    </Router>
  );
}
