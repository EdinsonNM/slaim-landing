#!/usr/bin/env python3
"""
image-seo-optimizer/scripts/optimize_image.py
Resize and compress images for SEO metatags and web performance.
"""

import argparse
import os
import sys
from pathlib import Path

try:
    from PIL import Image, ImageOps
except ImportError:
    print("ERROR: Pillow not installed. Run: pip install Pillow --break-system-packages")
    sys.exit(1)

# ── SEO Presets ──────────────────────────────────────────────────────────────

PRESETS = {
    "og_image": {
        "label": "Open Graph (og:image)",
        "width": 1200,
        "height": 630,
        "format": "JPEG",
        "quality": 85,
        "suffix": "og",
    },
    "twitter_large": {
        "label": "Twitter Card Large",
        "width": 1200,
        "height": 628,
        "format": "JPEG",
        "quality": 85,
        "suffix": "twitter-large",
    },
    "twitter_small": {
        "label": "Twitter Card Small",
        "width": 800,
        "height": 418,
        "format": "JPEG",
        "quality": 85,
        "suffix": "twitter-small",
    },
    "linkedin": {
        "label": "LinkedIn Share",
        "width": 1200,
        "height": 627,
        "format": "JPEG",
        "quality": 85,
        "suffix": "linkedin",
    },
    "whatsapp": {
        "label": "WhatsApp Preview",
        "width": 300,
        "height": 200,
        "format": "JPEG",
        "quality": 80,
        "suffix": "whatsapp",
    },
    "favicon": {
        "label": "Favicon (32×32)",
        "width": 32,
        "height": 32,
        "format": "PNG",
        "quality": None,
        "suffix": "favicon-32",
    },
    "favicon_192": {
        "label": "Favicon PWA (192×192)",
        "width": 192,
        "height": 192,
        "format": "PNG",
        "quality": None,
        "suffix": "favicon-192",
    },
    "apple_touch": {
        "label": "Apple Touch Icon (180×180)",
        "width": 180,
        "height": 180,
        "format": "PNG",
        "quality": None,
        "suffix": "apple-touch-icon",
    },
    "google_discover": {
        "label": "Google Discover (1200×auto)",
        "width": 1200,
        "height": None,  # preserve ratio
        "format": "JPEG",
        "quality": 85,
        "suffix": "google-discover",
    },
    "webp_web": {
        "label": "WebP Web Optimized (1200×630)",
        "width": 1200,
        "height": 630,
        "format": "WEBP",
        "quality": 82,
        "suffix": "web",
    },
}

ALL_PRESET_KEYS = [
    "og_image", "twitter_large", "twitter_small", "linkedin",
    "whatsapp", "favicon", "favicon_192", "apple_touch",
    "google_discover", "webp_web",
]

# ── Helpers ───────────────────────────────────────────────────────────────────

def human_size(n_bytes: int) -> str:
    for unit in ("B", "KB", "MB"):
        if n_bytes < 1024:
            return f"{n_bytes:.1f} {unit}"
        n_bytes /= 1024
    return f"{n_bytes:.1f} GB"


def open_image(path: str) -> Image.Image:
    """Open image, handling animated formats by using first frame."""
    img = Image.open(path)
    # Handle animated GIF / WebP
    if hasattr(img, "n_frames") and img.n_frames > 1:
        img.seek(0)
        print(f"  ⚠  Animated image detected — using first frame.")
    img = img.copy()
    return img


def resize_cover(img: Image.Image, width: int, height: int) -> Image.Image:
    """Resize + center-crop to exact dimensions (like CSS cover)."""
    img_ratio = img.width / img.height
    target_ratio = width / height

    if img_ratio > target_ratio:
        # Wider than target — fit height, crop width
        new_h = height
        new_w = int(img.width * (height / img.height))
    else:
        # Taller than target — fit width, crop height
        new_w = width
        new_h = int(img.height * (width / img.width))

    img = img.resize((new_w, new_h), Image.LANCZOS)

    # Center crop
    left = (new_w - width) // 2
    top = (new_h - height) // 2
    img = img.crop((left, top, left + width, top + height))
    return img


