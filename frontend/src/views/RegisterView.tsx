import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { api } from '../config/api';
import type { RegisterForm } from '../types';
import ErrorMessage from '../components/ErrorMessage';

const inputClass =
  'w-full border border-slate-300 rounded-lg p-3 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-cyan-400';

export default function RegisterView() {
  const navigate = useNavigate();
  const [form, setForm] = useState<RegisterForm>({
    name: '',
    email: '',
    handle: '',
    password: '',
  });
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
      await api('/auth/register', {
        method: 'POST',
        body: JSON.stringify(form),
      });
      navigate('/auth/login', { state: { registered: true } });
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Error de conexión');
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <h2 className="text-2xl font-bold text-slate-800 text-center mb-6">Crear cuenta</h2>
      <form onSubmit={handleSubmit} className="space-y-4" noValidate>
        <input
          type="text"
          name="name"
          placeholder="Tu nombre"
          className={inputClass}
          value={form.name}
          onChange={handleChange}
        />
        <input
          type="email"
          name="email"
          placeholder="Email"
          className={inputClass}
          value={form.email}
          onChange={handleChange}
        />
        <input
          type="text"
          name="handle"
          placeholder="Handle (ej. tu-nombre)"
          className={inputClass}
          value={form.handle}
          onChange={handleChange}
        />
        <input
          type="password"
          name="password"
          placeholder="Contraseña (mínimo 6 caracteres)"
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
          {loading ? 'Creando cuenta...' : 'Registrarme'}
        </button>
      </form>
      <p className="text-center text-sm text-slate-500 mt-6">
        ¿Ya tienes cuenta?{' '}
        <Link to="/auth/login" className="text-cyan-600 font-semibold hover:underline">
          Inicia sesión
        </Link>
      </p>
    </>
  );
}
