
import sharp from "sharp";
import fs from "node:fs/promises";
import path from "node:path";

const root = path.resolve("public");

let converted = 0;
let failed = 0;

async function convertImages(directory) {
  const entries = await fs.readdir(directory, {
    withFileTypes: true,
  });

  for (const entry of entries) {
    const filePath = path.join(directory, entry.name);

    if (entry.isDirectory()) {
      await convertImages(filePath);
      continue;
    }

    if (!/\.jfif$/i.test(entry.name)) {
      continue;
    }

    const outputPath = filePath.replace(/\.jfif$/i, ".webp");

    try {
      const source = await fs.readFile(filePath);

      const sourceMetadata = await sharp(source).metadata();
      const { data: webp, info } = await sharp(source)
        .webp({ quality: 95, effort: 6 })
        .toBuffer({ resolveWithObject: true });

      if (
        info.width !== sourceMetadata.width ||
        info.height !== sourceMetadata.height
      ) {
        throw new Error(
          `Dimensions changed from ${sourceMetadata.width}x${sourceMetadata.height} to ${info.width}x${info.height}`
        );
      }

      await fs.writeFile(outputPath, webp);

      console.log(
        `Converted: ${path.relative(root, outputPath)}`
      );

      converted++;
    } catch (error) {
      console.error(`Failed: ${filePath}`, error.message);
      failed++;
    }
  }
}

await convertImages(root);

console.log("\nConversion complete");
console.log(`Converted: ${converted}`);
console.log(`Failed: ${failed}`);

if (failed > 0) {
  process.exitCode = 1;
}
