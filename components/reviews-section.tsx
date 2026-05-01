"use client"

import React, { useState, useEffect, useRef } from "react"
import { Star, Quote } from "lucide-react"

// --- DATELE COMPLETE ---
interface Review {
  name: string;
  location: string;
  countryCode: "RO" | "IL" | "INT";
  source: string;
  rating: number;
  text: string;
}

const reviews: Review[] = [
  { name: "Tisianu Vlad", location: "București, România", countryCode: "RO", source: "Turistinfo", rating: 5, text: "Superb! Locatia este foarte curata, calduroasa, spatioasa si luminoasa, foisorul de afara se poate incalzi, ambele bucatarii dotate cu tot ce este necesar, gazdele sunt de nota 10, ajuta cu orice este nevoie iar ciubarul este senzational! Recomandăm cu drag oricui!" },
  { name: "Adriana H.", location: "București, România", countryCode: "RO", source: "Turistinfo", rating: 4.8, text: "Am fost un grup de 10 prieteni, am închiriat locația complet. Totul la superlativ! Pensiunea foarte curată, dotată cu tot ce are nevoie, gazdele foarte primitoare. Am optat și pentru ciubar, iar apa cât de caldă ne-am dorit. Recomand să dați mesaj pe WhatsApp proprietarului oricând pentru orice problemă, că este foarte agreabil și dornic să ajute." },
  { name: "Marius Neagu", location: "București, România", countryCode: "RO", source: "Turistinfo", rating: 5, text: "Pensiunea este un loc deosebit, ideal pentru o escapadă liniștită și relaxantă. Curățenia este impecabilă, fiecare colț al pensiunii fiind bine întreținut. Copiii au parte de distracție pe cinste datorită locului de joacă special amenajat. Gazda este deosebit de primitoare și atentă la nevoile fiecarei oaspete." },
  { name: "Marin Andreea", location: "Prahova, România", countryCode: "RO", source: "Turistinfo", rating: 5, text: "Am fost un grup de 8 tineri cu 3 copii mici și totul a fost la superlativ. De la cazarea care a fost impecabilă, cu toate utilitățile necesare, camere curate și moderne, curtea amenajată cu grătar, loc pentru ceaun, loc de joacă pentru copii, la gazdele care sunt niște oameni de milioane. P.S. ciubarul a fost cireașa de pe tot!" },
  { name: "Barbu Florina", location: "București, România", countryCode: "RO", source: "Turistinfo", rating: 5, text: "Recomand această locație, proprietarii sunt foarte drăguți, primitori, nu te deranjează cu absolut nimic. Casa este foarte primitoare, curată, emană energie pozitivă. Camere mare, spațioase, ciubar, piscină, foișor, tot ce ai nevoie la bucătărie." },
  { name: "Dumitru Ștefan", location: "București, România", countryCode: "RO", source: "Turistinfo", rating: 5, text: "Într-un loc binecuvântat de Dumnezeu, gazdele pensiunii se întrec pe sine pentru a încânta turiștii. În camere cu tot confortul hotelier, cu mese pregătite ca la mama acasă, într-un cadru natural fiecare secundă petrecută te întinerește. Recomand, și cu certitudine vom reveni." },
  { name: "Bianca", location: "București, România", countryCode: "RO", source: "Turistinfo", rating: 5, text: "Cazarea este superbă, totul curat, nou și pus la punct. Camerele sunt mari, luminoase, călduroase și curate. Vila este echipată cu tot ce ai nevoie pentru a petrece un sejur de câteva zile. Gazdele au fost foarte amabile, primitoare și atente la nevoile noastre. Recomand 100%!!!" },
  { name: "Isabela", location: "București, România", countryCode: "RO", source: "Turistinfo", rating: 5, text: "Totul a fost la superlativ. Gazda s-a asigurat că nu ne lipsește nimic încă dinainte să ajungem. Apreciem că au fost de acord să mutăm rezervarea din cauza unei situații neprevăzute. Nu a existat niciun minus, iar sejurul nostru a fost unul extraordinar. De menționat faptul că au fost de acord cu animalele de companie." },
  { name: "Raluca", location: "Sibiu, România", countryCode: "RO", source: "Turistinfo", rating: 5, text: "Un loc primitor și călduros. Casa este într-o zonă liniștită și cu o priveliște frumoasă. Ne-am bucurat de livada de lângă casă, unde copiii au putut alerga și mânca mere, de locul de joacă pentru copii și de minunații iepurași existenți acolo. Totul este la superlativ!" },
  { name: "Ioana", location: "Brașov, România", countryCode: "RO", source: "Turistinfo", rating: 5, text: "O locație frumoasă și modernă. Complet utilată, interiorul arată frumos și curat. Este perfectă pentru familiile cu copii, curtea este mare și frumos amenajată — foișor, căsuță pentru copii, hamac, tobogan, leagăn și un spațiu verde generos unde copiii au loc să se joace în voie." },
  { name: "Maria", location: "Brașov, România", countryCode: "RO", source: "Turistinfo", rating: 5, text: "Un loc frumos, curat, fiecare cameră dispune de baie proprie, căldură, bucătărie super utilată, foișor mare, grătar, ceaun, ciubar, loc de joacă, zonă de relaxare în grădină, WiFi, gazde primitoare și de mare ajutor. Totul la superlativ. Mulțumim." },
  { name: "Dorina Tuntuc", location: "Bacău, România", countryCode: "RO", source: "Turistinfo", rating: 5, text: "O locație frumoasă, cu o casă primitoare, cu camere de o curățenie exemplară. Curtea este mare, plină de verdeață și flori, foișor dotat cu de de toate, spațiu de joacă pentru copii, piscină, ciubar... totul este minunat! Mulțumim, ați fost niște gazde minunate! Nota 10 plus!" },
  { name: "Anghel Ana Maria", location: "Mogoșani, România", countryCode: "RO", source: "Turistinfo", rating: 5, text: "O locație deosebită, dotată cu tot strictul necesar. Curtea foarte frumos amenajată, gazde excepționale. Foișor dotat cu tot ce trebuie. Liniște, curățenie, piscină, ciubar, loc de joacă pentru copii. Ne-a plăcut atât de mult, că am revenit. Nota 10!!! Felicitări!!" },
  { name: "Catalina", location: "București, România", countryCode: "RO", source: "Turistinfo", rating: 5, text: "Super locație! Gazdă primitoare, o persoană deschisă. Veți găsi o casă de o curățenie exemplară, cu camere foarte confortabile (fiecare cu baie proprie, cu halate și prosoape), utilate cu spațiu mai mult decât suficient. Bucătăria este utilată mai ceva decât acasă, ciubarul este perfect și nou." },
  { name: "Luiza Ghinea", location: "Oltenița, România", countryCode: "RO", source: "Turistinfo", rating: 5, text: "Recomand cu încredere! Un loc minunat, gazde primitoare și momente minunate petrecute! Tot ce ai nevoie găsești aici, nici cel mai cârcotaș om nu are cum să găsească cusur. Vă mulțumim pentru tot!" },
  { name: "Radu Elena", location: "Găești, România", countryCode: "RO", source: "Turistinfo", rating: 5, text: "Recomand, cu încredere! Totul la superlativ, condiții excepționale: curățenie, ordine, bucătărie super utilată, camerele curate, dotate cu tot ce trebuie, living mare, modern, foișor complet utilat, curte mare, verdeață, multiple locuri de joacă!" },
  { name: "Olea Maria Ruxandra", location: "București, România", countryCode: "RO", source: "Turistinfo", rating: 5, text: "O casă primitoare, cu camere mari, spaçioase. Curățenie, mobilier nou, modern, bucătărie complet mobilată cu absolut tot ce ai nevoie. Curte mare, ciubar, grătar cu foișor, obiecte de joacă pentru copii, animăluțe (iepuri). Totul e minunat, vom reveni neapărat!" },
  { name: "Oaspete", location: "România", countryCode: "RO", source: "Booking.com", rating: 5, text: "Casa Noah a fost peste așteptări! Zona este absolut spectaculoasă, iar vederea din cameră este de-a dreptul incredibilă, oferind un peisaj de care nu te mai saturi. Bucătăria este foarte bine echipată, având tot ce îți trebuie pentru gătit." },
  { name: "Oaspete", location: "România", countryCode: "RO", source: "Booking.com", rating: 5, text: "Locația este minunată iar contactul cu gazda de nota 10. Unitatea este dotată cu tot ce trebuie pentru a petrece un timp minunat. Ne-a plăcut mult, recomandăm!" },
  { name: "Guest", location: "Israel", countryCode: "IL", source: "Booking.com", rating: 5, text: "Great location, the villa is fully equipped with everything you need. The hosts are very pleasant and genuinely want you to feel comfortable. Highly recommended for families or groups of couples. The washing machine, dryer, and even the friendly dog and cats were a lovely touch!" },
  { name: "Guest", location: "International", countryCode: "INT", source: "Booking.com", rating: 5, text: "Everything was perfect. The view is angelic, the rooms are cozy and you feel like home once you step in the house. Absolutely magical setting in the Fagaras Mountains. We will be back without a doubt." },
  { name: "Eduard Arizescu", location: "Brașov, România", countryCode: "RO", source: "Google.com", rating: 5, text: "O oază de liniște la poalele munților Făgăraș, un loc în mijlocul naturii unde te simți ca acasă. Am petrecut două săptămâni minunate cu familia înconjurați de natură, amabilitate și comfort. De gazde vă puteți convinge în primul moment când îi întâlniți, extrem de primitori și bucuroși să pună tot ce este cu putință la dispoziția oaspeților. Recomand din suflet!" },
  { name: "Mihaela Negoita", location: "București, România", countryCode: "RO", source: "Google.com", rating: 5, text: "O experienta plăcută am avut petrecând 3 zile minunate în aceasta liniștită locație! Cabana este amplasata oferindu-ne una minunata priveliște către munți, liniște deplina, curățenie, și tot ceea ce este necesar pentru a te bucura de momente minunate cu cei dragi! Recomandăm, vom revenii și în anotimpul cald!" },
  { name: "Iulia Postolea", location: "București, România", countryCode: "RO", source: "Google.com", rating: 5, text: "Gazdele extraordinare, niște oameni deosebiți. Locația superbă, o curățenie exemplară! Totul la superlativ! Cabana dotată cu de toate, cafea din partea casei. Mulțumim!" },
  { name: "Karin Munteanu", location: "Brașov, România", countryCode: "RO", source: "Google.com", rating: 5, text: "O locație superbă cu un peisaj mirific. Ideal pentru familie cu copii cât și pentru grup de prieteni. Camere spațioase, curățenie impecabilă, gazde prietenoase și disponibile, atente la detalii. Locul ideal!" },
  { name: "mirceawyz", location: "Brașov, România", countryCode: "RO", source: "Google.com", rating: 5, text: "Super cabană. Recomand pentru un timp de relaxare plăcut cu priveliști de vis! Gazde de nota 100, călduroase și primitoare." },
  { name: "Marius Calin", location: "București, România", countryCode: "RO", source: "Google.com", rating: 5, text: "Frumos și elegant. Niște oameni excepționali cei de la pensiune. Priveliști DIVINE. Vom reveni cu siguranță!" },
  { name: "Gabriel Sarbu", location: "București, România", countryCode: "RO", source: "Google.com", rating: 5, text: "O cabană foarte frumoasă cu un ciubar extraordinar. Bucătăria foarte dotată și grătarul ok. Camerele foarte curate și bine amenajate." }
];

