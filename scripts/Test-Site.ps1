[CmdletBinding()]
param()

$ErrorActionPreference = "Stop"
$repoRoot = Split-Path -Parent $PSScriptRoot
$errors = [System.Collections.Generic.List[string]]::new()
$checkedReferences = 0

function Add-ValidationError {
  param([string] $Message)
  $script:errors.Add($Message)
}

function Test-LocalReference {
  param(
    [System.IO.FileInfo] $SourceFile,
    [string] $Reference
  )

  $decoded = [System.Net.WebUtility]::HtmlDecode($Reference).Trim()
  if (-not $decoded) {
    return
  }

  if ($decoded -match '^(?i)(https?:|mailto:|tel:|data:|javascript:)') {
    return
  }

  $fragment = if ($decoded.Contains("#")) { ($decoded -split '#', 2)[1] } else { "" }
  $pathOnly = ($decoded -split '[?#]', 2)[0]

  try {
    $pathOnly = [Uri]::UnescapeDataString($pathOnly)
  } catch {
    Add-ValidationError "$($SourceFile.Name): invalid URL encoding in '$Reference'"
    return
  }

  if (-not $pathOnly -and $fragment) {
    $targetPath = $SourceFile.FullName
  } elseif ($pathOnly.StartsWith("/")) {
    $pathOnly = $pathOnly.TrimStart("/")
    $targetPath = Join-Path $repoRoot $pathOnly
  } elseif (-not $pathOnly) {
    return
  } else {
    $targetPath = Join-Path $SourceFile.DirectoryName $pathOnly
  }

  $script:checkedReferences += 1
  if (-not (Test-Path -LiteralPath $targetPath)) {
    Add-ValidationError "$($SourceFile.Name): missing local reference '$Reference'"
    return
  }

  if ($fragment -and [IO.Path]::GetExtension($targetPath) -eq ".html") {
    try {
      $fragment = [Uri]::UnescapeDataString($fragment)
    } catch {
      Add-ValidationError "$($SourceFile.Name): invalid anchor encoding in '$Reference'"
      return
    }

    $targetContent = Get-Content -LiteralPath $targetPath -Raw
    $escapedFragment = [regex]::Escape($fragment)
    if ($targetContent -notmatch "\bid\s*=\s*[""']$escapedFragment[""']") {
      Add-ValidationError "$($SourceFile.Name): missing anchor target '$Reference'"
    }
  }
}

$htmlFiles = @(Get-ChildItem -LiteralPath $repoRoot -File -Filter "*.html" | Sort-Object Name)
if ($htmlFiles.Count -eq 0) {
  Add-ValidationError "No HTML files were found in the repository root."
}

$attributePattern = "\b(?:href|src)\s*=\s*[""']([^""']+)[""']"
$idPattern = "\bid\s*=\s*[""']([^""']+)[""']"

foreach ($file in $htmlFiles) {
  $content = Get-Content -LiteralPath $file.FullName -Raw

  if ($content -notmatch '(?i)<!doctype\s+html>') {
    Add-ValidationError "$($file.Name): missing HTML doctype"
  }
  if ($content -notmatch "(?i)<html\s+[^>]*lang=[""'][^""']+[""']") {
    Add-ValidationError "$($file.Name): missing html language"
  }
  if ($content -notmatch '(?is)<title>\s*\S.*?</title>') {
    Add-ValidationError "$($file.Name): missing non-empty title"
  }
  if ($content -notmatch "(?is)<meta\s+name=[""']viewport[""'][^>]*>") {
    Add-ValidationError "$($file.Name): missing viewport metadata"
  }
  if ($content -notmatch "(?is)<meta\s+name=[""']description[""'][^>]*content=[""'][^""']+[""'][^>]*>") {
    Add-ValidationError "$($file.Name): missing non-empty meta description"
  }

  foreach ($imageMatch in [regex]::Matches($content, '<img\b[^>]*>', [System.Text.RegularExpressions.RegexOptions]::IgnoreCase)) {
    if ($imageMatch.Value -notmatch "\balt\s*=\s*[""'][^""']*[""']") {
      Add-ValidationError "$($file.Name): image is missing an alt attribute"
    }
  }

  $seenIds = @{}
  foreach ($match in [regex]::Matches($content, $idPattern, [System.Text.RegularExpressions.RegexOptions]::IgnoreCase)) {
    $id = $match.Groups[1].Value
    $key = $id.ToLowerInvariant()
    if ($seenIds.ContainsKey($key)) {
      Add-ValidationError "$($file.Name): duplicate id '$id'"
    } else {
      $seenIds[$key] = $true
    }
  }

  foreach ($match in [regex]::Matches($content, $attributePattern, [System.Text.RegularExpressions.RegexOptions]::IgnoreCase)) {
    Test-LocalReference -SourceFile $file -Reference $match.Groups[1].Value
  }
}

