

import React, { useState, useRef } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { FiArrowRight, FiCalendar, FiUsers, FiBarChart2, FiMapPin, FiShield, FiSmartphone, FiCheckCircle, FiMenu, FiX } from 'react-icons/fi';
import Navbar from '../components/Navbar';

export default function LandingPage() {
  const [activeVideo, setActiveVideo] = useState(1);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const video1Ref = useRef<HTMLVideoElement>(null);
  const video2Ref = useRef<HTMLVideoElement>(null);

  const handleVideo1End = () => {
    setActiveVideo(2);
    if (video2Ref.current) {
      video2Ref.current.currentTime = 0;
      video2Ref.current.play().catch(e => console.error("Video 2 play failed:", e));
    }
  };

  const handleVideo2End = () => {
    setActiveVideo(1);
    if (video1Ref.current) {
      video1Ref.current.currentTime = 0;
      video1Ref.current.play().catch(e => console.error("Video 1 play failed:", e));
    }
  };

  return (
    <div className="min-h-screen bg-[#fcfcfc] font-sans text-gray-900 overflow-hidden">
      
      <Navbar />

      {/* Hero Section */}
      <section className="pt-40 pb-24 relative overflow-hidden">
        {/* Background Videos */}
        <div className="absolute inset-0 z-0 bg-gray-900">
          <video 
            ref={video1Ref}
            autoPlay 
            muted 
            playsInline 
            onEnded={handleVideo1End}
            className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-1000 ease-in-out ${activeVideo === 1 ? 'opacity-100 z-10' : 'opacity-0 z-0 pointer-events-none'}`}
          >
            <source src="/video1.mp4" type="video/mp4" />
          </video>
          <video 
            ref={video2Ref}
            muted 
            playsInline 
            onEnded={handleVideo2End}
            className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-1000 ease-in-out ${activeVideo === 2 ? 'opacity-100 z-10' : 'opacity-0 z-0 pointer-events-none'}`}
          >
            <source src="/video2.mp4" type="video/mp4" />
          </video>
        </div>
        
        {/* Overlay completely removed so the video is 100% clearly visible */}

        <div className="max-w-5xl mx-auto px-6 text-center relative z-10 pt-8">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7 }}>
            <p className="text-xs font-bold text-teal-200 uppercase tracking-[0.2em] mb-4 drop-shadow-md">
              All-In-One Enterprise Event Engine
            </p>
            
            <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight text-white leading-[1.1] mb-6 drop-shadow-[0_4px_4px_rgba(0,0,0,0.8)]">
              Craft event experiences <br/>
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-teal-300 to-emerald-300 relative drop-shadow-[0_2px_2px_rgba(0,0,0,0.8)]">
                your audience will love
              </span>
            </h1>

            <div className="flex items-center justify-center space-x-4 text-sm font-bold text-white uppercase tracking-widest mb-10 drop-shadow-md">
              <span>In Person</span>
              <span className="w-1.5 h-1.5 rounded-full bg-teal-400 shadow-sm"></span>
              <span>Virtual</span>
              <span className="w-1.5 h-1.5 rounded-full bg-teal-400 shadow-sm"></span>
              <span>Hybrid</span>
            </div>

            <p className="text-xl md:text-2xl text-gray-100 max-w-3xl mx-auto mb-10 leading-relaxed font-medium drop-shadow-[0_2px_2px_rgba(0,0,0,0.8)]">
              From dynamic registration forms to global payment tracking, get all the flexibility your events need—backed by award-winning event architecture.
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link href="/register" className="bg-gradient-to-r from-teal-500 to-cyan-600 text-white px-10 py-4 rounded-sm font-bold text-lg uppercase tracking-wide shadow-xl shadow-teal-500/20 hover:shadow-teal-500/40 hover:-translate-y-1 transition-all">
                Try Now For Free
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Primary Modules Section */}
      <section id="features" className="py-24 bg-white border-t border-gray-100">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-5xl font-extrabold tracking-tight text-gray-900 mb-4">
              Plan, run, and analyze your event—all from one place
            </h2>
            <p className="text-gray-500 text-xl max-w-3xl mx-auto">
              Event planning at every stage. We handle the heavy lifting so you can focus on building connections.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Main Feature Card 1 */}
            <motion.div initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: false, amount: 0.1 }} whileHover={{ y: -8, scale: 1.01 }} transition={{ duration: 0.5, type: "spring", bounce: 0.4 }} className="bg-gray-50 rounded-2xl p-10 lg:col-span-2 border border-gray-100 flex flex-col md:flex-row items-center gap-10 shadow-sm hover:shadow-2xl cursor-pointer">
              <div className="flex-1">
                <div className="w-16 h-16 bg-gradient-to-br from-teal-100 to-cyan-100 text-teal-600 rounded-xl flex items-center justify-center text-3xl mb-6 shadow-sm border border-teal-200/50">🎟️</div>
                <h3 className="text-3xl font-extrabold text-gray-900 mb-4">Intelligent Role-Based Workflows.</h3>
                <p className="text-lg text-gray-600 leading-relaxed">
                  Four deeply integrated roles (Admin, Organizer, Staff, Participant). Each operates from highly optimized, isolated dashboards allowing effortless global scaling.
                </p>
              </div>
              <div className="flex-1 rounded-xl shadow-sm border border-gray-100 w-full overflow-hidden relative min-h-[250px]">
                 <img src="/image.png" alt="Dashboard Workflow" className="absolute inset-0 w-full h-full object-cover" />
              </div>
            </motion.div>

            {/* Feature Card 2 */}
            <motion.div initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: false, amount: 0.1 }} whileHover={{ y: -8, scale: 1.02 }} transition={{ duration: 0.5, type: "spring", bounce: 0.4 }} className="bg-gradient-to-br from-[#f2fbfa] to-white rounded-2xl border border-[#e2f5f2] shadow-sm hover:shadow-2xl cursor-pointer flex flex-col overflow-hidden">
              <div className="p-10 flex-1">
                <div className="w-16 h-16 bg-white text-teal-500 rounded-xl flex items-center justify-center text-3xl mb-6 shadow-sm"><FiCalendar /></div>
                <h3 className="text-2xl font-extrabold text-gray-900 mb-4">Event planning, at every stage</h3>
                <p className="text-gray-600 text-lg leading-relaxed">
                  Agenda builder to organize multiple tracks, robust venue and vendor mappings, and massive scale data handling perfectly processed. Fast track to the finish line.
                </p>
              </div>
              <div className="h-48 w-full relative">
                <img src="/image0.png" alt="Event Planning" className="absolute inset-0 w-full h-full object-cover border-t border-[#e2f5f2]" />
              </div>
            </motion.div>

            {/* Feature Card 3 */}
            <motion.div initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: false, amount: 0.1 }} whileHover={{ y: -8, scale: 1.02 }} transition={{ duration: 0.5, type: "spring", bounce: 0.4 }} className="bg-gradient-to-br from-[#fff9f0] to-white rounded-2xl border border-[#feeed6] shadow-sm hover:shadow-2xl cursor-pointer flex flex-col overflow-hidden">
              <div className="p-10 flex-1">
                <div className="w-16 h-16 bg-white text-amber-500 rounded-xl flex items-center justify-center text-3xl mb-6 shadow-sm"><FiBarChart2 /></div>
                <h3 className="text-2xl font-extrabold text-gray-900 mb-4">Smarter decisions. Greater impact.</h3>
                <p className="text-gray-600 text-lg leading-relaxed">
                  Unlock actionable insights. Rich analytical dashboards that show you exactly who registered, financial milestones, and tracking from your command center.
                </p>
              </div>
              <div className="h-48 w-full relative">
                <img src="/image2.png" alt="Analytics Insights" className="absolute inset-0 w-full h-full object-cover border-t border-[#feeed6]" />
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Build and Market Section */}
      <section className="py-24 bg-gray-900 text-white border-t-4 border-teal-500">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex flex-col md:flex-row gap-16 items-center">
             <div className="flex-1">
                <h2 className="text-4xl md:text-5xl font-extrabold tracking-tight mb-6 text-white">Built to make your event journey smoother</h2>
                <div className="space-y-8 mt-10">
                  <div className="flex items-start space-x-4">
                    <FiCheckCircle className="text-3xl text-emerald-400 mt-1" />
                    <div>
                      <h4 className="text-xl font-bold mb-2">Architectural Superiority</h4>
                      <p className="text-gray-400">Launch robust enterprise forms with Next.js performance and zero coding. Complete white-labeling.</p>
                    </div>
                  </div>
                  <div className="flex items-start space-x-4">
                    <FiCheckCircle className="text-3xl text-cyan-400 mt-1" />
                    <div>
                      <h4 className="text-xl font-bold mb-2">Set the stage for connections</h4>
                      <p className="text-gray-400">Live WebSockets keep attendees, organizers, and payments synced instantly without page reloads.</p>
                    </div>
                  </div>
                  <div className="flex items-start space-x-4">
                    <FiCheckCircle className="text-3xl text-teal-400 mt-1" />
                    <div>
                      <h4 className="text-xl font-bold mb-2">Automated Payouts</h4>
                      <p className="text-gray-400">Track and calculate ticket revenue instantly. Secure processing architecture built-in.</p>
                    </div>
                  </div>
                </div>
             </div>
             <div className="flex-1 right-box w-full grid grid-cols-2 gap-4">
                <div className="bg-gray-800 rounded-xl h-48 border border-gray-700 overflow-hidden relative group">
                   <img src="/image3.png" alt="Feature Location" className="absolute inset-0 w-full h-full object-cover opacity-80 group-hover:opacity-100 transition-opacity" />
                   <div className="absolute inset-0 bg-gradient-to-t from-gray-900/90 to-transparent"></div>
                   <div className="absolute bottom-6 left-6 z-10">
                     <div className="w-12 h-12 bg-gradient-to-br from-emerald-400 to-teal-500 rounded-lg mb-4 flex items-center justify-center text-white shadow-lg"><FiMapPin className="text-xl"/></div>
                   </div>
                </div>
                <div className="bg-gray-800 rounded-xl h-64 border border-gray-700 mt-12 overflow-hidden relative group">
                   <img src="/image4.png" alt="Feature Security" className="absolute inset-0 w-full h-full object-cover opacity-80 group-hover:opacity-100 transition-opacity" />
                   <div className="absolute inset-0 bg-gradient-to-t from-gray-900/90 to-transparent"></div>
                   <div className="absolute bottom-6 left-6 z-10">
                     <div className="w-12 h-12 bg-gradient-to-br from-cyan-400 to-blue-500 rounded-lg mb-4 flex items-center justify-center text-white shadow-lg"><FiShield className="text-xl"/></div>
                   </div>
                </div>
             </div>
          </div>
        </div>
      </section>

      {/* Two Integrations Section */}
      <section id="apps" className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-6 text-center">
          <div className="w-20 h-20 bg-teal-50 rounded-full flex items-center justify-center mx-auto mb-6">
            <FiSmartphone className="text-4xl text-teal-500" />
          </div>
          <h2 className="text-4xl md:text-5xl font-extrabold tracking-tight text-gray-900 mb-4">Unified desktop & mobile experience.</h2>
          <p className="text-gray-500 text-xl max-w-2xl mx-auto mb-16">Organizers manage on the go. Attendees connect seamlessly. An ecosystem built specifically for modern device environments.</p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
             <motion.div initial={{ opacity: 0, scale: 0.95 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: false, amount: 0.2 }} whileHover={{ y: -8 }} transition={{ duration: 0.5, type: "spring" }} className="bg-gradient-to-b from-[#f2fbfa] to-white rounded-3xl p-12 text-left border border-teal-50 shadow-sm hover:shadow-2xl cursor-pointer group">
                <h3 className="text-2xl font-bold text-gray-900 mb-4">You stay connected behind the scenes</h3>
                <p className="text-gray-600 mb-8">Process registrations instantly, update statuses dynamically, and monitor live metrics effortlessly from the secure Organizer Grid.</p>
                <div className="h-48 bg-white border border-teal-100 rounded-xl shadow-sm relative overflow-hidden group">
                  <img src="/image5.png" alt="Organizer Portal" className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" />
                  <div className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-teal-400 to-emerald-400 z-10"></div>
                </div>
             </motion.div>
             <motion.div initial={{ opacity: 0, scale: 0.95 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: false, amount: 0.2 }} whileHover={{ y: -8 }} transition={{ duration: 0.5, type: "spring" }} className="bg-gradient-to-b from-[#f0f9ff] to-white rounded-3xl p-12 text-left border border-cyan-50 shadow-sm hover:shadow-2xl cursor-pointer group flex flex-col justify-between">
                <div>
                  <h3 className="text-2xl font-bold text-gray-900 mb-4">Your attendees get all the action</h3>
                  <p className="text-gray-600 mb-8">Search events efficiently, check into locations securely, track ticket purchases, and download interactive receipts instantly.</p>
                </div>
                <div className="h-48 bg-white border border-cyan-100 rounded-xl shadow-sm relative overflow-hidden group mt-auto">
                  <img src="/image.png" alt="Attendee App Flow" className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" />
                  <div className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-cyan-400 to-blue-400 z-10"></div>
                </div>
             </motion.div>
          </div>
        </div>
      </section>

      {/* Security Section */}
      <section id="security" className="py-24 bg-gray-50 border-t border-gray-100">
        <div className="max-w-5xl mx-auto px-6 text-center">
          <div className="w-20 h-20 bg-emerald-50 rounded-full flex items-center justify-center mx-auto mb-6 shadow-sm border border-emerald-100">
            <FiShield className="text-4xl text-emerald-500" />
          </div>
          <h2 className="text-4xl font-extrabold text-gray-900 mb-6">Security by design. Privacy by default.</h2>
          <p className="text-xl text-gray-500 mb-8 max-w-3xl mx-auto">Bring the spotlight to your event knowing your data is shielded by enterprise-grade security protocols, Role-Based Access Controls (RBAC), and stateless JWT transaction authentication.</p>
          <Link href="/register" className="inline-flex items-center space-x-2 text-teal-600 font-bold hover:text-teal-700 uppercase tracking-widest text-sm bg-white px-6 py-3 rounded-full shadow-sm hover:shadow-md transition-all border border-gray-200">
            <span>Verify your infrastructure</span>
            <FiArrowRight />
          </Link>
        </div>
      </section>

      {/* Footer */}
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
    </div>
  );
}
