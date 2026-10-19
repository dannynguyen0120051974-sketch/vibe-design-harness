/**
 * VibeDesign-Harness Post-Processing & Design Commands Engine (v1.6.0)
 * Absorbed & synthesized from Impeccable's 23 Design Flows + Craft Floor
 * Provides:
 *  - 12 Post-Processing Commands (audit, critique, polish, distill, bolder, quieter, delight, harden, animate, clarify, adapt, overdrive)
 *  - Dual Context Generator: PRODUCT.md + DESIGN.md
 *  - Craft Floor verification checklist
 */

export const CRAFT_FLOOR = {
    typography: [
        'Keep body copy comfortably readable at 16px (1rem) minimum and 45–75ch line length.',
        'Maintain clear hierarchy across heading, body, label, and metadata roles (>=1.25x scale step).',
        'Use tabular-nums for financial, pricing, and live metric columns.',
        'On dark surfaces, compensate light text with slightly more line-height (+0.05) and tracking (+0.01em).'
    ],
    color_contrast: [
        'Body text contrast >= 4.5:1; large text, icons, and focus indicators >= 3:1 (WCAG AA).',
        'Never use pure gray on colored backgrounds — tint neutrals toward the surface hue.',
        'In dark mode, use surface elevation (lighter surface tokens) instead of heavy drop shadows.',
        'Never rely on color alone to convey status; pair with shape, icon, or label.'
    ],
    layout_space: [
        'Apply the Squint Test: primary element, secondary element, and groupings must remain obvious when blurred.',
        'Group related items with tight proximity and separate distinct sections with generous intervals (avoid monotonous spacing).',
        'Keep interactive touch targets >= 44x44px even when visual icons are smaller.',
        'Never nest cards inside cards — use spacing, dividers, or typographic hierarchy instead.'
    ],
    motion_states: [
        'Use natural deceleration (cubic-bezier(0.16, 1, 0.3, 1)) — never bounce or elastic overshoot.',
        'Animate only transform and opacity; always respect prefers-reduced-motion: reduce.',
        'Design all 4 states for data & actions: Loading, Empty, Error, and Success.',
        'Ensure keyboard focus order matches visual reading order with visible :focus-visible rings.'
    ]
};

