import React, { useState, useEffect, useRef } from 'react';
import { SERVICES_DATA } from '../data';
import { Service } from '../types';
import { client } from '../sanity/client';
import { Zap, Plug, AlertTriangle, Home, Briefcase, Lightbulb, ShieldAlert, ShieldCheck, ChevronRight, CheckCircle2 } from 'lucide-react';

interface ServicesPanelProps {
  onScrollToEstimator: () => void;
  onScrollToBooking: (serviceName?: string) => void;
}

export default function ServicesPanel({ onScrollToEstimator, onScrollToBooking }: ServicesPanelProps) {
  const [activeCategory, setActiveCategory] = useState<'all' | 'residential' | 'commercial' | 'emergency'>('all');
  const [services, setServices] = useState<Service[]>(SERVICES_DATA);
  const [selectedService, setSelectedService] = useState<Service | null>(SERVICES_DATA[0]);
  const spotlightRef = useRef<HTMLDivElement>(null);
  const selectService = (service: Service) => { setSelectedService(service); if (typeof window !== 'undefined' && window.innerWidth < 1024) { setTimeout(() => spotlightRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' }), 50); } };

  useEffect(() => {
    client.fetch(`*[_type == "siteSettings"][0].services`)
      .then((res) => {
        if (res && res.length) {
          const mapped: Service[] = res.map((s: any, i: number) => ({
            id: s.title ? s.title.toLowerCase().replace(/[^a-z0-9]+/g, '-') : `service-${i}`,
            title: s.title,
            description: s.description,
            iconName: s.iconName || 'Zap',
            category: s.category || 'both',
            popular: !!s.popular,
          }));
          setServices(mapped);
          setSelectedService(mapped[0]);
        }
      })
      .catch(console.error);
  }, []);

  const renderIcon = (iconName: string, className: string = "h-6 w-6 text-amber-500") => {
    switch (iconName) {
      case 'Zap': return <Zap className={className} />;
      case 'PlugZap': return <Plug className={className} />;
      case 'AlertTriangle': return <AlertTriangle className={className} />;
      case 'Home': return <Home className={className} />;
      case 'Briefcase': return <Briefcase className={className} />;
      case 'Lightbulb': return <Lightbulb className={className} />;
      case 'ShieldAlert': return <ShieldAlert className={className} />;
      case 'ShieldCheck': return <ShieldCheck className={className} />;
      default: return <Zap className={className} />;
    }
  };

  const filteredServices = services.filter(service => {
    if (activeCategory === 'all') return true;
    if (activeCategory === 'residential') return service.category === 'residential' || service.category === 'both';
    if (activeCategory === 'commercial') return service.category === 'commercial' || service.category === 'both';
    return service.category === 'emergency';
  });

  const serviceHighlights: Record<string, string[]> = {
    'service-panel-upgrades': [
      'Removal & disposal of old dangerous electrical fuse panels',
      'Installation of premium copper bus Schneider or Siemens 200A panels',
      'Whole-home surge protection unit included at point of install',
      'Full documentation, permitting, and inspection through Nova Scotia Power'
    ],
    'ev-charger-installation': [
      'Expert evaluation of current service panel capacity',
      'Indoor/Outdoor waterproof heavy-gauge conduit pathways',
      'Configuration for Tesla Gen 3, Grizzl-E, ChargePoint, or Flo chargers',
      'Load management device install if 100A panel is at threshold'
    ],
    'troubleshooting-repairs': [
      'Comprehensive circuit health diagnostics and thermal imaging',
      'Finding the root source of mystery light flickering',
      'Detection and repair of high-hazard hot connections behind outlets',
      'Rectifying unstable neutral faults immediately'
    ],
    'renovations-additions': [
      'Placing modern dual-island GFCI plugs for kitchen safe zones',
      'Wiring to CEC (Canadian Electrical Code) standards with municipal signoff',
      'Safe removal of legacy knob-and-tube or early aluminum wiring',
      'Perfect layout coordinates with kitchen Designers and General Contractors'
    ],
    'commercial-improvements': [
      'Three-phase panel balancing and commercial service entry lines',
      'Emergency light & backup battery pack diagnostic installs',
      'Energy-saving LED retrofit options with high lumen return output',
      'Rigid conduit surface wiring for durable industrial/retail setups'
    ],
    'fixtures-smart-lighting': [
      'Modern slim pot-lights (recessed lights) layouts with warm 3000K choice',
      'Lutron Caséta wireless smart light switches installation',
      'Reinforced box supports for massive designer chandeliers',
      'Custom under-cabinet dimmable task light lines'
    ],
    '24-7-emergency-repairs': [
      'Primary breaker failure restoration and utility emergency hookup',
      'Safe disconnects following water basement floods or leak exposures',
      'Troubleshooting immediate hot wire smells or buzzing wall switches',
      'Direct dispatch of certified master electricians Anthony or Mich'
    ],
    'whole-home-surge-protection': [
      'Main-point protection module wired directly next to main breaker',
      'Clamps overvoltages up to 80,000 Amps instantly',
      'Secures expensive components: mini-split heat pumps, smart TVs, refrigerators',
      'Manufacturers multi-year primary warranty protection backing'
    ]
  };

  return (
    <section id="services" className="py-24 bg-slate-900 text-slate-100 border-t border-slate-950">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        <div className="text-center max-w-3xl mx-auto mb-8 sm:mb-16 flex flex-col items-center">
          <span className="text-xs font-mono font-bold tracking-widest text-amber-500 uppercase bg-amber-500/10 border border-amber-500/20 px-3 py-1 rounded-full mb-4">
            Expert Electrical Services
          </span>
          <h2 className="text-3xl sm:text-4xl font-display font-bold text-white tracking-tight mb-4">
            Quality craftsmanship for old & new environments.
          </h2>
          <p className="text-slate-400 text-base leading-relaxed">
            Whether upgrading an older historic Halifax duplex, adding heat pumps, installing EV charging ports, or solving power line concerns, our crew is equipped for any phase of your project.
          </p>

          <div className="flex flex-wrap gap-1.5 sm:gap-2 justify-center mt-10 sm:mt-8 bg-slate-950/80 p-1.5 rounded-xl border border-slate-800">
            {(['all', 'residential', 'commercial', 'emergency'] as const).map(category => (
              <button
                key={category}
                onClick={() => {
                  setActiveCategory(category);
                  const firstOfNew = services.find(s => {
                    if (category === 'all') return true;
                    if (category === 'residential') return s.category === 'residential' || s.category === 'both';
                    if (category === 'commercial') return s.category === 'commercial' || s.category === 'both';
                    return s.category === 'emergency';
                  });
                  if (firstOfNew) setSelectedService(firstOfNew);
                }}
                className={`px-3 py-1.5 sm:px-4 sm:py-2 text-xs sm:text-sm font-medium rounded-lg transition-all capitalize ${
                  activeCategory === category
                    ? 'bg-amber-500 text-slate-950 font-bold shadow-md shadow-amber-500/10'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                {category === 'all' ? 'All Services' : category}
              </button>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">

          <div className="col-span-1 lg:col-span-7 flex flex-col gap-3">
            <span className="text-xs font-mono text-slate-500 text-left pl-1 uppercase tracking-wider block">
              Showing {filteredServices.length} electrical solution areas:
            </span>
            <div className="grid grid-cols-2 gap-2.5 sm:gap-3">
              {filteredServices.map(service => {
                const isSelected = selectedService?.id === service.id;
                return (
                  <div
                    key={service.id}
                    onClick={() => selectService(service)}
                    className={`p-3.5 sm:p-5 rounded-xl text-left cursor-pointer transition-all border ${
                      isSelected
                        ? 'bg-gradient-to-br from-slate-950 to-slate-900 border-amber-500/50 shadow-lg'
                        : 'bg-slate-950/40 border-slate-800/80 hover:bg-slate-950 hover:border-slate-800'
                    }`}
                  >
                    <div className="flex items-start justify-between mb-3">
                      <div className={`p-2.5 rounded-lg ${
                        isSelected ? 'bg-amber-500 text-slate-950' : 'bg-slate-900 text-amber-500'
                      }`}>
                        {renderIcon(service.iconName, isSelected ? 'h-5 w-5 text-slate-950' : 'h-5 w-5 text-amber-500')}
                      </div>
                      {service.popular && (
                        <span className="text-[10px] bg-amber-500/10 text-amber-400 border border-amber-500/20 py-0.5 px-2 rounded-full font-mono font-bold uppercase">
                          Popular
                        </span>
                      )}
                    </div>
                    <h3 className={`font-display font-bold text-base mb-1 ${
                      isSelected ? 'text-amber-400' : 'text-white'
                    }`}>
                      {service.title}
                    </h3>
                    <p className="hidden sm:block text-slate-400 text-xs line-clamp-2 leading-relaxed">
                      {service.description}
                    </p>
                    <div className="hidden sm:flex items-center gap-1.5 mt-3 text-[10px] uppercase tracking-wider text-amber-500/90 font-mono font-bold">
                      <span>View details</span>
                      <ChevronRight size={12} className={`transition-transform duration-300 ${isSelected ? 'translate-x-1' : ''}`} />
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {selectedService && (
            <div className="col-span-1 lg:col-span-5 bg-slate-950 border border-slate-800 rounded-2xl p-6 lg:p-8 text-left sticky top-28 shadow-xl scroll-mt-24" ref={spotlightRef}>
              <span className="text-[11px] font-mono uppercase tracking-widest text-slate-500 block mb-2">
                Service Spotlight
              </span>

              <div className="flex items-center gap-4 mb-5">
                <div className="h-12 w-12 rounded-xl bg-amber-500 flex items-center justify-center text-slate-950 shadow-md shadow-amber-500/15">
                  {renderIcon(selectedService.iconName, 'h-6 w-6 text-slate-950')}
                </div>
                <div>
                  <h3 className="font-display font-extrabold text-white text-xl">
                    {selectedService.title}
                  </h3>
                  <span className="text-xs text-slate-500 capitalize bg-slate-900 py-0.5 px-2 rounded border border-slate-800 font-mono inline-block mt-1">
                    {selectedService.category === 'both' ? 'Residential & Commercial' : selectedService.category} Needs
                  </span>
                </div>
              </div>

              <p className="text-slate-300 text-sm leading-relaxed mb-6">
                {selectedService.description}
              </p>

              <div className="flex flex-col gap-3.5 border-t border-slate-900 pt-6 mb-7">
                <h4 className="text-xs font-mono font-bold uppercase text-slate-400 tracking-wider">
                  What is included in our workmanship:
                </h4>
                {(serviceHighlights[selectedService.id] || [
                  'Full code compliance with local inspector reports',
                  'Only commercial-grade high safety materials used',
                  'Comprehensive pre-project load safety scans',
                  'Tidy clean-up post-work'
                ]).map((highlight, index) => (
                  <div key={index} className="flex items-start gap-2.5 text-sm">
                    <CheckCircle2 size={16} className="text-amber-500 shrink-0 mt-0.5" />
                    <span className="text-slate-300">{highlight}</span>
                  </div>
                ))}
              </div>

              <div className="flex flex-col gap-2">
                <button
                  onClick={() => onScrollToBooking(selectedService.title)}
                  className="w-full bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold py-3 px-4 rounded-xl text-xs sm:text-sm shadow-md shadow-amber-500/10 hover:shadow-amber-500/20 transition-all flex items-center justify-center gap-2"
                >
                  <span>Book {selectedService.title}</span>
                </button>
                <button
                  onClick={onScrollToEstimator}
                  className="w-full bg-slate-900 hover:bg-slate-800 text-slate-300 font-semibold py-2.5 px-4 rounded-xl text-xs border border-slate-800 transition-all"
                >
                  Estimate Upfront Costs
                </button>
              </div>
            </div>
          )}

        </div>

      </div>
    </section>
  );
}
