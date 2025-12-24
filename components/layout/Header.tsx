'use client'

import Link from 'next/link'
import Image from 'next/image'
import { useState, useEffect } from 'react'
import { PhoneIcon, Bars3Icon, XMarkIcon } from '@heroicons/react/24/solid'

const phone = process.env.NEXT_PUBLIC_PHONE || '602-291-6118'
const phoneFormatted = process.env.NEXT_PUBLIC_PHONE_FORMATTED || '(602) 291-6118'

export default function Header() {
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          isScrolled
            ? 'bg-white/98 backdrop-blur-xl shadow-2xl border-b border-gray-200'
            : 'bg-white/95 backdrop-blur-lg shadow-lg'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-24">
            {/* Premium Logo */}
            <Link
              href="/"
              className="flex items-center group"
            >
              <div className="relative h-20 w-auto transform group-hover:scale-105 transition-transform duration-300">
                <Image
                  src="/logo.svg"
                  alt="MCA Autoglass Logo"
                  width={250}
                  height={100}
                  className="object-contain h-20 w-auto"
                  priority
                />
              </div>
            </Link>

            {/* Premium Desktop Navigation */}
            <nav className="hidden lg:flex items-center space-x-2">
              {/* Top Row Navigation */}
              <div className="flex items-center space-x-1 bg-gray-50 rounded-xl p-2">
                <Link
                  href="/"
                  className="px-5 py-2.5 text-gray-900 hover:text-primary-600 hover:bg-white font-bold text-sm uppercase rounded-lg transition-all duration-200"
                >
                  HOME
                </Link>
                <Link
                  href="/services"
                  className="px-5 py-2.5 text-gray-900 hover:text-primary-600 hover:bg-white font-bold text-sm uppercase rounded-lg transition-all duration-200"
                >
                  SERVICES
                </Link>
                <Link
                  href="/service-areas"
                  className="px-5 py-2.5 text-gray-900 hover:text-primary-600 hover:bg-white font-bold text-sm uppercase rounded-lg transition-all duration-200"
                >
                  AREAS WE SERVE
                </Link>
                <Link
                  href="/faqs"
                  className="px-5 py-2.5 text-accent-500 hover:text-accent-600 hover:bg-accent-50 font-bold text-sm uppercase rounded-lg transition-all duration-200"
                >
                  FAQS
                </Link>
                <Link
                  href="/gallery"
                  className="px-5 py-2.5 text-gray-900 hover:text-primary-600 hover:bg-white font-bold text-sm uppercase rounded-lg transition-all duration-200"
                >
                  GALLERY
                </Link>
              </div>
              
              {/* Bottom Row Navigation */}
              <div className="flex items-center space-x-1 ml-4">
                <Link
                  href="/about"
                  className="px-5 py-2.5 text-gray-900 hover:text-primary-600 font-bold text-sm uppercase rounded-lg transition-all duration-200"
                >
                  ABOUT
                </Link>
                <Link
                  href="/contact"
                  className="px-5 py-2.5 text-gray-900 hover:text-primary-600 font-bold text-sm uppercase rounded-lg transition-all duration-200"
                >
                  CONTACT
                </Link>
              </div>
            </nav>

            {/* Premium CTA Button */}
            <div className="hidden md:flex items-center ml-8">
              <a
                href={`tel:${phone}`}
                className="group relative bg-gradient-to-r from-accent-500 to-accent-600 text-white px-8 py-4 rounded-xl font-bold shadow-2xl hover:shadow-accent-500/50 transform hover:-translate-y-1 transition-all duration-300 flex items-center space-x-3 overflow-hidden"
                aria-label={`Call ${phoneFormatted}`}
              >
                <span className="absolute inset-0 bg-gradient-to-r from-accent-600 to-accent-700 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></span>
                <PhoneIcon className="w-6 h-6 relative z-10 group-hover:animate-pulse" />
                <span className="relative z-10 hidden lg:inline">{phoneFormatted}</span>
                <span className="relative z-10 lg:hidden">Call Now</span>
              </a>
            </div>

            {/* Mobile Menu Button */}
            <button
              className="lg:hidden p-3 text-gray-700 hover:text-primary-600 hover:bg-gray-100 rounded-lg transition-colors"
              aria-label="Toggle menu"
              type="button"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            >
              {isMobileMenuOpen ? (
                <XMarkIcon className="w-7 h-7" />
              ) : (
                <Bars3Icon className="w-7 h-7" />
              )}
            </button>
          </div>
        </div>

        {/* Premium Mobile Menu */}
        {isMobileMenuOpen && (
          <div className="lg:hidden bg-white border-t-2 border-gray-200 shadow-2xl animate-slide-up">
            <nav className="px-4 py-6 space-y-2">
              {[
                { href: '/', label: 'HOME' },
                { href: '/services', label: 'SERVICES' },
                { href: '/service-areas', label: 'AREAS WE SERVE' },
                { href: '/faqs', label: 'FAQS', highlight: true },
                { href: '/gallery', label: 'GALLERY' },
                { href: '/about', label: 'ABOUT' },
                { href: '/contact', label: 'CONTACT' },
              ].map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`block px-6 py-4 rounded-xl font-bold text-sm uppercase transition-all ${
                    item.highlight
                      ? 'bg-accent-50 text-accent-600 hover:bg-accent-100'
                      : 'text-gray-700 hover:bg-primary-50 hover:text-primary-600'
                  }`}
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  {item.label}
                </Link>
              ))}
              <a
                href={`tel:${phone}`}
                className="block mt-4 bg-gradient-to-r from-accent-500 to-accent-600 text-white px-6 py-4 rounded-xl font-bold text-center shadow-xl"
              >
                Call {phoneFormatted}
              </a>
            </nav>
          </div>
        )}
      </header>
      <div className="h-24"></div> {/* Spacer for fixed header */}
    </>
  )
}
