#!/usr/bin/env node

/**
 * AGS Design & Visual Studio Harness Unified CLI (v1.6.0)
 */

import {
    lintUI,
    expandPrompt,
    generateDesignMD,
    generateProductMD,
    listThemes,
    listDomains,
    listComponents,
    listLintRules,
    listDesignCommands,
    getDesignCommand,
    scaffoldLandingPage,
    fetchRemoteRules,
    fixUI,
    checkVietnameseFontSupport,
    formatForPlatform,
    exportTypographyAsset,
    CAPCUT_VN_TYPOGRAPHY_PRESETS
} from '../index.js';
import fs from 'fs';
import path from 'path';

const args = process.argv.slice(2);
const command = args[0];

function printHelp() {
    console.log(`
🎨 AGS Design & Visual Studio Harness CLI v1.6.0 — Deterministic UI/UX Design System & Anti-Slop Harness

Usage:
  npx vibe-design-harness <command> [options]

Commands:
  lint <file> [--fix] [--scope <scope>]  Audit HTML/JSX for 30+ AI-slop rules (scopes: all|color|layout|type|motion|copy|slop)
  rules [--scope <scope>]                List all 30+ deterministic detector rules
  command [name]                         Get AGS Studio-grade post-processing playbook (audit, critique, polish, distill, bolder, quieter, delight, harden, animate, clarify, adapt, overdrive)
  init-context [theme] [--name <brand>]  Generate paired PRODUCT.md + DESIGN.md in current directory
  scaffold <theme> [output] [--framework react|html] Assemble studio-grade zero-slop UI (HTML or React TSX)
  expand <prompt> [domain]               Generate studio-grade camera physics visual prompts
  design-system <theme> [accent]         Generate DESIGN.md brand tokens for AI agents
  themes                                 List all 14 supported design themes
  domains                                List all 30+ visual prompt domains
  components                             List curated Pro component blocks

Options:
  --remote                               Fetch latest remote ban rules when linting
  --fix                                  Auto-fix detectable AI-slop defects in file
  --scope <scope>                        Filter lint rules by scope (color, layout, type, motion, copy, slop)
  --framework react                      Export scaffold as React / TSX Tailwind component

Examples:
  npx vibe-design-harness lint src/App.html --fix
  npx vibe-design-harness command polish
  npx vibe-design-harness init-context apple_luxury --name "ViecLamRemote"
  npx vibe-design-harness scaffold luxury_editorial page.tsx --framework react
`);
}