export const DESIGN_COMMANDS = {
    audit: {
        name: 'audit',
        category: 'inspect',
        summary: 'Comprehensive 5-dimension technical & aesthetic quality audit (Accessibility, Performance, Theming, Responsive, Anti-Slop).',
        checklist: [
            'Run deterministic 30-gate UI Linter (`vibe-design-harness lint <file>`)',
            'Check WCAG AA contrast ratios (4.5:1 body, 3:1 large text/UI controls)',
            'Verify DOM heading hierarchy (no skipped h1 -> h3 levels) and landmark roles',
            'Inspect responsive behavior at 320px, 768px, 1024px, and 1440px (zero horizontal overflow)',
            'Calculate Health Score (0-100) prioritized by P0 Blocking -> P1 Major -> P2 Polish'
        ],
        directive: 'Do not fix files during audit. Produce a structured diagnostic report with file:line citations, Health Score /100, and prioritized remediation steps.'
    },
    critique: {
        name: 'critique',
        category: 'inspect',
        summary: 'Holistic Design Director UX/UI critique evaluating hierarchy, focal point, emotional resonance, and AI-slop tells.',
        checklist: [
            'First Impression & Squint Test: What grabs attention in the first 50ms? Is there a clear focal point?',
            'AI Slop Detection: Check for icon-tile stacks, hero eyebrow pills, 3-equal-card rows, and startup buzzwords.',
            'Visual Direction & World Fit: Does this look designed for a real human audience or generated from a SaaS template?',
            'Cognitive Load & Friction: Where does the visitor hesitate? What container or text can be removed?',
            'Persona Perspective: Evaluate through 3 user lenses (Impatient Scanner, Cautious Buyer, Mobile Commuter).'
        ],
        directive: 'Deliver direct, constructive Art Director feedback: What Works (specific strengths) -> Priority Issues (What/Why/How to fix) -> Quick Wins.'
    },
    polish: {
        name: 'polish',
        category: 'refine',
        summary: 'Final pre-ship quality pass fixing optical alignment, micro-spacing, state completeness, and edge imperfections.',
        checklist: [
            'Optical vs Mathematical Alignment: Adjust play icons, asymmetric padding, and text baseline alignment.',
            'Micro-Spacing & Rhythm: Eliminate unintended spacing drift across sibling components.',
            'Interactive States: Verify hover, active, focus-visible, disabled, and loading transitions on every control.',
            'Content Edge Cases: Test long strings, multi-line wrapping, and missing image fallbacks.',
            'Zero Unexplained Lint Warnings: Run final deterministic lint pass.'
        ],
        directive: 'Preserve the established visual direction. Elevate execution from "functional" to "studio-crafted" through subtle, high-precision fixes.'
    },
    distill: {
        name: 'distill',
        category: 'refine',
        summary: 'Strip away unnecessary containers, decorative clutter, and redundant copy to reveal the pure structural essence.',
        checklist: [
            'Flatten Nested Containers: Remove outer card wrappers where whitespace or a single 1px divider suffices.',
            'Purge Decorative Noise: Delete floating glow blobs, fake pulsing dots, and redundant status badges.',
            'Tighten Copy by 30-50%: Cut throat-clearing intros, filler adverbs, and repeated explanations.',
            'Simplify Palette & Type: Reduce arbitrary font sizes and one-off accent swatches back to core tokens.'
        ],
        directive: 'Simplicity is subtraction, not emptiness. Every remaining border, shadow, and word must earn its place.'
    },
    bolder: {
        name: 'bolder',
        category: 'modulate',
        summary: 'Amplify safe, timid, or generic designs with decisive typographic contrast, dramatic scale, and unmistakable presence.',
        checklist: [
            'Escalate Typographic Scale: Push hero headlines to clamp(3rem, 6vw, 5.5rem) with tight tracking (-0.035em).',
            'Break Monotonous Symmetry: Replace uniform 3-column grids with asymmetric focal spans (e.g., 7/5 or 8/4 splits).',
            'Commit to Atmospheric Color: Let the primary brand surface or accent own a full section instead of tiny 1px badges.',
            'Introduce Signature Detail: Add one unforgettable bespoke interaction, editorial border grid, or monumental number.'
        ],
        directive: 'Stop hedging. Pick one dominant visual idea and execute it with total conviction while keeping body copy legible.'
    },
    quieter: {
        name: 'quieter',
        category: 'modulate',
        summary: 'Tone down visually aggressive, over-stimulated interfaces into calm, sophisticated Quiet Luxury.',
        checklist: [
            'Desaturate & Soften Contrast: Replace screaming neon accents and pitch-black #000 with warm stone, zinc, or ivory.',
            'Replace Shadows with Hairlines: Swap heavy shadow-2xl elevation for crisp 1px borders and subtle tonal shifts.',
            'Increase Breathing Room: Expand section padding by 25-40% and cap reading widths at 60ch.',
            'Calm Motion: Remove continuous animations, marquees, and aggressive hover scaling.'
        ],
        directive: 'Whisper instead of shouting. Let material quality, negative space, and typographic proportion carry the authority.'
    },
    delight: {
        name: 'delight',
        category: 'enhance',
        summary: 'Add moments of craft, tactile micro-interactions, and human warmth that make the product memorable.',
        checklist: [
            'Tactile Feedback: Add subtle active press states (active:scale-[0.98]) and magnetic/smooth hover reveals.',
            'Empty & Success State Personality: Turn dry zero-data or confirmation screens into rewarding, helpful moments.',
            'Specific Microcopy: Replace robotic labels ("Submit", "Invalid input") with warm, human guidance.',
            'Restraint Check: Ensure delight never slows down high-frequency workflows.'
        ],
        directive: 'Delight comes from unexpected care in small details — never from gimmicky confetti or slow blocking animations.'
    },
    harden: {
        name: 'harden',
        category: 'production',
        summary: 'Stress-test and bulletproof the interface against long text, i18n expansion, slow networks, and edge-case inputs.',
        checklist: [
            'Text Overflow & Wrapping: Add min-w-0, break-words, or line-clamp where user-generated or translated text can overflow.',
            'Responsive Extremes: Verify layout integrity at 320px narrow mobile and 200% browser zoom.',
            'Complete Async States: Provide skeleton/loading indicators, retryable error boundaries, and double-submit protection.',
            'Accessibility & Reduced Motion: Ensure full keyboard operability and @media (prefers-reduced-motion: reduce) fallbacks.'
        ],
        directive: 'Assume real data will be 3x longer, network requests will fail, and users will navigate by keyboard or thumb.'
    },
    animate: {
        name: 'animate',
        category: 'enhance',
        summary: 'Choreograph purposeful, GPU-accelerated motion that clarifies spatial relationships and state transitions.',
        checklist: [
            'Use Exponential Out Easing: Default to cubic-bezier(0.16, 1, 0.3, 1) for enters and 120-200ms for micro-interactions.',
            'GPU-Only Properties: Animate only transform and opacity; never animate height, width, top, or margin.',
            'Staggered Entry with Cap: Keep stagger delays <= 50ms per item and total sequence under 400ms.',
            'Mandatory Reduced-Motion Guard: Wrap non-essential motion in motion-safe: or prefers-reduced-motion checks.'
        ],
        directive: 'Every animation must explain where an element came from or confirm an action — never animate for decoration alone.'
    },
    clarify: {
        name: 'clarify',
        category: 'refine',
        summary: 'Sharpen UX copywriting, action labels, error messages, and information scent so users never have to guess.',
        checklist: [
            'Action-Specific CTAs: Replace vague "Learn More" / "Submit" with concrete outcomes ("View Pricing Matrix", "Book 15-Min Audit").',
            'Purge AI Slop Cadence: Eliminate "unleash/supercharge/empower", "Not X. Just Y.", and em-dash chains.',
            'Front-Load Key Value: Put the concrete number, benefit, or status in the first 4 words of headings and alerts.',
            'Actionable Error Copy: State clearly what happened, why, and the exact button/step to fix it.'
        ],
        directive: 'Clear writing is clear interface design. Cut jargon and write like a knowledgeable human colleague.'
    },
    adapt: {
        name: 'adapt',
        category: 'production',
        summary: 'Adapt layouts structurally across mobile, tablet, desktop, and container contexts with native ergonomics.',
        checklist: [
            'Structural Reflow (Not Just Shrinking): Collapse multi-column tables/grids into scannable mobile cards or progressive disclosures.',
            'Thumb-Zone Ergonomics: Keep primary mobile CTAs reachable and ensure >=44x44px tap targets with >=8px separation.',
            'Fluid Typography & Spacing: Use clamp() for display headings and responsive padding scales (px-4 sm:px-6 lg:px-8).',
            'Safe Area & Viewport Units: Use min-h-dvh instead of 100vh and respect env(safe-area-inset-*).'
        ],
        directive: 'Each viewport size should feel natively composed for that device rather than squeezed from desktop.'
    },
    overdrive: {
        name: 'overdrive',
        category: 'enhance',
        summary: 'Push technical UI craft to flagship levels (custom shaders, spring physics, fluid view transitions, 60fps choreography).',
        checklist: [
            'Evaluate Fit First: Confirm high-craft theatricality serves the product story (ideal for hero showcases, launches, flagship demos).',
            '60fps Performance Budget: Maintain strict frame budgets, clean up requestAnimationFrame/listeners, and pause off-screen effects.',
            'Graceful Fallback: Provide a clean static/CSS fallback for low-power devices and prefers-reduced-motion.',
            'Restraint Around Core Tasks: Keep checkout, forms, and reading areas calm while letting the hero/showcase shine.'
        ],
        directive: 'Propose 2-3 high-impact technical showcase options before implementing; execute with rock-solid 60fps discipline.'
    }
};

