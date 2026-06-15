import React, { useState, useEffect } from 'react';
import { Mail, Phone, Calendar, AlertTriangle, CheckCircle, Clock, Zap, ArrowRight, CornerDownRight } from 'lucide-react';
import { BookingInquiry } from '../types';

interface ContactFormProps {
  initialEstimateSummary: string;
  initialEstimateTotal: number;
  highlightedServiceTitle: string;
  onClearPreset: () => void;
}

export default function ContactForm({ 
  initialEstimateSummary, 
  initialEstimateTotal, 
  highlightedServiceTitle,
  onClearPreset 
}: ContactFormProps) {
  
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [serviceType, setServiceType] = useState('General Lighting Repair');
  const [preferredElectrician, setPreferredElectrician] = useState<'anthony' | 'mich' | 'either'>('either');
  const [urgency, setUrgency] = useState<'routine' | 'urgent' | 'emergency'>('routine');
  const [address, setAddress] = useState('');
  const [description, setDescription] = useState('');

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submissionReceipt, setSubmissionReceipt] = useState<BookingInquiry | null>(null);

  // Sync initial values when they are loaded from other components
  useEffect(() => {
    if (initialEstimateSummary) {
      setServiceType('Custom Estimated Project Bundle');
      setDescription(`Quote Selection: ${initialEstimateSummary}. Approximate Base Total: $${initialEstimateTotal}.`);
    } else if (highlightedServiceTitle) {
      setServiceType(highlightedServiceTitle);
      setDescription(`Interested in booking our professional ${highlightedServiceTitle} services.`);
    }
  }, [initialEstimateSummary, initialEstimateTotal, highlightedServiceTitle]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!fullName || !phone || !address) {
      alert("Please fill in your name, contact phone, and site address so we can plan dispatch.");
      return;
    }

    setIsSubmitting(true);

    const receiptId = `MKN-${Math.floor(100000 + Math.random() * 900000)}`;
    const createdAt = new Date().toLocaleDateString('en-US', {
      year: 'numeric', month: 'long', day: 'numeric', hour: '2-digit', minute: '2-digit'
    });

    try {
      const res = await fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' },
        body: JSON.stringify({
          access_key: 'b95cbd21-7f28-471e-befa-bc49d326784f',
          subject: `New Quote Request from ${fullName} (${urgency})`,
          from_name: 'Maskine Electric Website',
          'Reference ID': receiptId,
          'Full Name': fullName,
          'Phone': phone,
          'Email': email || 'Not provided',
          'Worksite Address': address,
          'Service Type': serviceType,
          'Preferred Electrician': preferredElectrician,
          'Urgency': urgency,
          'Project Details': description || 'No additional details provided.',
          'Submitted': createdAt
        })
      });
      const data = await res.json();
      if (data.success) {
        setSubmissionReceipt({
          id: receiptId, fullName, email: email || 'No email provided', phone,
          serviceType, description: description || 'Routine project walk-through requested.',
          preferredElectrician, urgency, address, createdAt
        });
      } else {
        alert('Something went wrong sending your request. Please call us directly at 902-802-5306.');
      }
    } catch (err) {
      alert('Could not send your request. Please check your connection or call us at 902-802-5306.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleResetForm = () => {
    setFullName('');
    setEmail('');
    setPhone('');
    setServiceType('General Lighting Repair');
    setPreferredElectrician('either');
    setUrgency('routine');
    setAddress('');
    setDescription('');
    setSubmissionReceipt(null);
    onClearPreset();
  };

  return (
    <section id="booking" className="py-24 bg-slate-900 text-slate-100 border-t border-slate-950">
      <div className="max-w-4xl mx-auto px-4 sm:px-6">
        
        {/* Header Title */}
        <div className="text-center max-w-2xl mx-auto mb-12">
          <span className="text-xs font-mono font-bold tracking-widest text-amber-500 uppercase bg-amber-500/10 border border-amber-500/20 px-3 py-1 rounded-full mb-4 inline-block">
            Direct Scheduling
          </span>
          <h2 className="text-3xl sm:text-4xl font-display font-bold text-white tracking-tight mb-3">
            Book an Appointment or Inquiry
          </h2>
          <p className="text-slate-400 text-sm sm:text-base">
            Send your service request directly to our team. Mich & Anthony review all daily requests within 2 hours.
          </p>
        </div>

        {/* Outer relative card */}
        <div className="bg-slate-950 border border-slate-850 rounded-2xl p-6 sm:p-10 shadow-2xl relative">
          
          {/* Animated preset notification tag */}
          {(initialEstimateSummary || highlightedServiceTitle) && !submissionReceipt && (
            <div className="mb-6 p-3 bg-amber-500/10 border border-amber-500/30 rounded-xl flex items-center justify-between text-left">
              <div className="flex items-center gap-2.5">
                <Zap size={16} className="text-amber-400 animate-pulse" />
                <span className="text-xs text-amber-200">
                  {initialEstimateSummary 
                    ? `Loaded interactive quote estimate: $${initialEstimateTotal}` 
                    : `Selected service spotlight: "${highlightedServiceTitle}"`
                  }
                </span>
              </div>
              <button 
                onClick={handleResetForm}
                className="text-[10px] uppercase font-mono text-slate-400 hover:text-white underline cursor-pointer"
              >
                Clear Preset
              </button>
            </div>
          )}

          {/* Submission Successful Voucher Page */}
          {submissionReceipt ? (
            <div className="text-left flex flex-col gap-6 py-4">
              <div className="flex items-center gap-3 bg-emerald-500/10 border border-emerald-500/30 p-4 rounded-xl text-emerald-200">
                <CheckCircle size={28} className="text-emerald-400 shrink-0" />
                <div>
                  <h3 className="font-display font-bold text-base text-white">Booking Request Successfully Sent</h3>
                  <p className="text-xs text-slate-400 mt-0.5">
                    Your request voucher has been registered. Our electricians will be in contact shortly.
                  </p>
                </div>
              </div>

              {/* Receipt Ticket layout */}
              <div className="border border-slate-800 bg-slate-900 rounded-xl overflow-hidden shadow-inner">
                <div className="bg-slate-850 px-4 py-3 border-b border-slate-800 flex justify-between items-center">
                  <span className="text-xs font-mono tracking-widest text-slate-400 uppercase">
                    OFFICIAL VOUCHER RECEIPT
                  </span>
                  <span className="font-mono text-xs text-amber-500 font-bold">
                    ID: {submissionReceipt.id}
                  </span>
                </div>

                <div className="p-5 grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-4 text-xs sm:text-sm">
                  <div className="flex flex-col gap-1">
                    <span className="text-slate-500 font-mono text-[10px] uppercase">Client Representative</span>
                    <strong className="text-white font-semibold">{submissionReceipt.fullName}</strong>
                  </div>
                  <div className="flex flex-col gap-1">
                    <span className="text-slate-500 font-mono text-[10px] uppercase">Contact Number</span>
                    <strong className="text-white font-semibold">{submissionReceipt.phone}</strong>
                  </div>
                  <div className="flex flex-col gap-1">
                    <span className="text-slate-500 font-mono text-[10px] uppercase">Email Address</span>
                    <span className="text-slate-300 font-mono">{submissionReceipt.email}</span>
                  </div>
                  <div className="flex flex-col gap-1">
                    <span className="text-slate-500 font-mono text-[10px] uppercase">Site Address</span>
                    <strong className="text-white font-semibold">{submissionReceipt.address}</strong>
                  </div>
                  <div className="flex flex-col gap-1 sm:col-span-2 border-t border-slate-800 pt-3">
                    <span className="text-slate-500 font-mono text-[10px] uppercase">Requested Operation</span>
                    <span className="text-amber-400 font-bold">{submissionReceipt.serviceType}</span>
                  </div>
                  <div className="flex flex-col gap-1 sm:col-span-2">
                    <span className="text-slate-500 font-mono text-[10px] uppercase">Project Scope / Code Guidelines</span>
                    <p className="text-slate-300 italic font-sans max-w-xl leading-relaxed mt-0.5">
                      "{submissionReceipt.description}"
                    </p>
                  </div>
                  <div className="flex flex-col gap-1 border-t border-slate-800 pt-3">
                    <span className="text-slate-500 font-mono text-[10px] uppercase">Assigned Crew</span>
                    <span className="text-slate-200 capitalize font-medium">{submissionReceipt.preferredElectrician}</span>
                  </div>
                  <div className="flex flex-col gap-1 border-t border-slate-800 pt-3">
                    <span className="text-slate-500 font-mono text-[10px] uppercase">Urgency Class</span>
                    <span className={`f-semibold uppercase text-xs font-semibold px-2 py-0.5 rounded font-mono w-fit ${
                      submissionReceipt.urgency === 'emergency' 
                        ? 'bg-red-500/10 text-red-400 border border-red-500/20' 
                        : submissionReceipt.urgency === 'urgent'
                        ? 'bg-amber-500/10 text-amber-400 border border-amber-500/20'
                        : 'bg-slate-950 text-slate-400'
                    }`}>
                      {submissionReceipt.urgency}
                    </span>
                  </div>
                </div>

                <div className="bg-slate-850/50 px-5 py-3 border-t border-slate-800 text-[11px] text-slate-500 flex justify-between items-center font-mono">
                  <span>Logged: {submissionReceipt.createdAt}</span>
                  <span>HRM Dispatch Unit Block B</span>
                </div>
              </div>

              {/* Next Steps List */}
              <div className="text-slate-400 text-xs sm:text-sm flex flex-col gap-2 mt-2">
                <h4 className="text-xs font-mono font-bold uppercase text-slate-300">What Happens Next?</h4>
                <div className="flex gap-2 items-center">
                  <CornerDownRight size={14} className="text-amber-500 shrink-0" />
                  <span>We will verify municipal permit queues and draw down technical schematics.</span>
                </div>
                <div className="flex gap-2 items-center">
                  <CornerDownRight size={14} className="text-amber-500 shrink-0" />
                  <span>Mich or Anthony will confirm a definitive date/time within our schedule via text or email.</span>
                </div>
              </div>

              <button
                type="button"
                onClick={handleResetForm}
                className="mt-4 bg-slate-900 hover:bg-slate-850 text-white font-semibold py-2.5 px-4 rounded-xl text-xs sm:text-sm border border-slate-800 transition-all self-start"
              >
                Submit Another Request
              </button>
            </div>
          ) : (
            
            /* The Interactive Form */
            <form onSubmit={handleSubmit} className="grid grid-cols-1 sm:grid-cols-2 gap-5 sm:gap-6 text-left">
              
              {/* Client Name */}
              <div className="flex flex-col gap-2 col-span-1">
                <label className="text-xs font-mono font-bold uppercase text-slate-400">
                  Full Name <span className="text-amber-500">*</span>
                </label>
                <input
                  type="text"
                  required
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  placeholder="e.g. Sarah Macdonald"
                  className="bg-slate-900 border border-slate-800 rounded-xl py-3 px-4 text-base sm:text-sm text-white focus:outline-none focus:border-amber-500/50"
                />
              </div>

              {/* Telephone */}
              <div className="flex flex-col gap-2 col-span-1">
                <label className="text-xs font-mono font-bold uppercase text-slate-400">
                  Phone Number <span className="text-amber-500">*</span>
                </label>
                <input
                  type="tel"
                  required
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  placeholder="e.g. 902-802-5306"
                  className="bg-slate-900 border border-slate-800 rounded-xl py-3 px-4 text-base sm:text-sm text-white focus:outline-none focus:border-amber-500/50"
                />
              </div>

              {/* Email Address */}
              <div className="flex flex-col gap-2 col-span-1">
                <label className="text-xs font-mono font-bold uppercase text-slate-400">
                  Email Address
                </label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="e.g. user@domain.com"
                  className="bg-slate-900 border border-slate-800 rounded-xl py-3 px-4 text-base sm:text-sm text-white focus:outline-none focus:border-amber-500/50"
                />
              </div>

              {/* Site Address */}
              <div className="flex flex-col gap-2 col-span-1">
                <label className="text-xs font-mono font-bold uppercase text-slate-400">
                  Worksite Address <span className="text-amber-500">*</span>
                </label>
                <input
                  type="text"
                  required
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                  placeholder="e.g. 136 Brook Street, Halifax, NS"
                  className="bg-slate-900 border border-slate-800 rounded-xl py-3 px-4 text-base sm:text-sm text-white focus:outline-none focus:border-amber-500/50"
                />
              </div>

              {/* Service Selection */}
              <div className="flex flex-col gap-2 col-span-1">
                <label className="text-xs font-mono font-bold uppercase text-slate-400">
                  Service/Operation Type
                </label>
                <select
                  value={serviceType}
                  onChange={(e) => setServiceType(e.target.value)}
                  className="bg-slate-900 border border-slate-800 rounded-xl py-3 px-4 text-base sm:text-sm text-white focus:outline-none focus:border-amber-500/50 appearance-none"
                >
                  <option value="General Lighting Repair">General Lighting Repair</option>
                  <option value="Service Panel 200A Upgrade">Service Panel 200A Upgrade</option>
                  <option value="EV Charging Station Setup">EV Charging Station Setup</option>
                  <option value="Troubleshooting & Flickering Circuits">Troubleshooting & Flickering Circuits</option>
                  <option value="Kitchen or Bath Rewiring">Kitchen or Bath Rewiring</option>
                  <option value="Commercial Improvements">Commercial Improvements</option>
                  <option value="Smart Automation Switches">Smart Automation Switches</option>
                  <option value="Whole-Home Surge Protection">Whole-Home Surge Protection</option>
                  <option value="Custom Estimated Project Bundle">Custom Estimated Project Bundle</option>
                </select>
              </div>

              {/* Assign Electrician */}
              <div className="flex flex-col gap-2 col-span-1">
                <label className="text-xs font-mono font-bold uppercase text-slate-400">
                  Preferred Electrician
                </label>
                <div className="grid grid-cols-3 gap-2 bg-slate-900 border border-slate-800 rounded-xl p-1">
                  {(['either', 'anthony', 'mich'] as const).map(person => (
                    <button
                      key={person}
                      type="button"
                      onClick={() => setPreferredElectrician(person)}
                      className={`py-2 px-1 text-[10px] sm:text-xs font-medium rounded transition-all capitalize ${
                        preferredElectrician === person
                          ? 'bg-amber-500 text-slate-950 font-bold'
                          : 'text-slate-400 hover:text-white'
                      }`}
                    >
                      {person}
                    </button>
                  ))}
                </div>
              </div>

              {/* Priority / Urgency */}
              <div className="flex flex-col gap-2 col-span-1 sm:col-span-2">
                <label className="text-xs font-mono font-bold uppercase text-slate-400">
                  Project Urgency Category
                </label>
                <div className="grid grid-cols-3 gap-2 bg-slate-900 border border-slate-800 rounded-xl p-1.5">
                  {(['routine', 'urgent', 'emergency'] as const).map(level => {
                    const isSelected = urgency === level;
                    return (
                      <button
                        key={level}
                        type="button"
                        onClick={() => setUrgency(level)}
                        className={`py-2 px-1 text-xs font-semibold rounded transition-all capitalize ${
                          isSelected
                            ? level === 'emergency'
                              ? 'bg-red-600 text-white font-bold'
                              : level === 'urgent'
                              ? 'bg-amber-500 text-slate-950 font-bold'
                              : 'bg-slate-700 text-white font-bold'
                            : 'text-slate-450 hover:text-slate-200'
                        }`}
                      >
                        {level === 'routine' ? 'Routine (Flexible)' : level === 'urgent' ? 'Urgent (1-2 Days)' : 'Emergency ✨'}
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Emergency Banner Alert */}
              {urgency === 'emergency' && (
                <div className="col-span-1 sm:col-span-2 bg-red-950/20 border border-red-900/50 p-4 rounded-xl text-red-200 flex flex-col gap-2 font-sans">
                  <div className="flex gap-2 items-center">
                    <AlertTriangle size={16} className="text-red-400 shrink-0" />
                    <strong>Immediate Dispatch Alert:</strong>
                  </div>
                  <p className="text-xs text-red-300">
                    If this is an active hazard (fire risk, water shock, sparking panels), do not wait for a web or email response. Please call our 24/7 emergency dispatch team right now for instant service:
                  </p>
                  <div className="flex flex-wrap gap-4 mt-1">
                    <a href="tel:902-802-5306" className="inline-flex items-center gap-1.5 text-xs text-amber-400 font-mono font-bold underline hover:text-amber-300">
                      <Phone size={12} />
                      Anthony: 902-802-5306
                    </a>
                    <a href="tel:902-830-5921" className="inline-flex items-center gap-1.5 text-xs text-amber-400 font-mono font-bold underline hover:text-amber-300">
                      <Phone size={12} />
                      Mich: 902-830-5921
                    </a>
                  </div>
                </div>
              )}

              {/* Description Details */}
              <div className="flex flex-col gap-2 col-span-1 sm:col-span-2">
                <label className="text-xs font-mono font-bold uppercase text-slate-400">
                  Describe Your project or details
                </label>
                <textarea
                  rows={4}
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  placeholder="Describe your job. Mention relevant fixtures, panel brand, access conditions, or old-wiring history..."
                  className="bg-slate-900 border border-slate-800 rounded-xl py-3 px-4 text-base sm:text-sm text-white focus:outline-none focus:border-amber-500/50 font-sans"
                />
              </div>

              {/* Submit Trigger */}
              <div className="col-span-1 sm:col-span-2 pt-2">
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full bg-amber-500 hover:bg-amber-400 text-slate-950 font-extrabold py-3.5 px-4 rounded-xl text-sm shadow-lg shadow-amber-500/10 hover:shadow-amber-500/20 active:scale-[0.99] transition-all flex items-center justify-center gap-2"
                >
                  {isSubmitting ? (
                    <>
                      <Clock size={16} className="animate-spin text-slate-950" />
                      <span>Sending Secure Dispatch Request...</span>
                    </>
                  ) : (
                    <>
                      <span>Submit Appointment Dispatch Request</span>
                      <ArrowRight size={16} />
                    </>
                  )}
                </button>
              </div>

            </form>
          )}

        </div>

      </div>
    </section>
  );
}
