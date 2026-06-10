import type { CSSProperties } from 'react';
import { toRem } from './adapt';

export interface MediaCaptionProps {
    /** Pill label shown top-left over the image (e.g. "News"). */
    badge?: string;
    /** Title shown bottom-left (single line, ellipsised). */
    title?: string;
    /** Description under the title (single line, ellipsised). */
    description?: string;
}

const gradient =
    'linear-gradient(180deg, rgba(0,0,0,0) 7.34%, rgba(0,0,0,0.30) 49.31%, rgba(0,0,0,0.75) 91.28%)';

/**
 * Caption overlay for an image card — a dark bottom-up gradient scrim with a glassy
 * badge top-left and a white title + description bottom-left. Designed to sit in a
 * Swiper slide's `content` (over the slide image), matching dp's "What's new" /
 * lounge-carousel cards.
 *
 * `badge` / `title` / `description` are SCALAR props (not slots), so the component is
 * self-contained: it renders identically in the Puck editor and the runtime. Styles are
 * built at render time so `configureRem` overrides apply (see adapt.ts).
 */
export function MediaCaption({ badge, title, description }: MediaCaptionProps) {
    const pillStyle: CSSProperties = {
        padding: `${toRem(5)} ${toRem(12)}`,
        background: 'rgba(0,0,0,0.40)',
        backdropFilter: 'blur(12px)',
        borderRadius: toRem(100),
        fontSize: toRem(12),
        lineHeight: toRem(18),
        color: '#fefdfd',
        whiteSpace: 'nowrap',
    };
    const titleStyle: CSSProperties = {
        margin: 0,
        fontFamily: "'Cabin', 'Poppins', system-ui, sans-serif",
        fontSize: toRem(20),
        lineHeight: toRem(30),
        fontWeight: 500,
        color: '#ececec',
        whiteSpace: 'nowrap',
        overflow: 'hidden',
        textOverflow: 'ellipsis',
    };
    const descStyle: CSSProperties = {
        margin: `${toRem(4)} 0 0`,
        fontSize: toRem(12),
        lineHeight: toRem(18),
        color: '#ececec',
        overflow: 'hidden',
        textOverflow: 'ellipsis',
        whiteSpace: 'nowrap',
    };
    const root: CSSProperties = {
        position: 'absolute',
        inset: 0,
        borderRadius: 'inherit',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        padding: toRem(16),
        backgroundImage: gradient,
    };
    return (
        <div className="lce-overlay" style={root}>
            <div style={{ display: 'flex', gap: toRem(8) }}>
                {badge ? <span style={pillStyle}>{badge}</span> : null}
            </div>
            <div>
                {title ? <p style={titleStyle}>{title}</p> : null}
                {description ? <p style={descStyle}>{description}</p> : null}
            </div>
        </div>
    );
}
