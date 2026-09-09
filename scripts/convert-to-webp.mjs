#!/usr/bin/env node

import { readdir, stat, unlink } from 'node:fs/promises';
import { join, parse } from 'node:path';
import sharp from 'sharp';

const TARGET_DIRS = ['reference/Pictures', 'reference/legacy-assets'];
const SOURCE_EXTENSIONS = new Set(['.jpg', '.jpeg', '.png']);

async function processDirectory(dir) {
  let processed = 0;
  let errors = 0;
  try {
    const entries = await readdir(dir, { withFileTypes: true });

    for (const entry of entries) {
      const fullPath = join(dir, entry.name);

      if (entry.isDirectory()) {
        const result = await processDirectory(fullPath);
        processed += result.processed;
        errors += result.errors;
      } else {
        const { name, ext } = parse(entry.name);
        if (!SOURCE_EXTENSIONS.has(ext.toLowerCase())) continue;

        const webpPath = join(dir, `${name}.webp`);
        
        try {
          // Convert to WebP
          await sharp(fullPath)
            .webp({ quality: 80 })
            .toFile(webpPath);
            
          // Delete original file
          await unlink(fullPath);
          console.log(`Converted and deleted: ${fullPath} -> ${webpPath}`);
          processed++;
        } catch (err) {
          console.error(`Failed to process ${fullPath}:`, err.message);
          errors++;
        }
      }
    }
  } catch (err) {
    if (err.code !== 'ENOENT') {
      console.error(`Error reading directory ${dir}:`, err.message);
    }
  }
  
  return { processed, errors };
}

async function main() {
  console.log('Starting image conversion to WebP...');
  let totalProcessed = 0;
  let totalErrors = 0;

  for (const dir of TARGET_DIRS) {
    console.log(`\nScanning directory: ${dir}`);
    const result = await processDirectory(dir);
    totalProcessed += result.processed;
    totalErrors += result.errors;
  }

  console.log(`\nFinished! Successfully processed ${totalProcessed} images with ${totalErrors} errors.`);
}

main().catch(console.error);
