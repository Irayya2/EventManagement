import React from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { FiUsers, FiCheckCircle, FiArrowRight, FiMessageCircle, FiBarChart2, FiHeart, FiZap, FiSmartphone, FiStar } from 'react-icons/fi';
import Navbar from '../../components/Navbar';
import Footer from '../../components/Footer';

const engagementTools = [
  { icon: <FiMessageCircle className="text-3xl" />, title: 'Live Polling & Q&A', desc: 'Real-time audience polling, upvotable Q&A boards, and word clouds that spark engagement during sessions.', gradient: 'from-teal-50 to-cyan-50', border: 'border-teal-100', iconBg: 'from-teal-400 to-cyan-500' },
  { icon: <FiZap className="text-3xl" />, title: 'Smart Networking', desc: 'AI-powered matchmaking connects attendees based on interests, roles, and goals for meaningful connections.', gradient: 'from-violet-50 to-purple-50', border: 'border-violet-100', iconBg: 'from-violet-400 to-purple-500' },
  { icon: <FiSmartphone className="text-3xl" />, title: 'Mobile Check-In', desc: 'QR code-based contactless check-in with real-time badge printing and session attendance tracking.', gradient: 'from-amber-50 to-orange-50', border: 'border-amber-100', iconBg: 'from-amber-400 to-orange-500' },
];

const features = [
  { title: 'Registration Analytics', desc: 'Track sign-ups in real-time with source attribution, conversion funnels, and drop-off analysis.' },
  { title: 'Attendee Profiles', desc: 'Rich profiles with contact info, ticket history, dietary preferences, and accessibility needs.' },
  { title: 'Group Registration', desc: 'Allow companies to register teams with bulk upload, group discounts, and unified invoicing.' },
  { title: 'Waitlist Management', desc: 'Automated waitlists with position tracking, notification emails, and one-click confirmation.' },
  { title: 'Check-In Dashboard', desc: 'Live check-in stats, session capacity indicators, and security verification at venue entry.' },
  { title: 'Post-Event Surveys', desc: 'Automated feedback collection with NPS scoring, session ratings, and improvement suggestions.' },
];

const attendeeJourney = [
  { step: '01', title: 'Discover', desc: 'Find your event through search, social sharing, or direct invitation links.' },
  { step: '02', title: 'Register', desc: 'Complete registration with custom forms, ticket selection, and secure payment.' },
  { step: '03', title: 'Prepare', desc: 'Build a personal schedule, connect with other attendees, and download materials.' },
  { step: '04', title: 'Attend', desc: 'Check in seamlessly, navigate sessions, participate in polls, and network.' },
  { step: '05', title: 'Reflect', desc: 'Access recordings, complete surveys, download certificates, and stay connected.' },
];

