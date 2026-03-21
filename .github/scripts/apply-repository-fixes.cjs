#!/usr/bin/env node
/**
 * Apply repository-specific fixes after syncing from source
 * This file is deployed and customized per repository by run_phase1_sync.py
 */

const fs = require('fs');
const path = require('path');

// Repository-specific fixes will be injected here by run_phase1_sync.py
const fixes = {
  "sidebars.js": [
    {
      "type": "replace",
      "find": "          type: 'category',\n          label: 'Temporal Cloud',\n          collapsed: true,\n          link: {\n            type: 'doc',\n            id: 'evaluate/temporal-cloud/overview',",
      "replace": "          type: 'category',\n          label: 'Temporal Cloud',\n          key: 'EvaluateTemporalCloud',\n          collapsed: true,\n          link: {\n            type: 'doc',\n            id: 'evaluate/temporal-cloud/overview',",
      "comment": "Two 'Temporal Cloud' categories exist (evaluate and cloud sections), causing duplicate translation keys. Add unique key to evaluate section."
    },
    {
      "type": "replace",
      "find": "      type: 'category',\n      label: 'Temporal Cloud',\n      collapsed: true,\n      link: {\n        type: 'doc',\n        id: 'cloud/index',",
      "replace": "      type: 'category',\n      label: 'Temporal Cloud',\n      key: 'CloudTemporalCloud',\n      collapsed: true,\n      link: {\n        type: 'doc',\n        id: 'cloud/index',",
      "comment": "Two 'Temporal Cloud' categories exist (evaluate and cloud sections), causing duplicate translation keys. Add unique key to cloud section."
    },
    {
      "type": "replace",
      "find": "              type: 'category',\n              label: 'Integrations',\n              collapsed: true,\n              link: {\n                type: 'doc',\n                id: 'develop/python/integrations/index',",
      "replace": "              type: 'category',\n              label: 'Integrations',\n              key: 'PythonIntegrations',\n              collapsed: true,\n              link: {\n                type: 'doc',\n                id: 'develop/python/integrations/index',",
      "comment": "Two 'Integrations' categories exist (Python and TypeScript SDK sections), causing duplicate translation keys. Add unique key to Python section."
    },
    {
      "type": "replace",
      "find": "              type: 'category',\n              label: 'Integrations',\n              collapsed: true,\n              link: {\n                type: 'doc',\n                id: 'develop/typescript/integrations/index',",
      "replace": "              type: 'category',\n              label: 'Integrations',\n              key: 'TypeScriptIntegrations',\n              collapsed: true,\n              link: {\n                type: 'doc',\n                id: 'develop/typescript/integrations/index',",
      "comment": "Two 'Integrations' categories exist (Python and TypeScript SDK sections), causing duplicate translation keys. Add unique key to TypeScript section."
    },
    {
      "type": "replace",
      "find": "          label: 'Temporal Nexus',\n          collapsed: true,\n          link: {\n            type: 'doc',\n            id: 'cloud/nexus/index',",
      "replace": "          label: 'Temporal Nexus',\n          key: 'CloudTemporalNexus',\n          collapsed: true,\n          link: {\n            type: 'doc',\n            id: 'cloud/nexus/index',",
      "comment": "Two 'Temporal Nexus' categories exist (cloud and encyclopedia sections), causing duplicate translation keys. Add unique key to cloud section."
    },
    {
      "type": "replace",
      "find": "          label: 'Temporal Nexus',\n          collapsed: true,\n          link: {\n            type: 'doc',\n            id: 'encyclopedia/nexus',",
      "replace": "          label: 'Temporal Nexus',\n          key: 'EncyclopediaTemporalNexus',\n          collapsed: true,\n          link: {\n            type: 'doc',\n            id: 'encyclopedia/nexus',",
      "comment": "Two 'Temporal Nexus' categories exist (cloud and encyclopedia sections), causing duplicate translation keys. Add unique key to encyclopedia section."
    }
  ]
};
const newFiles = {};

function applyFixes() {
  console.log('Applying repository-specific fixes...');

  // Apply file modifications
  for (const [filePath, operations] of Object.entries(fixes)) {
    if (!fs.existsSync(filePath)) {
      console.log(`  ⚠️ File not found: ${filePath}`);
      continue;
    }

    console.log(`  Fixing ${filePath}...`);
    let content = fs.readFileSync(filePath, 'utf8');
    let modified = false;

    for (const op of operations) {
      switch (op.type) {
        case 'replace':
          if (content.includes(op.find)) {
            // Handle special case of replacing with empty string (deletion)
            const replacement = op.replace || '';
            // Use split/join for literal string replacement
            content = content.split(op.find).join(replacement);
            modified = true;
            console.log(`    ✓ Replaced pattern${op.comment ? ': ' + op.comment : ''}`);
          }
          break;

        case 'delete_lines':
          const lines = content.split('\n');
          lines.splice(op.startLine - 1, op.endLine - op.startLine + 1);
          content = lines.join('\n');
          modified = true;
          console.log(`    ✓ Deleted lines ${op.startLine}-${op.endLine}${op.comment ? ': ' + op.comment : ''}`);
          break;

        case 'insert_after_line':
          const insertLines = content.split('\n');
          insertLines.splice(op.line, 0, op.content);
          content = insertLines.join('\n');
          modified = true;
          console.log(`    ✓ Inserted content after line ${op.line}${op.comment ? ': ' + op.comment : ''}`);
          break;

        case 'delete_file':
          fs.unlinkSync(filePath);
          console.log(`    ✓ Deleted file${op.comment ? ': ' + op.comment : ''}`);
          modified = false; // Mark as not modified to skip write
          break; // Continue to next file instead of returning
      }
    }

    if (modified) {
      fs.writeFileSync(filePath, content, 'utf8');
      console.log(`    ✓ File updated`);
    }
  }

  // Create new files
  for (const [filePath, fileConfig] of Object.entries(newFiles)) {
    const dir = path.dirname(filePath);
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir, { recursive: true });
    }
    const fileContent = typeof fileConfig === 'string' ? fileConfig : fileConfig.content;
    fs.writeFileSync(filePath, fileContent, 'utf8');
    console.log(`  ✓ Created ${filePath}${fileConfig.comment ? ': ' + fileConfig.comment : ''}`);
  }

  console.log('Repository-specific fixes applied successfully.');
}

// Main execution
try {
  if (Object.keys(fixes).length === 0 && Object.keys(newFiles).length === 0) {
    console.log('No repository-specific fixes to apply.');
    process.exit(0);
  }

  applyFixes();
  process.exit(0);
} catch (error) {
  console.error('Error applying fixes:', error);
  console.error(error.stack);
  process.exit(1);
}
