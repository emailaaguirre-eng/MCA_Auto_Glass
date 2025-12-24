// Browser Console Script to Extract All Images from mcaautoglass.com
// Instructions:
// 1. Visit https://mcaautoglass.com
// 2. Open Browser Console (F12)
// 3. Paste this entire script and press Enter
// 4. Copy the output URLs
// 5. Download images manually or use the URLs

(function() {
  console.log('=== MCA Autoglass Image Extractor ===\n');
  
  // Find all images
  const images = Array.from(document.querySelectorAll('img'));
  const uniqueImages = new Set();
  
  images.forEach(img => {
    let src = img.src || img.getAttribute('data-src') || img.getAttribute('srcset');
    if (src) {
      // Clean up the URL
      if (src.includes('?')) src = src.split('?')[0];
      if (src.includes(' ')) src = src.split(' ')[0];
      uniqueImages.add(src);
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
        uniqueImages.add(url);
      }
    }
  });
  
  // Display results
  console.log(`Found ${uniqueImages.size} unique images:\n`);
  console.log('=== LOGO (look for "logo" in filename) ===');
  Array.from(uniqueImages).forEach(url => {
    if (url.toLowerCase().includes('logo')) {
      console.log(`LOGO: ${url}`);
    }
  });
  
  console.log('\n=== ALL IMAGES ===');
  Array.from(uniqueImages).sort().forEach((url, index) => {
    console.log(`${index + 1}. ${url}`);
  });
  
  console.log('\n=== COPY-PASTE READY (for download script) ===');
  console.log('const imageUrls = [');
  Array.from(uniqueImages).forEach(url => {
    console.log(`  '${url}',`);
  });
  console.log('];');
  
  console.log('\n=== INSTRUCTIONS ===');
  console.log('1. Look for the logo URL above');
  console.log('2. Right-click on logo URL → Open in new tab');
  console.log('3. Right-click image → Save image as...');
  console.log('4. Save to: public/images/logo.png');
  console.log('\nOr use PowerShell to download:');
  console.log('Invoke-WebRequest -Uri "LOGO_URL_HERE" -OutFile "public/images/logo.png"');
  
  return Array.from(uniqueImages);
})();

