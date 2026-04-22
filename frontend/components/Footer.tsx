import React from 'react';
import Link from 'next/link';

export default function Footer() {
  return (
    <footer className="bg-gray-900 py-16 text-white text-sm">
      <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row justify-between items-center text-gray-400">
        <div className="flex items-center space-x-2 mb-4 md:mb-0">
          <div className="w-6 h-6 bg-gradient-to-br from-teal-400 to-cyan-500 rounded flex items-center justify-center text-[10px] text-white font-black">E</div>
          <span className="font-bold text-white text-lg tracking-tight">EventMaster</span>
        </div>
        <div className="flex space-x-8">
          <Link href="/faq" className="hover:text-teal-400 transition-colors">Frequently Asked Questions</Link>
          <Link href="/privacy" className="hover:text-teal-400 transition-colors">Privacy Policy</Link>
          <Link href="/terms" className="hover:text-teal-400 transition-colors">Terms of Service</Link>
        </div>
        <p className="mt-8 md:mt-0">© 2026 EventMaster. Advanced Systems.</p>
      </div>
    </footer>
  );
}
