// Browser Console Script to Find Hero/Truck Image
// Instructions:
// 1. Visit https://mcaautoglass.com
// 2. Open Browser Console (F12)
// 3. Paste this script and press Enter

(function() {
  console.log('=== Finding Hero/Truck Image ===\n');
  
  // Find all images
  const images = Array.from(document.querySelectorAll('img'));
  const heroImages = [];
  
  images.forEach(img => {
    let src = img.src || img.getAttribute('data-src') || img.getAttribute('srcset');
    const alt = img.alt || '';
    const className = img.className || '';
    
    if (src) {
      // Clean up the URL
      if (src.includes('?')) src = src.split('?')[0];
      if (src.includes(' ')) src = src.split(' ')[0];
      
      // Look for hero/truck/van related images
      const searchTerms = ['truck', 'van', 'vehicle', 'hero', 'banner', 'mobile', 'service'];
      const isHeroImage = searchTerms.some(term => 
        src.toLowerCase().includes(term) || 
        alt.toLowerCase().includes(term) ||
        className.toLowerCase().includes(term)
      );
      
      if (isHeroImage || img.offsetWidth > 800) { // Large images are likely hero images
        heroImages.push({
          src: src,
          alt: alt,
          width: img.naturalWidth || img.offsetWidth,
          height: img.naturalHeight || img.offsetHeight,
          className: className
        });
      }
    }
  });
  
  // Find background images
  const allElements = document.querySelectorAll('*');
  allElements.forEach(el => {
    const style = window.getComputedStyle(el);
    const bgImage = style.backgroundImage;
    if (bgImage && bgImage !== 'none') {
      const urlMatch = bgImage.match(/url\(['"]?([^'"]+)['"]?\)/);
      if (urlMatch && urlMatch[1]) {
        let url = urlMatch[1];
        if (url.includes('?')) url = url.split('?')[0];
        
        const searchTerms = ['truck', 'van', 'vehicle', 'hero', 'banner', 'mobile'];
        if (searchTerms.some(term => url.toLowerCase().includes(term))) {
          heroImages.push({
            src: url,
            alt: 'Background image',
            width: 'unknown',
            height: 'unknown',
            type: 'background-image'
          });
        }
      }
    }
  });
  
  console.log(`Found ${heroImages.length} potential hero/truck images:\n`);
  heroImages.forEach((img, index) => {
    console.log(`=== Image ${index + 1} ===`);
    console.log(`URL: ${img.src}`);
    console.log(`Alt: ${img.alt}`);
    console.log(`Size: ${img.width}x${img.height}`);
    console.log(`Type: ${img.type || 'img tag'}`);
    console.log('');
  });
  
  console.log('=== INSTRUCTIONS ===');
  console.log('1. Look for the truck/van image URL above');
  console.log('2. Right-click on the URL → Open in new tab');
  console.log('3. Right-click image → Save image as...');
  console.log('4. Save to: public/images/hero-truck.jpg');
  console.log('');
  console.log('Or use PowerShell:');
  console.log('Invoke-WebRequest -Uri "IMAGE_URL_HERE" -OutFile "public/images/hero-truck.jpg"');
  
  return heroImages;
})();

