import React from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { FiMic, FiCheckCircle, FiArrowRight, FiFileText, FiVideo, FiMail, FiAward, FiCalendar, FiGlobe } from 'react-icons/fi';
import Navbar from '../../components/Navbar';
import Footer from '../../components/Footer';

const speakerProfiles = [
  { name: 'Sarah Chen', role: 'CEO, TechVentures', topic: 'Future of AI in Events', initials: 'SC', gradient: 'from-teal-400 to-cyan-500' },
  { name: 'James Rivera', role: 'VP Engineering, CloudScale', topic: 'Scaling Global Platforms', initials: 'JR', gradient: 'from-violet-400 to-purple-500' },
  { name: 'Maya Patel', role: 'Design Director, Pixel', topic: 'Design Systems at Scale', initials: 'MP', gradient: 'from-amber-400 to-orange-500' },
  { name: 'David Kim', role: 'Head of Data, Analytics Co', topic: 'Data-Driven Event Planning', initials: 'DK', gradient: 'from-emerald-400 to-teal-500' },
];

const managementFeatures = [
  { icon: <FiFileText className="text-2xl" />, title: 'Call for Papers', desc: 'Open submissions portal with custom forms, review workflows, and automated acceptance or rejection notifications.' },
  { icon: <FiVideo className="text-2xl" />, title: 'Presentation Upload', desc: 'Speakers upload slides, videos, and supplementary materials directly to the platform before the event.' },
  { icon: <FiMail className="text-2xl" />, title: 'Automated Communications', desc: 'Auto-send session confirmations, schedule reminders, tech check invitations, and post-event thank-you emails.' },
  { icon: <FiAward className="text-2xl" />, title: 'Speaker Profiles', desc: 'Rich speaker bios with photo, social links, past talks, and downloadable session materials for attendees.' },
  { icon: <FiCalendar className="text-2xl" />, title: 'Session Assignment', desc: 'Drag-and-drop speakers into agenda slots with conflict detection and room capacity matching.' },
  { icon: <FiGlobe className="text-2xl" />, title: 'Travel & Logistics', desc: 'Track speaker travel arrangements, hotel bookings, dietary requirements, and reimbursement requests.' },
];

const workflow = [
  { phase: 'Submit', desc: 'Speakers submit proposals through your branded call-for-papers portal with topic, abstract, and bio.' },
  { phase: 'Review', desc: 'Your review committee scores and comments on submissions with blind or open review workflows.' },
  { phase: 'Accept', desc: 'Automated acceptance emails with session details, schedule slots, and speaker agreement forms.' },
  { phase: 'Prepare', desc: 'Speakers upload materials, complete tech checks, and confirm attendance through their dashboard.' },
  { phase: 'Present', desc: 'Live session management with timer controls, audience Q&A moderation, and recording capabilities.' },
];

