const fs = require("fs");
const path = require("path");
const { execSync } = require("child_process");

// this .mjs file is actually the CommonJS build output generated by tsc
// so we simply rename it
const sourcePath = path.posix.join(__dirname, "../dist/promise.mjs");
const targetPath = path.posix.join(__dirname, "../dist/promise.cjs");

execSync(
  "npx tsc promise.mjs --module commonjs --target esnext --allowJs --outDir dist",
  { stdio: "inherit" }
);

if (!fs.existsSync(sourcePath)) {
  throw new Error("[ERR] build failed");
}

fs.renameSync(sourcePath, targetPath);