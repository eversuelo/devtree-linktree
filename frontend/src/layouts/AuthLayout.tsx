import { Outlet } from 'react-router-dom';

export default function AuthLayout() {
  return (
    <div className="min-h-screen bg-slate-900 flex flex-col items-center justify-center px-4 py-10">
      <h1 className="text-4xl font-black text-white mb-8">
        Dev<span className="text-cyan-400">Tree</span>
      </h1>
      <div className="w-full max-w-md bg-white rounded-xl shadow-xl p-8">
        <Outlet />
      </div>
    </div>
  );
}
