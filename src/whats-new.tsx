import type { CSSProperties } from 'react';
import { MediaCarousel, type MediaCarouselItem } from './media-carousel';
import { Typography } from './typography';
import { type HeadingSizeToken, type WeightToken } from './tokens';
import { toRem } from './adapt';

export interface WhatsNewProps {
    /**
     * Section heading.
     * @default "What's new"
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
    /** The cards in the carousel (image + badge + title + description each). */
    items?: MediaCarouselItem[];
}

/**
 * «What's new» template — a section heading (dp `Typography`, emphasis colour + size/weight live
 * from the dp theme) above a horizontal card carousel. Self-contained module; renders identically
 * in the editor and the runtime.
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
    const headStyle: CSSProperties = { padding: `${toRem(16)} ${toRem(16)} ${toRem(12)}` };
    return (
        <div>
            <div style={headStyle}>
                <Typography variant="title" text={heading} size={headingSize} weight={headingWeight} />
            </div>
            <MediaCarousel items={items} />
        </div>
    );
}
