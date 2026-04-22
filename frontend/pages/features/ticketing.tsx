import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { FiCreditCard, FiCheckCircle, FiArrowRight, FiDollarSign, FiShield, FiTag, FiPercent, FiGlobe, FiLock } from 'react-icons/fi';
import Navbar from '../../components/Navbar';
import Footer from '../../components/Footer';

const ticketTiers = [
  { name: 'Free', price: '$0', color: 'from-gray-100 to-gray-50', border: 'border-gray-200', text: 'text-gray-700', features: ['Basic registration', 'Email confirmation', 'Event access', 'Digital badge'] },
  { name: 'Standard', price: '$49', color: 'from-teal-50 to-cyan-50', border: 'border-teal-200', text: 'text-teal-700', features: ['Everything in Free', 'Priority seating', 'Workshop access', 'Lunch included', 'Networking lounge'] },
  { name: 'VIP', price: '$199', color: 'from-amber-50 to-orange-50', border: 'border-amber-200', text: 'text-amber-700', features: ['Everything in Standard', 'Front-row seating', 'Backstage meet & greet', 'Exclusive merch pack', 'Post-event recordings', '1-on-1 with speakers'] },
];

const features = [
  { icon: <FiTag className="text-2xl" />, title: 'Multi-Tier Ticketing', desc: 'Create unlimited ticket types — free, paid, VIP, early-bird, group discounts — all from one dashboard.' },
  { icon: <FiDollarSign className="text-2xl" />, title: 'Global Payments', desc: 'Accept payments in 135+ currencies with Stripe, PayPal, and local payment gateway integrations.' },
  { icon: <FiPercent className="text-2xl" />, title: 'Promo Codes & Discounts', desc: 'Generate bulk or custom promo codes with usage limits, expiry dates, and percentage or flat discounts.' },
  { icon: <FiShield className="text-2xl" />, title: 'Secure Checkout', desc: 'PCI DSS-compliant payment processing with SSL encryption and fraud detection built-in.' },
  { icon: <FiGlobe className="text-2xl" />, title: 'Custom Registration Forms', desc: 'Dynamic form builder with conditional logic, file uploads, and custom fields per ticket type.' },
  { icon: <FiLock className="text-2xl" />, title: 'Refund Management', desc: 'Automated refund workflows with configurable policies, partial refunds, and credit transfers.' },
];

