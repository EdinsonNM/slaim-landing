# Pipeline de frames para hero cinemático

## Requisitos

- **FFmpeg** instalado y disponible en `PATH`.

## Uso

1. Coloca tu video MP4 en `public/video.mp4` (o pasa la ruta como argumento).
2. Ejecuta el script de extracción:

   **Windows (PowerShell):**
   ```powershell
   .\scripts\extract-frames.ps1
   # o con otro video:
   .\scripts\extract-frames.ps1 public/otro-video.mp4
   ```

   **Linux/macOS:**
   ```bash
   chmod +x scripts/extract-frames.sh
   ./scripts/extract-frames.sh
   # o: ./scripts/extract-frames.sh public/otro-video.mp4
   ```

3. Se generan en `public/frames/` los archivos `frame-0001.webp`, `frame-0002.webp`, … a 30 fps.
4. Ajusta **TOTAL_FRAMES** en `app/components/HeroScroll/constants.ts` al número real de frames generados (el script lo indica al terminar). Recomendado: 120–240 frames (4–8 s).

## Ejemplo FFmpeg manual

```bash
ffmpeg -i public/video.mp4 -vf "fps=30" public/frames/frame-%04d.webp
```
