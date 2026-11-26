
import sharp from "sharp";
import path from "node:path";
import { mkdir } from "node:fs/promises";

const root = process.cwd();

const source = path.join(
  root,
  "src",
  "app",
  "icon.svg"
);

const brandDirectory = path.join(
  root,
  "public",
  "images",
  "brand"
);

await mkdir(brandDirectory, {
  recursive: true,
});

const icons = [
  {
    size: 180,
    output: path.join(
      root,
      "src",
      "app",
      "apple-icon.png"
    ),
  },
  {
    size: 192,
    output: path.join(
      brandDirectory,
      "icon-192.png"
    ),
  },
  {
    size: 512,
    output: path.join(
      brandDirectory,
      "icon-512.png"
    ),
  },
  {
    size: 48,
    output: path.join(
      brandDirectory,
      "favicon-48.png"
    ),
  },
];

console.log("\nGenerating brand icons...\n");

for (const icon of icons) {
  await sharp(source)
    .resize(icon.size, icon.size)
    .png({
      compressionLevel: 9,
    })
    .toFile(icon.output);

  console.log(
    `✓ ${path.relative(root, icon.output)}`
  );
}

console.log("\nAll brand icons generated successfully.");
