"use client";

import React, { useState, useRef, useEffect } from "react";
import { 
  MessageCircle, 
  Star, 
  Instagram, 
  Facebook, 
  Phone, 
  ArrowRight, 
  Check, 
  CalendarDays 
} from "lucide-react";

export function ContactSection() {
  const [copied, setCopied] = useState(false);
  const phoneNumber = "+40 741 354 774";
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const copyToClipboard = (e: React.MouseEvent | React.TouchEvent) => {
    if (e) e.preventDefault();
    navigator.clipboard.writeText(phoneNumber.replace(/\s/g, ''));
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    let points: any[] = [];
    let animationFrameId: number;

    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      initPoints();
    };

    class Point {
      x: number; y: number; baseX: number; baseY: number; size: number; vx: number; vy: number;
      constructor(x: number, y: number) {
        this.x = x; this.y = y;
        this.baseX = x; this.baseY = y;
        this.size = Math.random() * 1.5 + 0.5;
        this.vx = (Math.random() - 0.5) * 0.3; 
        this.vy = (Math.random() - 0.5) * 0.3;
      }
      draw() {
        ctx!.beginPath();
        ctx!.arc(this.x, this.y, this.size, 0, Math.PI * 2, false);
        ctx!.fillStyle = "rgba(74, 222, 128, 0.4)";
        ctx!.fill();
      }
      update() {
        this.baseX += this.vx; this.baseY += this.vy;
        this.x = this.baseX; this.y = this.baseY;
        if (this.baseX < 0 || this.baseX > canvas!.width) this.vx *= -1;
        if (this.baseY < 0 || this.baseY > canvas!.height) this.vy *= -1;
        this.draw();
      }
    }

    const initPoints = () => {
      points = [];
      let numberOfPoints = (canvas.width * canvas.height) / 15000;
      for (let i = 0; i < numberOfPoints; i++) {
        points.push(new Point(Math.random() * canvas.width, Math.random() * canvas.height));
      }
    };

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      points.forEach(p => p.update());
      animationFrameId = requestAnimationFrame(animate);
    };

    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);
    animate();
    return () => {
      window.removeEventListener('resize', resizeCanvas);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <section id="contact" className="relative pt-6 pb-20 overflow-hidden min-h-[60vh] flex items-start bg-black">
      
      {/* BACKGROUND */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        <canvas ref={canvasRef} className="absolute inset-0 opacity-40" />
      </div>

      <div className="container relative mx-auto px-6 z-20 mt-2">
        <div className="max-w-md mx-auto flex flex-col gap-3">
          
  {/* 1. BOOKING */}
<a href="https://www.booking.com/hotel/ro/pensiunea-casa-noah.ro.html" target="_blank" rel="noopener noreferrer"
   className="bg-white text-black p-5 rounded-[24px] active:scale-[0.96] transition-all flex items-center justify-between shadow-xl">
    <div className="flex items-center gap-3">
      <div className="bg-blue-600 p-2.5 rounded-xl text-white flex items-center justify-center">
        <CalendarDays size={16} />
      </div>
      <span className="text-lg font-bold uppercase leading-none mt-0.5" style={{ fontFamily: "'Bebas Neue', sans-serif" }}>
        Rezervă pe Booking
      </span>
    </div>
    <div className="flex items-center gap-1 opacity-60">
      <Star size={20} className="fill-blue-600 text-blue-600" />
      <span className="font-bold text-s text-blue-600 leading-none">9.8</span>
    </div>
</a>

{/* 2. WHATSAPP */}
<a href="https://wa.me/40741354774" target="_blank" rel="noopener noreferrer"
   className="bg-[#25D366] text-white p-5 rounded-[24px] active:scale-[0.96] transition-all flex items-center gap-3 shadow-lg shadow-green-500/20">
    <div className="flex items-center justify-center">
      <MessageCircle size={22} fill="white" />
    </div>
    <span className="text-lg font-bold uppercase leading-none mt-0.5" style={{ fontFamily: "'Bebas Neue', sans-serif" }}>
      Contact WhatsApp
    </span>
    <ArrowRight size={18} className="ml-auto opacity-100" />
</a>
          {/* 3. SOCIAL MEDIA SPLIT (With official colors back) */}
          <div className="grid grid-cols-2 gap-3">
              <a href="https://facebook.com/pensiuneacasanoah" target="_blank" 
                 className="bg-[#1877F2] h-16 rounded-[20px] flex items-center justify-center active:scale-[0.94] transition-all shadow-lg">
                  <Facebook size={26} className="text-white" fill="white" />
              </a>
              <a href="https://instagram.com/pensiuneacasanoah" target="_blank" 
                 className="bg-gradient-to-tr from-[#f9ce34] via-[#ee2a7b] to-[#6228d7] h-16 rounded-[20px] flex items-center justify-center active:scale-[0.94] transition-all shadow-lg">
                  <Instagram size={26} className="text-white" />
              </a>
          </div>

          {/* 4. PHONE - CLICK TO COPY */}
          <div onClick={copyToClipboard} 
               className="relative bg-white/5 border border-white/10 p-5 rounded-[24px] active:bg-white/10 transition-all overflow-hidden mt-1 group">
              <div className="flex items-center justify-center gap-3 text-white/90">
                  <Phone size={16} className="text-green-500" />
                  <span className="text-xl font-bold tracking-tight">{phoneNumber}</span>
              </div>
              
              {/* Copy Feedback Overlay */}
              <div className={`absolute inset-0 bg-green-500 flex items-center justify-center transition-transform duration-300 ${copied ? 'translate-y-0' : 'translate-y-full'}`}>
                  <div className="flex items-center gap-2 text-white">
                      <Check size={18} strokeWidth={3} />
                      <span className="font-bold uppercase text-xs tracking-widest">Număr Copiat!</span>
                  </div>
              </div>
          </div>

        </div>
      </div>
    </section>
  );
}