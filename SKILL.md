---
name: ags-design-harness
description: "Use when designing UI/UX, frontend, landing pages, web apps, or generating studio images and Vietnamese typography overlays. Enforces the AGS 30-Gate Anti-Slop UI Linter, 5-Platform Studio Image Compiler (Nano Banana Pro, GPT-Image-2, Seedance 2.5, Midjourney V7, FLUX), Vietnamese Font Glyph Checker, and CapCut SVG/JSON Asset Exporter."
---

# AGS Design & Visual Studio Harness (v2.0.0)

> **Engine:** AGS Design System · 30-Gate Deterministic UI Linter · 5-Platform Studio Image Compiler · CapCut Vietnamese Typography Engine.

## 1. Visual & Image Generation Workflow (5-Platform Studio Harness)

Before sending any prompt to an image model (`ag/gemini-3.1-flash-image`, `cx/gpt-image-2`, Midjourney V7, Seedance 2.5, or FLUX):

1. **Compile with 7-Part Studio Brief (`compileStudioImagePrompt` / MCP `compile_studio_brief`)**:
   - Strips AI-slop keywords (`8k render`, `Dribbble`, `Behance`, raw `#HEX` codes, inline CSS `34pt` specs, `#1/#2` list numbers).
   - Infers true aspect ratio (`9:16`, `16:9`, `4:5`, `3:4`, `1:1`) from natural Vietnamese or English cues.
   - Injects physical Camera + Lens + Lighting + Color Science DNA.
   - Enforces the **CapCut Vietnamese Typography Guard**: locks only quoted/intended headlines and converts secondary micro-copy (<14pt) into clean abstract skeleton bars.
2. **Verify Vietnamese Fonts (`checkVietnameseFontSupport` / CLI `check-font`)**:
   - Never use blacklisted Latin-only display fonts (`Impact`, `Bebas Neue`, `Futura`, `Monument`) for Vietnamese copy.
   - Use verified 134/134 Vietnamese-glyph presets (`get_capcut_preset`) or export transparent SVG + JSON layers via `exportTypographyAsset`.

## 2. Frontend & UI/UX Anti-Slop Workflow (30-Gate Linter)

1. **Initialize Brand Context**:
   ```bash
   npx ags-design-harness init-context ags_editorial --name "AgentSea"
   ```
2. **Audit & Auto-Fix Every UI File Before Delivery**:
   ```bash
   npx ags-design-harness lint <file.html|file.tsx> --fix
   ```
3. **12 Post-Processing Design Flows**:
   ```bash
   npx ags-design-harness command <audit|critique|polish|distill|bolder|quieter|delight|harden|clarify|adapt|colorize|animate>
   ```
