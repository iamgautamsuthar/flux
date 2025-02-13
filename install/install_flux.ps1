$githubRepoUrl = "https://github.com/iamgautamsuthar/flux/archive/refs/heads/main.zip"
$tempZip = "$env:TEMP\flux.zip"
$extractPath = "$env:TEMP\flux"
$fluxInstallPath = "C:\Program Files\nodejs\node_modules\flux"
$nodejsPath = "C:\Program Files\nodejs"

# Administrator
$adminCheck = [Security.Principal.WindowsPrincipal][Security.Principal.WindowsIdentity]::GetCurrent()
if (-not $adminCheck.IsInRole([Security.Principal.WindowsBuiltInRole]::Administrator)) {
    Write-Host "Please run this script as Administrator." -ForegroundColor Red
    Write-Host "Press any key to exit..."
    [void][System.Console]::ReadKey($true)
    exit 1
}

# Download the GitHub repository
Write-Host "Downloading flux repository..."
Invoke-WebRequest -Uri $githubRepoUrl -OutFile $tempZip

# Extract the ZIP file
Write-Host "Extracting flux repository..."
Expand-Archive -Path $tempZip -DestinationPath $extractPath -Force

# Find the extracted folder 
$extractedFolder = Get-ChildItem -Path $extractPath | Where-Object { $_.PSIsContainer } | Select-Object -First 1

# Check if the folder exists and rename it to "flux"
if ($null -ne $extractedFolder) {
    Write-Host "Renaming folder to 'flux'..."
    Rename-Item -Path $extractedFolder.FullName -NewName "flux"
} else {
    Write-Host "No folder found to rename." -ForegroundColor Red
    exit 1
}

# Move the "flux" folder to the node_modules directory
Write-Host "Moving flux to $fluxInstallPath..."
if (Test-Path $fluxInstallPath) { Remove-Item -Recurse -Force $fluxInstallPath }
Move-Item -Path "$extractPath\flux" -Destination $fluxInstallPath

# Run `npm install` inside the flux folder
Set-Location -Path $fluxInstallPath
Start-Process -NoNewWindow -FilePath "npm" -ArgumentList "install" -Wait


# Copy install scripts to C:\Program Files\nodejs
Write-Host "Copying install scripts to $nodejsPath..."
$installPath = "$fluxInstallPath\install"

# Check if the install folder exists before copying
if (Test-Path $installPath) {
    Write-Host "Found install folder. Copying scripts..."
    Copy-Item -Path "$installPath\flux" -Destination "$nodejsPath\flux" -Force
    Copy-Item -Path "$installPath\flux.ps1" -Destination "$nodejsPath\flux.ps1" -Force
    Copy-Item -Path "$installPath\flux.cmd" -Destination "$nodejsPath\flux.cmd" -Force
} else {
    Write-Host "Install folder not found: $installPath" -ForegroundColor Red
}

Write-Host "Flux installation complete!" -ForegroundColor Green

Write-Host "Press any key to exit..."
[void][System.Console]::ReadKey($true)
