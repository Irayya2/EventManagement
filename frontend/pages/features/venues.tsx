import React, { useState, useEffect, useCallback } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import { FiMapPin, FiCheckCircle, FiArrowRight, FiArrowLeft, FiGlobe, FiMonitor, FiWifi, FiChevronLeft, FiChevronRight } from 'react-icons/fi';
import Navbar from '../../components/Navbar';
import Footer from '../../components/Footer';

const venueImages = [
  '/images/venues/venue1.png',
  '/images/venues/venue2.png',
  '/images/venues/venue3.png',
  '/images/venues/venue4.png',
];

const venueCards = [
  { image: '/images/venues/venue1.png', title: 'Grand Convention Center', location: 'New York, NY', capacity: '5,000+', type: 'Conference Hall', rating: '4.9' },
  { image: '/images/venues/venue2.png', title: 'The Skyline Pavilion', location: 'San Francisco, CA', capacity: '2,500+', type: 'Outdoor Arena', rating: '4.8' },
  { image: '/images/venues/venue3.png', title: 'Crystal Ballroom', location: 'Chicago, IL', capacity: '1,200+', type: 'Banquet Hall', rating: '4.7' },
  { image: '/images/venues/venue4.png', title: 'Innovation Hub', location: 'Austin, TX', capacity: '800+', type: 'Tech Campus', rating: '4.9' },
];

const features = [
  { title: 'Interactive Floor Plans', desc: 'Drag-and-drop booth placement, seating arrangements, and stage positioning with live preview.' },
  { title: 'Capacity Management', desc: 'Real-time occupancy tracking with automated waitlist management and overflow routing.' },
  { title: 'Vendor Zone Mapping', desc: 'Assign sponsor booths, food courts, and exhibition zones with GPS-enabled wayfinding.' },
  { title: 'Multi-Venue Coordination', desc: 'Manage multiple locations under a single event with unified scheduling and resource allocation.' },
  { title: 'Availability Calendar', desc: 'Check venue availability in real-time, block dates, and prevent double-bookings automatically.' },
  { title: 'Cost Tracking', desc: 'Per-venue budgeting with daily rate calculations, deposit tracking, and payment milestones.' },
];

