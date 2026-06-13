---
name: arxiv-tex-source
description: Download an arXiv paper's LaTeX source bundle and extract assets (figure PDFs, tables, bib entries) for reuse — for example, embedding a paper's original figures into a blog post. Converts figure PDFs to web-friendly WebP via pdftoppm + ImageMagick. Use when the user wants the *original* (not screenshotted) figures, tables, or equations from an arXiv paper, identified by arXiv ID (e.g. 2502.11089) or arxiv.org URL.
---

# arxiv-tex-source

Extract the LaTeX source of an arXiv paper, locate a specific figure by its `\label{}` or filename, and convert it to a sized WebP suitable for the web.

## When to use

- "Pull figure N from arXiv 2502.11089 into the blog post."
- "I need the original PDF of figure X from this paper, not a screenshot."
- "Get the bibtex / table / equation source from arxiv paper Y."

Do **not** use this for: rendering whole papers as PDFs (use a PDF viewer), or summarizing paper content (use WebFetch on the abstract page).

## Prerequisites

Check these binaries exist before starting; install if missing.

Obtaining Tex source files from the internet:

```bash
which curl tar
```

Converting figures in the paper from PDF to WEBP/PNG.

```bash
which pdftoppm magick
# arch: sudo pacman -S poppler imagemagick
```

## Workflow

### 1. Download and unpack the source

arXiv exposes the LaTeX source bundle at `https://arxiv.org/src/<ID>` (no version suffix needed; latest is served). The download is a gzipped tarball even though the URL has no extension. Download directory is `./.arxiv-sources/`.

```bash
ARXIV_ID="2502.11089"
WORKDIR="./.arxiv-sources/${ARXIV_ID}"
mkdir -p "$WORKDIR" && cd "$WORKDIR"
curl -sL "https://arxiv.org/src/${ARXIV_ID}" -o src.tar
file src.tar   # confirm: "gzip compressed data"
tar xf src.tar
ls
```

Typical layout: `main.tex`, `sections/`, `figures/`, `tables/`, `main.bbl`, `main.bib`.

Some papers ship a single flat `.tex` file with no folders. Some use `\input{...}` instead of `\include{...}`. Some bundle figures as `.eps` or `.png` rather than `.pdf` — handle whichever appears.

### 2. Locate the figure you want

The user may name the figure by number ("figure 2"), by label, or by content. Number is unreliable — papers reorder figures between revisions. Prefer matching by `\label{}` and caption:

```bash
# Find all figure environments with their includegraphics targets and labels
grep -rn -A 5 "\\\\begin{figure" sections/ main.tex 2>/dev/null | \
  grep -E "includegraphics|label|caption" | head -40

# Or, search for a specific label
grep -rn "fig:framework\|figures/fig2.pdf" .
```

Then pull the caption to confirm and to seed your `<figcaption>`:

```bash
# Show the figure block containing fig2.pdf
grep -rn -B 1 -A 8 "figures/fig2.pdf" sections/
```

### 3. Convert PDF → WebP

`pdftoppm` rasterizes the PDF preserving vector quality; `magick` resizes and encodes WebP. Render at high DPI first, then downscale — this beats rendering directly at the target size, because vector outlines stay crisp.

```bash
SRC_PDF="figures/fig2.pdf"
OUT_DIR="$PROJECT/src/assets/images/<paper-slug>"
OUT_NAME="figure-name"             # human-meaningful slug, not "fig2"
TARGET_WIDTH=2400                  # 2400 = retina-friendly for ~1200px display

mkdir -p "$OUT_DIR"
cd "$(dirname "$SRC_PDF")"
pdftoppm -r 300 -png "$(basename "$SRC_PDF")" "_tmp_render"
# pdftoppm appends "-1", "-2" per page; single-page PDFs produce "_tmp_render-1.png"
magick "_tmp_render-1.png" \
  -resize "${TARGET_WIDTH}x" \
  -quality 88 \
  -define webp:method=6 \
  "$OUT_DIR/$OUT_NAME.webp"
rm _tmp_render-*.png

magick identify "$OUT_DIR/$OUT_NAME.webp"   # confirm dimensions and size
```

Tuning notes:

- **DPI:** 300 is the sweet spot for text-heavy figures. Go to 600 only if the figure has tiny labels you still want legible at retina. Below 200 and font hinting gets ugly.
- **Width:** 2400px covers retina on a typical blog column. Going larger wastes bytes; smaller costs sharpness on hi-DPI screens. Astro's `<Image>` will further downscale per viewport — providing a high-res source is the right move.
- **Quality:** WebP `-quality 88` is near-lossless for diagrams while keeping file size modest. Photos can drop to 75; line art / equations should stay 85+.
- **`method=6`:** slowest/best WebP encoder pass; worth it for one-shot conversion.
- **Multi-page PDFs:** if `pdftoppm` outputs `_tmp_render-1.png … -N.png`, the figure you want is usually `-1`. Subfigures sometimes need page-N extraction or `pdfseparate` first.

### 4. Embed in the blog post

For this AstroPaper project specifically:

- **MDX (preferred for figures):** import via `astro:assets` so the image is optimized.

  ```mdx
  import { Image } from "astro:assets";
  import fig from "@/assets/images/<paper-slug>/figure-name.webp";

  <figure>
    <Image src={fig} alt="..." />
    <figcaption>
      Figure N from Author et al. (Year), <a href="https://arxiv.org/abs/XXXX.XXXXX">arXiv:XXXX.XXXXX</a>. <strong>Left/Right/etc:</strong> brief description...
    </figcaption>
  </figure>
  ```

- **Plain MD:** use `![alt](@/assets/images/<paper-slug>/figure-name.webp)` — Astro still optimizes assets under `src/assets/`, but you lose `<Image>`'s explicit sizing and responsive `srcset`.

- **Never** put figures in `public/` for this use case — Astro skips optimization on `public/` and your 2400px source will ship as-is to every viewport.

### 5. Attribution and licensing

arXiv papers default to the arXiv non-exclusive license, which permits redistribution with attribution but is *not* the same as CC-BY. Many recent papers (including most DeepSeek releases) opt into CC-BY explicitly — check the "License" field on the arXiv abstract page (`https://arxiv.org/abs/<ID>`) before reuse, especially commercial.

Either way:

- Credit author(s) and arXiv ID in the `<figcaption>`.
- Link back to the abstract page.
- Don't crop or alter the figure in a way that misrepresents it.

## Other assets you can extract

The same tarball usually contains:

- **`main.bib` / `main.bbl`** — copy bibtex entries for your own references.
- **`tables/*.tex`** — table source; usually easier to retype small ones than wrestle with `\multirow` etc.
- **Equations** — read the relevant `sections/*.tex` and copy `$$...$$` blocks directly into your MDX (KaTeX renders nearly all standard LaTeX math).

## Quick reference

```bash
# One-shot: download, extract, convert figure to WebP
ARXIV_ID="2502.11089"; FIG="figures/fig2.pdf"; OUT="$HOME/Code/proj/src/assets/images/nsa/arch.webp"
cd /tmp && mkdir -p "arxiv-$ARXIV_ID" && cd "arxiv-$ARXIV_ID" && \
  curl -sL "https://arxiv.org/src/$ARXIV_ID" -o src.tar && tar xf src.tar && \
  pdftoppm -r 300 -png "$FIG" _r && \
  magick _r-1.png -resize 2400x -quality 88 -define webp:method=6 "$OUT" && \
  magick identify "$OUT"
```
