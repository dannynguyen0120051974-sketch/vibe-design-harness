/**
 * VibeDesign-Harness Universal Multi-Domain Image & Visual Prompt Expander
 * 100% Pure JavaScript (Zero Python Dependency)
 * Universal compatibility: Midjourney v6+, FLUX.1 (Pro/Schnell/Dev), SDXL, Recraft V3,
 * Ideogram 2.0, Google Imagen 3+, OpenAI GPT Image 2 / DALL-E 3, and ComfyUI workflows.
 * 30+ Specialized Visual Domains + Dynamic Domain Registration & Customization.
 */

export const VISUAL_DOMAINS = {
    // 1. UNIVERSAL PRO PHOTOGRAPHY & CINEMATOGRAPHY
    "photorealism": {
        "prefix": "Award-winning ultra-photorealistic shot, captured on 35mm Hasselblad medium format camera, f/2.8 lens, natural lighting physics, subsurface micro-textures, authentic human skin pores, photorealistic depth of field, raw color balance, cinematic composition.",
        "negative": "3d render, cartoon, illustration, painting, plastic skin, fake lighting, blurry, over-saturated, anime, CGI, airbrushed, lowres"
    },
    "editorial_luxury": {
        "prefix": "Vogue/GQ editorial luxury haute couture photography, Leica M11 optics, diffused high-end studio softbox lighting, high-fashion color grading, subtle natural skin texture, prestigious editorial aesthetic.",
        "negative": "cheap lighting, low-res, plastic skin, fake backdrop, amateur snapshot, oversaturated colors"
    },
    "quiet_luxury": {
        "prefix": "Old money quiet luxury aesthetic, understated timeless elegance, muted earthy and cream tones, cashmere and linen textures, warm ambient natural sunlight, architectural minimalism, Hasselblad camera capture.",
        "negative": "flashy gaudy logos, neon colors, plastic reflections, oversaturated contrast, cheap synthetic fabrics"
    },
    "minimalism_visual": {
        "prefix": "Ultra-minimalist architectural photography, clean monolithic geometry, expansive negative space, soft ambient natural shadows, pristine white and concrete textures, disciplined composition.",
        "negative": "cluttered background, busy details, visual noise, complex chaotic patterns"
    },

    // 2. UNIVERSAL AI IMAGE GEN ENGINE (Midjourney / FLUX.1 / SDXL / Recraft / Imagen / DALL-E)
    "universal_image_pro": {
        "prefix": "Masterpiece digital visual, ultra-high fidelity render, photorealistic lighting physics, sharp focal depth, master studio art direction, 8k crisp details, balanced chromatic harmony, ray-traced subsurface scattering.",
        "negative": "cartoonish artifacts, blurry textures, oversaturated plastic look, deformed geometry, bad hands, low resolution"
    },
    "anime": {
        "prefix": "Masterpiece anime illustration, vibrant 2D cel-shading art style, clean dynamic line art, Studio Ghibli and Makoto Shinkai visual aesthetics, dramatic volumetric sky and lighting.",
        "negative": "photorealistic human skin, 3D CGI render, realistic photograph, blurry lines, noisy photographic textures"
    },
    "cyberpunk_anime": {
        "prefix": "Retro 90s cyberpunk anime visual, neo-Tokyo neon reflections, sharp ink line art, cel-shaded characters, volumetric rain atmosphere, hyper-detailed futuristic mechanical elements.",
        "negative": "modern flat 3D, dull colors, plastic lighting, low-res textures"
    },
    "3d_animation": {
        "prefix": "3D Pixar animation style render, smooth subsurface material scattering, Octane render finish, studio rim lighting, expressive character geometry, hyper-clean materials.",
        "negative": "2D flat drawing, low-poly, realistic live photo, noisy photograph, blurry background"
    },
    "infographic": {
        "prefix": "Swiss vector infographic design, semantic data visual hierarchy, crisp iconography, vector geometry, clean grid layout, high contrast typography.",
        "negative": "photographic realistic background, cluttered text, chaotic layout, noise, realistic faces"
    },
    "typography_poster": {
        "prefix": "Swiss Grid typography poster, high-contrast magazine lettering, bold editorial design, graphic art balance, structured negative space, minimalist color palette.",
        "negative": "photographic noise, low-resolution illegible text, script chaos, 3D realistic clutter"
    },

    // 3. UI PROTOTYPING & AGENT GRAPHICS
    "codex_ui_clean": {
        "prefix": "AGS Studio clean UI component spec, production-ready Tailwind CSS v4, accessible WCAG AA contrast, deep dark background slate-950, crisp zinc borders, strict typographic scale, micro-interactions.",
        "negative": "purple gradient slop, unstyled button, generic gray backdrop, broken alignment"
    },
    "claude_design_app": {
        "prefix": "AGS Design UI prototype, clean component-driven React HTML mockup, Tailwind CSS tokens, WCAG accessible contrast, modern dark/light mode toggle, sleek dashboard layout.",
        "negative": "AI-slop purple gradients, low contrast text, unstyled raw buttons, clunky wireframes"
    },
    "claude_design_deck": {
        "prefix": "AGS Design pitch deck slide presentation, 16:9 widescreen layout, Swiss typography, visual data cards, high contrast slide structure, executive summary design.",
        "negative": "wall of text, low contrast backgrounds, messy slide alignment, generic template slop"
    },
    "claude_design_hyperframe": {
        "prefix": "AGS Design HyperFrames HTML motion graphic, smooth CSS @keyframes animations, SVG vector path motion, staggered entry transitions, high-framerate kinetic typography.",
        "negative": "static image, choppy frame rates, unaligned layout shifts, low resolution export"
    },

    // 4. MARKETING, ADS & SOCIAL MEDIA CONVERSION
    "carousel_ad": {
        "prefix": "High-converting social ad carousel graphic, clear safe-zone margin for text CTA, pattern interrupt visual focal point, crisp UI elements, vibrant brand colors.",
        "negative": "off-center text clutter, unreadable zones, low contrast background, grainy photo"
    },
    "sales_creative": {
        "prefix": "Direct-response high-converting sales creative, hero product placement, social proof badge layout, clear visual hierarchy, premium editorial aesthetic.",
        "negative": "abstract messy artwork, dull lighting, unreadable CTA, chaotic background clutter"
    },
    "face_swap_ugc": {
        "prefix": "Authentic UGC customer review product photo, natural smartphone camera angle, realistic lighting, preserved subject facial features, seamless head blending.",
        "negative": "photoshop edge seams, artificial gloss, unnatural skin smoothing, fake cartoon lighting"
    },
    "cover_thumbnail": {
        "prefix": "High CTR YouTube thumbnail background graphic, dramatic visual focal weight, clear headline placement zones, saturated contrast, vibrant lighting effect.",
        "negative": "dull muted colors, low contrast background, small unreadable text, cluttered visual noise"
    },
    "mrbeast_ab_thumbnail_variant_a": {
        "prefix": "High-CTR AGS Viral Studio A/B testing YouTube thumbnail, exaggerated face expression cutout, glowing neon stroke outline around subject, saturated cyan and yellow backdrop, extreme foreground element, 16:9 4K render.",
        "negative": "dull colors, low contrast, blurry face, hidden subject, wall of text, dark gloomy backdrop"
    },
    "mrbeast_ab_thumbnail_variant_b": {
        "prefix": "Curiosity gap A/B testing YouTube thumbnail, bold red arrow pointing to glowing mystery element, extreme contrast, dramatic reaction subject on right side, high saturation background, 16:9 crisp layout.",
        "negative": "unclear focal point, faint arrows, low saturation, boring composition, small text"
    },
    "mrbeast_ab_thumbnail_variant_c": {
        "prefix": "Before vs After split screen A/B testing YouTube thumbnail, dramatic 50/50 vertical divider, left side gloomy low-tier state vs right side hyper-vibrant 100x transformed state, high visual contrast.",
        "negative": "single subject without split, low contrast divider, dull colors, subtle change"
    },

    // 5. E-COMMERCE, POD & BRANDING
    "logo_branding": {
        "prefix": "Professional vector logo design, minimalist geometry, high scalability, pristine negative space, clean vector line work, iconic brand emblem.",
        "negative": "3d photographic background, complex realistic texture, noisy clutter, raster pixels"
    },
    "pod_tshirt": {
        "prefix": "Clean vector graphic for T-shirt POD print, isolated on solid background, zero background noise, crisp outline, high contrast artwork, vector artwork, print-ready 300 DPI aesthetic, bold composition.",
        "negative": "photorealistic background noise, blurry edges, photorealistic human model, complex drop shadows, background clutter, raster artifacts"
    },
    "sticker_vector": {
        "prefix": "Die-cut sticker design, clean white border contour outline, vibrant vector graphic, isolated on plain background, pop art aesthetic, crisp vector lines, sticker pack art.",
        "negative": "no border contour, photorealistic background, realistic photo clutter, blurry line art, un-isolated canvas"
    },
    "shopify_storefront": {
        "prefix": "High-converting Shopify store hero banner, clean ecommerce visual hierarchy, promotional product display, clear trust badge placement zones, WCAG compliant contrast, modern DTC visual aesthetic.",
        "negative": "AI-slop gradients, unreadable promotional text, cluttered banner noise, cheap banner design"
    },
    "dropship_product": {
        "prefix": "Amazon & Shopify product photography mockup, isolated white studio lighting, crisp product highlights, commercial DTC product showcase, clean drop shadow physics, high CTR visual appeal.",
        "negative": "blurry reflection, dark muddy shadows, chaotic background clutter, distorted product geometry"
    },
    // 6. 2026 FLAGSHIP STUDIO ENGINES (Nano Banana Pro, GPT-Image-2, Seedance 2.5, Midjourney V7, CapCut VN)
    "nano_banana_pro": {
        "name": "Nano Banana Pro / Gemini 3.1 Flash Image Studio",
        "category": "Flagship 2026",
        "lens": "Fujifilm GFX 100S 85mm f/4 Macro",
        "prefix": "Studio-directed commercial visual on Fujifilm GFX 100S medium format, 85mm f/4 macro lens, diffused north-facing window softbox from camera left, warm bounce fill from right, realistic contact shadows, authentic surface micro-texture, natural editorial color science, 15% unobstructed safe margin on all edges.",
        "negative": "plastic CGI sheen, printed CSS font names or pt/px sizes, numbered item labels (#1, #2), unquoted gibberish Vietnamese micro-text, clipped device bezels"
    },
    "gpt_image_2": {
        "name": "OpenAI ChatGPT Image 2 / 1.5 Production",
        "category": "Flagship 2026",
        "lens": "Leica M11 50mm f/1.4 Summilux",
        "prefix": "Candid unposed photorealistic studio capture, 35mm film optics on 50mm lens, honest material textures, natural skin pores, structured typographic hierarchy, high-contrast verbatim lettering, balanced negative space.",
        "negative": "heavy retouching, plastic skin, unrequested extra words, warped packaging, watermark, fake logos"
    },
    "seedance_2_5": {
        "name": "ByteDance Seedance 2.5 / Seedream 5.0 Director",
        "category": "Flagship 2026",
        "lens": "Arri Alexa Mini LF 35mm Anamorphic",
        "prefix": "Director-structured visual storytelling frame, macro-to-micro spatial staging (foreground, midground, background), smooth optical depth of field, natural atmospheric lighting, explicit @Image reference identity lock.",
        "negative": "unrequested subtitles, chaotic multi-subject collision, over-filled shot clutter, distorted hands"
    },
    "midjourney_v7": {
        "name": "Midjourney V7 Optical Photorealism",
        "category": "Flagship 2026",
        "lens": "Hasselblad X2D 100C 80mm f/2.8",
        "prefix": "Hasselblad X2D 100C medium format photography, Kodak Portra 400 natural color science, subsurface skin scattering, tactile fabric weave, directional golden-hour or soft overcast lighting with natural shadow falloff.",
        "negative": "AI-slop neon gradients, plastic skin smoothing, generic CGI render, oversaturated contrast"
    },
    "capcut_vn_poster": {
        "name": "CapCut Vietnamese Typography & Editorial Poster",
        "category": "Flagship 2026",
        "lens": "Editorial Studio Flat-Lay 50mm",
        "prefix": "Editorial poster layout with generous negative space for CapCut Vietnamese display typography (CapCut Sans Text Bold / Playfair Display Bold / DelaGothic Bold), high-contrast focal subject, clean background separation, 1.35 line-height diacritic clearance.",
        "negative": "crowded tiny Vietnamese body text (<14pt), colliding diacritics, busy background behind text zone, printed #HEX codes"
    }
};

