param(
  [switch] $NoBrowser
)

$ErrorActionPreference = "Stop"

$indexPath = Join-Path $PSScriptRoot "index.html"

if (-not (Test-Path $indexPath)) {
  throw "Could not find index.html next to this script."
}

Write-Host "GrowthStack local preview"
Write-Host "Opening: $indexPath"
Write-Host ""
Write-Host "This direct file preview works without Node, Netlify, or a domain."
Write-Host "When opened from a file, contact forms create an email draft instead of pretending to submit."

if (-not $NoBrowser) {
  $chrome = "C:\Program Files\Google\Chrome\Application\chrome.exe"
  if (Test-Path $chrome) {
    Start-Process -FilePath $chrome -ArgumentList $indexPath
  } else {
    Start-Process -FilePath $indexPath
  }
}
