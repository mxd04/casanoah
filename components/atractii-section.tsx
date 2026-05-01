"use client";

import React, { useState } from "react";
import { motion, AnimatePresence, useScroll, useMotionValueEvent } from "framer-motion";
import { ArrowUpRight, MapPin, ArrowRight } from "lucide-react";

const trails = [
  { id: 1, name: "Valea Sâmbetei", dist: "3 ore", difficulty: "Ușor / Mediu", desc: "Cea mai populară poartă către creasta Făgărașului. Un traseu spectaculos prin pădure care se deschide într-o vale glaciară de o frumusețe rară." },
  { id: 2, name: "Transfăgărășan", dist: "30 min", difficulty: "Panoramic", desc: "Cel mai spectaculos drum din lume conform Top Gear. Curbe amețitoare, cascade și acces direct către Bâlea Lac la 2034m altitudine." },
  { id: 3, name: "Vârful Moldoveanu", dist: "10-12 ore", difficulty: "Dificil", desc: "Acoperișul României (2544m). Un traseu de anduranță care te poartă prin inima sălbatică a munților până în cel mai înalt punct al țării." },
  { id: 4, name: "Vârful Negoiu", dist: "9 ore", difficulty: "Dificil", desc: "Al doilea vârf ca înălțime, dar probabil cel mai tehnic și spectaculos prin faimoasa zonă stâncoasă 'Custura Sărății'." },
  { id: 5, name: "Bâlea Lac la Capra", dist: "1.5 ore", difficulty: "Ușor", desc: "O drumeție scurtă dar intensă care face legătura între două lacuri glaciare superbe, oferind cea mai bună vedere asupra drumului Transfăgărășan." },
  { id: 6, name: "Cascada Capra", dist: "30 min", difficulty: "Accesibil", desc: "Situată pe versantul sudic al munților Făgăraș, este una dintre cele mai impunătoare cascade, având o cădere de apă de peste 40 metri." }
];

