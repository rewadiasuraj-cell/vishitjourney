Add-Type -AssemblyName System.Drawing
$img = [System.Drawing.Image]::FromFile('d:\vishit-journeys\Vishit_Journey_Logo.jpg')
Write-Host "Width: $($img.Width) Height: $($img.Height)"
$img.Dispose()
