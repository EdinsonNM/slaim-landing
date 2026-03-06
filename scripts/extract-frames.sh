#!/usr/bin/env bash
# Extrae frames de un video MP4 a WebP (30 fps, nombres frame-0001.webp, frame-0002.webp, ...)
# Uso: ./extract-frames.sh [ruta_video]
# Requiere FFmpeg.

set -e
VIDEO="${1:-public/video.mp4}"
OUT_DIR="public/frames"
PATTERN="frame-%04d.webp"

if [ ! -f "$VIDEO" ]; then
  echo "No se encontró el video: $VIDEO"
  exit 1
fi

mkdir -p "$OUT_DIR"
ffmpeg -i "$VIDEO" -vf "fps=30" "$OUT_DIR/$PATTERN"

COUNT=$(find "$OUT_DIR" -name "frame-*.webp" | wc -l)
echo "Listo. Generados $COUNT frames en $OUT_DIR"
echo "Ajusta TOTAL_FRAMES en el componente HeroScroll a $COUNT"
