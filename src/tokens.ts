/**
 * Cross-platform design tokens.
 *
 * Values are unitless numbers: the web binding maps them to `px`, the (future)
 * React Native binding maps them to density-independent pixels. Components
 * reference tokens by key, never raw numbers — so a saved document stays
 * platform-agnostic and free of any CSS string.
 */

export type SpacingToken = 'none' | 'xs' | 'sm' | 'md' | 'lg' | 'xl';

/** Spacing scale, used for gap / padding. */
export const SPACING: Record<SpacingToken, number> = {
    none: 0,
    xs: 4,
    sm: 8,
    md: 16,
    lg: 24,
    xl: 32,
};

export type SizeToken = 'xs' | 'sm' | 'md' | 'lg' | 'xl';

/** Font-size scale. */
export const FONT_SIZE: Record<SizeToken, number> = {
    xs: 12,
    sm: 14,
    md: 16,
    lg: 20,
    xl: 24,
};

export type HeadingSizeToken = 'sm' | 'md' | 'lg' | 'xl';

/** Section-heading font-size presets (list templates). `lg` = dp's title size. */
export const HEADING_SIZE: Record<HeadingSizeToken, number> = {
    sm: 14,
    md: 16,
    lg: 18,
    xl: 22,
};

export type WeightToken = 'regular' | 'medium' | 'bold';

/** Font-weight scale. */
export const FONT_WEIGHT: Record<WeightToken, number> = {
    regular: 400,
    medium: 500,
    bold: 700,
};

/**
 * A dp-design colour-token NAME → its live CSS custom property, e.g.
 * `"successColor"` → `"var(--aum-success-color)"`. The editor stores semantic token NAMES
 * (white-label: the doc references the theme, not a frozen value); components resolve them at
 * render to dp's var, which the active `ConfigProvider` theme drives — so re-skinning follows.
 * Built by convention (camelCase → `--aum-kebab-case`) rather than reading the token object, so it
 * works even for tokens the object doesn't surface (e.g. the inverse foregrounds).
 */
export function dpColorVar(name: string): string {
    return `var(--aum-${name.replace(/([A-Z])/g, '-$1').toLowerCase()})`;
}

/** A value that's already a raw CSS colour / gradient (NOT a dp token name) to pass through verbatim. */
const RAW_COLOR_RE = /^(?:#|rgb|hsl|var\(|color-mix|linear-|radial-|conic-)/i;

/**
 * Resolve a colour value coming from the editor: a dp colour-token NAME (e.g. `"linkColor"`) →
 * its live theme var; a raw CSS colour or gradient → returned unchanged. `undefined` for empty.
 */
export function resolveColor(value?: string): string | undefined {
    if (!value) return undefined;
    const v = value.trim();
    if (RAW_COLOR_RE.test(v) || /gradient/i.test(v)) return value;
    return dpColorVar(v);
}
