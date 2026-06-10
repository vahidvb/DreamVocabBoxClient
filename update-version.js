const fs = require("fs");
const path = require("path");

const { version } = require("./package.json");

const swFile = path.join(__dirname, "public/service-worker.js");

// ==========================
// 2️⃣ Rewrite cache lines in SW
// ==========================

let swContent = fs.readFileSync(swFile, "utf8");

swContent = swContent.replace(
  /const\s+APP_VERSION\s*=\s*["'`].*?["'`];?/,
  `const APP_VERSION = "${version}";`
);

// بازنویسی فایل
fs.writeFileSync(swFile, swContent);

console.log("✔ service-worker.js cache names updated to version:", version);
console.log("🎉 Done!");