export const ALIASES = {
    "anime_manga": "anime",
    "infographic_diagram": "infographic",
    "social_carousel": "carousel_ad",
    "typography": "typography_poster",
    "gemini_imagen": "nano_banana_pro",
    "gemini_imagen_pro": "nano_banana_pro",
    "gemini_image": "nano_banana_pro",
    "nano_banana": "nano_banana_pro",
    "gpt_image": "gpt_image_2",
    "seedream": "seedance_2_5",
    "capcut": "capcut_vn_poster",
    "imagen": "universal_image_pro",
    "midjourney": "universal_image_pro",
    "flux": "universal_image_pro",
    "sdxl": "universal_image_pro",
    "claude_design": "claude_design_app",
    "mrbeast_variant_a": "mrbeast_ab_thumbnail_variant_a",
    "mrbeast_variant_b": "mrbeast_ab_thumbnail_variant_b",
    "mrbeast_variant_c": "mrbeast_ab_thumbnail_variant_c",
    "luxury": "editorial_luxury",
    "quiet_luxury_aesthetic": "quiet_luxury",
    "minimalism": "minimalism_visual",
    "minimalist": "minimalism_visual",
    "cyberpunk": "cyberpunk_anime"
};

/**
 * Register a custom visual prompt domain dynamically
 * @param {string} domainKey Unique domain name
 * @param {string} prefix Prompt enhancement prefix
 * @param {string} negative Negative prompt constraints
 */
