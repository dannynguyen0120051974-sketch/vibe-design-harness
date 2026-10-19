# AGS Design & Visual Studio Harness (v2.0.0)

[![Version](https://img.shields.io/badge/version-2.0.0-10b981.svg)](#)
[![Engine](https://img.shields.io/badge/Engine-AGS_Studio_2026-0e1116.svg)](#)
[![Pure JavaScript](https://img.shields.io/badge/Pure_JS-Zero_Dependencies-f59e0b.svg)](#)
[![Vietnamese Diacritics](https://img.shields.io/badge/Vietnamese_Glyphs-134%2F134_Verified-1f6f3d.svg)](#)

> **Industrial-Grade UI/UX Anti-Slop Linter (<1ms) + 5-Platform Visual Prompt Compiler + CapCut Vietnamese Typography Engine for AI Agents.**  
> Built by **AGS (AgentSea Design System)** for Claude Code, Cursor, Codex, and Hermes Agents.

---

## 🏛️ Architecture Overview

```
┌─────────────────────────────────────────────────────────────────────────────┐
│                   AGS DESIGN & VISUAL STUDIO HARNESS v2.0                   │
├───────────────────────────┬───────────────────────────┬─────────────────────┤
│   1. UI/UX Anti-Slop      │  2. 5-Engine Studio       │  3. CapCut VN       │
│      Linter (<1ms)        │     Prompt Compiler       │     Typography      │
├───────────────────────────┼───────────────────────────┼─────────────────────┤
│ • 30+ Deterministic Gates │ • Nano Banana Pro (2.1)   │ • 38 CapCut Fonts   │
│ • Scoped Audits & AutoFix │ • OpenAI GPT-Image-2      │ • U+0102–U+1EF9     │
│ • 15 Brand Token Themes   │ • ByteDance Seedance 2.5  │   Glyph Checker     │
│ • 12 Post-Process Flows   │ • Midjourney V7 (--style) │ • Transparent SVG + │
│ • Paired DESIGN/PRODUCT   │ • FLUX.1 Pro / SDXL       │   CapCut JSON Export│
└───────────────────────────┴───────────────────────────┴─────────────────────┘
```

---

## 🚀 Key Capabilities (v2.0.0)

| Module | Capability | Output / Guarantee |
| :--- | :--- | :--- |
| **Studio Brief Compiler** | `compileStudioImagePrompt()` | Converts natural Vietnamese or English into a 7-part Art Director Brief (`Canvas`, `@Image Lock`, `Subject`, `15% Margin Framing`, `Camera/Lens Optics`, `Verbatim Vietnamese Text Guard`, `Anti-Slop Exclusions`). |
| **5 Platform Adapters** | `toNanoBananaFormat()`, `toOpenAIFormat()`, `toMidjourneyFormat()`, `toFluxFormat()`, `toSeedanceFormat()` | Formats prompts and negative constraints natively per model (`--ar --v 7 --no` for Midjourney; `negative_prompt` for FLUX; contextual natural exclusions for GPT-Image-2 & Gemini Image). |
| **Vietnamese Glyph Checker** | `checkVietnameseFontSupport()` | Audits fonts against the 134 Vietnamese stacked diacritics (`U+0102–U+1EF9`), blocks broken Latin-only display fonts (`Impact`, `Bebas Neue`, `Futura`, `Monument`), and maps them to verified CapCut/AGS equivalents. |
| **CapCut Asset Exporter** | `exportTypographyAsset()` | Exports drag-and-drop transparent **SVG typography layers** + **CapCut/Figma JSON specs** with 1.35 line-height diacritic clearance, frosted scrims, and emerald pill badges. |
| **30-Gate UI Linter** | `lintUI()` & `fixUI()` | Sub-millisecond AST/regex audit blocking purple AI gradients, banned fonts, nested cards, toy-box logos, and aphoristic AI copy. |

---

## ⚡ CLI Reference

```bash
# 1. Compile & format a natural Vietnamese prompt for a specific platform
npx ags-design-harness format "Poster dọc du lịch đảo Phú Quý hoàng hôn, chữ: Khám Phá Phú Quý" --platform midjourney
npx ags-design-harness format "Giao diện iPhone ứng dụng việc làm Thuyền Giấy" --platform nano_banana_pro

# 2. Verify whether a font supports all 134 Vietnamese diacritics (U+0102–U+1EF9)
npx ags-design-harness check-font "Impact"
npx ags-design-harness check-font "Be Vietnam Pro"

# 3. Export transparent SVG + CapCut/Figma JSON typography overlay
npx ags-design-harness export-typography --preset bold_impact \
  --title "Kỷ Nguyên Doanh Nghiệp 1 Người" \
  --subtitle "Tự động hóa vận hành 24/7 cùng AGS Studio" \
  --badge "AGS STUDIO 2026"

# 4. Audit & auto-fix HTML/React TSX files for 30+ AI-slop rules (<1ms)
npx ags-design-harness lint src/App.tsx --fix

# 5. Generate paired DESIGN.md + PRODUCT.md brand tokens
npx ags-design-harness init-context ags_editorial --name "AgentSea"

# 6. Scaffold a complete zero-slop landing page (HTML or React TSX)
npx ags-design-harness scaffold ags_editorial LandingPage.tsx --framework react
```

---

## 🔌 Model Context Protocol (MCP Server — 9 Tools)

Add **AGS Design Harness MCP** to Claude Desktop, Claude Code, Cursor, or Hermes Agent:

```json
{
  "mcpServers": {
    "ags-design-harness": {
      "command": "npx",
      "args": ["-y", "ags-design-harness-mcp"]
    }
  }
}
```

### Exposed MCP Tools
1. `compile_studio_brief` — Compiles natural Vietnamese/English prompts into a 7-part Studio Image Brief + platform-specific payload.
2. `get_capcut_preset` — Returns verified CapCut Vietnamese typography presets (`editorial_luxury`, `modern_clean`, `bold_impact`, `kinetic_hype`, `viral_thumbnail`, `vn_creative`, `classic_serif`, `tech_cyber`).
3. `check_vietnamese_font` — Checks font compatibility with Vietnamese extended Unicode (`U+0102–U+1EF9`) and recommends safe replacements.
4. `export_typography_asset` — Generates transparent SVG + CapCut/Figma JSON typography overlays.
5. `scaffold_landing_page` — Scaffolds complete HTML or React TSX landing pages across 15 themes.
6. `lint_ui_aesthetic` — Runs the 30-gate deterministic UI/UX anti-slop linter + optional auto-fixer.
7. `run_design_command` — Executes 12 post-processing design flows (`audit`, `critique`, `polish`, `distill`, `bolder`, `quieter`, `delight`, `harden`, `clarify`, `adapt`, `colorize`, `animate`).
8. `expand_image_prompt` — Expands prompts across 35+ camera-physics domains.
9. `generate_design_system` — Generates paired `DESIGN.md` + `PRODUCT.md` brand specifications.

---

## 📂 Repository Structure

```
ags-design-harness/
├── bin/
│   ├── cli.js                    # Unified CLI (lint, format, check-font, export-typography, scaffold)
│   └── mcp-server.js             # 9-Tool Model Context Protocol (MCP) stdio server
├── harness/
│   ├── ags_design_engine.js      # 15 Brand Themes (incl. ags_editorial) & DESIGN.md generator
│   ├── studio_image_engine.js    # 5 Platform Adapters, VN Font Checker & CapCut SVG/JSON Exporter
│   ├── prompt_expander.js        # 7-Part Studio Image Compiler & 35+ Visual Domains
│   ├── ui_linter.js              # 30-Gate Sub-Millisecond Anti-Slop UI/UX Linter & Auto-Fixer
│   ├── design_commands.js        # 12 Post-Processing Design Flows & Craft Floor
│   ├── components.js             # Curated Pro UI Component Blocks (HTML & React TSX)
│   ├── landing_assembler.js      # Full-Page Landing Page Assembler
│   └── remote_rules.json         # Syncable Anti-Slop Ban Rules
├── prompts/
│   └── prompt_bank.json          # Curated Studio Prompt Templates
├── tests/
│   └── test.js                   # 7-Suite Zero-Defect Automated Test Runner
├── index.js                      # ESM Public API Entry Point
├── SKILL.md                      # Agent Skill Specification
└── package.json                  # Package Manifest (v2.0.0)
```

---

## 📄 License
MIT © AgentSea (AGS)