export default function AttendeesFeature() {
  return (
    <div className="min-h-screen bg-[#fcfcfc] font-sans text-gray-900 overflow-hidden">
      <Navbar />

      {/* Hero */}
      <section className="pt-36 pb-20 bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 text-white relative overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-20 left-1/3 w-80 h-80 bg-violet-500 rounded-full blur-[130px]" />
          <div className="absolute bottom-10 right-1/4 w-72 h-72 bg-teal-400 rounded-full blur-[110px]" />
        </div>
        <div className="max-w-5xl mx-auto px-6 text-center relative z-10">
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7 }}>
            <div className="w-20 h-20 bg-gradient-to-br from-violet-400 to-purple-500 rounded-2xl flex items-center justify-center mx-auto mb-8 shadow-xl shadow-violet-500/20">
              <FiUsers className="text-4xl text-white" />
            </div>
            <p className="text-xs font-bold text-violet-300 uppercase tracking-[0.25em] mb-4">Attendee Engagement</p>
            <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight leading-[1.1] mb-6">
              Create experiences<br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-violet-300 to-teal-300">attendees remember</span>
            </h1>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto mb-10 leading-relaxed">
              From registration to post-event follow-up — deliver a seamless, personalized journey that turns attendees into advocates.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link href="/register" className="bg-gradient-to-r from-teal-500 to-cyan-600 text-white px-10 py-4 rounded-sm font-bold text-lg uppercase tracking-wide shadow-xl shadow-teal-500/20 hover:shadow-teal-500/40 hover:-translate-y-1 transition-all">
                Engage Your Audience
              </Link>
              <Link href="/" className="text-gray-300 hover:text-white font-semibold flex items-center space-x-2 transition-colors">
                <span>Back to Home</span>
                <FiArrowRight />
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Engagement Tools */}
      <section className="py-24 bg-white border-t border-gray-100">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-5xl font-extrabold tracking-tight text-gray-900 mb-4">Tools that spark engagement</h2>
            <p className="text-gray-500 text-xl max-w-3xl mx-auto">Keep your attendees active, connected, and delighted at every moment.</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {engagementTools.map((tool, i) => (
              <motion.div key={i} initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: 0.2 }} whileHover={{ y: -8, scale: 1.02 }} transition={{ duration: 0.5, delay: i * 0.1, type: 'spring', bounce: 0.4 }}
                className={`bg-gradient-to-br ${tool.gradient} rounded-2xl p-10 border ${tool.border} shadow-sm hover:shadow-2xl cursor-pointer`}
              >
                <div className={`w-16 h-16 bg-gradient-to-br ${tool.iconBg} text-white rounded-xl flex items-center justify-center mb-6 shadow-lg`}>{tool.icon}</div>
                <h3 className="text-2xl font-extrabold text-gray-900 mb-4">{tool.title}</h3>
                <p className="text-gray-600 text-lg leading-relaxed">{tool.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Attendee Journey */}
      <section className="py-24 bg-gray-900 text-white border-t-4 border-teal-500">
        <div className="max-w-5xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-5xl font-extrabold tracking-tight mb-4">The complete attendee journey</h2>
            <p className="text-gray-400 text-xl max-w-2xl mx-auto">Every touchpoint is crafted for delight — from discovery to post-event engagement.</p>
          </div>
          <div className="space-y-6">
            {attendeeJourney.map((item, i) => (
              <motion.div key={i} initial={{ opacity: 0, x: i % 2 === 0 ? -30 : 30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.5, delay: i * 0.1 }}
                className="flex items-start space-x-6 bg-gray-800/50 rounded-2xl p-8 border border-gray-700 hover:border-teal-500/50 transition-colors"
              >
                <div className="text-4xl font-extrabold text-teal-400 flex-shrink-0 opacity-50">{item.step}</div>
                <div>
                  <h3 className="text-2xl font-bold text-white mb-2">{item.title}</h3>
                  <p className="text-gray-400 text-lg leading-relaxed">{item.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Grid */}
      <section className="py-24 bg-gray-50 border-t border-gray-100">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-5xl font-extrabold tracking-tight text-gray-900 mb-4">Management made easy</h2>
            <p className="text-gray-500 text-xl max-w-2xl mx-auto">All the tools to manage attendees efficiently at any scale.</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((f, i) => (
              <motion.div key={i} initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: 0.1 }} transition={{ duration: 0.4, delay: i * 0.08 }} className="bg-white rounded-2xl p-8 border border-gray-200 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all cursor-pointer">
                <div className="flex items-start space-x-4">
                  <FiCheckCircle className="text-2xl text-violet-500 mt-1 flex-shrink-0" />
                  <div>
                    <h3 className="text-xl font-bold text-gray-900 mb-2">{f.title}</h3>
                    <p className="text-gray-600 leading-relaxed">{f.desc}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-24 bg-white">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <h2 className="text-4xl md:text-5xl font-extrabold tracking-tight text-gray-900 mb-6">Put your attendees first</h2>
          <p className="text-xl text-gray-500 mb-10 max-w-2xl mx-auto">Create unforgettable event experiences with tools built for engagement and delight.</p>
          <Link href="/register" className="bg-gradient-to-r from-teal-500 to-cyan-600 text-white px-10 py-4 rounded-sm font-bold text-lg uppercase tracking-wide shadow-xl shadow-teal-500/20 hover:shadow-teal-500/40 hover:-translate-y-1 transition-all inline-block">
            Try Now For Free
          </Link>
        </div>
      </section>

      <Footer />
    </div>
  );
}
