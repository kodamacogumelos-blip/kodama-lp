/**
 * Converte todas as imagens JPG/PNG de brand_assets/ para WebP.
 * Gera também versões mobile (640px) para imagens > 1MB.
 * Executado pelo Vercel como parte do build.
 */
import sharp from 'sharp';
import { readdirSync, statSync } from 'fs';
import { join, extname, basename } from 'path';
import { fileURLToPath } from 'url';
import { dirname } from 'path';

const __dirname = dirname(fileURLToPath(import.meta.url));
const assetsDir = join(__dirname, '..', 'brand_assets');

const files = readdirSync(assetsDir).filter(f => /\.(jpg|jpeg|png)$/i.test(f));

for (const file of files) {
  const input = join(assetsDir, file);
  const sizeMB = statSync(input).size / (1024 * 1024);
  const stem = basename(file, extname(file));

  // Full-size WebP
  const output = join(assetsDir, `${stem}.webp`);
  await sharp(input).webp({ quality: 82 }).toFile(output);
  const newSize = statSync(output).size / 1024;
  console.log(`✓ ${file} (${sizeMB.toFixed(1)}MB) → ${stem}.webp (${newSize.toFixed(0)}KB)`);

  // Versão mobile (640px) apenas para imagens grandes
  if (sizeMB > 1) {
    const meta = await sharp(input).metadata();
    if (meta.width > 640) {
      const mobileOut = join(assetsDir, `${stem}-mobile.webp`);
      await sharp(input).resize(640).webp({ quality: 75 }).toFile(mobileOut);
      const mobileSize = statSync(mobileOut).size / 1024;
      console.log(`  └─ mobile: ${stem}-mobile.webp (${mobileSize.toFixed(0)}KB)`);
    }
  }
}

console.log(`\nConvertidas ${files.length} imagens.`);