export function registerDomain(domainKey, prefix, negative = '') {
    if (!domainKey || !prefix) {
        throw new Error('registerDomain requires domainKey and prefix.');
    }
    const key = domainKey.toLowerCase().trim();
    VISUAL_DOMAINS[key] = { prefix, negative };
    return VISUAL_DOMAINS[key];
}

/**
 * Expand raw image prompt with universal camera physics, studio lighting, and negative constraints
 * @param {string} prompt Raw prompt concept
 * @param {string} domain Visual domain style or target model
 * @param {Object} options Custom options (lighting, composition, mood, customPrefix, customNegative)
 */

export const CAPCUT_VN_TYPOGRAPHY_PRESETS = {
    editorial_luxury: {
        name: "Editorial Luxury (CapCut / Vogue)",
        headline_font: "PlayfairDisplay-Bold.ttf",
        body_font: "CapCutSansText-Medium.otf",
        line_height: 1.35,
        treatment: "Frosted dark scrim + crisp drop shadow + emerald pill badge"
    },
    modern_clean: {
        name: "Modern Clean UI & Caption",
        headline_font: "CapCutSansText-Bold.otf",
        body_font: "CapCutSansText-Regular.otf",
        line_height: 1.32,
        treatment: "High-contrast geometric sans with wide Vietnamese diacritic clearance"
    },
    bold_impact: {
        name: "Bold Impact Poster (DelaGothic)",
        headline_font: "DelaGothic-Bold.ttf",
        body_font: "Montserrat-Bold.otf",
        line_height: 1.30,
        treatment: "Heavy display block headline + two-tone keyword highlight"
    },
    kinetic_hype: {
        name: "Kinetic Hype & Sports/Business",
        headline_font: "BarlowCondensed-BlackItalic.ttf",
        body_font: "CapCutSansText-Bold.otf",
        line_height: 1.28,
        treatment: "Condensed italic punch + crisp dark stroke"
    },
    viral_thumbnail: {
        name: "Viral YouTube / Reels Thumbnail",
        headline_font: "Bangers-Regular.ttf",
        body_font: "Montserrat-Bold.otf",
        line_height: 1.30,
        treatment: "High-CTR cutout zone + bold outlined title"
    },
    vn_creative: {
        name: "CapCut ZYVNA Creative Vietnamese",
        headline_font: "ZYVNA_Dreamboat.ttf",
        body_font: "CapCutSansText-Medium.otf",
        line_height: 1.36,
        treatment: "Custom ByteDance ZYVNA Vietnamese display glyphs"
    },
    classic_serif: {
        name: "Archival Book & Authority Serif",
        headline_font: "Vollkorn-Blk.ttf",
        body_font: "Vollkorn-Md.ttf",
        line_height: 1.35,
        treatment: "Warm paper grain + deep charcoal ink"
    },
    tech_cyber: {
        name: "Tech & AI Systems Geometric",
        headline_font: "ChakraPetch-Regular.ttf",
        body_font: "CapCutSansText-Medium.otf",
        line_height: 1.32,
        treatment: "Precision technical grid + emerald signal accent"
    }
};

