#!/usr/bin/env node

import { Server } from '@modelcontextprotocol/sdk/server/index.js';
import { StdioServerTransport } from '@modelcontextprotocol/sdk/server/stdio.js';
import { CallToolRequestSchema, ListToolsRequestSchema } from '@modelcontextprotocol/sdk/types.js';
import {
    lintUI,
    fixUI,
    expandPrompt,
    generateDesignMD,
    generateProductMD,
    listThemes,
    listComponents,
    listDesignCommands,
    getDesignCommand,
    scaffoldLandingPage,
    fetchRemoteRules
} from '../index.js';

const server = new Server(
    {
        name: 'vibe-design-harness-mcp',
        version: '1.6.0',
    },
    {
        capabilities: {
            tools: {},
        },
    }
);

server.setRequestHandler(ListToolsRequestSchema, async () => {
    return {
        tools: [
            {
                name: 'scaffold_landing_page',
                description: 'Assembles a complete, high-converting, zero-slop landing page (Navbar, Hero Spotlight, Bento Grid, 3-Tier Pricing, Footer) directly inside AI agent context with 30-gate auto-linting.',
                inputSchema: {
                    type: 'object',
                    properties: {
                        theme: {
                            type: 'string',
                            description: 'Design theme: minimalism, luxury_editorial, luxury_gold, apple_luxury, modern_clean, linear, stripe, vercel, airbnb, saas_modern, nordic_clean, zen_japanese, neo_brutalism, glassmorphism_dark.',
                            default: 'linear',
                        },
                        framework: {
                            type: 'string',
                            description: 'Output format: html or react (TSX)',
                            default: 'html',
                        },
                        title: { type: 'string', description: 'Web page title' },
                        brand: { type: 'string', description: 'Brand name' },
                        heroTitle: { type: 'string', description: 'Hero main headline' },
                        heroSubtitle: { type: 'string', description: 'Hero sub-headline' },
                        customAccent: { type: 'string', description: 'Custom hex accent color override (e.g. #10b981)' },
                    },
                },
            },
            {
                name: 'lint_ui_aesthetic',
                description: 'Deterministic zero-token 30-gate UI/UX aesthetic linter for HTML/JSX/Tailwind. Detects AI-slop gradients, banned fonts, pulsing dots, radial glow blobs, side-tab borders, and startup buzzwords in <1ms.',
                inputSchema: {
                    type: 'object',
                    properties: {
                        filePathOrContent: {
                            type: 'string',
                            description: 'Path to the generated HTML/JSX file OR raw code string to audit.',
                        },
                        scope: {
                            type: 'string',
                            description: 'Optional detector scope: all, color, layout, type, motion, copy, slop.',
                            default: 'all',
                        },
                        autoFix: {
                            type: 'boolean',
                            description: 'Whether to also return auto-remediated code for fixable patterns.',
                            default: false,
                        },
                        useRemoteRules: {
                            type: 'boolean',
                            description: 'Whether to fetch and apply latest remote anti-slop rules.',
                            default: false,
                        },
                    },
                    required: ['filePathOrContent'],
                },
            },
            {
                name: 'run_design_command',
                description: 'Executes one of the 12 post-processing design flows (audit, critique, polish, distill, bolder, quieter, delight, harden, animate, clarify, adapt, overdrive) and returns the structured checklist + Craft Floor.',
                inputSchema: {
                    type: 'object',
                    properties: {
                        command: {
                            type: 'string',
                            description: 'Command name: audit, critique, polish, distill, bolder, quieter, delight, harden, animate, clarify, adapt, overdrive (or "list" to list all).',
                        },
                    },
                    required: ['command'],
                },
            },
            {
                name: 'expand_image_prompt',
                description: 'Universal Multi-Model Image Prompt Engine (Midjourney v6, FLUX.1, SDXL, Imagen 3, GPT Image 2, Gemini Image). Enforces camera optics, lens physics, studio lighting, and negative constraints across 30+ domains.',
                inputSchema: {
                    type: 'object',
                    properties: {
                        prompt: {
                            type: 'string',
                            description: 'Raw image prompt concept.',
                        },
                        domain: {
                            type: 'string',
                            description: 'Visual domain: luxury_editorial, quiet_luxury, minimalism_visual, photorealism, anime, cyberpunk_anime, 3d_animation, infographic, typography_poster, carousel_ad, sales_creative, logo_branding, etc.',
                            default: 'photorealism',
                        },
                        lighting: {
                            type: 'string',
                            description: 'Optional custom lighting physics (e.g. dramatic softbox, morning golden hour, neon rim light).',
                        },
                        aspectRatio: {
                            type: 'string',
                            description: 'Optional aspect ratio (e.g. 16:9, 1:1, 9:16, 4:5).',
                        },
                    },
                    required: ['prompt'],
                },
            },
            {
                name: 'generate_brand_design_md',
                description: 'Generates paired PRODUCT.md + DESIGN.md design system tokens across 14 themes to pre-inject into coding agents.',
                inputSchema: {
                    type: 'object',
                    properties: {
                        theme: {
                            type: 'string',
                            description: 'Design theme key (e.g. luxury_editorial, apple_luxury, minimalism, linear, stripe).',
                            default: 'linear',
                        },
                        customAccent: {
                            type: 'string',
                            description: 'Optional custom hex accent color override (e.g. #10b981).',
                        },
                        productName: {
                            type: 'string',
                            description: 'Optional product name to also generate paired PRODUCT.md.',
                        },
                    },
                },
            },
            {
                name: 'list_design_themes',
                description: 'Lists all 14 available design themes and their color modes supported by the harness.',
                inputSchema: {
                    type: 'object',
                    properties: {},
                },
            },
            {
                name: 'list_curated_components',
                description: 'Lists available curated Pro component building blocks (Hero Spotlight, Bento Grid, Pricing Matrix, Navbar, Footer).',
                inputSchema: {
                    type: 'object',
                    properties: {},
                },
            },
        ],
    };
});

