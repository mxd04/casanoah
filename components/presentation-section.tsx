"use client";

import React, { useState, useEffect, useMemo } from "react";
import { 
  ChevronRight, ChevronLeft, Share2, Maximize2, X, 
  CloudSun, Sun, Cloud, CloudRain, CloudSnow, CloudLightning, Loader2, ArrowLeft, Droplets
} from "lucide-react";
import { motion, AnimatePresence, LayoutGroup } from "framer-motion";

const slides = [
  { id: 1, img: "images/1.jpg" }, { id: 2, img: "images/3.jpg" },
  { id: 3, img: "images/ciubar.jpg" }, { id: 4, img: "images/4.jpg" },
  { id: 5, img: "images/5.jpg" }, { id: 6, img: "images/11.jpg" },
  { id: 7, img: "images/7.jpg" }, { id: 8, img: "images/8.jpg" },
  { id: 9, img: "images/2.jpg" }, { id: 10, img: "images/6.jpg" },
  { id: 11, img: "images/9.jpg" }, { id: 12, img: "images/10.jpg" },
  { id: 13, img: "images/12.jpg" }, { id: 14, img: "images/13.jpg" },
  { id: 15, img: "images/14.jpg" },
];

const getWeatherConfig = (code: number) => {
  if (code === 0) return { Icon: Sun, color: "text-yellow-400" };
  if (code <= 3) return { Icon: CloudSun, color: "text-gray-300" };
  if (code <= 48) return { Icon: Cloud, color: "text-gray-400" };
  if (code <= 67) return { Icon: CloudRain, color: "text-blue-500" };
  if (code <= 77) return { Icon: CloudSnow, color: "text-blue-200" };
  return { Icon: CloudLightning, color: "text-purple-500" };
};

