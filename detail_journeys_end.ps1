Add-Type -AssemblyName System.Drawing

$bmp = New-Object System.Drawing.Bitmap('d:\vishit-journeys\Vishit_Journey_Logo.jpg')

Write-Host "Detailed scan from X=800 to 970 for JOURNEYS line..."

$inC = $false
$sX = 0
for ($x = 800; $x -le 970; $x++) {
    $dark = $false
    for ($y = 310; $y -le 355; $y++) {
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
        Write-Host "Elem from X=$sX to X=$($x-1) (width: $($x - $sX))"
    }
}

$bmp.Dispose()