server.setRequestHandler(CallToolRequestSchema, async (request) => {
    const { name, arguments: args } = request;

    if (name === 'scaffold_landing_page') {
        const result = scaffoldLandingPage(args || {});
        return {
            content: [
                {
                    type: 'text',
                    text: JSON.stringify({
                        theme: result.theme,
                        framework: result.framework,
                        lint_passed: result.lint_passed,
                        code: result.code
                    }, null, 2),
                },
            ],
        };
    }

    if (name === 'lint_ui_aesthetic') {
        let options = { scope: args.scope || 'all' };
        if (args.useRemoteRules) {
            const remoteRules = await fetchRemoteRules();
            if (remoteRules && remoteRules.banned_classes) {
                options.banned_patterns = remoteRules.banned_classes;
            }
        }
        const result = lintUI(args.filePathOrContent, options);
        if (args.autoFix && typeof args.filePathOrContent === 'string') {
            result.fix = fixUI(args.filePathOrContent);
        }
        return {
            content: [
                {
                    type: 'text',
                    text: JSON.stringify(result, null, 2),
                },
            ],
        };
    }

    if (name === 'run_design_command') {
        const cmdName = (args.command || 'list').toLowerCase().trim();
        const payload = cmdName === 'list' ? listDesignCommands() : getDesignCommand(cmdName);
        return {
            content: [
                {
                    type: 'text',
                    text: JSON.stringify(payload, null, 2),
                },
            ],
        };
    }

    if (name === 'expand_image_prompt') {
        const result = expandPrompt(args.prompt, args.domain || 'photorealism', {
            lighting: args.lighting,
            aspectRatio: args.aspectRatio,
        });
        return {
            content: [
                {
                    type: 'text',
                    text: JSON.stringify(result, null, 2),
                },
            ],
        };
    }

    if (name === 'generate_brand_design_md') {
        const theme = args.theme || 'linear';
        const doc = generateDesignMD(theme, args.customAccent);
        const out = args.productName
            ? `${generateProductMD({ name: args.productName })}\n\n---\n\n${doc}`
            : doc;
        return {
            content: [
                {
                    type: 'text',
                    text: out,
                },
            ],
        };
    }

    if (name === 'list_design_themes') {
        return {
            content: [
                {
                    type: 'text',
                    text: JSON.stringify(listThemes(), null, 2),
                },
            ],
        };
    }

    if (name === 'list_curated_components') {
        return {
            content: [
                {
                    type: 'text',
                    text: JSON.stringify(listComponents(), null, 2),
                },
            ],
        };
    }

    throw new Error(`Tool not found: ${name}`);
});

async function run() {
    const transport = new StdioServerTransport();
    await server.connect(transport);
}

run().catch((err) => {
    console.error('Fatal MCP error:', err);
    process.exit(1);
});
