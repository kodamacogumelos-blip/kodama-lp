/**
 * Converte todas as imagens JPG/PNG de brand_assets/ para WebP.
 * - Aplica auto-rotate via EXIF antes de qualquer resize (preserva orientação original).
 * - Pula a conversão se o WebP resultante for maior que o arquivo original.
 * - Para imagens > 500KB, gera versões responsivas:
 *     -400.webp  (400px, q70)  — mobile
 *     -1200.webp (1200px, q80) — desktop
 * Executado pelo Vercel como parte do build.
 */
import sharp from 'sharp';
import { readdirSync, statSync, unlinkSync, existsSync } from 'fs';
import { join, extname, basename } from 'path';
import { fileURLToPath } from 'url';
import { dirname } from 'path';

const __dirname = dirname(fileURLToPath(import.meta.url));
const assetsDir = join(__dirname, '..', 'brand_assets');

// ── Converte JPG/PNG → WebP (tamanho original) ──────────────────────────────
const sourceFiles = readdirSync(assetsDir).filter(f => /\.(jpg|jpeg|png)$/i.test(f));
for (const file of sourceFiles) {
  const input  = join(assetsDir, file);
  const srcKB  = statSync(input).size / 1024;
  const stem   = basename(file, extname(file));
  const output = join(assetsDir, `${stem}.webp`);

  // .rotate() sem argumentos aplica a orientação EXIF e normaliza para top-left
  await sharp(input).rotate().webp({ quality: 82 }).toFile(output);
  const dstKB = statSync(output).size / 1024;

  if (dstKB >= srcKB) {
    // WebP ficou maior — descartar e manter o original no <img> fallback
    unlinkSync(output);
    console.log(`⚠ ${file} (${srcKB.toFixed(0)}KB) → WebP seria ${dstKB.toFixed(0)}KB — mantendo original`);
  } else {
    console.log(`✓ ${file} (${srcKB.toFixed(0)}KB) → ${stem}.webp (${dstKB.toFixed(0)}KB)`);
  }
}

// ── Gera versões responsivas para imagens grandes (> 500KB) ─────────────────
const allImageFiles = readdirSync(assetsDir).filter(f => /\.(jpg|jpeg|png|webp)$/i.test(f));
for (const file of allImageFiles) {
  // Pula arquivos que já são versões responsivas
  if (/-400\.webp$|-1200\.webp$|-mobile\.webp$/.test(file)) continue;

  const input  = join(assetsDir, file);
  const sizeKB = statSync(input).size / 1024;
  if (sizeKB < 500) continue;

  const stem = basename(file, extname(file));
  const meta = await sharp(input).rotate().metadata();

  // Versão 400px (mobile 1x)
  if (meta.width > 400) {
    const out400 = join(assetsDir, `${stem}-400.webp`);
    await sharp(input).rotate().resize(400).webp({ quality: 70 }).toFile(out400);
    const kb = statSync(out400).size / 1024;
    console.log(`  └─ 400px: ${stem}-400.webp (${kb.toFixed(0)}KB)`);
  }

  // Versão 800px (mobile HiDPI / tablet)
  if (meta.width > 800) {
    const out800 = join(assetsDir, `${stem}-800.webp`);
    await sharp(input).rotate().resize(800).webp({ quality: 75 }).toFile(out800);
    const kb = statSync(out800).size / 1024;
    console.log(`  └─ 800px: ${stem}-800.webp (${kb.toFixed(0)}KB)`);
  }

  // Versão 1200px (desktop)
  if (meta.width > 1200) {
    const out1200 = join(assetsDir, `${stem}-1200.webp`);
    await sharp(input).rotate().resize(1200).webp({ quality: 80 }).toFile(out1200);
    const kb = statSync(out1200).size / 1024;
    console.log(`  └─ 1200px: ${stem}-1200.webp (${kb.toFixed(0)}KB)`);
  }
}

console.log(`\nConvertidas ${sourceFiles.length} imagens.`);