export default function SpeakersFeature() {
  return (
    <div className="min-h-screen bg-[#fcfcfc] font-sans text-gray-900 overflow-hidden">
      <Navbar />

      {/* Hero */}
      <section className="pt-36 pb-20 bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 text-white relative overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-10 right-1/4 w-80 h-80 bg-amber-500 rounded-full blur-[130px]" />
          <div className="absolute bottom-20 left-10 w-72 h-72 bg-teal-400 rounded-full blur-[110px]" />
        </div>
        <div className="max-w-5xl mx-auto px-6 text-center relative z-10">
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7 }}>
            <div className="w-20 h-20 bg-gradient-to-br from-amber-400 to-orange-500 rounded-2xl flex items-center justify-center mx-auto mb-8 shadow-xl shadow-amber-500/20">
              <FiMic className="text-4xl text-white" />
            </div>
            <p className="text-xs font-bold text-amber-300 uppercase tracking-[0.25em] mb-4">Speaker Management</p>
            <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight leading-[1.1] mb-6">
              Showcase voices that<br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-300 to-orange-300">inspire and educate</span>
            </h1>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto mb-10 leading-relaxed">
              From call-for-papers to standing ovations — manage your entire speaker pipeline with tools that make both organizers and speakers shine.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link href="/register" className="bg-gradient-to-r from-teal-500 to-cyan-600 text-white px-10 py-4 rounded-sm font-bold text-lg uppercase tracking-wide shadow-xl shadow-teal-500/20 hover:shadow-teal-500/40 hover:-translate-y-1 transition-all">
                Manage Speakers
              </Link>
              <Link href="/" className="text-gray-300 hover:text-white font-semibold flex items-center space-x-2 transition-colors">
                <span>Back to Home</span>
                <FiArrowRight />
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Speaker Showcase */}
      <section className="py-24 bg-white border-t border-gray-100">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-5xl font-extrabold tracking-tight text-gray-900 mb-4">Beautiful speaker profiles</h2>
            <p className="text-gray-500 text-xl max-w-3xl mx-auto">Showcase your speakers with rich, interactive profiles that attendees will love browsing.</p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {speakerProfiles.map((speaker, i) => (
              <motion.div key={i} initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: 0.2 }} whileHover={{ y: -8, scale: 1.03 }} transition={{ duration: 0.5, delay: i * 0.1, type: 'spring', bounce: 0.4 }}
                className="bg-white rounded-2xl border border-gray-200 shadow-sm hover:shadow-2xl cursor-pointer overflow-hidden group"
              >
                <div className={`h-32 bg-gradient-to-br ${speaker.gradient} flex items-center justify-center relative`}>
                  <div className="w-20 h-20 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center text-white text-2xl font-extrabold border-2 border-white/40">
                    {speaker.initials}
                  </div>
                </div>
                <div className="p-6 text-center">
                  <h3 className="text-xl font-bold text-gray-900 mb-1 group-hover:text-teal-600 transition-colors">{speaker.name}</h3>
                  <p className="text-sm text-gray-500 mb-3">{speaker.role}</p>
                  <div className="bg-gray-50 rounded-lg px-3 py-2 text-sm text-gray-700 font-medium border border-gray-100">
                    🎤 {speaker.topic}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Speaker Workflow */}
      <section className="py-24 bg-gray-900 text-white border-t-4 border-amber-500">
        <div className="max-w-5xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-5xl font-extrabold tracking-tight mb-4">From submission to standing ovation</h2>
            <p className="text-gray-400 text-xl max-w-2xl mx-auto">A streamlined pipeline that handles every stage of speaker management.</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
            {workflow.map((item, i) => (
              <motion.div key={i} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.4, delay: i * 0.1 }}
                className="bg-gray-800/60 rounded-2xl p-6 border border-gray-700 hover:border-amber-500/50 transition-colors text-center relative"
              >
                <div className="w-10 h-10 bg-gradient-to-br from-amber-400 to-orange-500 rounded-full flex items-center justify-center text-white font-bold text-sm mx-auto mb-4 shadow-lg">{i + 1}</div>
                <h3 className="text-lg font-bold text-white mb-2">{item.phase}</h3>
                <p className="text-gray-400 text-sm leading-relaxed">{item.desc}</p>
                {i < 4 && <div className="hidden md:block absolute top-1/2 -right-3 w-6 h-0.5 bg-gray-700" />}
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Management Features */}
      <section className="py-24 bg-gray-50 border-t border-gray-100">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-5xl font-extrabold tracking-tight text-gray-900 mb-4">Complete speaker tools</h2>
            <p className="text-gray-500 text-xl max-w-2xl mx-auto">Everything you need to recruit, onboard, and support your speakers.</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {managementFeatures.map((f, i) => (
              <motion.div key={i} initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: 0.1 }} transition={{ duration: 0.4, delay: i * 0.08 }} className="bg-white rounded-2xl p-8 border border-gray-200 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all cursor-pointer">
                <div className="w-14 h-14 bg-gradient-to-br from-amber-100 to-orange-100 text-amber-600 rounded-xl flex items-center justify-center mb-5 shadow-sm border border-amber-200/50">{f.icon}</div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">{f.title}</h3>
                <p className="text-gray-600 leading-relaxed">{f.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="py-20 bg-gradient-to-r from-amber-500 to-orange-600 text-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            {[
              { value: '5K+', label: 'Speakers Managed' },
              { value: '15K+', label: 'Sessions Delivered' },
              { value: '98%', label: 'Speaker Satisfaction' },
              { value: '30+', label: 'Countries Represented' },
            ].map((s, i) => (
              <motion.div key={i} initial={{ opacity: 0, scale: 0.9 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }} transition={{ duration: 0.4, delay: i * 0.1 }}>
                <div className="text-4xl md:text-5xl font-extrabold mb-2">{s.value}</div>
                <div className="text-amber-100 font-medium text-sm uppercase tracking-wider">{s.label}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-24 bg-white">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <h2 className="text-4xl md:text-5xl font-extrabold tracking-tight text-gray-900 mb-6">Elevate your speaker experience</h2>
          <p className="text-xl text-gray-500 mb-10 max-w-2xl mx-auto">Give your speakers the tools they deserve and your audience the content they crave.</p>
          <Link href="/register" className="bg-gradient-to-r from-teal-500 to-cyan-600 text-white px-10 py-4 rounded-sm font-bold text-lg uppercase tracking-wide shadow-xl shadow-teal-500/20 hover:shadow-teal-500/40 hover:-translate-y-1 transition-all inline-block">
            Try Now For Free
          </Link>
        </div>
      </section>

      <Footer />
    </div>
  );
}
