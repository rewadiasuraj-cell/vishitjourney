Add-Type -AssemblyName System.Drawing

$bmp = New-Object System.Drawing.Bitmap('d:\vishit-journeys\Vishit_Journey_Logo.jpg')

Write-Host "Rendering ASCII art of middle line..."

# Loop Y from 315 to 350
for ($y = 315; $y -le 350; $y += 2) {
    $line = ""
    for ($x = 420; $x -le 970; $x += 3) {
        $c = $bmp.GetPixel($x, $y)
        $diff = [Math]::Abs($c.R - 254) + [Math]::Abs($c.G - 254) + [Math]::Abs($c.B - 254)
        if ($diff -gt 60) {
            $line += "#"
        } else {
            $line += "."
        }
    }
    Write-Host $line
}

$bmp.Dispose()
