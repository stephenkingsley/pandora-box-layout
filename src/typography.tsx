import type { CSSProperties } from 'react';
import { useToken } from '@dragonpass/atom-ui-mobile';
import { FONT_WEIGHT, resolveColor, type SizeToken, type WeightToken } from './tokens';

/** Typographic roles, mapped 1:1 to dp-design's seed-token type scale + foreground colours. */
export type TypographyVariant = 'title' | 'subtitle' | 'body' | 'caption';
export type TypographyAlign = 'left' | 'center' | 'right';

export interface TypographyProps {
    /** The text to render. */
    text?: string;
    /**
     * Typographic role — maps to dp-design's seed tokens (size / line-height / weight / colour),
     * read LIVE so it always matches the active dp theme.
     * @default 'body'
     */
    variant?: TypographyVariant;
    /**
     * Font-size override mapped to dp's text scale (xs→Xsm · sm→Sm · md→Default · lg→Lg · xl→Xlg) —
     * falls back to the variant.
     */
    size?: SizeToken;
    /**
     * Font-weight preset override (regular 400 / medium 500 / bold 700) — falls back to the variant.
     */
    weight?: WeightToken;
    /**
     * Text colour override — a dp colour TOKEN NAME (e.g. "linkColor", resolved live against the
     * theme) or a raw CSS colour; falls back to the variant's dp foreground token.
     */
    color?: string;
    /**
     * Horizontal alignment.
     * @default 'left'
     */
    align?: TypographyAlign;
    /**
     * Clamp to at most N lines with an ellipsis (0 = no clamp).
     * @default 0
     */
    maxLines?: number;
}

/**
 * Styled text built on dp-design's **live** seed tokens. `useToken()` returns each token as a CSS
 * custom-property reference (e.g. `textSizeXlg` → `var(--aum-text-size-xlg)`), applied directly so
 * re-skinning dp-design (its `ConfigProvider` theme) re-skins this text automatically — size,
 * line-height, colour and font-family all track the active theme. No hard-coded snapshot — which is
 * the white-label foundation (the old static table had already drifted from dp's live scale).
 *
 * `text` is a scalar prop (not a slot) → renders identically in the Puck editor and the Puck-free
 * runtime. Sizing/scaling is dp's own (the vars), so this matches dp components exactly.
 */
export function Typography(props: TypographyProps) {
    const { text, variant = 'body', size, weight, color, align = 'left', maxLines = 0 } = props;
    const { token: t } = useToken();

    // variant → dp seed tokens (each value is a `var(--aum-*)` reference, read live):
    const v = {
        title: { fs: t.textSizeXlg, lh: t.lineHeightXlg, fw: 700, c: t.fgEmphasisColor, ff: t.headingFontFamily },
        subtitle: { fs: t.textSizeDefault, lh: t.lineHeightDefault, fw: 500, c: t.fgPrimaryColor, ff: t.bodyFontFamily },
        body: { fs: t.textSizeDefault, lh: t.lineHeightDefault, fw: 400, c: t.fgSecondaryColor, ff: t.bodyFontFamily },
        caption: { fs: t.textSizeSm, lh: t.lineHeightSm, fw: 400, c: t.fgTertiaryColor, ff: t.bodyFontFamily },
    }[variant];

    // size override → dp's text scale, with the matching line-height token:
    const scale: Record<SizeToken, { fs?: string; lh?: string }> = {
        xs: { fs: t.textSizeXsm, lh: t.lineHeightXsm },
        sm: { fs: t.textSizeSm, lh: t.lineHeightSm },
        md: { fs: t.textSizeDefault, lh: t.lineHeightDefault },
        lg: { fs: t.textSizeLg, lh: t.lineHeightLg },
        xl: { fs: t.textSizeXlg, lh: t.lineHeightXlg },
    };
    const chosen = size ? scale[size] : { fs: v.fs, lh: v.lh };

    const style: CSSProperties = {
        margin: 0,
        fontFamily: [v.ff, 'system-ui', 'sans-serif'].filter(Boolean).join(', '),
        fontSize: chosen.fs,
        lineHeight: chosen.lh,
        fontWeight: weight ? FONT_WEIGHT[weight] : v.fw,
        // `color` may be a dp token NAME (e.g. "linkColor" → resolve live) or a raw CSS colour; else variant.
        color: resolveColor(color) || v.c,
        textAlign: align,
    };
    if (maxLines > 0) {
        style.display = '-webkit-box';
        style.WebkitLineClamp = maxLines;
        style.WebkitBoxOrient = 'vertical';
        style.overflow = 'hidden';
    }
    return <div style={style}>{text}</div>;
}

/** dp-design body font stack — fallback for siblings; the live family now comes from the theme. */
export const FONT_FAMILY = "'Poppins', system-ui, -apple-system, 'Segoe UI', sans-serif";
