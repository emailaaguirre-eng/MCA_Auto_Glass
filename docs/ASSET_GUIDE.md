# Asset Download Guide

## How to Get Logo and Images from Current Website

### Method 1: Browser Developer Tools (Recommended)

1. **Open the current website**: https://mcaautoglass.com
2. **Open Developer Tools**: Press `F12` or right-click → Inspect
3. **Find the logo**:
   - Go to the Network tab
   - Filter by "Img" or "Media"
   - Refresh the page
   - Look for logo files (usually named like `logo.png`, `autoglassglogo.png`, etc.)
   - Right-click on the image → "Open in new tab"
   - Right-click on the image → "Save image as..."
   - Save to: `public/images/logo.png`

4. **Find other images**:
   - Same process for gallery images, service images, etc.
   - Save to: `public/images/` with descriptive names

### Method 2: Direct URL Access

Common WordPress image paths:
- Logo: `https://mcaautoglass.com/wp-content/uploads/[year]/[month]/logo.png`
- Images: `https://mcaautoglass.com/wp-content/uploads/[year]/[month]/[filename].jpg`

Try these URLs in your browser:
- `https://mcaautoglass.com/wp-content/themes/[theme-name]/images/logo.png`
- `https://mcaautoglass.com/images/logo.png`
- `https://mcaautoglass.com/logo.png`

### Method 3: View Page Source

1. Visit https://mcaautoglass.com
2. Right-click → "View Page Source" (or Ctrl+U)
3. Search for "logo" or "img src"
4. Copy the image URLs
5. Open in browser and save

### Method 4: Using PowerShell Script

I've created a script to help download assets. Run:

```powershell
cd C:\Users\email\mca-autoglass-nextjs
.\scripts\download-assets.ps1
```

## Image Optimization

After downloading, optimize images:

1. **Resize if needed**: Logo should be ~200-400px wide
2. **Compress**: Use tools like:
   - [TinyPNG](https://tinypng.com/)
   - [Squoosh](https://squoosh.app/)
3. **Convert to WebP**: Better compression (Next.js handles this automatically)

## Required Assets

### Logo
- **File**: `public/images/logo.png` or `public/logo.svg`
- **Size**: 200-400px width recommended
- **Format**: PNG (transparent background) or SVG

### Gallery Images
- Before/after photos
- Service van/mobile unit
- Shop photos
- Team photos (if available)

### Service Images
- Windshield replacement
- Windshield repair
- ADAS calibration
- Mobile service

## Using Assets in Next.js

Once downloaded, use in components:

```tsx
import Image from 'next/image'

<Image
  src="/images/logo.png"
  alt="MCA Autoglass Logo"
  width={200}
  height={60}
  priority
/>
```

## Alternative: Create New Logo

If you can't access the current logo, I can help create a professional logo design based on:
- Company name: MCA Autoglass
- Industry: Auto glass
- Colors: Primary blue (#0066CC)
- Style: Professional, modern

Would you like me to create a logo design?

