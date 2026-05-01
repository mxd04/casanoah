import type { Metadata } from 'next'
import { Bebas_Neue, Inter, Sacramento } from 'next/font/google' // 1. Am adaugat Sacramento aici
import { Analytics } from '@vercel/analytics/next'
import './globals.css'

const bebasNeue = Bebas_Neue({ 
  subsets: ["latin"],
  weight: ["400"],
  variable: "--font-display"
});

const inter = Inter({ 
  subsets: ["latin"],
  variable: "--font-sans"
});

// 2. Configuram Sacramento
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
      {/* 3. Am adaugat sacramento.variable in className */}
      <body className={`${inter.variable} ${bebasNeue.variable} ${sacramento.variable} font-sans antialiased`}>
        
        {children}

        <Analytics />
      </body>
    </html>
  )
}