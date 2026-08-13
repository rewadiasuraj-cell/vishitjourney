Add-Type -AssemblyName System.Drawing

$bmp = New-Object System.Drawing.Bitmap('d:\vishit-journeys\Vishit_Journey_Logo.jpg')

$elems = @(
    @{ Name="Elem 1"; StartX=436; EndX=503 },
    @{ Name="Elem 2"; StartX=521; EndX=539 },
    @{ Name="Elem 3"; StartX=568; EndX=599 },
    @{ Name="Elem 4"; StartX=627; EndX=656 },
    @{ Name="Elem 5"; StartX=683; EndX=710 },
    @{ Name="Elem 6"; StartX=737; EndX=769 },
    @{ Name="Elem 7"; StartX=799; EndX=821 },
    @{ Name="Elem 8"; StartX=846; EndX=875 },
    @{ Name="Elem 9"; StartX=893; EndX=962 }
)

foreach ($e in $elems) {
    Write-Host "=== $($e.Name) (X: $($e.StartX) to $($e.EndX)) ==="
    for ($y = 315; $y -le 350; $y += 2) {
        $line = ""
        for ($x = $e.StartX; $x -le $e.EndX; $x++) {
            $c = $bmp.GetPixel($x, $y)
            $diff = [Math]::Abs($c.R - 254) + [Math]::Abs($c.G - 254) + [Math]::Abs($c.B - 254)
            if ($diff -gt 50) { $line += "#" } else { $line += "." }
        }
        Write-Host $line
    }
}

$bmp.Dispose()
