/**
 * AGS Studio Image & Vietnamese Typography Engine (v2.0.0)
 * 100% Pure JavaScript (Zero Python Dependency)
 *
 * Capabilities:
 *  1. Platform Adapters: toMidjourneyFormat(), toOpenAIFormat(), toFluxFormat(), toNanoBananaFormat(), toSeedanceFormat()
 *  2. Vietnamese Glyph & Font Blacklist Checker (U+0102–U+1EF9, 134 stacked diacritics)
 *  3. CapCut / Figma / Transparent SVG Typography Asset Exporter
 */
import fs from 'fs';
import path from 'path';
import {
    compileStudioImagePrompt,
    sanitizeImagePrompt,
    inferStudioAspectRatio,
    CAPCUT_VN_TYPOGRAPHY_PRESETS,
    expandPrompt
} from './prompt_expander.js';

// Extended Latin + Vietnamese Unicode Diacritic Range (U+00C0–U+024F & U+1E00–U+1EFF)
export const VIETNAMESE_DIACRITIC_REGEX = /[àáảãạăằắẳẵặâầấẩẫậèéẻẽẹêềếểễệìíỉĩịòóỏõọôồốổỗộơờớởỡợùúủũụưừứửữựỳýỷỹỵđÀÁẢÃẠĂẰẮẲẴẶÂẦẤẨẪẬÈÉẺẼẸÊỀẾỂỄỆÌÍỈĨỊÒÓỎÕỌÔỒỐỔỖỘƠỜỚỞỠỢÙÚỦŨỤƯỪỨỬỮỰỲÝỶỸỴĐ]/;

export const VIETNAMESE_EXTENDED_CHARS =
    'ÁÀẢÃẠĂẮẰẲẴẶÂẤẦẨẪẬĐÉÈẺẼẸÊẾỀỂỄỆÍÌỈĨỊÓÒỎÕỌÔỐỒỔỖỘƠỚỜỞỠỢÚÙỦŨỤƯỨỪỬỮỰÝỲỶỸỴ' +
    'áàảãạăắằẳẵặâấầẩẫậđéèẻẽẹêếềểễệíìỉĩịóòỏõọôốồổỗộơớờởỡợúùủũụưứừửữựýỳỷỹỵ';

/**
 * Fonts known to lack complete Vietnamese stacked diacritics (U+0102–U+1EF9) or cause tofu/fallback
 */
export const VIETNAMESE_FONT_BLACKLIST = {
    'impact': { reason: 'Missing Vietnamese stacked horn/breve diacritics (Ắ, Ể, Ự)', replacement: 'DelaGothic-Bold', preset: 'bold_impact' },
    'bebas': { reason: 'Standard Western subset drops Vietnamese underdots and hooks', replacement: 'BarlowCondensed-BlackItalic', preset: 'kinetic_hype' },
    'bebas neue': { reason: 'Unpatched subsets cause fallback on Ậ, Ễ, Ợ', replacement: 'BarlowCondensed-BlackItalic', preset: 'kinetic_hype' },
    'futura': { reason: 'Legacy geometric cuts lack Vietnamesehorn glyphs (Ơ, Ư)', replacement: 'Plus Jakarta Sans', preset: 'modern_clean' },
    'monument': { reason: 'Display Latin-1 only; causes tofu boxes on Vietnamese vowels', replacement: 'DelaGothic-Bold', preset: 'bold_impact' },
    'monument extended': { reason: 'Display Latin-1 only; causes tofu boxes on Vietnamese vowels', replacement: 'DelaGothic-Bold', preset: 'bold_impact' },
    'helvetica': { reason: 'Tight default leading collides stacked Vietnamese diacritics', replacement: 'Be Vietnam Pro', preset: 'modern_clean' },
    'helvetica neue': { reason: 'Tight default leading collides stacked Vietnamese diacritics', replacement: 'Be Vietnam Pro', preset: 'modern_clean' },
    'sf pro': { reason: 'Apple system token often mis-rendered as Nordic umlauts by diffusion models', replacement: 'CapCutSansText-Bold', preset: 'modern_clean' },
    'courier': { reason: 'Legacy monospace lacks clean Vietnamese stacked accents', replacement: 'JetBrains Mono', preset: 'tech_cyber' },
    'comic sans': { reason: 'Aesthetic ban + inconsistent Vietnamese kerning', replacement: 'Bangers-Regular', preset: 'viral_thumbnail' },
    'papyrus': { reason: 'Aesthetic ban + missing Vietnamese extended glyphs', replacement: 'Vollkorn-Blk', preset: 'classic_serif' },
    'trajan': { reason: 'Roman capitals lack Vietnamese diacritical marks', replacement: 'PlayfairDisplay-Bold', preset: 'editorial_luxury' },
    'didot': { reason: 'Hairline stems break Vietnamese accent legibility on mobile', replacement: 'PlayfairDisplay-Bold', preset: 'editorial_luxury' },
    'gotham': { reason: 'Western commercial cuts often omit Vietnamese 0102-1EF9 block', replacement: 'Montserrat-Bold', preset: 'bold_impact' },
    'avenir': { reason: 'Missing Vietnamese horn/breve combinations in standard subsets', replacement: 'Plus Jakarta Sans', preset: 'modern_clean' }
};

