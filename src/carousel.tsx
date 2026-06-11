import { useRef, useState, type CSSProperties, type ReactNode } from 'react';
import { toRem } from './adapt';

export interface CarouselSlide {
    /** Full-bleed slide image. */
    image?: string;
    /**
     * Overlay content — dropped ON TOP of the image. Put an `Overlay` (placement / scrim) with a
     * `Typography` caption here for the «custom content» label, or any components you like.
     */
    content?: ReactNode;
}

export interface CarouselProps {
    /**
     * Slide height in px.
     * @default 180
     */
    height?: number;
    /**
     * Corner radius in px.
     * @default 0
     */
    radius?: number;
    /**
     * Show pagination dots.
     * @default true
     */
    dots?: boolean;
    /** The slides — each one an image with optional overlay content. */
    slides?: CarouselSlide[];
}

/**
 * «Carousel» — a lightweight, free-composition image swiper. Each slide is a full-bleed image
 * with an overlay-content SLOT (drop an `Overlay` + `Typography` for a caption, or anything else),
 * plus built-in horizontal swipe (scroll-snap) and pagination dots. The slide is a positioned
 * box, so an `Overlay` inside `content` anchors to it.
 *
 * Sizes are px (via `toRem`, so still rem-scaled). Unlike the dp `Swiper`, this is self-contained
 * (no antd-mobile / cssinjs) — it renders identically in the editor canvas and the runtime.
 */
export function Carousel({ height = 180, radius = 0, dots = true, slides = [] }: CarouselProps) {
    const [active, setActive] = useState(0);
    const trackRef = useRef<HTMLDivElement>(null);

    const onScroll = () => {
        const el = trackRef.current;
        if (!el || !el.clientWidth) return;
        const i = Math.round(el.scrollLeft / el.clientWidth);
        if (i !== active) setActive(i);
    };

    const trackStyle: CSSProperties = {
        display: 'flex',
        overflowX: 'auto',
        scrollSnapType: 'x mandatory',
        scrollbarWidth: 'none',
        WebkitOverflowScrolling: 'touch',
    };
    const slideStyle: CSSProperties = {
        position: 'relative',
        flex: '0 0 100%',
        height: toRem(height),
        scrollSnapAlign: 'start',
        overflow: 'hidden',
    };

    return (
        <div style={{ position: 'relative', borderRadius: toRem(radius), overflow: 'hidden' }}>
            <div ref={trackRef} onScroll={onScroll} style={trackStyle} className="lce-hscroll">
                {slides.map((s, i) => (
                    <div key={i} style={slideStyle}>
                        {s.image ? (
                            <img
                                src={s.image}
                                alt=""
                                style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
                            />
                        ) : null}
                        {s.content}
                    </div>
                ))}
            </div>
            {dots && slides.length > 1 ? (
                <div style={{ position: 'absolute', bottom: toRem(8), left: 0, right: 0, display: 'flex', justifyContent: 'center', gap: toRem(6), pointerEvents: 'none' }}>
                    {slides.map((_, i) => (
                        <span
                            key={i}
                            style={{
                                width: toRem(6),
                                height: toRem(6),
                                borderRadius: '50%',
                                background: i === active ? '#ffffff' : 'rgba(255,255,255,0.5)',
                            }}
                        />
                    ))}
                </div>
            ) : null}
        </div>
    );
}
