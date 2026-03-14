import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Crown, 
  ChevronRight, 
  Menu, 
  X, 
  Instagram, 
  Twitter, 
  Facebook, 
  MapPin, 
  Phone, 
  Mail,
  ArrowRight,
  Star,
  ShieldCheck,
  Gem,
  Tv,
  RefreshCw
} from 'lucide-react';
import { getLiveFootballUpdates } from './services/sportsService';
import Markdown from 'react-markdown';

const Navbar = ({ onOpenSports }: { onOpenSports: () => void }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav className={`fixed w-full z-50 transition-all duration-500 ${scrolled ? 'bg-black/90 backdrop-blur-md py-4' : 'bg-transparent py-8'}`}>
      <div className="max-w-7xl mx-auto px-6 flex justify-between items-center">
        <div className="flex items-center gap-2">
          <Crown className="w-8 h-8 text-gold" />
          <span className="text-2xl font-bold tracking-[0.2em] uppercase gold-text">Azariya</span>
        </div>

        {/* Desktop Menu */}
        <div className="hidden md:flex items-center gap-12">
          {['Collection', 'Heritage', 'Experience', 'Concierge'].map((item) => (
            <a 
              key={item} 
              href={`#${item.toLowerCase()}`} 
              className="text-xs uppercase tracking-[0.3em] hover:text-gold transition-colors duration-300"
            >
              {item}
            </a>
          ))}
          <button 
            onClick={onOpenSports}
            className="flex items-center gap-2 text-xs uppercase tracking-[0.2em] text-white/70 hover:text-gold transition-colors"
          >
            <Tv className="w-4 h-4" />
            Live Sports
          </button>
          <button className="px-6 py-2 border border-gold/50 text-gold text-xs uppercase tracking-[0.2em] hover:bg-gold hover:text-black transition-all duration-500">
            Inquire
          </button>
        </div>

        {/* Mobile Toggle */}
        <button className="md:hidden text-gold" onClick={() => setIsOpen(!isOpen)}>
          {isOpen ? <X /> : <Menu />}
        </button>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="absolute top-full left-0 w-full bg-black/95 backdrop-blur-xl py-12 flex flex-col items-center gap-8 md:hidden border-b border-gold/20"
          >
            {['Collection', 'Heritage', 'Experience', 'Concierge'].map((item) => (
              <a 
                key={item} 
                href={`#${item.toLowerCase()}`} 
                className="text-sm uppercase tracking-[0.4em]"
                onClick={() => setIsOpen(false)}
              >
                {item}
              </a>
            ))}
            <button 
              onClick={() => { onOpenSports(); setIsOpen(false); }}
              className="text-sm uppercase tracking-[0.4em] text-gold"
            >
              Live Sports
            </button>
            <button className="mt-4 px-10 py-3 bg-gold text-black text-xs uppercase tracking-[0.2em] font-bold">
              Inquire Now
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

const SportsLounge = ({ isOpen, onClose }: { isOpen: boolean, onClose: () => void }) => {
  const [updates, setUpdates] = useState<string>('');
  const [loading, setLoading] = useState(false);

  const fetchUpdates = async () => {
    setLoading(true);
    const data = await getLiveFootballUpdates();
    setUpdates(data);
    setLoading(false);
  };

  useEffect(() => {
    if (isOpen) {
      fetchUpdates();
    }
  }, [isOpen]);

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[100] bg-black/95 backdrop-blur-2xl flex items-center justify-center p-6"
        >
          <div className="max-w-4xl w-full bg-[#0a0a0a] border border-gold/20 p-8 md:p-12 relative overflow-hidden">
            <div className="absolute top-0 left-0 w-full h-1 gold-gradient"></div>
            
            <button 
              onClick={onClose}
              className="absolute top-6 right-6 text-white/40 hover:text-white transition-colors"
            >
              <X className="w-6 h-6" />
            </button>

            <div className="flex items-center justify-between mb-12">
              <div>
                <span className="text-gold text-[10px] uppercase tracking-[0.5em] mb-2 block">Exclusive Access</span>
                <h2 className="text-3xl md:text-5xl serif italic font-light">Live Sports <span className="not-italic font-medium text-white">Lounge</span></h2>
              </div>
              <button 
                onClick={fetchUpdates}
                disabled={loading}
                className={`p-3 border border-white/10 rounded-full hover:border-gold hover:text-gold transition-all ${loading ? 'animate-spin' : ''}`}
              >
                <RefreshCw className="w-5 h-5" />
              </button>
            </div>

            <div className="max-h-[60vh] overflow-y-auto custom-scrollbar pr-4">
              {loading ? (
                <div className="flex flex-col items-center justify-center py-20 gap-4">
                  <div className="w-12 h-12 border-2 border-gold/20 border-t-gold rounded-full animate-spin"></div>
                  <p className="text-xs uppercase tracking-[0.3em] text-white/40">Connecting to Global Feed...</p>
                </div>
              ) : (
                <div className="markdown-body prose prose-invert prose-gold max-w-none">
                  <Markdown>{updates}</Markdown>
                </div>
              )}
            </div>

            <div className="mt-12 pt-8 border-t border-white/5 flex justify-between items-center">
              <p className="text-[10px] uppercase tracking-[0.2em] text-white/30 italic">
                Real-time data provided by Azariya Global Intelligence
              </p>
              <button className="text-[10px] uppercase tracking-[0.3em] text-gold hover:underline">
                Full Schedule
              </button>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

const Hero = () => {
  return (
    <section className="relative h-screen flex items-center justify-center overflow-hidden">
      {/* Background Image with Overlay */}
      <div className="absolute inset-0 z-0">
        <img 
          src="https://images.unsplash.com/photo-1550684848-fac1c5b4e853?q=80&w=2070&auto=format&fit=crop" 
          alt="Luxury Red Background" 
          className="w-full h-full object-cover scale-105"
          referrerPolicy="no-referrer"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-crimson-dark/90 via-crimson-dark/60 to-black"></div>
      </div>

      <div className="relative z-10 text-center px-6 max-w-5xl">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.2 }}
        >
          <span className="text-gold text-sm uppercase tracking-[0.6em] mb-6 block">Est. 1924</span>
          <h1 className="text-6xl md:text-9xl serif italic font-light mb-8 leading-tight">
            The Art of <br />
            <span className="not-italic font-medium gold-text">Prestige</span>
          </h1>
          <p className="text-lg md:text-xl text-white/70 max-w-2xl mx-auto mb-12 font-light tracking-wide leading-relaxed">
            Crafting timeless experiences for the world's most discerning individuals. 
            Welcome to the realm of Real Azariya.
          </p>
          <div className="flex flex-col md:flex-row items-center justify-center gap-6">
            <button className="group px-10 py-4 bg-gold text-black uppercase tracking-[0.3em] text-xs font-bold flex items-center gap-3 hover:bg-white transition-all duration-500">
              Explore Collection
              <ArrowRight className="w-4 h-4 group-hover:translate-x-2 transition-transform" />
            </button>
            <button className="px-10 py-4 border border-white/30 uppercase tracking-[0.3em] text-xs hover:border-gold hover:text-gold transition-all duration-500">
              Our Heritage
            </button>
          </div>
        </motion.div>
      </div>

      {/* Scroll Indicator */}
      <motion.div 
        animate={{ y: [0, 10, 0] }}
        transition={{ repeat: Infinity, duration: 2 }}
        className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
      >
        <span className="text-[10px] uppercase tracking-[0.4em] text-white/40">Scroll</span>
        <div className="w-[1px] h-12 bg-gradient-to-b from-gold to-transparent"></div>
      </motion.div>
    </section>
  );
};

