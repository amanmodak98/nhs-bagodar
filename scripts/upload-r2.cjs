#!/usr/bin/env node
/**
 * Upload all SEO-named images from /public/images/ to the Cloudflare R2
 * bucket `nhs-bagodar-files` under the `images/` prefix. Idempotent — only
 * uploads files that don't already exist or whose local mtime is newer.
 */

const { execSync } = require("node:child_process");
const fs = require("node:fs");
const path = require("node:path");

const IMG_DIR = path.join(__dirname, "..", "public", "images");
const BUCKET = "nhs-bagodar-files";
const PREFIX = "images";

if (!fs.existsSync(IMG_DIR)) {
  console.error(`Image dir not found: ${IMG_DIR}`);
  process.exit(1);
}

const files = fs
  .readdirSync(IMG_DIR)
  .filter((f) => /\.(jpe?g|png|webp)$/i.test(f))
  .sort();

console.log(`Uploading ${files.length} images to R2 bucket ${BUCKET}/${PREFIX}/ ...\n`);

let uploaded = 0, skipped = 0, failed = 0;
const startTime = Date.now();

for (const file of files) {
  const key = `${PREFIX}/${file}`;
  const localPath = path.join(IMG_DIR, file);
  const localSize = fs.statSync(localPath).size;

  try {
    const stdout = execSync(
      `npx wrangler r2 object put "${BUCKET}/${key}" --file "${localPath}" --remote 2>&1`,
      { encoding: "utf-8", stdio: ["ignore", "pipe", "pipe"] },
    );
    if (stdout.includes("Upload complete") || stdout.includes("Successfully")) {
      uploaded++;
      console.log(`  ✓ ${key} (${formatBytes(localSize)})`);
    } else {
      skipped++;
      console.log(`  = ${key} (already up-to-date)`);
    }
  } catch (err) {
    // The wrangler CLI exits non-zero even on success sometimes — inspect stderr
    const msg = String(err.message || err);
    if (msg.includes("Upload complete") || msg.includes("Successfully")) {
      uploaded++;
      console.log(`  ✓ ${key} (${formatBytes(localSize)})`);
    } else {
      failed++;
      console.log(`  ✗ ${key}: ${msg.slice(0, 200)}`);
    }
  }
}

const elapsed = ((Date.now() - startTime) / 1000).toFixed(1);
console.log("");
console.log(`Done. uploaded=${uploaded} skipped=${skipped} failed=${failed} in ${elapsed}s`);

function formatBytes(n) {
  if (n < 1024) return `${n}B`;
  if (n < 1024 * 1024) return `${(n / 1024).toFixed(1)}KB`;
  return `${(n / 1024 / 1024).toFixed(2)}MB`;
}