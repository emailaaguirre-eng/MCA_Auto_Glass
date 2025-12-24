import { Metadata } from 'next'
import Image from 'next/image'

export const metadata: Metadata = {
  title: 'Gallery | MCA Autoglass',
  description: 'View our work - before and after photos of auto glass repairs and replacements in Peoria, AZ.',
}

// Placeholder gallery images - replace with actual images from the site
const galleryImages = [
  {
    title: 'Windshield Replacement',
    description: 'Professional installation with lifetime warranty',
    image: '/images/gallery-1.jpg',
  },
  {
    title: 'Chip Repair',
    description: 'Quick and effective chip repair service',
    image: '/images/gallery-2.jpg',
  },
  {
    title: 'Mobile Service',
    description: 'We come to you - convenient mobile service',
    image: '/images/gallery-3.jpg',
  },
  {
    title: 'ADAS Calibration',
    description: 'Advanced safety system calibration',
    image: '/images/gallery-4.jpg',
  },
  {
    title: 'Side Window Replacement',
    description: 'Expert side window installation',
    image: '/images/gallery-5.jpg',
  },
  {
    title: 'Fleet Service',
    description: 'Commercial fleet auto glass services',
    image: '/images/gallery-6.jpg',
  },
]

export default function GalleryPage() {
  return (
    <div className="min-h-screen bg-white">
      {/* Hero */}
      <section className="bg-gradient-to-r from-primary-600 to-primary-700 text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Our Work Gallery</h1>
          <p className="text-xl text-primary-100 max-w-2xl mx-auto">
            See examples of our professional auto glass repair and replacement work
          </p>
        </div>
      </section>

      {/* Gallery Grid */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {galleryImages.map((item, index) => (
              <div
                key={index}
                className="group relative bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2"
              >
                <div className="relative h-64 bg-gradient-to-br from-primary-100 to-primary-200">
                  {/* Placeholder - replace with actual images */}
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="text-center">
                      <div className="text-6xl mb-4">🪟</div>
                      <p className="text-gray-600 font-semibold">{item.title}</p>
                    </div>
                  </div>
                  {/* Uncomment when images are added:
                  <Image
                    src={item.image}
                    alt={item.title}
                    fill
                    className="object-cover group-hover:scale-110 transition-transform duration-300"
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  />
                  */}
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-bold text-gray-900 mb-2">{item.title}</h3>
                  <p className="text-gray-600">{item.description}</p>
                </div>
              </div>
            ))}
          </div>

          {/* Note */}
          <div className="mt-12 text-center text-gray-600">
            <p className="text-lg">
              <em>Gallery images coming soon. Check back for before/after photos of our work!</em>
            </p>
          </div>
        </div>
      </section>
    </div>
  )
}

