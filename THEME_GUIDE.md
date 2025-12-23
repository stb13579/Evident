# Evident Frontend Theme Guide

Use these rules to align your Vite + React + Chakra + SaaS UI app to the Evident marketing site.

## Core palette
- `nearBlack`: `#0B0B0B` (primary text, icons)
- `midGray`: `#6B6B6B` (secondary text, labels)
- `lightGray`: `#E5E5E5` (borders, dividers, subtle surfaces)
- `nearWhite`: `#FEFEFE` (backgrounds)
- Accent is neutral: prefer `nearBlack` instead of color; avoid saturated hues.

## Typography
- Primary font: Manrope (Google). Fallbacks: `system-ui, -apple-system, sans-serif`.
- Heading line-heights: base `1.15`, tighten to `1.1` on large screens.
- Weight: 600 for headings, 400–500 for body, 600 for buttons/labels.

## Layout & spacing
- Max content width: `1100–1200px` for main columns.
- Section padding: mobile `py-12 px-4`, tablet `py-16`, desktop `py-20`. Use `py-*` inside cards; reserve `mt-*` only for spacing between stacked sections.
- Cards: 24–32px padding, 16–24px gaps, 16–24px radius. Border `lightGray`. Light shadow only on light mode; skip heavy blur in dark mode.
- Background: near-white with a faint radial gradient (optional) `#ffffff → #fefefe 55% → #e5e5e5 90%`. Dark mode background `#0b0b0b → #0f0f0f → #1a1a1a`.

## Component rules
- Buttons (primary): near-black background, white text. Hover: slightly darker (`#1a1a1a`). Dark mode: lighter neutral (`#3a3a3a` hover `#4a4a4a`). Rounded-full or 10–12px radius. Focus ring 2px near-black.
- Text buttons/links: near-black text, underline with 4px offset. Hover: darker neutral. Dark mode: `midGray` text, hover white.
- Badges/labels: uppercase, tracking wide, `midGray` text, no fill.
- Cards: white/near-white surface, `lightGray` border. Dark mode: `#0f0f0f` surface, `#1f1f1f` border.
- Lists/pills: light background (near-white) with subtle inset shadow; dark mode: bordered, no inner shadow.
- Icons: use Lucide line icons at 20–24px in `nearBlack`/`midGray`; avoid colored glyphs.

## Theming in Chakra
Create an app theme that mirrors the above:

```ts
// frontend/src/theme/index.ts
import { extendTheme, ThemeConfig } from "@chakra-ui/react";

const config: ThemeConfig = {
  initialColorMode: "system",
  useSystemColorMode: true
};

const colors = {
  brand: {
    black: "#0B0B0B",
    gray: "#6B6B6B",
    light: "#E5E5E5",
    white: "#FEFEFE"
  }
};

const fonts = {
  heading: "Manrope, system-ui, sans-serif",
  body: "Manrope, system-ui, sans-serif"
};

const styles = {
  global: {
    body: {
      bg: "brand.white",
      color: "brand.black",
      minHeight: "100vh",
      transition: "background-color 0.2s ease",
      _dark: { bg: "#0b0b0b", color: "white" }
    }
  }
};

const components = {
  Button: {
    baseStyle: {
      fontWeight: 600,
      borderRadius: "full",
      _focusVisible: { boxShadow: "0 0 0 2px #0B0B0B" }
    },
    variants: {
      solid: {
        bg: "brand.black",
        color: "white",
        _hover: { bg: "#1a1a1a" },
        _dark: { bg: "#3a3a3a", _hover: { bg: "#4a4a4a" } }
      },
      ghost: {
        color: "brand.black",
        textDecoration: "underline",
        textUnderlineOffset: "4px",
        _hover: { color: "#1a1a1a", bg: "transparent" },
        _dark: { color: "brand.light", _hover: { color: "white" } }
      }
    },
    defaultProps: { variant: "solid" }
  },
  Card: {
    baseStyle: {
      bg: "white",
      borderWidth: "1px",
      borderColor: "brand.light",
      borderRadius: "24px",
      boxShadow: "0 10px 30px rgba(15,23,42,0.05)",
      _dark: {
        bg: "#0f0f0f",
        borderColor: "#1f1f1f",
        boxShadow: "none"
      }
    }
  }
};

export const theme = extendTheme({ config, colors, fonts, styles, components });
```

Wire this into `main.tsx` with `ChakraProvider` and `SaasProvider` (ensure Saas UI respects color mode).

## Theme toggle
- Use `ColorModeScript` from Chakra in `index.html`.
- Use Chakra’s `useColorMode` for toggling; persist automatically via Chakra. If you need a custom control, mirror the site: neutral icon (☾ for light mode, ☀ for dark) that flips color with the theme, no emoji color.
- Respect system preference on first load; allow manual override.

## Surfaces & routing
- Page shells: top header with logo (use `/Logo.svg` light, `/Logo-dark.svg` dark), theme toggle on the right.
- Footer: privacy/terms/contact links, `No user-level tracking.` note.
- Constrain content to center column; use `Stack`/`VStack` with `spacing={6}` inside cards, `spacing={10-16}` between sections.

## Forms & inputs
- Inputs/selects: border `lightGray`, radius 10–12px, padding 12–14px. Focus ring 2px near-black; dark mode border `#2a2a2a`, focus ring `#3a3a3a`.
- Labels: `midGray`, 12–13px, medium weight.

## Motion & icons
- Keep motion minimal: small fades/slides at 150–200ms with Framer Motion; no parallax.
- Use Lucide with neutral stroke colors; size 20–24px.

## Language & tone
- Favor wording from the site: “accounts”, “product usage”, “signals”, “visibility”, “confidence”.
- Avoid: “tracking”, “analytics dashboard”, “IP intelligence”.

## QA checklist
- Light/dark mode parity for text, buttons, cards, links, and email links.
- Buttons maintain contrast: background vs text meets WCAG.
- Radial background (if used) only on root layout; cards stay solid.
- Header/footer present on all routes; toggle works on every page.
