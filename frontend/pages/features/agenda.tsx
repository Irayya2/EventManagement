import React from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { FiCalendar, FiCheckCircle, FiArrowRight, FiClock, FiLayers, FiGrid, FiRepeat, FiFilter, FiDownload } from 'react-icons/fi';
import Navbar from '../../components/Navbar';
import Footer from '../../components/Footer';

const sampleSchedule = [
  { time: '09:00 AM', track: 'Main Stage', title: 'Opening Keynote: Future of Events', speaker: 'Sarah Chen', color: 'bg-teal-500' },
  { time: '10:30 AM', track: 'Workshop A', title: 'Hands-on: Building Event Workflows', speaker: 'James Rivera', color: 'bg-cyan-500' },
  { time: '10:30 AM', track: 'Workshop B', title: 'Design Thinking for Event Planners', speaker: 'Maya Patel', color: 'bg-emerald-500' },
  { time: '12:00 PM', track: 'Main Stage', title: 'Panel: Hybrid Events at Scale', speaker: 'Multiple Speakers', color: 'bg-amber-500' },
  { time: '02:00 PM', track: 'Workshop A', title: 'Advanced Analytics for Organizers', speaker: 'David Kim', color: 'bg-violet-500' },
  { time: '03:30 PM', track: 'Main Stage', title: 'Closing Ceremony & Awards', speaker: 'EventMaster Team', color: 'bg-rose-500' },
];

const features = [
  { icon: <FiLayers className="text-2xl" />, title: 'Multi-Track Scheduling', desc: 'Run parallel sessions across unlimited tracks with drag-and-drop ease.' },
  { icon: <FiClock className="text-2xl" />, title: 'Time Zone Intelligence', desc: 'Auto-adjust schedules for global audiences with smart timezone detection.' },
  { icon: <FiGrid className="text-2xl" />, title: 'Session Types', desc: 'Keynotes, workshops, panels, networking breaks, and custom session formats.' },
  { icon: <FiRepeat className="text-2xl" />, title: 'Recurring Sessions', desc: 'Set up daily, weekly, or custom recurring sessions with one click.' },
  { icon: <FiFilter className="text-2xl" />, title: 'Personalized Itineraries', desc: 'Let attendees bookmark favorites and generate personal schedules.' },
  { icon: <FiDownload className="text-2xl" />, title: 'Export & Share', desc: 'Export agendas as PDF, iCal, or share live links with real-time updates.' },
];

