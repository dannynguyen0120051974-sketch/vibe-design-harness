#!/usr/bin/env node
/**
 * AGS Design & Visual Studio Harness — MCP Server (v2.0.0)
 */
import { Server } from '@modelcontextprotocol/sdk/server/index.js';
import { StdioServerTransport } from '@modelcontextprotocol/sdk/server/stdio.js';
import { CallToolRequestSchema, ListToolsRequestSchema } from '@modelcontextprotocol/sdk/types.js';
import {
    lintUI,
    fixUI,
    expandPrompt,
    compileStudioImagePrompt,
    CAPCUT_VN_TYPOGRAPHY_PRESETS,
    checkVietnameseFontSupport,
    formatForPlatform,
    exportTypographyAsset,
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
        name: 'ags-design-harness-mcp',
        version: '2.0.0',
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
                name: 'compile_studio_brief',
                description: 'Compiles a natural Vietnamese or English image request into a 7-part Studio Image Brief and platform-native payload (nano_banana_pro, openai_gpt_image_2, midjourney_v7, flux_sdxl, seedance_2_5). Automatically strips AI-slop, infers aspect ratio, and protects Vietnamese diacritics.',
                inputSchema: {
                    type: 'object',
                    properties: {
                        prompt: {
                            type: 'string',
                            description: 'Natural Vietnamese or English visual description.',
                        },
                        platform: {
                            type: 'string',
                            description: 'Target model platform: nano_banana_pro, openai_gpt_image_2, midjourney_v7, flux_sdxl, seedance_2_5.',
                            default: 'nano_banana_pro',
                        },
                        aspectRatio: {
                            type: 'string',
                            description: 'Optional aspect ratio override: 1:1, 4:5, 3:4, 9:16, 16:9, 21:9.',
                        },
                        referenceCount: {
                            type: 'number',
                            description: 'Number of reference images attached for identity/composition locking.',
                            default: 0,
                        },
                    },
                    required: ['prompt'],
                },
            },
            {
                name: 'get_capcut_preset',
                description: 'Returns a verified 100%-Vietnamese CapCut typography preset (fonts, line-height for stacked diacritics, scrim, badge, and shadow spec).',
                inputSchema: {
                    type: 'object',
                    properties: {
                        preset: {
                            type: 'string',
                            description: 'Preset key: editorial_luxury, modern_clean, bold_impact, kinetic_hype, viral_thumbnail, vn_creative, classic_serif, tech_cyber.',
                            default: 'editorial_luxury',
                        },
                    },
                },
            },
            {
                name: 'check_vietnamese_font',
                description: 'Validates whether a font family supports the full Vietnamese Unicode range (U+0102–U+1EF9, 134 stacked diacritics) and returns a safe replacement if blacklisted.',
                inputSchema: {
                    type: 'object',
                    properties: {
                        fontName: {
                            type: 'string',
                            description: 'Font family name or CSS font stack to verify (e.g. Impact, Bebas Neue, Be Vietnam Pro).',
                        },
                    },
                    required: ['fontName'],
                },
            },
            {
                name: 'export_typography_asset',
                description: 'Generates a transparent SVG typography overlay and CapCut/Figma JSON spec from a Vietnamese headline, subtitle, badge, and preset.',
                inputSchema: {
                    type: 'object',
                    properties: {
                        preset: {
                            type: 'string',
                            description: 'CapCut preset key (editorial_luxury, modern_clean, bold_impact, kinetic_hype, viral_thumbnail, vn_creative, classic_serif, tech_cyber).',
                            default: 'editorial_luxury',
                        },
                        title: { type: 'string', description: 'Main Vietnamese headline text.' },
                        subtitle: { type: 'string', description: 'Secondary Vietnamese subtitle text.' },
                        badge: { type: 'string', description: 'Top pill badge label.' },
                        width: { type: 'number', description: 'Canvas width in pixels (default 1080).', default: 1080 },
                        height: { type: 'number', description: 'Canvas height in pixels (default 1350).', default: 1350 },
                        outputDir: { type: 'string', description: 'Optional directory path to save .svg and .json files.' },
                    },
                },
            },
            {
                name: 'scaffold_landing_page',
                description: 'Assembles a complete, high-converting, zero-slop landing page in HTML or React TSX.',
                inputSchema: {
                    type: 'object',
                    properties: {
                        theme: {
                            type: 'string',
                            description: 'Design theme: ags_editorial, minimalism, luxury_editorial, luxury_gold, apple_luxury, modern_clean, linear, stripe, vercel, airbnb, brutalism, swiss_grid, glass_aurora, nordic_frost, cyberpunk.',
                            default: 'ags_editorial',
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
                        customAccent: { type: 'string', description: 'Custom hex accent color override' },
                    },
                },
            },
            {
                name: 'lint_ui_aesthetic',
                description: 'Deterministic zero-token 30-gate UI/UX aesthetic linter for HTML/JSX/Tailwind.',
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
                description: 'Executes one of the 12 AGS post-processing design flows (audit, critique, polish, distill, bolder, quieter, delight, harden, clarify, adapt, colorize, animate).',
                inputSchema: {
                    type: 'object',
                    properties: {
                        command: {
                            type: 'string',
                            description: 'Command name: audit, critique, polish, distill, bolder, quieter, delight, harden, clarify, adapt, colorize, animate.',
                        },
                    },
                    required: ['command'],
                },
            },
            {
                name: 'expand_image_prompt',
                description: 'Expands a raw image prompt with universal camera physics, studio lighting, and negative constraints across 35+ domains.',
                inputSchema: {
                    type: 'object',
                    properties: {
                        prompt: { type: 'string', description: 'Raw visual concept.' },
                        domain: { type: 'string', description: 'Visual domain key (default: nano_banana_pro).', default: 'nano_banana_pro' },
                        aspectRatio: { type: 'string', description: 'Aspect ratio (default auto-inferred).' },
                    },
                    required: ['prompt'],
                },
            },
            {
                name: 'generate_design_system',
                description: 'Generates paired DESIGN.md and PRODUCT.md token specifications for AI coding agents.',
                inputSchema: {
                    type: 'object',
                    properties: {
                        theme: { type: 'string', default: 'ags_editorial' },
                        brandName: { type: 'string', default: 'AgentSea' },
                        customAccent: { type: 'string' },
                    },
                },
            },
        ],
    };
});

