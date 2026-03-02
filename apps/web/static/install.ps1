# JioBase Self-Host Installer (Windows PowerShell)
# https://jiobase.com/install.ps1
#
# Usage:
#   irm https://jiobase.com/install.ps1 | iex
#
# This script:
#   1. Checks for Node.js >= 18
#   2. Installs Node.js via fnm or winget if missing
#   3. Runs `npx create-jiobase` to scaffold & deploy
#

$ErrorActionPreference = "Stop"

Write-Host ""
Write-Host "  ========================================" -ForegroundColor Cyan
Write-Host "    JioBase Self-Host Installer" -ForegroundColor Cyan
Write-Host "  ========================================" -ForegroundColor Cyan
Write-Host ""

function Test-NodeVersion {
    try {
        $nodeVersion = (node -v) -replace 'v', ''
        $major = [int]($nodeVersion.Split('.')[0])

        if ($major -ge 18) {
            Write-Host "  [OK] Node.js v$nodeVersion detected" -ForegroundColor Green
            return $true
        }
        else {
            Write-Host "  [!] Node.js v$nodeVersion found, but v18+ is required" -ForegroundColor Yellow
            return $false
        }
    }
    catch {
        Write-Host "  [!] Node.js not found" -ForegroundColor Yellow
        return $false
    }
}

function Install-NodeViaFnm {
    Write-Host ""
    Write-Host "  Installing Node.js via fnm (Fast Node Manager)..." -ForegroundColor White
    Write-Host "  fnm is a fast, cross-platform Node.js version manager" -ForegroundColor DarkGray
    Write-Host ""

    # Check if fnm is already installed
    $hasFnm = $false
    try {
        $null = Get-Command fnm -ErrorAction Stop
        $hasFnm = $true
    }
    catch {
        $hasFnm = $false
    }

    if (-not $hasFnm) {
        # Try winget first (available on Windows 10 1709+)
        $hasWinget = $false
        try {
            $null = Get-Command winget -ErrorAction Stop
            $hasWinget = $true
        }
        catch {
            $hasWinget = $false
        }

        if ($hasWinget) {
            Write-Host "  Installing fnm via winget..." -ForegroundColor DarkGray
            winget install Schniz.fnm --accept-source-agreements --accept-package-agreements -h
        }
        else {
            # Fallback: download fnm binary directly (no bash dependency)
            Write-Host "  Installing fnm (downloading binary)..." -ForegroundColor DarkGray
            try {
                $fnmDir = Join-Path $env:LOCALAPPDATA "fnm"
                $tempZip = Join-Path $env:TEMP "fnm-windows.zip"

                if (-not (Test-Path $fnmDir)) {
                    New-Item -ItemType Directory -Path $fnmDir -Force | Out-Null
                }

                Invoke-WebRequest -Uri "https://github.com/Schniz/fnm/releases/latest/download/fnm-windows.zip" -OutFile $tempZip -UseBasicParsing
                Expand-Archive -Path $tempZip -DestinationPath $fnmDir -Force
                Remove-Item $tempZip -Force

                # Add to current session PATH
                $env:PATH = "$fnmDir;$env:PATH"

                # Persist to user PATH
                $userPath = [System.Environment]::GetEnvironmentVariable("PATH", "User")
                if ($userPath -notlike "*$fnmDir*") {
                    [System.Environment]::SetEnvironmentVariable("PATH", "$fnmDir;$userPath", "User")
                }
            }
            catch {
                Write-Host "  [X] Failed to install fnm" -ForegroundColor Red
                Write-Host ""
                Write-Host "  Please install Node.js manually:" -ForegroundColor White
                Write-Host "  https://nodejs.org/en/download" -ForegroundColor Cyan
                Write-Host ""
                exit 1
            }
        }

        # Refresh PATH to pick up newly installed tools
        $machinePath = [System.Environment]::GetEnvironmentVariable("PATH", "Machine")
        $userPath = [System.Environment]::GetEnvironmentVariable("PATH", "User")
        $env:PATH = "$machinePath;$userPath"
    }

    # Install and use Node.js 18
    try {
        fnm install 18
        fnm use 18
        fnm env --shell powershell | ForEach-Object { Invoke-Expression $_ }
    }
    catch {
        Write-Host "  [X] Failed to install Node.js via fnm" -ForegroundColor Red
        Write-Host ""
        Write-Host "  Please install Node.js manually:" -ForegroundColor White
        Write-Host "  https://nodejs.org/en/download" -ForegroundColor Cyan
        Write-Host ""
        exit 1
    }

    # Verify
    try {
        $newVersion = node -v
        Write-Host "  [OK] Node.js $newVersion installed" -ForegroundColor Green
    }
    catch {
        Write-Host "  [X] Node.js installation failed" -ForegroundColor Red
        Write-Host ""
        Write-Host "  Please install Node.js manually:" -ForegroundColor White
        Write-Host "  https://nodejs.org/en/download" -ForegroundColor Cyan
        Write-Host ""
        exit 1
    }
}

function Test-Npx {
    try {
        $null = Get-Command npx -ErrorAction Stop
        return $true
    }
    catch {
        Write-Host "  [X] npx not found (should come with Node.js)" -ForegroundColor Red
        Write-Host "  Try reinstalling Node.js from: https://nodejs.org" -ForegroundColor Cyan
        exit 1
    }
}

# --- Main ---
if (Test-NodeVersion) {
    Test-Npx | Out-Null
}
else {
    Install-NodeViaFnm
    Test-Npx | Out-Null
}

Write-Host ""
Write-Host "  Running create-jiobase..." -ForegroundColor White
Write-Host ""

npx create-jiobase $args
