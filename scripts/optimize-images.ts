#!/usr/bin/env tsx
/**
 * Pre-generates AVIF and WebP variants at the widths spec §24 / PDF §16 name:
 * 400, 800, 1200, 1920.
 *
 * next/image can do this on demand, but the master navigation image is the LCP
 * element on the entry page — the first visitor after a deploy should not pay
 * for a 9.4 MP transcode. These are generated at build time instead.
 *
 * The source is never modified and never cropped: aspect ratio is preserved and
 * only the width is reduced (spec §23 — preserve composition).
 */
import { mkdir, readdir, stat } from 'node:fs/promises';
import { join, parse } from 'node:path';
import sharp from 'sharp';

const SOURCE_DIR = 'public/images';
const OUTPUT_DIR = 'public/images/optimized';
const WIDTHS = [400, 800, 1200, 1920] as const;
const SOURCE_EXTENSIONS = new Set(['.jpg', '.jpeg', '.png']);

async function main(): Promise<void> {
  await mkdir(OUTPUT_DIR, { recursive: true });

  const entries = await readdir(SOURCE_DIR);
  let generated = 0;
  let skipped = 0;

  for (const entry of entries) {
    const path = join(SOURCE_DIR, entry);
    if (!(await stat(path)).isFile()) continue;

    const { name, ext } = parse(entry);
    if (!SOURCE_EXTENSIONS.has(ext.toLowerCase())) continue;

    const image = sharp(path);
    const { width: sourceWidth = 0 } = await image.metadata();

    for (const width of WIDTHS) {
      // Never upscale — enlarging a source adds bytes and removes quality.
      if (sourceWidth > 0 && width > sourceWidth) {
        skipped += 1;
        continue;
      }

      // `fit: 'inside'` preserves aspect ratio; no crop is ever applied.
      const resized = sharp(path).resize({ width, fit: 'inside', withoutEnlargement: true });

      await resized
        .clone()
        .avif({ quality: 62, effort: 5 })
        .toFile(join(OUTPUT_DIR, `${name}-${width}.avif`));

      await resized
        .clone()
        .webp({ quality: 78 })
        .toFile(join(OUTPUT_DIR, `${name}-${width}.webp`));

      generated += 2;
    }

    console.log(`  ${entry} (${sourceWidth}px source)`);
  }

  console.log(`\nGenerated ${generated} variants, skipped ${skipped} upscales.`);
}

main().catch((error: unknown) => {
  console.error('Image optimization failed:', error);
  process.exit(1);
});