const HEX_COLOR_DESCRIPTIONS = {
    "#fbfbfd": "warm alabaster off-white",
    "#f4f4ef": "warm editorial cotton paper cream",
    "#f7f4ee": "classic archival book paper cream",
    "#ffffff": "crisp neutral studio white",
    "#0b5e55": "deep emerald teal",
    "#1f6f3d": "deep forest signal green",
    "#10b981": "vibrant emerald green",
    "#14b8a6": "rich mineral teal",
    "#0e1116": "deep matte obsidian ink",
    "#09090b": "deep matte zinc black"
};

const VN_DIACRITIC_RE = /[àáảãạăằắẳẵặâầấẩẫậèéẻẽẹêềếểễệìíỉĩịòóỏõọôồốổỗộơờớởỡợùúủũụưừứửữựỳýỷỹỵđÀÁẢÃẠĂẰẮẲẴẶÂẦẤẨẪẬÈÉẺẼẸÊỀẾỂỄỆÌÍỈĨỊÒÓỎÕỌÔỒỐỔỖỘƠỜỚỞỠỢÙÚỦŨỤƯỪỨỬỮỰỲÝỶỸỴĐ]/;

export function inferStudioAspectRatio(prompt = "", requestedAspect = "") {
    const raw = String(requestedAspect || "").trim().toLowerCase();
    const p = String(prompt || "").toLowerCase();
    if (/(?:4:5|tỷ\s*lệ\s*4:5|bài\s*đăng\s*facebook|bài\s*post\s*facebook|instagram\s*post|social\s*card|carousel\s*slide)/i.test(p)) {
        return "4:5";
    }
    if (/(?:3:4|tỷ\s*lệ\s*3:4|thẻ\s*dọc|bìa\s*sách|ebook\s*cover|tạp\s*chí)/i.test(p)) {
        return "3:4";
    }
    if (/(?:9:16|tỷ\s*lệ\s*9:16|ảnh\s*dọc|khung\s*dọc|poster\s*dọc|banner\s*dọc|chiều\s*dọc|màn\s*hình\s*dọc|iphone|mobile\s+ui|mobile\s+app|smartphone\s+screen|story|stories|reel|reels|tiktok|vertical)/i.test(p)) {
        return "9:16";
    }
    if (/(?:16:9|tỷ\s*lệ\s*16:9|ảnh\s*ngang|khung\s*ngang|banner\s*ngang|ảnh\s*bìa|bìa\s*ngang|cover\s*facebook|youtube\s*thumbnail|thumbnail|studio\s+display|macbook|desktop\s+ui|widescreen|hero\s+banner|pitch\s+deck)/i.test(p)) {
        return "16:9";
    }
    if (/(?:1:1|tỷ\s*lệ\s*1:1|ảnh\s*vuông|khung\s*vuông|avatar|sticker\s*pack)/i.test(p)) {
        return "1:1";
    }
    const map = {
        square: "1:1", "1:1": "1:1",
        landscape: "16:9", "16:9": "16:9", widescreen: "16:9",
        portrait: "9:16", "9:16": "9:16", vertical: "9:16",
        social: "4:5", "4:5": "4:5", feed: "4:5",
        card: "3:4", "3:4": "3:4", "4:3": "4:3", "21:9": "21:9"
    };
    return map[raw] || "16:9";
}

