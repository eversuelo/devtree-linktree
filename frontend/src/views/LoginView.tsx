import { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { api, AUTH_TOKEN_KEY } from '../config/api';
import type { LoginForm } from '../types';
import ErrorMessage from '../components/ErrorMessage';

const inputClass =
  'w-full border border-slate-300 rounded-lg p-3 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-cyan-400';

export default function LoginView() {
  const navigate = useNavigate();
  const location = useLocation();
  const registered = Boolean(location.state?.registered);
  const [form, setForm] = useState<LoginForm>({ email: '', password: '' });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    try {
      const { token } = await api<{ token: string }>('/auth/login', {
        method: 'POST',
        body: JSON.stringify(form),
      });
      localStorage.setItem(AUTH_TOKEN_KEY, token);
      navigate('/');
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Error de conexión');
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <h2 className="text-2xl font-bold text-slate-800 text-center mb-6">Iniciar sesión</h2>
      {registered && (
        <p className="bg-green-50 text-green-700 text-sm text-center font-semibold rounded-lg p-3 mb-4">
          Cuenta creada exitosamente, ahora inicia sesión
        </p>
      )}
      <form onSubmit={handleSubmit} className="space-y-4" noValidate>
        <input
          type="email"
          name="email"
          placeholder="Email"
          className={inputClass}
          value={form.email}
          onChange={handleChange}
        />
        <input
          type="password"
          name="password"
          placeholder="Contraseña"
          className={inputClass}
          value={form.password}
          onChange={handleChange}
        />
        {error && <ErrorMessage>{error}</ErrorMessage>}
        <button
          type="submit"
          disabled={loading}
          className="w-full bg-cyan-500 hover:bg-cyan-600 disabled:opacity-50 text-white font-bold rounded-lg p-3 transition-colors cursor-pointer"
        >
          {loading ? 'Iniciando sesión...' : 'Iniciar sesión'}
        </button>
      </form>
      <p className="text-center text-sm text-slate-500 mt-6">
        ¿No tienes cuenta?{' '}
        <Link to="/auth/register" className="text-cyan-600 font-semibold hover:underline">
          Regístrate
        </Link>
      </p>
    </>
  );
}
