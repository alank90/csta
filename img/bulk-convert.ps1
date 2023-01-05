# Copy this file to any directory containing images & then run this script in powershell
# Get all png & jpg images in the current directory & convert it to webp format
$images_jpg = Get-ChildItem -Path (Get-Location) -Filter *.jpg 
$images_png = Get-ChildItem -Path (Get-Location) -Filter *.png 

foreach ($image in $images_jpg) {
  $fileName = $image.DirectoryName + "\" + $image.BaseName + ".webp"
  cwebp.exe -q 60 $image.FullName -o $fileName
}

foreach ($image in $images_png) {
    $fileName = $image.DirectoryName + "\" + $image.BaseName + ".webp"
    cwebp.exe -q 60 $image.FullName -o $fileName
  }

