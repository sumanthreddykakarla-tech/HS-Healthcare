
import React, { useState, useEffect, useRef } from 'react';
import { Routes, Route, Navigate, Link, useNavigate, useLocation, useParams } from 'react-router-dom';
import { GoogleGenAI } from "@google/genai";
import { User, Hospital, Doctor, DailyLog, DiagnosticTest, BloodRequest, BloodType, Donor, Consultation, DiagnosticRecord } from './types';
import { HOSPITALS, DIAGNOSTIC_TESTS, MOCK_BLOOD_REQUESTS, MOCK_DONORS, MOCK_USERS } from './constants';
import { getTreatmentInsight } from './services/geminiService';

// --- Neural Assistant (Chatbot) Component ---

const NeuralAssistant: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<{ role: 'user' | 'bot'; text: string; sources?: { title: string; uri: string }[] }[]>([
    { role: 'bot', text: 'Neural Node Active. I am your HS Healthcare Assistant. How can I synchronize your medical data today?' }
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages, isLoading]);

  const handleSend = async () => {
    if (!input.trim() || isLoading) return;

    const userMessage = input.trim();
    setInput('');
    setMessages(prev => [...prev, { role: 'user', text: userMessage }]);
    setIsLoading(true);

    try {
      const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
      const hospitalContext = HOSPITALS.map(h => `${h.name} at ${h.address} specializes in ${h.specialties.join(', ')}.`).join('\n');
      
      const response = await ai.models.generateContent({
        model: 'gemini-3-pro-preview',
        contents: userMessage,
        config: {
          tools: [{ googleSearch: {} }],
          systemInstruction: `You are the HS Healthcare Neural Assistant. 
          You have access to the internal HS Network data: ${hospitalContext}. 
          You also have access to Google Search for global medical queries. 
          Provide professional, concise, and helpful healthcare information. 
          Always clarify if information is from the internal network or global sources.`
        }
      });

      const botText = response.text || "I am processing your request. Please re-synchronize.";
      const grounding = response.candidates?.[0]?.groundingMetadata?.groundingChunks;
      const sources = grounding?.map((chunk: any) => ({
        title: chunk.web?.title || 'Medical Source',
        uri: chunk.web?.uri
      })).filter((s: any) => s.uri);

      setMessages(prev => [...prev, { role: 'bot', text: botText, sources }]);
    } catch (error) {
      console.error("Neural Node Error:", error);
      setMessages(prev => [...prev, { role: 'bot', text: 'Clinical synchronization failed. Please try again.' }]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="fixed bottom-8 right-8 z-[100]">
      {/* Floating Action Button */}
      <button 
        onClick={() => setIsOpen(!isOpen)}
        className={`w-16 h-16 rounded-full flex items-center justify-center transition-all shadow-[0_0_30px_rgba(34,211,238,0.4)] ${
          isOpen ? 'bg-white text-black rotate-90' : 'bg-cyan-500 text-black hover:scale-110'
        }`}
      >
        {isOpen ? (
          <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M6 18L18 6M6 6l12 12" /></svg>
        ) : (
          <svg className="w-8 h-8 animate-pulse" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M13 10V3L4 14h7v7l9-11h-7z" /></svg>
        )}
      </button>

      {/* Chat Portal */}
      {isOpen && (
        <div className="absolute bottom-20 right-0 w-[350px] md:w-[450px] h-[600px] glass rounded-[2.5rem] border-white/10 shadow-2xl flex flex-col overflow-hidden scale-in">
          <div className="p-6 border-b border-white/10 bg-white/5">
            <h4 className="text-white font-black text-xs uppercase tracking-[0.3em]">Neural Assistant v2.5</h4>
            <div className="flex items-center gap-2 mt-1">
              <span className="w-1.5 h-1.5 bg-cyan-400 rounded-full animate-ping"></span>
              <span className="text-slate-500 text-[8px] font-black uppercase tracking-widest">Global Link Secure</span>
            </div>
          </div>

          <div className="flex-1 overflow-y-auto p-6 space-y-6 no-scrollbar" ref={scrollRef}>
            {messages.map((m, i) => (
              <div key={i} className={`flex ${m.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                <div className={`max-w-[85%] p-4 rounded-2xl text-xs leading-relaxed ${
                  m.role === 'user' 
                  ? 'bg-cyan-400 text-black font-bold' 
                  : 'bg-white/5 text-white border border-white/5'
                }`}>
                  {m.text}
                  {m.sources && m.sources.length > 0 && (
                    <div className="mt-4 pt-4 border-t border-white/10 space-y-2">
                      <p className="text-[7px] font-black uppercase tracking-widest text-slate-500 mb-2">Clinical Sources:</p>
                      {m.sources.map((s, idx) => (
                        <a key={idx} href={s.uri} target="_blank" rel="noopener noreferrer" className="block text-cyan-400 hover:underline truncate">
                          • {s.title}
                        </a>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            ))}
            {isLoading && (
              <div className="flex justify-start">
                <div className="bg-white/5 p-4 rounded-2xl border border-white/5">
                  <div className="flex gap-1">
                    <span className="w-1.5 h-1.5 bg-cyan-400 rounded-full animate-bounce"></span>
                    <span className="w-1.5 h-1.5 bg-cyan-400 rounded-full animate-bounce [animation-delay:0.2s]"></span>
                    <span className="w-1.5 h-1.5 bg-cyan-400 rounded-full animate-bounce [animation-delay:0.4s]"></span>
                  </div>
                </div>
              </div>
            )}
          </div>

          <div className="p-6 border-t border-white/5 bg-black/40">
            <div className="relative">
              <input 
                type="text" 
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && handleSend()}
                placeholder="Synchronize request..."
                className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-4 text-white text-xs outline-none focus:border-cyan-400/40 transition-all placeholder:text-slate-600"
              />
              <button 
                onClick={handleSend}
                className="absolute right-2 top-1/2 -translate-y-1/2 p-2 text-cyan-400 hover:text-white transition-colors"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M14 5l7 7m0 0l-7 7m7-7H3" /></svg>
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

// --- Living Particle Background ---

const ParticleBackground: React.FC<{ isPaid?: boolean }> = ({ isPaid }) => {
  const location = useLocation();
  
  useEffect(() => {
    const canvas = document.getElementById('particle-canvas') as HTMLCanvasElement;
    if (!canvas) return;
    const ctx = canvas.getContext('2d', { alpha: false });
    if (!ctx) return;

    let particles: Particle[] = [];
    let animationFrameId: number;
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);
    
    const mouse = { x: 0, y: 0, radius: 120 };
    window.addEventListener('mousemove', (e) => {
      mouse.x = e.x;
      mouse.y = e.y;
    });

    class Particle {
      x: number; y: number; originX: number; originY: number;
      color: string; size: number; vx: number; vy: number;
      friction: number; ease: number;

      constructor(x: number, y: number, color: string) {
        this.x = Math.random() * width;
        this.y = Math.random() * height;
        this.originX = x;
        this.originY = y;
        this.color = color;
        this.size = Math.random() * 1.5 + 0.5;
        this.vx = 0;
        this.vy = 0;
        this.friction = 0.94;
        this.ease = 0.05;
      }

      draw() {
        if (!ctx) return;
        ctx.fillStyle = this.color;
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fill();
      }

      update() {
        const dx = mouse.x - this.x;
        const dy = mouse.y - this.y;
        const distance = Math.sqrt(dx * dx + dy * dy);
        
        if (distance < mouse.radius) {
          const forceX = dx / distance;
          const forceY = dy / distance;
          this.vx -= forceX * 1.2;
          this.vy -= forceY * 1.2;
        }

        this.vx += (this.originX - this.x) * this.ease;
        this.vy += (this.originY - this.y) * this.ease;
        this.vx *= this.friction;
        this.vy *= this.friction;
        this.x += this.vx;
        this.y += this.vy;
      }
    }

    const init = () => {
      particles = [];
      const tempCanvas = document.createElement('canvas');
      const tempCtx = tempCanvas.getContext('2d');
      if (!tempCtx) return;
      tempCanvas.width = width;
      tempCanvas.height = height;

      const text = 'HS';
      const fontSize = Math.min(width, height) * 0.45;
      
      tempCtx.font = `bold ${fontSize}px Outfit`;
      tempCtx.fillStyle = 'white';
      tempCtx.textAlign = 'center';
      tempCtx.textBaseline = 'middle';
      tempCtx.fillText(text, width / 2, height / 2.3);

      const pixels = tempCtx.getImageData(0, 0, width, height).data;
      const density = width < 768 ? 14 : 10; 

      for (let y = 0; y < height; y += density) {
        for (let x = 0; x < width; x += density) {
          const index = (y * width + x) * 4;
          if (pixels[index + 3] > 128) {
            const colors = isPaid 
              ? ['#10b981', '#34d399', '#059669', '#6ee7b7'] 
              : ['#00f2ff', '#2e5bff', '#6366f1', '#06b6d4'];
            const color = colors[Math.floor(Math.random() * colors.length)];
            particles.push(new Particle(x, y, color));
          }
        }
      }
    };

    const animate = () => {
      ctx.fillStyle = '#000000';
      ctx.fillRect(0, 0, width, height);

      ctx.globalAlpha = 0.1;
      for (let i = 0; i < 20; i++) {
        ctx.fillStyle = 'white';
        ctx.beginPath();
        ctx.arc((i * 157.5) % width, (i * 741.1) % height, 0.5, 0, Math.PI * 2);
        ctx.fill();
      }
      ctx.globalAlpha = 1.0;

      particles.forEach(p => {
        p.update();
        p.draw();
      });
      animationFrameId = requestAnimationFrame(animate);
    };

    const handleResize = () => {
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
      init();
    };

    window.addEventListener('resize', handleResize);
    init();
    animate();

    return () => {
      window.removeEventListener('resize', handleResize);
      cancelAnimationFrame(animationFrameId);
    };
  }, [isPaid, location.pathname]);

  return null;
};

// --- Shared Components ---

const Navbar: React.FC<{ user: User | null }> = ({ user }) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();
  const isActive = (path: string) => location.pathname === path || location.pathname.startsWith(path + '/');

  const navLinks = [
    { path: '/hospitals', label: 'Network' },
    { path: '/blood-connect', label: 'Blood' },
    { path: '/diagnostics', label: 'Labs' },
    { path: '/treatment', label: 'Treatment' },
    { path: '/profile', label: 'Customer Profiles' },
  ];

  return (
    <header className="sticky top-0 z-50">
      <div className="w-full glass border-b border-white/5 py-3 px-8">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <Link to="/" className="flex items-center gap-3 group" onClick={() => setIsMobileMenuOpen(false)}>
            <div className="w-8 h-8 bg-white/10 backdrop-blur-md border border-white/20 rounded-lg flex items-center justify-center text-white font-black text-lg transition-transform group-hover:scale-110">
              HS
            </div>
            <span className="text-xl font-black tracking-tight text-white uppercase font-display">
              Health<span className="text-cyan-400">care</span>
            </span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-6">
            {navLinks.map(link => (
              <Link 
                key={link.path}
                to={link.path} 
                className={`text-[10px] font-black uppercase tracking-[0.2em] transition-all hover:tracking-[0.3em] ${
                  isActive(link.path) ? 'text-cyan-400' : 'text-slate-400 hover:text-white'
                }`}
              >
                {link.label}
              </Link>
            ))}
          </nav>

          <div className="flex items-center gap-4">
            {user && (
              <div className="flex items-center gap-3">
                <span className="text-[10px] font-black text-slate-500 uppercase tracking-widest hidden lg:block">{user.name}</span>
                <div className="w-8 h-8 bg-cyan-400/10 border border-cyan-400/20 rounded-full flex items-center justify-center text-cyan-400 text-[10px] font-black">
                  {user.name[0]}
                </div>
              </div>
            )}
            
            {/* Hamburger Button */}
            <button 
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="md:hidden w-10 h-10 flex items-center justify-center text-white bg-white/5 rounded-xl border border-white/10 active:scale-90 transition-transform"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                {isMobileMenuOpen ? (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M6 18L18 6M6 6l12 12" />
                ) : (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M4 6h16M4 12h16m-7 6h7" />
                )}
              </svg>
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Navigation Overlay */}
      {isMobileMenuOpen && (
        <div className="md:hidden fixed inset-0 z-40 bg-black/98 backdrop-blur-3xl animate-in fade-in slide-in-from-top-4 duration-300">
           <div className="flex flex-col items-center justify-center h-full gap-8 p-12">
              <div className="text-[10px] font-black text-slate-500 uppercase tracking-[0.5em] mb-4">Neural Navigation Nodes</div>
              {navLinks.map(link => (
                <Link 
                  key={link.path}
                  to={link.path} 
                  onClick={() => setIsMobileMenuOpen(false)}
                  className={`text-2xl font-black uppercase tracking-[0.2em] transition-all py-4 w-full text-center border-b border-white/5 ${
                    isActive(link.path) ? 'text-cyan-400' : 'text-white/40 hover:text-white'
                  }`}
                >
                  {link.label}
                </Link>
              ))}
              <button 
                onClick={() => setIsMobileMenuOpen(false)}
                className="mt-12 px-8 py-4 bg-white/5 border border-white/10 text-slate-500 font-black text-[10px] uppercase tracking-[0.3em] rounded-2xl active:bg-white active:text-black transition-all"
              >
                Abort Sync
              </button>
           </div>
        </div>
      )}
    </header>
  );
};

// --- Diagnostics Lab Component ---

const DiagnosticsLab: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [bookingTest, setBookingTest] = useState<DiagnosticTest | null>(null);
  const [bookingStatus, setBookingStatus] = useState<'idle' | 'confirming' | 'processing' | 'success'>('idle');
  const categories = ['All', ...new Set(DIAGNOSTIC_TESTS.map(t => t.category))];

  const filteredTests = selectedCategory === 'All' 
    ? DIAGNOSTIC_TESTS 
    : DIAGNOSTIC_TESTS.filter(t => t.category === selectedCategory);

  const handleBook = (test: DiagnosticTest) => {
    setBookingTest(test);
    setBookingStatus('confirming');
  };

  const closeModal = () => {
    setBookingTest(null);
    setBookingStatus('idle');
  };

  return (
    <div className="p-8 md:p-12 max-w-7xl mx-auto min-h-screen">
       <div className="mb-16">
          <h2 className="text-4xl font-black text-white mb-4 tracking-tight">Diagnostics Lab Portal</h2>
          <p className="text-slate-500 font-medium max-w-2xl">Access precise biological data analysis. Schedule your clinical synchronization at any integrated node.</p>
       </div>

       <div className="mb-12">
          <label className="block text-[10px] font-black text-slate-500 uppercase tracking-[0.3em] mb-4">Test Profile Categories</label>
          <div className="flex flex-wrap gap-2">
             {categories.map(cat => (
               <button 
                 key={cat} 
                 onClick={() => setSelectedCategory(cat)}
                 className={`px-5 py-2 rounded-xl text-[10px] font-black uppercase tracking-widest border transition-all ${
                   selectedCategory === cat ? 'bg-cyan-400 border-cyan-400 text-black shadow-[0_0_15px_rgba(34,211,238,0.3)]' : 'bg-white/5 border-white/10 text-slate-400 hover:text-white'
                 }`}
               >
                 {cat}
               </button>
             ))}
          </div>
       </div>

       <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-20">
          {filteredTests.map(test => (
            <div key={test.id} className="glass p-8 rounded-[2.5rem] border border-white/5 flex flex-col group hover:border-cyan-400/30 transition-all scale-in">
               <div className="flex justify-between items-start mb-6">
                  <span className="px-3 py-1 bg-white/5 border border-white/10 rounded-lg text-[8px] font-black uppercase tracking-widest text-slate-400 group-hover:text-cyan-400 group-hover:border-cyan-400/20">
                    {test.category}
                  </span>
                  <div className="text-right">
                     <p className="text-slate-500 text-[8px] font-black uppercase tracking-widest">Turnaround</p>
                     <p className="text-white font-bold text-[11px]">{test.turnaroundTime}</p>
                  </div>
               </div>
               <h4 className="text-xl font-black text-white mb-8 group-hover:text-cyan-400 transition-colors leading-tight">{test.name}</h4>
               <div className="mt-auto flex items-center justify-between pt-6 border-t border-white/5">
                  <div>
                    <p className="text-slate-500 text-[8px] font-black uppercase tracking-widest mb-1">Standard Cost</p>
                    <p className="text-white font-black text-2xl tracking-tight">₹{test.price}</p>
                  </div>
                  <button 
                    onClick={() => handleBook(test)}
                    className="px-6 py-3 bg-white/5 border border-white/10 text-white rounded-xl font-black text-[9px] uppercase tracking-widest hover:bg-white hover:text-black transition-all"
                  >
                    Book
                  </button>
               </div>
            </div>
          ))}
       </div>

       {bookingTest && (
         <div className="fixed inset-0 z-[100] flex items-center justify-center p-6">
            <div className="absolute inset-0 bg-black/85 backdrop-blur-md" onClick={closeModal}></div>
            <div className="glass p-10 md:p-14 rounded-[3.5rem] border-white/15 shadow-[0_0_120px_rgba(34,211,238,0.25)] max-w-lg w-full scale-in relative z-10 overflow-hidden">
               {bookingStatus === 'confirming' || bookingStatus === 'processing' ? (
                 <>
                   <div className="flex items-center gap-5 mb-10">
                      <div className="w-16 h-16 bg-white/5 border border-white/10 rounded-2xl flex items-center justify-center text-cyan-400">
                         <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                           <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" />
                         </svg>
                      </div>
                      <div>
                        <h3 className="text-3xl font-black text-white tracking-tight leading-none mb-2">Sync Request</h3>
                        <p className="text-slate-500 font-black text-[9px] uppercase tracking-[0.3em]">Diagnostics Phase 1</p>
                      </div>
                   </div>

                   <div className="space-y-6 mb-12">
                      <div className="p-8 bg-white/5 rounded-3xl border border-white/5">
                         <p className="text-slate-500 text-[8px] font-black uppercase tracking-[0.2em] mb-2">Analysis Profile</p>
                         <p className="text-white font-bold text-2xl tracking-tight mb-1">{bookingTest.name}</p>
                         <div className="flex items-center gap-2">
                            <span className="text-cyan-400 font-black text-[10px] uppercase tracking-widest">{bookingTest.category}</span>
                            <span className="w-1 h-1 bg-slate-700 rounded-full"></span>
                            <span className="text-slate-400 text-[10px] font-medium italic">{bookingTest.turnaroundTime} Delivery</span>
                         </div>
                      </div>

                      <div className="flex gap-4">
                         <div className="flex-1 p-6 bg-white/5 rounded-3xl border border-white/5">
                            <p className="text-slate-500 text-[8px] font-black uppercase tracking-[0.2em] mb-2">Cost</p>
                            <p className="text-white font-black text-2xl tracking-tight">₹{bookingTest.price}</p>
                         </div>
                         <div className="flex-1 p-6 bg-cyan-400/10 rounded-3xl border border-cyan-400/20">
                            <p className="text-cyan-400 text-[8px] font-black uppercase tracking-[0.2em] mb-2">Protocol Status</p>
                            <p className="text-white font-black text-xl tracking-tight uppercase">Ready</p>
                         </div>
                      </div>
                   </div>

                   <div className="flex flex-col gap-4">
                      <button 
                        onClick={() => setBookingStatus('processing')}
                        disabled={bookingStatus === 'processing'}
                        className="w-full py-5 bg-cyan-400 text-black font-black text-[11px] uppercase tracking-[0.3em] rounded-2xl hover:bg-cyan-300 transform active:scale-95 transition-all shadow-[0_15px_40px_rgba(34,211,238,0.3)] disabled:opacity-50"
                      >
                        {bookingStatus === 'processing' ? 'Synchronizing...' : 'Confirm Sync'}
                      </button>
                      <button onClick={closeModal} className="text-slate-500 font-black text-[10px] uppercase tracking-widest py-2 hover:text-white transition-colors">Abort Request</button>
                   </div>
                 </>
               ) : (
                 <div className="text-center py-10 scale-in">
                    <div className="w-24 h-24 bg-emerald-500/10 border border-emerald-500/20 rounded-full flex items-center justify-center mx-auto mb-10 text-emerald-400">
                       <svg className="w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                         <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M5 13l4 4L19 7" />
                       </svg>
                    </div>
                    <h3 className="text-4xl font-black text-white mb-4 tracking-tighter">Sync Verified</h3>
                    <p className="text-slate-400 font-medium mb-12">Analysis profile synchronized. Proceed to any network node for biometric capture.</p>
                    
                    <button 
                      onClick={closeModal}
                      className="w-full py-5 bg-white text-black font-black text-[11px] uppercase tracking-[0.3em] rounded-2xl hover:scale-[1.02] transition-all"
                    >
                      Return to Portal
                    </button>
                 </div>
               )}
            </div>
         </div>
       )}
    </div>
  );
};

// --- Blood Connect Component ---

const BloodConnect: React.FC = () => {
  const [filter, setFilter] = useState<BloodType | 'All'>('All');
  const [broadcasting, setBroadcasting] = useState(false);
  const [results, setResults] = useState<Donor[]>([]);

  const runMatcher = () => {
    setBroadcasting(true);
    setResults([]);
    setTimeout(() => {
      const matched = filter === 'All' ? MOCK_DONORS : MOCK_DONORS.filter(d => d.bloodType === filter);
      setResults(matched);
      setBroadcasting(false);
    }, 1500);
  };

  return (
    <div className="p-8 md:p-12 max-w-6xl mx-auto min-h-screen">
       <div className="mb-16">
          <h2 className="text-4xl font-black text-white mb-4 tracking-tight">Blood Connect</h2>
          <p className="text-slate-500 font-medium max-w-2xl">Initialize global synchronization to find compatible biological signatures within your medical precinct.</p>
       </div>

       <div className="glass p-12 rounded-[3.5rem] mb-12 flex flex-col md:flex-row items-center justify-between gap-8 scale-in">
          <div className="flex-1 w-full">
             <label className="block text-[10px] font-black text-slate-500 uppercase tracking-[0.3em] mb-4">Required Biological Signature</label>
             <div className="flex flex-wrap gap-2">
                {['All', ...Object.values(BloodType)].map(type => (
                  <button 
                    key={type} 
                    onClick={() => setFilter(type as any)}
                    className={`px-4 py-2 rounded-xl text-[10px] font-black uppercase tracking-widest border transition-all ${
                      filter === type ? 'bg-cyan-400 border-cyan-400 text-black' : 'bg-white/5 border-white/10 text-slate-400 hover:text-white'
                    }`}
                  >
                    {type}
                  </button>
                ))}
             </div>
          </div>
          <button 
            onClick={runMatcher}
            disabled={broadcasting}
            className="px-12 py-6 bg-cyan-400 text-black font-black rounded-3xl text-[10px] uppercase tracking-[0.3em] shadow-[0_0_40px_rgba(34,211,238,0.2)] disabled:opacity-50 transition-all hover:scale-105"
          >
            {broadcasting ? 'Searching...' : 'Find donors'}
          </button>
       </div>

       {broadcasting && (
         <div className="flex items-center justify-center py-20">
            <div className="w-20 h-20 border-t-2 border-cyan-400 rounded-full animate-spin"></div>
         </div>
       )}

       {!broadcasting && results.length > 0 && (
         <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-20 scale-in">
            {results.map(donor => (
              <div key={donor.id} className="glass p-10 rounded-[2.5rem] border border-white/5 flex flex-col group hover:border-cyan-400/30 transition-all">
                <div className="flex justify-between items-start mb-8">
                  <div className="w-14 h-14 bg-white/5 rounded-2xl flex items-center justify-center text-white font-black text-2xl group-hover:text-cyan-400 transition-colors">
                    {donor.name[0]}
                  </div>
                  <span className={`px-3 py-1 rounded-lg text-[9px] font-black uppercase tracking-widest ${
                    donor.availability === 'Available' ? 'bg-emerald-500/10 text-emerald-400' : 'bg-amber-500/10 text-amber-400'
                  }`}>
                    {donor.availability}
                  </span>
                </div>
                <h4 className="text-xl font-black text-white mb-2">{donor.name}</h4>
                <div className="flex items-center gap-3 mb-10">
                   <span className="text-cyan-400 font-black text-3xl tracking-tighter">{donor.bloodType}</span>
                   <span className="text-[10px] font-black text-slate-500 uppercase tracking-widest">{donor.location}</span>
                </div>
                <button className="mt-auto py-4 bg-white/5 border border-white/10 text-white rounded-2xl font-black text-[9px] uppercase tracking-widest hover:bg-white hover:text-black transition-all">
                  Request Sync
                </button>
              </div>
            ))}
         </div>
       )}
    </div>
  );
};

// --- Profile Page ---

const ProfilePage: React.FC<{ user: User; onSwitchUser: (u: User) => void }> = ({ user, onSwitchUser }) => {
  const [searchTerm, setSearchTerm] = useState('');
  
  const filteredUsers = MOCK_USERS.filter(u => 
    u.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    u.protocolName.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="p-8 md:p-12 max-w-7xl mx-auto min-h-screen">
      <div className="mb-12">
        <h2 className="text-4xl font-black text-white tracking-tight mb-2">Customer Profile Matrix</h2>
        <p className="text-slate-500 font-medium">Global Medical Identity Directory • Premium Tier</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        <div className="lg:col-span-1 space-y-6">
           <div className="space-y-4">
              <h4 className="text-[10px] font-black text-slate-500 uppercase tracking-[0.4em]">Directory Search</h4>
              <div className="relative">
                <input 
                  type="text"
                  placeholder="SEARCH NODES..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full bg-white/5 border border-white/10 rounded-2xl px-4 py-3 text-white text-[10px] font-black uppercase tracking-widest outline-none focus:border-cyan-400/40 transition-all placeholder:text-slate-700"
                />
                <div className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-700">
                   <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" /></svg>
                </div>
              </div>
           </div>

           <div className="space-y-4">
              <h4 className="text-[10px] font-black text-slate-500 uppercase tracking-[0.4em]">Select Identity</h4>
              <div className="space-y-2 max-h-[60vh] overflow-y-auto no-scrollbar pr-2">
                 {filteredUsers.length > 0 ? (
                   filteredUsers.map(u => (
                     <button 
                       key={u.id}
                       onClick={() => onSwitchUser(u)}
                       className={`w-full text-left p-4 rounded-2xl border transition-all flex items-center gap-4 group ${
                         user.id === u.id ? 'bg-cyan-400 border-cyan-400 text-black' : 'bg-white/5 border-white/10 text-white hover:bg-white/10'
                       }`}
                     >
                        <div className={`w-10 h-10 rounded-xl flex items-center justify-center font-black flex-shrink-0 ${
                          user.id === u.id ? 'bg-black/20 text-black' : 'bg-cyan-400/20 text-cyan-400'
                        }`}>
                          {u.name[0]}
                        </div>
                        <div className="flex-1 min-w-0">
                           <p className="font-black text-xs truncate uppercase tracking-tighter">{u.name}</p>
                           <p className={`text-[8px] font-bold uppercase tracking-widest truncate ${user.id === u.id ? 'text-black/50' : 'text-slate-500'}`}>
                             {u.protocolName}
                           </p>
                        </div>
                     </button>
                   ))
                 ) : (
                   <div className="p-8 text-center glass rounded-2xl border-dashed border-white/5">
                      <p className="text-[8px] font-black text-slate-700 uppercase tracking-widest">No Identity Found</p>
                   </div>
                 )}
              </div>
           </div>
        </div>

        <div className="lg:col-span-3 space-y-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 scale-in" key={user.id}>
            <div className="glass p-10 rounded-[3rem] border-white/5 flex flex-col items-center text-center">
               <div className="w-24 h-24 bg-cyan-400/10 border border-cyan-400/20 rounded-[2rem] flex items-center justify-center text-white font-black text-3xl mb-6 shadow-inner">
                 {user.name.split(' ').map(n => n[0]).join('')}
               </div>
               <h3 className="text-2xl font-black text-white mb-1 uppercase tracking-tighter">{user.name}</h3>
               <span className="px-3 py-1 bg-cyan-400/10 text-cyan-400 text-[8px] font-black uppercase tracking-widest rounded-full border border-cyan-400/20 mb-8">HS verified</span>
               
               <div className="w-full space-y-6 text-left border-t border-white/5 pt-8">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <p className="text-slate-500 text-[8px] font-black uppercase tracking-widest mb-1">Identity</p>
                      <p className="text-white font-bold text-sm">{user.gender}, {user.age}Y</p>
                    </div>
                    <div>
                      <p className="text-slate-500 text-[8px] font-black uppercase tracking-widest mb-1">Blood</p>
                      <p className="text-cyan-400 font-bold text-sm">{user.bloodType}</p>
                    </div>
                  </div>
                  <div>
                     <p className="text-slate-500 text-[8px] font-black uppercase tracking-widest mb-1">Terminal</p>
                     <p className="text-white font-bold text-sm">{user.phone}</p>
                     <p className="text-slate-400 text-xs truncate">{user.email}</p>
                  </div>
                  <div className="p-4 bg-white/5 rounded-2xl border border-white/5">
                     <p className="text-slate-500 text-[8px] font-black uppercase tracking-widest mb-1">Insurance Node</p>
                     <p className="text-white font-bold text-sm">{user.insuranceProvider}</p>
                     <p className="text-cyan-400 text-[10px] font-black tracking-widest">{user.insuranceId}</p>
                  </div>
               </div>
            </div>

            <div className="space-y-8">
               <div className="glass p-8 rounded-[2.5rem] border-white/5">
                  <h4 className="text-[10px] font-black text-slate-500 uppercase tracking-[0.4em] mb-6">Current Protocol</h4>
                  <div className="p-5 bg-cyan-400/10 border border-cyan-400/20 rounded-2xl mb-4">
                    <p className="text-cyan-400 font-black text-xs uppercase tracking-widest mb-2">{user.protocolName}</p>
                    <p className="text-white text-sm leading-relaxed italic">"{user.protocolDescription}"</p>
                  </div>
                  <p className="text-slate-500 text-[10px] font-black uppercase tracking-widest">Ongoing at Cluster: <span className="text-white">{HOSPITALS.find(h => h.id === user.activeTreatmentId)?.name || 'N/A'}</span></p>
               </div>

               <div className="glass p-8 rounded-[2.5rem] border-white/5">
                  <h4 className="text-[10px] font-black text-slate-500 uppercase tracking-[0.4em] mb-6">Clinical History</h4>
                  <ul className="space-y-3">
                     {user.medicalHistory?.map((h, i) => (
                       <li key={i} className="flex items-center gap-3 text-white font-medium text-xs">
                          <div className="w-1.5 h-1.5 bg-amber-400 rounded-full"></div>
                          {h}
                       </li>
                     ))}
                  </ul>
               </div>
            </div>
          </div>

          <div className="space-y-8">
            <h4 className="text-[10px] font-black text-slate-500 uppercase tracking-[0.4em] mb-4 pl-2 border-l-2 border-cyan-400">Temporal Synchronization Logs</h4>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {user.treatmentLogs.map((log) => (
                <div key={log.day} className="glass p-6 rounded-[2rem] border border-white/5">
                  <div className="flex justify-between items-center mb-4">
                    <span className="text-white font-black text-sm">DAY {log.day}</span>
                    <span className={`px-2 py-1 rounded text-[8px] font-black uppercase tracking-widest ${
                      log.status === 'Completed' ? 'bg-emerald-500/10 text-emerald-400' : 'bg-amber-500/10 text-amber-400'
                    }`}>{log.status}</span>
                  </div>
                  <p className="text-slate-400 text-xs italic mb-4 leading-relaxed">"{log.notes}"</p>
                  <div className="flex gap-4">
                    <div className="px-3 py-1 bg-white/5 rounded-lg border border-white/5">
                       <p className="text-[7px] font-black text-slate-500 uppercase mb-0.5">BP</p>
                       <p className="text-white font-bold text-[10px]">{log.vitals.bp}</p>
                    </div>
                    <div className="px-3 py-1 bg-white/5 rounded-lg border border-white/5">
                       <p className="text-[7px] font-black text-slate-500 uppercase mb-0.5">PULSE</p>
                       <p className="text-white font-bold text-[10px]">{log.vitals.pulse} BPM</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="space-y-8">
            <h4 className="text-[10px] font-black text-slate-500 uppercase tracking-[0.4em] mb-4 pl-2 border-l-2 border-cyan-400">Archival Consultation Records</h4>
            <div className="grid grid-cols-1 gap-6">
              {user.pastConsultations && user.pastConsultations.length > 0 ? (
                user.pastConsultations.map((consult) => (
                  <div key={consult.id} className="glass p-8 rounded-[2.5rem] border border-white/5 flex flex-col md:flex-row gap-8 items-start hover:border-cyan-400/20 transition-all group">
                    <div className="flex-1">
                      <div className="flex justify-between items-start mb-4">
                        <span className="text-cyan-400 font-black text-[10px] uppercase tracking-widest">{consult.date}</span>
                        <span className="px-2 py-1 bg-white/5 rounded-lg text-[8px] font-black uppercase tracking-tighter text-slate-500 group-hover:text-white transition-colors">{consult.specialty}</span>
                      </div>
                      <h5 className="text-xl font-black text-white mb-1">{consult.doctorName}</h5>
                      <p className="text-slate-500 text-[10px] font-bold uppercase tracking-widest mb-4">{consult.hospitalName}</p>
                      <div className="bg-white/[0.02] p-4 rounded-2xl border border-white/5">
                        <p className="text-slate-400 text-xs leading-relaxed italic">"{consult.summary}"</p>
                      </div>
                    </div>
                  </div>
                ))
              ) : (
                <div className="py-20 text-center glass rounded-[3rem] border-dashed border-white/10">
                  <p className="text-slate-600 font-bold uppercase text-[10px] tracking-widest">No archival encounters recorded.</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

// --- Treatment Flow Component ---

const TreatmentFlow: React.FC<{ 
  user: User;
  onFinish: () => void;
  isPaid: boolean;
  onPay: () => void;
  recoveryDay: number;
  onProgressDay: () => void;
}> = ({ user, onFinish, isPaid, onPay, recoveryDay, onProgressDay }) => {
  const navigate = useNavigate();
  const [aiInsight, setAiInsight] = useState<string | null>(null);
  const [isPaying, setIsPaying] = useState(false);

  const displayHospital = HOSPITALS.find(h => h.id === user.activeTreatmentId) || HOSPITALS[0];
  const displayDoctor = displayHospital.doctors.find(d => d.id === user.activeDoctorId) || displayHospital.doctors[0];

  const fetchInsight = async () => {
    setAiInsight(null);
    const result = await getTreatmentInsight(user.treatmentLogs.filter(l => l.status === 'Completed'));
    setAiInsight(result);
  };

  const handlePayment = () => {
    setIsPaying(true);
    setTimeout(() => {
      setIsPaying(false);
      onPay();
    }, 2000);
  };

  return (
    <div className="p-8 md:p-12 max-w-5xl mx-auto min-h-screen">
      <div className="mb-16 flex flex-col md:flex-row md:items-end justify-between gap-8">
        <div>
          <div className="flex items-center gap-2 text-cyan-400 font-black text-[10px] uppercase tracking-[0.3em] mb-3">
            <span className="w-8 h-[1px] bg-cyan-400"></span>
            Recovery Node: Day {recoveryDay}/10
          </div>
          <h2 className="text-4xl font-black text-white mb-2 tracking-tight">Consultant: {displayDoctor.name}</h2>
          <p className="text-slate-500 font-medium">{displayHospital.name}</p>
        </div>
        <div className="flex gap-4">
          <button onClick={onProgressDay} className="px-6 py-4 glass border-white/10 text-white font-black rounded-2xl text-[10px] uppercase tracking-widest transition-all">Sync Vitals</button>
          <button onClick={fetchInsight} className="px-8 py-4 glass border-cyan-400/30 text-cyan-400 hover:bg-cyan-400 hover:text-black font-black rounded-2xl text-[10px] uppercase tracking-widest transition-all">AI Insight</button>
        </div>
      </div>

      <div className="mb-16 space-y-10">
         <div className="flex items-center justify-between">
            <h4 className="text-[10px] font-black text-slate-500 uppercase tracking-[0.4em] pl-2 border-l-2 border-cyan-400">Protocol Status</h4>
            <span className="px-3 py-1 bg-cyan-400/10 text-cyan-400 text-[8px] font-black uppercase tracking-widest border border-cyan-400/20 rounded-lg">HS Verified Node</span>
         </div>
         
         <div className="glass p-10 rounded-[3rem] border-white/5 relative overflow-hidden group hover:border-cyan-400/30 transition-all">
            <div className="absolute top-0 right-0 w-32 h-32 bg-cyan-400/5 blur-[40px] rounded-full translate-x-1/2 -translate-y-1/2 pointer-events-none"></div>
            <div className="flex items-center gap-4 mb-6">
               <div className="w-12 h-12 bg-cyan-400/10 rounded-2xl flex items-center justify-center text-cyan-400 border border-cyan-400/20 shadow-inner">
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                     <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                  </svg>
               </div>
               <div>
                  <h5 className="text-xl font-black text-white leading-none mb-1">{user.protocolName}</h5>
                  <p className="text-slate-500 text-[8px] font-black uppercase tracking-widest">Active recovery stream</p>
               </div>
            </div>
            <p className="text-slate-400 text-sm leading-relaxed font-medium">
               {user.protocolDescription}
            </p>
         </div>
      </div>

      {aiInsight && (
        <div className="mb-16 glass p-10 rounded-[2.5rem] border-cyan-500/20 scale-in italic">
          <h4 className="text-[10px] font-black text-cyan-400 uppercase tracking-widest mb-4">Neural Analysis Insight</h4>
          <p className="text-white text-lg">"{aiInsight}"</p>
        </div>
      )}

      <div className="space-y-8 mb-16">
        <h4 className="text-[10px] font-black text-slate-500 uppercase tracking-[0.4em] mb-6 pl-2 border-l-2 border-cyan-400">Synchronization Logs</h4>
        {user.treatmentLogs.map(log => (
          <div key={log.day} className={`glass p-8 rounded-[2rem] border transition-all ${log.day === recoveryDay ? 'border-amber-400/20 bg-amber-400/5 shadow-[0_0_50px_rgba(251,191,36,0.05)]' : 'border-white/5 opacity-60'}`}>
            <div className="flex items-center justify-between mb-4">
               <h5 className="text-2xl font-black text-white">Day {log.day} {log.day === recoveryDay && '(Active Node)'}</h5>
               <span className={`px-3 py-1 rounded-lg text-[8px] font-black uppercase tracking-widest ${
                 log.status === 'Completed' ? 'bg-emerald-500/10 text-emerald-400' : 
                 log.status === 'Active' ? 'bg-amber-500/10 text-amber-400' : 'bg-slate-500/10 text-slate-500'
               }`}>
                 {log.status}
               </span>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-start">
               <p className="text-slate-300 italic leading-relaxed">"{log.notes}"</p>
               <div className="flex flex-wrap gap-4">
                  <div className="px-4 py-2 bg-white/5 rounded-xl border border-white/5">
                     <p className="text-[8px] font-black text-slate-500 uppercase mb-1">Pressure</p>
                     <p className="text-white font-bold text-sm">{log.vitals.bp}</p>
                  </div>
                  <div className="px-4 py-2 bg-white/5 rounded-xl border border-white/5">
                     <p className="text-[8px] font-black text-slate-500 uppercase mb-1">Pulse</p>
                     <p className="text-white font-bold text-sm">{log.vitals.pulse} BPM</p>
                  </div>
               </div>
            </div>
          </div>
        ))}
      </div>

      <div className="space-y-16 mb-24">
        {/* Past Consultations Section */}
        <section>
          <h4 className="text-[10px] font-black text-slate-500 uppercase tracking-[0.4em] mb-8 pl-2 border-l-2 border-cyan-400">Past Consultations</h4>
          <div className="grid grid-cols-1 gap-6">
            {user.pastConsultations && user.pastConsultations.length > 0 ? (
              user.pastConsultations.map(consult => (
                <div key={consult.id} className="glass p-8 rounded-[2rem] border border-white/5 group hover:border-cyan-400/20 transition-all">
                  <div className="flex justify-between items-start mb-4">
                    <span className="text-cyan-400 font-black text-[9px] uppercase tracking-widest">{consult.date}</span>
                    <span className="px-2 py-1 bg-white/5 rounded-lg text-[8px] font-black uppercase tracking-widest text-slate-500 uppercase">{consult.specialty}</span>
                  </div>
                  <h5 className="text-xl font-black text-white mb-1 group-hover:text-cyan-400 transition-colors">{consult.doctorName}</h5>
                  <p className="text-slate-500 text-[10px] font-bold uppercase tracking-widest mb-4">{consult.hospitalName}</p>
                  <p className="text-slate-400 text-xs italic leading-relaxed">"{consult.summary}"</p>
                </div>
              ))
            ) : (
              <div className="p-12 text-center glass rounded-[2rem] border-dashed border-white/5">
                <p className="text-[10px] font-black text-slate-700 uppercase tracking-widest">No past consultations recorded.</p>
              </div>
            )}
          </div>
        </section>

        {/* Diagnostic History Section */}
        <section>
          <h4 className="text-[10px] font-black text-slate-500 uppercase tracking-[0.4em] mb-8 pl-2 border-l-2 border-cyan-400">Diagnostic History</h4>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {user.diagnosticHistory && user.diagnosticHistory.length > 0 ? (
              user.diagnosticHistory.map(record => (
                <div key={record.id} className="glass p-8 rounded-[2rem] border border-white/5">
                  <div className="flex justify-between items-center mb-6">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-white/5 rounded-xl flex items-center justify-center text-cyan-400">
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" /></svg>
                      </div>
                      <div>
                        <p className="text-white font-black text-sm uppercase tracking-tight">{record.testName}</p>
                        <p className="text-slate-500 text-[8px] font-black uppercase tracking-widest">{record.date}</p>
                      </div>
                    </div>
                    <span className={`px-2 py-1 rounded text-[7px] font-black uppercase tracking-widest ${
                      record.status === 'Critical' ? 'bg-red-500/10 text-red-400' : 'bg-emerald-500/10 text-emerald-400'
                    }`}>{record.status}</span>
                  </div>
                  
                  <div className="space-y-4">
                    <div className="p-4 bg-black/40 rounded-xl border border-white/5">
                      <p className="text-slate-500 text-[8px] font-black uppercase tracking-widest mb-1">Result Summary</p>
                      <p className="text-white font-bold text-xs">{record.result}</p>
                    </div>
                    <div className="flex justify-between items-center px-1">
                      <p className="text-slate-500 text-[8px] font-black uppercase tracking-widest">{record.labName}</p>
                      <button className="text-cyan-400 font-black text-[8px] uppercase tracking-widest hover:text-white transition-colors">View Report</button>
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <div className="md:col-span-2 p-12 text-center glass rounded-[2rem] border-dashed border-white/5">
                <p className="text-[10px] font-black text-slate-700 uppercase tracking-widest">No diagnostic records detected.</p>
              </div>
            )}
          </div>
        </section>
      </div>

      <div className="border-t border-white/5 pt-16 mb-24">
        <div className={`glass p-12 rounded-[3.5rem] text-center transition-all ${isPaid ? 'border-emerald-500/30 bg-emerald-500/[0.02]' : 'border-cyan-400/10'}`}>
           <h3 className="text-3xl font-black text-white mb-4">Medical Ledger Settlement</h3>
           {!isPaid ? (
             <button onClick={handlePayment} disabled={isPaying} className="px-12 py-5 bg-cyan-400 text-black font-black rounded-2xl text-[11px] uppercase tracking-widest disabled:opacity-50">
               {isPaying ? 'Processing Node...' : 'Settle Session: ₹18,900'}
             </button>
           ) : (
             <div className="space-y-6">
                <div className="p-6 bg-emerald-500/10 border border-emerald-500/20 rounded-2xl text-emerald-400 font-black text-[10px] uppercase tracking-widest">
                  Authentication Success: Secure Ledger Verified
                </div>
                <button onClick={() => {alert("Session Closed Successfully."); onFinish(); navigate('/hospitals');}} className="w-full py-5 bg-white text-black font-black rounded-2xl text-[11px] uppercase tracking-widest">
                  End Active Session
                </button>
             </div>
           )}
        </div>
      </div>
    </div>
  );
};

// --- Hospital Explorer Component ---

const HospitalExplorer: React.FC = () => {
  const navigate = useNavigate();
  const [selectedSpecialty, setSelectedSpecialty] = useState<string>('All');
  const [isSpecialtyOpen, setIsSpecialtyOpen] = useState(false);
  const [specialtySearch, setSpecialtySearch] = useState('');
  
  const dropdownRef = useRef<HTMLDivElement>(null);
  const allDoctorSpecialties = ['All', ...new Set(HOSPITALS.flatMap(h => h.doctors.map(d => d.specialty)))];

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsSpecialtyOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);
  
  const filteredHospitals = HOSPITALS.filter(h => {
    const matchesDoctorSpecialty = selectedSpecialty === 'All' || 
                                   h.doctors.some(d => d.specialty === selectedSpecialty);
                                   
    return matchesDoctorSpecialty;
  });

  const filteredSpecialtiesList = allDoctorSpecialties.filter(s => 
    s.toLowerCase().includes(specialtySearch.toLowerCase())
  );

  return (
    <div className="p-8 md:p-12 max-w-7xl mx-auto min-h-screen">
      <div className="mb-16 grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        <div className="lg:col-span-3">
          <h2 className="text-5xl md:text-6xl font-black text-white mb-6 tracking-tighter leading-none">Select<br/>Medical<br/>Node</h2>
          <p className="text-slate-500 font-medium mb-10 text-sm leading-relaxed max-w-[200px]">Explore global nodes with specialized clinical synchronization.</p>
        </div>

        <div className="lg:col-span-2 flex items-center justify-center pt-8 lg:pt-20">
           <a 
             href="tel:112"
             className="text-cyan-400 font-black text-[10px] uppercase tracking-[0.2em] whitespace-nowrap hover:text-white transition-colors"
           >
             medical emergency
           </a>
        </div>

        <div className="lg:col-span-7">
          <div className="mb-6">
            <label className="text-[10px] font-black text-slate-500 uppercase tracking-[0.4em] ml-1">Specialties Filter</label>
          </div>
          
          {/* Custom Searchable Dropdown */}
          <div className="relative max-w-sm" ref={dropdownRef}>
             <button 
               onClick={() => setIsSpecialtyOpen(!isSpecialtyOpen)}
               className="w-full px-6 py-4 glass border-white/10 rounded-2xl text-white outline-none flex items-center justify-between transition-all hover:border-white/20 group"
             >
                <span className="font-black text-[10px] uppercase tracking-[0.25em]">{selectedSpecialty}</span>
                <svg className={`w-5 h-5 text-cyan-400 transition-transform ${isSpecialtyOpen ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M19 9l-7 7-7-7" />
                </svg>
             </button>

             {isSpecialtyOpen && (
                <div className="absolute z-50 top-full left-0 right-0 mt-2 glass border-white/15 rounded-2xl shadow-2xl overflow-hidden animate-in fade-in slide-in-from-top-4 duration-200">
                   <div className="p-4 border-b border-white/10 bg-white/5">
                      <input 
                        type="text"
                        placeholder="SEARCH SPECIALTIES..."
                        autoFocus
                        value={specialtySearch}
                        onChange={(e) => setSpecialtySearch(e.target.value)}
                        className="w-full bg-transparent border-none outline-none text-white font-black text-[10px] uppercase tracking-[0.1em] placeholder-slate-600"
                      />
                   </div>
                   <div className="max-h-60 overflow-y-auto no-scrollbar">
                      {filteredSpecialtiesList.length > 0 ? (
                        filteredSpecialtiesList.map(spec => (
                          <button 
                            key={spec}
                            onClick={() => {
                              setSelectedSpecialty(spec);
                              setIsSpecialtyOpen(false);
                              setSpecialtySearch('');
                            }}
                            className={`w-full text-left px-6 py-4 font-bold text-[10px] uppercase tracking-widest transition-colors ${
                              selectedSpecialty === spec 
                                ? 'bg-cyan-400 text-black' 
                                : 'text-slate-400 hover:bg-white/10 hover:text-white'
                            }`}
                          >
                            {spec}
                          </button>
                        ))
                      ) : (
                        <div className="px-6 py-4 text-[10px] font-black text-slate-600 uppercase tracking-widest">No results found</div>
                      )}
                   </div>
                </div>
             )}
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {filteredHospitals.map(h => (
          <div key={h.id} className="glass rounded-[2.5rem] overflow-hidden group hover:border-cyan-500/30 transition-all scale-in flex flex-col h-full bg-black/20">
            <div className="h-64 w-full overflow-hidden relative flex-shrink-0 bg-neutral-900 border-b border-white/5">
              <img 
                src={h.image} 
                className="h-full w-full object-cover group-hover:scale-105 transition-transform duration-1000" 
                alt={h.name} 
                onError={(e) => {
                  (e.target as HTMLImageElement).src = 'https://images.unsplash.com/photo-1512678080530-7760d81faba6?auto=format&fit=crop&q=80&w=1000';
                }}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent"></div>
              <div className="absolute inset-x-0 top-0 h-[1px] bg-white/10"></div>
            </div>
            
            <div className="p-10 flex flex-col flex-1 bg-black/40 backdrop-blur-md">
              <h3 className="text-2xl font-black text-white mb-2 group-hover:text-cyan-400 transition-colors tracking-tight leading-tight">{h.name}</h3>
              <p className="text-slate-400 text-sm mb-6 leading-relaxed flex-1 font-medium">{h.address}</p>
              
              <div className="mb-8 flex flex-wrap gap-2">
                {h.specialties.slice(0, 4).map(spec => (
                  <span 
                    key={spec} 
                    className="px-2 py-1.5 rounded-xl text-[8px] font-bold bg-white/5 border border-white/10 text-slate-400 uppercase tracking-widest"
                  >
                    {spec}
                  </span>
                ))}
                {h.specialties.length > 4 && <span className="text-[8px] text-slate-500 font-black flex items-center">+{h.specialties.length - 4} More</span>}
              </div>

              <button 
                onClick={() => navigate(`/hospital/${h.id}`)} 
                className="w-full py-5 bg-white/5 border border-white/10 text-white rounded-2xl text-[10px] font-black uppercase tracking-widest hover:bg-white hover:text-black transition-all shadow-xl"
              >
                See Details
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

// --- Hospital Profile Wrapper Component ---

const HospitalProfileWrapper = ({ onBook }: { onBook: (h: Hospital, d: Doctor) => void }) => {
  const navigate = useNavigate();
  const { id } = useParams();
  const hospital = HOSPITALS.find(h => h.id === id);
  const [selectedSlots, setSelectedSlots] = useState<Record<string, string>>({});
  const [confirmingDoctor, setConfirmingDoctor] = useState<Doctor | null>(null);

  if (!hospital) return <div className="p-20 text-center">Node Not Found</div>;

  const handleSlotSelect = (doctorId: string, slot: string) => {
    setSelectedSlots(prev => ({ ...prev, [doctorId]: slot }));
  };

  const handleFinalConfirm = () => {
    if (confirmingDoctor) {
      onBook(hospital, confirmingDoctor);
      setConfirmingDoctor(null);
    }
  };

  return (
    <div className="p-8 md:p-12 max-w-6xl mx-auto min-h-screen">
       <button onClick={() => navigate('/hospitals')} className="mb-10 text-slate-500 font-black text-[10px] uppercase tracking-widest transition-colors hover:text-white">&larr; Return to Network</button>
       
       <div className="glass p-12 md:p-16 rounded-[3.5rem] border-white/5 scale-in mb-16 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-cyan-400/5 blur-[120px] rounded-full translate-x-1/2 -translate-y-1/2 pointer-events-none"></div>
          
          <div className="mb-12 relative z-10">
              <h2 className="text-6xl font-black text-white mb-4 tracking-tighter leading-tight">{hospital.name}</h2>
              <p className="text-slate-400 font-medium text-sm md:text-lg italic opacity-80 border-l-2 border-cyan-400 pl-4">{hospital.description}</p>
          </div>
          
          <div className="space-y-12 relative z-10">
             {hospital.doctors.map(d => (
               <div key={d.id} className="p-10 glass rounded-[3.5rem] border border-white/5 flex flex-col lg:flex-row gap-12 group transition-all hover:bg-white/[0.02]">
                  <div className="flex-shrink-0 relative">
                    <div className="relative">
                       <img src={d.image} className="w-48 h-48 rounded-[2.5rem] object-cover border-4 border-white/10 group-hover:border-cyan-400/30 transition-all shadow-2xl relative z-10" alt={d.name} />
                       <div className="absolute -right-6 -bottom-6 flex flex-col gap-2 z-20">
                          <div className="bg-[#0a0a0a] border border-white/15 px-4 py-2 rounded-xl shadow-xl flex items-center gap-3">
                             <span className="text-amber-400 text-lg">★</span>
                             <span className="text-white font-black text-sm">{d.rating}</span>
                          </div>
                       </div>
                    </div>
                  </div>

                  <div className="flex-1">
                    <div className="mb-6">
                      <h5 className="text-3xl font-black text-white tracking-tight mb-1">{d.name}</h5>
                      <p className="text-cyan-400 text-[11px] font-black uppercase tracking-[0.25em]">{d.specialty}</p>
                    </div>

                    <div className="bg-white/[0.01] border-l-2 border-cyan-400/30 p-6 rounded-r-2xl mb-8">
                       <p className="text-slate-300 text-sm leading-relaxed italic font-medium">"{d.bio}"</p>
                       <div className="mt-4 pt-4 border-t border-white/5">
                          <p className="text-cyan-400 font-black text-[9px] uppercase tracking-[0.2em] mb-1">Clinical Experience</p>
                          <p className="text-white font-bold text-xs">{d.experience} Years of advanced practice</p>
                       </div>
                    </div>

                    <div className="mb-8">
                       <label className="block text-[9px] font-black text-slate-500 uppercase tracking-widest mb-4">Availability Capacity</label>
                       <div className="flex flex-wrap gap-2">
                          {d.slots.map(slot => (
                            <button 
                              key={slot}
                              onClick={() => handleSlotSelect(d.id, slot)}
                              className={`px-5 py-2.5 rounded-xl text-[10px] font-bold tracking-tight transition-all border ${
                                selectedSlots[d.id] === slot 
                                ? 'bg-cyan-400 text-black border-cyan-400 shadow-lg' 
                                : 'bg-white/5 border-white/10 text-slate-400 hover:text-white'
                              }`}
                            >
                              {slot}
                            </button>
                          ))}
                       </div>
                    </div>

                    <div className="pt-8 border-t border-white/5">
                       <button 
                          onClick={() => setConfirmingDoctor(d)} 
                          disabled={!selectedSlots[d.id]}
                          className={`px-12 py-5 rounded-2xl text-[11px] font-black uppercase tracking-widest transition-all ${
                            selectedSlots[d.id] 
                            ? 'bg-white text-black hover:bg-cyan-400 shadow-xl' 
                            : 'bg-white/5 text-slate-600 cursor-not-allowed border border-white/5'
                          }`}
                        >
                          Book Consultation
                        </button>
                    </div>
                  </div>
               </div>
             ))}
          </div>
       </div>

       {confirmingDoctor && (
         <div className="fixed inset-0 z-[100] flex items-center justify-center p-6">
            <div className="absolute inset-0 bg-black/85 backdrop-blur-md" onClick={() => setConfirmingDoctor(null)}></div>
            <div className="glass p-10 md:p-14 rounded-[3.5rem] border-white/15 shadow-[0_0_150px_rgba(34,211,238,0.25)] max-w-lg w-full scale-in relative z-10 overflow-hidden">
               <div className="flex items-center gap-5 mb-10">
                  <div className="w-16 h-16 bg-cyan-400/10 rounded-2xl flex items-center justify-center border border-cyan-400/20 text-cyan-400 shadow-inner">
                     <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" /></svg>
                  </div>
                  <div>
                    <h3 className="text-3xl font-black text-white tracking-tight leading-none mb-2">Sync Summary</h3>
                    <p className="text-slate-500 font-black text-[9px] uppercase tracking-[0.3em]">Protocol Verification Phase</p>
                  </div>
               </div>

               <div className="space-y-6 mb-12">
                  <div className="p-8 bg-white/5 rounded-3xl border border-white/10">
                    <div className="mb-6">
                       <p className="text-slate-500 text-[8px] font-black uppercase tracking-[0.2em] mb-1">Clinical Consultant</p>
                       <p className="text-white font-bold text-xl tracking-tight">{confirmingDoctor.name}</p>
                       <p className="text-cyan-400 text-[10px] font-black uppercase tracking-widest">{confirmingDoctor.specialty}</p>
                    </div>
                    <div className="pt-6 border-t border-white/5">
                       <p className="text-slate-500 text-[8px] font-black uppercase tracking-[0.2em] mb-1">Assigned Node</p>
                       <p className="text-white font-bold text-sm">{hospital.name}</p>
                    </div>
                  </div>

                  <div className="flex gap-4">
                     <div className="flex-1 p-6 bg-white/5 rounded-3xl border border-white/10">
                        <p className="text-slate-500 text-[8px] font-black uppercase tracking-[0.2em] mb-2">Scheduled Slot</p>
                        <p className="text-white font-black text-lg tracking-tight">{selectedSlots[confirmingDoctor.id]}</p>
                     </div>
                     <div className="flex-1 p-6 bg-emerald-500/10 rounded-3xl border border-emerald-500/20">
                        <p className="text-emerald-400 text-[8px] font-black uppercase tracking-[0.2em] mb-2">Protocol Status</p>
                        <p className="text-white font-black text-lg tracking-tight uppercase">Ready</p>
                     </div>
                  </div>
               </div>

               <div className="grid grid-cols-2 gap-5">
                  <button onClick={() => setConfirmingDoctor(null)} className="py-5 glass border-white/15 text-slate-400 font-black text-[10px] uppercase tracking-[0.2em] rounded-2xl hover:text-white transition-all">Abort Sync</button>
                  <button onClick={handleFinalConfirm} className="py-5 bg-cyan-400 text-black font-black text-[10px] uppercase tracking-[0.2em] rounded-2xl hover:bg-cyan-300 shadow-[0_15px_40px_rgba(34,211,238,0.35)] active:scale-95 transition-all">Initialize Sync</button>
               </div>
            </div>
         </div>
       )}
    </div>
  );
};

// --- App Root Component ---

const App: React.FC = () => {
  const [currentUser, setCurrentUser] = useState<User>(MOCK_USERS[0]);
  const [isPaid, setIsPaid] = useState(false);
  const [recoveryDay, setRecoveryDay] = useState(currentUser.recoveryDay);
  const navigate = useNavigate();

  useEffect(() => {
    setRecoveryDay(currentUser.recoveryDay);
    setIsPaid(false);
  }, [currentUser]);

  const handleBook = (h: Hospital, d: Doctor) => {
    setCurrentUser(prev => ({
      ...prev,
      activeTreatmentId: h.id,
      activeDoctorId: d.id,
      recoveryDay: 1,
      protocolName: `Consultation with ${d.name}`,
      protocolDescription: `Specialized session at ${h.name} for ${d.specialty} node synchronization.`,
      treatmentLogs: [{ day: 1, date: new Date().toISOString().split('T')[0], vitals: { bp: '120/80', pulse: 72, temp: 98.4 }, notes: 'Initial consultation and biometric sync.', status: 'Active' }]
    }));
    navigate('/treatment');
  };

  const handleSwitchUser = (u: User) => {
    setCurrentUser(u);
  };

  return (
    <div className="min-h-screen flex flex-col">
      <ParticleBackground isPaid={isPaid} />
      <Navbar user={currentUser} />
      <main className="flex-1 relative">
        <Routes>
          <Route path="/hospitals" element={<HospitalExplorer />} />
          <Route path="/hospital/:id" element={<HospitalProfileWrapper onBook={handleBook} />} />
          <Route path="/blood-connect" element={<BloodConnect />} />
          <Route path="/diagnostics" element={<DiagnosticsLab />} />
          <Route path="/treatment" element={<TreatmentFlow user={currentUser} onFinish={() => navigate('/hospitals')} isPaid={isPaid} onPay={() => setIsPaid(true)} recoveryDay={recoveryDay} onProgressDay={() => setRecoveryDay(prev => Math.min(prev + 1, 10))} />} />
          <Route path="/profile" element={<ProfilePage user={currentUser} onSwitchUser={handleSwitchUser} />} />
          <Route path="/" element={<Navigate to="/hospitals" />} />
        </Routes>
      </main>
      <NeuralAssistant />
    </div>
  );
};

export default App;
