$ErrorActionPreference = 'Stop'
Write-Host "Downloading Python embed..."
Invoke-WebRequest -Uri "https://www.python.org/ftp/python/3.11.8/python-3.11.8-embed-amd64.zip" -OutFile "py-embed.zip"

Write-Host "Extracting Python..."
Expand-Archive -Path "py-embed.zip" -DestinationPath "py-env" -Force

Write-Host "Downloading get-pip.py..."
Invoke-WebRequest -Uri "https://bootstrap.pypa.io/get-pip.py" -OutFile "py-env\get-pip.py"

Write-Host "Patching python311._pth..."
$pthPath = "py-env\python311._pth"
$pth = Get-Content $pthPath
$pth = $pth -replace '#import site', 'import site'
Set-Content -Path $pthPath -Value $pth

Write-Host "Installing pip..."
& ".\py-env\python.exe" ".\py-env\get-pip.py"

Write-Host "Installing dependencies..."
& ".\py-env\python.exe" -m pip install -r "apps\medicine-ocr\requirements.txt"

Write-Host "Done!"
