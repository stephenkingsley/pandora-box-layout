import type { CSSProperties, ReactNode } from 'react';
import { toRem } from './adapt';

export type BoxDirection = 'row' | 'column';
export type BoxAlign = 'start' | 'center' | 'end' | 'stretch';
export type BoxJustify = 'start' | 'center' | 'end' | 'between' | 'around';

export interface BoxProps {
    /**
     * Layout direction (flex main axis).
     * @default 'column'
     */
    direction?: BoxDirection;
    /**
     * Gap between children, in px.
     * @default 0
     */
    gap?: number;
    /**
     * Cross-axis alignment of children.
     * @default 'stretch'
     */
    align?: BoxAlign;
    /**
     * Main-axis distribution of children.
     * @default 'start'
     */
    justify?: BoxJustify;
    /**
     * Wrap children onto multiple lines.
     * @default false
     */
    wrap?: boolean;
    /**
     * Inner padding, in px.
     * @default 0
     */
    padding?: number;
    /** Fixed width in px (leave empty for auto). */
    width?: number;
    /** Fixed height in px (leave empty for auto). */
    height?: number;
    /**
     * Grow to fill the parent's main axis (flex: 1).
     * @default false
     */
    grow?: boolean;
    /** Background colour (hex / rgb). */
    backgroundColor?: string;
    /** Border colour (hex / rgb). */
    borderColor?: string;
    /**
     * Border width in px.
     * @default 0
     */
    borderWidth?: number;
    /**
     * Corner radius in px.
     * @default 0
     */
    radius?: number;
    /** Nested content — drop any components in here. */
    children?: ReactNode;
    /** Click handler — wired by the runtime from a configured `action` (not a builder field). */
    onClick?: () => void;
}

const ALIGN: Record<BoxAlign, CSSProperties['alignItems']> = {
    start: 'flex-start',
    center: 'center',
    end: 'flex-end',
    stretch: 'stretch',
};
const JUSTIFY: Record<BoxJustify, CSSProperties['justifyContent']> = {
    start: 'flex-start',
    center: 'center',
    end: 'flex-end',
    between: 'space-between',
    around: 'space-around',
};

/**
 * «Box» — the universal free-composition container. A flexbox with full layout control
 * (direction / gap / align / justify / wrap), free-px sizing (width / height / padding),
 * and surface styling (background / border / radius). Drop any components into its slot to
 * compose arbitrary layouts — the primitive the curated templates are built from.
 *
 * Spatial values are px (matched to the design spec), converted via `toRem` so they still
 * scale with the host rem system (Web/RN). Typographic size stays token-based on `Typography`.
 */
export function Box({
    direction = 'column',
    gap = 0,
    align = 'stretch',
    justify = 'start',
    wrap = false,
    padding = 0,
    width,
    height,
    grow = false,
    backgroundColor,
    borderColor,
    borderWidth = 0,
    radius = 0,
    children,
    onClick,
}: BoxProps) {
    const style: CSSProperties = {
        display: 'flex',
        flexDirection: direction,
        gap: toRem(gap),
        alignItems: ALIGN[align],
        justifyContent: JUSTIFY[justify],
        flexWrap: wrap ? 'wrap' : 'nowrap',
        padding: toRem(padding),
        boxSizing: 'border-box',
        minWidth: 0,
    };
    if (width != null) style.width = toRem(width);
    if (height != null) style.height = toRem(height);
    if (grow) style.flex = 1;
    if (backgroundColor) style.background = backgroundColor;
    if (borderWidth) style.border = `${toRem(borderWidth)} solid ${borderColor || '#EEF1F4'}`;
    if (radius) {
        style.borderRadius = toRem(radius);
        style.overflow = 'hidden';
    }
    if (onClick) style.cursor = 'pointer';
    return (
        <div style={style} onClick={onClick}>
            {children}
        </div>
    );
}
