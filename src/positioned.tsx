import type { CSSProperties, ReactNode } from 'react';
import { toRem } from './adapt';

export interface PositionedProps {
    /** Distance from the overlay's left edge, px. @default 0 */
    x?: number;
    /** Distance from the overlay's top edge, px. @default 0 */
    y?: number;
    /** Width in px. Unset → sizes to its content. */
    width?: number;
    /** Height in px. Unset → sizes to its content. */
    height?: number;
    /** A single element to place (e.g. a Typography, an Image, a Tag). */
    children?: ReactNode;
}

/**
 * Positioned block — an absolutely-placed container for FREE x/y layout inside an
 * {@link Overlay} (or any positioned ancestor). Set its `x`/`y` (and optionally
 * `width`/`height`) in px and drop one element inside; that element then floats at
 * exactly that spot over the swiper image. This is the primitive that makes the
 * overlay's content "design-canvas" free rather than edge-anchored.
 */
export function Positioned(props: PositionedProps) {
    const { x = 0, y = 0, width, height } = props;
    const style: CSSProperties = {
        position: 'absolute',
        left: toRem(x),
        top: toRem(y),
        ...(width != null ? { width: toRem(width) } : null),
        ...(height != null ? { height: toRem(height) } : null),
    };
    return (
        <div className="lce-positioned" style={style}>
            {props.children}
        </div>
    );
}
