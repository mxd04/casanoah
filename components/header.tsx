"use client";



import { useState, useEffect, useRef } from "react";

import Link from "next/link";

import { Phone, MessageCircle, MapPin, Banknote, Image as ImageIcon, ChevronUp, ArrowUp } from "lucide-react";



interface SmartContactBarProps {

  activeSide: "none" | "left" | "right";

  copied: boolean;

  onTouchStart: (e: React.TouchEvent) => void;

  onTouchMove: (e: React.TouchEvent) => void;

  onTouchEnd: () => void;

  copyToClipboard: () => void;

  onClose: () => void;

}



export function Header() {

  const [isScrolled, setIsScrolled] = useState(false);

  const [showContactOnScroll, setShowContactOnScroll] = useState(false);

  const [copied, setCopied] = useState(false);

  const [activeSide, setActiveSide] = useState<"none" | "left" | "right">("none");

  const [passedHero, setPassedHero] = useState(false);

  const [isLockingScroll, setIsLockingScroll] = useState(false);

 

  const [showMapsHint, setShowMapsHint] = useState(false);

  const [hintWasDismissed, setHintWasDismissed] = useState(false);



  const touchStartX = useRef<number | null>(null);

  const touchEndX = useRef<number | null>(null);



  useEffect(() => {

    const handleScroll = () => {

      const currentScroll = window.scrollY;

      if (showContactOnScroll && currentScroll > 5) setShowContactOnScroll(false);

      setIsScrolled(currentScroll > 20);

      setPassedHero(currentScroll > 515);

    };

    window.addEventListener("scroll", handleScroll, { passive: true });

    return () => window.removeEventListener("scroll", handleScroll);

  }, [showContactOnScroll]);



  useEffect(() => {

    if (passedHero && !showContactOnScroll && !hintWasDismissed) {

      const triggerDelay = setTimeout(() => {

        setShowMapsHint(true);

        const hideTimer = setTimeout(() => {

          setShowMapsHint(false);

          setHintWasDismissed(true);

        }, 4000);

        return () => clearTimeout(hideTimer);

      }, 500);

      return () => clearTimeout(triggerDelay);

    }

  }, [passedHero, showContactOnScroll, hintWasDismissed]);



  const handleOpenContact = () => setShowContactOnScroll(true);

  const handleCloseContact = () => setShowContactOnScroll(false);



  const copyToClipboard = () => {

    navigator.clipboard.writeText("0741354774");

    setCopied(true);

    setTimeout(() => setCopied(false), 2000);

  };



  const onTouchStart = (e: React.TouchEvent) => { touchStartX.current = e.targetTouches[0].clientX; };

  const onTouchMove = (e: React.TouchEvent) => { touchEndX.current = e.targetTouches[0].clientX; };

  const onTouchEnd = () => {

    if (!touchStartX.current || !touchEndX.current) return;

    const distance = touchStartX.current - touchEndX.current;

    if (Math.abs(distance) > 50) {

      if (distance > 50) {

        setActiveSide("right");

        setTimeout(() => { window.open("https://wa.me/40741354774", "_blank"); setActiveSide("none"); }, 200);

      } else {

        setActiveSide("left");

        setTimeout(() => { window.location.href = "tel:+40741354774"; setActiveSide("none"); }, 200);

      }

    }

    touchStartX.current = null; touchEndX.current = null;

  };



  const isLogoCompact = isScrolled && !isLockingScroll;



  return (

    <header className="fixed top-0 left-0 right-0 z-50 h-0 overflow-visible">

      <div className={`relative left-1/2 -translate-x-1/2 transition-all duration-700 ease-in-out ${isLogoCompact ? "top-4 w-[92%] max-w-7xl" : "top-10 w-full px-4"}`}>

        <div className="relative w-full">

          <div className="max-w-7xl mx-auto px-5 flex flex-col items-center relative min-h-[160px]">

           

            <div className={`absolute transition-all duration-700 flex items-center

                ${isLogoCompact

                  ? "left-0 top-0 translate-x-0 bg-black/1 backdrop-blur-md px-6 py-3 rounded-full shadow-lg"

                  : "left-1/2 top-0 -translate-x-1/2 scale-110"}`}>

              <Link href="/">

                <span className="font-serif font-black text-white tracking-[0.05em] uppercase whitespace-nowrap text-xl md:text-2xl">

                  CASA NOAH

                </span>

              </Link>

            </div>



         {((!isScrolled || isLockingScroll) && !showContactOnScroll) && (

  <div className="flex items-center gap-3 mt-16 animate-in fade-in zoom-in duration-500">

    <Link href="#preturi" className="flex flex-col items-center gap-1 px-5 py-2.5 bg-black/75 backdrop-blur-3xl rounded-[2.5rem] transition-all active:scale-95 border border-white/10">

      <Banknote size={20} className="text-white/90" />

      <span className="text-[10px] font-black text-white uppercase tracking-widest">Prețuri</span>

    </Link>

        <button onClick={handleOpenContact} className="flex flex-col items-center gap-1 px-5 py-2.5 bg-black/75 backdrop-blur-3xl rounded-[2.5rem] transition-all active:scale-95 border border-white/10">

      <Phone size={20} className="text-[#22c55e]" />

      <span className="text-[10px] font-black text-[#22c55e] uppercase tracking-widest">Contact</span>

    </button>

    <Link href="#card-casa-noah" className="flex flex-col items-center gap-1 px-5 py-2.5 bg-black/75 backdrop-blur-3xl rounded-[2.5rem] transition-all active:scale-95 border border-white/10">

      <ImageIcon size={20} className="text-white/90" />

      <span className="text-[10px] font-black text-white uppercase tracking-widest">Galerie</span>

    </Link>

  </div>

)}



            <div className={`absolute right-0 top-0 flex flex-col items-end transition-all duration-500

                ${isLogoCompact ? "opacity-100 scale-100" : "opacity-0 scale-90 pointer-events-none"}`}>

             

              <div className="bg-black/1 backdrop-blur-md px-1.5 py-1.5 rounded-full flex items-center gap-0.5 shadow-lg transition-all duration-500 ease-out overflow-hidden">

                <div className={`transition-all duration-500 ease-in-out flex items-center overflow-hidden

                  ${passedHero ? "w-11 opacity-100 ml-1" : "w-0 opacity-0 ml-0"}`}>

                  <a href="https://www.google.com/maps/search/Pensiunea+Casa+Noah+Sambata+de+Sus" target="_blank" className="p-2.5 rounded-full active:scale-90">

                    <MapPin size={20} className="text-blue-400" />

                  </a>

                </div>



                <div className={`transition-all duration-500 flex items-center overflow-hidden ${!showContactOnScroll ? "w-11 opacity-100" : "w-0 opacity-0"}`}>

                  <button onClick={handleOpenContact} className="p-2.5 rounded-full active:scale-90">

                    <Phone size={20} className="text-[#22c55e]" />

                  </button>

                </div>

              </div>



              {/* HINT ALERT - MULEAZA PE TEXT + SAGEATA MAI IN STANGA */}

              <div className={`absolute top-16 right-0 flex flex-col items-end transition-all duration-500

                ${showMapsHint ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-4 pointer-events-none"}`}>

               

                {/* ARROW - ALIGNED FURTHER LEFT FOR MAP PIN CENTER */}

                <div className="mr-[66px]">

                   <ArrowUp size={18} className="text-white animate-bounce" />

                </div>

               

                {/* TEXT BOX - FARA W-FULL PENTRU A SE MULA FIX PE CONTINUT */}

                <div className="bg-black/80 backdrop-blur-xl px-5 py-2.5 rounded-full border border-blue-400/20 shadow-2xl w-max flex items-center justify-center">

                   <span className="text-[10px] font-black text-blue-400 uppercase tracking-widest whitespace-nowrap text-center">

                     Vezi locația pe hartă

                   </span>

                </div>

              </div>

            </div>



            <div className={`absolute left-1/2 -translate-x-1/2 w-full flex flex-col items-center transition-all duration-300 z-[60]

                ${showContactOnScroll

                    ? "top-16 opacity-100 scale-100"

                    : "top-8 opacity-0 pointer-events-none scale-95"}`}>

                <SmartContactBar activeSide={activeSide} copied={copied} onTouchStart={onTouchStart} onTouchMove={onTouchMove} onTouchEnd={onTouchEnd} copyToClipboard={copyToClipboard} onClose={handleCloseContact} />

            </div>



          </div>

        </div>

      </div>

    </header>

  );

}



