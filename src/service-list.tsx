import type { CSSProperties } from 'react';
import { Image } from '@dragonpass/atom-ui-mobile';
import { Typography } from './typography';
import { FONT_WEIGHT, type HeadingSizeToken, type WeightToken } from './tokens';
import { toRem } from './adapt';

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
     * Heading size preset (sm / md / lg / xl), mapped to dp's text scale.
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
 * «Available Services» template — a Typography heading above a row of fixed 304×128 service cards
 * (Typography title, description, price + struck-through original, dp-`link`-coloured CTA, dp
 * `Image` thumbnail). Every colour/size is a dp token (Typography or `var(--aum-*)`), no hard-coded
 * hex → re-skins with dp. Single-line + ellipsis per row; empty fields keep their slot.
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
        border: '1px solid var(--aum-border-default-color, #eef1f4)',
        borderRadius: toRem(14),
        boxShadow: '0 2px 10px rgba(10, 35, 51, 0.05)',
        boxSizing: 'border-box',
        overflow: 'hidden',
    };
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
        <div style={{ padding: `${toRem(16)} 0` }}>
            <div style={{ padding: `0 ${toRem(16)} ${toRem(12)}` }}>
                <Typography variant="title" size={headingSize} weight={headingWeight} text={heading} />
            </div>
            <div className="lce-hscroll" style={rowStyle}>
                {items.map((it, i) => (
                    <div key={i} onClick={it.onClick} style={{ ...cardStyle, cursor: it.onClick ? 'pointer' : undefined }}>
                        <div style={textAreaStyle}>
                            <Typography variant="title" size="md" weight={itemTitleWeight} text={it.title} maxLines={1} />
                            {/* Description: single line — overflow truncates with an ellipsis (slot reserved when empty). */}
                            <div style={{ fontSize: 'var(--aum-text-size-sm, 14px)', color: 'var(--aum-fg-secondary-color, #5A6B7E)', minHeight: toRem(18), ...ellipsis }}>{it.description}</div>
                            <div style={{ display: 'flex', alignItems: 'baseline', gap: toRem(8), minHeight: toRem(24), overflow: 'hidden' }}>
                                {it.price ? (
                                    <span style={{ fontSize: 'var(--aum-text-size-lg, 18px)', fontWeight: FONT_WEIGHT[itemPriceWeight], color: 'var(--aum-fg-emphasis-color, #0A2333)', minWidth: 0, ...ellipsis }}>{it.price}</span>
                                ) : null}
                                {it.originalPrice ? (
                                    <span style={{ fontSize: 'var(--aum-text-size-sm, 14px)', color: 'var(--aum-fg-tertiary-color, #AFAEAD)', textDecoration: 'line-through', whiteSpace: 'nowrap', flex: 'none' }}>{it.originalPrice}</span>
                                ) : null}
                            </div>
                            <span style={{ alignSelf: 'flex-start', maxWidth: '100%', display: 'inline-block', fontSize: 'var(--aum-text-size-sm, 14px)', fontWeight: FONT_WEIGHT[itemCtaWeight], color: 'var(--aum-link-color, #2563EB)', boxSizing: 'border-box', ...ellipsis, visibility: it.ctaText ? 'visible' : 'hidden' }}>{it.ctaText || ' '}</span>
                        </div>
                        <div style={imageBoxStyle}>
                            {it.image ? (
                                <Image src={it.image} alt="" width="100%" height="100%" fit="cover" style={{ display: 'block' }} />
                            ) : null}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}