// --- COMPONENTA STEAG ---
const Flag = ({ code }: { code: string }) => {
  if (code === "RO") return (
    <svg viewBox="0 0 3 2" className="w-5 h-3.5 rounded-sm shadow-sm border border-white/10">
      <rect width="1" height="2" fill="#002b7f"/><rect width="1" height="2" x="1" fill="#fcd116"/><rect width="1" height="2" x="2" fill="#ce1126"/>
    </svg>
  );
  if (code === "IL") return (
    <svg viewBox="0 0 11 8" className="w-5 h-3.5 rounded-sm shadow-sm bg-white border border-white/10">
      <path fill="#0038b8" d="M0 1h11v1H0zm0 5h11v1H0z"/><path fill="none" stroke="#0038b8" strokeWidth="0.5" d="M5.5 2.5l1.5 2.5h-3zM5.5 5.5l1.5-2.5h-3z"/>
    </svg>
  );
  return <span className="text-[14px]">🌍</span>;
};

// --- CARDUL DE RECENZIE ---
const ReviewCard = ({ review }: { review: Review }) => (
  <div className="group relative w-[320px] md:w-[420px] bg-[#0a0a0a] p-8 rounded-[2.5rem] border border-white/5 shadow-2xl mx-4 flex-shrink-0 flex flex-col h-full select-none transition-colors hover:bg-[#0f0f0f]">
    <div className="relative z-10 flex flex-col h-full pointer-events-none">
      <div className="flex justify-between items-start mb-6">
        <div className="flex gap-1">
          {[...Array(5)].map((_, i) => (
            <Star key={i} className={`h-4 w-4 ${i < Math.floor(review.rating) ? "fill-green-500 text-green-500" : "text-white/10"}`} />
          ))}
        </div>
        <Quote className="h-7 w-7 text-green-500/10" />
      </div>
      
      <p className="text-gray-200 text-[14px] md:text-[15px] leading-relaxed italic mb-8 whitespace-normal flex-grow">
        {`"${review.text}"`}
      </p>

      <div className="flex items-center justify-between pt-6 border-t border-white/5 mt-auto">
        <div className="flex items-center gap-4">
          <div className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center border border-white/10">
            <Flag code={review.countryCode} />
          </div>
          <div className="text-left">
            <p className="font-bold text-[14px] text-white leading-none mb-1">{review.name}</p>
            <p className="text-[10px] text-white/40 uppercase tracking-widest font-black">{review.location}</p>
          </div>
        </div>
        <span className="text-[10px] font-black uppercase tracking-widest text-white/20">{review.source}</span>
      </div>
    </div>
  </div>
);

