import { useNavigate, useOutletContext } from 'react-router-dom';
import { AUTH_TOKEN_KEY } from '../config/api';
import type { User } from '../types';

export default function DashboardView() {
  const navigate = useNavigate();
  const { user } = useOutletContext<{ user: User }>();

  const handleLogout = () => {
    localStorage.removeItem(AUTH_TOKEN_KEY);
    navigate('/auth/login');
  };

  return (
    <div className="min-h-screen bg-slate-900">
      <header className="bg-slate-800 px-6 py-4 flex items-center justify-between">
        <h1 className="text-xl font-black text-white">
          Dev<span className="text-cyan-400">Tree</span>
        </h1>
        <button
          onClick={handleLogout}
          className="bg-red-500 hover:bg-red-600 text-white text-sm font-bold rounded-lg px-4 py-2 transition-colors cursor-pointer"
        >
          Cerrar sesión
        </button>
      </header>
      <main className="max-w-2xl mx-auto px-4 py-12">
        <div className="bg-white rounded-xl shadow-xl p-8 text-center">
          <div className="w-20 h-20 rounded-full bg-cyan-500 text-white text-3xl font-black flex items-center justify-center mx-auto mb-4">
            {user.name.charAt(0).toUpperCase()}
          </div>
          <h2 className="text-2xl font-bold text-slate-800">{user.name}</h2>
          <p className="text-cyan-600 font-semibold">@{user.handle}</p>
          <p className="text-slate-500 text-sm mt-2">{user.email}</p>
        </div>
      </main>
    </div>
  );
}
