import fs from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

import sharp from 'sharp';

const scriptDir = path.dirname(fileURLToPath(import.meta.url));
const rootDir = path.resolve(scriptDir, '..');
const sourceDir = path.join(rootDir, 'src', 'assets', 'Photos', 'source');
const outputDir = path.join(rootDir, 'src', 'assets', 'Photos', 'optimized');
const imageExtensions = new Set([
  '.avif',
  '.jpeg',
  '.jpg',
  '.png',
  '.tif',
  '.tiff',
  '.webp',
]);

async function readSourceImages() {
  let entries;

  try {
    entries = await fs.readdir(sourceDir, { withFileTypes: true });
  } catch (error) {
    if (error?.code === 'ENOENT') {
      throw new Error(`Source directory does not exist: ${sourceDir}`);
    }

    throw error;
  }

  return entries
    .filter((entry) => entry.isFile())
    .map((entry) => entry.name)
    .filter((fileName) => imageExtensions.has(path.extname(fileName).toLowerCase()))
    .sort((a, b) => a.localeCompare(b, 'en'));
}

async function clearGeneratedPhotos() {
  await fs.mkdir(outputDir, { recursive: true });

  const entries = await fs.readdir(outputDir, { withFileTypes: true });
  await Promise.all(
    entries
      .filter((entry) => entry.isFile() && /^photo-\d+\.webp$/u.test(entry.name))
      .map((entry) => fs.unlink(path.join(outputDir, entry.name)))
  );
}

async function optimizePhotos() {
  const sourceImages = await readSourceImages();

  if (sourceImages.length === 0) {
    throw new Error(`No source images found in ${sourceDir}`);
  }

  await clearGeneratedPhotos();

  await Promise.all(
    sourceImages.map(async (fileName, index) => {
      const outputName = `photo-${String(index + 1).padStart(2, '0')}.webp`;
      const inputPath = path.join(sourceDir, fileName);
      const outputPath = path.join(outputDir, outputName);

      await sharp(inputPath)
        .rotate()
        .resize({
          width: 1920,
          height: 1920,
          fit: 'inside',
          withoutEnlargement: true,
        })
        .webp({
          quality: 78,
          effort: 6,
        })
        .toFile(outputPath);

      console.log(`${fileName} -> ${path.relative(rootDir, outputPath)}`);
    })
  );
}

optimizePhotos().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
