Add-Type -AssemblyName System.Drawing

$bmp = New-Object System.Drawing.Bitmap('d:\vishit-journeys\Vishit_Journey_Logo.jpg')

$inChar = $false
$charStart = 0
$startY = 310
$endY = 355

Write-Host "Scanning characters in JOURNEYS line (Y: $startY to $endY)..."

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
    
    if ($hasDark -and -not $inChar) {
        $inChar = $true
        $charStart = $x
    } elseif (-not $hasDark -and $inChar) {
        $inChar = $false
        $width = $x - $charStart
        Write-Host "Character/Element found: StartX=$charStart, EndX=$($x - 1), Width=$width"
    }
}

$bmp.Dispose()
