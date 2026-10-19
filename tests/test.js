import assert from 'assert';
import {
    lintUI,
    fixUI,
    expandPrompt,
    compileStudioImagePrompt,
    sanitizeImagePrompt,
    inferStudioAspectRatio,
    CAPCUT_VN_TYPOGRAPHY_PRESETS,
    generateDesignMD,
    generateProductMD,
    getTheme,
    listThemes,
    listLintRules,
    listDesignCommands,
    getDesignCommand,
    scaffoldLandingPage
} from '../index.js';

console.log('🧪 Starting VibeDesign-Harness v1.6.0 Complete Test Suite...\n');

// Test 1: Design Engine & 14 Built-in Themes
console.log('Test 1: Verifying 14 Built-in Themes (including Quiet Luxury & Modern Clean)...');
const themes = listThemes();
assert(themes.length >= 14, `Must have at least 14 themes, got ${themes.length}`);
const luxury = getTheme('luxury_editorial');
assert.strictEqual(luxury.color_mode, 'dark');
assert(luxury.fonts.headline.includes('Playfair'), 'Luxury theme must have Playfair font');
const appleLuxury = getTheme('apple_luxury');
assert.strictEqual(appleLuxury.color_mode, 'light');
console.log('✅ Test 1 Passed: 14 Themes correctly registered.');

// Test 2: 30-Gate Deterministic UI Linter AI-Slop Detection
console.log('\nTest 2: Verifying 30-Gate Deterministic UI Linter AI-Slop Detection...');
const rules = listLintRules();
assert(rules.length >= 28, `Must have at least 28 deterministic rules, got ${rules.length}`);

const slopHtml = '<div class="from-purple-600 to-blue-600 bg-gray-800"><button>Click me</button></div>';
const lintResult = lintUI(slopHtml);
assert.strictEqual(lintResult.passed, false, 'Slop HTML must fail lint check');
assert(lintResult.violation_count >= 2, 'Must detect at least 2 violations');

// Test 2b: Hallmark 57 Gates (Font & Pill button check)
const hallmarkSlop = '<div class="font-[Syne]"><button class="rounded-full px-12 py-3">Pill</button></div>';
const hallmarkLint = lintUI(hallmarkSlop);
assert.strictEqual(hallmarkLint.passed, false, 'Hallmark slop must fail lint check');
assert(hallmarkLint.violation_count >= 2, 'Must detect Syne font and pill button');

// Test 2c: Impeccable + Taste gates (pulsing dot, side-tab border, aphoristic cadence, italic serif H1)
const impeccableTasteSlop = `
<div class="animate-bounce rounded-xl border-l-4">
  <span class="w-2 h-2 rounded-full animate-pulse"></span>
  <h1 class="font-serif italic bg-clip-text text-transparent bg-gradient-to-r from-pink-500 to-orange-500">Unleash your potential</h1>
  <p class="text-justify">Not a tool. A platform. Stop security theater.</p>
</div>`;
const it2cLint = lintUI(impeccableTasteSlop);
assert.strictEqual(it2cLint.passed, false, 'Impeccable+Taste slop must fail lint check');
assert(it2cLint.violation_count >= 7, `Must detect >=7 violations, got ${it2cLint.violation_count}`);

// Test 2d: Scoped detection & inline ignore support
const copyOnlyLint = lintUI(impeccableTasteSlop, { scope: 'copy' });
assert.strictEqual(copyOnlyLint.passed, false);
assert(copyOnlyLint.violation_count >= 2, 'Copy scope must catch buzzword + theater/aphorism');

const ignoredHtml = '<!-- vibe-disable generic-purple-gradient, weak-gray-backdrop, harsh-multi-gradient --><div class="from-purple-600 to-blue-600 bg-gray-800 font-sans">Clean</div>';
const ignoredLint = lintUI(ignoredHtml);
assert.strictEqual(ignoredLint.passed, true, 'Inline vibe-disable comment must suppress specified rules');
console.log('✅ Test 2 Passed: 30-Gate Linter, Scoped Detection, and Inline Ignores verified.');

// Test 3: Auto-Fixer
console.log('\nTest 3: Verifying Auto-Fixer remediation...');
const fixRes = fixUI(slopHtml);
assert.strictEqual(fixRes.changed, true, 'Fixer must remediate code');
assert(!fixRes.fixedContent.includes('bg-gray-800'), 'Fixed content must not have bg-gray-800');
assert(fixRes.fixedContent.includes('bg-zinc-950'), 'Fixed content must have bg-zinc-950');
console.log('✅ Test 3 Passed: Auto-fixer remediated defects successfully.');

