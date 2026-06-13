import React from 'react';
import { Phone, Mail, MapPin, Zap, Instagram, Facebook, ArrowUp } from 'lucide-react';
import { useSiteContent } from '../sanity/useSiteContent';

interface FooterProps {
  onNavigate: (sectionId: string) => void;
}

export default function Footer({ onNavigate }: FooterProps) {
  const currentYear = new Date().getFullYear();
  const site = useSiteContent();
  const phones = site?.phones?.length ? site.phones : [{ label: 'Anthony', number: '902-802-5306' }, { label: 'Mich', number: '902-830-5921' }];
  const email = site?.email || 'maskine.electric@gmail.com';
  const address = site?.address || '136 Brook Street, Halifax, NS B3N 2A8';
  const instagramUrl = site?.instagramUrl || 'https://www.instagram.com/maskine.electric/';
  const facebookUrl = site?.facebookUrl || 'https://m.facebook.com/profile.php?id=100084234099043';
  const blurb = site?.footerBlurb || 'Serving the Halifax Regional Municipality (HRM) with professional electrical installations, repairs, and responsive support. Available 24 Hours a day, 7 days a week!';
  const businessName = site?.businessName || 'MaskinE Electric Ltd.';
  const copyrightSuffix = site?.copyrightSuffix || 'Registered in Nova Scotia (HRM).';

  const handleScrollTop = () => window.scrollTo({ top: 0, behavior: 'smooth' });

  const socials = [
    { url: instagramUrl, Icon: Instagram, label: 'Instagram Profile' },
    { url: facebookUrl, Icon: Facebook, label: 'Facebook Page' },
  ];

  const navLinks = [
    { id: 'services', label: 'Electrical Services' },
    { id: 'estimator', label: 'Cost Calculator' },
    { id: 'area-checker', label: 'HRM Service Areas' },
    { id: 'safety', label: 'Reviews & Safety Tips' },
    { id: 'booking', label: 'Appointment Dispatch' },
  ];

  return (
    <footer className="bg-slate-950 text-slate-400 border-t border-slate-900 pt-16 pb-8 font-sans">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-10 mb-12 text-left">

          <div className="md:col-span-5 flex flex-col gap-4">
            <div className="flex items-center gap-2.5">
              <div className="h-12 w-12 overflow-hidden flex items-center justify-center">
                <img src="/logo.png" alt="MaskinE Electric Logo" className="w-full h-full object-cover" />
              </div>
              <span className="font-display font-bold text-lg text-white tracking-tight">Maskine Electric Ltd.</span>
            </div>
            <p className="text-xs sm:text-sm text-slate-300 max-w-sm leading-relaxed font-light">"Connecting POWER to past, present & future spaces." <br />"Connecting Light to Old & New Spaces."</p>
            <p className="text-xs text-slate-500 max-w-xs leading-relaxed">{blurb}</p>
            <div className="flex items-center gap-3.5 mt-2">
              {socials.map((s, i) => (
                <a key={i} href={s.url} target="_blank" rel="noopener noreferrer" title={s.label} className="h-8 w-8 bg-slate-900 hover:bg-slate-800 text-amber-500 rounded-lg flex items-center justify-center transition-colors border border-slate-800 hover:border-slate-700">
                  <s.Icon size={16} />
                </a>
              ))}
            </div>
          </div>

          <div className="md:col-span-3">
            <h4 className="text-xs font-mono font-bold uppercase text-white tracking-widest mb-4">Our Showcase</h4>
            <div className="flex flex-col gap-3 text-xs sm:text-sm">
              {navLinks.map((l) => (
                <button key={l.id} onClick={() => onNavigate(l.id)} className="hover:text-amber-400 text-left transition-colors cursor-pointer w-fit">{l.label}</button>
              ))}
            </div>
          </div>

          <div className="md:col-span-4 flex flex-col gap-4">
            <h4 className="text-xs font-mono font-bold uppercase text-white tracking-widest">Direct Office</h4>
            <div className="flex flex-col gap-3 text-xs sm:text-sm">
              <div className="flex items-start gap-2.5">
                <MapPin size={16} className="text-amber-500 shrink-0 mt-0.5" />
                <span className="text-slate-300">{address}</span>
              </div>
              <div className="flex items-start gap-2.5">
                <Mail size={16} className="text-amber-500 shrink-0 mt-0.5" />
                <a href={`mailto:${email}`} className="text-slate-300 hover:text-amber-400 transition-colors break-all">{email}</a>
              </div>
              <div className="flex items-start gap-2.5 border-t border-slate-900 pt-3">
                <Phone size={16} className="text-amber-500 shrink-0 mt-1" />
                <div className="flex flex-col text-slate-300 font-sans">
                  {phones.map((p, i) => (
                    <a key={i} href={`tel:${p.number}`} className="hover:text-amber-500 transition-colors mt-1">{p.label}: <strong>{p.number}</strong></a>
                  ))}
                </div>
              </div>
            </div>
          </div>

        </div>

        <div className="border-t border-slate-900 pt-8 flex flex-col sm:flex-row justify-between items-center gap-4">
          <p className="text-xs text-slate-600 text-center sm:text-left">© {currentYear} {businessName} All rights reserved. {copyrightSuffix}</p>
          <div className="flex items-center gap-4">
            <span className="text-[10px] font-mono text-slate-600 uppercase">Connecting power & light safely</span>
            <button onClick={handleScrollTop} title="Scroll to Top" className="h-8 w-8 rounded-lg bg-slate-900 border border-slate-800 hover:bg-slate-800 text-slate-400 hover:text-white flex items-center justify-center transition-all cursor-pointer shadow">
              <ArrowUp size={14} />
            </button>
          </div>
        </div>

      </div>
    </footer>
  );
}