/**
 * List all available post-processing design commands
 */
export function listDesignCommands() {
    return Object.values(DESIGN_COMMANDS).map(cmd => ({
        name: cmd.name,
        category: cmd.category,
        summary: cmd.summary
    }));
}

/**
 * Get structured playbook & agent directive for a specific design command
 * @param {string} commandName e.g. 'polish', 'distill', 'critique', 'harden'
 */
export function getDesignCommand(commandName) {
    const key = (commandName || '').toLowerCase().trim();
    const cmd = DESIGN_COMMANDS[key];
    if (!cmd) {
        throw new Error(`Unknown design command "${commandName}". Available: ${Object.keys(DESIGN_COMMANDS).join(', ')}`);
    }
    return {
        ...cmd,
        craft_floor: CRAFT_FLOOR
    };
}

/**
 * Generate PRODUCT.md context file (paired with DESIGN.md as popularized by Impeccable)
 * @param {Object} spec Product context specification
 */
export function generateProductMD(spec = {}) {
    const name = spec.name || 'Project';
    const summary = spec.summary || 'High-trust digital product experience.';
    const audience = spec.audience || 'Decision-makers and daily practitioners who value speed, clarity, and reliability.';
    const visitorMode = spec.visitorMode || 'Persuade + Operate (Conversion clarity paired with effortless task execution)';
    const primaryAction = spec.primaryAction || 'Complete primary onboarding or conversion flow with zero friction';
    const voice = spec.voice || 'Direct, specific, warm, and authoritative — zero AI buzzwords or startup fluff';
    const nonGoals = spec.nonGoals || 'Decorative bloat, nested card matrices, fake urgency widgets, or unverified claims';

    return `# PRODUCT.md — ${name} Context & Strategy

> **Paired with \`DESIGN.md\` — Read both before designing or modifying any UI surface.**

---

## 1. 🎯 Product Purpose & Core Outcome
- **Product Name:** ${name}
- **What It Does:** ${summary}
- **Primary User Outcome:** ${primaryAction}
- **Visitor Mode:** ${visitorMode}

## 2. 👥 Target Audience & Context of Use
- **Who Uses This:** ${audience}
- **Mindset & Constraints:** Scanning quickly on mobile and desktop; low tolerance for vague marketing claims or complex navigation.

## 3. 🗣️ Brand Voice & Copywriting Guardrails
- **Tone of Voice:** ${voice}
- **Copy Rules:**
  - Lead with concrete numbers, mechanisms, and verifiable outcomes.
  - Never use AI-slop verbs (\`unleash\`, \`supercharge\`, \`revolutionize\`, \`empower\`, \`seamless\`).
  - Never use manufactured-contrast aphorisms (\`"Not a X. A Y."\`).

## 4. 🚫 Explicit Non-Goals (Anti-Bloat Boundary)
- ${nonGoals}
`;
}

export default {
    CRAFT_FLOOR,
    DESIGN_COMMANDS,
    listDesignCommands,
    getDesignCommand,
    generateProductMD
};
