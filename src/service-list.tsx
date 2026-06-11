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
 * «Available Services» template — a heading above a horizontal row of fixed 304×128 service cards
 * (title, description, price + struck-through original price, CTA link, 72×96 thumbnail). Every
 * line is single-line and ellipsises on overflow; empty fields keep their slot so cards stay
 * aligned. Self-contained; each card carries an optional per-card click action (the CTA).
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
        flex: `0 0 ${toRem(304)}`,
        width: toRem(304),
        height: toRem(128),
        scrollSnapAlign: 'start',
        display: 'flex',
        padding: toRem(16),
        background: '#fff',
        border: '1px solid #EEF1F4',
        borderRadius: toRem(14),
        boxShadow: '0 2px 10px rgba(10, 35, 51, 0.05)',
        boxSizing: 'border-box',
        overflow: 'hidden',
    };
    // Left text column — 200×96 within the 304×128 card; every row single-line + ellipsis.
    const textAreaStyle: CSSProperties = {
        flex: 1,
        minWidth: 0,
        height: toRem(96),
        display: 'flex',
        flexDirection: 'column',
        gap: toRem(4),
        paddingRight: toRem(8),
        boxSizing: 'border-box',
        overflow: 'hidden',
    };
    const ellipsis: CSSProperties = { whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' };
    const imageBoxStyle: CSSProperties = { width: toRem(72), height: toRem(96), borderRadius: toRem(10), flex: 'none', overflow: 'hidden' };
    return (
        <div style={{ padding: `${toRem(16)} 0`, fontFamily: FONT_FAMILY }}>
            <div style={{ fontSize: toRem(HEADING_SIZE[headingSize]), fontWeight: FONT_WEIGHT[headingWeight], color: '#0A2333', padding: `0 ${toRem(16)} ${toRem(12)}` }}>{heading}</div>
            <div className="lce-hscroll" style={rowStyle}>
                {items.map((it, i) => (
                    <div key={i} onClick={it.onClick} style={{ ...cardStyle, cursor: it.onClick ? 'pointer' : undefined }}>
                        <div style={textAreaStyle}>
                            <div style={{ fontSize: toRem(16), lineHeight: toRem(20), fontWeight: FONT_WEIGHT[itemTitleWeight], color: '#0A2333', ...ellipsis }}>{it.title}</div>
                            {/* Description: single line — overflow truncates with an ellipsis (slot reserved when empty). */}
                            <div style={{ fontSize: toRem(13), color: '#5A6B7E', minHeight: toRem(18), ...ellipsis }}>{it.description}</div>
                            <div style={{ display: 'flex', alignItems: 'baseline', gap: toRem(8), minHeight: toRem(24), overflow: 'hidden' }}>
                                {it.price ? <span style={{ fontSize: toRem(18), fontWeight: FONT_WEIGHT[itemPriceWeight], color: '#0A2333', minWidth: 0, ...ellipsis }}>{it.price}</span> : null}
                                {it.originalPrice ? (
                                    <span style={{ fontSize: toRem(14), color: '#AFAEAD', textDecoration: 'line-through', whiteSpace: 'nowrap', flex: 'none' }}>{it.originalPrice}</span>
                                ) : null}
                            </div>
                            <span style={{ alignSelf: 'flex-start', maxWidth: '100%', display: 'inline-block', fontSize: toRem(14), fontWeight: FONT_WEIGHT[itemCtaWeight], color: '#2563EB', boxSizing: 'border-box', ...ellipsis, visibility: it.ctaText ? 'visible' : 'hidden' }}>{it.ctaText || ' '}</span>
                        </div>
                        <div style={imageBoxStyle}>
                            {it.image ? (
                                <img src={it.image} alt="" style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }} />
                            ) : null}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}
