import React, { useState } from 'react';
import { SAFETY_TIPS, TESTIMONIALS } from '../data';
import { Shield, Sparkles, Star, Quote, ArrowRight, CheckCircle2, AlertTriangle } from 'lucide-react';

export default function SafetyTips() {
  const [activeTip, setActiveTip] = useState(0);
  
  // Interactive mini electrical safety quiz
  const [selectedQuizAnswer, setSelectedQuizAnswer] = useState<number | null>(null);
  const quizOptions = [
    { text: 'Pour water over it or throw baking soda under the socket immediately.', correct: false, expl: 'Never pour water on an electrical fire as water conducts electricity and will aggravate live currents, leading to severe shock or structural spread.' },
    { text: 'Locate your main electrical panel and shift the main breaker completely to "OFF".', correct: true, expl: 'Correct! Cutting off source power instantly stops the heat-generating electrical arc. Only then should you safely inspect the area and call Anthony: 902-802-5306 or Mich: 902-830-5921.' },
    { text: 'Unplug nearby items and wait 24 hours to see if the smell dissipates.', correct: false, expl: 'Waiting is extremely dangerous. Arcing connections can start a silent fire inside the drywall studs. Isolate power at the main panel immediately.' },
  ];

  return (
    <section id="safety" className="py-24 bg-slate-950 text-slate-100 relative">
      <div className="absolute top-1/4 right-1/4 w-72 h-72 bg-amber-500/5 rounded-full blur-3xl -z-10 pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="text-xs font-mono font-bold tracking-widest text-amber-500 uppercase bg-amber-500/10 border border-amber-500/20 px-3 py-1 rounded-full mb-4 inline-block">
            Safety & Reviews
          </span>
          <h2 className="text-3xl sm:text-4xl font-display font-bold text-white tracking-tight mb-4">
            Securing Haligonians with safe circuits & quality work.
          </h2>
          <p className="text-slate-400 text-sm sm:text-base leading-relaxed">
            Electrical hazards are invisible. Learn how to verify your home circuit safety and read testimonials from neighbors who trusted our certified crew.
          </p>
        </div>

        {/* Content split */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
          
          {/* Left panel: Safety Tips & Interactive Safety Quiz Card */}
          <div className="col-span-1 lg:col-span-7 flex flex-col gap-6 text-left">
            
            {/* Safety Tips Board */}
            <div className="bg-slate-900 border border-slate-850 rounded-2xl p-6 shadow-xl">
              <div className="flex items-center gap-2 mb-4">
                <Shield size={18} className="text-amber-500" />
                <h3 className="font-display font-bold text-white text-base">
                  Essential Home Electrical Safety Tips
                </h3>
              </div>

              {/* Safety Tabs */}
              <div className="flex flex-wrap gap-2 mb-5">
                {SAFETY_TIPS.map((tip, idx) => (
                  <button
                    key={tip.id}
                    onClick={() => setActiveTip(idx)}
                    className={`px-3 py-1.5 rounded-lg text-xs font-semibold uppercase font-mono tracking-wider transition-all ${
                      activeTip === idx
                        ? 'bg-amber-500 text-slate-950 font-bold'
                        : 'bg-slate-950 text-slate-400 hover:text-white'
                    }`}
                  >
                    {tip.title}
                  </button>
                ))}
              </div>

              {/* Current active safety info */}
              <div className="bg-slate-950/80 border border-slate-850 p-4 rounded-xl min-h-[140px] flex flex-col justify-between">
                <div>
                  <span className="text-[10px] font-mono uppercase bg-amber-500/10 text-amber-500 py-0.5 px-2 rounded-full border border-amber-500/15 inline-block mb-2">
                    Category: {SAFETY_TIPS[activeTip].category}
                  </span>
                  <h4 className="font-display font-bold text-white text-sm sm:text-base mb-1">
                    {SAFETY_TIPS[activeTip].title}
                  </h4>
                  <p className="text-slate-300 text-xs sm:text-sm leading-relaxed">
                    {SAFETY_TIPS[activeTip].content}
                  </p>
                </div>
                <div className="text-[11px] text-slate-500 italic mt-3 font-mono">
                  Always consult licensed professionals for direct structural alterations.
                </div>
              </div>
            </div>

            {/* Quick Trivia / Electrical Quiz */}
            <div className="bg-slate-900 border border-slate-850 rounded-2xl p-6 shadow-xl">
              <div className="flex items-center gap-2 mb-3">
                <AlertTriangle size={18} className="text-orange-500" />
                <h3 className="font-display font-bold text-white text-base">
                  What would you do? Safety Mini-Quiz
                </h3>
              </div>
              <p className="text-xs text-slate-400 mb-4">
                Test your safety reflex: <strong>What is the proper action if you smell smoke or see sparks coming from an outlet?</strong>
              </p>

              {/* Quiz choice items */}
              <div className="flex flex-col gap-2.5">
                {quizOptions.map((opt, idx) => {
                  const isChosen = selectedQuizAnswer === idx;
                  return (
                    <button
                      key={idx}
                      type="button"
                      onClick={() => setSelectedQuizAnswer(idx)}
                      className={`w-full p-3 rounded-lg text-left text-xs sm:text-sm transition-all border ${
                        isChosen
                          ? opt.correct
                            ? 'bg-emerald-950/20 border-emerald-500/50 text-emerald-200'
                            : 'bg-red-950/20 border-red-500/50 text-red-200'
                          : 'bg-slate-950 border-slate-850 text-slate-300 hover:border-slate-700'
                      }`}
                    >
                      <div className="font-medium font-sans">
                        {opt.text}
                      </div>

                      {/* Display expl of click */}
                      {isChosen && (
                        <div className="mt-2.5 pt-2 border-t border-slate-800/30 text-xs font-sans text-slate-400 leading-relaxed font-light">
                          <strong className="font-semibold block mb-0.5">
                            {opt.correct ? '✓ Safe Action Recommended:' : '✗ Safety Warning:'}
                          </strong>
                          {opt.expl}
                        </div>
                      )}
                    </button>
                  );
                })}
              </div>
            </div>

          </div>

          {/* Right panel: Rated Testimonials list */}
          <div className="col-span-1 lg:col-span-5 flex flex-col gap-4 text-left">
            <span className="text-xs font-mono text-slate-500 uppercase tracking-widest pl-1 mt-1 block">
              Direct Customer Feedback Map:
            </span>

            {TESTIMONIALS.map((testimonial) => (
              <div
                key={testimonial.id}
                className="bg-slate-900 border border-slate-850 p-5 rounded-2xl shadow-lg relative flex flex-col justify-between flex-1"
              >
                <div>
                  {/* Rating block */}
                  <div className="flex gap-0.5 mb-3.5">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <Star key={i} size={14} className="fill-amber-500 text-amber-500" />
                    ))}
                  </div>

                  <span className="absolute top-5 right-5 text-slate-800 pointer-events-none">
                    <Quote size={40} className="opacity-15 shrink-0" />
                  </span>

                  <p className="text-slate-300 text-xs sm:text-sm italic leading-relaxed mb-4 relative z-10 font-sans">
                    "{testimonial.content}"
                  </p>
                </div>

                <div className="flex justify-between items-center border-t border-slate-950/50 pt-3.5 mt-2">
                  <div className="flex flex-col">
                    <span className="font-display font-bold text-white text-sm">
                      {testimonial.name}
                    </span>
                    <span className="text-[10px] text-slate-500 font-mono">
                      {testimonial.role}
                    </span>
                  </div>
                  
                  <span className="text-[10px] text-amber-500 font-mono uppercase bg-amber-500/5 px-2 py-0.5 rounded border border-amber-500/10">
                    📍 {testimonial.location}
                  </span>
                </div>
              </div>
            ))}
          </div>

        </div>

      </div>
    </section>
  );
}