export default function VenuesFeature() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [timeLeft, setTimeLeft] = useState(5);

  const nextSlide = useCallback(() => {
    setCurrentSlide((prev) => (prev + 1) % venueImages.length);
    setTimeLeft(5);
  }, []);

  const prevSlide = useCallback(() => {
    setCurrentSlide((prev) => (prev - 1 + venueImages.length) % venueImages.length);
    setTimeLeft(5);
  }, []);

  const goToSlide = (index: number) => {
    setCurrentSlide(index);
    setTimeLeft(5);
  };

  // Auto-advance carousel with countdown
  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 0) {
          setCurrentSlide((s) => (s + 1) % venueImages.length);
          return 5;
        }
        return prev - 1;
      });
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="min-h-screen bg-[#fcfcfc] font-sans text-gray-900 overflow-hidden">
      <Navbar />

      {/* Hero with Full Background Carousel */}
      <section className="relative min-h-[90vh] flex items-center pt-20 overflow-hidden bg-gray-900">
        
        {/* Background Auto-Sliding Images */}
        <div className="absolute inset-0 z-0">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentSlide}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 1.5 }}
              className="absolute inset-0"
            >
              <Image
                src={venueImages[currentSlide]}
                alt={`Venue background ${currentSlide + 1}`}
                fill
                className="object-cover"
                priority={currentSlide === 0}
              />
            </motion.div>
          </AnimatePresence>
          
          {/* Gradient Overlay so text is readable */}
          <div className="absolute inset-0 bg-gradient-to-r from-gray-900 via-gray-900/80 to-transparent"></div>
          <div className="absolute inset-0 bg-gradient-to-t from-gray-900 via-transparent to-transparent"></div>
        </div>

        {/* Hero Content Overlay */}
        <div className="max-w-7xl mx-auto px-6 relative z-10 w-full py-20">
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7 }} className="max-w-2xl">
            <div className="inline-flex items-center space-x-2 bg-white/10 backdrop-blur-md rounded-full px-4 py-2 border border-white/20 mb-8 shadow-lg">
              <FiMapPin className="text-teal-400" />
              <span className="text-xs font-bold text-white uppercase tracking-widest">Venue Management</span>
            </div>
            
            <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight leading-[1.1] mb-6 text-white drop-shadow-xl">
              Every location,<br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-teal-300 to-emerald-300">perfectly orchestrated</span>
            </h1>
            
            <p className="text-xl text-gray-200 max-w-xl mb-10 leading-relaxed drop-shadow-md">
              From intimate meeting rooms to sprawling convention centers — manage every venue detail with enterprise-grade precision and beautiful visual tools.
            </p>
            
            <div className="flex flex-col sm:flex-row items-center sm:items-start gap-4">
              <Link href="/register" className="bg-gradient-to-r from-teal-500 to-cyan-600 text-white px-10 py-4 rounded-sm font-bold text-lg uppercase tracking-wide shadow-xl shadow-teal-500/20 hover:shadow-teal-500/50 hover:-translate-y-1 transition-all">
                Get Started Free
              </Link>
              <Link href="/" className="text-gray-300 hover:text-white font-semibold flex items-center justify-center space-x-2 transition-colors py-4 px-6 bg-white/5 hover:bg-white/10 border border-white/10 rounded-sm backdrop-blur-sm shadow-xl">
                <span>Back to Home</span>
                <FiArrowRight />
              </Link>
            </div>
          </motion.div>
        </div>

        {/* Interactive Dots for Carousel with Countdown */}
        <div className="absolute bottom-8 left-6 right-6 z-20 flex justify-center sm:justify-start sm:left-[5vw] max-w-7xl mx-auto items-center space-x-4">
          {venueImages.map((_, i) => (
            <button
              key={i}
              onClick={() => goToSlide(i)}
              className={`flex items-center justify-center rounded-full transition-all duration-300 font-bold font-mono text-sm shadow-xl
                ${i === currentSlide 
                  ? 'h-10 w-10 bg-teal-400 text-teal-950 ring-4 ring-teal-400/30' 
                  : 'h-3 w-3 bg-white/40 hover:bg-white/70 text-transparent'}`}
              aria-label={`Go to slide ${i + 1}`}
            >
              {i === currentSlide ? timeLeft : ''}
            </button>
          ))}
        </div>
      </section>

      {/* Venue Cards with Images */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-5xl font-extrabold tracking-tight text-gray-900 mb-4">Featured Venues</h2>
            <p className="text-gray-500 text-xl max-w-3xl mx-auto">Discover world-class venues managed on our platform — designed for events of every scale.</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {venueCards.map((venue, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.2 }}
                whileHover={{ y: -8 }}
                transition={{ duration: 0.5, delay: i * 0.1, type: 'spring', bounce: 0.4 }}
                className="bg-white rounded-2xl overflow-hidden border border-gray-200 shadow-sm hover:shadow-2xl transition-all cursor-pointer group"
              >
                {/* Image */}
                <div className="relative h-52 overflow-hidden">
                  <Image
                    src={venue.image}
                    alt={venue.title}
                    fill
                    className="object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                  <div className="absolute top-3 right-3 bg-white/90 backdrop-blur-sm rounded-lg px-2.5 py-1 text-xs font-bold text-teal-700 border border-teal-100">
                    ★ {venue.rating}
                  </div>
                  <div className="absolute bottom-0 inset-x-0 h-16 bg-gradient-to-t from-black/40 to-transparent" />
                </div>
                {/* Info */}
                <div className="p-5">
                  <h3 className="text-lg font-extrabold text-gray-900 mb-1">{venue.title}</h3>
                  <div className="flex items-center text-gray-500 text-sm mb-3">
                    <FiMapPin className="mr-1.5 text-teal-500" />
                    {venue.location}
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-semibold text-gray-400 uppercase tracking-wider">{venue.type}</span>
                    <span className="text-xs font-bold text-teal-600 bg-teal-50 px-3 py-1 rounded-full border border-teal-100">{venue.capacity}</span>
                  </div>
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
            <h2 className="text-3xl md:text-5xl font-extrabold tracking-tight text-gray-900 mb-4">Powerful venue tools</h2>
            <p className="text-gray-500 text-xl max-w-2xl mx-auto">Everything you need to plan, manage, and optimize your event spaces.</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((f, i) => (
              <motion.div key={i} initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: 0.1 }} transition={{ duration: 0.4, delay: i * 0.08 }} className="bg-white rounded-2xl p-8 border border-gray-200 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all cursor-pointer">
                <div className="flex items-start space-x-4">
                  <FiCheckCircle className="text-2xl text-teal-500 mt-1 flex-shrink-0" />
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

      {/* Stats */}
      <section className="py-20 bg-gradient-to-r from-teal-600 to-cyan-700 text-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            {[
              { value: '10K+', label: 'Venues Managed' },
              { value: '99.9%', label: 'Uptime Guaranteed' },
              { value: '50+', label: 'Countries Supported' },
              { value: '4.9★', label: 'User Satisfaction' },
            ].map((s, i) => (
              <motion.div key={i} initial={{ opacity: 0, scale: 0.9 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }} transition={{ duration: 0.4, delay: i * 0.1 }}>
                <div className="text-4xl md:text-5xl font-extrabold mb-2">{s.value}</div>
                <div className="text-teal-100 font-medium text-sm uppercase tracking-wider">{s.label}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-24 bg-white">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <h2 className="text-4xl md:text-5xl font-extrabold tracking-tight text-gray-900 mb-6">Ready to manage your venues?</h2>
          <p className="text-xl text-gray-500 mb-10 max-w-2xl mx-auto">Start building beautiful event spaces with powerful management tools today — completely free.</p>
          <Link href="/register" className="bg-gradient-to-r from-teal-500 to-cyan-600 text-white px-10 py-4 rounded-sm font-bold text-lg uppercase tracking-wide shadow-xl shadow-teal-500/20 hover:shadow-teal-500/40 hover:-translate-y-1 transition-all inline-block">
            Try Now For Free
          </Link>
        </div>
      </section>

      <Footer />
    </div>
  );
}
