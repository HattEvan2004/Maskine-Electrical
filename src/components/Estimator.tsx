import React, { useState } from 'react';
import { ESTIMATE_ITEMS } from '../data';
import { useSiteContent } from '../sanity/useSiteContent';
import { EstimateItem } from '../types';
import { Calculator, Sparkles, Check, Plus, AlertCircle, FileText, ArrowRight, Zap } from 'lucide-react';

interface EstimatorProps {
  onApplyEstimateToBooking: (estimateSummary: string, total: number) => void;
}

export default function Estimator({ onApplyEstimateToBooking }: EstimatorProps) {
  const [selectedItems, setSelectedItems] = useState<string[]>([]);
  const [activeTab, setActiveTab] = useState<'all' | 'installation' | 'repair' | 'upgrade' | 'troubleshooting'>('all');

  const handleToggleItem = (id: string) => {
    setSelectedItems(prev => 
      prev.includes(id) 
        ? prev.filter(itemId => itemId !== id) 
        : [...prev, id]
    );
  };

  const site = useSiteContent();
  const items = (site?.estimates && site.estimates.length > 0)
    ? site.estimates.map((e, i) => ({ id: e._key || ('est-' + i), name: e.name, basePrice: e.basePrice, timeframe: e.timeframe, category: e.category, description: e.description }))
    : ESTIMATE_ITEMS;

  const filteredItems = items.filter(item => {
    if (activeTab === 'all') return true;
    return item.category === activeTab;
  });

  const selectedObjects = items.filter(item => selectedItems.includes(item.id));
  const totalPrice = selectedObjects.reduce((acc, curr) => acc + curr.basePrice, 0);

  // Timeframe calculation (shows high bound or combination range)
  const calculateCombinedTimeframe = () => {
    if (selectedObjects.length === 0) return '0 hours';
    if (selectedObjects.length === 1) return selectedObjects[0].timeframe;
    
    // Simple custom timeframe grouping
    const hasPanelUpgrade = selectedObjects.some(item => item.id === 'est-panel-100-200');
    if (hasPanelUpgrade) return '2 Days (Priority Upgrade)';
    return '1 Day (Flexible setup)';
  };

  const handleApplyToBooking = () => {
    if (selectedObjects.length === 0) return;
    
    const formattedSummary = selectedObjects
      .map(item => `${item.name} ($${item.basePrice})`)
      .join(', ');
      
    onApplyEstimateToBooking(formattedSummary, totalPrice);
  };

  return (
    <section id="estimator" className="py-24 bg-slate-950 text-slate-100 relative">
      {/* Background radial glow */}
      <div className="absolute top-1/2 left-10 w-80 h-80 bg-amber-500/5 rounded-full blur-3xl -z-10 pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Title Block */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="text-xs font-mono font-bold tracking-widest text-amber-500 uppercase bg-amber-500/10 border border-amber-500/20 px-3 py-1 rounded-full mb-4 inline-block">
            Transparent Pricing Engine
          </span>
          <h2 className="text-3xl sm:text-4xl font-display font-bold text-white tracking-tight mb-4">
            Project Estimate Guide
          </h2>
          <p className="text-slate-400 text-sm sm:text-base leading-relaxed">
            Select the services that match your project to see a starting estimate. For an accurate quote, send us your details below.
          </p>

          {/* Pricing Disclaimer */}
          <div className="bg-slate-900/60 border border-slate-800/80 rounded-lg p-3.5 mt-5 flex items-start gap-3 max-w-2xl mx-auto text-left">
            <AlertCircle size={16} className="text-amber-500 shrink-0 mt-0.5" />
            <span className="text-[11px] sm:text-xs text-slate-400 leading-normal">
              <strong>Please Note:</strong> Prices are starting estimates only. Final pricing depends on project details, materials, site conditions, and inspection requirements.
            </span>
          </div>
        </div>

        {/* Layout split: Left is estimator items list, right is summary ticket */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Main items panel */}
          <div className="col-span-1 lg:col-span-7 flex flex-col gap-5">
            
            {/* Category tabs */}
            <div className="flex flex-wrap gap-1 border-b border-slate-900 pb-3">
              {(['all', 'installation', 'repair', 'upgrade', 'troubleshooting'] as const).map(tab => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={`px-3 py-1.5 text-xs font-mono font-bold uppercase rounded transition-all ${
                    activeTab === tab
                      ? 'text-amber-400 bg-slate-900 border border-slate-800'
                      : 'text-slate-500 hover:text-slate-300'
                  }`}
                >
                  {tab}
                </button>
              ))}
            </div>

            {/* Checklist of options */}
            <div className="flex flex-col gap-3">
              {filteredItems.map(item => {
                const isChecked = selectedItems.includes(item.id);
                return (
                  <div
                    key={item.id}
                    onClick={() => handleToggleItem(item.id)}
                    className={`p-4 rounded-xl border text-left cursor-pointer transition-all flex items-start gap-4 ${
                      isChecked
                        ? 'bg-slate-900 border-amber-500/50'
                        : 'bg-slate-900/40 border-slate-850 hover:bg-slate-900 hover:border-slate-800'
                    }`}
                  >
                    {/* Checkbox circle indicator */}
                    <div className={`mt-0.5 h-5 w-5 rounded-md border flex items-center justify-center shrink-0 transition-colors ${
                      isChecked 
                        ? 'bg-amber-500 border-amber-500 text-slate-950' 
                        : 'border-slate-700 bg-slate-950 hover:border-slate-500'
                    }`}>
                      {isChecked && <Check size={14} strokeWidth={3} className="text-slate-950" />}
                    </div>

                    {/* Metadata */}
                    <div className="flex-1">
                      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1 mb-1">
                        <span className="font-display font-bold text-sm sm:text-base text-white">
                          {item.name}
                        </span>
                        <span className="font-mono text-sm font-bold text-amber-500">
                          Est: ${item.basePrice}
                        </span>
                      </div>
                      <p className="text-slate-400 text-xs sm:text-sm leading-relaxed mb-2 line-clamp-2">
                        {item.description}
                      </p>
                      
                      <div className="flex gap-3">
                        <span className="text-[10px] font-mono text-slate-500 uppercase bg-slate-950 px-2 py-0.5 rounded border border-slate-905">
                          Time: {item.timeframe}
                        </span>
                        <span className="text-[10px] font-mono text-slate-500 uppercase bg-slate-950 px-2 py-0.5 rounded border border-slate-905">
                          Cat: {item.category}
                        </span>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>

          </div>

          {/* Right Summary Invoice Receipt */}
          <div className="col-span-1 lg:col-span-5 bg-slate-900 border border-slate-800 rounded-2xl p-6 relative lg:sticky lg:top-28 shadow-2xl">
            
            {/* Ticket Header styling */}
            <div className="absolute top-0 inset-x-0 h-2 bg-gradient-to-r from-amber-500 via-amber-400 to-amber-600 rounded-t-2xl"></div>

            <div className="flex items-center gap-2 mb-6 mt-2">
              <Calculator size={18} className="text-amber-500" />
              <h3 className="font-display font-bold text-white text-base">
                Your Project Quote Builder
              </h3>
            </div>

            {selectedObjects.length === 0 ? (
              <div className="py-12 px-4 flex flex-col items-center justify-center text-center gap-4 border-2 border-dashed border-slate-800 rounded-xl bg-slate-950/40">
                <div className="h-12 w-12 rounded-full border border-slate-800 bg-slate-900/50 flex items-center justify-center text-slate-450 animate-pulse">
                  <Zap size={20} className="text-amber-500/40" />
                </div>
                <div>
                  <h4 className="font-display font-semibold text-slate-300 text-sm">No items selected</h4>
                  <p className="text-slate-500 text-xs mt-1 max-w-xs mx-auto">
                    Toggle and select individual electrical needs from the services table on the left to begin compiling pricing.
                  </p>
                </div>
              </div>
            ) : (
              <div className="flex flex-col text-left">
                {/* List selected details */}
                <span className="text-xs font-mono text-slate-500 uppercase tracking-widest block mb-3 border-b border-slate-950 pb-2">
                  Line Items ({selectedObjects.length})
                </span>

                <div className="flex flex-col gap-3.5 max-h-52 overflow-y-auto pr-1">
                  {selectedObjects.map(obj => (
                    <div key={obj.id} className="flex justify-between items-start gap-4 border-b border-slate-950/20 pb-2">
                      <div className="flex flex-col">
                        <span className="text-xs font-semibold text-slate-300 leading-tight">
                          {obj.name}
                        </span>
                        <span className="text-[10px] font-mono text-slate-500 uppercase mt-0.5">
                          {obj.timeframe} Service
                        </span>
                      </div>
                      <span className="font-mono text-xs text-amber-500 font-bold shrink-0">
                        ${obj.basePrice}
                      </span>
                    </div>
                  ))}
                </div>

                {/* Totals Section */}
                <div className="mt-6 pt-5 border-t border-slate-950/80 flex flex-col gap-3">
                  <div className="flex justify-between items-center text-sm">
                    <span className="text-slate-500 font-semibold font-mono uppercase text-xs">Estimated Timeframe</span>
                    <span className="text-slate-300 font-bold font-sans">
                      {calculateCombinedTimeframe()}
                    </span>
                  </div>
                  
                  <div className="flex justify-between items-center border-t border-slate-950 pt-3">
                    <span className="text-white font-display font-medium text-base">Total Base Estimate</span>
                    <span className="font-mono text-2xl font-bold text-amber-400 glow-text">
                      ${totalPrice.toLocaleString()}
                    </span>
                  </div>
                </div>

                {/* Quote Action Box */}
                <div className="mt-6 bg-slate-950 rounded-xl p-4 border border-slate-800 flex flex-col gap-4">
                  <div className="flex items-start gap-2.5">
                    <FileText size={16} className="text-amber-500 shrink-0 mt-0.5" />
                    <span className="text-[11px] text-slate-400 leading-relaxed">
                      Want an accurate quote? Send us your project details and we'll get back to you.
                    </span>
                  </div>

                  <button
                    onClick={handleApplyToBooking}
                    className="w-full bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold py-3 px-4 rounded-lg text-xs sm:text-sm shadow-md transition-all flex items-center justify-center gap-1.5"
                  >
                    <span>Request Final Quote</span>
                    <ArrowRight size={14} />
                  </button>
                </div>
              </div>
            )}

            {/* Quick help bar */}
            <div className="mt-5 text-[10px] text-slate-500 text-center font-mono uppercase">
              Free Upfront Quoting Engine v1.4
            </div>
          </div>

        </div>

      </div>
    </section>
  );
}