export default function AgendaFeature() {
  return (
    <div className="min-h-screen bg-[#fcfcfc] font-sans text-gray-900 overflow-hidden">
      <Navbar />

      {/* Hero */}
      <section className="pt-36 pb-20 bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 text-white relative overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-10 left-1/4 w-80 h-80 bg-emerald-500 rounded-full blur-[130px]" />
          <div className="absolute bottom-20 right-10 w-72 h-72 bg-teal-400 rounded-full blur-[110px]" />
        </div>
        <div className="max-w-5xl mx-auto px-6 text-center relative z-10">
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7 }}>
            <div className="w-20 h-20 bg-gradient-to-br from-emerald-400 to-teal-500 rounded-2xl flex items-center justify-center mx-auto mb-8 shadow-xl shadow-emerald-500/20">
              <FiCalendar className="text-4xl text-white" />
            </div>
            <p className="text-xs font-bold text-emerald-300 uppercase tracking-[0.25em] mb-4">Agenda Builder</p>
            <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight leading-[1.1] mb-6">
              Build schedules that<br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-300 to-teal-300">captivate your audience</span>
            </h1>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto mb-10 leading-relaxed">
              Create multi-track agendas, manage speaker slots, and deliver personalized itineraries — all with an intuitive visual builder.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link href="/register" className="bg-gradient-to-r from-teal-500 to-cyan-600 text-white px-10 py-4 rounded-sm font-bold text-lg uppercase tracking-wide shadow-xl shadow-teal-500/20 hover:shadow-teal-500/40 hover:-translate-y-1 transition-all">
                Build Your Agenda
              </Link>
              <Link href="/" className="text-gray-300 hover:text-white font-semibold flex items-center space-x-2 transition-colors">
                <span>Back to Home</span>
                <FiArrowRight />
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Live Schedule Preview */}
      <section className="py-24 bg-white border-t border-gray-100">
        <div className="max-w-5xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-5xl font-extrabold tracking-tight text-gray-900 mb-4">Beautiful, interactive schedules</h2>
            <p className="text-gray-500 text-xl max-w-3xl mx-auto">Here's a preview of what your event agenda can look like — clean, organized, and dynamic.</p>
          </div>
          <div className="bg-gray-50 rounded-2xl border border-gray-200 overflow-hidden shadow-sm">
            <div className="bg-gradient-to-r from-gray-800 to-gray-900 px-8 py-4 flex items-center space-x-3">
              <div className="w-3 h-3 rounded-full bg-red-400" />
              <div className="w-3 h-3 rounded-full bg-yellow-400" />
              <div className="w-3 h-3 rounded-full bg-green-400" />
              <span className="text-gray-400 text-sm ml-4 font-mono">agenda-builder.eventmaster.io</span>
            </div>
            <div className="p-8 space-y-4">
              {sampleSchedule.map((item, i) => (
                <motion.div key={i} initial={{ opacity: 0, x: -20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.3, delay: i * 0.08 }}
                  className="flex items-center bg-white rounded-xl border border-gray-200 p-5 hover:shadow-lg hover:-translate-y-0.5 transition-all cursor-pointer group"
                >
                  <div className="text-sm font-bold text-gray-400 w-24 flex-shrink-0">{item.time}</div>
                  <div className={`w-1 h-12 ${item.color} rounded-full mr-5 flex-shrink-0`} />
                  <div className="flex-1">
                    <div className="flex items-center space-x-3 mb-1">
                      <span className={`text-xs font-bold px-2 py-0.5 rounded-full text-white ${item.color}`}>{item.track}</span>
                    </div>
                    <h4 className="text-lg font-bold text-gray-900 group-hover:text-teal-600 transition-colors">{item.title}</h4>
                    <p className="text-gray-500 text-sm">{item.speaker}</p>
                  </div>
                  <FiArrowRight className="text-gray-300 group-hover:text-teal-500 transition-colors" />
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Features Grid */}
      <section className="py-24 bg-gray-50 border-t border-gray-100">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-5xl font-extrabold tracking-tight text-gray-900 mb-4">Scheduling superpowers</h2>
            <p className="text-gray-500 text-xl max-w-2xl mx-auto">Every tool you need to build and manage world-class event agendas.</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((f, i) => (
              <motion.div key={i} initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: 0.1 }} transition={{ duration: 0.4, delay: i * 0.08 }} className="bg-white rounded-2xl p-8 border border-gray-200 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all cursor-pointer">
                <div className="w-14 h-14 bg-gradient-to-br from-emerald-100 to-teal-100 text-emerald-600 rounded-xl flex items-center justify-center mb-5 shadow-sm border border-emerald-200/50">{f.icon}</div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">{f.title}</h3>
                <p className="text-gray-600 leading-relaxed">{f.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-24 bg-white">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <h2 className="text-4xl md:text-5xl font-extrabold tracking-tight text-gray-900 mb-6">Your agenda, your way</h2>
          <p className="text-xl text-gray-500 mb-10 max-w-2xl mx-auto">Start designing stunning schedules with our visual builder — no coding required.</p>
          <Link href="/register" className="bg-gradient-to-r from-teal-500 to-cyan-600 text-white px-10 py-4 rounded-sm font-bold text-lg uppercase tracking-wide shadow-xl shadow-teal-500/20 hover:shadow-teal-500/40 hover:-translate-y-1 transition-all inline-block">
            Try Now For Free
          </Link>
        </div>
      </section>

      <Footer />
    </div>
  );
}
