# Dođi i vidi optika: webshop frontend, phase 1

This is the design preview for **Dođi i vidi optika**, an optician in Belgrade since 1987. It uses Next.js 16 and Tailwind 4, and it follows the folder and component structure of the official Payload 3 ecommerce template (`templates/ecommerce`), so the developer can drop it in with few changes.

- **Navigation and catalog structure:** modelled on vistaexpert.it. That covers the mega-menus (Pol / Tip / Oblik / Brend), the collection page with faceted filters, sorting ("Redosled") and pagination, the card layout, and the footer.
- **Product page:** frame measurements modelled on firmoo.it.
- **Eye-test booking:** modelled on visionottica.it.
- **Wordmark:** an eye chart in Cyrillic, ДОЂИ / ИВИДИ / ОПТИКА / ОД 1987 (`src/components/EyeChart.tsx`), set in Golos Text.
- **Interface language:** Serbian (Latin).

## Run

```bash
npm install
npm run dev        # http://localhost:3000
npm run preview    # static export to /out (the shareable preview)
```

## Routes

| Route | Page |
|---|---|
| `/` | Home: hero, bestsellers, shop by shape, prescription message, brands, new arrivals, booking |
| `/kolekcije/[handle]` | Collection pages: `suncane-naocare`, `naocare`, `akcija`, `kontaktna-sociva`, `dodaci`, plus one per brand. Mega-menu links pass `?pol=`, `?oblik=`, `?brend=`, `?polarizovane=da`, `?dioptrija=da` and `?sort=` |
| `/proizvodi/[slug]` | Product: one model in one colour, with colour siblings, lens option, measurements and details |
| `/brendovi` | Brand index |
| `/zakazi-pregled` | Eye-test booking (Payload: Form Builder plugin) |
| `/placanje` | Checkout placeholder |

## Where things map in the Payload template

| This repo | Payload ecommerce template | Notes |
|---|---|---|
| `src/app/(app)/globals.css` | same | Holds all tokens: colours, type, spacing. Replace the template's @theme block. |
| `src/app/(app)/layout.tsx` | same | Keep the template's `<Providers>`. Swap the Google Fonts `<link>` for `next/font`. |
| `src/providers/Cart.tsx` | `useCart` from `@payloadcms/plugin-ecommerce/client/react` | **Delete this file in Payload.** It is a mock with the same surface. The only difference is that the real `addItem` takes IDs. |
| `src/lib/types.ts` | `src/payload-types.ts` | It uses the same field names (`gallery`, `variants.docs`, `enableVariants`, `priceInRSD`). Eyewear `attributes` (brand, model, colour code, type, gender, shape, frame colour, material, lens colour, polarised, Rx-suitable, measurements, stock) become Product fields, and the filters run on them. |
| `src/lib/data.ts` | `payload.find(...)` | Mock catalog of 47 products (one model in one colour each; colour siblings share `model`). Each function has a comment naming its Payload query. |
| `src/lib/site.ts` | `header` / `footer` globals | Mega-menu structure, announcements, footer columns and collection definitions. |
| `src/components/Header` | `src/components/Header` | Announcement bar, logo, search, booking, account, wishlist and bag, then the main menu with mega-menus. Includes the mobile menu. |
| `src/components/Footer` | `src/components/Footer` | Trust strip, address, newsletter and three link columns. |
| `src/components/collection/CollectionView.tsx` | `shop/page.tsx` | Breadcrumb, faceted filters with counts, active chips, sort, pagination and a mobile filter drawer. Filtering runs client-side here; in Payload it becomes `where` and `sort` queries. |
| `src/components/ProductCard` | `ProductGridItem` | Brand, model and colour code, price with crossed-out original, badge, colour siblings. |
| `src/components/product/ProductDetail.tsx` | `product/*` + `Cart/AddToCart` | Gallery, colour siblings, lens option, measurements block, details and delivery. |
| `src/components/Cart/CartModal.tsx` | same | Right-hand drawer with a free-delivery progress bar. |
| `src/components/BookingForm.tsx` | Form Builder | Service, date and time slot, name and phone. |
| `src/blocks/RenderBlocks.tsx`, `src/heros/HighImpact` | `src/blocks/*`, `src/heros/*` | Home page blocks. |

## Placeholders

- The product images in `public/media` are generated SVGs from `scripts/gen-media.mjs`. Real photos go into Payload Media.
- The brands, model codes, prices, address and phone number are sample content.
- Contact lenses and accessories show a "coming soon online" state.

## Open items

- Payment provider for Serbia.
- Prescription lens configurator: use, prescription, lens type, thickness, review.
- Real brand list and price ranges from the shop.