const FeatureSection = () => {
  const features = [
    {
      icon: <Gem className="w-8 h-8" />,
      title: "Exquisite Craftsmanship",
      desc: "Every detail meticulously curated by master artisans using the world's finest materials."
    },
    {
      icon: <ShieldCheck className="w-8 h-8" />,
      title: "Absolute Privacy",
      desc: "Discretion is our hallmark. We provide a sanctuary for your most private aspirations."
    },
    {
      icon: <Star className="w-8 h-8" />,
      title: "Unrivaled Service",
      desc: "Our dedicated concierges are available 24/7 to fulfill your every desire, anywhere on globe."
    }
  ];

  return (
    <section id="heritage" className="py-32 bg-[#0a0a0a] border-y border-white/5">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid md:grid-cols-3 gap-16">
          {features.map((f, i) => (
            <motion.div 
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.2 }}
              className="text-center group"
            >
              <div className="mb-8 flex justify-center text-gold group-hover:scale-110 transition-transform duration-500">
                {f.icon}
              </div>
              <h3 className="text-xl uppercase tracking-[0.2em] mb-4">{f.title}</h3>
              <p className="text-white/50 font-light leading-relaxed">{f.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

const CollectionPreview = () => {
  const items = [
    {
      img: "https://images.unsplash.com/photo-1544161515-4ae6ce6ea858?q=80&w=2070&auto=format&fit=crop",
      tag: "Private Estates",
      title: "The Azure Sanctuary"
    },
    {
      img: "https://images.unsplash.com/photo-1567620905732-2d1ec7bb7445?q=80&w=1980&auto=format&fit=crop",
      tag: "Haute Couture",
      title: "Midnight Velvet Series"
    },
    {
      img: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?q=80&w=1999&auto=format&fit=crop",
      tag: "Timepieces",
      title: "Celestial Chronograph"
    }
  ];

  return (
    <section id="collection" className="py-32 bg-black">
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex flex-col md:flex-row justify-between items-end mb-20 gap-8">
          <div className="max-w-2xl">
            <span className="text-gold text-xs uppercase tracking-[0.5em] mb-4 block">Current Selection</span>
            <h2 className="text-5xl md:text-7xl serif italic font-light">The Curated <span className="not-italic font-medium text-white">Collection</span></h2>
          </div>
          <button className="text-xs uppercase tracking-[0.3em] border-b border-gold pb-2 hover:text-gold transition-colors">
            View All Series
          </button>
        </div>

        <div className="grid md:grid-cols-3 gap-10">
          {items.map((item, i) => (
            <motion.div 
              key={i}
              whileHover={{ y: -10 }}
              className="relative group cursor-pointer"
            >
              <div className="aspect-[3/4] overflow-hidden mb-6">
                <img 
                  src={item.img} 
                  alt={item.title} 
                  className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110"
                  referrerPolicy="no-referrer"
                />
              </div>
              <span className="text-[10px] uppercase tracking-[0.4em] text-gold mb-2 block">{item.tag}</span>
              <h4 className="text-xl font-light tracking-wide">{item.title}</h4>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

const Footer = () => {
  return (
    <footer className="bg-[#050505] pt-32 pb-12 border-t border-white/5">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid md:grid-cols-4 gap-16 mb-24">
          <div className="col-span-2">
            <div className="flex items-center gap-2 mb-8">
              <Crown className="w-8 h-8 text-gold" />
              <span className="text-2xl font-bold tracking-[0.2em] uppercase gold-text">Azariya</span>
            </div>
            <p className="text-white/40 max-w-md font-light leading-relaxed mb-8">
              Redefining luxury through the lens of heritage and innovation. 
              Join our exclusive circle for private invitations and early access to new collections.
            </p>
            <div className="flex gap-6">
              <Instagram className="w-5 h-5 text-white/40 hover:text-gold cursor-pointer transition-colors" />
              <Twitter className="w-5 h-5 text-white/40 hover:text-gold cursor-pointer transition-colors" />
              <Facebook className="w-5 h-5 text-white/40 hover:text-gold cursor-pointer transition-colors" />
            </div>
          </div>
          
          <div>
            <h5 className="text-xs uppercase tracking-[0.3em] mb-8 text-white">Navigation</h5>
            <ul className="flex flex-col gap-4 text-sm text-white/40 font-light">
              <li className="hover:text-gold cursor-pointer transition-colors">The Collection</li>
              <li className="hover:text-gold cursor-pointer transition-colors">Heritage & Story</li>
              <li className="hover:text-gold cursor-pointer transition-colors">Bespoke Services</li>
              <li className="hover:text-gold cursor-pointer transition-colors">Private Concierge</li>
            </ul>
          </div>

          <div>
            <h5 className="text-xs uppercase tracking-[0.3em] mb-8 text-white">Contact</h5>
            <ul className="flex flex-col gap-4 text-sm text-white/40 font-light">
              <li className="flex items-center gap-3"><MapPin className="w-4 h-4 text-gold" /> Mayfair, London</li>
              <li className="flex items-center gap-3"><Phone className="w-4 h-4 text-gold" /> +44 20 7946 0123</li>
              <li className="flex items-center gap-3"><Mail className="w-4 h-4 text-gold" /> private@azariya.com</li>
            </ul>
          </div>
        </div>

        <div className="pt-12 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-6">
          <span className="text-[10px] uppercase tracking-[0.3em] text-white/20">
            &copy; 2026 Real Azariya. All Rights Reserved.
          </span>
          <div className="flex gap-8 text-[10px] uppercase tracking-[0.3em] text-white/20">
            <span className="hover:text-white cursor-pointer">Privacy Policy</span>
            <span className="hover:text-white cursor-pointer">Terms of Service</span>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default function App() {
  const [isSportsOpen, setIsSportsOpen] = useState(false);

  return (
    <div className="min-h-screen bg-[#0a0a0a]">
      <Navbar onOpenSports={() => setIsSportsOpen(true)} />
      <SportsLounge isOpen={isSportsOpen} onClose={() => setIsSportsOpen(false)} />
      <Hero />
      <FeatureSection />
      
      {/* Split Section */}
      <section className="grid md:grid-cols-2 min-h-[80vh]">
        <div className="relative overflow-hidden group">
          <img 
            src="https://images.unsplash.com/photo-1513694203232-719a280e022f?q=80&w=2069&auto=format&fit=crop" 
            alt="Interior" 
            className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105"
            referrerPolicy="no-referrer"
          />
          <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
            <div className="text-center p-12 border border-white/20 backdrop-blur-sm">
              <h3 className="text-3xl serif italic mb-4">The Atelier</h3>
              <p className="text-xs uppercase tracking-[0.3em] text-gold">Bespoke Design</p>
            </div>
          </div>
        </div>
        <div className="bg-[#111] flex flex-col justify-center p-12 md:p-24">
          <span className="text-gold text-xs uppercase tracking-[0.5em] mb-6 block">Our Philosophy</span>
          <h2 className="text-4xl md:text-6xl serif italic font-light mb-8 leading-tight">
            Elegance is not being noticed, it's being <span className="not-italic font-medium text-white">remembered.</span>
          </h2>
          <p className="text-white/50 font-light leading-relaxed mb-12 max-w-lg">
            We believe that true luxury lies in the intangible—the feeling of a perfectly tailored suit, 
            the silence of a private retreat, the legacy of a masterpiece. Real Azariya is dedicated 
            to preserving these moments of pure excellence.
          </p>
          <button className="w-fit px-10 py-4 border border-gold/50 text-gold uppercase tracking-[0.3em] text-xs hover:bg-gold hover:text-black transition-all duration-500">
            Discover Our Story
          </button>
        </div>
      </section>

      <CollectionPreview />

      {/* Newsletter / CTA */}
      <section className="py-32 bg-gradient-to-b from-black to-[#0a0a0a]">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <Crown className="w-12 h-12 text-gold mx-auto mb-8" />
          <h2 className="text-4xl md:text-6xl serif italic font-light mb-8">Join the Inner Circle</h2>
          <p className="text-white/50 font-light mb-12 max-w-xl mx-auto">
            Subscribe to receive exclusive updates, private event invitations, and early access to limited releases.
          </p>
          <form className="flex flex-col md:flex-row gap-4 max-w-lg mx-auto" onSubmit={(e) => e.preventDefault()}>
            <input 
              type="email" 
              placeholder="Your Email Address" 
              className="flex-1 bg-white/5 border border-white/10 px-6 py-4 text-sm focus:outline-none focus:border-gold transition-colors"
            />
            <button className="px-10 py-4 bg-gold text-black uppercase tracking-[0.3em] text-xs font-bold hover:bg-white transition-all duration-500">
              Subscribe
            </button>
          </form>
        </div>
      </section>

      <Footer />
    </div>
  );
}
