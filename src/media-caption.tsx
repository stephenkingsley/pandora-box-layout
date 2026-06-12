import type { CSSProperties } from 'react';
import { Tag } from '@dragonpass/atom-ui-mobile';
import { Typography } from './typography';
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
 * Caption overlay for an image card — a dark bottom-up scrim (legibility) with a dp `Tag`
 * badge top-left and a title + description bottom-left. The badge re-skins with dp's tag
 * theme; the text uses dp-token sizes/weights via `Typography` but stays white for legibility
 * over the photo (an over-image colour is functional, not a brand token — like the scrim).
 *
 * `badge` / `title` / `description` are SCALAR props (not slots) → renders identically in the
 * Puck editor and the runtime.
 */
export function MediaCaption({ badge, title, description }: MediaCaptionProps) {
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
                {badge ? (
                    <Tag theme="muted" round>
                        {badge}
                    </Tag>
                ) : null}
            </div>
            <div>
                {title ? <Typography variant="subtitle" text={title} color="#ffffff" maxLines={1} /> : null}
                {description ? <Typography variant="caption" text={description} color="#ffffff" maxLines={1} /> : null}
            </div>
        </div>
    );
}
