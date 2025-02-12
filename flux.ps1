$fluxDir = "$env:USERPROFILE\flux"
$binDir = "$fluxDir\bin"
$fluxExe = "$binDir\flux.exe"
$repoUrl = "https://github.com/iamgautamsuthar/flux"
$pathEnv = [System.Environment]::GetEnvironmentVariable("Path", [System.EnvironmentVariableTarget]::User)

Write-Host "Installing Flux package manager..."

if (Test-Path $fluxDir) {
    Write-Host "Removing existing Flux directory..."
    Remove-Item -Recurse -Force $fluxDir
}

Write-Host "Cloning Flux repository from GitHub..."
git clone $repoUrl $fluxDir

New-Item -ItemType Directory -Path $binDir -Force | Out-Null

if (Test-Path "$fluxDir\flux.cmd") {
    Move-Item -Force "$fluxDir\flux.cmd" $fluxExe
} elseif (Test-Path "$fluxDir\flux.bat") {
    Move-Item -Force "$fluxDir\flux.bat" $fluxExe
} elseif (Test-Path "$fluxDir\flux.ps1") {
    Move-Item -Force "$fluxDir\flux.ps1" $fluxExe
} else {
    Write-Host "Error: Flux executable not found in repository."
    exit 1
}

if ($pathEnv -notlike "*$binDir*") {
    Write-Host "Adding Flux to the system PATH..."
    [System.Environment]::SetEnvironmentVariable("Path", "$pathEnv;$binDir", [System.EnvironmentVariableTarget]::User)
    Write-Host "Added Flux to system PATH. Restart your terminal to apply changes."
} else {
    Write-Host "Flux is already in the system PATH."
}

Write-Host "Flux installed successfully! Run 'flux --help' to get started."
