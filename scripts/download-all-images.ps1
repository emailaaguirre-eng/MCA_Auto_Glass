# PowerShell script to download images from mcaautoglass.com
# Run this after extracting image URLs using the browser console script

param(
    [string[]]$ImageUrls = @()
)

$outputDir = "public/images"
$baseUrl = "https://mcaautoglass.com"

# Create output directory
if (-not (Test-Path $outputDir)) {
    New-Item -ItemType Directory -Path $outputDir -Force | Out-Null
}

Write-Host "=== MCA Autoglass Image Downloader ===" -ForegroundColor Cyan
Write-Host ""

if ($ImageUrls.Count -eq 0) {
    Write-Host "No image URLs provided." -ForegroundColor Yellow
    Write-Host ""
    Write-Host "To use this script:" -ForegroundColor Cyan
    Write-Host "1. Visit https://mcaautoglass.com" -ForegroundColor White
    Write-Host "2. Open browser console (F12)" -ForegroundColor White
    Write-Host "3. Run the extract-images.js script" -ForegroundColor White
    Write-Host "4. Copy the image URLs" -ForegroundColor White
    Write-Host "5. Run this script with: .\download-all-images.ps1 -ImageUrls @('url1', 'url2', ...)" -ForegroundColor White
    Write-Host ""
    Write-Host "Or manually download:" -ForegroundColor Cyan
    Write-Host "  - Right-click on images at mcaautoglass.com" -ForegroundColor White
    Write-Host "  - Save to: $outputDir/" -ForegroundColor White
    exit
}

$successCount = 0
$failCount = 0

foreach ($url in $ImageUrls) {
    try {
        # Get filename from URL
        $uri = [System.Uri]$url
        $filename = Split-Path -Leaf $uri.LocalPath
        
        # If no extension, try to determine from content type
        if (-not [System.IO.Path]::HasExtension($filename)) {
            $filename = "image_$($successCount + 1).jpg"
        }
        
        $outputPath = Join-Path $outputDir $filename
        
        Write-Host "Downloading: $filename..." -NoNewline
        
        Invoke-WebRequest -Uri $url -OutFile $outputPath -ErrorAction Stop
        
        Write-Host " ✓" -ForegroundColor Green
        $successCount++
    } catch {
        Write-Host " ✗ Failed: $($_.Exception.Message)" -ForegroundColor Red
        $failCount++
    }
}

Write-Host ""
Write-Host "Download complete!" -ForegroundColor Green
Write-Host "  Success: $successCount" -ForegroundColor Green
Write-Host "  Failed: $failCount" -ForegroundColor $(if ($failCount -gt 0) { "Red" } else { "Green" })
Write-Host ""
Write-Host "Images saved to: $outputDir" -ForegroundColor Cyan

