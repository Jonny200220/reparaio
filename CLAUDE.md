# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

@AGENTS.md

## Project status

`reparaio` is an Expo SDK 58 app (React Native 0.88, React 19.3, TypeScript strict) implementing "Arreglo", a reverse-auction app for home repairs (plumbing/electrical, Mexico, MXN). The six design screens `1a`–`1f` are built with mock data; there is no backend, auth, real payments or live map yet (HANDOFF §6).

- `design/HANDOFF.md` — the source of truth: tokens, typography (Bricolage Grotesque + JetBrains Mono), radii, spacing, screens, navigation flow, offer/probability logic for `1c`, and the data model.
- `design/arreglo-diseno.html` — exported design file used only as a source of exact inline style values (it does not open in a browser; HANDOFF §1 explains its syntax). Never implement the iPhone frame or fake status bar.

## Commands

npm is the package manager (`package-lock.json`); use `npx`, not `bunx`.

```bash
npm start                 # expo start (also: npm run android | ios | web)
npm run lint              # expo lint (eslint-config-expo, flat config)
npx tsc --noEmit          # typecheck
npx expo install <pkg>    # add dependencies (SDK-compatible versions)
```

No test runner is configured yet (no Jest or test files).

## Architecture

- **Routing** (Expo Router, `src/app/`): the root `_layout.tsx` loads fonts (holds the splash until ready), wraps everything in `RequestProvider`, and renders a headerless Stack with two children:
  - `(tabs)/` — JS tabs from `expo-router/js-tabs` with the custom `TabBar` (`index` = 1a Home, `services`, `account`; the last two are placeholders not in the design).
  - `request/` — the request flow Stack: `describe` (1b) → `offer` (1c, always dark) → `bids` (1d) → `tracking` (1e) → `payment` (1f). Paying calls `router.dismissTo('/')`.
- **Flow state**: `src/features/request/request-context.tsx` holds the in-progress `ServiceRequest` and the accepted `Bid` shared across flow screens. `mock-data.ts` holds every mock (user, contractors, `buildBids(offer)`, materials). `offer-math.ts` is the pure port of the 1c prototype formula (probability, colors, hint, delta, slider position) — a placeholder that should come from a backend in production.
- **Design tokens**: `src/theme/tokens.ts` (`colors`, `type`, `radii`, `spacing`, `font`). Fonts are static files, so weight is chosen through `fontFamily` (`font.ui(700)`, `font.mono(500)`), never `fontWeight`. Letter spacing from the design (em) is pre-converted to px.
- **Text**: always render text through `components/ui/app-text.tsx` (`AppText`) so the custom font is applied; plain `Text` falls back to the system font.
- **Components**: `components/ui/` holds generic pieces (StickyCta, Chip, SegmentedControl, Stepper, OfferSlider, ProgressBar, StepProgress, StarRating, StepHeader, StripedPlaceholder, TabBar); `components/request/` holds domain pieces (CategoryCard, BidCard, CountdownBadge, RouteMap, …); `components/icons/` holds the design's SVG icons (`react-native-svg`).
- **Animations** use Reanimated 4 CSS-style transitions (`transitionProperty`/`transitionDuration` on `Animated.View`) to mirror the design's CSS transitions.
- **Path aliases** (`tsconfig.json`): `@/*` → `src/*`, `@/assets/*` → `assets/*`.
- **app.json experiments**: `typedRoutes` and `reactCompiler` are enabled (avoid manual `useMemo`/`useCallback`). Web output is `server`.
- `ios/` and `android/` are not committed — native config goes through `app.json` and config plugins (see AGENTS.md).

## Language

UI copy and mock data in the design are in Spanish (Mexico); code, identifiers, and comments are in English.