export function AtractiiSection() {
  const [isOpen, setIsOpen] = useState(false);
  const [hasBeenOpened, setHasBeenOpened] = useState(false);
  const [activeIndex, setActiveIndex] = useState(0);
  const containerRef = React.useRef(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });

  useMotionValueEvent(scrollYProgress, "change", (latest) => {
    if (latest > 0.90 && !hasBeenOpened) {
      setIsOpen(true);
      setHasBeenOpened(true);
    }
  });

  const handleNext = () => setActiveIndex((prev) => (prev + 1) % trails.length);
  const handlePrev = () => setActiveIndex((prev) => (prev - 1 + trails.length) % trails.length);

  return (
    <section ref={containerRef} className="relative h-[120vh] w-full overflow-hidden bg-black font-sans">
      {/* BACKGROUND */}
      <div className="absolute inset-0 z-0">
        <img src="images/munti1.jpg" alt="Munții Făgăraș" className="h-full w-full object-cover brightness-[0.7]" />
        <div className="absolute inset-0 bg-gradient-to-b from-black via-black/10 to-transparent" />
      </div>

      {/* TITLU PRINCIPAL */}
      <div className="relative z-10 flex h-full flex-col items-center pt-32 px-6 text-center pointer-events-none">
        <motion.h2 
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.2 }}
          className="text-5xl md:text-8xl font-bold text-white uppercase leading-tight"
          style={{ fontFamily: "'Bebas Neue', sans-serif" }}
        >
          Atracția principală <br />
          <span className="text-green-400">Munții Făgăraș</span>
        </motion.h2>
      </div>

      {/* CARD DRAWER */}
      <div className="absolute inset-0 pointer-events-none z-50">
        <AnimatePresence>
          {hasBeenOpened && (
            <>
              {isOpen && (
                <motion.div 
                  initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                  onClick={() => setIsOpen(false)}
                  className="absolute inset-0 bg-black/40 backdrop-blur-[5px] pointer-events-auto"
                />
              )}

              <motion.div
                initial={{ y: "100%" }}
                animate={{ y: isOpen ? 0 : 450 }} 
                transition={{ type: "spring", damping: 25, stiffness: 180 }}
                drag="y"
                dragConstraints={{ top: 0, bottom: 450 }}
                dragElastic={0.1}
                onDragEnd={(_, info) => {
                  if (info.offset.y > 150 || info.velocity.y > 500) setIsOpen(false);
                  else if (info.offset.y < -50 || info.velocity.y < -500) setIsOpen(true);
                }}
                className="absolute bottom-0 left-0 right-0 flex justify-center px-4 pb-12 pointer-events-auto"
              >
                <div className="w-full max-w-lg">
                  
                  {/* MÂNER */}
                  <div className="mb-5 flex justify-center pt-4 cursor-pointer" onClick={() => setIsOpen(!isOpen)}>
                      <div className="flex flex-col items-center gap-1.5 opacity-80">
                          <span className="text-[9px] uppercase tracking-[0.4em] text-white font-medium">
                            {isOpen ? "Închide" : "Trage pentru detalii"}
                          </span>
                          <div className={`h-1.5 w-16 rounded-full transition-colors ${isOpen ? "bg-white/40" : "bg-green-400"}`} />
                      </div>
                  </div>

                  <div className="relative overflow-hidden rounded-[2.5rem] border border-white/10 bg-black/10 p-8 shadow-2xl backdrop-blur-3xl min-h-[480px]">
                    
                    <motion.div
                      drag="x"
                      dragConstraints={{ left: 0, right: 0 }}
                      dragElastic={0.4}
                      onDragEnd={(_, info) => {
                        if (info.offset.x < -70) handleNext();
                        if (info.offset.x > 70) handlePrev();
                      }}
                      className="cursor-grab active:cursor-grabbing"
                    >
                      <AnimatePresence mode="wait">
                        <motion.div
                          key={activeIndex}
                          initial={{ opacity: 0, scale: 0.98, filter: "blur(4px)" }}
                          animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
                          exit={{ opacity: 0, scale: 1.02, filter: "blur(4px)" }}
                          transition={{ duration: 0.3, ease: "easeInOut" }}
                        >
                          <div className="relative z-10">
                            {/* TEXT FUNDAL */}
                            <div className="absolute -top-3 left-1 pointer-events-none opacity-15">
                                <span className="text-5xl font-light text-white italic" style={{ fontFamily: "'Dancing Script', cursive" }}>
                                  {trails[activeIndex].name}
                                </span>
                            </div>

                            {/* CONTAINER INFO HEADER */}
                            <div className="flex items-center justify-end pt-16 mb-4 min-h-[40px]">
                              {isOpen && (
                                <div className="text-right">
                                    <span className="text-[10px] text-white/40 uppercase tracking-widest block mb-0.5">Timp estimat</span>
                                    <span className="text-sm font-bold text-white uppercase">{trails[activeIndex].dist}</span>
                                </div>
                              )}
                            </div>

                            <h3 className="text-4xl font-bold text-white uppercase mb-1 tracking-tight" style={{ fontFamily: "'Bebas Neue', sans-serif" }}>
                              {trails[activeIndex].name}
                            </h3>
                            
                            <div className="flex items-center gap-2 mb-4 text-green-400/90">
                              <MapPin size={14} />
                              <span className="text-[10px] uppercase tracking-[0.2em] font-bold">{trails[activeIndex].difficulty}</span>
                            </div>

                            <p className="text-white/70 text-sm leading-relaxed mb-8 min-h-[80px] font-light">
                              {trails[activeIndex].desc}
                            </p>

                            <div className="flex items-center justify-between gap-4">
                              <button 
                                onClick={(e) => { e.stopPropagation(); window.open(`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(trails[activeIndex].name)}`)}}
                                className="flex-1 flex items-center justify-center gap-2 rounded-full bg-white/90 shadow-blur-[10px] px-6 py-4 text-[10px] font-extrabold uppercase tracking-widest text-black hover:bg-green-400 transition-all active:scale-95"
                              >
                                Vezi Traseu <ArrowUpRight size={14} />
                              </button>
                              <button 
                                onClick={(e) => { e.stopPropagation(); handleNext(); }}
                                className="h-14 w-14 flex items-center justify-center rounded-full border border-white/10 text-white hover:bg-white/10 transition-all group active:scale-90"
                              >
                                <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
                              </button>
                            </div>
                          </div>
                        </motion.div>
                      </AnimatePresence>
                    </motion.div>

                    {/* PASTILELE CLICKABLE */}
                    <div className="mt-4 flex gap-1.5 pb-1 relative z-20">
                      {trails.map((_, i) => (
                        <button
                          key={i}
                          onClick={(e) => {
                            e.stopPropagation();
                            setActiveIndex(i);
                          }}
                          className={`h-3 flex-1 rounded-full transition-all duration-300 hover:opacity-80 ${
                            i === activeIndex ? "bg-white scale-y-110 shadow-[0_0_8px_rgba(255,255,255,0.4)]" : "bg-white/10"
                          }`}
                          aria-label={`Vezi traseul ${trails[i].name}`}
                        />
                      ))}
                    </div>
                  </div>
                </div>
              </motion.div>
            </>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
}