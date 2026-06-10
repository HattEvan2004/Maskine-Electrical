import React, { useState } from 'react';
import { motion } from 'motion/react';
import { Zap, Lightbulb, CornerDownRight, ArrowRight, Phone, Shield, Star, Clock } from 'lucide-react';

interface HeroProps {
  onScrollToSection: (id: string) => void;
}

export default function Hero({ onScrollToSection }: HeroProps) {
  const [isLightOn, setIsLightOn] = useState(true);
  const [lightingMode, setLightingMode] = useState<'vintage' | 'modern'>('modern');

  return (
    <section className="relative overflow-hidden bg-slate-950 text-white min-h-[90vh] flex items-center pt-24 pb-16 bg-grid-pattern">
      {/* Decorative background blurs */}
      <div className="absolute top-1/4 left-1/3 w-96 h-96 bg-amber-500/10 rounded-full blur-3xl -z-10 pointer-events-none"></div>
      <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-blue-500/5 rounded-full blur-3xl -z-10 pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Hero Left: Copy & Details */}
          <div className="lg:col-span-7 flex flex-col gap-6 text-left">
            <motion.div 
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="inline-flex items-center gap-2 bg-slate-900 border border-slate-800 rounded-full px-3 py-1 text-xs text-slate-400 w-fit"
            >
              <span className="flex h-2 w-2 rounded-full bg-amber-500"></span>
              <span className="font-mono tracking-wider uppercase">Halifax Regional Municipality & Surrounding Areas</span>
            </motion.div>

            <motion.h1 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="text-4xl sm:text-5xl lg:text-6xl font-display font-bold leading-[1.1] tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-white via-slate-100 to-amber-400"
            >
              Connecting <span className="text-amber-400 glow-text inline-block">POWER</span> to past, present & future spaces.
            </motion.h1>

            <motion.h2
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-lg sm:text-xl font-sans text-slate-300 font-light border-l-2 border-amber-500/50 pl-4 py-1"
            >
              "Connecting Light to Old & New Spaces"
            </motion.h2>

            <motion.p 
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="text-base text-slate-400 leading-relaxed max-w-xl"
            >
              Providing our customers with professional quality service, from upgrades to repairs and bringing their project to fruition. Licensed, commercial general-liability insured, and available 24/7 for urgent calls.
            </motion.p>

            {/* Quick CTAs */}
            <motion.div 
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 mt-4"
            >
              <button
                onClick={() => onScrollToSection('estimator')}
                className="bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold px-6 py-3.5 rounded-lg text-sm shadow-lg shadow-amber-500/20 hover:shadow-amber-500/30 transition-all flex items-center justify-center gap-2 group"
              >
                <span>Calculate Free Estimate</span>
                <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
              </button>

              <button
                onClick={() => onScrollToSection('booking')}
                className="bg-slate-900 hover:bg-slate-800 text-white font-medium px-6 py-3.5 rounded-lg text-sm border border-slate-800 transition-all flex items-center justify-center gap-2"
              >
                <span>Book Service Request</span>
              </button>

              <a
                href="tel:902-802-5306"
                className="bg-red-950/40 hover:bg-red-900/60 text-red-200 font-semibold px-6 py-3.5 rounded-lg text-sm border border-red-900/50 transition-all flex items-center justify-center gap-2"
              >
                <Phone size={15} className="animate-bounce" />
                <span>24/7 Repair Line</span>
              </a>
            </motion.div>

            {/* Badges Column */}
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.6 }}
              className="grid grid-cols-3 gap-4 border-t border-slate-900 pt-7 mt-3 text-slate-400"
            >
              <div className="flex flex-col text-left">
                <span className="font-display font-bold text-white text-lg sm:text-2xl flex items-center gap-1">
                  100%
                </span>
                <span className="text-xs text-slate-500 font-sans">Licensed & Bonded</span>
              </div>
              <div className="flex flex-col text-left">
                <span className="font-display font-bold text-white text-lg sm:text-2xl flex items-center gap-1">
                  24/7
                </span>
                <span className="text-xs text-slate-500 font-sans">HRM Emergency Dispatch</span>
              </div>
              <div className="flex flex-col text-left">
                <span className="font-display font-bold text-white text-lg sm:text-2xl flex items-center gap-1">
                  5.0 <Star size={14} className="fill-amber-500 text-amber-500 inline inline-block pb-0.5" />
                </span>
                <span className="text-xs text-slate-500 font-sans">Google Rated Service</span>
              </div>
            </motion.div>
          </div>

          {/* Hero Right: Interactive Workspace / Lighting Connection Simulator */}
          <div className="lg:col-span-5 w-full flex justify-center items-center">
            <motion.div 
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.7 }}
              className="w-full max-w-sm bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-2xl relative"
            >
              <span className="absolute top-4 right-4 text-[10px] font-mono tracking-widest text-slate-500 uppercase flex items-center gap-1.5">
                <span className={`inline-block w-2 h-2 rounded-full ${isLightOn ? 'bg-amber-400 animate-pulse' : 'bg-slate-700'}`}></span>
                {isLightOn ? 'Power Connected' : 'Power Isolated'}
              </span>

              <h4 className="font-display font-bold text-white text-base tracking-tight mb-2 flex items-center gap-2">
                <Lightbulb size={18} className="text-amber-400" />
                Light & Space Simulator
              </h4>
              <p className="text-xs text-slate-400 mb-6 leading-relaxed">
                Interactively view how MaskinE Electric connects past and future electrical environments. Toggle the power switch and modes!
              </p>

              {/* Room visual frame */}
              <div 
                className={`relative h-48 rounded-xl border border-slate-800 transition-all duration-500 overflow-hidden ${
                  isLightOn 
                    ? lightingMode === 'modern'
                      ? 'bg-slate-900 border-amber-500/30'
                      : 'bg-amber-950/10 border-amber-600/20'
                    : 'bg-slate-950'
                }`}
              >
                {/* Glowing light rays */}
                {isLightOn && (
                  <div className={`absolute top-0 left-1/2 -translate-x-1/2 w-48 h-40 rounded-full blur-2xl transition-all duration-300 ${
                    lightingMode === 'modern' ? 'bg-amber-400/25' : 'bg-amber-500/15'
                  }`}></div>
                )}

                {/* Simulated Ceiling Cable with hanging Edison / LED light bulb */}
                <div className="absolute top-0 left-1/2 -translate-x-1/2 flex flex-col items-center">
                  <div className="w-1 h-14 bg-slate-700"></div>
                  {/* Socket */}
                  <div className="w-4 h-6 bg-slate-800 rounded-sm"></div>
                  {/* Glowing Bulb */}
                  <div 
                    onClick={() => setIsLightOn(!isLightOn)}
                    className={`w-10 h-10 rounded-full cursor-pointer transition-all duration-300 flex items-center justify-center relative -mt-0.5 ${
                      isLightOn
                        ? lightingMode === 'modern'
                          ? 'bg-amber-400 shadow-lg shadow-amber-400/50 hover:scale-105'
                          : 'bg-amber-500 shadow-md shadow-amber-500/40 hover:scale-105'
                        : 'bg-slate-800 border-2 border-slate-700 hover:bg-slate-700'
                    }`}
                  >
                    <Zap size={15} className={`transition-all duration-300 ${isLightOn ? 'text-slate-950 fill-slate-950 scale-100' : 'text-slate-400 scale-90'}`} />
                  </div>
                </div>

                {/* Room content overlays */}
                <div className="absolute bottom-3 left-4 right-4 flex justify-between items-end">
                  {/* Older Space description */}
                  <div className="flex flex-col">
                    <span className="text-[9px] uppercase font-mono tracking-widest text-slate-500">Active Circuit</span>
                    <span className="text-xs font-semibold text-slate-300">
                      {lightingMode === 'modern' ? 'Future space (200A modern)' : 'Classic Halifax Home (60/100A fuses)'}
                    </span>
                  </div>
                  {/* Status Indicator text */}
                  <span className={`text-[10px] font-mono px-1.5 py-0.5 rounded ${
                    isLightOn 
                      ? lightingMode === 'modern'
                        ? 'bg-amber-500/10 text-amber-400 border border-amber-500/20'
                        : 'bg-amber-600/10 text-amber-500 border border-amber-600/20'
                      : 'bg-slate-900 text-slate-500 border border-slate-800'
                  }`}>
                    {isLightOn ? 'LIGHT UP' : 'OFF'}
                  </span>
                </div>

                {/* Animated wiring loops */}
                {isLightOn && (
                  <div className="absolute inset-0 pointer-events-none opacity-30 flex items-center justify-center">
                    <div className="w-[85%] h-[85%] rounded-lg border-dashed border border-amber-500/40 animate-[spin_50s_linear_infinite]"></div>
                  </div>
                )}
              </div>

              {/* Controls inside card */}
              <div className="mt-5 grid grid-cols-2 gap-2">
                <button
                  onClick={() => setIsLightOn(!isLightOn)}
                  className={`py-2 px-3 rounded-lg text-xs font-medium font-mono text-center border transition-all ${
                    isLightOn 
                      ? 'bg-slate-950 text-slate-300 border-slate-800 hover:text-white' 
                      : 'bg-amber-500 text-slate-950 border-amber-400 font-bold hover:bg-amber-400'
                  }`}
                >
                  {isLightOn ? '💡 Flip OFF' : '💡 Connect Power'}
                </button>
                <div className="flex rounded-lg bg-slate-950 p-1 border border-slate-800">
                  <button
                    disabled={!isLightOn}
                    onClick={() => setLightingMode('vintage')}
                    className={`flex-1 py-1 text-[10px] font-medium rounded transition-all ${
                      !isLightOn ? 'opacity-30 cursor-not-allowed' : ''
                    } ${
                      isLightOn && lightingMode === 'vintage' 
                        ? 'bg-amber-500/10 text-amber-400 font-bold' 
                        : 'text-slate-500 hover:text-slate-300'
                    }`}
                  >
                    Classic
                  </button>
                  <button
                    disabled={!isLightOn}
                    onClick={() => setLightingMode('modern')}
                    className={`flex-1 py-1 text-[10px] font-medium rounded transition-all ${
                      !isLightOn ? 'opacity-30 cursor-not-allowed' : ''
                    } ${
                      isLightOn && lightingMode === 'modern' 
                        ? 'bg-amber-500 text-amber-400 font-bold' 
                        : 'text-slate-500 hover:text-slate-300'
                    }`}
                  >
                    Modern
                  </button>
                </div>
              </div>

              {/* Quick credentials footer */}
              <div className="mt-5 pt-4 border-t border-slate-800 flex items-center gap-3">
                <div className="h-7 w-7 rounded bg-amber-500/10 border border-amber-500/20 flex items-center justify-center text-amber-400">
                  <Shield size={14} />
                </div>
                <span className="text-[10px] font-sans text-slate-400 leading-tight">
                  Qualified electrical crew. Fully complaint with Nova Scotia Power inspection codes.
                </span>
              </div>
            </motion.div>
          </div>

        </div>
      </div>
    </section>
  );
}
