'use client'

import { useEffect, useState, useRef } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { 
  PhoneIcon, 
  ShieldCheckIcon, 
  TruckIcon, 
  ClockIcon,
  CheckCircleIcon,
  StarIcon,
  ArrowRightIcon
} from '@heroicons/react/24/solid'

export default function HomePage() {
  const [hasHeroImage, setHasHeroImage] = useState(false)
  const heroRef = useRef<HTMLElement>(null)
  const servicesRef = useRef<HTMLElement>(null)
  const howItWorksRef = useRef<HTMLElement>(null)
  const whyChooseRef = useRef<HTMLElement>(null)

  useEffect(() => {
    // Check if hero image exists
    const img = new window.Image()
    img.onload = () => setHasHeroImage(true)
    img.onerror = () => setHasHeroImage(false)
    img.src = '/images/hero-truck.jpg'

    // Parallax scroll effect - fixed to prevent cutting off content
    const prefersReducedMotion = window.matchMedia(
      '(prefers-reduced-motion: reduce)'
    ).matches

    if (prefersReducedMotion) return

    const handleScroll = () => {
      const scrollY = window.scrollY
      const windowHeight = window.innerHeight

      // Hero parallax - only content, not the section container
      if (heroRef.current) {
        const heroContent = heroRef.current.querySelector('.hero-content') as HTMLElement
        if (heroContent) {
          // More conservative parallax for hero
          const heroOffset = Math.min(scrollY * 0.2, windowHeight * 0.3)
          heroContent.style.transform = `translateY(${heroOffset}px)`
        }
      }

      // Services section parallax - very subtle, clamped to prevent cutoff
      if (servicesRef.current) {
        const rect = servicesRef.current.getBoundingClientRect()
        const viewportMiddle = windowHeight / 2
        const elementMiddle = rect.top + rect.height / 2
        const distanceFromCenter = elementMiddle - viewportMiddle
        
        if (rect.top < windowHeight * 1.5 && rect.bottom > -windowHeight * 0.5) {
          // Clamp the offset to prevent cutting off
          const maxOffset = rect.height * 0.1 // Max 10% of section height
          const offset = Math.max(-maxOffset, Math.min(maxOffset, distanceFromCenter * 0.05))
          servicesRef.current.style.transform = `translateY(${offset}px)`
        } else {
          servicesRef.current.style.transform = 'translateY(0)'
        }
      }

      // How It Works parallax - very subtle
      if (howItWorksRef.current) {
        const rect = howItWorksRef.current.getBoundingClientRect()
        const viewportMiddle = windowHeight / 2
        const elementMiddle = rect.top + rect.height / 2
        const distanceFromCenter = elementMiddle - viewportMiddle
        
        if (rect.top < windowHeight * 1.5 && rect.bottom > -windowHeight * 0.5) {
          const maxOffset = rect.height * 0.08
          const offset = Math.max(-maxOffset, Math.min(maxOffset, distanceFromCenter * 0.04))
          howItWorksRef.current.style.transform = `translateY(${offset}px)`
        } else {
          howItWorksRef.current.style.transform = 'translateY(0)'
        }
      }

      // Why Choose Us parallax - very subtle
      if (whyChooseRef.current) {
        const rect = whyChooseRef.current.getBoundingClientRect()
        const viewportMiddle = windowHeight / 2
        const elementMiddle = rect.top + rect.height / 2
        const distanceFromCenter = elementMiddle - viewportMiddle
        
        if (rect.top < windowHeight * 1.5 && rect.bottom > -windowHeight * 0.5) {
          const maxOffset = rect.height * 0.1
          const offset = Math.max(-maxOffset, Math.min(maxOffset, distanceFromCenter * 0.05))
          whyChooseRef.current.style.transform = `translateY(${offset}px)`
        } else {
          whyChooseRef.current.style.transform = 'translateY(0)'
        }
      }
    }

    window.addEventListener('scroll', handleScroll, { passive: true })
    handleScroll() // Initial call
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <div className="min-h-screen">
      {/* Premium Hero Section with Truck Image */}
      <section 
        ref={heroRef}
        className="relative min-h-screen flex items-center justify-center overflow-hidden"
      >
        {/* Hero Background Image - Truck/Van */}
        <div className="absolute inset-0 z-0">
          {hasHeroImage ? (
            <>
              <Image
                src="/images/hero-truck.jpg"
                alt="MCA Autoglass Mobile Service Truck"
                fill
                className="object-cover"
                priority
                quality={90}
                sizes="100vw"
              />
              {/* Overlay for better text readability */}
              <div className="absolute inset-0 bg-gradient-to-b from-white/90 via-white/80 to-white/90"></div>
            </>
          ) : (
            // Fallback white background if image not found
            <div className="absolute inset-0 bg-white">
              <div className="absolute inset-0 bg-gradient-to-br from-primary-50 via-white to-primary-100"></div>
            </div>
          )}
        </div>

        {/* Subtle Background Elements */}
        <div className="absolute inset-0 overflow-hidden z-0 opacity-20">
          <div className="absolute top-20 left-10 w-96 h-96 bg-white/10 rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute bottom-20 right-10 w-[500px] h-[500px] bg-white/10 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }}></div>
        </div>

        {/* Content */}
        <div className="hero-content relative z-10 container-custom text-center py-32">
          <div className="animate-fade-in-up max-w-5xl mx-auto">
            {/* Trust Badge */}
            <div className="inline-flex items-center space-x-2 bg-primary-100 backdrop-blur-md px-4 py-2 rounded-full mb-8 border border-primary-300 shadow-lg">
              <StarIcon className="w-5 h-5 text-yellow-500 fill-current" />
              <span className="text-sm font-semibold text-primary-900">5.0 Rating • 150+ Reviews</span>
            </div>

            <h1 className="heading-1 text-gray-900 mb-6 text-balance">
              <span className="block">Crystal Clear</span>
              <span className="block text-primary-600">
                Confidence Starts Here
              </span>
            </h1>
            
            <p className="text-2xl md:text-3xl mb-4 text-gray-800 max-w-3xl mx-auto leading-relaxed font-medium">
              At MCA Autoglass, we believe a clear view means a safer drive.
            </p>
            <p className="text-lg md:text-xl mb-12 text-gray-700 max-w-2xl mx-auto leading-relaxed">
              Professional auto glass repair and replacement in Peoria, AZ. 
              Drive with peace of mind, knowing your glass is perfect and your safety is our priority.
            </p>
            
            {/* Premium CTAs */}
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-16">
              <a
                href="tel:602-291-6118"
                className="group relative btn-accent btn-lg overflow-hidden shadow-2xl"
              >
                <span className="absolute inset-0 bg-gradient-to-r from-accent-600 to-accent-700 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></span>
                <span className="relative flex items-center space-x-3">
                  <PhoneIcon className="w-6 h-6 group-hover:animate-pulse" />
                  <span>Call Now: (602) 291-6118</span>
                </span>
              </a>
              <Link
                href="/contact"
                className="group btn-secondary btn-lg text-primary-600 border-primary-600 bg-white hover:bg-primary-50 shadow-xl"
              >
                <span>Get Free Quote</span>
                <ArrowRightIcon className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
              </Link>
            </div>

            {/* Quick Stats */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-4xl mx-auto">
              {[
                { icon: ClockIcon, label: '30+ Years', sublabel: 'Experience' },
                { icon: ShieldCheckIcon, label: 'Lifetime', sublabel: 'Warranty' },
                { icon: TruckIcon, label: 'Mobile', sublabel: 'Service' },
                { icon: CheckCircleIcon, label: 'All Insurance', sublabel: 'Accepted' },
              ].map((stat, index) => (
                <div key={index} className="bg-white/95 backdrop-blur-md rounded-2xl p-6 border border-gray-200 shadow-lg">
                  <stat.icon className="w-8 h-8 mx-auto mb-3 text-primary-600" />
                  <div className="text-2xl font-bold text-gray-900 mb-1">{stat.label}</div>
                  <div className="text-sm text-gray-700">{stat.sublabel}</div>
                </div>
              ))}
            </div>
          </div>
        </div>

      </section>

      {/* Premium Trust Bar */}
      <section className="bg-gradient-to-b from-white/90 via-white/80 to-white/90 py-12 border-y border-gray-200">
        <div className="container-custom">
          <div className="flex flex-wrap items-center justify-center gap-8 md:gap-16">
            <div className="flex items-center space-x-4">
              <div className="flex">
                {[...Array(5)].map((_, i) => (
                  <StarIcon key={i} className="w-7 h-7 text-yellow-400 fill-current" />
                ))}
              </div>
              <div>
                <div className="text-3xl font-bold text-gray-900">5.0</div>
                <div className="text-sm text-gray-700 font-semibold">150+ Google Reviews</div>
              </div>
            </div>
            
            <div className="h-12 w-px bg-gray-300 hidden md:block"></div>
            
            <div className="flex items-center space-x-3 text-gray-900">
              <ShieldCheckIcon className="w-7 h-7 text-primary-600" />
              <span className="font-bold text-lg">Insurance Claims Handled</span>
            </div>
            
            <div className="h-12 w-px bg-gray-300 hidden md:block"></div>
            
            <div className="flex items-center space-x-3 text-gray-900">
              <TruckIcon className="w-7 h-7 text-primary-600" />
              <span className="font-bold text-lg">Mobile Service Available</span>
            </div>
            
            <div className="h-12 w-px bg-gray-300 hidden md:block"></div>
            
            <div className="flex items-center space-x-3 text-gray-900">
              <CheckCircleIcon className="w-7 h-7 text-primary-600" />
              <span className="font-bold text-lg">Lifetime Warranty</span>
            </div>
          </div>
        </div>
      </section>

      {/* Premium Services Section */}
      <section 
        ref={servicesRef}
        className="section-padding bg-gradient-to-b from-white/90 via-white/80 to-white/90 overflow-visible"
      >
        <div className="container-custom">
          <div className="text-center mb-20">
            <div className="inline-block bg-primary-50 text-primary-700 px-4 py-2 rounded-full text-sm font-bold mb-6 border border-primary-200">
              OUR SERVICES
            </div>
            <h2 className="heading-2 mb-6">
              We Offer More Than Just a Fix
            </h2>
            <p className="text-body max-w-3xl mx-auto text-gray-700">
              Comprehensive auto glass services backed by 30+ years of experience. 
              From quick chip repairs to full replacements, we've got you covered.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                icon: '🪟',
                title: 'Windshield Replacement',
                description: 'Professional windshield replacement with OEM or aftermarket glass options. Lifetime warranty included on all installations.',
                features: ['OEM & Aftermarket Options', 'Lifetime Warranty', '60-90 Minute Service'],
                color: 'from-blue-500 to-blue-600',
              },
              {
                icon: '🔧',
                title: 'Windshield Repair',
                description: 'Chip and crack repair to restore your windshield clarity and safety. Quick, affordable, and effective solutions.',
                features: ['30-Minute Service', 'Cost-Effective', 'Prevents Spreading'],
                color: 'from-green-500 to-green-600',
              },
              {
                icon: '🚗',
                title: 'Auto Window Replacement',
                description: 'Side and rear window replacement for all vehicle makes and models. Expert installation guaranteed.',
                features: ['All Vehicle Types', 'Expert Installation', 'Same-Day Service'],
                color: 'from-purple-500 to-purple-600',
              },
              {
                icon: '🚐',
                title: 'Mobile Auto Glass Services',
                description: 'We come to you at your home or business at no extra cost. Same-day service available throughout the Phoenix area.',
                features: ['No Extra Charge', 'Same-Day Available', 'Greater Phoenix Area'],
                color: 'from-orange-500 to-orange-600',
              },
              {
                icon: '📡',
                title: 'ADAS Calibrations',
                description: 'Advanced Driver Assistance Systems calibration after windshield replacement. Keep your safety features working perfectly.',
                features: ['Static & Dynamic', 'Certified Technicians', 'Safety First'],
                color: 'from-red-500 to-red-600',
              },
              {
                icon: '🚛',
                title: 'Fleet Services',
                description: 'Commercial fleet auto glass services. Keep your business vehicles on the road with our fleet programs.',
                features: ['Volume Discounts', 'Priority Scheduling', 'Fleet Accounts'],
                color: 'from-indigo-500 to-indigo-600',
              },
            ].map((service, index) => (
              <div
                key={index}
                className="group card p-8 hover:border-primary-600 bg-white hover:shadow-xl transition-all"
              >
                <div className={`inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br ${service.color} text-white text-4xl rounded-2xl mb-6 shadow-lg group-hover:scale-110 transition-transform duration-300`}>
                  {service.icon}
                </div>
                <h3 className="heading-4 mb-4 text-gray-900 group-hover:text-primary-600 transition-colors">
                  {service.title}
                </h3>
                <p className="text-gray-700 leading-relaxed mb-6">{service.description}</p>
                <ul className="space-y-2 mb-6">
                  {service.features.map((feature, i) => (
                    <li key={i} className="flex items-center text-sm text-gray-800">
                      <CheckCircleIcon className="w-5 h-5 text-primary-600 mr-2 flex-shrink-0" />
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
                <Link
                  href="/services"
                  className="inline-flex items-center space-x-2 text-primary-600 font-bold hover:text-primary-700 group-hover:space-x-3 transition-all"
                >
                  <span>Learn More</span>
                  <ArrowRightIcon className="w-5 h-5" />
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Premium How It Works */}
      <section 
        ref={howItWorksRef}
        className="section-padding bg-gradient-to-b from-white/90 via-white/80 to-white/90 overflow-visible"
      >
        <div className="container-custom">
          <div className="text-center mb-20">
            <div className="inline-block bg-primary-50 text-primary-700 px-4 py-2 rounded-full text-sm font-bold mb-6 border border-primary-200">
              SIMPLE PROCESS
            </div>
            <h2 className="heading-2 mb-6">
              How It Works
            </h2>
            <p className="text-body max-w-2xl mx-auto text-gray-700">
              Simple, fast, and hassle-free. Get back on the road in no time.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-12 relative">
            {/* Connecting Line (Desktop) */}
            <div className="hidden md:block absolute top-20 left-1/4 right-1/4 h-0.5 bg-gradient-to-r from-primary-200 via-primary-400 to-primary-200"></div>
            
            {[
              { 
                step: '1', 
                title: 'Get a Free Quote', 
                description: 'Call us or fill out our quick quote form. We\'ll provide a transparent estimate in minutes with no hidden fees.',
                icon: PhoneIcon,
              },
              { 
                step: '2', 
                title: 'Schedule Your Service', 
                description: 'Choose a time that works for you. We offer same-day service, mobile appointments, and flexible scheduling.',
                icon: ClockIcon,
              },
              { 
                step: '3', 
                title: 'Expert Installation', 
                description: 'Our certified technicians complete the work with precision and care. Lifetime warranty included on all work.',
                icon: CheckCircleIcon,
              },
            ].map((item, index) => (
              <div key={index} className="relative text-center">
                <div className="relative inline-flex items-center justify-center w-24 h-24 bg-gradient-to-br from-primary-600 to-primary-700 text-white text-4xl font-bold rounded-3xl shadow-2xl mb-6 transform hover:scale-110 transition-transform duration-300 z-10">
                  {item.step}
                </div>
                <div className="bg-white rounded-2xl p-8 shadow-xl border border-gray-200">
                  <item.icon className="w-12 h-12 text-primary-600 mx-auto mb-4" />
                  <h3 className="heading-4 mb-4 text-gray-900">{item.title}</h3>
                  <p className="text-gray-700 leading-relaxed">{item.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Premium Why Choose Us */}
      <section 
        ref={whyChooseRef}
        className="section-padding bg-gradient-to-b from-white/90 via-white/80 to-white/90 overflow-visible"
      >
        <div className="container-custom">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div>
            <div className="inline-block bg-primary-50 text-primary-700 px-4 py-2 rounded-full text-sm font-bold mb-6 border border-primary-200">
              WHY CHOOSE US
            </div>
              <h2 className="heading-2 mb-6">
                Built on Trust, Driven by Service
              </h2>
              <p className="text-body mb-8 text-gray-700">
                There's a reason MCA Autoglass has a 5-star rating on Google and multiple local accolades. 
                As a preferred vendor for all major insurances, we ensure a seamless experience from quote to completion.
              </p>
              
              <div className="space-y-6">
                {[
                  { icon: StarIcon, title: '5-Star Rated', description: 'Top-rated auto glass company with 150+ Google reviews and multiple local awards.' },
                  { icon: ShieldCheckIcon, title: 'Lifetime Warranty', description: 'Lifetime guarantee on all workmanship and glass quality for as long as you own your vehicle.' },
                  { icon: ClockIcon, title: '30+ Years Experience', description: 'Over three decades of expertise in auto glass repair and replacement.' },
                  { icon: CheckCircleIcon, title: 'Insurance Preferred', description: 'Preferred vendor for all major insurance companies. We handle claims seamlessly.' },
                ].map((item, index) => (
                  <div key={index} className="flex items-start space-x-4">
                    <div className="flex-shrink-0 w-12 h-12 bg-primary-100 rounded-xl flex items-center justify-center">
                      <item.icon className="w-6 h-6 text-primary-600" />
                    </div>
                    <div>
                      <h3 className="text-xl font-bold text-gray-900 mb-2">{item.title}</h3>
                      <p className="text-gray-700">{item.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            
            <div className="relative">
              <div className="bg-gradient-to-br from-primary-600 to-primary-800 rounded-3xl p-12 text-white shadow-2xl">
                <div className="text-center mb-8">
                  <div className="inline-flex items-center justify-center w-20 h-20 bg-white/20 backdrop-blur-md rounded-2xl mb-6">
                    <StarIcon className="w-12 h-12 text-yellow-300 fill-current" />
                  </div>
                  <div className="text-6xl font-bold mb-2">5.0</div>
                  <div className="text-xl text-primary-100">Out of 5 Stars</div>
                </div>
                
                <div className="space-y-4 mb-8">
                  {[
                    '2024 Community Votes – Best Glass Company',
                    'Nextdoor Neighborhood Favorite (2021, 2023, 2024)',
                    'Preferred Insurance Vendor',
                    'Lifetime Warranty Provider',
                  ].map((award, i) => (
                    <div key={i} className="flex items-center space-x-3">
                      <CheckCircleIcon className="w-6 h-6 text-success-400 flex-shrink-0" />
                      <span className="text-primary-100">{award}</span>
                    </div>
                  ))}
                </div>
                
                <div className="pt-8 border-t border-white/20">
                  <div className="text-center">
                    <div className="text-3xl font-bold mb-2">150+</div>
                    <div className="text-primary-200">Happy Customers</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Premium Service Areas */}
      <section className="section-padding bg-gradient-to-b from-white/90 via-white/80 to-white/90">
        <div className="container-custom">
          <div className="text-center mb-16">
            <div className="inline-block bg-primary-50 text-primary-700 px-4 py-2 rounded-full text-sm font-bold mb-6 border border-primary-200">
              SERVICE AREAS
            </div>
            <h2 className="heading-2 mb-6">
              Serving the Greater Phoenix Area
            </h2>
            <p className="text-body max-w-2xl mx-auto text-gray-700">
              We proudly serve drivers and businesses across Peoria and nearby areas with comprehensive auto glass services.
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-7 gap-4">
            {['Peoria', 'Phoenix', 'Surprise', 'El Mirage', 'Wittmann', 'Goodyear', 'Avondale', 'Anthem', 'Buckeye', 'Glendale', 'Youngtown', 'Waddell', 'Litchfield Park'].map((city, index) => (
              <div
                key={index}
                className="bg-white rounded-xl p-6 text-center shadow-lg hover:shadow-xl transform hover:-translate-y-1 transition-all duration-300 border border-gray-200 hover:border-primary-600"
              >
                <div className="text-lg font-bold text-gray-900 mb-1">{city}</div>
                <div className="text-sm text-gray-600">Service Available</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Premium Final CTA */}
      <section className="section-padding bg-primary-600 text-white relative overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute top-0 right-0 w-96 h-96 bg-primary-400/20 rounded-full blur-3xl"></div>
          <div className="absolute bottom-0 left-0 w-96 h-96 bg-primary-500/20 rounded-full blur-3xl"></div>
        </div>
        
        <div className="container-custom relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="heading-2 text-white mb-6">
              Ready to Get Back on the Road?
            </h2>
            <p className="text-xl md:text-2xl mb-10 text-primary-100 leading-relaxed">
              Don't let a crack hold you back. Call or text today to experience MCA Autoglass – 
              Peoria's most trusted name in auto glass repair and replacement.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <a
                href="tel:602-291-6118"
                className="btn-accent btn-lg group"
              >
                <PhoneIcon className="w-6 h-6 mr-3 group-hover:animate-pulse" />
                <span>Call (602) 291-6118</span>
              </a>
              <Link
                href="/contact"
                className="btn-secondary btn-lg text-white border-white/30 bg-white/10 backdrop-blur-md hover:bg-white/20"
              >
                Get Free Quote
              </Link>
            </div>
            
            <div className="mt-12 pt-8 border-t border-white/20">
              <p className="text-primary-200 mb-4 font-semibold">Business Hours</p>
              <div className="flex flex-wrap justify-center gap-6 text-primary-100">
                <div>Monday - Friday: <span className="font-bold text-white">8:00 AM - 5:00 PM</span></div>
                <div>Saturday: <span className="font-bold text-white">By Appointment</span></div>
                <div>Sunday: <span className="font-bold text-white">Closed</span></div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
