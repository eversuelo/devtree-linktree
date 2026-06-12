import { useEffect, useState } from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { api, AUTH_TOKEN_KEY } from '../config/api';
import type { User } from '../types';

export default function ProtectedRoute() {
  const [user, setUser] = useState<User | null>(null);
  const [status, setStatus] = useState<'loading' | 'authenticated' | 'unauthenticated'>('loading');

  useEffect(() => {
    if (!localStorage.getItem(AUTH_TOKEN_KEY)) {
      setStatus('unauthenticated');
      return;
    }
    api<User>('/user')
      .then((data) => {
        setUser(data);
        setStatus('authenticated');
      })
      .catch(() => {
        localStorage.removeItem(AUTH_TOKEN_KEY);
        setStatus('unauthenticated');
      });
  }, []);

  if (status === 'loading') {
    return (
      <div className="min-h-screen bg-slate-900 flex items-center justify-center">
        <p className="text-white font-semibold animate-pulse">Cargando...</p>
      </div>
    );
  }

  if (status === 'unauthenticated') {
    return <Navigate to="/auth/login" replace />;
  }

  return <Outlet context={{ user }} />;
}