export function ReviewsSection() {
  const [isVisible, setIsVisible] = useState(false);
  const [count, setCount] = useState(0);
  const sectionRef = useRef<HTMLElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const scrollPos = useRef(0);
  const isDragging = useRef(false);
  const startX = useRef(0);
  const requestRef = useRef<number>(0);

  const animate = () => {
    if (!isDragging.current && containerRef.current) {
      scrollPos.current -= 0.65;
      const maxScroll = containerRef.current.scrollWidth / 3;
      if (Math.abs(scrollPos.current) >= maxScroll) scrollPos.current = 0;
      containerRef.current.style.transform = `translate3d(${scrollPos.current}px, 0, 0)`;
    }
    requestRef.current = requestAnimationFrame(animate);
  };

  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) setIsVisible(true);
    }, { threshold: 0.1 });
    if (sectionRef.current) observer.observe(sectionRef.current);
    
    requestRef.current = requestAnimationFrame(animate);
    return () => {
      observer.disconnect();
      cancelAnimationFrame(requestRef.current);
    };
  }, []);

  useEffect(() => {
    if (isVisible) {
      let start = 0;
      const timer = setInterval(() => {
        start += 1;
        if (start >= 120) { setCount(120); clearInterval(timer); }
        else setCount(start);
      }, 15);
      return () => clearInterval(timer);
    }
  }, [isVisible]);

  return (
    <section id="reviews" ref={sectionRef} className="py-24 bg-[#050505] relative overflow-hidden text-white">
      <div className="absolute top-0 left-0 w-full h-full pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-[600px] h-[600px] bg-green-900/10 rounded-full blur-[150px]" />
      </div>

      <div className={`relative z-10 transition-all duration-1000 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-12 opacity-0'}`}>
        <div className="container mx-auto px-6 text-center mb-16">
          <h2 className="font-display font-bold text-4xl md:text-6xl text-white mb-8 uppercase tracking-tighter">
            Recenzii <span className="italic text-green-500 font-serif lowercase">Verificate</span>
          </h2>
          
          <div className="flex flex-col items-center gap-10">
            <div className="flex items-center gap-6 bg-[#0a0a0a] px-8 py-5 rounded-[2rem] border border-white/5 shadow-2xl">
              <div className="flex flex-col items-center border-r border-white/10 pr-6">
                 <span className="font-bold text-4xl text-white tabular-nums">4.9</span>
                 <span className="text-[10px] text-white/40 uppercase font-black tracking-widest">Scor mediu</span>
              </div>
              <div className="flex flex-col items-start pl-2">
                <div className="flex gap-1 mb-1.5">
                  {[...Array(5)].map((_, i) => <Star key={i} className="h-5 w-5 fill-green-500 text-green-500" />)}
                </div>
                <span className="text-sm font-medium text-white/50 tracking-tight">
                  bazat pe <span className="font-bold text-white tabular-nums text-lg">100</span>+ de recenzii
                </span>
              </div>
            </div>

            <a href="https://share.google/xlRGfMg4dPQV6IdH5" target="_blank" rel="noopener noreferrer"
               className="group relative px-10 py-4 overflow-hidden rounded-full bg-green-500 text-black font-black text-[12px] uppercase tracking-[0.4em] transition-all hover:scale-105 active:scale-95 shadow-[0_10px_40px_-10px_rgba(34,197,94,0.5)]">
              <span className="relative z-10">Adaugă o recenzie :)</span>
              <div className="absolute inset-0 bg-white opacity-0 group-hover:opacity-20 transition-opacity" />
            </a>
          </div>
        </div>

        <div 
          className="flex overflow-hidden [mask-image:linear-gradient(to_right,transparent,black_15%,black_85%,transparent)] py-6 cursor-grab active:cursor-grabbing"
          onMouseDown={(e) => { isDragging.current = true; startX.current = e.clientX - scrollPos.current; }}
          onMouseMove={(e) => { 
            if (!isDragging.current || !containerRef.current) return;
            scrollPos.current = e.clientX - startX.current;
            containerRef.current.style.transform = `translate3d(${scrollPos.current}px, 0, 0)`;
          }}
          onMouseUp={() => isDragging.current = false}
          onMouseLeave={() => isDragging.current = false}
          onTouchStart={(e) => { isDragging.current = true; startX.current = e.touches[0].clientX - scrollPos.current; }}
          onTouchMove={(e) => {
            if (!isDragging.current || !containerRef.current) return;
            scrollPos.current = e.touches[0].clientX - startX.current;
            containerRef.current.style.transform = `translate3d(${scrollPos.current}px, 0, 0)`;
          }}
          onTouchEnd={() => isDragging.current = false}
        >
          <div ref={containerRef} className="flex will-change-transform items-stretch">
            {[...reviews, ...reviews, ...reviews].map((review, i) => (
              <ReviewCard key={i} review={review} />
            ))}
          </div>
        </div>
<div className="mt-20 flex flex-col items-center pointer-events-none select-none">
          <div className="w-16 h-[1px] bg-white/5 mb-4" />
          <h3 
  className="text-3xl md:text-3xl text-white opacity-[0.15] font-light tracking-wide font-[family-name:var(--font-dancing)]"
>
  Va multumim tuturor!
</h3>
        </div>

      </div>
    </section>
  );
}