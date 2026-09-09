/**
 * Build a contact sheet per source folder so covers can be chosen by looking at
 * the photographs rather than at their filenames.
 *
 * Dev tooling only — output goes to the scratch directory, never to public/.
 *
 *   node scripts/contact-sheet.mjs <srcDir> <outFile> [startIndex] [count]
 */
import { readdir } from 'node:fs/promises';
import path from 'node:path';
import sharp from 'sharp';

const [, , srcDir, outFile, startArg = '0', countArg = '24'] = process.argv;
if (!srcDir || !outFile) {
  console.error('usage: node scripts/contact-sheet.mjs <srcDir> <outFile> [start] [count]');
  process.exit(1);
}

const COLS = 4;
const CELL_W = 320;
const CELL_H = 214;
const LABEL_H = 18;

const start = Number(startArg);
const count = Number(countArg);

const entries = (await readdir(srcDir))
  .filter((name) => /\.(jpe?g|png)$/i.test(name))
  .sort();

const slice = entries.slice(start, start + count);
if (slice.length === 0) {
  console.error('no images in range');
  process.exit(1);
}

const rows = Math.ceil(slice.length / COLS);
const sheetW = COLS * CELL_W;
const sheetH = rows * (CELL_H + LABEL_H);

const composites = [];

for (const [index, name] of slice.entries()) {
  const col = index % COLS;
  const row = Math.floor(index / COLS);

  const buffer = await sharp(path.join(srcDir, name))
    .rotate()
    .resize(CELL_W, CELL_H, { fit: 'cover' })
    .toBuffer();

  composites.push({ input: buffer, left: col * CELL_W, top: row * (CELL_H + LABEL_H) });

  const label = `${start + index}  ${name}`;
  const svg = Buffer.from(
    `<svg width="${CELL_W}" height="${LABEL_H}" xmlns="http://www.w3.org/2000/svg">
       <rect width="100%" height="100%" fill="#111"/>
       <text x="4" y="13" font-family="monospace" font-size="11" fill="#eee">${label.replace(/&/g, '&amp;').replace(/</g, '&lt;')}</text>
     </svg>`,
  );
  composites.push({
    input: svg,
    left: col * CELL_W,
    top: row * (CELL_H + LABEL_H) + CELL_H,
  });
}

await sharp({
  create: {
    width: sheetW,
    height: sheetH,
    channels: 3,
    background: { r: 20, g: 20, b: 20 },
  },
})
  .composite(composites)
  .png()
  .toFile(outFile);

console.log(`${outFile}  (${slice.length} of ${entries.length} images, from index ${start})`);
