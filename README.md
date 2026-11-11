# Dođi i vidi optika: webshop frontend, phase 1

This is the design preview for **Dođi i vidi optika**, an optician in Belgrade since 1987. It uses Next.js 16 and Tailwind 4, and it follows the folder and component structure of the official Payload 3 ecommerce template (`templates/ecommerce`), so the developer can drop it in with few changes.

- **Navigation and catalog structure:** modelled on vistaexpert.it. That covers the mega-menus (Pol / Tip / Oblik / Brend), the collection page with faceted filters, sorting ("Redosled") and pagination, the card layout, and the footer.
- **Product page:** frame measurements modelled on firmoo.it.
- **Eye-test booking:** modelled on visionottica.it.
- **Wordmark:** an eye chart in Cyrillic, ДОЂИ / ИВИДИ / ОПТИКА / ОД 1987 (`src/components/EyeChart.tsx`), set in Golos Text.
- **Interface language:** Serbian (Latin).

## Run

```bash
cp .env.example .env   # fill in DATABASE_URL (Neon) and PAYLOAD_SECRET
npm install
npm run dev            # site: http://localhost:3000 · admin: http://localhost:3000/admin
```

## Payload CMS

- **Admin:** `/admin`. The first visit creates the first admin user.
- **Collections:** Proizvodi (products), Brendovi (brands), Slike (media) and Korisnici (users). They're defined in `src/collections/*`; the config is `src/payload.config.ts`.
- **Database:** Neon Postgres, through `DATABASE_URL`. Migrations live in `src/migrations` and run automatically when the production server starts (`prodMigrations`).
- **Images:** Vercel Blob, through `BLOB_READ_WRITE_TOKEN`. When that's missing, files are stored locally in dev.
- **Sample catalog:** while logged in, open `/api/seed?potvrdi=da` to import the preview brands and products into an empty database. It's safe to run twice.
- **After changing a collection:** run `npm run generate:types`, `npm run generate:importmap` and `npm run migrate:create <name>`, then commit the new migration.
- **Frontend:** the shop pages still read the sample data in `src/lib/data.ts`. Switching them to Payload's Local API is the next step.

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

## Real photos and brand logos

- **Product photos:** put them in `public/products/<product-slug>/1.jpg, 2.jpg …`. The product slug is the last part of the product URL. They replace the drawn placeholders on the next build (`scripts/scan-assets.mjs` runs before `dev` and `build`).
- **Brand logos:** put them in `public/brands/<brand-slug>.svg`, for example `ray-ban.svg` or `tom-ford.svg`. Use the official files from the brands' retailer kits. Until a file is there, the name is set in type.
- **Brand tiers:** `src/lib/brands.ts` holds the luxury, engineering, everyday and house tiers. The Brendovi menu and page read from it.

## Placeholders

- The product images in `public/media` are generated SVGs from `scripts/gen-media.mjs`. Real photos go into Payload Media.
- Brands and model names are real, but sizes, colours, prices, address and phone number are sample content.
- Contact lenses and accessories show a "coming soon online" state.

## Open items

- Payment provider for Serbia.
- Prescription lens configurator: use, prescription, lens type, thickness, review.
- Real brand list and price ranges from the shop.