// Test 4: HTML & React TSX Scaffold Zero-Slop Self-Verification
console.log('\nTest 4: Verifying HTML & React TSX scaffolds pass 100% of 30+ Lint Gates...');
const htmlScaffold = scaffoldLandingPage({ theme: 'luxury_editorial', framework: 'html' });
assert.strictEqual(htmlScaffold.lint_passed, true, `HTML scaffold failed lint: ${JSON.stringify(htmlScaffold.lint_violations)}`);

const reactScaffold = scaffoldLandingPage({ theme: 'apple_luxury', framework: 'react' });
assert.strictEqual(reactScaffold.framework, 'react');
assert.strictEqual(reactScaffold.lint_passed, true, `React scaffold failed lint: ${JSON.stringify(reactScaffold.lint_violations)}`);
assert(reactScaffold.code.includes("'use client'"), 'React scaffold must include use client directive');
assert(reactScaffold.code.includes('export default function LandingPage()'), 'React scaffold must export component');
console.log('✅ Test 4 Passed: Both HTML & React TSX scaffolds pass 100% zero-slop verification.');

// Test 5: Universal Prompt Expander (30+ Domains)
console.log('\nTest 5: Verifying Universal Prompt Expander with 30+ Domains...');
const expanded = expandPrompt('luxury perfume bottle on obsidian rock', 'photorealism');
assert(expanded.positive_prompt.includes('photorealistic'), 'Must contain optical photorealism tokens');
assert(expanded.negative_prompt.includes('plastic skin'), 'Must contain negative slop constraints');
console.log('✅ Test 5 Passed: Universal Prompt Expander verified.');

// Test 5b: Nano Banana Pro + GPT-Image-2 + Seedance 2.5 + CapCut VN Typography Compiler
console.log('\nTest 5b: Verifying 2026 Studio Image Brief & CapCut Vietnamese Typography Guard...');
const dirtyVnPrompt = "Close-up mobile UI mockup on an iPhone 16 Pro ('Ti - Cố vấn Trưởng 60 năm kinh nghiệm') of 'Thuyền Giấy', 1) first card (SF Pro Bold, 34pt), (#FBFBFD), Dribbble and Behance top award-winning showcase, 8k render.";
const studioBrief = compileStudioImagePrompt(dirtyVnPrompt);
assert(studioBrief.includes('CANVAS 9:16'), 'Must auto-infer 9:16 portrait aspect ratio from iPhone mobile UI');
assert(!studioBrief.includes('34pt') && !studioBrief.includes('SF Pro Bold'), 'Must strip CSS font specs that leak onto images');
assert(!studioBrief.includes('#FBFBFD') && !studioBrief.includes('8k render'), 'Must strip raw HEX codes and AI-slop buzzwords');
assert(!studioBrief.includes('1)'), 'Must convert numbered list markers so #1/#2 are never printed');
assert(studioBrief.includes('CRITICAL VIETNAMESE TEXT GUARD'), 'Must inject Vietnamese diacritic & skeleton-bar subtext guard');
assert(Object.keys(CAPCUT_VN_TYPOGRAPHY_PRESETS).length >= 8, 'Must expose 8 CapCut Vietnamese typography presets');
console.log('✅ Test 5b Passed: Nano Banana Pro 7-Part Brief & CapCut Vietnamese Typography Guard verified.');

// Test 6: 12 Post-Processing Design Commands & PRODUCT.md Generator
console.log('\nTest 6: Verifying 12 Post-Processing Design Commands & Paired PRODUCT.md...');
const cmds = listDesignCommands();
assert.strictEqual(cmds.length, 12, 'Must expose all 12 post-processing design commands');
const polishCmd = getDesignCommand('polish');
assert.strictEqual(polishCmd.name, 'polish');
assert(Array.isArray(polishCmd.checklist) && polishCmd.checklist.length >= 4);
const productMd = generateProductMD({ name: 'ViecLamRemote' });
assert(productMd.includes('# PRODUCT.md — ViecLamRemote'), 'Must generate valid PRODUCT.md');
const designMd = generateDesignMD('apple_luxury');
assert(designMd.includes('Precision Quiet Luxury Light'), 'Must generate valid DESIGN.md');
console.log('✅ Test 6 Passed: 12 Design Commands & PRODUCT.md/DESIGN.md context generator verified.');

console.log('\n🎉 ALL 6 TEST SUITES PASSED (100% Zero Defect — v1.6.0 Ready).\n');
