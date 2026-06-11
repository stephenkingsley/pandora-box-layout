import type { CSSProperties } from 'react';
import { MediaCarousel, type MediaCarouselItem } from './media-carousel';
import { FONT_FAMILY } from './typography';
import { FONT_WEIGHT, HEADING_SIZE, type HeadingSizeToken, type WeightToken } from './tokens';
import { toRem } from './adapt';

export interface WhatsNewProps {
    /**
     * Section heading.
     * @default "What's new"
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
    /** The cards in the carousel (image + badge + title + description each). */
    items?: MediaCarouselItem[];
}

/**
 * «What's new» template — a section heading above a horizontal card carousel. A
 * self-contained module composing the heading + MediaCarousel, so ops drop it once and edit
 * the heading (text + size + weight) + cards. Renders identically in the editor and the runtime.
 */
export function WhatsNew({
    heading = "What's new",
    headingSize = 'lg',
    headingWeight = 'bold',
    items = [
        {
            src: 'https://picsum.photos/seed/dpnews1/460/280',
            badge: 'News',
            title: 'Our network is growing',
            description: 'More airports, more ways to simplify your travel.',
        },
        {
            src: 'https://picsum.photos/seed/dpnews2/460/280',
            badge: 'Product',
            title: 'Faster lounge check-in',
            description: 'Scan once at the door and walk straight in.',
        },
    ],
}: WhatsNewProps) {
    const headStyle: CSSProperties = { padding: `${toRem(16)} ${toRem(16)} ${toRem(12)}`, fontFamily: FONT_FAMILY };
    return (
        <div>
            <div style={headStyle}>
                <span style={{ fontSize: toRem(HEADING_SIZE[headingSize]), fontWeight: FONT_WEIGHT[headingWeight], color: '#0A2333' }}>{heading}</span>
            </div>
            <MediaCarousel items={items} />
        </div>
    );
}
