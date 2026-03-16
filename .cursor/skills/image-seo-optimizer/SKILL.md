---
name: image-seo-optimizer
description: Optimizes images for search engines and performance with alt text, file names, dimensions, formats, and compression. Use when adding or optimizing images for the web, improving Core Web Vitals, or when the user asks about image SEO.
---
---
name: image-seo-optimizer
description: >
  Optimize and resize images for SEO metatags and web performance. Use this skill whenever
  the user wants to: resize images for Open Graph (og:image), Twitter Cards, or other SEO
  metatags; compress images for web; convert image formats (WebP, JPEG, PNG); generate
  SEO-optimized versions of images with correct dimensions; batch process multiple images
  for social media or search engine optimization. Trigger on phrases like "optimize image
  for SEO", "resize for metatags", "og:image size", "Twitter card image", "compress image
  for web", "image for social share", "reduce image size", or any request combining images
  with SEO, social media previews, or web performance.
---

# Image SEO Optimizer Skill

Resize, compress, and optimize images for SEO metatags, social media, and web performance.

## Quick Reference: SEO Image Dimensions

| Platform / Metatag       | Width × Height | Max Size | Format    |
|--------------------------|---------------|----------|-----------|
| **Open Graph (og:image)**| 1200 × 630    | 8 MB     | JPG/PNG   |
| **Twitter Card (large)** | 1200 × 628    | 5 MB     | JPG/PNG/WebP |
| **Twitter Card (small)** | 800 × 418     | 5 MB     | JPG/PNG   |
| **LinkedIn Share**       | 1200 × 627    | 5 MB     | JPG/PNG   |
| **WhatsApp Preview**     | 300 × 200     | 300 KB   | JPG/PNG   |
| **Favicon**              | 32 × 32 / 192 × 192 | —  | PNG/ICO   |
| **Apple Touch Icon**     | 180 × 180     | —        | PNG       |
| **Google Discover**      | 1200 × any (min 1200w) | — | JPG/WebP |
| **Structured Data**      | 696 × any     | —        | JPG/PNG   |

## Workflow

### Step 1 — Identify the user's goal

Ask (or infer from context):
- Which platform/metatag? (og:image, Twitter, LinkedIn, general web)
- Input file location (uploaded or path)
- Desired output format (WebP recommended for web, JPEG for compatibility)
- Quality preference (default: 85 for JPEG/WebP)

### Step 2 — Run the optimization script

Use the script at `scripts/optimize_image.py`. Always run it with Python 3.

**Basic usage:**
```bash
python3 scripts/optimize_image.py \
  --input /path/to/image.jpg \
  --output /mnt/user-data/outputs/ \
  --preset og_image
```

**Available presets:** `og_image`, `twitter_large`, `twitter_small`, `linkedin`, `whatsapp`, `favicon`, `apple_touch`, `google_discover`, `all`

**Custom dimensions:**
```bash
python3 scripts/optimize_image.py \
  --input /path/to/image.jpg \
  --output /mnt/user-data/outputs/ \
  --width 1200 \
  --height 630 \
  --quality 85 \
  --format webp
```

**Batch (all SEO presets):**
```bash
python3 scripts/optimize_image.py \
  --input /path/to/image.jpg \
  --output /mnt/user-data/outputs/ \
  --preset all
```

### Step 3 — Report results

After running, report:
1. **Output files** created (name, dimensions, file size)
2. **Compression ratio** (original vs optimized)
3. **Recommended HTML metatags** snippet ready to copy-paste
4. Use `present_files` to deliver the optimized image(s)

### Step 4 — Generate metatag HTML snippet

Always generate a ready-to-use HTML snippet. Example for og:image:

```html
<!-- Open Graph / Facebook -->
<meta property="og:image" content="https://yoursite.com/images/og-image.jpg" />
<meta property="og:image:width" content="1200" />
<meta property="og:image:height" content="630" />
<meta property="og:image:alt" content="[Describe your image here]" />
<meta property="og:image:type" content="image/jpeg" />

<!-- Twitter -->
<meta name="twitter:card" content="summary_large_image" />
<meta name="twitter:image" content="https://yoursite.com/images/twitter-image.jpg" />
<meta name="twitter:image:alt" content="[Describe your image here]" />
```

## SEO Best Practices to mention

- **Format**: WebP is best for modern web (30-40% smaller than JPEG at same quality). Use JPEG as fallback.
- **Quality**: 80-85 is the sweet spot — visually lossless, much smaller file.
- **Alt text**: Always remind the user to add meaningful `alt` text to metatags.
- **File naming**: Suggest `kebab-case` descriptive names (e.g., `product-launch-hero.jpg`) — Google reads filenames.
- **Aspect ratio**: Never distort images. The script uses `cover` crop (centers and crops) by default.
- **HTTPS**: Metatag image URLs must use HTTPS or social crawlers will reject them.

## Error Handling

- **Input not found**: Ask the user to upload the image or verify the path.
- **Image too small**: Warn that upscaling reduces quality. Suggest using a higher-resolution source.
- **Unsupported format**: Script handles JPG, PNG, WebP, BMP, TIFF, GIF (first frame). For SVG, advise exporting as PNG first.
- **Animated GIF/WebP**: Script extracts first frame. Mention this to the user.

## Notes

- The script copies the image to the outputs directory with a descriptive filename.
- Always check `/mnt/user-data/uploads/` first if the user says they uploaded a file.
- For `--preset all`, a subfolder `seo-images/` is created in the output directory.