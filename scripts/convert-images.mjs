/**
 * Converte todas as imagens JPG/PNG de brand_assets/ para WebP.
 * Para imagens > 500KB, gera versões responsivas:
 *   -400.webp  (400px, q70)  — mobile
 *   -1200.webp (1200px, q80) — desktop
 * Também redimensiona arquivos .webp já existentes que sejam grandes.
 * Executado pelo Vercel como parte do build.
 */
import sharp from 'sharp';
import { readdirSync, statSync } from 'fs';
import { join, extname, basename } from 'path';
import { fileURLToPath } from 'url';
import { dirname } from 'path';

const __dirname = dirname(fileURLToPath(import.meta.url));
const assetsDir = join(__dirname, '..', 'brand_assets');

// Converte JPG/PNG → WebP (tamanho original)
const sourceFiles = readdirSync(assetsDir).filter(f => /\.(jpg|jpeg|png)$/i.test(f));
for (const file of sourceFiles) {
  const input = join(assetsDir, file);
  const sizeMB = statSync(input).size / (1024 * 1024);
  const stem = basename(file, extname(file));

  const output = join(assetsDir, `${stem}.webp`);
  await sharp(input).webp({ quality: 82 }).toFile(output);
  const newKB = statSync(output).size / 1024;
  console.log(`✓ ${file} (${sizeMB.toFixed(1)}MB) → ${stem}.webp (${newKB.toFixed(0)}KB)`);
}

// Gera versões responsivas para imagens grandes (JPG/PNG/WebP > 500KB)
const allImageFiles = readdirSync(assetsDir).filter(f => /\.(jpg|jpeg|png|webp)$/i.test(f));
for (const file of allImageFiles) {
  // Pula arquivos que já são versões responsivas
  if (/-400\.webp$|-1200\.webp$|-mobile\.webp$/.test(file)) continue;

  const input = join(assetsDir, file);
  const sizeKB = statSync(input).size / 1024;
  if (sizeKB < 500) continue;

  const stem = basename(file, extname(file));
  const meta = await sharp(input).metadata();

  // Versão 400px (mobile)
  if (meta.width > 400) {
    const out400 = join(assetsDir, `${stem}-400.webp`);
    await sharp(input).resize(400).webp({ quality: 70 }).toFile(out400);
    const kb = statSync(out400).size / 1024;
    console.log(`  └─ 400px: ${stem}-400.webp (${kb.toFixed(0)}KB)`);
  }

  // Versão 1200px (desktop)
  if (meta.width > 1200) {
    const out1200 = join(assetsDir, `${stem}-1200.webp`);
    await sharp(input).resize(1200).webp({ quality: 80 }).toFile(out1200);
    const kb = statSync(out1200).size / 1024;
    console.log(`  └─ 1200px: ${stem}-1200.webp (${kb.toFixed(0)}KB)`);
  }
}

console.log(`\nConvertidas ${sourceFiles.length} imagens.`);
