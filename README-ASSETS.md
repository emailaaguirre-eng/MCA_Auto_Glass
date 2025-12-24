# Quick Guide: Download Logo & Images from Current Website

## 🎯 Fastest Method (Recommended)

### Step 1: Get the Logo
1. Visit: https://mcaautoglass.com
2. **Right-click on the logo** in the header
3. Select **"Save image as..."**
4. Save to: `C:\Users\email\mca-autoglass-nextjs\public\logo.png`

### Step 2: Get Gallery Images
1. Visit: https://mcaautoglass.com/gallery
2. **Right-click on each image** you want
3. Select **"Save image as..."**
4. Save to: `C:\Users\email\mca-autoglass-nextjs\public\images\`

## 🔍 Advanced Method: Find All Images

### Using Browser Console

1. **Visit** https://mcaautoglass.com
2. **Press F12** to open Developer Tools
3. **Go to Console tab**
4. **Paste this script**:

```javascript
// Find all images
const images = Array.from(document.querySelectorAll('img'));
const imageUrls = images.map(img => img.src).filter(url => url.includes('mcaautoglass.com'));

console.log('=== LOGO ===');
imageUrls.forEach(url => {
  if (url.toLowerCase().includes('logo')) {
    console.log('LOGO:', url);
  }
});

console.log('\n=== ALL IMAGES ===');
imageUrls.forEach((url, i) => console.log(`${i+1}. ${url}`));
```

5. **Copy the logo URL** from the console
6. **Open it in a new tab** and save the image

## 📥 Download Using PowerShell

Once you have the image URLs:

```powershell
cd C:\Users\email\mca-autoglass-nextjs

# Download logo (replace URL with actual logo URL)
Invoke-WebRequest -Uri "LOGO_URL_HERE" -OutFile "public\logo.png"

# Download other images
Invoke-WebRequest -Uri "IMAGE_URL_HERE" -OutFile "public\images\image-name.jpg"
```

## 🖼️ What Images to Get

### Required:
- ✅ **Logo** - Header logo (save as `public/logo.png`)

### Recommended:
- Gallery images (before/after, shop photos)
- Service images (windshield work, mobile van)
- Team photos (if available)

## 📁 File Structure

After downloading, your files should be:
```
public/
├── logo.png          (or logo.svg)
└── images/
    ├── gallery-1.jpg
    ├── gallery-2.jpg
    └── service-van.jpg
```

## 🚀 Using Images in the Site

Once downloaded, images are automatically available:

```tsx
// Logo
<Image src="/logo.png" alt="MCA Autoglass" width={200} height={60} />

// Gallery images
<Image src="/images/gallery-1.jpg" alt="Service" width={800} height={600} />
```

## ⚡ Quick Start

**Just want the logo?**
1. Go to https://mcaautoglass.com
2. Right-click logo → Save as → `public/logo.png`
3. Done! ✅

The site will work without images, but adding the logo will make it look complete.