export function sanitizeImagePrompt(prompt = "") {
    let cleaned = String(prompt || "");
    for (const [hex, desc] of Object.entries(HEX_COLOR_DESCRIPTIONS)) {
        cleaned = cleaned.replace(new RegExp(hex, "gi"), desc);
    }
    cleaned = cleaned.replace(/\(\s*#[0-9a-fA-F]{3,8}\s*\)/g, "");
    cleaned = cleaned.replace(/#[0-9a-fA-F]{6}\b/g, "natural brand accent tone");
    const ordinals = { "1": "First element", "2": "Second element", "3": "Third element", "4": "Fourth element", "5": "Fifth element", "6": "Sixth element" };
    cleaned = cleaned.replace(/(?:^|(?<=\s)|(?<=: ))#?([1-6])\)\s+/g, (_, n) => `${ordinals[n] || "Item " + n}: `);
    cleaned = cleaned.replace(/\(\s*(?:SF\s*Pro|Inter|Roboto|Helvetica|Arial|Plus\s*Jakarta\s*Sans|Font)[^)]{0,40}\b\d+\s*(?:pt|px)\s*\)/gi, "");
    cleaned = cleaned.replace(/\b(?:SF\s*Pro\s*(?:Bold|Medium|Regular|Display)?\s*,?\s*)?\b\d+\s*(?:pt|px)\b/gi, "");
    cleaned = cleaned.replace(/\b(?:8k|4k|16k)\s*(?:render|resolution|uhd|quality)?\b/gi, "");
    cleaned = cleaned.replace(/\b(?:dribbble|behance)\s*(?:and\s*(?:dribbble|behance))?\s*(?:top\s*)?(?:award[- ]winning)?\s*(?:web\s*design\s*showcase|showcase)?\b/gi, "editorial commercial design");
    cleaned = cleaned.replace(/\b(?:ultra[- ]clean|hyper[- ]detailed|hyper[- ]realistic|masterpiece|stunning|breathtaking)\b/gi, "");
    return cleaned.replace(/\s{2,}/g, " ").replace(/,\s*,/g, ",").trim();
}

export function compileStudioImagePrompt(prompt = "", options = {}) {
    if (!prompt || String(prompt).includes("[STUDIO IMAGE BRIEF")) return String(prompt || "");
    const ratio = inferStudioAspectRatio(prompt, options.aspectRatio);
    const cleaned = sanitizeImagePrompt(prompt);
    const hasVn = VN_DIACRITIC_RE.test(prompt);
    const quoted = [];
    const quoteRe = /(?:"([^"\n]{1,65})"|'([^'\n]{1,65})')/g;
    let m;
    while ((m = quoteRe.exec(prompt)) !== null) {
        const val = (m[1] || m[2] || "").trim();
        if (val && !/^(?:https?:\/\/|[a-z0-9.-]+\.[a-z]{2,}|#[0-9a-fA-F]{3,8}|SF Pro.*|\d+pt|\d+px)$/i.test(val) && !quoted.includes(val)) {
            quoted.push(val);
        }
    }
    const vnHeadlineRe = /(?:chữ\s+trên\s+ảnh|dòng\s+chữ\s+trên\s+ảnh|với\s+dòng\s+chữ|kèm\s+dòng\s+chữ|in\s+dòng\s+chữ|ghi\s+chữ|tiêu\s+đề\s+trên\s+ảnh|tiêu\s+đề\s+chính|tiêu\s+đề|headline|chữ)\s*(?:là|:)\s*([^.,;\n"']{2,60})/gi;
    while ((m = vnHeadlineRe.exec(prompt)) !== null) {
        let val = (m[1] || "").trim().replace(/^["'“”‘’]+|["'“”‘’]+$/g, "");
        val = val.split(/\s+(?:phong\s+cách|theo\s+phong\s+cách|màu\s+|ở\s+góc|ở\s+giữa|bên\s+trên|bên\s+dưới)\b/i)[0].trim();
        if (val.length >= 2 && val.length <= 60 && !quoted.includes(val)) {
            quoted.push(val);
        }
    }
    const blocks = [
        `[STUDIO IMAGE BRIEF — CANVAS ${ratio}]`,
        ...(options.referenceCount > 0 ? [
            `[ASSET REFERENCING & EDIT LOCK]: Bind @Image 1 (of ${options.referenceCount}) as the primary visual anchor. Lock core identity, geometry, and proportions first; apply only the requested change.`
        ] : []),
        `[SUBJECT & SCENE]: ${cleaned}`,
        `[COMPOSITION & FRAMING]: Canvas aspect ratio ${ratio}. Center primary subject with at least 15% unobstructed breathing margin on all four edges so nothing is clipped or shifted.`,
        `[CAMERA, OPTICS & COLOR SCIENCE]: Shot on Fujifilm GFX 100S medium format, 85mm f/4 macro lens, diffused north-facing window softbox from camera left, warm bounce fill from right, realistic contact shadows, true-to-life editorial color science.`
    ];
    if (quoted.length > 0) {
        const qList = quoted.slice(0, 5).map(t => `"${t}"`).join(", ");
        blocks.push(
            hasVn
                ? `[TEXT — RENDER VERBATIM (CAPCUT VIETNAMESE TYPOGRAPHY STANDARD)]: Render ONLY these exact quoted strings: ${qList}. Set in bold high-contrast geometric sans-serif (CapCut Sans Text Bold / Plus Jakarta Sans Bold style) with wide letter-spacing, generous 1.35 line-height, and razor-sharp Vietnamese diacritics. CRITICAL VIETNAMESE TEXT GUARD: Do NOT invent or render ANY unquoted Vietnamese subtext, small body paragraphs, or micro-labels (<14pt); represent secondary UI/card text as clean abstract skeleton bars.`
                : `[TEXT — RENDER VERBATIM]: Render ONLY these exact quoted strings: ${qList} in crisp high-contrast editorial typography. Do NOT invent unrequested micro-copy.`
        );
    } else {
        blocks.push("[TEXT CONSTRAINT]: Do NOT render any text, letters, numbers, labels, watermarks, or logos anywhere in the image.");
    }
    blocks.push("[STRICT CONSTRAINTS]: No printed font names or pt/px sizes, no numbered labels (#1, #2), no clipped device edges, no plastic CGI sheen.");
    return blocks.join("\n");
}

export function expandPrompt(prompt, domain = 'photorealism', options = {}) {
    let domKey = (domain || 'photorealism').toLowerCase().trim();
    if (ALIASES[domKey]) {
        domKey = ALIASES[domKey];
    }

    let spec = VISUAL_DOMAINS[domKey] || VISUAL_DOMAINS['photorealism'];
    let prefix = options.customPrefix || spec.prefix;
    let negative = options.customNegative || spec.negative;

    let customModifier = '';
    if (options.lighting) customModifier += `, ${options.lighting} lighting`;
    if (options.composition) customModifier += `, ${options.composition} composition`;
    if (options.aspectRatio) customModifier += `, aspect ratio ${options.aspectRatio}`;
    if (options.mood) customModifier += `, ${options.mood} atmosphere`;

    const expandedPrompt = `${prefix} ${prompt}${customModifier}. High quality, master art direction.`;

    const inferredRatio = inferStudioAspectRatio(prompt, options.aspectRatio);
    const studioBrief = compileStudioImagePrompt(prompt, { aspectRatio: inferredRatio, referenceCount: options.referenceCount || 0 });
    return {
        original_prompt: prompt,
        sanitized_prompt: sanitizeImagePrompt(prompt),
        domain: domKey,
        domain_name: spec.name,
        expanded_prompt: expandedPrompt,
        positive_prompt: expandedPrompt,
        studio_brief: studioBrief,
        negative_prompt: negative,
        capcut_vn_preset: CAPCUT_VN_TYPOGRAPHY_PRESETS[options.capcutPreset || 'modern_clean'],
        recommended_parameters: {
            aspect_ratio: inferredRatio,
            sampler: 'euler_a / flow_match',
            guidance_scale: 3.5,
            negative_prompt: negative
        },
        universal_compatibility: [
            "Midjourney v6+",
            "FLUX.1 (Pro/Schnell/Dev)",
            "Stable Diffusion SDXL",
            "Google Imagen 3+",
            "OpenAI GPT Image 2 / DALL-E 3",
            "Recraft V3",
            "Ideogram 2.0"
        ],
        engine_guidance: 'Pass expanded_prompt as primary prompt and negative_prompt as negative prompt parameter.'
    };
}

export function listDomains() {
    return Object.keys(VISUAL_DOMAINS).map(k => ({
        key: k,
        name: VISUAL_DOMAINS[k].name,
        category: VISUAL_DOMAINS[k].category || 'General',
        lens: VISUAL_DOMAINS[k].lens || 'Standard'
    }));
}

export default {
    expandPrompt,
    compileStudioImagePrompt,
    sanitizeImagePrompt,
    inferStudioAspectRatio,
    CAPCUT_VN_TYPOGRAPHY_PRESETS,
    registerDomain,
    listDomains,
    VISUAL_DOMAINS,
    ALIASES
};
