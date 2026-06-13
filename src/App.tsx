import React, { useState, useEffect } from 'react';
import Header from './components/Header';
import Hero from './components/Hero';
import ServicesPanel from './components/ServicesPanel';
import Estimator from './components/Estimator';
import Gallery from './components/Gallery';
import AreaChecker from './components/AreaChecker';
import SafetyTips from './components/SafetyTips';
import ContactForm from './components/ContactForm';
import Footer from './components/Footer';

export default function App() {
  const [activeSection, setActiveSection] = useState('home');
  const [presetEstimateSummary, setPresetEstimateSummary] = useState('');
  const [presetEstimateTotal, setPresetEstimateTotal] = useState(0);
  const [highlightedServiceTitle, setHighlightedServiceTitle] = useState('');

  // Smooth scroll handler with offset for sticky headers
  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      const headerOffset = 130;
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
      setActiveSection(sectionId);
    }
  };

  // Intersection observer to highlight active nav link on scroll
  useEffect(() => {
    const sections = ['services', 'estimator', 'area-checker', 'safety', 'booking'];
    
    const handleScroll = () => {
      const scrollPosition = window.scrollY + 200;
      
      for (const sectionId of sections) {
        const el = document.getElementById(sectionId);
        if (el) {
          const top = el.offsetTop;
          const height = el.offsetHeight;
          if (scrollPosition >= top && scrollPosition < top + height) {
            setActiveSection(sectionId);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="bg-slate-950 min-h-screen text-slate-100 selection:bg-amber-500 selection:text-slate-950 font-sans antialiased overflow-x-hidden">
      
      {/* Upper Navigation and Contact Deck */}
      <Header onNavigate={scrollToSection} activeSection={activeSection} />
      
      {/* Landing Hero Screen with Connection Simulator */}
      <div id="home">
        <Hero onScrollToSection={scrollToSection} />
      </div>

      {/* Services Grid with Spotlight Focus Details */}
      <div id="services">
        <ServicesPanel 
          onScrollToEstimator={() => scrollToSection('estimator')} 
          onScrollToBooking={(serviceName) => {
            if (serviceName) {
              setHighlightedServiceTitle(serviceName);
              // Clear other preset in tandem
              setPresetEstimateSummary('');
              setPresetEstimateTotal(0);
            }
            scrollToSection('booking');
          }}
        />
      </div>

      {/* Upfront Interactive Pricing Engine */}
      <div id="estimator">
        <Estimator 
          onApplyEstimateToBooking={(summary, total) => {
            setPresetEstimateSummary(summary);
            setPresetEstimateTotal(total);
            setHighlightedServiceTitle('');
            scrollToSection('booking');
          }}
        />
      </div>

      {/* Project Gallery */}
      <div id="gallery">
        <Gallery />
      </div>

      {/* Service Area Check Desk */}
      <div id="area-checker">
        <AreaChecker />
      </div>

      {/* Safety Education Board & Reviews */}
      <div id="safety">
        <SafetyTips />
      </div>

      {/* Appointment Request Booking Engine */}
      <div id="booking">
        <ContactForm 
          initialEstimateSummary={presetEstimateSummary} 
          initialEstimateTotal={presetEstimateTotal}
          highlightedServiceTitle={highlightedServiceTitle}
          onClearPreset={() => {
            setPresetEstimateSummary('');
            setPresetEstimateTotal(0);
            setHighlightedServiceTitle('');
          }}
        />
      </div>

      {/* Footer Details Deck */}
      <Footer onNavigate={scrollToSection} />

    </div>
  );
}