async function main() {
    if (!command || command === 'help' || command === '--help') {
        printHelp();
        process.exit(0);
    }

    if (command === 'lint') {
        const target = args[1];
        if (!target) {
            console.error('❌ Error: Please specify a file path or HTML string to lint.');
            process.exit(1);
        }

        const shouldFix = args.includes('--fix');
        if (shouldFix && fs.existsSync(target)) {
            const rawContent = fs.readFileSync(target, 'utf-8');
            const fixRes = fixUI(rawContent);
            if (fixRes.changed) {
                fs.writeFileSync(target, fixRes.fixedContent, 'utf-8');
                console.log(`✨ AUTO-FIX: Remediated ${fixRes.fixCount} AI-slop patterns in ${target}`);
            }
        }

        const scopeIdx = args.indexOf('--scope');
        const scope = scopeIdx !== -1 ? args[scopeIdx + 1] : 'all';
        const useRemote = args.includes('--remote');
        let options = { scope };

        if (useRemote) {
            console.log('🔄 Fetching remote aesthetic rules...');
            const remoteRules = await fetchRemoteRules();
            if (remoteRules && remoteRules.banned_classes) {
                options.banned_patterns = remoteRules.banned_classes;
            }
        }

        const result = lintUI(target, options);
        console.log(`\n🔍 Linting: ${result.file} (scope: ${result.scope})`);
        if (result.passed) {
            console.log('✅ PASSED: Zero AI-slop violations found. Aesthetic grade: Studio-Quality.');
            if (result.warnings && result.warnings.length > 0) {
                result.warnings.forEach(w => console.warn(`   ${w}`));
            }
            process.exit(0);
        } else {
            console.error(`❌ FAILED: Found ${result.violation_count} design anti-pattern violations:`);
            result.errors.forEach(e => console.error(`   ${e}`));
            process.exit(1);
        }
    }

    if (command === 'rules') {
        const scopeIdx = args.indexOf('--scope');
        const scope = scopeIdx !== -1 ? args[scopeIdx + 1] : 'all';
        console.log(`\n🛡️ Deterministic Anti-Slop Detector Rules (scope: ${scope}):`);
        console.table(listLintRules(scope));
        process.exit(0);
    }

    if (command === 'command' || command === 'commands') {
        const sub = args[1];
        if (!sub || sub === 'list') {
            console.log('\n🎯 Available Post-Processing Design Commands (12 Flows):');
            console.table(listDesignCommands());
            process.exit(0);
        }
        const playbook = getDesignCommand(sub);
        console.log(`\n# 🎯 Design Command: /${playbook.name} (${playbook.category.toUpperCase()})`);
        console.log(`${playbook.summary}\n`);
        console.log('## Execution Checklist:');
        playbook.checklist.forEach((item, i) => console.log(`  ${i + 1}. ${item}`));
        console.log(`\n## Agent Directive:\n  ${playbook.directive}\n`);
        process.exit(0);
    }

    if (command === 'init-context') {
        const theme = (args[1] && !args[1].startsWith('--')) ? args[1] : 'linear';
        const nameIdx = args.indexOf('--name');
        const name = nameIdx !== -1 ? args[nameIdx + 1] : 'Project';
        const designMd = generateDesignMD(theme);
        const productMd = generateProductMD({ name });
        const designPath = path.resolve(process.cwd(), 'DESIGN.md');
        const productPath = path.resolve(process.cwd(), 'PRODUCT.md');
        fs.writeFileSync(designPath, designMd, 'utf-8');
        fs.writeFileSync(productPath, productMd, 'utf-8');
        console.log(`✅ Initialized paired design context:`);
        console.log(`   - ${productPath}`);
        console.log(`   - ${designPath} (theme: ${theme})`);
        process.exit(0);
    }

    if (command === 'scaffold') {
        const theme = args[1] || 'linear';
        const outputFile = args[2] && !args[2].startsWith('--') ? args[2] : null;
        const framework = args.includes('--framework') ? args[args.indexOf('--framework') + 1] : 'html';

        const result = scaffoldLandingPage({ theme, framework });
        if (outputFile) {
            const resolvedPath = path.resolve(process.cwd(), outputFile);
            fs.writeFileSync(resolvedPath, result.code, 'utf-8');
            console.log(`🎉 Assembled studio-grade ${result.theme} (${framework}) -> ${outputFile}`);
        } else {
            console.log(result.code);
        }
        process.exit(0);
    }

    if (command === 'expand') {
        const prompt = args[1];
        const domain = args[2] || 'photorealism';
        if (!prompt) {
            console.error('❌ Error: Please specify a prompt to expand.');
            process.exit(1);
        }
        const result = expandPrompt(prompt, domain);
        console.log('\n--- 📸 UNIVERSAL IMAGE PROMPT EXPANSION ---');
        console.log(`Domain: ${result.domain_name} (${result.domain})`);
        console.log(`\nPositive Prompt:\n${result.positive_prompt}`);
        console.log(`\n2026 Studio Brief (Nano Banana Pro / GPT-Image-2 / CapCut VN Guard):\n${result.studio_brief}`);
        console.log(`\nNegative Constraints:\n${result.negative_prompt}`);
        console.log('\n--- 💡 Recommended Parameters ---');
        console.log(JSON.stringify(result.recommended_parameters, null, 2));
        process.exit(0);
    }

    if (command === 'design-system') {
        const theme = args[1] || 'linear';
        const accent = args[2] || null;
        const doc = generateDesignMD(theme, accent);
        console.log(doc);
        process.exit(0);
    }

    if (command === 'themes') {
        console.log('\n🎨 Supported Design Themes:');
        console.table(listThemes());
        process.exit(0);
    }

    if (command === 'domains') {
        console.log('\n📸 Supported Visual Prompt Domains (30+ Domains):');
        console.table(listDomains());
        process.exit(0);
    }

    if (command === 'export-typography') {
        const presetIdx = args.indexOf('--preset');
        const preset = presetIdx !== -1 ? args[presetIdx + 1] : (args[1] && !args[1].startsWith('--') ? args[1] : 'editorial_luxury');
        const titleIdx = args.indexOf('--title');
        const title = titleIdx !== -1 ? args[titleIdx + 1] : 'Hệ Thống AI Agent Tự Động Hóa';
        const subIdx = args.indexOf('--subtitle');
        const subtitle = subIdx !== -1 ? args[subIdx + 1] : 'Chuẩn hóa thiết kế & vận hành 24/7 cho doanh nghiệp';
        const badgeIdx = args.indexOf('--badge');
        const badge = badgeIdx !== -1 ? args[badgeIdx + 1] : 'AGS STUDIO';
        const outIdx = args.indexOf('--out');
        const outputDir = outIdx !== -1 ? args[outIdx + 1] : process.cwd();
        const exported = exportTypographyAsset({ preset, title, subtitle, badge, outputDir });
        console.log(`\n✨ Exported CapCut / Figma Vietnamese Typography Asset (preset: ${exported.preset})`);
        console.log(`   SVG Overlay : ${exported.svg_path}`);
        console.log(`   JSON Config : ${exported.json_path}`);
        process.exit(0);
    }

    if (command === 'check-font') {
        const fontName = args.slice(1).join(' ') || 'Be Vietnam Pro';
        console.log('\n🔤 Vietnamese Font Support Check (U+0102–U+1EF9):');
        console.log(JSON.stringify(checkVietnameseFontSupport(fontName), null, 2));
        process.exit(0);
    }

    if (command === 'format') {
        const promptText = args[1] || '';
        const platIdx = args.indexOf('--platform');
        const platform = platIdx !== -1 ? args[platIdx + 1] : 'nano_banana_pro';
        console.log(JSON.stringify(formatForPlatform(promptText, platform), null, 2));
        process.exit(0);
    }

    if (command === 'components') {
        console.log('\n🧱 Curated Pro Component Blocks:');
        console.table(listComponents());
        process.exit(0);
    }

    console.error(`❌ Unknown command: ${command}`);
    printHelp();
    process.exit(1);
}

main().catch(err => {
    console.error('CLI Fatal Error:', err);
    process.exit(1);
});
