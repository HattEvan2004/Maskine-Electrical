import React, { useState } from 'react';
import { motion } from 'motion/react';
import { Zap, Lightbulb, ArrowRight, Phone, Shield, Star } from 'lucide-react';
import { useSiteContent } from '../sanity/useSiteContent';

interface HeroProps {
  onScrollToSection: (id: string) => void;
}

export default function Hero({ onScrollToSection }: HeroProps) {
  const [isLightOn, setIsLightOn] = useState(true);
  const [lightingMode, setLightingMode] = useState<'vintage' | 'modern'>('modern');
  const site = useSiteContent();
  const headline = site?.heroHeadline || 'Connecting POWER to past, present & future spaces.';
  const subtitle = site?.heroSubtitle || 'Connecting Light to Old & New Spaces';
  const description = site?.heroDescription || 'Providing our customers with professional quality service, from upgrades to repairs and bringing their project to fruition. Licensed, commercial general-liability insured, and available 24/7 for urgent calls.';
  const emergencyPhone = site?.phones?.[0]?.number || '902-802-5306';

  return (
    <section className="relative overflow-hidden bg-slate-950 text-white min-h-[90vh] flex items-center pt-24 pb-16 bg-grid-pattern">
      <div className="absolute top-1/4 left-1/3 w-96 h-96 bg-amber-500/10 rounded-full blur-3xl -z-10 pointer-events-none"></div>
      <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-blue-500/5 rounded-full blur-3xl -z-10 pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">

          <div className="lg:col-span-7 flex flex-col gap-6 text-left">
            <motion.div initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }} className="inline-flex items-center gap-2 bg-slate-900 border border-slate-800 rounded-full px-3 py-1 text-xs text-slate-400 w-fit">
              <span className="flex h-2 w-2 rounded-full bg-amber-500"></span>
              <span className="font-mono tracking-wider uppercase">Halifax Regional Municipality & Surrounding Areas</span>
            </motion.div>

            <motion.h1 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.1 }} className="text-4xl sm:text-5xl lg:text-6xl font-display font-bold leading-[1.1] tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-white via-slate-100 to-amber-400">
              {headline}
            </motion.h1>

            <motion.h2 initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.2 }} className="text-lg sm:text-xl font-sans text-slate-300 font-light border-l-2 border-amber-500/50 pl-4 py-1">
              "{subtitle}"
            </motion.h2>

            <motion.p initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.3 }} className="text-base text-slate-400 leading-relaxed max-w-xl">
              {description}
            </motion.p>

            <motion.div initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.4 }} className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 mt-4">
              <button onClick={() => onScrollToSection('estimator')} className="bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold px-6 py-3.5 rounded-lg text-sm shadow-lg transition-all flex items-center justify-center gap-2 group">
                <span>Calculate Free Estimate</span>
                <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
              </button>
              <button onClick={() => onScrollToSection('booking')} className="bg-slate-900 hover:bg-slate-800 text-white font-medium px-6 py-3.5 rounded-lg text-sm border border-slate-800 transition-all flex items-center justify-center gap-2">
                <span>Book Service Request</span>
              </button>
              <a href={`tel:${emergencyPhone}`} className="bg-red-950/40 hover:bg-red-900/60 text-red-200 font-semibold px-6 py-3.5 rounded-lg text-sm border border-red-900/50 transition-all flex items-center justify-center gap-2">
                <Phone size={15} className="animate-bounce" />
                <span>24/7 Repair Line</span>
              </a>
            </motion.div>

            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.6 }} className="grid grid-cols-3 gap-4 border-t border-slate-900 pt-7 mt-3 text-slate-400">
              <div className="flex flex-col text-left">
                <span className="font-display font-bold text-white text-lg sm:text-2xl">100%</span>
                <span className="text-xs text-slate-500 font-sans">Licensed & Bonded</span>
              </div>
              <div className="flex flex-col text-left">
                <span className="font-display font-bold text-white text-lg sm:text-2xl">24/7</span>
                <span className="text-xs text-slate-500 font-sans">HRM Emergency Dispatch</span>
              </div>
              <div className="flex flex-col text-left">
                <span className="font-display font-bold text-white text-lg sm:text-2xl flex items-center gap-1">5.0 <Star size={14} className="fill-amber-500 text-amber-500" /></span>
                <span className="text-xs text-slate-500 font-sans">Google Rated Service</span>
              </div>
            </motion.div>
          </div>

          <div className="lg:col-span-5 w-full flex justify-center items-center">
            <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.7 }} className="w-full max-w-sm rounded-2xl overflow-hidden border border-slate-800 shadow-2xl">
              <img src="/hero.jpg" alt="MaskinE Electric electrician at work" className="w-full h-auto object-cover" />
            </motion.div>
          </div>

        </div>
      </div>
    </section>
  );
}
