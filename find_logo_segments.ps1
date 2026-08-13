Add-Type -AssemblyName System.Drawing

$bmp = New-Object System.Drawing.Bitmap('d:\vishit-journeys\Vishit_Journey_Logo.jpg')

function ScanX($startY, $endY, $label) {
    Write-Host "--- $label (Y: $startY to $endY) ---"
    $minX = 1024
    $maxX = 0
    for ($x = 0; $x -lt 1024; $x++) {
        $hasDark = $false
        for ($y = $startY; $y -le $endY; $y++) {
            $c = $bmp.GetPixel($x, $y)
            $diff = [Math]::Abs($c.R - 254) + [Math]::Abs($c.G - 254) + [Math]::Abs($c.B - 254)
            if ($diff -gt 40) {
                $hasDark = $true
                break
            }
        }
        if ($hasDark) {
            if ($x -lt $minX) { $minX = $x }
            if ($x -gt $maxX) { $maxX = $x }
        }
    }
    Write-Host "MinX: $minX, MaxX: $maxX, Width: $($maxX - $minX + 1)"
}

# Line 1: VISHIT (approx Y: 180 to 295)
ScanX 180 295 "VISHIT / LOGO ICON"

# Line 2: JOURNEYS (approx Y: 310 to 350)
ScanX 310 355 "JOURNEYS LINE"

# Line 3: TRAVEL BEYOND LIMITS (approx Y: 360 to 400)
ScanX 360 400 "TRAVEL BEYOND LIMITS LINE"

$bmp.Dispose()
