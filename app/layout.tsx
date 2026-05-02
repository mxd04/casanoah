import type { Metadata } from 'next'
import { Bebas_Neue, Inter, Sacramento } from 'next/font/google'
import { Analytics } from '@vercel/analytics/next'
import './globals.css'
// 1. IMPORTĂM COMPONENTA DE SCROLL
import { SmoothScroll } from '@/components/SmoothScroll' 

const bebasNeue = Bebas_Neue({ 
  subsets: ["latin"],
  weight: ["400"],
  variable: "--font-display"
});

const inter = Inter({ 
  subsets: ["latin"],
  variable: "--font-sans"
});

const sacramento = Sacramento({
  subsets: ["latin"],
  weight: ["400"],
  variable: "--font-sacramento"
});

export const metadata: Metadata = {
  title: 'Casa Noah | Cabană la Munte în Sâmbăta de Sus',
  description: 'Evadează la munte în cabana noastră din lemn cu ciubar în stațiunea climaterică Sâmbăta de Sus, la poalele Munților Făgăraș.',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="ro">
      <body className={`${inter.variable} ${bebasNeue.variable} ${sacramento.variable} font-sans antialiased`}>
        
        {/* 2. ÎNVELIM TOT CONȚINUTUL ÎN SMOOTHSCROLL */}
        <SmoothScroll>
          <main>
            {children}
          </main>
        </SmoothScroll>

        <Analytics />
      </body>
    </html>
  )
}