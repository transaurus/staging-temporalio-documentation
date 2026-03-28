#!/usr/bin/env bash
set -euo pipefail

# Rebuild script for temporalio/documentation
# Runs on existing source tree (no clone). Installs deps, runs pre-build steps, builds.

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"

echo "[INFO] Node version: $(node -v)"
echo "[INFO] npm version: $(npm -v)"

# --- Ensure Yarn is available (repo uses yarn.lock v1 / classic) ---
if ! command -v yarn &> /dev/null; then
    echo "[INFO] Installing yarn..."
    npm install -g yarn
fi
echo "[INFO] Yarn version: $(yarn --version)"

# --- Install dependencies ---
echo "[INFO] Installing dependencies..."
yarn install --frozen-lockfile 2>/dev/null || yarn install

# --- Pre-build: sync ai-cookbook (must exist before build) ---
echo "[INFO] Running prebuild (sync ai-cookbook)..."
node ./bin/sync-ai-cookbook.js || true

if [ ! -d "ai-cookbook" ]; then
    echo "[INFO] Creating placeholder ai-cookbook directory..."
    mkdir -p ai-cookbook
    echo "# AI Cookbook" > ai-cookbook/index.md
fi

# --- Apply fixes.json if present ---
FIXES_JSON="$SCRIPT_DIR/fixes.json"
if [ -f "$FIXES_JSON" ]; then
    echo "[INFO] Applying content fixes..."
    node -e "
    const fs = require('fs');
    const path = require('path');
    const fixes = JSON.parse(fs.readFileSync('$FIXES_JSON', 'utf8'));
    for (const [file, ops] of Object.entries(fixes.fixes || {})) {
        if (!fs.existsSync(file)) { console.log('  skip (not found):', file); continue; }
        let content = fs.readFileSync(file, 'utf8');
        for (const op of ops) {
            if (op.type === 'replace' && content.includes(op.find)) {
                content = content.split(op.find).join(op.replace || '');
                console.log('  fixed:', file, '-', op.comment || '');
            }
        }
        fs.writeFileSync(file, content);
    }
    for (const [file, cfg] of Object.entries(fixes.newFiles || {})) {
        const c = typeof cfg === 'string' ? cfg : cfg.content;
        fs.mkdirSync(path.dirname(file), {recursive: true});
        fs.writeFileSync(file, c);
        console.log('  created:', file);
    }
    "
fi

# --- Build ---
echo "[INFO] Running build..."
yarn build 2>/dev/null || npx docusaurus build

echo "[DONE] Build complete."