export function ExperienceGallery() {
  const [active, setActive] = useState(0);
  const [fullscreenImg, setFullscreenImg] = useState<string | null>(null);
  const [showWeather, setShowWeather] = useState(false);
  const [weatherData, setWeatherData] = useState<any>(null);
  const [loadingWeather, setLoadingWeather] = useState(false);
  const [selectedDayIndex, setSelectedDayIndex] = useState<number | null>(null);

  const visibleIndices = useMemo(() => {
    const total = slides.length;
    const windowSize = 7;
    let start = active - Math.floor(windowSize / 2);
    if (start < 0) start = 0;
    if (start > total - windowSize) start = total - windowSize;
    return Array.from({ length: windowSize }, (_, i) => start + i);
  }, [active]);

  useEffect(() => {
    if (showWeather && (!weatherData || !weatherData.daily?.precipitation_probability_max)) {
      setLoadingWeather(true);
      fetch("https://api.open-meteo.com/v1/forecast?latitude=45.6495&longitude=24.8197&daily=weathercode,temperature_2m_max,temperature_2m_min,precipitation_probability_max&hourly=temperature_2m,weathercode&current_weather=true&timezone=Europe%2FBucharest")
        .then(res => res.json())
        .then(data => {
          setWeatherData(data);
          setLoadingWeather(false);
        })
        .catch(() => setLoadingWeather(false));
    }
  }, [showWeather, weatherData]);

  const nextSlide = () => setActive((prev) => (prev + 1) % slides.length);
  const prevSlide = () => setActive((prev) => (prev - 1 + slides.length) % slides.length);

  const handleDragEnd = (event: any, info: any) => {
    const threshold = 50;
    if (info.offset.x < -threshold) nextSlide();
    else if (info.offset.x > threshold) prevSlide();
  };

  const getHourlyDataForDay = (dayIdx: number) => {
    if (!weatherData?.hourly) return [];
    const startIdx = dayIdx * 24;
    return weatherData.hourly.time.slice(startIdx, startIdx + 24).map((time: string, i: number) => ({
      time,
      temp: weatherData.hourly.temperature_2m[startIdx + i],
      code: weatherData.hourly.weathercode[startIdx + i]
    })).filter((_: any, i: number) => i % 3 === 0);
  };

  return (
    /* MODIFICARE AICI: Am adaugat id="galerie-foto" si scroll-mt-24 */
    <section 
      id="galerie-foto" 
      className="relative min-h-screen bg-[#050505] flex flex-col items-center justify-center pt-12 pb-30 px-4 overflow-visible text-white font-sans scroll-mt-24"
    >
      
      {/* BACKGROUND & LAYOUT */}
      <div className="absolute inset-0 w-full h-full overflow-hidden pointer-events-none z-0">
        {slides.map((slide, index) => (
          <img 
            key={`bg-${slide.id}`} 
            src={slide.img} 
            alt="" 
            className="absolute inset-0 w-full h-full object-cover transition-opacity duration-1000"
            style={{ opacity: active === index ? 0.35 : 0, filter: "blur(12px)", transform: "scale(1.1)" }} 
          />
        ))}
        <div className="absolute inset-x-0 top-0 h-48 bg-gradient-to-b from-black to-transparent z-10" />
        <div className="absolute inset-x-0 bottom-0 h-64 bg-gradient-to-t from-black via-[#050505]/80 to-transparent z-10" />
      </div>

      <div className="md:hidden flex flex-col items-center w-full max-w-[360px] relative z-20">
        <motion.div 
          drag="x"
          dragConstraints={{ left: 0, right: 0 }}
          dragElastic={0.2}
          onDragEnd={handleDragEnd}
          className="relative w-full aspect-[3.5/5.5] rounded-[40px] overflow-hidden border border-white/20 bg-black shadow-2xl touch-pan-y"
        >
          <AnimatePresence initial={false}>
            {slides.map((slide, index) => (
              active === index && (
                <motion.img 
                  key={slide.id} 
                  src={slide.img} 
                  alt="" 
                  initial={{ opacity: 0, scale: 1.1 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  transition={{ duration: 0.5 }}
                  className="absolute inset-0 w-full h-full object-cover" 
                />
              )
            ))}
          </AnimatePresence>
          
          <div className="absolute bottom-6 inset-x-3 z-30 flex items-center justify-between gap-2 pointer-events-none">
            <div className="flex-1 flex gap-2 px-4 py-3.5 rounded-full bg-white/10 backdrop-blur-[10px] border border-white/5 items-center justify-center min-w-0 pointer-events-auto">
              <AnimatePresence mode="popLayout">
                {visibleIndices.map((idx) => (
                  <motion.button key={idx} layout initial={{ opacity: 0, scale: 0.5 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.5 }} onClick={() => setActive(idx)} className={`flex-shrink-0 transition-all duration-300 rounded-full ${active === idx ? "w-7 h-3 bg-white" : "w-3 h-3 bg-white/20"}`} />
                ))}
              </AnimatePresence>
            </div>
            <div className="flex gap-1.5 flex-shrink-0 pointer-events-auto">
              <button onClick={prevSlide} className="w-12 h-12 flex items-center justify-center rounded-full bg-white/10 backdrop-blur-[5px] border border-white/10 text-white active:scale-90"><ChevronLeft size={22} strokeWidth={2.5} /></button>
              <button onClick={nextSlide} className="w-12 h-12 flex items-center justify-center rounded-full bg-white/90 border border-white/10 text-black active:scale-90"><ChevronRight size={22} strokeWidth={2.5} /></button>
            </div>
          </div>
        </motion.div>

        <div className="w-full relative h-12">
          <div className="absolute right-0 -bottom-33 flex flex-col items-end gap-3 z-50">
            <div className="flex items-center gap-4">
              <motion.span initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} className="text-[34px] uppercase bg-gradient-to-r from-white to-white/80 bg-clip-text text-transparent" style={{ fontFamily: "'Bebas Neue', sans-serif" }}>Imparte cu gasca</motion.span>
              <motion.button onClick={() => { if (navigator.share) navigator.share({ title: 'Casa Noah', url: window.location.href }); }} animate={{ y: [0, -8, 0] }} transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }} className="p-5 backdrop-blur-[10px] bg-green-500 rounded-full shadow-[0px_0px_50px_0px_rgba(0,200,100,1)] active:scale-95"><Share2 size={36} className="text-white" /></motion.button>
            </div>
            <div className="flex items-center gap-4 mr-14">
              <motion.span initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} className="text-[34px] uppercase bg-gradient-to-r from-white to-white/80 bg-clip-text text-transparent" style={{ fontFamily: "'Bebas Neue', sans-serif" }}>Prognoza Meteo</motion.span>
              <motion.button onClick={() => setShowWeather(true)} animate={{ y: [0, 8, 0] }} transition={{ duration: 4, repeat: Infinity, ease: "easeInOut", delay: 0.5 }} className="p-5 backdrop-blur-[10px] bg-blue-400 rounded-full shadow-[0px_0px_50px_0px_rgba(0,125,231,1)] active:scale-95"><CloudSun size={36} className="text-white" /></motion.button>
            </div>
          </div>
        </div>
      </div>

      {/* DESKTOP VIEW */}
      <div className="hidden md:block w-full max-w-[1600px] pb-20 relative z-20">
        <div className="mb-12 text-center">
          <motion.h2 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-white text-8xl font-normal uppercase tracking-tighter" style={{ fontFamily: "'Bebas Neue', sans-serif" }}>Colecția <span className="text-[#22c55e]">Casa Noah</span></motion.h2>
        </div>
        <div className="flex flex-row gap-3 h-[60vh]">
          {slides.map((slide, index) => (
            <div key={slide.id} onClick={() => setActive(index)} className={`relative h-full transition-all duration-700 cursor-pointer rounded-[32px] overflow-hidden ${active === index ? "flex-[10]" : "flex-[1] grayscale opacity-30 hover:opacity-100 hover:grayscale-0"}`}>
              <img src={slide.img} alt="" className="absolute inset-0 h-full w-full object-cover" />
              {active === index && (
                <button onClick={() => setFullscreenImg(slide.img)} className="absolute bottom-8 left-8 p-4 bg-black/40 backdrop-blur-md rounded-full text-white border border-white/10 hover:bg-[#22c55e]"><Maximize2 size={24} /></button>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* MODALA METEO (Păstrată integral ca în sursă) */}
      <AnimatePresence>
        {showWeather && (
          <div className="fixed inset-0 z-[1000] flex items-center justify-center p-4">
            <motion.div 
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
              onClick={() => { setShowWeather(false); setSelectedDayIndex(null); }} 
              className="absolute inset-0 bg-black/95 backdrop-blur-xl" 
            />
            
            <motion.div 
              layout
              initial={{ scale: 0.9, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.9, opacity: 0, y: 20 }}
              transition={{ type: "spring", damping: 25, stiffness: 300 }}
              className="relative w-full max-w-[380px] bg-[#0a0a0a] rounded-[2.5rem] p-6 border border-white/10 shadow-2xl text-center overflow-hidden"
            >
              <LayoutGroup>
                <motion.div layout className="flex items-center justify-between mb-6">
                  <div className="w-12">
                    <AnimatePresence>
                      {selectedDayIndex !== null && (
                        <motion.button 
                          initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -10 }}
                          onClick={() => setSelectedDayIndex(null)} 
                          className="text-white/60 hover:text-white flex items-center gap-1.5"
                        >
                          <ArrowLeft size={18} />
                        </motion.button>
                      )}
                    </AnimatePresence>
                  </div>
                  
                  <motion.h3 layout className="text-3xl uppercase text-white leading-none" style={{ fontFamily: "'Bebas Neue', sans-serif" }}>
                    {selectedDayIndex !== null ? "Detalii Ore" : "Prognoză"}
                  </motion.h3>

                  <button onClick={() => { setShowWeather(false); setSelectedDayIndex(null); }} className="text-white/40 w-12 flex justify-end"><X size={22} /></button>
                </motion.div>

                {loadingWeather ? (
                  <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="py-12 flex justify-center"><Loader2 className="animate-spin text-[#22c55e]" size={32} /></motion.div>
                ) : (
                  <AnimatePresence mode="wait">
                    {selectedDayIndex === null ? (
                      <motion.div 
                        key="days-grid"
                        initial={{ opacity: 0, y: 10, filter: "blur(10px)" }}
                        animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                        exit={{ opacity: 0, y: -10, filter: "blur(10px)" }}
                        transition={{ duration: 0.3 }}
                        className="grid grid-cols-3 gap-2.5"
                      >
                        {weatherData?.daily?.time?.slice(0, 6).map((time: string, i: number) => {
                          const { Icon, color } = getWeatherConfig(weatherData.daily.weathercode[i]);
                          const prob = weatherData.daily.precipitation_probability_max?.[i] ?? 0;
                          return (
                            <motion.div 
                              layoutId={`card-${i}`}
                              key={i} 
                              onClick={() => setSelectedDayIndex(i)}
                              className="bg-white/5 py-4 px-2 rounded-2xl border border-white/5 flex flex-col items-center cursor-pointer hover:bg-white/10"
                            >
                              <span className="text-[10px] opacity-40 mb-2 uppercase font-bold">{new Date(time).toLocaleDateString('ro-RO', { weekday: 'short' })}</span>
                              <Icon size={24} className={`${color} mb-1.5`} />
                              <span className="text-lg font-bold">{Math.round(weatherData.daily.temperature_2m_max[i])}°</span>
                              <div className="flex items-center gap-0.5 mt-1 text-[9px] text-blue-400 font-bold"><Droplets size={8} /> {prob}%</div>
                            </motion.div>
                          );
                        })}
                      </motion.div>
                    ) : (
                      <motion.div 
                        key="hourly-list"
                        initial={{ opacity: 0, x: 20, filter: "blur(10px)" }}
                        animate={{ opacity: 1, x: 0, filter: "blur(0px)" }}
                        exit={{ opacity: 0, x: -20, filter: "blur(10px)" }}
                        transition={{ duration: 0.3 }}
                        className="space-y-2 max-h-[350px] overflow-y-auto pr-1 custom-scrollbar"
                      >
                        <div className="text-center mb-4 opacity-40 text-[10px] uppercase tracking-[0.2em] font-bold">
                          {new Date(weatherData.daily.time[selectedDayIndex]).toLocaleDateString('ro-RO', { weekday: 'long', day: 'numeric', month: 'long' })}
                        </div>
                        {getHourlyDataForDay(selectedDayIndex).map((hour: any, i: number) => {
                          const { Icon, color } = getWeatherConfig(hour.code);
                          return (
                            <motion.div 
                              initial={{ opacity: 0, y: 5 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.05 }}
                              key={i} 
                              className="flex items-center justify-between bg-white/5 p-3 rounded-xl border border-white/5"
                            >
                              <span className="text-xs font-medium text-white/50">{new Date(hour.time).toLocaleTimeString('ro-RO', { hour: '2-digit', minute: '2-digit' })}</span>
                              <Icon size={20} className={color} />
                              <span className="text-base font-bold w-10 text-right">{Math.round(hour.temp)}°</span>
                            </motion.div>
                          );
                        })}
                      </motion.div>
                    )}
                  </AnimatePresence>
                )}
              </LayoutGroup>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* FULLSCREEN PREVIEW */}
      {fullscreenImg && (
        <div className="fixed inset-0 z-[1001] bg-black flex items-center justify-center p-4" onClick={() => setFullscreenImg(null)}>
          <img src={fullscreenImg} className="max-w-full max-h-full object-contain rounded-xl" alt="" />
          <button className="absolute top-6 right-6 text-white"><X size={32} /></button>
        </div>
      )}
    </section>
  );
}