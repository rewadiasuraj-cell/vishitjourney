Add-Type -AssemblyName System.Drawing

$bmp = New-Object System.Drawing.Bitmap('d:\vishit-journeys\Vishit_Journey_Logo.jpg')

Write-Host "Scanning exact bounds of all elements in JOURNEYS line (Y: 310 to 360)..."

$inC = $false
$sX = 0
for ($x = 0; $x -lt 1024; $x++) {
    $dark = $false
    for ($y = 310; $y -le 360; $y++) {
        $c = $bmp.GetPixel($x, $y)
        if (([Math]::Abs($c.R - 254) + [Math]::Abs($c.G - 254) + [Math]::Abs($c.B - 254)) -gt 30) {
            $dark = $true
            break
        }
    }
    if ($dark -and -not $inC) {
        $inC = $true
        $sX = $x
    } elseif (-not $dark -and $inC) {
        $inC = $false
        if (($x - $sX) -gt 2) {
            Write-Host "Elem: StartX=$sX, EndX=$($x-1), Width=$($x - $sX)"
        }
    }
}

$bmp.Dispose()
