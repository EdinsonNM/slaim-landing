/** Número total de frames (debe coincidir con los PNG en public/frames/) */
export const TOTAL_FRAMES = 600;

/** Frames a precargar antes de pintar; el resto se carga en segundo plano */
export const PRELOAD_FIRST = 10;

/** Factor de suavizado: current += (target - current) * LERP_FACTOR */
export const LERP_FACTOR = 0.08;

/** Altura de la sección hero en vh para generar scroll largo */
export const SCROLL_HEIGHT_VH = 400;

/** Ruta base de frames (4 dígitos: frame-0001.png, ...) */
export const FRAMES_BASE_PATH = "/frames/frame-";

/** Extensión de los frames (png o webp) */
export const FRAMES_EXT = ".png";

/** Parallax: desplazamiento en px del contenedor sticky (eje Y) */
export const PARALLAX_STICKY_Y = 45;

/** Parallax: desplazamiento en px del overlay (eje Y, sentido opuesto) */
export const PARALLAX_OVERLAY_Y = -28;

/** Ventana de fade in/out para textos (en los bordes min y max del rango) */
export const TEXT_FADE_WINDOW = 0.07;

/** Escala del video/frames (1 = llenar pantalla tipo cover; <1 = más pequeño, centrado) */
export const FRAME_SCALE = 0.4;
