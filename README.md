# Laavvan Pherre — Custom Shopify Theme

A hand-coded **Online Store 2.0** theme (Liquid / CSS / JS) for
[laavvanpherre.myshopify.com](https://laavvanpherre.myshopify.com) — South Asian
fine-fashion jewelry, with a bridal & festive focus.

Shopify stays the backend (checkout, payments, admin, inventory). This repo is
the storefront.

## Stack

- **Liquid** — templating
- **CSS** — design tokens (CSS custom properties) wired to theme settings
- **Vanilla JS** — progressive enhancement (cart, product, menus)
- **Shopify CLI** — local dev + deploy

## Project structure

```
assets/        CSS, JS, static files served from the Shopify CDN
config/        Theme settings schema + saved values
layout/        Top-level HTML wrappers (theme, password)
locales/       Translated strings (en.default.json)
sections/      Modular, merchant-editable building blocks
  *-group.json   Header/footer section groups
snippets/      Reusable Liquid partials
templates/     JSON templates that compose sections per page type
```

## Local development

Requires the [Shopify CLI](https://shopify.dev/docs/themes/tools/cli/install).

```bash
# Authenticate + start a live-reloading dev server against the store
shopify theme dev --store laavvanpherre.myshopify.com

# Lint the theme
shopify theme check

# Push to an UNPUBLISHED theme (safe — does not touch the live store)
shopify theme push --unpublished --theme "Laavvan Pherre (dev)"

# Pull settings/content edited in the Shopify admin back into the repo
shopify theme pull
```

> Always preview on an unpublished theme first. Only publish from the Shopify
> admin (or `shopify theme push --live`) once a build is reviewed.

## Design tokens

Colors, fonts, and layout width are defined as theme settings
(`config/settings_schema.json`) and exposed to CSS as custom properties via
`snippets/css-variables.liquid`. Restyling the whole store is mostly a matter of
changing tokens — no structural edits required.

## Status

Foundation scaffold. Visual design is intentionally neutral/token-driven and is
being built out from brand samples.
