"use client";
import { motion } from "framer-motion";
import { MapPin, Phone, Mail, Instagram, Sparkles, ArrowUpRight, Facebook } from "lucide-react";

export function FooterSection() {
  return (
    <footer className="relative overflow-hidden bg-[#020202] text-white pt-20 pb-10">
      {/* Background Glows - Optimizate pentru Mobile */}
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-px bg-gradient-to-r from-transparent via-green-500/50 to-transparent" />
        <div className="absolute -top-24 left-1/2 -translate-x-1/2 w-64 h-64 bg-green-500/10 blur-[100px] rounded-full" />
      </div>

      <div className="relative z-10 container mx-auto px-6">
        <div className="flex flex-col gap-8">
          
          {/* LOGO & TAGLINE - Focus Vizual Central */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center space-y-4 mb-4"
          >
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-white/10 bg-white/5 backdrop-blur-md">
              <Sparkles size={12} className="text-green-400" />
              <span className="uppercase tracking-[0.4em] text-[9px] font-bold text-white/80">Experiență Autentică</span>
            </div>
            <h2 className="text-7xl font-bold leading-none tracking-tighter uppercase" style={{ fontFamily: "'Bebas Neue', sans-serif" }}>
              Casa <span className="text-green-400">Noah</span>
            </h2>
            <p className="text-white/40 text-xs uppercase tracking-[0.3em] font-light italic">
              Liniște. Natură. Aventură.
            </p>
          </motion.div>

          {/* CONTACT CARD - Glassmorphism curat */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="grid grid-cols-1 gap-4 p-1 rounded-[2.5rem] bg-gradient-to-b from-white/10 to-transparent border border-white/10 backdrop-blur-2xl"
          >
            <div className="bg-black/40 rounded-[2.3rem] p-8 space-y-6">
              <div className="space-y-5">
                <a href="tel:+40123456789" className="flex items-center gap-4 group">
                  <div className="h-10 w-10 rounded-full bg-green-400/10 flex items-center justify-center text-green-400 group-active:scale-90 transition-transform">
                    <Phone size={18} />
                  </div>
                  <div>
                    <p className="text-[10px] uppercase tracking-widest text-white/40">Suna-ne</p>
                    <p className="text-sm font-bold">+40 123 456 789</p>
                  </div>
                </a>

                <a href="mailto:contact@casanoah.ro" className="flex items-center gap-4 group">
                  <div className="h-10 w-10 rounded-full bg-green-400/10 flex items-center justify-center text-green-400 group-active:scale-90 transition-transform">
                    <Mail size={18} />
                  </div>
                  <div>
                    <p className="text-[10px] uppercase tracking-widest text-white/40">Email</p>
                    <p className="text-sm font-bold">contact@casanoah.ro</p>
                  </div>
                </a>

                <div className="flex items-center gap-4">
                  <div className="h-10 w-10 rounded-full bg-green-400/10 flex items-center justify-center text-green-400">
                    <MapPin size={18} />
                  </div>
                  <div>
                    <p className="text-[10px] uppercase tracking-widest text-white/40">Locație</p>
                    <p className="text-sm font-bold">Sâmbăta de Sus, Brașov</p>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>

          {/* QUICK LINKS & SOCIALS - Aranjate pentru deget (Thumb-friendly) */}
          <div className="grid grid-cols-2 gap-4">
            <motion.div 
               whileTap={{ scale: 0.98 }}
               className="bg-white/5 border border-white/10 rounded-[2rem] p-6 flex flex-col justify-between min-h-[140px]"
            >
              <span className="text-[10px] uppercase tracking-widest text-white/30">Meniu</span>
              <div className="space-y-2">
                <a href="#trasee" className="flex items-center justify-between text-sm font-medium group">
                  Trasee <ArrowUpRight size={14} className="text-green-400" />
                </a>
                <a href="#contact" className="flex items-center justify-between text-sm font-medium">
                  Rezervă <ArrowUpRight size={14} className="text-green-400" />
                </a>
              </div>
            </motion.div>

            <motion.div 
               whileTap={{ scale: 0.98 }}
               className="bg-green-400 rounded-[2rem] p-6 flex flex-col justify-between min-h-[140px] text-black"
            >
              <span className="text-[10px] uppercase tracking-widest text-black/40 font-bold">Social</span>
              <div className="flex gap-4">
                <a href="#" className="h-10 w-10 rounded-full bg-black/10 flex items-center justify-center"><Instagram size={20} /></a>
                <a href="#" className="h-10 w-10 rounded-full bg-black/10 flex items-center justify-center"><Facebook size={20} /></a>
              </div>
            </motion.div>
          </div>

          {/* COPYRIGHT - Minimalist */}
          <div className="mt-10 pt-8 border-t border-white/5 text-center">
             <p className="text-[9px] uppercase tracking-[0.5em] text-white/20 font-medium leading-loose">
               © {new Date().getFullYear()} CASA NOAH <br/> 
               PROIECTAT PENTRU MUNTE
             </p>
          </div>

        </div>
      </div>
      
      {/* Bottom bar - Apple Style */}
      <div className="mt-8 flex justify-center">
        <div className="h-1 w-24 rounded-full bg-white/10" />
      </div>
    </footer>
  );
}