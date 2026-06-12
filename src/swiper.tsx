import type { ReactNode } from 'react';
import { Swiper as DpSwiper } from '@dragonpass/atom-ui-mobile';
import { toRem } from './adapt';

export interface SwiperSlide {
    /** Slide background image URL. */
    src?: string;
    /** Overlay content placed over the image — drop an `Overlay` here for free x/y layout. */
    content?: ReactNode;
}

export interface SwiperProps {
    /** The slides — each a full-bleed image with an optional overlay. */
    imagesList?: SwiperSlide[];
    /**
     * Slide height in px (the image fills the width).
     * @default 180
     */
    height?: number;
    /**
     * How each image fills its slide.
     * @default 'cover'
     */
    imageFit?: 'cover' | 'contain' | 'fill';
    /**
     * Show the pagination dots under the carousel.
     * @default true
     */
    dots?: boolean;
    /**
     * Loop back to the first slide after the last.
     * @default false
     */
    loop?: boolean;
    /**
     * Auto-advance interval in ms (0 = no autoplay).
     * @default 0
     */
    autoplayInterval?: number;
}

/**
 * Swiper — a horizontal image carousel on dp-design's `Swiper`. Each slide is a full-bleed image
 * (passed `width="100%"`, so it fills the slide — this avoids dp `Image`'s numeric `window/375`
 * scaling, which otherwise blows a `width:375` up to ~961px and makes the next slide peek). An
 * optional `Overlay` per slide gives free x/y content. `dots` toggles the dp pagination indicator
 * (its `indicator` is a render-function, so the builder can't bind it directly — this boolean does).
 * White-label: renders the LIVE dp Swiper, so re-skinning dp re-skins this.
 */
export function Swiper({
    imagesList = [],
    height = 180,
    imageFit = 'cover',
    dots = true,
    loop = false,
    autoplayInterval = 0,
}: SwiperProps) {
    return (
        <DpSwiper
            imagesList={imagesList}
            width="100%"
            height={toRem(height)}
            imageFit={imageFit}
            indicator={dots ? undefined : false}
            loop={loop}
            autoplay={autoplayInterval > 0}
            autoplayInterval={autoplayInterval > 0 ? autoplayInterval : undefined}
        />
    );
}
