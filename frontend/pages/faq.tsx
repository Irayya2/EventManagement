import React from 'react';
import Link from 'next/link';
import { FiArrowLeft } from 'react-icons/fi';
import Navbar from '../components/Navbar';

export default function FAQ() {
  return (
    <div className="min-h-screen bg-[#fcfcfc] font-sans text-gray-900 overflow-hidden flex flex-col items-center justify-center p-6">
      <Navbar />
      <h1 className="text-5xl font-extrabold tracking-tight text-gray-900 mb-6">FAQ</h1>
      <p className="text-xl text-gray-500 mb-10 text-center max-w-2xl">Find answers to commonly asked questions about our event management platform, billing, and technical integrations.</p>
      <Link href="/" className="inline-flex items-center space-x-2 text-teal-600 font-bold hover:text-teal-700 uppercase tracking-widest text-sm bg-white px-6 py-3 rounded-full shadow-sm hover:shadow-md transition-all border border-gray-200">
        <FiArrowLeft />
        <span>Back to Home</span>
      </Link>
    </div>
  );
}
