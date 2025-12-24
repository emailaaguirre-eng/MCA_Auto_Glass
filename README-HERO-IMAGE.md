# How to Add the Hero Truck Image

## Quick Method (2 minutes)

1. **Visit**: https://mcaautoglass.com
2. **Find the hero image** (truck/van in the background)
3. **Right-click on the image** → "Save image as..."
4. **Save to**: `C:\Users\email\mca-autoglass-nextjs\public\images\hero-truck.jpg`

## Using Browser Console (More Reliable)

1. **Visit**: https://mcaautoglass.com
2. **Press F12** (Developer Tools)
3. **Go to Console tab**
4. **Paste the script** from `scripts/find-hero-image.js`
5. **Press Enter**
6. **Look for the truck/van image URL** in the output
7. **Copy the URL** and download it

## Using PowerShell

Once you have the image URL:

```powershell
cd C:\Users\email\mca-autoglass-nextjs
Invoke-WebRequest -Uri "IMAGE_URL_HERE" -OutFile "public\images\hero-truck.jpg"
```

## Image Requirements

- **Filename**: `hero-truck.jpg` (or `.png`)
- **Location**: `public/images/hero-truck.jpg`
- **Recommended size**: 1920x1080 or larger
- **Format**: JPG or PNG

## What Happens After Adding

The hero section will automatically use the image as a background with:
- ✅ Professional overlay for text readability
- ✅ Responsive sizing
- ✅ Optimized loading
- ✅ Premium parallax effect

## Current Status

The hero section is ready and will use the image once you add it to:
`public/images/hero-truck.jpg`

The code is already set up to display it!

