Add-Type -AssemblyName System.Drawing

$bmp = New-Object System.Drawing.Bitmap('d:\vishit-journeys\Vishit_Journey_Logo.jpg')

# Find non-white / dark pixel bounds in middle region (Y from 200 to 450)
$bgColor = $bmp.GetPixel(10, 10)
Write-Host "Background color at top-left: R=$($bgColor.R) G=$($bgColor.G) B=$($bgColor.B)"

# Scan Y from 250 to 380 to locate the "JOURNEYS" line
for ($y = 250; $y -le 380; $y += 5) {
    $darkPixelCount = 0
    for ($x = 100; $x -le 900; $x++) {
        $c = $bmp.GetPixel($x, $y)
        # check difference from bg
        $diff = [Math]::Abs($c.R - $bgColor.R) + [Math]::Abs($c.G - $bgColor.G) + [Math]::Abs($c.B - $bgColor.B)
        if ($diff -gt 50) {
            $darkPixelCount++
        }
    }
    if ($darkPixelCount -gt 10) {
        Write-Host "Y=$y has $darkPixelCount non-bg pixels"
    }
}

$bmp.Dispose()
