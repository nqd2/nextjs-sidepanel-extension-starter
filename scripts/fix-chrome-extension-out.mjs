#!/usr/bin/env node
/**
 * Chrome extensions reject files/dirs whose names start with "_".
 * Next.js static export emits _next/, _not-found/, __next.*.txt, etc.
 * Run after `next build` (see package.json "build" script).
 */
import fs from "node:fs";
import path from "node:path";

const OUT = path.resolve("out");

if (!fs.existsSync(OUT)) {
  console.error("fix-chrome-extension-out: out/ not found — run next build first");
  process.exit(1);
}

const TEXT_FILE = /\.(html|js|css|json|txt|map|rsc)$/i;

/** @param {string} dir */
function walk(dir, onEntry) {
  for (const name of fs.readdirSync(dir)) {
    const full = path.join(dir, name);
    const stat = fs.statSync(full);
    onEntry(full, name, stat);
    if (stat.isDirectory()) walk(full, onEntry);
  }
}

// 1. _next → next (main asset tree)
const legacyNext = path.join(OUT, "_next");
const assetDir = path.join(OUT, "next");
if (fs.existsSync(legacyNext)) {
  if (fs.existsSync(assetDir)) fs.rmSync(assetDir, { recursive: true, force: true });
  fs.renameSync(legacyNext, assetDir);
}

// 2. Remove RSC / not-found artifacts (not used in side panel; names start with "_")
const DROP_NAMES = new Set([
  "_not-found",
  "_not-found.html",
  "_not-found.txt",
  "index.txt",
]);
for (const name of fs.readdirSync(OUT)) {
  if (DROP_NAMES.has(name) || name.startsWith("__next")) {
    fs.rmSync(path.join(OUT, name), { recursive: true, force: true });
  }
}

// 3. Rename any remaining "_" / "__" files and dirs (deepest paths first)
/** @type {string[]} */
const underscorePaths = [];
walk(OUT, (full, name) => {
  if (name.startsWith("_")) underscorePaths.push(full);
});
underscorePaths.sort((a, b) => b.length - a.length);

for (const full of underscorePaths) {
  if (!fs.existsSync(full)) continue;
  const parent = path.dirname(full);
  const name = path.basename(full);
  const stripped = name.replace(/^_+/, "") || "manifest";
  const target = path.join(parent, stripped);
  if (full === target) continue;
  if (fs.existsSync(target)) fs.rmSync(target, { recursive: true, force: true });
  fs.renameSync(full, target);
}

// 4. Rewrite asset paths in shipped files
/** @param {string} content */
function patchContent(content) {
  return (
    content
      .replace(/\.\/_next\//g, "./next/")
      .replace(/\/_next\//g, "./next/")
      .replace(/([="'(,])\/?(next\.svg|favicon\.ico|vercel\.svg|globe\.svg|window\.svg|file\.svg)/g, "$1./$2")
  );
}

walk(OUT, (full, name, stat) => {
  if (!stat.isFile() || !TEXT_FILE.test(name)) return;
  const raw = fs.readFileSync(full, "utf8");
  const patched = patchContent(raw);
  if (patched !== raw) fs.writeFileSync(full, patched);
});

console.log("fix-chrome-extension-out: renamed _next → next, stripped reserved _* paths");
