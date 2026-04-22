

import { useState } from 'react';
import api from '@/js/api/api';
import Link from 'next/link';
import { useRouter } from 'next/router';
import toast from 'react-hot-toast';
import { FiUser, FiMail, FiLock, FiPhone, FiLoader, FiArrowRight } from 'react-icons/fi';
import ParticleCanvas from '../../components/ParticleCanvas';

export default function Register() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    phone: '',
    role: 'participant'
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    
    try {
      const res = await api.post('/auth/register', formData);
      toast.success(res.data.message);
      setTimeout(() => router.push('/login'), 2000);
    } catch (err: any) {
      toast.error(err.response?.data?.error || 'Registration failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex font-sans">
      
      {/* Left - Branding Panel with Particle Canvas */}
      <div className="hidden lg:flex lg:w-1/2 bg-gradient-to-br from-gray-900 via-[#0a1a2f] to-gray-900 text-white relative overflow-hidden">
        {/* Subtle gradient blobs behind particles */}
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
            Join the platform.<br />Start creating impact.
          </h2>
          <p className="text-white/60 text-lg leading-relaxed max-w-md">
            Whether you're an organizer building the next big event or a participant looking for experiences — we've got you covered.
          </p>
          
          <div className="mt-12 space-y-4">
            {['✓ Instant event registration', '✓ Real-time payment tracking', '✓ Role-based personalized dashboard'].map((s, i) => (
              <div key={i} className="flex items-center space-x-3 text-white/80">
                <span className="text-sm font-medium">{s}</span>
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
            <h2 className="text-3xl font-extrabold text-gray-900 tracking-tight">Create an account</h2>
            <p className="mt-2 text-gray-500">
              Already registered?{' '}
              <Link href="/login" className="font-semibold text-teal-600 hover:text-teal-500 transition-colors">Sign in</Link>
            </p>
          </div>

          <form className="space-y-4" onSubmit={handleRegister}>
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1.5">Full Name</label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none"><FiUser className="text-gray-400" /></div>
                <input type="text" name="name" required value={formData.name} onChange={handleChange}
                  className="pl-10 block w-full py-3 border border-gray-200 rounded-xl shadow-sm text-gray-900 placeholder-gray-400 focus:ring-2 focus:ring-teal-500/20 focus:border-teal-500 transition-all sm:text-sm outline-none bg-gray-50/50 focus:bg-white"
                  placeholder="John Doe"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1.5">Email address</label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none"><FiMail className="text-gray-400" /></div>
                <input type="email" name="email" required value={formData.email} onChange={handleChange}
                  className="pl-10 block w-full py-3 border border-gray-200 rounded-xl shadow-sm text-gray-900 placeholder-gray-400 focus:ring-2 focus:ring-teal-500/20 focus:border-teal-500 transition-all sm:text-sm outline-none bg-gray-50/50 focus:bg-white"
                  placeholder="john@example.com"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1.5">Password</label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none"><FiLock className="text-gray-400" /></div>
                <input type="password" name="password" required minLength={6} value={formData.password} onChange={handleChange}
                  className="pl-10 block w-full py-3 border border-gray-200 rounded-xl shadow-sm text-gray-900 placeholder-gray-400 focus:ring-2 focus:ring-teal-500/20 focus:border-teal-500 transition-all sm:text-sm outline-none bg-gray-50/50 focus:bg-white"
                  placeholder="••••••••"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1.5">Phone (Optional)</label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none"><FiPhone className="text-gray-400" /></div>
                <input type="tel" name="phone" value={formData.phone} onChange={handleChange}
                  className="pl-10 block w-full py-3 border border-gray-200 rounded-xl shadow-sm text-gray-900 placeholder-gray-400 focus:ring-2 focus:ring-teal-500/20 focus:border-teal-500 transition-all sm:text-sm outline-none bg-gray-50/50 focus:bg-white"
                  placeholder="+1 234 567 890"
                />
              </div>
            </div>
            
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1.5">Account Type</label>
              <select name="role" value={formData.role} onChange={handleChange}
                className="block w-full py-3 pl-3 pr-10 border border-gray-200 rounded-xl shadow-sm text-sm outline-none bg-gray-50/50 focus:bg-white focus:ring-2 focus:ring-teal-500/20 focus:border-teal-500 transition-all text-gray-900"
              >
                <option value="participant">🎟️ Participant (Attend Events)</option>
                <option value="organizer">🎙️ Organizer (Host Events)</option>
                <option value="staff">🛠️ Staff (Event Operations)</option>
              </select>
              <p className="mt-1.5 text-xs text-gray-400">Organizer and Staff accounts require admin approval.</p>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="group w-full flex items-center justify-center space-x-2 py-3 px-4 rounded-xl text-sm font-semibold text-white bg-gradient-to-r from-teal-500 to-cyan-600 hover:from-teal-600 hover:to-cyan-700 shadow-lg shadow-teal-200/50 hover:shadow-teal-300/50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-teal-500 disabled:opacity-50 transition-all"
            >
              {loading ? <FiLoader className="animate-spin text-lg" /> : (
                <>
                  <span>Create Account</span>
                  <FiArrowRight className="group-hover:translate-x-0.5 transition-transform" />
                </>
              )}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
