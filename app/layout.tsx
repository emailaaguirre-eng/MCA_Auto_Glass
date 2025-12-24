import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import { Suspense } from 'react'
import './globals.css'
import Header from '@/components/layout/Header'
import Footer from '@/components/layout/Footer'
import MobileCallBar from '@/components/layout/MobileCallBar'
import ChipToClearIntro from '@/components/animations/ChipToClearIntro'

const inter = Inter({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-inter',
})

export const metadata: Metadata = {
  title: 'MCA Autoglass | Windshield Replacement & Repair in Peoria, AZ',
  description: 'Professional auto glass repair and replacement in Peoria, AZ. Mobile service, insurance accepted, lifetime warranty. Call 602-291-6118 for a free quote.',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className={inter.variable}>
      <body>
        <Suspense fallback={null}>
          <ChipToClearIntro />
        </Suspense>
        <Header />
        <main className="min-h-screen">{children}</main>
        <Footer />
        <MobileCallBar />
      </body>
    </html>
  )
}
