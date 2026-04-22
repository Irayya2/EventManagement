

import { useState } from 'react';
import { useAuth } from '@/hooks/useAuth';
import api from '@/js/api/api';
import Link from 'next/link';
import toast from 'react-hot-toast';
import { FiMail, FiLock, FiLoader, FiArrowRight } from 'react-icons/fi';
import ParticleCanvas from '../../components/ParticleCanvas';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const { login } = useAuth();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    
    try {
      const res = await api.post('/auth/login', { email, password });
      toast.success(res.data.message);
      login(res.data.access_token, res.data.user);
    } catch (err: any) {
      toast.error(err.response?.data?.error || 'Login failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex font-sans">
      
      {/* Left - Branding Panel with Particle Canvas */}
      <div className="hidden lg:flex lg:w-1/2 bg-gradient-to-br from-gray-900 via-[#0a1a2f] to-gray-900 text-white relative overflow-hidden">
        <div className="absolute top-10 -left-10 w-60 h-60 bg-teal-500/15 rounded-full blur-3xl"></div>
        <div className="absolute bottom-20 right-0 w-80 h-80 bg-cyan-500/15 rounded-full blur-3xl"></div>
        
        {/* Particle Canvas Effect */}
        <ParticleCanvas />
        
        <div className="relative z-10 flex flex-col justify-center px-16 pointer-events-none">
          <div className="flex items-center space-x-3 mb-10">
            <div className="w-10 h-10 rounded-xl bg-white/10 backdrop-blur-sm flex items-center justify-center text-lg font-black border border-white/10">E</div>
            <span className="text-2xl font-bold tracking-tight">EventMaster</span>
          </div>
          <h2 className="text-4xl font-extrabold tracking-tight leading-tight mb-6">
            Welcome back.<br />Let's manage something extraordinary.
          </h2>
          <p className="text-white/60 text-lg leading-relaxed max-w-md">
            Access your personalized dashboard, manage events, track payments, and collaborate with your team seamlessly.
          </p>
          
          <div className="mt-12 flex items-center space-x-6">
            {['2.4k Users', '150+ Events', '$50k Revenue'].map((s, i) => (
              <div key={i} className="bg-white/5 backdrop-blur-sm rounded-xl px-4 py-3 border border-white/10">
                <p className="text-sm font-bold">{s}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Right - Form Panel */}
      <div className="flex-1 flex flex-col justify-center px-8 sm:px-16 lg:px-20 bg-white">
        <div className="max-w-md w-full mx-auto">
          <div className="mb-8">
            <div className="lg:hidden flex items-center space-x-2 mb-6">
              <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-teal-500 to-cyan-600 flex items-center justify-center text-white text-sm font-black">E</div>
              <span className="text-lg font-bold">EventMaster</span>
            </div>
            <h2 className="text-3xl font-extrabold text-gray-900 tracking-tight">Sign in</h2>
            <p className="mt-2 text-gray-500">
              Don't have an account?{' '}
              <Link href="/register" className="font-semibold text-teal-600 hover:text-teal-500 transition-colors">Create one</Link>
            </p>
          </div>

          <form className="space-y-5" onSubmit={handleLogin}>
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1.5">Email address</label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none">
                  <FiMail className="text-gray-400" />
                </div>
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="pl-10 block w-full py-3 border border-gray-200 rounded-xl shadow-sm text-gray-900 placeholder-gray-400 focus:ring-2 focus:ring-teal-500/20 focus:border-teal-500 transition-all sm:text-sm outline-none bg-gray-50/50 focus:bg-white"
                  placeholder="you@example.com"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1.5">Password</label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none">
                  <FiLock className="text-gray-400" />
                </div>
                <input
                  type="password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="pl-10 block w-full py-3 border border-gray-200 rounded-xl shadow-sm text-gray-900 placeholder-gray-400 focus:ring-2 focus:ring-teal-500/20 focus:border-teal-500 transition-all sm:text-sm outline-none bg-gray-50/50 focus:bg-white"
                  placeholder="••••••••"
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="group w-full flex items-center justify-center space-x-2 py-3 px-4 rounded-xl text-sm font-semibold text-white bg-gradient-to-r from-teal-500 to-cyan-600 hover:from-teal-600 hover:to-cyan-700 shadow-lg shadow-teal-200/50 hover:shadow-teal-300/50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-teal-500 disabled:opacity-50 transition-all"
            >
              {loading ? <FiLoader className="animate-spin text-lg" /> : (
                <>
                  <span>Sign in</span>
                  <FiArrowRight className="group-hover:translate-x-0.5 transition-transform" />
                </>
              )}
            </button>
            
            <div className="mt-6 bg-teal-50 border border-teal-100 p-4 rounded-xl">
              <p className="text-sm text-teal-700 font-medium">
                <strong>Demo:</strong> admin@eventmanager.com / admin123
              </p>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
