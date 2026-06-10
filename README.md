# pandora-box-layout

Cross-platform **layout primitives + card templates** for the Pandora Box / low-code engine.
Props-only and flexbox-token based, so the **same component tree renders on React web (`<div>`)
and React Native (`<View>`)** — no CSS strings, no `className`, no platform branches in your data.

Each component ships a web build and a `*.native` build; React Native's Metro bundler picks the
`.native` file automatically, web bundlers use the default — one import, two platforms.

## Install

```bash
npm install pandora-box-layout
# React Native only — provide the optional peers:
npm install react-native expo-linear-gradient
```

`react` is a required peer; `react-native` and `expo-linear-gradient` are **optional** peers
(needed only when rendering on native).

## Usage

```tsx
import { Flex, Card, Typography, UpcomingList } from 'pandora-box-layout';

<Flex direction="column" gap="md" padding="md">
  <Typography variant="title">Upcoming</Typography>
  <Card>
    <UpcomingList heading="Upcoming" items={items} />
  </Card>
</Flex>;
```

The very same JSX renders on web and React Native — the platform-specific binding is resolved
at build time by the bundler.

## Components

`Flex` · `Card` · `Overlay` · `Typography` · `Text` · `MediaCaption` · `MediaCarousel`
· `HeroOverview` · `WhatsNew` · `UpcomingList` · `ServiceList`

## Tokens

Layout is expressed through unitless tokens (`SPACING`: `none` `xs` `sm` `md` `lg` `xl`), mapped
to `px` on web and density-independent pixels on native — so a saved document stays
platform-agnostic.

## License

MIT
