import React, { useState } from 'react';
import { MapPin, Search, CheckCircle, AlertTriangle, HelpCircle, ArrowRight } from 'lucide-react';

export default function AreaChecker() {
  const [query, setQuery] = useState('');
  const [checkResult, setCheckResult] = useState<{
    status: 'success' | 'warn' | 'error' | null;
    message: string;
    region?: string;
  }>({ status: null, message: '' });

  // List of active neighborhoods/regions in HRM and surrounding areas
  const supportedRegions = [
    { name: 'Halifax Peninsula', postalStarts: ['B3H', 'B3J', 'B3K', 'B3L', 'B3M', 'B3N', 'B3P'] },
    { name: 'Dartmouth', postalStarts: ['B2Y', 'B3A', 'B2W', 'B2X'] },
    { name: 'Bedford & Sackville', postalStarts: ['B4A', 'B4B', 'B4C', 'B4E', 'B4G'] },
    { name: 'Timberlea, Prospect & Lakeside', postalStarts: ['B3T', 'B3Z'] },
    { name: 'Spryfield & Sambro', postalStarts: ['B3R', 'B3V'] },
    { name: 'Cole Harbour & Eastern Passage', postalStarts: ['B2V', 'B3G'] },
    { name: 'Clayton Park & Fairview', postalStarts: ['B2S', 'B3M'] }
  ];

  const handleCheckArea = (e: React.FormEvent) => {
    e.preventDefault();
    const cleanQuery = query.trim().toUpperCase();

    if (!cleanQuery) {
      setCheckResult({
        status: null,
        message: ''
      });
      return;
    }

    // Check if it is a postal code
    if (cleanQuery.match(/^[A-Z]\d[A-Z]/) || cleanQuery.match(/^[A-Z]\d[A-Z]\s?\d[A-Z]\d/)) {
      const parentSegment = cleanQuery.substring(0, 3);
      if (!parentSegment.startsWith('B')) {
        setCheckResult({
          status: 'error',
          message: 'Currently, our service area is restricted to Halifax (HRM) and surrounding areas in Nova Scotia. Postal codes outside Nova Scotia are not supported.'
        });
        return;
      }

      const match = supportedRegions.find(region => 
        region.postalStarts.includes(parentSegment)
      );

      if (match) {
        setCheckResult({
          status: 'success',
          message: `Excellent! Your postal sector ${parentSegment} is within our primary service boundary.`,
          region: match.name
        });
      } else {
        // Fallback for NS but outside HRM
        setCheckResult({
          status: 'warn',
          message: `Postal area ${parentSegment} is in NS but falls slightly outside our regular daily HRM routes. Please call or email Anthony & Mich to request custom travel scheduling.`
        });
      }
    } else {
      // Direct text neighborhood check
      const matchedRegion = supportedRegions.find(region => 
        region.name.toUpperCase().includes(cleanQuery) || 
        cleanQuery.includes(region.name.toUpperCase()) ||
        ['HALIFAX', 'DARTMOUTH', 'BEDFORD', 'SACKVILLE', 'TIMBERLEA', 'SPRYFIELD', 'COLE HARBOUR', 'COLEHARBOUR', 'EASTERN PASSAGE', 'HRM'].some(keyword => 
          cleanQuery.includes(keyword) || keyword.includes(cleanQuery)
        )
      );

      if (matchedRegion) {
        setCheckResult({
          status: 'success',
          message: `Great news! "${query}" is fully serviced by our electrical crew.`,
          region: matchedRegion.name
        });
      } else {
        setCheckResult({
          status: 'error',
          message: `Could not confidently match "${query}". We operate within the Halifax Regional Municipality. Contact our office directly if you are close by!`
        });
      }
    }
  };

  return (
    <section id="area-checker" className="py-24 bg-slate-900 text-slate-100 border-t border-slate-950">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Layout container */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Left info column: Neighborhood details list */}
          <div className="lg:col-span-6 text-left">
            <span className="text-xs font-mono font-bold tracking-widest text-amber-500 uppercase bg-amber-500/10 border border-amber-500/20 px-3 py-1 rounded-full mb-4 inline-block">
              Our Base & Coverage
            </span>
            <h2 className="text-3xl sm:text-4xl font-display font-bold text-white tracking-tight mb-4">
              Providing electrical service throughout the HRM.
            </h2>
            <p className="text-slate-400 text-sm sm:text-base leading-relaxed mb-8">
              Based at <strong>136 Brook Street, Halifax</strong>, our electricians deploy daily across the peninsula and nearby communities. We are proud Nova Scotians helping homeowners keep their spaces illuminated.
            </p>

            {/* List block */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {supportedRegions.map((region, idx) => (
                <div key={idx} className="flex gap-3 items-start p-3 rounded-lg bg-slate-950/40 border border-slate-850">
                  <div className="h-6 w-6 rounded bg-amber-500/10 text-amber-400 flex items-center justify-center shrink-0 mt-0.5">
                    <MapPin size={14} />
                  </div>
                  <div>
                    <h4 className="text-sm font-semibold text-white leading-tight">{region.name}</h4>
                    <p className="text-slate-500 text-[10px] uppercase font-mono mt-0.5">
                      Sectors: {region.postalStarts.join(', ')}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Right column: Interactive Checker Box */}
          <div className="lg:col-span-6 w-full flex justify-center">
            <div className="w-full max-w-md bg-slate-950 border border-slate-850 rounded-2xl p-6 sm:p-8 shadow-2xl relative overflow-hidden">
              <div className="absolute top-0 right-0 h-16 w-16 bg-gradient-to-br from-amber-500/10 to-transparent rounded-bl-full"></div>
              
              <h3 className="font-display font-bold text-white text-lg tracking-tight mb-2 flex items-center gap-2">
                Verify Your Service Area
              </h3>
              <p className="text-xs sm:text-sm text-slate-400 mb-6 leading-relaxed">
                Type in your Halifax-area neighborhood or the first 3 characters of your postal code (e.g. B3N or B2Y) to confirm availability.
              </p>

              {/* Input Form */}
              <form onSubmit={handleCheckArea} className="flex flex-col gap-3">
                <div className="flex gap-2 bg-slate-900 border border-slate-800 rounded-xl p-1.5 focus-within:border-amber-500/50 transition-all">
                  <div className="flex items-center text-slate-500 pl-2 shrink-0">
                    <Search size={16} />
                  </div>
                  <input
                    type="text"
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    placeholder="e.g. B3N, Timberlea, Dartmouth..."
                    className="flex-1 bg-transparent border-none text-white text-sm focus:outline-none placeholder-slate-600 px-1 py-1.5 uppercase"
                  />
                  <button
                    type="submit"
                    className="bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold px-4 rounded-lg text-xs transition-all whitespace-nowrap"
                  >
                    Check Status
                  </button>
                </div>
              </form>

              {/* Output Results Container */}
              {checkResult.status !== null && (
                <div className={`mt-5 p-4 rounded-xl border text-left transition-all ${
                  checkResult.status === 'success'
                    ? 'bg-emerald-950/20 border-emerald-900/50 text-emerald-200'
                    : checkResult.status === 'warn'
                    ? 'bg-amber-950/20 border-amber-900/50 text-amber-200'
                    : 'bg-red-950/20 border-red-900/50 text-red-200'
                }`}>
                  <div className="flex gap-3 items-start">
                    {checkResult.status === 'success' && <CheckCircle size={18} className="text-emerald-400 mt-0.5 shrink-0" />}
                    {checkResult.status === 'warn' && <AlertTriangle size={18} className="text-amber-400 mt-0.5 shrink-0" />}
                    {checkResult.status === 'error' && <AlertTriangle size={18} className="text-red-400 mt-0.5 shrink-0" />}
                    
                    <div className="flex-1 flex flex-col">
                      <span className="text-xs font-semibold uppercase font-mono tracking-wider text-slate-400 block mb-1">
                        Coverage Report
                      </span>
                      <p className="text-xs sm:text-sm leading-relaxed font-sans">
                        {checkResult.message}
                      </p>
                      
                      {checkResult.region && (
                        <div className="mt-3 inline-flex items-center gap-1.5 bg-emerald-500/10 text-emerald-300 rounded border border-emerald-500/20 py-1 px-2 text-[11px] w-fit font-mono font-bold">
                          <CheckCircle size={12} />
                          <span>Neighborhood: {checkResult.region}</span>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              )}

              {/* Safe Dispatch badge contact */}
              <div className="mt-6 pt-5 border-t border-slate-900 flex justify-between items-center text-xs text-slate-500">
                <span className="flex items-center gap-1.5 font-mono">
                  <span className="h-1.5 w-1.5 bg-emerald-500 rounded-full"></span>
                  BNS-NS registered
                </span>
                <span>Active Duty Electricians Daily</span>
              </div>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
}
