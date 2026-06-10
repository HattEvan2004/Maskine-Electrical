import React from 'react';
import { Phone, Mail, MapPin, Zap, Instagram, Facebook, ArrowUp, Calendar } from 'lucide-react';

interface FooterProps {
  onNavigate: (sectionId: string) => void;
}

export default function Footer({ onNavigate }: FooterProps) {
  const currentYear = new Date().getFullYear();

  const handleScrollTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-slate-950 text-slate-400 border-t border-slate-900 pt-16 pb-8 font-sans">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Upper footer grid */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-10 mb-12 text-left">
          
          {/* Column 1: Brand & Slogans */}
          <div className="md:col-span-5 flex flex-col gap-4">
            <div className="flex items-center gap-2.5">
              <div className="h-10 w-10 md:h-12 md:w-12 rounded overflow-hidden flex items-center justify-center bg-slate-950 border border-slate-800 shadow-md">
                <img 
                  src="https://maskineelectric.ca/wp-content/uploads/2022/09/maskine-social-01.jpeg" 
                  alt="MaskinE Electric Logo" 
                  className="w-full h-full object-cover"
                  onError={(e) => {
                    const target = e.target as HTMLImageElement;
                    target.style.display = 'none';
                    target.nextElementSibling?.classList.remove('hidden');
                  }}
                />
                <div className="hidden h-full w-full bg-amber-500 items-center justify-center text-slate-950">
                  <Zap size={18} className="fill-slate-950" />
                </div>
              </div>
              <span className="font-display font-bold text-lg text-white tracking-tight">
                Maskin<span className="text-amber-500">E</span> Electric Ltd.
              </span>
            </div>
            
            <p className="text-xs sm:text-sm text-slate-300 max-w-sm leading-relaxed font-light">
              "Connecting POWER to past, present & future spaces." <br />
              "Connecting Light to Old & New Spaces."
            </p>

            <p className="text-xs text-slate-550 max-w-xs leading-relaxed">
              Serving the Halifax Regional Municipality (HRM) with professional electrical installations, repairs, and responsive support. Available 24 Hours a day, 7 days a week!
            </p>

            {/* Social Links */}
            <div className="flex items-center gap-3.5 mt-2">
              <a
                href="https://www.instagram.com/maskine.electric/?igshid=NTlmMWMyMzg%3D"
                target="_blank"
                rel="noopener noreferrer"
                className="h-8 w-8 bg-slate-900 hover:bg-slate-800 text-amber-500 rounded-lg flex items-center justify-center transition-colors border border-slate-800 hover:border-slate-700"
                title="Instagram Profile"
              >
                <Instagram size={16} />
              </a>
              <a
                href="https://m.facebook.com/profile.php?id=100084234099043"
                target="_blank"
                rel="noopener noreferrer"
                className="h-8 w-8 bg-slate-900 hover:bg-slate-800 text-amber-500 rounded-lg flex items-center justify-center transition-colors border border-slate-800 hover:border-slate-700"
                title="Facebook Page"
              >
                <Facebook size={16} />
              </a>
            </div>
          </div>

          {/* Column 2: Navigation Links */}
          <div className="md:col-span-3">
            <h4 className="text-xs font-mono font-bold uppercase text-white tracking-widest mb-4">
              Our Showcase
            </h4>
            <div className="flex flex-col gap-3 text-xs sm:text-sm">
              <button 
                onClick={() => onNavigate('services')} 
                className="hover:text-amber-400 text-left transition-colors cursor-pointer w-fit"
              >
                Electrical Services
              </button>
              <button 
                onClick={() => onNavigate('estimator')} 
                className="hover:text-amber-400 text-left transition-colors cursor-pointer w-fit"
              >
                Cost Calculator
              </button>
              <button 
                onClick={() => onNavigate('area-checker')} 
                className="hover:text-amber-400 text-left transition-colors cursor-pointer w-fit"
              >
                HRM Service Areas
              </button>
              <button 
                onClick={() => onNavigate('safety')} 
                className="hover:text-amber-400 text-left transition-colors cursor-pointer w-fit"
              >
                Reviews & Safety Tips
              </button>
              <button 
                onClick={() => onNavigate('booking')} 
                className="hover:text-amber-400 text-left transition-colors cursor-pointer w-fit"
              >
                Appointment Dispatch
              </button>
            </div>
          </div>

          {/* Column 3: Contact & Address */}
          <div className="md:col-span-4 flex flex-col gap-4">
            <h4 className="text-xs font-mono font-bold uppercase text-white tracking-widest">
              Direct Office
            </h4>
            
            <div className="flex flex-col gap-3 text-xs sm:text-sm">
              <div className="flex items-start gap-2.5">
                <MapPin size={16} className="text-amber-500 shrink-0 mt-0.5" />
                <span className="text-slate-300">
                  136 Brook Street<br />
                  Halifax, NS B3N 2A8
                </span>
              </div>

              <div className="flex items-start gap-2.5">
                <Mail size={16} className="text-amber-500 shrink-0 mt-0.5" />
                <a 
                  href="mailto:maskine.electric@gmail.com" 
                  className="text-slate-300 hover:text-amber-400 transition-colors break-all"
                >
                  maskine.electric@gmail.com
                </a>
              </div>

              <div className="flex items-start gap-2.5 border-t border-slate-900 pt-3">
                <Phone size={16} className="text-amber-500 shrink-0 mt-1" />
                <div className="flex flex-col text-slate-300 font-sans">
                  <a href="tel:902-802-5306" className="hover:text-amber-500 transition-colors">
                    Anthony: <strong>902-802-5306</strong>
                  </a>
                  <a href="tel:902-830-5921" className="hover:text-amber-500 transition-colors mt-1">
                    Mich: <strong>902-830-5921</strong>
                  </a>
                </div>
              </div>
            </div>
          </div>

        </div>

        {/* Bottom copyright segment */}
        <div className="border-t border-slate-900 pt-8 flex flex-col sm:flex-row justify-between items-center gap-4">
          <p className="text-xs text-slate-600 text-center sm:text-left">
            © {currentYear} MaskinE Electric Ltd. All rights reserved. Registered in Nova Scotia (HRM).
          </p>
          
          <div className="flex items-center gap-4">
            <span className="text-[10px] font-mono text-slate-600 uppercase">
              Connecting power & light safely
            </span>
            <button
              onClick={handleScrollTop}
              className="h-8 w-8 rounded-lg bg-slate-900 border border-slate-800 hover:bg-slate-800 text-slate-400 hover:text-white flex items-center justify-center transition-all cursor-pointer shadow"
              title="Scroll to Top"
            >
              <ArrowUp size={14} />
            </button>
          </div>
        </div>

      </div>
    </footer>
  );
}
