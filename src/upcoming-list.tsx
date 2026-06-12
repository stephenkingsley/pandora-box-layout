import type { CSSProperties } from 'react';
import { Image, Tag } from '@dragonpass/atom-ui-mobile';
import { Typography } from './typography';
import { type HeadingSizeToken, type WeightToken } from './tokens';
import { toRem } from './adapt';

export interface UpcomingItem {
    /**
     * Card title (the lounge / service name).
     * @default "Example Lounge"
     */
    title?: string;
    /**
     * Location line.
     * @default "Example Airport (EXA)"
     */
    location?: string;
    /**
     * Date · time line.
     * @default "01 Sep 2026 • 10:30"
     */
    datetime?: string;
    /**
     * Status label.
     * @default "Confirmed"
     */
    status?: string;
    /**
     * Status colour tone → dp `Tag` theme.
     * @default "success"
     */
    statusTone?: 'success' | 'warning' | 'neutral';
    /** Thumbnail image. */
    image?: string;
    /** Per-card click action. */
    action?: { type: string; [key: string]: unknown };
    /** Click handler — injected by the runtime from `action` (not a builder field). */
    onClick?: () => void;
}

export interface UpcomingListProps {
    /**
     * Section heading.
     * @default "Upcoming"
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
     * Weight of each card's title (regular 400 / medium 500 / bold 700).
     * @default 'regular'
     */
    itemTitleWeight?: WeightToken;
    /**
     * "View all" link text (leave empty to hide it).
     * @default "View all"
     */
    viewAllText?: string;
    /** URL the "View all" link points to. */
    viewAllHref?: string;
    /**
     * "View all" link size preset (sm / md / lg / xl).
     * @default 'sm'
     */
    viewAllSize?: HeadingSizeToken;
    /**
     * "View all" link weight preset (regular 400 / medium 500 / bold 700).
     * @default 'medium'
     */
    viewAllWeight?: WeightToken;
    /** The booking cards. */
    items?: UpcomingItem[];
}

/** statusTone → dp Tag theme. */
const TAG_THEME = { success: 'success', warning: 'warning', neutral: 'muted' } as const;

const PinIcon = () => (
    <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" style={{ flex: 'none' }}>
        <path d="M21 10c0 6-9 12-9 12s-9-6-9-12a9 9 0 0 1 18 0Z" />
        <circle cx="12" cy="10" r="3" />
    </svg>
);
const CalIcon = () => (
    <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" style={{ flex: 'none' }}>
        <rect x="3" y="4" width="18" height="18" rx="2" />
        <path d="M16 2v4M8 2v4M3 10h18" />
    </svg>
);

/**
 * «Upcoming» template — a section header (Typography heading + count + dp-`link`-coloured "View
 * all") above a horizontal row of booking cards (Typography title, icon + meta lines, a dp `Tag`
 * status badge, a dp `Image` thumbnail). Every colour/size comes from dp tokens (Typography, dp
 * components, or `var(--aum-*)` for the inline bits) — no hard-coded hex — so it re-skins with dp.
 * The 304×128 card + fixed-skeleton layout (empty fields keep their slot) is preserved.
 */
export function UpcomingList({
    heading = 'Upcoming',
    headingSize = 'lg',
    headingWeight = 'bold',
    itemTitleWeight = 'regular',
    viewAllText = 'View all',
    viewAllHref,
    viewAllSize = 'sm',
    viewAllWeight = 'medium',
    items = [
        {
            title: 'Example Lounge',
            location: 'Example Airport (EXA)',
            datetime: '01 Sep 2026 • 10:30',
            status: 'Confirmed',
            statusTone: 'success',
        },
    ],
}: UpcomingListProps) {
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
        // Slightly tighter vertical padding so the 304×128 card gives the dp `Tag` row its full height.
        padding: `${toRem(12)} ${toRem(16)}`,
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
        height: toRem(104),
        display: 'flex',
        flexDirection: 'column',
        gap: toRem(5),
        paddingRight: toRem(8),
        boxSizing: 'border-box',
        overflow: 'hidden',
    };
    // meta rows: dp secondary-fg colour + small text token; the inline icons inherit via currentColor.
    const metaStyle: CSSProperties = {
        display: 'flex',
        alignItems: 'center',
        gap: toRem(5),
        color: 'var(--aum-fg-secondary-color, #5A6B7E)',
        fontSize: 'var(--aum-text-size-sm, 14px)',
        minHeight: toRem(18),
    };
    const metaTextStyle: CSSProperties = { minWidth: 0, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' };
    const imageBoxStyle: CSSProperties = { width: toRem(72), height: toRem(104), borderRadius: toRem(10), flex: 'none', overflow: 'hidden' };
    return (
        <div style={{ padding: `${toRem(16)} 0` }}>
            <div style={{ display: 'flex', alignItems: 'baseline', padding: `0 ${toRem(16)} ${toRem(12)}` }}>
                <div style={{ display: 'flex', alignItems: 'baseline', gap: toRem(6) }}>
                    <Typography variant="title" size={headingSize} weight={headingWeight} text={heading} />
                    <Typography variant="title" size={headingSize} weight="medium" color="var(--aum-fg-tertiary-color)" text={String(items.length)} />
                </div>
                <span style={{ flex: 1 }} />
                {viewAllText ? (
                    <a href={viewAllHref || undefined} style={{ textDecoration: 'none' }}>
                        <Typography text={viewAllText} size={viewAllSize} weight={viewAllWeight} color="var(--aum-link-color)" />
                    </a>
                ) : null}
            </div>
            <div className="lce-hscroll" style={rowStyle}>
                {items.map((it, i) => (
                    <div key={i} onClick={it.onClick} style={{ ...cardStyle, cursor: it.onClick ? 'pointer' : undefined }}>
                        <div style={textAreaStyle}>
                            <Typography variant="title" size="md" weight={itemTitleWeight} text={it.title} maxLines={1} />
                            {/* Fixed skeleton: each field keeps its slot — empty data leaves blank space, never collapses the card. */}
                            <div style={metaStyle}>{it.location ? (<><PinIcon /><span style={metaTextStyle}>{it.location}</span></>) : null}</div>
                            <div style={metaStyle}>{it.datetime ? (<><CalIcon /><span style={metaTextStyle}>{it.datetime}</span></>) : null}</div>
                            {/* Flex row (not a bare block) so the dp Tag's inline-block baseline gap doesn't inflate/clip the slot. */}
                            <div style={{ display: 'flex', alignItems: 'center', flexShrink: 0, minHeight: toRem(30) }}>
                                {it.status ? (
                                    <Tag theme={TAG_THEME[it.statusTone ?? 'success']} round>
                                        {it.status}
                                    </Tag>
                                ) : null}
                            </div>
                        </div>
                        {/* Thumbnail slot always reserved; no image → blank, so every card stays aligned. */}
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