export default function TicketingFeature() {
  const [activeTier, setActiveTier] = useState(1);

  return (
    <div className="min-h-screen bg-[#fcfcfc] font-sans text-gray-900 overflow-hidden">
      <Navbar />

      {/* Hero */}
      <section className="pt-32 pb-16 bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 text-white relative overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-20 right-10 w-72 h-72 bg-cyan-500 rounded-full blur-[120px]" />
          <div className="absolute bottom-10 left-20 w-96 h-96 bg-teal-500 rounded-full blur-[150px]" />
        </div>
        
        <div className="max-w-7xl mx-auto px-6 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            {/* Left: Text */}
            <motion.div initial={{ opacity: 0, x: -30 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.7 }}>
              <div className="w-16 h-16 bg-gradient-to-br from-cyan-400 to-teal-500 rounded-2xl flex items-center justify-center mb-6 shadow-xl shadow-cyan-500/20">
                <FiCreditCard className="text-3xl text-white" />
              </div>
              <p className="text-xs font-bold text-cyan-300 uppercase tracking-[0.25em] mb-4">Ticketing & Registration</p>
              <h1 className="text-5xl md:text-6xl lg:text-7xl font-extrabold tracking-tight leading-[1.1] mb-6">
                Sell out your events<br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-300 to-teal-300">effortlessly.</span>
              </h1>
              <p className="text-xl text-gray-300 max-w-lg mb-10 leading-relaxed">
                From free community meetups to premium global conferences — handle registration, payments, and seamless check-ins with a system built for scale.
              </p>
              <div className="flex flex-col sm:flex-row items-start gap-4">
                <Link href="/register" className="bg-gradient-to-r from-teal-500 to-cyan-600 text-white px-8 py-3.5 rounded-lg font-bold text-md uppercase tracking-wide shadow-xl shadow-teal-500/20 hover:shadow-teal-500/40 hover:-translate-y-1 transition-all">
                  Start Selling Tickets
                </Link>
                <Link href="/" className="text-gray-300 hover:text-white font-semibold flex items-center space-x-2 transition-colors py-3.5">
                  <span>Back to Home</span>
                  <FiArrowRight />
                </Link>
              </div>
            </motion.div>

            {/* Right: Floating Tickets Array */}
            <motion.div initial={{ opacity: 0, x: 40 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.7, delay: 0.2 }} className="relative hidden lg:flex justify-center items-center gap-6">
              
              {/* Feature Card 1 */}
              <motion.div 
                animate={{ y: [-8, 8, -8] }} 
                transition={{ repeat: Infinity, duration: 5, ease: "easeInOut" }}
                className="relative w-1/2 aspect-[4/5] bg-gray-800 rounded-2xl overflow-hidden shadow-[0_20px_50px_rgba(0,0,0,0.5)] border border-white/10 mt-16"
              >
                <Image src="/images/tickets/ticket1.png" alt="Digital Ticket UI" fill className="object-cover -rotate-90 scale-[1.25] hover:scale-[1.35] transition-transform duration-700" />
                <div className="absolute inset-x-0 bottom-0 p-6 bg-gradient-to-t from-gray-900 via-gray-900/80 to-transparent">
                  <div className="bg-teal-500 text-white text-xs font-bold px-3 py-1 rounded-full uppercase inline-block tracking-wider mb-2">Digital</div>
                  <h3 className="text-white font-extrabold text-lg">Smart E-Tickets</h3>
                </div>
              </motion.div>
              
              {/* Feature Card 2 */}
              <motion.div 
                animate={{ y: [8, -8, 8] }} 
                transition={{ repeat: Infinity, duration: 6, ease: "easeInOut", delay: 1 }}
                className="relative w-1/2 aspect-[4/5] bg-gray-800 rounded-2xl overflow-hidden shadow-[0_20px_50px_rgba(0,0,0,0.5)] border border-white/10 mb-16"
              >
                <Image src="/images/tickets/ticket2.png" alt="Physical Ticket Entry" fill className="object-cover hover:scale-105 transition-transform duration-700" />
                <div className="absolute inset-x-0 bottom-0 p-6 bg-gradient-to-t from-gray-900 via-gray-900/80 to-transparent">
                  <div className="bg-cyan-500 text-white text-xs font-bold px-3 py-1 rounded-full uppercase inline-block tracking-wider mb-2">Physical</div>
                  <h3 className="text-white font-extrabold text-lg">Printed VIP Passes</h3>
                </div>
              </motion.div>

              {/* Glowing orb behind tickets */}
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-72 h-72 bg-teal-400/20 rounded-full blur-[100px] -z-10"></div>
            </motion.div>
          </div>
        </div>

      </section>

      {/* Ticket Tiers Preview */}
      <section className="py-24 bg-white border-t border-gray-100">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-5xl font-extrabold tracking-tight text-gray-900 mb-4">Flexible ticket tiers for every audience</h2>
            <p className="text-gray-500 text-xl max-w-3xl mx-auto">Design unlimited ticket types with custom pricing, perks, and availability windows.</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {ticketTiers.map((tier, i) => (
              <motion.div key={i} initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: 0.2 }} whileHover={{ y: -8, scale: 1.02 }} transition={{ duration: 0.5, delay: i * 0.1, type: 'spring', bounce: 0.4 }}
                className={`bg-gradient-to-br ${tier.color} rounded-2xl p-10 border ${tier.border} shadow-sm hover:shadow-2xl cursor-pointer relative ${i === 1 ? 'ring-2 ring-teal-400 ring-offset-2' : ''}`}
              >
                {i === 1 && <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-gradient-to-r from-teal-500 to-cyan-600 text-white text-xs font-bold px-4 py-1 rounded-full uppercase tracking-wider">Most Popular</div>}
                <h3 className={`text-2xl font-extrabold ${tier.text} mb-2`}>{tier.name}</h3>
                <div className="text-4xl font-extrabold text-gray-900 mb-6">{tier.price}<span className="text-lg text-gray-400 font-medium">/ticket</span></div>
                <ul className="space-y-3">
                  {tier.features.map((f, j) => (
                    <li key={j} className="flex items-center space-x-3 text-gray-700">
                      <FiCheckCircle className="text-teal-500 flex-shrink-0" />
                      <span>{f}</span>
                    </li>
                  ))}
                </ul>
                <Link href="/register" className={`mt-8 block text-center py-3 rounded-lg font-bold uppercase tracking-wide text-sm transition-all ${i === 1 ? 'bg-gradient-to-r from-teal-500 to-cyan-600 text-white shadow-lg hover:shadow-xl' : 'bg-white border border-gray-300 text-gray-700 hover:border-teal-400 hover:text-teal-600'}`}>
                  Select Plan
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Grid */}
      <section className="py-24 bg-gray-50 border-t border-gray-100">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-5xl font-extrabold tracking-tight text-gray-900 mb-4">Enterprise ticketing tools</h2>
            <p className="text-gray-500 text-xl max-w-2xl mx-auto">All the power you need to sell, manage, and track your event tickets.</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((f, i) => (
              <motion.div key={i} initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: 0.1 }} transition={{ duration: 0.4, delay: i * 0.08 }} className="bg-white rounded-2xl p-8 border border-gray-200 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all cursor-pointer">
                <div className="w-14 h-14 bg-gradient-to-br from-cyan-100 to-teal-100 text-cyan-600 rounded-xl flex items-center justify-center mb-5 shadow-sm border border-cyan-200/50">{f.icon}</div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">{f.title}</h3>
                <p className="text-gray-600 leading-relaxed">{f.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="py-20 bg-gradient-to-r from-cyan-600 to-teal-700 text-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            {[
              { value: '2M+', label: 'Tickets Sold' },
              { value: '135+', label: 'Currencies' },
              { value: '$50M+', label: 'Revenue Processed' },
              { value: '<2s', label: 'Checkout Time' },
            ].map((s, i) => (
              <motion.div key={i} initial={{ opacity: 0, scale: 0.9 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }} transition={{ duration: 0.4, delay: i * 0.1 }}>
                <div className="text-4xl md:text-5xl font-extrabold mb-2">{s.value}</div>
                <div className="text-cyan-100 font-medium text-sm uppercase tracking-wider">{s.label}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-24 bg-white">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <h2 className="text-4xl md:text-5xl font-extrabold tracking-tight text-gray-900 mb-6">Start selling tickets today</h2>
          <p className="text-xl text-gray-500 mb-10 max-w-2xl mx-auto">Zero platform fees on free events. Transparent pricing on paid events. No surprises.</p>
          <Link href="/register" className="bg-gradient-to-r from-teal-500 to-cyan-600 text-white px-10 py-4 rounded-sm font-bold text-lg uppercase tracking-wide shadow-xl shadow-teal-500/20 hover:shadow-teal-500/40 hover:-translate-y-1 transition-all inline-block">
            Try Now For Free
          </Link>
        </div>
      </section>

      <Footer />
    </div>
  );
}