server.setRequestHandler(CallToolRequestSchema, async (request) => {
    const { name, arguments: args = {} } = request.params;

    if (name === 'compile_studio_brief') {
        const studioBrief = compileStudioImagePrompt(args.prompt, {
            aspectRatio: args.aspectRatio,
            referenceCount: args.referenceCount || 0,
        });
        const formatted = formatForPlatform(args.prompt, args.platform || 'nano_banana_pro', {
            aspectRatio: args.aspectRatio,
            referenceCount: args.referenceCount || 0,
        });
        return {
            content: [{ type: 'text', text: JSON.stringify({ studio_brief: studioBrief, platform_adapter: formatted }, null, 2) }],
        };
    }

    if (name === 'get_capcut_preset') {
        const key = args.preset && CAPCUT_VN_TYPOGRAPHY_PRESETS[args.preset] ? args.preset : 'editorial_luxury';
        return {
            content: [{ type: 'text', text: JSON.stringify({ preset_key: key, preset: CAPCUT_VN_TYPOGRAPHY_PRESETS[key], all_presets: Object.keys(CAPCUT_VN_TYPOGRAPHY_PRESETS) }, null, 2) }],
        };
    }

    if (name === 'check_vietnamese_font') {
        const res = checkVietnameseFontSupport(args.fontName);
        return {
            content: [{ type: 'text', text: JSON.stringify(res, null, 2) }],
        };
    }

    if (name === 'export_typography_asset') {
        const res = exportTypographyAsset(args);
        return {
            content: [{ type: 'text', text: JSON.stringify(res, null, 2) }],
        };
    }

    if (name === 'scaffold_landing_page') {
        const code = scaffoldLandingPage(args.theme || 'ags_editorial', args);
        return { content: [{ type: 'text', text: code }] };
    }

    if (name === 'lint_ui_aesthetic') {
        const options = { scope: args.scope || 'all' };
        if (args.useRemoteRules) {
            const remote = await fetchRemoteRules();
            if (remote && remote.banned_classes) options.banned_patterns = remote.banned_classes;
        }
        const report = lintUI(args.filePathOrContent, options);
        if (args.autoFix) {
            report.auto_fix = fixUI(args.filePathOrContent);
        }
        return { content: [{ type: 'text', text: JSON.stringify(report, null, 2) }] };
    }

    if (name === 'run_design_command') {
        const cmd = getDesignCommand(args.command);
        return { content: [{ type: 'text', text: JSON.stringify(cmd || { available: listDesignCommands() }, null, 2) }] };
    }

    if (name === 'expand_image_prompt') {
        const res = expandPrompt(args.prompt, args.domain || 'nano_banana_pro', { aspectRatio: args.aspectRatio });
        return { content: [{ type: 'text', text: JSON.stringify(res, null, 2) }] };
    }

    if (name === 'generate_design_system') {
        const designMd = generateDesignMD(args.theme || 'ags_editorial', { customAccent: args.customAccent });
        const productMd = generateProductMD({ name: args.brandName || 'AgentSea', theme: args.theme || 'ags_editorial' });
        return { content: [{ type: 'text', text: JSON.stringify({ DESIGN_MD: designMd, PRODUCT_MD: productMd }, null, 2) }] };
    }

    throw new Error(`Unknown MCP tool: ${name}`);
});

async function run() {
    const transport = new StdioServerTransport();
    await server.connect(transport);
}

run().catch((err) => {
    console.error('AGS Design Harness MCP Server Error:', err);
    process.exit(1);
});