function SmartContactBar({ activeSide, copied, onTouchStart, onTouchMove, onTouchEnd, copyToClipboard, onClose }: SmartContactBarProps) {

  return (

    <div className="flex flex-col items-center gap-4 w-full max-w-[320px]">

      <div onTouchStart={onTouchStart} onTouchMove={onTouchMove} onTouchEnd={onTouchEnd}

        className={`flex items-center w-full backdrop-blur-[64px] rounded-full transition-all duration-300 p-1.5 h-14 border border-white/10 ${activeSide === "left" ? "bg-blue-600" : activeSide === "right" ? "bg-green-500" : "bg-black/10"}`}>

        <div className={`w-11 h-11 flex items-center justify-center rounded-full bg-white/10 ${activeSide === "right" ? "opacity-0" : "opacity-100"}`}>

          <Phone size={16} className={activeSide === "left" ? "text-white" : "text-blue-400"} />

        </div>

        <button onClick={copyToClipboard} className="flex-1 flex flex-col items-center">

          <span className="text-[12px] font-black tracking-[0.1em] text-white uppercase">{copied ? "COPIAT" : "0741 354 774"}</span>

          {!copied && <span className="text-[7px] font-bold text-white/40 uppercase tracking-tighter">Apasă pentru a copia</span>}

        </button>

        <div className={`w-11 h-11 flex items-center justify-center rounded-full bg-white/10 ${activeSide === "left" ? "opacity-0" : "opacity-100"}`}>

          <MessageCircle size={18} className={activeSide === "right" ? "text-white" : "text-green-500"} />

        </div>

      </div>

      <button onClick={onClose} className="flex flex-col items-center gap-1 animate-bounce">

        <ChevronUp size={20} className="text-white/60" />

        <span className="text-[8px] font-bold text-white/40 uppercase tracking-widest">Înapoi</span>

      </button>

    </div>

  );

}