# Extrae frames de un video MP4 a WebP (30 fps, nombres frame-0001.webp, frame-0002.webp, ...)
# Uso: .\extract-frames.ps1 [ruta_video]
# Requiere FFmpeg en PATH.

$video = if ($args.Count -gt 0) { $args[0] } else { "public/video.mp4" }
$outDir = "public/frames"
$pattern = "frame-%04d.webp"

if (-not (Test-Path $video)) {
  Write-Error "No se encontró el video: $video"
  exit 1
}

$null = New-Item -ItemType Directory -Force -Path $outDir

# 30 fps; salida frame-0001.webp, frame-0002.webp, ...
# Recomendado: 120-240 frames (4-8 s)
& ffmpeg -i $video -vf "fps=30" "$outDir/$pattern"

if ($LASTEXITCODE -ne 0) {
  Write-Error "FFmpeg falló. ¿Está instalado y en PATH?"
  exit 1
}

$count = (Get-ChildItem -Path $outDir -Filter "frame-*.webp").Count
Write-Host "Listo. Generados $count frames en $outDir"
Write-Host "Ajusta TOTAL_FRAMES en el componente HeroScroll a $count"