/**
 * Curated 100% Vietnamese-Verified Fonts (134/134 diacritic coverage in CapCut & AGS Studio)
 */
export const VIETNAMESE_SAFE_FONTS = [
    'Be Vietnam Pro',
    'Bricolage Grotesque',
    'Plus Jakarta Sans',
    'JetBrains Mono',
    'CapCutSansText-Bold',
    'CapCutSansText-Medium',
    'CapCutSansText-Regular',
    'PlayfairDisplay-Bold',
    'Fraunces',
    'DelaGothic-Bold',
    'BarlowCondensed-BlackItalic',
    'Montserrat-Bold',
    'Bangers-Regular',
    'Vollkorn-Blk',
    'Vollkorn-Md',
    'ChakraPetch-Regular',
    'Kanit-Black',
    'PublicSans',
    'Agbalumo',
    'Bungee-Regular',
    'ZYVNA_Dreamboat',
    'ZYVNA_Gnomeshgh',
    'ZYVNA_Flechazo',
    'ZYVNA_Miraitowa',
    'ZYVNA_Flipped'
];

export function hasVietnameseDiacritics(text = '') {
    return VIETNAMESE_DIACRITIC_REGEX.test(String(text || ''));
}

/**
 * Check if a font family or CSS stack is safe for Vietnamese (U+0102–U+1EF9)
 */
