import React, { useState } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { FiMenu, FiX } from 'react-icons/fi';

export default function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <nav className="fixed top-0 w-full bg-white/90 backdrop-blur-md border-b border-gray-100 z-50">
      <div className="max-w-7xl mx-auto flex items-center justify-between px-6 py-4">
        <Link href="/" className="flex items-center space-x-2">
          <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-teal-500 to-emerald-600 flex items-center justify-center text-white font-black text-sm shadow-sm">E</div>
          <span className="text-xl font-bold tracking-tight text-gray-800">EventMaster</span>
        </Link>
        <div className="hidden lg:flex items-center space-x-8 text-sm font-semibold text-gray-600">
          <Link href="/features/venues" className="hover:text-teal-600 transition-colors">Venues</Link>
          <Link href="/features/ticketing" className="hover:text-teal-600 transition-colors">Ticketing</Link>
          <Link href="/features/agenda" className="hover:text-teal-600 transition-colors">Agenda</Link>
          <Link href="/features/attendees" className="hover:text-teal-600 transition-colors">Attendees</Link>
          <Link href="/features/speakers" className="hover:text-teal-600 transition-colors">Speakers</Link>
        </div>
        <div className="hidden lg:flex items-center space-x-3">
          <Link href="/login" className="text-sm font-bold text-teal-600 hover:text-teal-700 transition-colors px-4 py-2 uppercase tracking-wide">Sign In</Link>
          <Link href="/register" className="text-sm font-bold text-white bg-gradient-to-r from-teal-500 to-cyan-600 hover:from-teal-600 hover:to-cyan-700 px-6 py-2.5 rounded-sm uppercase tracking-wide shadow-md shadow-teal-500/20 transition-all">
            Access Free
          </Link>
        </div>
        <div className="lg:hidden flex items-center">
          <button onClick={() => setMobileMenuOpen(!mobileMenuOpen)} className="text-gray-600 hover:text-teal-600 p-2 transition-all">
            {mobileMenuOpen ? <FiX size={24} /> : <FiMenu size={24} />}
          </button>
        </div>
      </div>
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} exit={{ height: 0, opacity: 0 }} className="lg:hidden bg-white border-t border-gray-100 overflow-hidden shadow-xl">
            <div className="px-6 py-4 flex flex-col space-y-4 text-sm font-semibold text-gray-600">
              <Link href="/features/venues" className="hover:text-teal-600" onClick={() => setMobileMenuOpen(false)}>Venues</Link>
              <Link href="/features/ticketing" className="hover:text-teal-600" onClick={() => setMobileMenuOpen(false)}>Ticketing</Link>
              <Link href="/features/agenda" className="hover:text-teal-600" onClick={() => setMobileMenuOpen(false)}>Agenda</Link>
              <Link href="/features/attendees" className="hover:text-teal-600" onClick={() => setMobileMenuOpen(false)}>Attendees</Link>
              <Link href="/features/speakers" className="hover:text-teal-600" onClick={() => setMobileMenuOpen(false)}>Speakers</Link>
              <hr className="border-gray-100" />
              <Link href="/login" className="text-teal-600 font-bold uppercase tracking-wide" onClick={() => setMobileMenuOpen(false)}>Sign In</Link>
              <Link href="/register" className="text-teal-600 font-bold uppercase tracking-wide" onClick={() => setMobileMenuOpen(false)}>Access Free</Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}
