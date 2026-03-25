# CLAUDE.md — Kodama Cogumelos Frontend Rules

## Always Do First
- **Invoke the `frontend-design` skill** before writing any frontend code, every session.
- Read this file completely before starting any task.

---

## Project Context
- **Brand:** Kodama Cogumelos — extratos líquidos hidroalcoólicos de cogumelos funcionais (Juba de Leão, Cordyceps, Reishi)
- **Goal:** Landing page de alta conversão (B2C, ticket médio R$90–R$240)
- **Checkout:** Yampi (externo ao site). Todos os botões CTA devem apontar para URLs Yampi.
- **Regulatory:** Produto alimentício sob RDC 843/2024. NUNCA usar termos como "suplemento", "medicinal", "trata", "cura", "alimento funcional". Copy deve atribuir benefícios a pesquisadores/estudos em terceira pessoa.

---

## Brand Assets
- Always check the `brand_assets/` folder before designing.
- **Primary color:** Verde escuro `#2D4A10` (header, botões primários)
- **Secondary color:** Verde médio `#3D6B1A`
- **Accent:** Dourado/Creme `#C8A96E` (destaques, subtítulos)
- **Background:** Off-white `#F9F6F0` ou branco puro
- **Text:** `#1A1A1A` para corpo, `#2D4A10` para títulos
- **Font headings:** Playfair Display ou similar (serifada, premium)
- **Font body:** Inter ou Lato (sans-serif, legível)
- If a logo is present in `brand_assets/`, always use it. Never use placeholder logos.

---

## Reference Images
- If a reference image is provided: match layout, spacing, typography, and color exactly.
- If no reference image: design from scratch following brand guardrails above.
- Screenshot your output, compare against reference, fix mismatches, re-screenshot. Do not stop after one screenshot pass.

---

## Local Server
- **Always serve on localhost** — never screenshot a `file:///` URL.
- Start the dev server: `npx serve .` or `python -m http.server 3000` from project root.
- Always confirm server is running before taking any screenshot.

---

## Screenshot Workflow
- Puppeteer is installed at standard location. Always screenshot from `http://localhost:3000`.
- Screenshots saved to `./screenshots/screenshot-N.png`.
- After screenshotting, read the PNG and compare visually.
- Be specific when reporting issues: "heading is 32px but reference shows 24px", "CTA button color is #3D6B1A but should be #2D4A10".
- Check: spacing/padding, font size/weight/line-height, colors (exact hex), alignment, CTA visibility.

---

## Output Defaults
- Single `index.html` file, all styles inline or in `<style>` tag, unless told otherwise.
- Tailwind CSS via CDN: `<script src="https://cdn.tailwindcss.com"></script>`
- Placeholder images: `https://placehold.co/WIDTHxHEIGHT`
- Mobile-first responsive. Always test at 375px and 1280px widths.

---

## Landing Page Structure (High Conversion)
Build sections in this order unless instructed otherwise:

1. **Hero** — Headline emocional + subheadline + CTA primário + imagem produto
2. **Prova social rápida** — Logos de mídia ou número de clientes / avaliações
3. **Problema/Solução** — Identificar dor do cliente, apresentar produto como resposta
4. **Como funciona** — 3 passos simples (processo de extração / uso do produto)
5. **Benefícios** — Cards com ícones. Copy em terceira pessoa ("Pesquisadores observaram que...")
6. **Depoimentos** — Mínimo 3, com foto, nome, cidade
7. **Produto + Preço** — Apresentação do SKU, preço com desconto, parcelamento, CTA
8. **FAQ** — Mínimo 5 perguntas frequentes, incluindo "É registrado na ANVISA?"
9. **CTA Final** — Repetição do botão de compra com urgência leve
10. **Footer** — Logo, CNPJ, disclaimer ANVISA, redes sociais

---

## CTA Rules
- Primary CTA text options: "EU QUERO", "GARANTIR MEU FRASCO", "COMPRAR AGORA"
- CTA button: background `#2D4A10`, text branco, border-radius 8px, padding 16px 32px, font-weight 700
- Every section must have at least one CTA visible without scrolling on mobile.
- CTA links must point to Yampi checkout URLs (use placeholder `#yampi-checkout` if URL unknown).

---

## Copy Rules (ANVISA Compliance)
- ✅ PERMITIDO: "Estudos indicam que...", "Pesquisadores da Universidade X observaram...", "Rico em beta-glucanas", "Extrato de alta concentração"
- ❌ PROIBIDO: "Trata", "Cura", "Previne doenças", "Suplemento", "Medicinal", "Alimento funcional", "Fortalece o sistema imunológico" (como claim direto)
- Disclaimer obrigatório no footer: *"Produto alimentício, isento de registro conforme RDC nº 843."*
- Nunca usar iconografia de órgãos humanos (cérebro, coração, etc.) associada a benefícios.

---

## Anti-Generic Guardrails
- **Colors:** Never use default Tailwind palette (Indigo-500, blue-600, etc.). Always use Kodama brand hex values.
- **Typography:** Never use the same font for headings and body. Use Playfair Display/serif for headings, Inter/sans for body.
- **Shadows:** Never use flat `shadow-md`. Use layered, color-tinted shadows with low opacity.
- **Gradients:** Layer multiple radial gradients. Add grain/texture via SVG noise filter.
- **Animations:** Only animate `transform` and `opacity`. Never use `transition-all`.
- **Interactive states:** Every clickable element needs hover, focus-visible, and active states.
- **Images:** Add a gradient overlay (`bg-gradient-to-t from-black/60`) and a color tint matching brand.
- **Spacing:** Use intentional, consistent spacing tokens — not random Tailwind steps.
- **Depth:** Surfaces should have a layering system (base → elevated → floating), not flat cards.

---

## Hard Rules
- Do not add sections, features, or content not in the reference or brief.
- Do not "improve" a reference design — match it.
- Do not stop after one screenshot pass.
- Do not use `transition-all`.
- Do not use default Tailwind blue/indigo as primary color.
- Do not include therapeutic claims, even subtle ones.
- Do not hallucinate customer reviews — use placeholders like "Maria S., Goiânia - GO".
- Always include the ANVISA disclaimer in the footer.
