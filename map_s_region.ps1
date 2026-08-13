Add-Type -AssemblyName System.Drawing

$bmp = New-Object System.Drawing.Bitmap('d:\vishit-journeys\Vishit_Journey_Logo.jpg')

# Print pixel count per column from X=870 to 970
for ($x = 870; $x -le 970; $x++) {
    $count = 0
    for ($y = 315; $y -le 350; $y++) {
        $c = $bmp.GetPixel($x, $y)
        if (([Math]::Abs($c.R - 254) + [Math]::Abs($c.G - 254) + [Math]::Abs($c.B - 254)) -gt 30) {
            $count++
        }
    }
    Write-Host "X=$x : $count"
}

$bmp.Dispose()
