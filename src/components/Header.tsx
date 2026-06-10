import React, { useState, useEffect } from 'react';
import { Phone, Mail, MapPin, Zap, Clock, Menu, X, Globe, Star } from 'lucide-react';

interface HeaderProps {
  onNavigate: (sectionId: string) => void;
  activeSection: string;
}

export default function Header({ onNavigate, activeSection }: HeaderProps) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 40);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navItems = [
    { id: 'services', label: 'Our Services' },
    { id: 'estimator', label: 'Price Estimator' },
    { id: 'area-checker', label: 'Service Areas' },
    { id: 'safety', label: 'Safety Tips' },
    { id: 'booking', label: 'Book Online' },
  ];

  const handleItemClick = (id: string) => {
    onNavigate(id);
    setIsMobileMenuOpen(false);
  };

  return (
    <header className="w-full z-50 transition-all duration-300">
      {/* 24/7 Urgent Banner */}
      <div className="bg-amber-500 text-slate-950 font-sans text-xs sm:text-sm py-2 px-4 flex flex-wrap justify-between items-center gap-2 font-semibold border-b border-amber-400 relative z-50">
        <div className="flex items-center gap-2">
          <span className="inline-flex h-2.5 w-2.5 relative">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-600 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-red-600"></span>
          </span>
          <span className="uppercase text-[10px] bg-slate-950 text-amber-400 px-1.5 py-0.5 rounded tracking-wide font-mono">
            24/7 Emergency
          </span>
          <span className="font-display tracking-tight text-slate-900">
            Available 24 Hours a Day, 7 days a week for HRM
          </span>
        </div>
        <div className="flex flex-wrap items-center gap-x-5 gap-y-1">
          <a href="tel:902-802-5306" className="flex items-center gap-1.5 hover:underline text-slate-950">
            <Phone size={13} className="text-slate-950 font-bold" />
            <span>Anthony: <strong className="font-bold">902-802-5306</strong></span>
          </a>
          <span className="hidden md:inline text-amber-800">|</span>
          <a href="tel:902-830-5921" className="flex items-center gap-1.5 hover:underline text-slate-950">
            <Phone size={13} className="text-slate-950 font-bold" />
            <span>Mich: <strong className="font-bold">902-830-5921</strong></span>
          </a>
        </div>
      </div>

      {/* Main Bar */}
      <div 
        className={`w-full transition-all duration-300 border-b ${
          isScrolled 
            ? 'bg-slate-950/95 backdrop-blur-md py-3 shadow-lg border-slate-800 sticky top-0' 
            : 'bg-slate-950/80 backdrop-blur-sm py-5 border-slate-900'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between">
            {/* Logo */}
            <div 
              className="flex items-center gap-2.5 cursor-pointer group"
              onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            >
              <div className="h-10 w-10 md:h-12 md:w-12 rounded overflow-hidden flex items-center justify-center bg-slate-950 border border-slate-800 shadow-lg shadow-amber-500/10 group-hover:scale-105 transition-transform">
                <img 
                  src="https://maskineelectric.ca/wp-content/uploads/2022/09/maskine-social-01.jpeg" 
                  alt="MaskinE Electric Ltd. Logo" 
                  className="w-full h-full object-cover"
                  onError={(e) => {
                    const target = e.target as HTMLImageElement;
                    target.style.display = 'none';
                    target.nextElementSibling?.classList.remove('hidden');
                  }}
                />
                <div className="hidden h-full w-full bg-amber-500 items-center justify-center text-slate-950">
                  <Zap size={22} className="fill-slate-950 text-slate-950 animate-pulse" />
                </div>
              </div>
              <div className="flex flex-col">
                <span className="font-display font-bold text-xl tracking-tight text-white flex items-center gap-1">
                  Maskin<span className="text-amber-500">E</span> Electric
                  <span className="text-xs font-medium text-slate-400 font-mono tracking-normal bg-slate-900 border border-slate-800 px-1 py-0.2 rounded">LTD.</span>
                </span>
                <span className="text-[10px] text-slate-400 tracking-wider font-sans font-medium uppercase">
                  Connecting power & light
                </span>
              </div>
            </div>

            {/* Desktop Navigation */}
            <nav className="hidden md:flex items-center gap-1 lg:gap-2">
              {navItems.map((item) => (
                <button
                  key={item.id}
                  onClick={() => handleItemClick(item.id)}
                  className={`px-3 py-1.5 text-sm font-medium rounded-md transition-all ${
                    activeSection === item.id
                      ? 'text-amber-500 bg-slate-900'
                      : 'text-slate-300 hover:text-white hover:bg-slate-900/50'
                  }`}
                >
                  {item.label}
                </button>
              ))}
            </nav>

            {/* Contact Quick Action */}
            <div className="hidden lg:flex items-center gap-4">
              <a 
                href="mailto:maskine.electric@gmail.com" 
                className="text-slate-400 hover:text-white text-xs flex items-center gap-1.5 transition-colors"
              >
                <Mail size={14} className="text-amber-500" />
                <span>maskine.electric@gmail.com</span>
              </a>
              <button 
                onClick={() => handleItemClick('booking')}
                className="bg-amber-500 hover:bg-amber-400 text-slate-950 text-xs font-bold py-2 px-4 rounded-md shadow-md hover:shadow-amber-500/10 transition-all transform hover:-translate-y-0.5 active:translate-y-0"
              >
                Book An Appointment
              </button>
            </div>

            {/* Mobile Menu Buttons */}
            <div className="flex md:hidden items-center gap-3">
              <a
                href="tel:902-802-5306"
                className="p-2 rounded-md bg-amber-500 text-slate-950 hover:bg-amber-400"
                title="Call Electrician"
              >
                <Phone size={18} />
              </a>
              <button
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="p-2 rounded-md text-slate-400 hover:text-white hover:bg-slate-950 focus:outline-none"
              >
                {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile Drawer Overlay */}
      {isMobileMenuOpen && (
        <div className="md:hidden fixed inset-0 z-40 bg-slate-950/98 backdrop-blur-lg flex flex-col justify-start pt-28 px-6 transition-all duration-300">
          <div className="flex flex-col gap-5">
            <span className="text-xs font-semibold text-slate-500 uppercase tracking-widest font-mono border-b border-slate-900 pb-2">
              Navigation Menu
            </span>
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => handleItemClick(item.id)}
                className={`text-left font-display text-2xl font-semibold tracking-tight py-1 transition-all ${
                  activeSection === item.id ? 'text-amber-400 pl-2 border-l-2 border-amber-400' : 'text-slate-300 hover:text-white'
                }`}
              >
                {item.label}
              </button>
            ))}
            <div className="mt-8 pt-8 border-t border-slate-900 flex flex-col gap-4">
              <span className="text-xs font-semibold text-slate-500 uppercase tracking-widest font-mono">
                Direct Contacts & Support
              </span>
              <div className="flex flex-col gap-3 font-medium">
                <a href="tel:902-802-5306" className="flex items-center gap-3 text-slate-300 text-lg hover:text-white">
                  <Phone size={18} className="text-amber-500" />
                  <span>Anthony: 902-802-5306</span>
                </a>
                <a href="tel:902-830-5921" className="flex items-center gap-3 text-slate-300 text-lg hover:text-white">
                  <Phone size={18} className="text-amber-500" />
                  <span>Mich: 902-830-5921</span>
                </a>
                <a href="mailto:maskine.electric@gmail.com" className="flex items-center gap-3 text-slate-300 text-lg hover:text-white">
                  <Mail size={18} className="text-amber-500" />
                  <span>maskine.electric@gmail.com</span>
                </a>
                <div className="flex items-center gap-3 text-slate-400 text-sm">
                  <MapPin size={18} className="text-amber-500" />
                  <span>136 Brook Street, Halifax, NS B3N 2A8</span>
                </div>
              </div>
            </div>
            
            <button
              onClick={() => handleItemClick('booking')}
              className="mt-6 w-full text-center bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold py-3 px-4 rounded-lg shadow-md transition-all"
            >
              Book Consultation Now
            </button>
          </div>
        </div>
      )}
    </header>
  );
}
