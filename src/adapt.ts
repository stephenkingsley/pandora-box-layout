/**
 * Length adaptation: convert design-spec px → rem so a component's INLINE styles scale with
 * the host page's rem system (amfe-flexible + postcss-pxtorem: `<html>` font-size = viewport/10).
 *
 * Why in JS: low-code documents are content/style-separated — copy/images/actions live in the
 * document, but sizes live in the component as inline `style`. Inline styles bypass postcss, so
 * pxtorem can't reach them and the modules would become fixed-pixel islands in a rem-scaled page.
 * Converting here against the SAME root value keeps every module in lockstep with the rest of the
 * page (the amfe-flexible max-width cap also lines up, since both read the same `<html>` baseline).
 *
 * The root value is OVERRIDABLE so it can match any consumer's postcss-pxtorem `rootValue` — or
 * the conversion can be replaced entirely (keep px, clamp, vw…). Defaults to 37.5 (375px design).
 */

const DEFAULT_ROOT = 37.5;
let rootValue = DEFAULT_ROOT;

function defaultConvert(px: number): string {
    if (!px) return '0'; // 0 stays "0" — avoids a meaningless "0rem"
    return `${+(px / rootValue).toFixed(4)}rem`;
}

let convert: (px: number) => string = defaultConvert;

/**
 * Override length adaptation globally. Call once at app startup, BEFORE first render.
 *  - `{ rootValue }` — align to your postcss-pxtorem `rootValue` (the common case).
 *  - `{ convert }`   — replace the strategy outright (e.g. `(px) => `${px}px`` to keep px).
 */
export function configureRem(opts: { rootValue?: number; convert?: (px: number) => string }): void {
    if (opts.rootValue != null) {
        rootValue = opts.rootValue;
        convert = defaultConvert; // re-bind so the new rootValue takes effect
    }
    if (opts.convert) convert = opts.convert;
}

/** Design-spec px → rem string (e.g. `18` → `"0.48rem"`). `0` stays `"0"`. */
export function toRem(px: number): string {
    return convert(px);
}
