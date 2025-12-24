'use client'

import { PhoneIcon } from '@heroicons/react/24/solid'
import Link from 'next/link'

const phone = process.env.NEXT_PUBLIC_PHONE || '602-291-6118'
const phoneFormatted = process.env.NEXT_PUBLIC_PHONE_FORMATTED || '(602) 291-6118'

export default function MobileCallBar() {
  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 lg:hidden animate-slide-up">
      <Link
        href={`tel:${phone}`}
        className="flex items-center justify-center space-x-3 bg-gradient-to-r from-accent-500 to-accent-600 text-white py-4 px-6 shadow-2xl hover:from-accent-600 hover:to-accent-700 transition-all duration-300"
        aria-label={`Call ${phoneFormatted}`}
      >
        <PhoneIcon className="w-6 h-6 animate-pulse" />
        <span className="font-bold text-lg">Call {phoneFormatted}</span>
      </Link>
    </div>
  )
}