def resize_fit_width(img: Image.Image, width: int) -> Image.Image:
    """Resize to exact width, preserve aspect ratio."""
    ratio = width / img.width
    new_h = int(img.height * ratio)
    return img.resize((width, new_h), Image.LANCZOS)


def save_image(img: Image.Image, output_path: str, fmt: str, quality: int | None):
    """Save image with appropriate settings per format."""
    # Convert RGBA to RGB for JPEG
    if fmt in ("JPEG", "WEBP") and img.mode in ("RGBA", "P", "LA"):
        background = Image.new("RGB", img.size, (255, 255, 255))
        if img.mode == "P":
            img = img.convert("RGBA")
        if img.mode in ("RGBA", "LA"):
            background.paste(img, mask=img.split()[-1])
        else:
            background.paste(img)
        img = background
    elif fmt == "PNG" and img.mode not in ("RGB", "RGBA", "L", "P"):
        img = img.convert("RGBA")

    save_kwargs = {"format": fmt}
    if fmt == "JPEG":
        save_kwargs["quality"] = quality or 85
        save_kwargs["optimize"] = True
        save_kwargs["progressive"] = True
    elif fmt == "WEBP":
        save_kwargs["quality"] = quality or 82
        save_kwargs["method"] = 6
    elif fmt == "PNG":
        save_kwargs["optimize"] = True

    img.save(output_path, **save_kwargs)


def process_preset(img_original: Image.Image, preset: dict, stem: str, output_dir: str) -> dict:
    """Process a single preset and return info dict."""
    img = img_original.copy()
    w, h = preset["width"], preset["height"]
    fmt = preset["format"]
    quality = preset["quality"]
    suffix = preset["suffix"]

    # Resize
    if w and h:
        img = resize_cover(img, w, h)
        dims = f"{w}×{h}"
    elif w:
        img = resize_fit_width(img, w)
        dims = f"{img.width}×{img.height}"
    else:
        dims = f"{img.width}×{img.height}"

    # Build output filename
    ext = {"JPEG": "jpg", "PNG": "png", "WEBP": "webp"}[fmt]
    filename = f"{stem}-{suffix}.{ext}"
    out_path = os.path.join(output_dir, filename)

    save_image(img, out_path, fmt, quality)

    size = os.path.getsize(out_path)
    return {
        "label": preset["label"],
        "filename": filename,
        "path": out_path,
        "dimensions": dims,
        "format": fmt,
        "size_bytes": size,
        "size_human": human_size(size),
    }


# ── Main ──────────────────────────────────────────────────────────────────────