$cssUrlPattern = "url\(\s*[""']?([^""')]+)[""']?\s*\)"
foreach ($file in Get-ChildItem -LiteralPath $repoRoot -File -Filter "*.css") {
  $content = Get-Content -LiteralPath $file.FullName -Raw
  foreach ($match in [regex]::Matches($content, $cssUrlPattern, [System.Text.RegularExpressions.RegexOptions]::IgnoreCase)) {
    Test-LocalReference -SourceFile $file -Reference $match.Groups[1].Value
  }
}

$sitemapPath = Join-Path $repoRoot "sitemap.xml"
if (-not (Test-Path -LiteralPath $sitemapPath)) {
  Add-ValidationError "sitemap.xml is missing"
} else {
  try {
    [xml] $sitemap = Get-Content -LiteralPath $sitemapPath -Raw
    $locations = @($sitemap.urlset.url | ForEach-Object { [string] $_.loc })
    if ($locations.Count -eq 0) {
      Add-ValidationError "sitemap.xml contains no URLs"
    }

    $duplicateLocations = @($locations | Group-Object | Where-Object Count -gt 1)
    foreach ($duplicate in $duplicateLocations) {
      Add-ValidationError "sitemap.xml contains duplicate URL '$($duplicate.Name)'"
    }

    foreach ($location in $locations) {
      $uri = $null
      if (-not [Uri]::TryCreate($location, [UriKind]::Absolute, [ref] $uri) -or $uri.Scheme -ne "https") {
        Add-ValidationError "sitemap.xml has an invalid HTTPS URL '$location'"
        continue
      }

      $pageName = if ($uri.AbsolutePath.EndsWith("/")) {
        "index.html"
      } else {
        [IO.Path]::GetFileName($uri.AbsolutePath)
      }
      $pagePath = Join-Path $repoRoot $pageName
      if (-not (Test-Path -LiteralPath $pagePath)) {
        Add-ValidationError "sitemap.xml points to missing page '$pageName'"
        continue
      }

      $pageContent = Get-Content -LiteralPath $pagePath -Raw
      $canonicalMatch = [regex]::Match(
        $pageContent,
        "<link\s+rel=[""']canonical[""']\s+href=[""']([^""']+)[""']",
        [System.Text.RegularExpressions.RegexOptions]::IgnoreCase
      )
      if (-not $canonicalMatch.Success) {
        Add-ValidationError "$pageName is listed in the sitemap but has no canonical URL"
      } elseif ($canonicalMatch.Groups[1].Value -cne $location) {
        Add-ValidationError "$pageName canonical URL does not match sitemap.xml"
      }
    }
  } catch {
    Add-ValidationError "sitemap.xml is not valid XML: $($_.Exception.Message)"
  }
}

$robotsPath = Join-Path $repoRoot "robots.txt"
if (-not (Test-Path -LiteralPath $robotsPath)) {
  Add-ValidationError "robots.txt is missing"
} else {
  $robots = Get-Content -LiteralPath $robotsPath -Raw
  if ($robots -notmatch '(?im)^Sitemap:\s*https://\S+/sitemap\.xml\s*$') {
    Add-ValidationError "robots.txt does not declare an HTTPS sitemap URL"
  }
}

if ($errors.Count -gt 0) {
  Write-Host "Locriva validation failed with $($errors.Count) error(s):" -ForegroundColor Red
  foreach ($validationError in $errors) {
    Write-Host " - $validationError" -ForegroundColor Red
  }
  exit 1
}

Write-Host "Locriva validation passed." -ForegroundColor Green
Write-Host "Checked $($htmlFiles.Count) HTML files and $checkedReferences local references."
