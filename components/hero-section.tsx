import Link from "next/link"
import { Button } from "@/components/ui/button"
import { MapPin } from "lucide-react"

export function HeroSection() {
  return (
    <section className="relative min-h-screen flex items-center overflow-hidden">
   {/* Background Image & Overlays */}
      <div className="absolute inset-0 z-0">
        {/* Am înlocuit tag-ul <video> cu <img> */}
        <img
          src="/images/1.jpg"
          alt="Background"
          className="object-cover w-full h-full scale-110 md:scale-100"
        />
        
        {/* Gradient existent: Stânga -> Dreapta */}
        <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/40 md:via-black/40 to-transparent" />
        
        {/* Gradient NOU: Sus -> Mijloc (Negru la Transparent) */}
        <div className="absolute inset-0 bg-gradient-to-b from-black via-transparent to-transparent h-1/2" />

        {/* Gradient existent: Jos -> Sus */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-transparent to-black" />
      </div>

      {/* Content */}
      {/* Am mărit padding-top (pt-40) pe mobil pentru a împinge totul sub Smart Bar */}
      <div className="relative z-10 container mx-auto px-6 pt-40 md:pt-24 flex justify-center" style={{ animation: 'fade-in-up 1.5s ease-out 0.5s forwards' }}>
        <div className="max-w-2xl text-center flex flex-col items-center">
          
          {/* LOCAȚIE DESKTOP (Rămâne neatinsă) */}
          <a 
            href="https://www.google.com/maps/search/Pensiunea+Casa+Noah+Sambata+de+Sus"
            target="_blank"
            rel="noopener noreferrer"
            className="hidden md:inline-flex group items-center gap-2 mb-6 px-4 py-2 rounded-full border border-white/20 bg-white/5 backdrop-blur-sm transition-all duration-500 hover:bg-white/15 hover:border-white/40 hover:scale-105"
          >
            <div className="flex items-center gap-2 cursor-pointer transition-all duration-300">
              <MapPin className="h-4 w-4 text-white group-hover:text-[#1aaf52]" />
              <span className="text-white text-sm font-medium tracking-wide uppercase">
                Sâmbăta de Sus, Munții Făgăraș, Brașov
              </span>
            </div>
          </a>

          {/* TITLU - Ajustat pentru a nu se suprapune */}
          <h1 className="font-[family-name:var(--font-display)] text-[4.2rem] md:text-[10rem] text-white mb-4 md:mb-6 leading-[0.9] md:leading-tight tracking-tight md:tracking-wide uppercase drop-shadow-2xl">
            Casa Noah
          </h1>

          <p className="text-base md:text-xl text-white/85 mb-12 md:mb-4 leading-relaxed max-w-xl mx-auto drop-shadow-md px-4 md:px-0">
            O cabană din lemn cu suflet, unde liniștea munților se îmbină cu confortul modern.
          </p>

          <div className="w-full flex flex-col items-center gap-12 mt-6:80">
            
            {/* BUTON REZERVĂ DESKTOP (Rămâne neatins) */}
            <div className="hidden md:flex justify-center">
              <Button
                asChild
                size="lg"
                className="group text-white font-medium px-20 py-6 text-lg rounded-full transition-all duration-500 hover:scale-110 shadow-xl"
                style={{ backgroundColor: "#1aaf52" }}
              >
                <Link href="#contact" className="relative overflow-hidden">
                  <span className="relative z-10">REZERVA ACUM</span>
                </Link>
              </Button>
            </div>

            {/* LOCAȚIE MOBIL - Mutată mai jos */}
            <div className="md:hidden flex flex-col items-center">
                <a 
                    href="https://www.google.com/maps/search/Pensiunea+Casa+Noah+Sambata+de+Sus"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group flex flex-col items-center gap-3 active:scale-95 transition-all"
                >
                    <div className="w-12 h-12 flex items-center justify-center rounded-full bg-black/10 backdrop-blur-[10px] shadow-lg">
                        <MapPin className="h-5 w-5 text-[#1aaf52]" />
                    </div>
                    <div className="flex flex-col items-center">
                        <span className="text-white text-[10px] font-black tracking-[0.2em] uppercase opacity-60 mb-1">Locație Cabană</span>
                        <span className="text-white text-[13px] font-bold tracking-wide uppercase text-center border-b border-white/20 pb-1">
                            Sâmbăta de Sus, Brașov
                        </span>
                    </div>
                </a>
            </div>

          </div>
        </div>
      </div>
    </section>
  )
}