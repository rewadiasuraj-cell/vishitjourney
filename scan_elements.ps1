Add-Type -AssemblyName System.Drawing

$bmp = New-Object System.Drawing.Bitmap('d:\vishit-journeys\Vishit_Journey_Logo.jpg')

# Let's inspect the entire logo image structure from left to right:
# Where is the logo graphic vs text?
# Let's print bounding boxes for all dark clusters across Y=0 to 512!

Write-Host "Scanning entire image layout..."

# Scan Y ranges:
# Top line: Y 100 to 280
# Text line 1: VISHIT
# Text line 2: - JOURNEYS -
# Text line 3: TRAVEL BEYOND LIMITS

$y_ranges = @(
    @{ Name="Logo/VISHIT"; StartY=100; EndY=280 },
    @{ Name="JOURNEYS Line"; StartY=310; EndY=355 },
    @{ Name="TRAVEL BEYOND"; StartY=365; EndY=400 }
)

foreach ($r in $y_ranges) {
    Write-Host "=== $($r.Name) ==="
    $inC = $false
    $sX = 0
    for ($x = 0; $x -lt 1024; $x++) {
        $dark = $false
        for ($y = $r.StartY; $y -le $r.EndY; $y++) {
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
            if (($x - $sX) -gt 3) {
                Write-Host "Elem: StartX=$sX, EndX=$($x-1), Width=$($x - $sX)"
            }
        }
    }
}

$bmp.Dispose()
