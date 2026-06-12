import type { CSSProperties, ReactNode } from 'react';
import { SPACING, dpColorVar, type SpacingToken } from './tokens';
import { toRem } from './adapt';

export type OverlayPlacement = 'top' | 'center' | 'bottom';
export type OverlayAlign = 'start' | 'center' | 'end' | 'stretch';

export interface OverlayProps {
    // ── Position + size + look first (the panel-authoring essentials) ──
    /** Panel offset from the slide's left edge, px. @default 0 */
    x?: number;
    /** Panel offset from the slide's top edge, px. @default 0 */
    y?: number;
    /** Overlay panel width in px. Unset → the overlay fills the slide width. */
    width?: number;
    /** Overlay panel height in px. Unset → the overlay fills the slide height. */
    height?: number;
    /**
     * Panel background — any CSS background value: a colour incl. `rgba(...)` for
     * translucency, OR a gradient `linear-gradient(...)`. Overrides `scrim`. The editor
     * exposes this as a background picker (solid + alpha, or gradient).
     */
    background?: string;
    /** Corner radius of the panel, px. @default 0 */
    radius?: number;
    // ── Anchored-content options (only matter when NOT using free-placed Positioned) ──
    /**
     * Vertical placement of the content over the media (anchored mode — ignored
     * once children are absolutely placed via `Positioned`).
     * @default 'bottom'
     */
    placement?: OverlayPlacement;
    /**
     * Horizontal alignment of the content (anchored mode).
     * @default 'start'
     */
    align?: OverlayAlign;
    /**
     * Dark gradient scrim so overlaid text stays legible on photos (and makes
     * descendant text white). Ignored when `background` is set.
     * @default true
     */
    scrim?: boolean;
    /**
     * Inner padding (spacing token). Defaults to `none` so free-placed `Positioned`
     * blocks measure from the panel's own edge.
     * @default 'none'
     */
    padding?: SpacingToken;
    /**
     * Gap between stacked children (spacing token).
     * @default 'xs'
     */
    gap?: SpacingToken;
    /** Content placed over the media — typically `Positioned` blocks for free x/y layout. */
    children?: ReactNode;
}

const PLACE: Record<OverlayPlacement, 'flex-start' | 'center' | 'flex-end'> = {
    top: 'flex-start',
    center: 'center',
    bottom: 'flex-end',
};

const ALIGN: Record<OverlayAlign, 'flex-start' | 'center' | 'flex-end' | 'stretch'> = {
    start: 'flex-start',
    center: 'center',
    end: 'flex-end',
    stretch: 'stretch',
};

const SCRIM_GRADIENT =
    'linear-gradient(to top, rgba(0,0,0,0.66) 0%, rgba(0,0,0,0.22) 42%, rgba(0,0,0,0) 72%)';

/**
 * Cross-platform overlay descriptor: absolutely positioned over the nearest positioned
 * ancestor and flex-anchors its (non-absolute) content. Every key here is valid in BOTH
 * web CSS and React Native StyleSheet, so the same output feeds a DOM `style` or
 * `StyleSheet.create`. No CSS strings.
 */
export interface OverlayStyle {
    position: 'absolute';
    top: number;
    left: number;
    right?: number;
    bottom?: number;
    width?: number;
    height?: number;
    display: 'flex';
    flexDirection: 'column';
    justifyContent: 'flex-start' | 'center' | 'flex-end';
    alignItems: 'flex-start' | 'center' | 'flex-end' | 'stretch';
    gap: number;
    padding: number;
}

/** Translate overlay tokens → a cross-platform style descriptor. No CSS strings. */
export function resolveOverlayStyle(props: OverlayProps): OverlayStyle {
    const { placement = 'bottom', align = 'start', gap = 'xs', padding = 'none', width, height, x = 0, y = 0 } = props;
    const sized = width != null || height != null;
    return {
        position: 'absolute',
        top: y,
        left: x,
        // Fill the slide unless an explicit size is given; a sized panel anchors at (x, y).
        ...(width != null ? { width } : sized ? {} : { right: 0 }),
        ...(height != null ? { height } : sized ? {} : { bottom: 0 }),
        display: 'flex',
        flexDirection: 'column',
        justifyContent: PLACE[placement],
        alignItems: ALIGN[align],
        gap: SPACING[gap],
        padding: SPACING[padding],
    };
}

/**
 * Resolve the overlay's background. The editor stores a dp colour TOKEN NAME (e.g. "successColor"),
 * optionally with an alpha suffix ("successColor 0.6") — resolved to its live `--aum-*` var via
 * `dpColorVar` so re-skinning follows; alpha is applied with `color-mix` (it's an overlay). A raw
 * CSS value (gradient / rgba / hex / legacy `var(...)`) passes straight through.
 */
function resolveBackground(value: string | undefined): string | undefined {
    if (!value) return undefined;
    const v = value.trim();
    if (/^(?:linear-|radial-|conic-)?gradient|^color-mix|^rgb|^hsl|^#|^var\(/i.test(v)) return value;
    const [name, alphaStr] = v.split(/\s+/);
    const color = dpColorVar(name); // dp token name → its live CSS var
    const alpha = alphaStr != null && alphaStr !== '' ? Number(alphaStr) : 1;
    if (!(alpha < 1)) return color;
    return `color-mix(in srgb, ${color} ${Math.round(alpha * 100)}%, transparent)`;
}

/**
 * Overlay primitive: a configurable panel laid OVER the nearest positioned ancestor — e.g.
 * a Swiper slide's image. Configure its `width`/`height`/`x`/`y` (px), `background` (a dp colour
 * token + opacity, or a gradient) and `radius`; drop `Positioned` blocks inside to place content at
 * free x/y coordinates. With the default `scrim` (and no custom background) it paints a bottom-up
 * dark gradient and turns descendant text white for legibility over photos.
 */
export function Overlay(props: OverlayProps) {
    const { scrim = true, background, radius } = props;
    const bg = resolveBackground(background);
    const base = resolveOverlayStyle(props);
    // Background precedence: explicit `background` (token+alpha or gradient) → default scrim (legibility).
    const useScrim = scrim && !bg;
    const style: CSSProperties = {
        ...base,
        gap: toRem(base.gap),
        padding: toRem(base.padding),
        ...(base.width != null ? { width: toRem(base.width) } : null),
        ...(base.height != null ? { height: toRem(base.height) } : null),
        top: toRem(base.top),
        left: toRem(base.left),
        ...(radius ? { borderRadius: toRem(radius) } : null),
        ...(bg
            ? { background: bg }
            : useScrim
              ? { backgroundImage: SCRIM_GRADIENT, color: '#ffffff' }
              : null),
    };
    return (
        <div className="lce-overlay" style={style}>
            {props.children}
        </div>
    );
}
