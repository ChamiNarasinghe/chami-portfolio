
import sharp from "sharp";
import fs from "node:fs/promises";
import path from "node:path";

const root = process.cwd();

const images = [
  {
    file: "public/images/portraits/hero-desktop.webp",
    width: 1920,
    quality: 88,
  },
  {
    file: "public/images/portraits/hero-mobile.webp",
    width: 1080,
    quality: 88,
  },
  {
    file: "public/images/portraits/about-portrait.webp",
    width: 1200,
    quality: 85,
  },
  {
    file: "public/images/portraits/contact-portrait.webp",
    width: 1200,
    quality: 85,
  },
  {
    file: "public/images/portraits/working-portrait.webp",
    width: 1200,
    quality: 85,
  },
  {
    file: "public/images/projects/aysel.webp",
    width: 1600,
    quality: 90,
  },
  {
    file: "public/images/projects/resolveflow-ai.webp",
    width: 1600,
    quality: 88,
  },
  {
    file: "public/images/projects/webhook-service.webp",
    width: 1600,
    quality: 88,
  },
  {
    file: "public/images/projects/loanpredictor-360.webp",
    width: 1600,
    quality: 88,
  },
];

let totalBefore = 0;
let totalAfter = 0;
let failed = 0;

function formatSize(bytes) {
  return `${(bytes / 1024).toFixed(2)} KB`;
}

console.log("\nStarting image optimization...\n");

for (const image of images) {
  const input = path.join(root, image.file);

  try {
    const before = (await fs.stat(input)).size;
    const source = await fs.readFile(input);

    const optimized = await sharp(source)
      .rotate()
      .resize({
        width: image.width,
        withoutEnlargement: true,
      })
      .webp({
        quality: image.quality,
        effort: 6,
      })
      .toBuffer();

    const after =
      optimized.length < before
        ? optimized.length
        : before;

    if (after < before) {
      await fs.writeFile(input, optimized);
    }

    const reduction =
      ((before - after) / before) * 100;

    totalBefore += before;
    totalAfter += after;

    console.log(
      `✓ ${path.basename(input)}`
    );

    console.log(
      `  Before: ${formatSize(before)}`
    );

    console.log(
      `  After:  ${formatSize(after)}`
    );

    console.log(
      `  Reduction: ${reduction.toFixed(1)}%${after === before ? " (already optimized)" : ""}\n`
    );
  } catch (error) {
    failed++;

    console.error(
      `✗ Failed: ${image.file}`
    );

    console.error(error.message);
  }
}

const totalReduction =
  totalBefore > 0
    ? ((totalBefore - totalAfter) /
        totalBefore) *
      100
    : 0;

console.log("================================");
console.log("OPTIMIZATION SUMMARY");
console.log("================================");

console.log(
  `Original: ${(totalBefore / 1024 / 1024).toFixed(2)} MB`
);

console.log(
  `Optimized: ${(totalAfter / 1024 / 1024).toFixed(2)} MB`
);

console.log(
  `Reduction: ${totalReduction.toFixed(1)}%`
);

console.log(`Failed: ${failed}`);

console.log(
  "\nWebP assets are only replaced when the optimized output is smaller."
);

if (failed > 0) {
  process.exitCode = 1;
}
