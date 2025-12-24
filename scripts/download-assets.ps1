# Script to download logo and images from mcaautoglass.com
# Run this script to download assets from the current website

$baseUrl = "https://mcaautoglass.com"
$outputDir = "public/images"
$logoUrl = "$baseUrl/wp-content/uploads/2024/01/autoglassglogo.png"

# Create output directory if it doesn't exist
if (-not (Test-Path $outputDir)) {
    New-Item -ItemType Directory -Path $outputDir -Force | Out-Null
}

Write-Host "Downloading assets from $baseUrl..."
Write-Host ""

# Download logo
Write-Host "Attempting to download logo..."
try {
    $logoPath = "$outputDir/logo.png"
    Invoke-WebRequest -Uri $logoUrl -OutFile $logoPath -ErrorAction Stop
    Write-Host "✓ Logo downloaded: $logoPath" -ForegroundColor Green
} catch {
    Write-Host "✗ Could not download logo from $logoUrl" -ForegroundColor Yellow
    Write-Host "  Error: $($_.Exception.Message)" -ForegroundColor Yellow
    Write-Host ""
    Write-Host "Please manually download the logo from:" -ForegroundColor Cyan
    Write-Host "  1. Visit https://mcaautoglass.com" -ForegroundColor Cyan
    Write-Host "  2. Right-click on the logo and 'Save Image As...'" -ForegroundColor Cyan
    Write-Host "  3. Save to: $outputDir/logo.png" -ForegroundColor Cyan
}

Write-Host ""
Write-Host "To download other images:" -ForegroundColor Cyan
Write-Host "  1. Visit https://mcaautoglass.com" -ForegroundColor Cyan
Write-Host "  2. Right-click on images you want" -ForegroundColor Cyan
Write-Host "  3. Save to: $outputDir/" -ForegroundColor Cyan
Write-Host ""
Write-Host "Common image locations to check:" -ForegroundColor Cyan
Write-Host "  - Logo in header" -ForegroundColor Cyan
Write-Host "  - Gallery images" -ForegroundColor Cyan
Write-Host "  - Service images" -ForegroundColor Cyan
Write-Host "  - Before/after photos" -ForegroundColor Cyan

