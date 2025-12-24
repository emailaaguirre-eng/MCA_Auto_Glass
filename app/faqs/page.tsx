import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'FAQs | MCA Autoglass',
  description: 'Frequently asked questions about auto glass repair and replacement services in Peoria, AZ.',
}

const faqs = [
  {
    question: 'How long does a windshield replacement take?',
    answer: 'Most windshield replacements are completed in 60-90 minutes. Our mobile service can come to your location, making it even more convenient.',
  },
  {
    question: 'Do you accept insurance?',
    answer: 'Yes! We accept all major insurance companies and handle the claims process for you. We work directly with your insurance to make the process seamless.',
  },
  {
    question: 'What is the difference between OEM and aftermarket glass?',
    answer: 'OEM (Original Equipment Manufacturer) glass is made by the same company that supplied your vehicle\'s original glass. Aftermarket glass meets the same safety standards but may have slight variations. We offer both options and can help you choose based on your needs and budget.',
  },
  {
    question: 'Can you repair a chip instead of replacing the windshield?',
    answer: 'Yes, in many cases we can repair chips and small cracks. This is more cost-effective and can often be done in 30 minutes or less. We\'ll assess the damage and let you know if repair is possible.',
  },
  {
    question: 'What is ADAS calibration and why is it needed?',
    answer: 'ADAS (Advanced Driver Assistance Systems) calibration ensures your safety features like lane departure warning, automatic emergency braking, and adaptive cruise control work correctly after a windshield replacement. Modern vehicles require this calibration to maintain safety system accuracy.',
  },
  {
    question: 'Do you offer mobile service?',
    answer: 'Yes! We offer mobile auto glass service throughout the Greater Phoenix Area. Our mobile team comes to your home or business at no extra cost, bringing the same quality service you\'d get at our shop.',
  },
  {
    question: 'What warranty do you offer?',
    answer: 'We offer a lifetime warranty on all workmanship and glass quality for as long as you own your vehicle. This covers leaks, installation issues, and glass defects.',
  },
  {
    question: 'How much does a windshield replacement cost?',
    answer: 'Costs vary based on your vehicle make and model, glass type (OEM vs aftermarket), and whether you have insurance coverage. We provide free estimates and work with all insurance companies. Call us for a quick quote!',
  },
  {
    question: 'Do I need to make an appointment?',
    answer: 'While appointments are recommended to ensure availability, we also offer same-day service when possible. Call us and we\'ll work to accommodate your schedule.',
  },
  {
    question: 'What areas do you serve?',
    answer: 'We serve the Greater Phoenix Area including Peoria, Phoenix, Surprise, Glendale, Goodyear, Avondale, Buckeye, and surrounding communities. Mobile service is available throughout this area.',
  },
]

export default function FAQsPage() {
  return (
    <div className="min-h-screen bg-white">
      {/* Hero */}
      <section className="bg-gradient-to-r from-primary-600 to-primary-700 text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Frequently Asked Questions</h1>
          <p className="text-xl text-primary-100 max-w-2xl mx-auto">
            Get answers to common questions about our auto glass services
          </p>
        </div>
      </section>

      {/* FAQs */}
      <section className="py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="space-y-6">
            {faqs.map((faq, index) => (
              <div
                key={index}
                className="bg-white rounded-xl shadow-lg border border-gray-200 p-6 hover:shadow-xl transition-shadow duration-300"
              >
                <h2 className="text-2xl font-bold text-gray-900 mb-3">{faq.question}</h2>
                <p className="text-gray-700 leading-relaxed">{faq.answer}</p>
              </div>
            ))}
          </div>

          {/* Still Have Questions CTA */}
          <div className="mt-16 bg-gradient-to-r from-primary-50 to-primary-100 rounded-xl p-8 text-center border border-primary-200">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Still Have Questions?</h2>
            <p className="text-gray-700 mb-6">
              Our team is here to help! Call us anytime for expert advice.
            </p>
            <a
              href={`tel:${process.env.NEXT_PUBLIC_PHONE || '602-291-6118'}`}
              className="inline-block bg-gradient-to-r from-accent-500 to-accent-600 text-white px-8 py-4 rounded-lg font-bold text-lg shadow-lg hover:shadow-xl transform hover:-translate-y-1 transition-all duration-300"
            >
              Call (602) 291-6118
            </a>
          </div>
        </div>
      </section>
    </div>
  )
}

