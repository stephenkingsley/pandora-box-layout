/**
 * Ambient declarations so the `*.native.tsx` files compile WITHOUT pulling the heavy
 * react-native / expo toolchains into THIS package's build. They are declared as OPTIONAL
 * peerDependencies — the consuming app provides the real implementations at runtime.
 *
 * On web, bundlers resolve the plain `*.tsx` and never import these modules. On React Native,
 * Metro resolves the `*.native` files and the real `react-native` / `expo-linear-gradient`
 * are present in the host app.
 */
declare module 'react-native';
declare module 'react-native-svg';
declare module 'expo-linear-gradient';

/**
 * dp-design's theme hook (web). Declared here so THIS package's `tsc` build doesn't pull the
 * heavy atom-ui-mobile tree — the consuming app already depends on atom-ui-mobile and provides
 * the real implementation at runtime. Reading these LIVE seed tokens (instead of hard-coding a
 * snapshot) is what makes the styled components re-skin with dp-design — the white-label core.
 */
declare module '@dragonpass/atom-ui-mobile' {
    import type { FC, ReactNode, CSSProperties } from 'react';
    /** Resolved dp seed tokens as CSS-value strings (e.g. textSizeXlg "18px", fgEmphasisColor "#0A2333"). */
    export const useToken: () => { token: Record<string, string> };
    /** dp Image — themed image with object-fit, fallback and a loading skeleton. */
    export const Image: FC<{
        src?: string;
        alt?: string;
        width?: number | string;
        height?: number | string;
        fit?: 'contain' | 'cover' | 'fill' | 'none' | 'scale-down';
        fallback?: ReactNode;
        showSkeleton?: boolean;
        style?: CSSProperties;
        className?: string;
    }>;
    /** dp Tag — themed pill for status / badges. */
    export const Tag: FC<{
        theme?: 'primary' | 'info' | 'muted' | 'success' | 'danger' | 'warning';
        round?: boolean;
        size?: 'medium' | 'small';
        children?: ReactNode;
        style?: CSSProperties;
        className?: string;
    }>;
    /** dp Swiper — image carousel; `indicator` is a render-fn or `false` to hide. Loose by design. */
    export const Swiper: FC<{
        imagesList?: Array<{ src?: string; content?: ReactNode }>;
        width?: number | string;
        height?: number | string;
        imageFit?: 'contain' | 'cover' | 'fill' | 'none' | 'scale-down';
        indicator?: false | ((total: number, current: number) => ReactNode);
        loop?: boolean;
        autoplay?: boolean;
        autoplayInterval?: number;
        [key: string]: unknown;
    }>;
}
