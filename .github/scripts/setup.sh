#!/bin/bash
# Generated setup script for: https://github.com/temporalio/documentation
# Docusaurus 3.8.1, Yarn v1, Node 20

set -e

REPO_URL="https://github.com/temporalio/documentation"
BRANCH="main"

log_info() { echo "[INFO] $1"; }
log_error() { echo "[ERROR] $1"; }

main() {
    log_info "Setting up: $REPO_URL"

    if [ -d "source-repo" ]; then
        rm -rf source-repo
    fi

    log_info "Cloning repository..."
    git clone --depth 1 --branch "$BRANCH" "$REPO_URL" source-repo
    cd source-repo

    log_info "Node version: $(node -v)"
    log_info "npm version: $(npm -v)"

    # Ensure Yarn is available (repo uses yarn.lock v1 / classic)
    if ! command -v yarn &> /dev/null; then
        log_info "Installing yarn..."
        npm install -g yarn
    fi
    log_info "Yarn version: $(yarn --version)"

    log_info "Installing dependencies..."
    yarn install --frozen-lockfile 2>/dev/null || yarn install

    # The prebuild script syncs the ai-cookbook docs from an external repo.
    # This directory must exist before write-translations runs or Docusaurus fails.
    log_info "Running prebuild (sync ai-cookbook)..."
    node ./bin/sync-ai-cookbook.js || true

    # If sync failed (e.g., network issue), create a minimal placeholder so Docusaurus can proceed
    if [ ! -d "ai-cookbook" ]; then
        log_info "Creating placeholder ai-cookbook directory..."
        mkdir -p ai-cookbook
        echo "# AI Cookbook" > ai-cookbook/index.md
    fi

    # Apply content fixes: sidebars.js has duplicate category labels that produce
    # conflicting translation keys. Add unique 'key' attributes to distinguish them.
    log_info "Applying content fixes to sidebars.js..."
    python3 - <<'PYEOF'
with open('sidebars.js', 'r') as f:
    content = f.read()

# Fix 1: Add unique key to first "Temporal Cloud" (in evaluate section)
content = content.replace(
    "          type: 'category',\n          label: 'Temporal Cloud',\n          collapsed: true,\n          link: {\n            type: 'doc',\n            id: 'evaluate/temporal-cloud/overview',",
    "          type: 'category',\n          label: 'Temporal Cloud',\n          key: 'EvaluateTemporalCloud',\n          collapsed: true,\n          link: {\n            type: 'doc',\n            id: 'evaluate/temporal-cloud/overview',"
)

# Fix 2: Add unique key to second "Temporal Cloud" (in cloud section)
content = content.replace(
    "      type: 'category',\n      label: 'Temporal Cloud',\n      collapsed: true,\n      link: {\n        type: 'doc',\n        id: 'cloud/index',",
    "      type: 'category',\n      label: 'Temporal Cloud',\n      key: 'CloudTemporalCloud',\n      collapsed: true,\n      link: {\n        type: 'doc',\n        id: 'cloud/index',"
)

# Fix 3: Add unique key to "Integrations" under Python SDK
content = content.replace(
    "              type: 'category',\n              label: 'Integrations',\n              collapsed: true,\n              link: {\n                type: 'doc',\n                id: 'develop/python/integrations/index',",
    "              type: 'category',\n              label: 'Integrations',\n              key: 'PythonIntegrations',\n              collapsed: true,\n              link: {\n                type: 'doc',\n                id: 'develop/python/integrations/index',"
)

# Fix 4: Add unique key to "Integrations" under TypeScript SDK
content = content.replace(
    "              type: 'category',\n              label: 'Integrations',\n              collapsed: true,\n              link: {\n                type: 'doc',\n                id: 'develop/typescript/integrations/index',",
    "              type: 'category',\n              label: 'Integrations',\n              key: 'TypeScriptIntegrations',\n              collapsed: true,\n              link: {\n                type: 'doc',\n                id: 'develop/typescript/integrations/index',"
)

# Fix 5: Add unique key to "Temporal Nexus" under cloud section
content = content.replace(
    "          label: 'Temporal Nexus',\n          collapsed: true,\n          link: {\n            type: 'doc',\n            id: 'cloud/nexus/index',",
    "          label: 'Temporal Nexus',\n          key: 'CloudTemporalNexus',\n          collapsed: true,\n          link: {\n            type: 'doc',\n            id: 'cloud/nexus/index',"
)

# Fix 6: Add unique key to "Temporal Nexus" under encyclopedia section
content = content.replace(
    "          label: 'Temporal Nexus',\n          collapsed: true,\n          link: {\n            type: 'doc',\n            id: 'encyclopedia/nexus',",
    "          label: 'Temporal Nexus',\n          key: 'EncyclopediaTemporalNexus',\n          collapsed: true,\n          link: {\n            type: 'doc',\n            id: 'encyclopedia/nexus',"
)

with open('sidebars.js', 'w') as f:
    f.write(content)

print("sidebars.js patched: added unique keys to duplicate category labels")
PYEOF

    log_info "Running write-translations..."
    yarn write-translations 2>/dev/null || npx docusaurus write-translations

    if [ -d "i18n" ]; then
        FILE_COUNT=$(find i18n -type f -name "*.json" | wc -l)
        log_info "Success! Generated $FILE_COUNT i18n JSON files."
        find i18n -type f -name "*.json" | head -20
    else
        log_error "i18n directory not found"
        exit 1
    fi
}

main "$@"
