"use client";

import { ReactLenis } from '@studio-freight/react-lenis'

export const SmoothScroll = ({ children }: { children: React.ReactNode }) => {
  return (
    <ReactLenis 
      root 
      options={{ 
        // 1. Durata și fluiditatea (Optimizat pentru 144Hz)
        duration: 1.2, 
        lerp: 0.1, 
        
        // 2. Controlul roțiței de mouse
        smoothWheel: true,
        wheelMultiplier: 1,
        
        // 3. Controlul pentru Touch (Înlocuitor pentru smoothTouch)
        // syncTouch înseamnă că nu forțăm scroll-ul JS peste cel nativ de mobil
        syncTouch: false, 
        touchMultiplier: 2,

        // 4. Easing-ul premium
        easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
        
        // autoRaf a fost scos din opțiuni în noile versiuni deoarece 
        // componenta ReactLenis îl gestionează singură acum.
      }}
    >
      {children as any}
    </ReactLenis>
  )
}