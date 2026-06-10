import type { CSSProperties } from 'react';
import { toRem } from './adapt';
import { FONT_FAMILY } from './typography';
import { FONT_WEIGHT, HEADING_SIZE, type HeadingSizeToken, type WeightToken } from './tokens';

export interface ServiceItem {
    /**
     * Service title.
     * @default "Fast Track"
     */
    title?: string;
    /**
     * Short description.
     * @default "More airports, more ways to simplify your travel."
     */
    description?: string;
    /**
     * Current price.
     * @default "$20"
     */
    price?: string;
    /**
     * Original (struck-through) price.
     * @default "$36"
     */
    originalPrice?: string;
    /**
     * Call-to-action link text.
     * @default "Book now"
     */
    ctaText?: string;
    /** Thumbnail image. */
    image?: string;
    /** Per-card click action (the CTA / whole card). */
    action?: { type: string; [key: string]: unknown };
    /** Click handler — injected by the runtime from `action` (not a builder field). */
    onClick?: () => void;
}

export interface ServiceListProps {
    /**
     * Section heading.
     * @default "Available Services"
     */
    heading?: string;
    /**
     * Heading size preset (sm 14 / md 16 / lg 18 / xl 22).
     * @default 'lg'
     */
    headingSize?: HeadingSizeToken;
    /**
     * Heading weight preset (regular 400 / medium 500 / bold 700).
     * @default 'bold'
     */
    headingWeight?: WeightToken;
    /**
     * Weight of each card's title.
     * @default 'regular'
     */
    itemTitleWeight?: WeightToken;
    /**
     * Weight of each card's price.
     * @default 'regular'
     */
    itemPriceWeight?: WeightToken;
    /**
     * Weight of each card's CTA text.
     * @default 'regular'
     */
    itemCtaWeight?: WeightToken;
    /** The service cards. */
    items?: ServiceItem[];
}

/**
 * «Available Services» template — a heading above a horizontal row of service cards
 * (title, description, price + struck-through original price, CTA link, thumbnail).
 * Self-contained; each card carries an optional per-card click action (the CTA).
 *
 * Styles are built at render time so inline px → rem via `toRem` honours `configureRem`.
 */
export function ServiceList({
    heading = 'Available Services',
    headingSize = 'lg',
    headingWeight = 'bold',
    itemTitleWeight = 'regular',
    itemPriceWeight = 'regular',
    itemCtaWeight = 'regular',
    items = [
        {
            title: 'Fast Track',
            description: 'More airports, more ways to simplify your travel.',
            price: '$20',
            originalPrice: '$36',
            ctaText: 'Book now',
        },
    ],
}: ServiceListProps) {
    const rowStyle: CSSProperties = {
        display: 'flex',
        gap: toRem(12),
        overflowX: 'auto',
        padding: `0 ${toRem(16)} ${toRem(6)}`,
        scrollSnapType: 'x mandatory',
        // Keeps the mandatory snap from auto-scrolling past the padding (see upcoming-list).
        scrollPaddingLeft: toRem(16),
        scrollbarWidth: 'none',
    };
    const cardStyle: CSSProperties = {
        flex: '0 0 86%',
        scrollSnapAlign: 'start',
        display: 'flex',
        gap: toRem(12),
        padding: toRem(14),
        background: '#fff',
        border: '1px solid #EEF1F4',
        borderRadius: toRem(14),
        boxShadow: '0 2px 10px rgba(10, 35, 51, 0.05)',
        boxSizing: 'border-box',
    };
    return (
        <div style={{ padding: `${toRem(16)} 0`, fontFamily: FONT_FAMILY }}>
            <div style={{ fontSize: toRem(HEADING_SIZE[headingSize]), fontWeight: FONT_WEIGHT[headingWeight], color: '#0A2333', padding: `0 ${toRem(16)} ${toRem(12)}` }}>{heading}</div>
            <div className="lce-hscroll" style={rowStyle}>
                {items.map((it, i) => (
                    <div key={i} onClick={it.onClick} style={{ ...cardStyle, cursor: it.onClick ? 'pointer' : undefined }}>
                        <div style={{ flex: 1, minWidth: 0, display: 'flex', flexDirection: 'column', gap: toRem(5) }}>
                            <div style={{ fontSize: toRem(16), fontWeight: FONT_WEIGHT[itemTitleWeight], color: '#0A2333' }}>{it.title}</div>
                            {it.description ? (
                                <div style={{ fontSize: toRem(13), color: '#5A6B7E', lineHeight: 1.4 }}>{it.description}</div>
                            ) : null}
                            <div style={{ display: 'flex', alignItems: 'baseline', gap: toRem(8), marginTop: toRem(2) }}>
                                {it.price ? <span style={{ fontSize: toRem(18), fontWeight: FONT_WEIGHT[itemPriceWeight], color: '#0A2333' }}>{it.price}</span> : null}
                                {it.originalPrice ? (
                                    <span style={{ fontSize: toRem(14), color: '#AFAEAD', textDecoration: 'line-through' }}>{it.originalPrice}</span>
                                ) : null}
                            </div>
                            {it.ctaText ? (
                                <span style={{ marginTop: toRem(4), fontSize: toRem(14), fontWeight: FONT_WEIGHT[itemCtaWeight], color: '#2563EB' }}>{it.ctaText}</span>
                            ) : null}
                        </div>
                        {it.image ? (
                            <img
                                src={it.image}
                                alt=""
                                style={{ width: toRem(84), height: toRem(84), objectFit: 'cover', borderRadius: toRem(10), flex: 'none', alignSelf: 'center' }}
                            />
                        ) : null}
                    </div>
                ))}
            </div>
        </div>
    );
}
