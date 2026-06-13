import React, { useState, useEffect } from 'react';
import { urlFor } from '../sanity/image';
import { Phone, Mail, MapPin, Zap, Menu, X, Star } from 'lucide-react';
import { useSiteContent } from '../sanity/useSiteContent';

interface HeaderProps {
  onNavigate: (sectionId: string) => void;
  activeSection: string;
}

export default function Header({ onNavigate, activeSection }: HeaderProps) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const site = useSiteContent();
  const phones = site?.phones?.length ? site.phones : [{ label: 'Anthony', number: '902-802-5306' }, { label: 'Mich', number: '902-830-5921' }];
  const email = site?.email || 'maskine.electric@gmail.com';
  const address = site?.address || '136 Brook Street, Halifax, NS B3N 2A8';
  const logoSizeMap = { Small: 'h-16 w-16', Medium: 'h-24 w-24', Large: 'h-36 w-36' };
  const logoClass = logoSizeMap[site?.logoSize] || logoSizeMap.Medium;
  const logoUrl = '/logo.png';

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 40);
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

  const handleItemClick = (id: string) => { onNavigate(id); setIsMobileMenuOpen(false); };

  return (
    <header className="w-full z-50 transition-all duration-300">
      <div className="bg-amber-500 text-slate-950 font-sans text-xs sm:text-sm py-2 px-4 flex flex-wrap justify-between items-center gap-2 font-semibold border-b border-amber-400 relative z-50">
        <div className="flex items-center gap-2">
          <span className="uppercase text-[10px] bg-slate-950 text-amber-400 px-1.5 py-0.5 rounded tracking-wide font-mono">24/7 Emergency</span>
          <span className="font-display tracking-tight text-slate-900">Available 24 Hours a Day, 7 days a week for HRM</span>
        </div>
        <div className="flex flex-wrap items-center gap-x-5 gap-y-1">
          {phones.map((p, i) => (
            <a key={i} href={`tel:${p.number}`} className="flex items-center gap-1.5 hover:underline text-slate-950">
              <Phone size={13} />
              <span>{p.label}: <strong className="font-bold">{p.number}</strong></span>
            </a>
          ))}
        </div>
      </div>

      <div className={`w-full transition-all duration-300 border-b ${isScrolled ? 'bg-slate-950/95 backdrop-blur-md py-3 shadow-lg border-slate-800 sticky top-0' : 'bg-slate-950/80 backdrop-blur-sm py-5 border-slate-900'}`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2.5 cursor-pointer group" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>
              <div className={`${logoClass} overflow-hidden flex items-center justify-center`}>
                <img src={logoUrl} alt="MaskinE Electric Ltd. Logo" className="w-full h-full object-cover" />
              </div>
              <div className="flex flex-col">
                <span className="font-display font-bold text-xl tracking-tight text-white flex items-center gap-1">Maskin<span className="text-amber-500">E</span> Electric</span>
                <span className="text-[10px] text-slate-400 tracking-wider font-sans font-medium uppercase">Connecting power & light</span>
              </div>
            </div>

            <nav className="hidden md:flex items-center gap-1 lg:gap-2">
              {navItems.map((item) => (
                <button key={item.id} onClick={() => handleItemClick(item.id)} className={`px-3 py-1.5 text-sm font-medium rounded-md transition-all ${activeSection === item.id ? 'text-amber-500 bg-slate-900' : 'text-slate-300 hover:text-white hover:bg-slate-900/50'}`}>{item.label}</button>
              ))}
            </nav>

            <div className="hidden lg:flex items-center gap-4">
              <a href={`mailto:${email}`} className="text-slate-400 hover:text-white text-xs flex items-center gap-1.5 transition-colors">
                <Mail size={14} className="text-amber-500" />
                <span>{email}</span>
              </a>
              <button onClick={() => handleItemClick('booking')} className="bg-amber-500 hover:bg-amber-400 text-slate-950 text-xs font-bold py-2 px-4 rounded-md shadow-md transition-all">Book An Appointment</button>
            </div>

            <div className="flex md:hidden items-center gap-3">
              <a href={`tel:${phones[0].number}`} className="p-2 rounded-md bg-amber-500 text-slate-950 hover:bg-amber-400">
                <Phone size={18} />
              </a>
              <button onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)} className="p-2 rounded-md text-slate-400 hover:text-white hover:bg-slate-950 focus:outline-none">
                {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
              </button>
            </div>
          </div>
        </div>
      </div>

      {isMobileMenuOpen && (
        <div className="md:hidden fixed inset-0 z-40 bg-slate-950/98 backdrop-blur-lg flex flex-col justify-start pt-28 px-6">
          <div className="flex flex-col gap-5">
            {navItems.map((item) => (
              <button key={item.id} onClick={() => handleItemClick(item.id)} className={`text-left font-display text-2xl font-semibold tracking-tight py-1 ${activeSection === item.id ? 'text-amber-400' : 'text-slate-300 hover:text-white'}`}>{item.label}</button>
            ))}
            <div className="mt-8 pt-8 border-t border-slate-900 flex flex-col gap-4">
              {phones.map((p, i) => (
                <a key={i} href={`tel:${p.number}`} className="flex items-center gap-3 text-slate-300 text-lg hover:text-white">
                  <Phone size={18} className="text-amber-500" />
                  <span>{p.label}: {p.number}</span>
                </a>
              ))}
              <a href={`mailto:${email}`} className="flex items-center gap-3 text-slate-300 text-lg hover:text-white">
                <Mail size={18} className="text-amber-500" />
                <span>{email}</span>
              </a>
              <div className="flex items-center gap-3 text-slate-400 text-sm">
                <MapPin size={18} className="text-amber-500" />
                <span>{address}</span>
              </div>
            </div>
            <button onClick={() => handleItemClick('booking')} className="mt-6 w-full text-center bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold py-3 px-4 rounded-lg shadow-md">Book Consultation Now</button>
          </div>
        </div>
      )}
    </header>
  );
}
