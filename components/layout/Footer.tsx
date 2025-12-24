import Link from 'next/link'
import { PhoneIcon, EnvelopeIcon, MapPinIcon, StarIcon } from '@heroicons/react/24/outline'

const phone = process.env.NEXT_PUBLIC_PHONE || '602-291-6118'
const phoneFormatted = process.env.NEXT_PUBLIC_PHONE_FORMATTED || '(602) 291-6118'
const email = process.env.NEXT_PUBLIC_EMAIL || 'mcaautoglass@gmail.com'

export default function Footer() {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="bg-gradient-to-b from-white/90 via-white/80 to-white/90 border-t-2 border-gray-200 relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute inset-0" style={{
          backgroundImage: 'radial-gradient(circle at 2px 2px, white 1px, transparent 0)',
          backgroundSize: '40px 40px'
        }}></div>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
          {/* About */}
          <div>
            <h3 className="text-gray-900 font-bold text-2xl mb-6">About MCA Autoglass</h3>
            <p className="text-sm leading-relaxed mb-6 text-gray-700">
              Family-owned and locally operated, serving Peoria, AZ, and surrounding
              communities with over 30 years of experience in auto glass repair and
              replacement.
            </p>
            <div className="flex items-center space-x-2 bg-primary-50 px-4 py-3 rounded-xl border border-primary-200">
              <div className="flex">
                {[...Array(5)].map((_, i) => (
                  <StarIcon key={i} className="w-5 h-5 text-yellow-400 fill-current" />
                ))}
              </div>
              <div className="ml-2">
                <div className="text-lg font-bold text-gray-900">5.0</div>
                <div className="text-xs text-gray-700">150+ Reviews</div>
              </div>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-gray-900 font-bold text-xl mb-6">Quick Links</h3>
            <ul className="space-y-3">
              {[
                { href: '/about', label: 'About Us' },
                { href: '/services', label: 'Services' },
                { href: '/service-areas', label: 'Service Areas' },
                { href: '/reviews', label: 'Reviews' },
                { href: '/contact', label: 'Contact' },
              ].map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-gray-700 hover:text-primary-600 transition-colors duration-200 inline-flex items-center space-x-2 group"
                  >
                    <span className="w-0 h-0.5 bg-primary-600 group-hover:w-3 transition-all duration-200"></span>
                    <span>{link.label}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Services */}
          <div>
            <h3 className="text-white font-bold text-xl mb-6">Our Services</h3>
            <ul className="space-y-3">
              {[
                { href: '/services/windshield-replacement', label: 'Windshield Replacement' },
                { href: '/services/windshield-repair', label: 'Windshield Repair' },
                { href: '/services/auto-window-replacement', label: 'Auto Window Replacement' },
                { href: '/services/adas-calibration', label: 'ADAS Calibration' },
                { href: '/services', label: 'View All Services' },
              ].map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-gray-700 hover:text-primary-600 transition-colors duration-200 inline-flex items-center space-x-2 group"
                  >
                    <span className="w-0 h-0.5 bg-primary-600 group-hover:w-3 transition-all duration-200"></span>
                    <span>{link.label}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="text-white font-bold text-xl mb-6">Get In Touch</h3>
            <ul className="space-y-4">
              <li>
                <a
                  href={`tel:${phone}`}
                  className="flex items-center space-x-4 text-sm hover:text-white transition-colors duration-200 group"
                >
                  <div className="bg-gradient-to-br from-primary-600 to-primary-700 p-3 rounded-xl group-hover:scale-110 transition-transform shadow-lg">
                    <PhoneIcon className="w-6 h-6 text-white" />
                  </div>
                  <span className="font-semibold text-gray-900">{phoneFormatted}</span>
                </a>
              </li>
              <li>
                <a
                  href={`mailto:${email}`}
                  className="flex items-center space-x-4 text-sm hover:text-primary-600 transition-colors duration-200 group"
                >
                  <div className="bg-primary-600 p-3 rounded-xl group-hover:scale-110 transition-transform shadow-lg">
                    <EnvelopeIcon className="w-6 h-6 text-white" />
                  </div>
                  <span className="text-gray-700">{email}</span>
                </a>
              </li>
              <li className="pt-4">
                <h4 className="text-gray-900 font-semibold text-sm mb-4">Business Hours</h4>
                <ul className="text-sm space-y-2 text-gray-700">
                  <li className="flex justify-between">
                    <span>Mon - Fri:</span>
                    <span className="text-gray-900 font-semibold">8:00 AM - 5:00 PM</span>
                  </li>
                  <li className="flex justify-between">
                    <span>Saturday:</span>
                    <span className="text-gray-900 font-semibold">By Appointment</span>
                  </li>
                  <li className="flex justify-between">
                    <span>Sunday:</span>
                    <span className="text-gray-900 font-semibold">Closed</span>
                  </li>
                </ul>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-12 border-t border-gray-200">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <p className="text-sm text-gray-600">
              © {currentYear} MCA Autoglass. All Rights Reserved.
            </p>
            <div className="flex space-x-8">
              <Link
                href="/privacy"
                className="text-sm text-gray-600 hover:text-primary-600 transition-colors duration-200"
              >
                Privacy Policy
              </Link>
              <Link
                href="/terms"
                className="text-sm text-gray-600 hover:text-primary-600 transition-colors duration-200"
              >
                Terms of Service
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}
