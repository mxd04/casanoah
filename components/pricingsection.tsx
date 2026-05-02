"use client";

import React, { useState, useRef, useEffect } from "react";
import { Users, Phone, Thermometer, Sparkles, Droplets, Utensils, Car, BedDouble, Waves, Coffee, Tv, Wifi } from "lucide-react";

export default function PricingSection() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  useEffect(() => {
    if (!isClient) return;

    const handleScroll = () => {
      if (!sectionRef.current) return;
      const rect = sectionRef.current.getBoundingClientRect();
      const windowHeight = window.innerHeight;
      
      // Calculăm cât din secțiune a trecut DEASUPRA marginii de jos a ecranului
      const distanceFromBottom = windowHeight - rect.top;
      
      // Calculăm progresul de la 0 la 1 pe toată înălțimea secțiunii
      const progress = Math.min(Math.max(distanceFromBottom / rect.height, 0), 1);
      
      setScrollProgress(progress);
    };

    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    window.addEventListener("resize", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("resize", handleScroll);
    };
  }, [isClient]);

  // Schimbăm starea la 50% din scroll-ul secțiunii
  // true = Jacuzzi, false = Casa Noah
  const isCiubar = scrollProgress > 0.5;

  const getTransitionStyles = (visible: boolean) => 
    `absolute inset-0 transition-all duration-1000 ease-in-out flex flex-col justify-center ${
      visible 
        ? "opacity-100 translate-y-0 scale-100 pointer-events-auto" 
        : `opacity-0 ${isCiubar ? "-translate-y-12" : "translate-y-12"} scale-95 pointer-events-none`
    }`;

  const getImageTransitionStyles = (visible: boolean) => 
    `absolute inset-0 transition-all duration-1000 ease-in-out ${
      visible 
        ? "opacity-100 translate-y-0 scale-100 rotate-0" 
        : `opacity-0 ${isCiubar ? "-translate-y-20" : "translate-y-20"} scale-110 -rotate-2`
    }`;

  if (!isClient) {
    return <section className="h-[200vh] bg-black" />;
  }

  return (
    <>
      <style jsx global>{`
        @import url('https://fonts.googleapis.com/css2?family=Dancing+Script:wght@700&display=swap');
        @keyframes float {
          0%, 100% { transform: translate(0, 0) rotate(0deg); }
          33% { transform: translate(10px, -25px) rotate(1deg); }
          66% { transform: translate(-5px, -15px) rotate(-1deg); }
        }
        @keyframes float-reverse {
          0%, 100% { transform: translate(0, 0) rotate(0deg); }
          33% { transform: translate(-10px, 25px) rotate(-1deg); }
          66% { transform: translate(5px, 15px) rotate(1deg); }
        }
        @keyframes floating-cta {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-12px); }
        }
        @keyframes pulse-glow {
          0%, 100% { box-shadow: 0 0 25px rgba(255, 255, 255, 0.2); }
          50% { box-shadow: 0 0 45px rgba(255, 255, 255, 0.4); }
        }
      `}</style>

      <section 
        id="preturi" 
        ref={sectionRef} 
        className="relative h-auto md:h-[200vh] bg-black scroll-mt-24 overflow-hidden"
      >
        {/* --- BACKGROUND GLOBAL --- */}
        <div className="absolute inset-0 z-0 pointer-events-none">
          <div 
            className={`absolute inset-0 bg-cover bg-center transition-opacity duration-1000 ${isCiubar ? "opacity-0" : "opacity-100"}`}
            style={{ backgroundImage: `url('images/munti1.jpg')` }}
          />
          <div 
            className={`absolute inset-0 bg-cover bg-center transition-opacity duration-1000 ${!isCiubar ? "opacity-0" : "opacity-100"}`}
            style={{ backgroundImage: `url('images/ciubar.jpg')` }}
          />
          
          <div 
            className="absolute inset-0" 
            style={{ 
              background: `linear-gradient(to bottom, 
                rgba(0,0,0,1) 0%, 
                rgba(0,0,0,0.6) 15%, 
                rgba(0,0,0,0.6) 85%, 
                rgba(0,0,0,1) 100%)` 
            }} 
          />
        </div>

        {/* --- MOBILE VERSION --- */}
        <div className="md:hidden relative min-h-screen w-full py-16 px-6 flex flex-col justify-center gap-6">
          {/* Card Cazare */}
          <div className="relative z-10 rounded-[40px] bg-black/10 backdrop-blur-[5px] p-8 shadow-[0_0_25px_rgba(34,197,94,0.2)] animate-[float_6s_ease-in-out_infinite] border border-white/5">
            <div className="flex justify-between items-start mb-6">
              <div>
                <span className="text-green-500 text-[10px] font-black uppercase tracking-[0.2em]">Cazare Integrală</span>
                <div className="flex items-baseline gap-2 mt-1">
                  <span className="text-5xl font-black text-white tracking-tighter">1500</span>
                  <span className="text-lg font-bold text-green-500 uppercase">Ron</span>
                </div>
                
              </div>
              <span className="text-green-500/40 text-2xl font-bold italic" style={{ fontFamily: "'Dancing Script', cursive" }}>Casa Noah</span>
            </div>
            <div className="grid grid-cols-2 gap-y-4 gap-x-2 border-t border-white/10 pt-6">
              {[
                { i: Users, t: "15 Pers" }, { i: BedDouble, t: "5 Camere" },
                { i: Utensils, t: "Bucătărie" }, { i: Coffee, t: "Cafea Inc." },
                { i: Wifi, t: "WiFi" }, { i: Tv, t: "Smart TV" },
                { i: Sparkles, t: "Grătar" }, { i: Car, t: "Parcare" }
              ].map((f, idx) => (
                <div key={idx} className="flex items-center gap-2 text-[10px] font-bold text-zinc-300 uppercase tracking-tight">
                  <f.i size={14} className="text-green-500" /> {f.t}
                </div>
              ))}
            </div>
          </div>

          {/* Card Jacuzzi */}
          <div className="relative z-10 rounded-[40px] bg-black/10 backdrop-blur-[5px] p-8 shadow-[0_0_25px_rgba(59,130,246,0.2)] animate-[float-reverse_8s_ease-in-out_infinite] border border-white/5">
            <div className="flex justify-between items-start mb-4">
              <div>
                <span className="text-blue-400 text-[10px] font-black uppercase tracking-[0.2em]">Extra Relaxare</span>
                <div className="flex items-baseline gap-2 mt-1">
                  <span className="text-5xl font-black text-white tracking-tighter">500</span>
                  <span className="text-lg font-bold text-blue-500 uppercase">Ron</span>
                </div>
              </div>
              <span className="text-blue-400/40 text-3xl font-bold italic" style={{ fontFamily: "'Dancing Script', cursive" }}>Jacuzzi</span>
            </div>
            <p className="text-zinc-400 text-[10px] font-medium uppercase tracking-widest mb-4 italic">Sejur complet (Opțional)</p>
            <div className="space-y-3 border-t border-white/10 pt-4">
              <div className="flex items-center gap-3 text-xs font-bold text-zinc-300 uppercase">
                <Thermometer size={16} className="text-blue-500" /> 36-38°C Încălzit cu lemne
              </div>
              <div className="flex items-center gap-3 text-xs font-bold text-zinc-300 uppercase">
                <Droplets size={16} className="text-blue-500" /> Hidromasaj & Cromoterapie
              </div>
            </div>
          </div>
        </div>

        {/* --- DESKTOP VERSION --- */}
        <div className="hidden md:flex sticky top-0 h-screen items-center justify-center overflow-hidden z-20 pb-[5vh]">
          <div className="container mx-auto px-6 max-w-7xl"> 
            <div className="group/main relative overflow-hidden rounded-[45px] p-10 md:p-14 shadow-2xl transition-all duration-700 border border-white/10 h-auto md:min-h-[650px] md:max-h-[750px] flex items-center w-full bg-black/20 backdrop-blur-md">
              <div className="relative z-20 grid md:grid-cols-[1fr_1.3fr] gap-12 items-center w-full h-full">
                <div className="relative h-full min-h-[520px] flex flex-col justify-center">
                  <div className={getTransitionStyles(!isCiubar)}>
                    <div className="space-y-6 text-white">
                      <h2 className="text-7xl md:text-8xl font-bold text-white leading-none uppercase" style={{ fontFamily: "'Bebas Neue', sans-serif" }}>CASA NOAH</h2>
                      <div className="flex items-baseline gap-2">
                        <span className="text-6xl md:text-7xl font-black text-white tracking-tighter">1500</span>
                        <span className="text-2xl font-bold text-green-500">RON</span>
                      </div>
                      <div className="grid grid-cols-2 gap-y-5 pt-4">
                         {[
                           { Icon: Users, text: "15 Persoane" }, { Icon: BedDouble, text: "5 Camere" },
                           { Icon: Utensils, text: "Bucătărie" }, { Icon: Wifi, text: "WiFi" },
                           { Icon: Coffee, text: "Cafea" }, { Icon: Car, text: "Parcare" }
                         ].map((item, i) => (
                           <div key={i} className="flex items-center gap-3 text-sm font-bold uppercase tracking-tight">
                             <item.Icon size={18} className="text-green-400"/> {item.text}
                           </div>
                         ))}
                      </div>
                    </div>
                  </div>

                  <div className={getTransitionStyles(isCiubar)}>
                    <div className="space-y-6 text-white">
                      <h2 className="text-7xl md:text-8xl font-bold text-white leading-none uppercase" style={{ fontFamily: "'Bebas Neue', sans-serif" }}>JACUZZI</h2>
                      <div className="flex items-baseline gap-2">
                        <span className="text-6xl md:text-7xl font-black text-white tracking-tighter">500</span>
                        <span className="text-2xl font-bold text-blue-400">RON</span>
                      </div>
                      <div className="space-y-6 py-6">
                         {[{ Icon: Thermometer, text: "Încălzit cu lemne" }, { Icon: Waves, text: "Hidromasaj" }].map((item, i) => (
                           <div key={i} className="flex items-center gap-4 text-[15px] font-bold uppercase">
                             <item.Icon size={24} className="text-blue-400"/> {item.text}
                           </div>
                         ))}
                      </div>
                    </div>
                  </div>
                </div>

                <div className="hidden md:flex justify-end items-center h-full">
                  <div className="relative aspect-[16/11] w-full max-h-[520px] overflow-hidden rounded-[45px] border-[14px] border-white/10 shadow-2xl">
                    <div className={getImageTransitionStyles(!isCiubar)}>
                      <img src="images/ abstract.jpg" className="w-full h-full object-cover" alt="Room" />
                    </div>
                    <div className={getImageTransitionStyles(isCiubar)}>
                      <img src="images/abstract.jpg" className="w-full h-full object-cover" alt="Jacuzzi" />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA remain unchanged */}
      <div className="fixed bottom-5 left-0 right-0 z-[100] flex justify-center pointer-events-none px-2">
        <a 
          href="tel:0741354774"
          className="pointer-events-auto flex items-center gap-4 bg-white/[0.03] backdrop-blur-[20px] py-2 px-14 rounded-[32px] shadow-[0_0_15px_rgba(255,255,255,0.4)] animate-[floating-cta_4s_ease-in-out_infinite,pulse-glow_3s_ease-in-out_infinite] transition-all hover:border-green-500/50 active:scale-95 group"
        >
          <div className="flex items-center justify-center w-9 h-9 rounded-full bg-green-500 shadow-[0_0_20px_rgba(34,197,94,0.6)] group-hover:scale-110 transition-transform">
            <Phone size={20} className="text-black fill-black" />
          </div>
          <div className="flex flex-col">
            <span className="text-[12px] font-black text-white uppercase tracking-wider leading-none">
              Doar 100RON/persoană
            </span>
            <span className="text-[8px] font-bold text-green-400 uppercase tracking-[0.2em] mt-1.5 opacity-80">
              pe noapte • Rezervă acum
            </span>
          </div>
        </a>
      </div>
    </>
  );
}