def main():
    parser = argparse.ArgumentParser(
        description="Optimize images for SEO metatags"
    )
    parser.add_argument("--input", required=True, help="Input image path")
    parser.add_argument("--output", required=True, help="Output directory")
    parser.add_argument(
        "--preset",
        default="og_image",
        choices=list(PRESETS.keys()) + ["all"],
        help="SEO preset (default: og_image)"
    )
    parser.add_argument("--width", type=int, help="Custom width in pixels")
    parser.add_argument("--height", type=int, help="Custom height in pixels")
    parser.add_argument("--quality", type=int, default=85, help="Quality 1-100 (default: 85)")
    parser.add_argument("--format", choices=["jpeg", "jpg", "png", "webp"], default="jpeg",
                        help="Output format for custom dimensions")
    args = parser.parse_args()

    # Validate input
    if not os.path.exists(args.input):
        print(f"ERROR: Input file not found: {args.input}")
        sys.exit(1)

    # Prepare output dir
    output_dir = args.output
    if args.preset == "all":
        output_dir = os.path.join(args.output, "seo-images")
    os.makedirs(output_dir, exist_ok=True)

    # Load image
    try:
        img = open_image(args.input)
    except Exception as e:
        print(f"ERROR: Could not open image: {e}")
        sys.exit(1)

    original_size = os.path.getsize(args.input)
    stem = Path(args.input).stem
    print(f"\n📷  Input:  {args.input}")
    print(f"    Size:   {human_size(original_size)}  |  {img.width}×{img.height}  |  mode: {img.mode}")
    print(f"    Output: {output_dir}\n")

    results = []

    # Custom dimensions mode
    if args.width or args.height:
        fmt_map = {"jpeg": "JPEG", "jpg": "JPEG", "png": "PNG", "webp": "WEBP"}
        fmt = fmt_map.get(args.format.lower(), "JPEG")
        custom_preset = {
            "label": "Custom",
            "width": args.width,
            "height": args.height,
            "format": fmt,
            "quality": args.quality,
            "suffix": f"custom-{args.width or 'auto'}x{args.height or 'auto'}",
        }
        result = process_preset(img, custom_preset, stem, output_dir)
        results.append(result)

    elif args.preset == "all":
        for key in ALL_PRESET_KEYS:
            result = process_preset(img, PRESETS[key], stem, output_dir)
            results.append(result)

    else:
        result = process_preset(img, PRESETS[args.preset], stem, output_dir)
        results.append(result)

    # Print summary
    print("✅  Optimized files:\n")
    print(f"  {'Label':<30} {'Dimensions':<14} {'Format':<8} {'Size':<10} {'Filename'}")
    print(f"  {'-'*30} {'-'*14} {'-'*8} {'-'*10} {'-'*30}")
    for r in results:
        ratio = (1 - r["size_bytes"] / original_size) * 100
        ratio_str = f"(-{ratio:.0f}%)" if ratio > 0 else f"(+{abs(ratio):.0f}%)"
        print(f"  {r['label']:<30} {r['dimensions']:<14} {r['format']:<8} {r['size_human']:<6} {ratio_str:<8}  {r['filename']}")

    print(f"\n  Original: {human_size(original_size)}")

    # Print metatag snippet for main presets
    og = next((r for r in results if "og" in r["filename"].lower() or "og_image" in args.preset), None)
    tw = next((r for r in results if "twitter" in r["filename"].lower()), None)

    if og or tw:
        print("\n" + "─" * 70)
        print("📋  HTML Metatag snippet (update the URL and alt text):\n")
        if og:
            dims = og["dimensions"].split("×")
            w_val = dims[0] if len(dims) == 2 else "1200"
            h_val = dims[1] if len(dims) == 2 else "630"
            ext = og["filename"].rsplit(".", 1)[-1]
            mime = "image/webp" if ext == "webp" else f"image/{ext}"
            print("    <!-- Open Graph / Facebook / LinkedIn -->")
            print(f'    <meta property="og:image" content="https://yoursite.com/images/{og["filename"]}" />')
            print(f'    <meta property="og:image:width" content="{w_val}" />')
            print(f'    <meta property="og:image:height" content="{h_val}" />')
            print(f'    <meta property="og:image:type" content="{mime}" />')
            print(f'    <meta property="og:image:alt" content="[Add descriptive alt text]" />')
            print()
        if tw:
            print("    <!-- Twitter Card -->")
            print(f'    <meta name="twitter:card" content="summary_large_image" />')
            print(f'    <meta name="twitter:image" content="https://yoursite.com/images/{tw["filename"]}" />')
            print(f'    <meta name="twitter:image:alt" content="[Add descriptive alt text]" />')
        print("─" * 70)

    print(f"\n💡  Tips:")
    print(f"    • Replace 'yoursite.com' with your actual domain (must be HTTPS)")
    print(f"    • Add meaningful alt text describing the image content")
    print(f"    • Use descriptive filenames — Google reads them for context")
    print(f"    • Test with: https://developers.facebook.com/tools/debug/")
    print(f"               https://cards-dev.twitter.com/validator\n")

    return results


if __name__ == "__main__":
    main()