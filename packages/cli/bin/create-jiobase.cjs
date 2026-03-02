#!/usr/bin/env node

// ES5-compatible wrapper — runs on ANY Node.js version.
// Checks the version first and shows a helpful message instead of crashing.

var major = parseInt(process.versions.node.split(".")[0], 10);

if (major < 18) {
  console.error("");
  console.error("  Node.js 18 or higher is required to run create-jiobase.");
  console.error("  You are running Node.js " + process.versions.node);
  console.error("");
  if (process.platform === "win32") {
    console.error("  How to upgrade (Windows):");
    console.error("    winget install Schniz.fnm");
    console.error("    fnm install 18 && fnm use 18");
    console.error("");
    console.error("  Or download from: https://nodejs.org");
  } else {
    console.error("  How to upgrade (macOS/Linux):");
    console.error("    curl -fsSL https://fnm.vercel.app/install | bash");
    console.error("    fnm install 18 && fnm use 18");
    console.error("");
    console.error("  Or download from: https://nodejs.org");
  }
  console.error("");
  process.exit(1);
}

// Node 18+ — safe to use dynamic import for ESM
// Use file:// URL for cross-platform compatibility (Windows backslash paths)
var path = require("path");
var url = require("url");
var target = path.resolve(__dirname, "..", "dist", "index.js");

import(url.pathToFileURL(target).href).catch(function (err) {
  console.error("Failed to start create-jiobase:", err.message || err);
  process.exit(1);
});