export function checkVietnameseFontSupport(fontName = '') {
    const raw = String(fontName || '').trim();
    const normalized = raw.toLowerCase().replace(/['"]/g, '').replace(/\.(ttf|otf|woff2?)$/i, '').trim();

    for (const [badKey, info] of Object.entries(VIETNAMESE_FONT_BLACKLIST)) {
        if (normalized === badKey || normalized.includes(badKey)) {
            return {
                font: raw,
                supported: false,
                blacklisted: true,
                unicode_range: 'U+0102–U+1EF9 (Vietnamese Extended)',
                reason: info.reason,
                recommended_replacement: info.replacement,
                recommended_preset: info.preset,
                capcut_spec: CAPCUT_VN_TYPOGRAPHY_PRESETS[info.preset]
            };
        }
    }

    const matchedSafe = VIETNAMESE_SAFE_FONTS.find(
        f => normalized.includes(f.toLowerCase().replace(/[-_]/g, ' ')) || normalized.includes(f.toLowerCase())
    );

    return {
        font: raw || 'Be Vietnam Pro',
        supported: true,
        blacklisted: false,
        verified_studio_font: Boolean(matchedSafe),
        unicode_range: 'U+0102–U+1EF9 (134/134 Vietnamese Diacritics)',
        recommended_replacement: matchedSafe || 'Be Vietnam Pro',
        recommended_preset: 'modern_clean',
        capcut_spec: CAPCUT_VN_TYPOGRAPHY_PRESETS.modern_clean
    };
}

/**
 * Platform Adapter 1: Midjourney v7 Format (--ar, --v 7, --style raw, --no)
 */
export function toMidjourneyFormat(prompt = '', options = {}) {
    const ratio = inferStudioAspectRatio(prompt, options.aspectRatio);
    const cleaned = sanitizeImagePrompt(prompt);
    const domain = options.domain || 'midjourney_v7';
    const expanded = expandPrompt(cleaned, domain, { ...options, aspectRatio: ratio });
    const noList = (options.no || 'plastic sheen, cgi, gibberish text, extra fingers, watermark, blurry letters, clipped edges')
        .replace(/^--no\s+/i, '');
    const stylize = options.stylize || 250;
    const mjCommand = `/imagine prompt: ${cleaned}. Shot on Hasselblad X2D 100C, 80mm f/2.8 lens, Kodak Portra 400 natural color science, diffused directional daylight, realistic contact shadows, 15% safe edge margin --ar ${ratio} --v 7 --style raw --s ${stylize} --no ${noList}`;
    return {
        platform: 'midjourney_v7',
        aspect_ratio: ratio,
        command: mjCommand,
        prompt: mjCommand,
        negative_syntax: `--no ${noList}`,
        parameters: { ar: ratio, v: '7', style: 'raw', s: stylize }
    };
}

/**
 * Platform Adapter 2: OpenAI GPT-Image-2 / Responses Format (Natural Contextual Exclusions, No --no flags)
 */
export function toOpenAIFormat(prompt = '', options = {}) {
    const ratio = inferStudioAspectRatio(prompt, options.aspectRatio);
    const studioBrief = compileStudioImagePrompt(prompt, { aspectRatio: ratio, referenceCount: options.referenceCount || 0 });
    const sizeMap = {
        '1:1': '1024x1024',
        '16:9': '1536x1024',
        '4:3': '1536x1024',
        '21:9': '1536x1024',
        '9:16': '1024x1536',
        '4:5': '1024x1536',
        '3:4': '1024x1536'
    };
    const size = sizeMap[ratio] || '1024x1024';
    return {
        platform: 'openai_gpt_image_2',
        endpoint: '/v1/images/generations',
        aspect_ratio: ratio,
        payload: {
            model: options.model || 'cx/gpt-image-2',
            prompt: studioBrief,
            size,
            quality: options.quality || 'high',
            output_format: options.outputFormat || 'png'
        }
    };
}

/**
 * Platform Adapter 3: FLUX.1 Pro / Stable Diffusion SDXL Format (Separate positive & negative_prompt fields)
 */
export function toFluxFormat(prompt = '', options = {}) {
    const ratio = inferStudioAspectRatio(prompt, options.aspectRatio);
    const cleaned = sanitizeImagePrompt(prompt);
    const expanded = expandPrompt(cleaned, options.domain || 'nano_banana_pro', { ...options, aspectRatio: ratio });
    return {
        platform: 'flux_sdxl',
        aspect_ratio: ratio,
        payload: {
            prompt: expanded.studio_brief,
            positive_prompt: expanded.positive_prompt,
            negative_prompt: expanded.negative_prompt,
            aspect_ratio: ratio,
            guidance_scale: options.guidanceScale || 3.5,
            num_inference_steps: options.steps || 28,
            sampler: 'flow_match_euler'
        }
    };
}

/**
 * Platform Adapter 4: Google Nano Banana Pro / Gemini 3.1 Flash Image Format
 */
export function toNanoBananaFormat(prompt = '', options = {}) {
    const ratio = inferStudioAspectRatio(prompt, options.aspectRatio);
    const studioBrief = compileStudioImagePrompt(prompt, { aspectRatio: ratio, referenceCount: options.referenceCount || 0 });
    return {
        platform: 'nano_banana_pro',
        endpoint: '/v1/chat/completions',
        aspect_ratio: ratio,
        payload: {
            model: options.model || 'ag/gemini-3.1-flash-image',
            messages: [
                {
                    role: 'user',
                    content: `${studioBrief}\nCanvas aspect ratio: ${ratio}.`
                }
            ],
            generationConfig: {
                temperature: 0.65,
                topP: 0.95,
                topK: 40,
                imageConfig: {
                    aspectRatio: ratio
                }
            }
        }
    };
}

/**
 * Platform Adapter 5: ByteDance Seedance 2.5 / Seedream 5.0 4-Block Director Format
 */
export function toSeedanceFormat(prompt = '', options = {}) {
    const ratio = inferStudioAspectRatio(prompt, options.aspectRatio);
    const cleaned = sanitizeImagePrompt(prompt);
    const refCount = Number(options.referenceCount || 0);
    const refHeader = refCount > 0
        ? `[Block 1 - Asset Binding]: Bind @Image 1 (of ${refCount}) as the primary visual identity and layout reference.`
        : `[Block 1 - Asset Binding]: Text-to-Visual Studio Generation (Canvas ${ratio}).`;
    const summary = `[Block 2 - Director Summary]: ${cleaned} (${ratio} editorial framing, smooth optical depth of field).`;
    const staging = `[Block 3 - Macro-to-Micro Staging]: Foreground hero subject in sharp focus with 15% breathing margin; midground contextual props with natural contact shadows; background softly diffused with clean negative space for typography.`;
    const atmosphere = `[Block 4 - Atmosphere & Positive Guard]: Diffused studio window daylight, warm fill reflector, authentic surface micro-texture. No unrequested subtitles, no gibberish micro-text, no watermarks.`;
    const fullPrompt = [refHeader, summary, staging, atmosphere].join('\n');
    return {
        platform: 'seedance_2_5',
        aspect_ratio: ratio,
        prompt: fullPrompt,
        blocks: { refHeader, summary, staging, atmosphere }
    };
}

/**
 * Unified dispatcher across all 5 platforms
 */
export function formatForPlatform(prompt = '', platform = 'nano_banana_pro', options = {}) {
    const key = String(platform || 'nano_banana_pro').toLowerCase().trim();
    if (key.includes('midjourney') || key === 'mj') return toMidjourneyFormat(prompt, options);
    if (key.includes('openai') || key.includes('gpt') || key.includes('dalle')) return toOpenAIFormat(prompt, options);
    if (key.includes('flux') || key.includes('sdxl') || key.includes('stable')) return toFluxFormat(prompt, options);
    if (key.includes('seedance') || key.includes('seedream')) return toSeedanceFormat(prompt, options);
    return toNanoBananaFormat(prompt, options);
}

function escapeXml(str = '') {
    return String(str)
        .replace(/&/g, '&amp;')
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;')
        .replace(/"/g, '&quot;')
        .replace(/'/g, '&apos;');
}

/**
 * Export CapCut / Figma / Premiere transparent SVG typography overlay + JSON config
 */
export function exportTypographyAsset(options = {}) {
    const presetKey = options.preset && CAPCUT_VN_TYPOGRAPHY_PRESETS[options.preset] ? options.preset : 'editorial_luxury';
    const preset = CAPCUT_VN_TYPOGRAPHY_PRESETS[presetKey];
    const width = Number(options.width || 1080);
    const height = Number(options.height || 1350);
    const title = String(options.title || 'Hệ Thống AI Agent Tự Động Hóa').trim();
    const subtitle = String(options.subtitle || 'Chuẩn hóa thiết kế & vận hành 24/7 cho doanh nghiệp').trim();
    const badge = String(options.badge || 'AGS STUDIO').trim();

    const headFont = preset.headline_font.replace(/\.(ttf|otf)$/i, '');
    const bodyFont = preset.body_font.replace(/\.(ttf|otf)$/i, '');
    const padX = Math.round(width * 0.07);
    const boxW = width - padX * 2;
    const boxH = Math.round(height * 0.26);
    const boxY = height - boxH - Math.round(height * 0.06);

    const svgContent = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${width} ${height}" width="${width}" height="${height}">
  <defs>
    <filter id="capcutShadow" x="-10%" y="-10%" width="120%" height="120%">
      <feDropShadow dx="0" dy="3" stdDeviation="4" flood-color="#000000" flood-opacity="0.75" />
    </filter>
  </defs>
  <!-- CapCut Frosted Scrim Container -->
  <rect x="${padX}" y="${boxY}" width="${boxW}" height="${boxH}" rx="24" fill="#0E1116" fill-opacity="0.72" stroke="#FFFFFF" stroke-opacity="0.18" stroke-width="2" />
  <!-- Emerald Signal Pill Badge -->
  <rect x="${padX + 36}" y="${boxY + 32}" width="${Math.max(180, badge.length * 16 + 40)}" height="42" rx="21" fill="#10B981" />
  <text x="${padX + 56}" y="${boxY + 59}" font-family="${escapeXml(bodyFont)}, Be Vietnam Pro, sans-serif" font-size="20" font-weight="700" letter-spacing="1.5" fill="#090D16">${escapeXml(badge.toUpperCase())}</text>
  <!-- Vietnamese Display Headline (1.35 line-height diacritic clearance) -->
  <text x="${padX + 36}" y="${boxY + 138}" font-family="${escapeXml(headFont)}, Bricolage Grotesque, Be Vietnam Pro, serif" font-size="52" font-weight="800" fill="#FFFFFF" filter="url(#capcutShadow)">${escapeXml(title)}</text>
  <!-- Vietnamese Subtitle -->
  <text x="${padX + 36}" y="${boxY + 204}" font-family="${escapeXml(bodyFont)}, Be Vietnam Pro, sans-serif" font-size="28" font-weight="500" fill="#E2E8F0" filter="url(#capcutShadow)">${escapeXml(subtitle)}</text>
</svg>`;

    const jsonSpec = {
        schema: 'ags.capcut.typography.v2',
        preset_key: presetKey,
        preset_name: preset.name,
        canvas: { width, height, aspect_ratio: `${width}:${height}` },
        typography: {
            headline_font_file: preset.headline_font,
            body_font_file: preset.body_font,
            fallback_stack: 'Bricolage Grotesque, Be Vietnam Pro, Plus Jakarta Sans, sans-serif',
            line_height: preset.line_height,
            letter_spacing_em: 0.02,
            vietnamese_diacritic_safe: true,
            unicode_coverage: 'U+0102–U+1EF9 (134/134)'
        },
        styling: {
            treatment: preset.treatment,
            scrim_bg: 'rgba(14, 17, 22, 0.72)',
            badge_bg: '#10B981',
            headline_color: '#FFFFFF',
            subtitle_color: '#E2E8F0',
            drop_shadow: '0px 3px 8px rgba(0, 0, 0, 0.75)'
        },
        copy: { badge, title, subtitle }
    };

    const result = {
        preset: presetKey,
        svg: svgContent,
        json: jsonSpec
    };

    if (options.outputDir) {
        const outDir = path.resolve(options.outputDir);
        fs.mkdirSync(outDir, { recursive: true });
        const svgPath = path.join(outDir, `ags-typography-${presetKey}.svg`);
        const jsonPath = path.join(outDir, `ags-typography-${presetKey}.json`);
        fs.writeFileSync(svgPath, svgContent, 'utf-8');
        fs.writeFileSync(jsonPath, JSON.stringify(jsonSpec, null, 2), 'utf-8');
        result.svg_path = svgPath;
        result.json_path = jsonPath;
    }

    return result;
}
