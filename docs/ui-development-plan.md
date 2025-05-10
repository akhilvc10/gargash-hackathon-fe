# Car360 – **UI Development Plan**

*Version 0.1 · May 10 2025*

---

## 1 · Module & Screen Breakdown

| #  | Module                       | Screen                | Primary Purpose                          | Wireframe / Mockup Ref |
| -- | ---------------------------- | --------------------- | ---------------------------------------- | ---------------------- |
| 1  | **Auth & On‑Boarding**       | Welcome / Splash      | Brand impression, language selection     | Figma: *Auth‑001*      |
|    |                              | Sign‑Up / OTP         | Account creation (email/phone/social)    | Figma: *Auth‑002*      |
|    |                              | KYC Capture           | ID upload, selfie, AECB consent          | Figma: *Auth‑003*      |
| 2  | **Discovery**                | Home / Explore        | Entry point to Buy, Lease, Rent tabs     | Figma: *Disc‑001*      |
|    |                              | Search Results        | Multi‑facet filters, sort                | Figma: *Disc‑002*      |
|    |                              | Vehicle Detail        | 360° media, specs, AI chat, finance calc | Figma: *Disc‑003*      |
| 3  | **Questionnaire & AI Picks** | Questionnaire Wizard  | Capture preferences for AI               | Figma: *AI‑001*        |
|    |                              | Recommendation List   | Ranked cars with explainer chips         | Figma: *AI‑002*        |
| 4  | **Checkout**                 | Finance Options       | Compare buy / lease / rent costs         | Figma: *CO‑001*        |
|    |                              | Payment & Summary     | KYC, credit pull, e‑contract, pay        | Figma: *CO‑002*        |
|    |                              | Success / Receipt     | Confirmation, next‑steps                 | Figma: *CO‑003*        |
| 5  | **Rental**                   | Rental Results        | Live availability filters                | Figma: *Rent‑001*      |
|    |                              | Booking Flow          | Dates, insurance, extras                 | Figma: *Rent‑002*      |
|    |                              | Rental Dashboard      | Extend, modify, return car               | Figma: *Rent‑003*      |
| 6  | **Lease**                    | Lease Plans           | Term & mileage sliders, preview costs    | Figma: *Lease‑001*     |
|    |                              | Lease Dashboard       | Mileage tracker, upgrade offers          | Figma: *Lease‑002*     |
| 7  | **Owner Dashboard**          | My Garage             | List of owned / leased / rented cars     | Figma: *Own‑001*       |
|    |                              | Payments              | Instalment schedule, pay now             | Figma: *Own‑002*       |
|    |                              | Documents             | Contracts, insurance PDFs                | Figma: *Own‑003*       |
|    |                              | Service & Alerts      | Predictive maintenance, bookings         | Figma: *Own‑004*       |
| 8  | **Garage Assist**            | Photo Diagnosis       | Upload / capture damage, AI quote        | Figma: *GA‑001*        |
| 9  | **Settings**                 | Profile & Preferences | Personal info, language, notif prefs     | Figma: *Set‑001*       |
|    |                              | Security              | Password, MFA, devices                   | Figma: *Set‑002*       |
| 10 | **Notifications (Global)**   | Notification Center   | All push / in‑app messages               | Figma: *Notif‑001*     |
| 11 | **Dealer Portal (Web)**      | Inventory Manager     | CRUD cars, bulk upload, status           | Figma: *Dealer‑001*    |
|    |                              | Orders & Leads        | View orders, chat with buyers            | Figma: *Dealer‑002*    |

---

## 2 · UI Component Mapping

> **Legend:** `*` Reusable across app (design‑system component)

### Global Components

* **Top App Bar \ Toolbar**\* – brand logo, global search / filters, hamburger on mobile.
* **Bottom Nav Bar (Mobile)**\* – Home, My Garage, Bookings, Chatbot, Profile.
* **Side Drawer (Web)**\* – collapsible nav for desktop / tablet.
* **Button Variants**\* – Primary, Secondary, Ghost, Destructive with icon support.
* **Input Field**\* – Text, Number, Masked (ID, phone), Select, Slider.
* **Modal/Dialog**\* – Center or bottom‑sheet (mobile) with trap‑focus.
* **Stepper**\* – On‑boarding & Questionnaire wizard.
* **Toast / Snackbar**\* – Success, Error, Warning, Info; auto‑dismiss 4 s.
* **Tag / Chip**\* – Fuel‑type, Lease‑term, etc.; selectable & removable.
* **Card Components**\* – Vehicle card, Plan card, Service card.
* **Data Table**\* – Dealer portal lists with pagination & column filters.
* **Date Range Picker**\* – Rental dates; presets: Today, Weekend, Custom.
* **Upload Dropzone**\* – Drag‑and‑drop or camera capture.

### Screen‑Specific Highlights

* **Vehicle Detail Page**

  * Image carousel (swipe, pinch‑zoom)
  * 360° spin viewer
  * Finance calculator (slider + dynamic APR)
  * Sticky CTA bar (Buy | Lease | Rent) fixed bottom on mobile
  * AI chat dock (FAB → expands)
  * Validation: ensure input sliders stay within min/max; display APR tooltip.

* **Checkout – Payment & Summary**

  * Form sections: Billing, Delivery (if any), ID verification state badge
  * Payment method accordion (saved card, Apple Pay, new card)
  * Inline errors: red helper text, aria‑live region announcements
  * Confirmation modal with order ID, PDF links.

* **Garage Assist**

  * Camera permissions prompt with fallback to upload
  * Progress bar during image analysis
  * Confidence meter badge; if < 70 % ⇒ CTA “Send to Human Advisor”
  * Quote card with part list, book‑now button.

### States & Messages

| Context        | Empty State                                    | Loading               | Error                              | Success                    |
| -------------- | ---------------------------------------------- | --------------------- | ---------------------------------- | -------------------------- |
| Search Results | Illustration + “No cars match. Reset filters.” | Skeleton cards        | Banner: “Search failed—retry.”     | —                          |
| Owner Payments | “No upcoming payments”                         | Spinner in table row  | Inline row error                   | Toast: “Payment received.” |
| Garage Assist  | “No issues detected”                           | Shimmer on image area | Red text: “Analysis failed—retry.” | Green badge: “Quote ready” |

Placeholder & microcopy examples:
`placeholder="e.g. Tesla Model Y"`
`helper="We never share your ID externally."`

---

## 3 · Layout & Responsive Design

* **8px grid** as base spacing; multiples for padding/margins (4 px fine‑tune allowed).
* **Breakpoints:**

  * Mobile ≤ 640 px
  * Tablet 641–1024 px
  * Desktop ≥ 1025 px
* **Flex / CSS‑Grid**: Auto‑fit vehicle cards to 1 col (mobile), 2 col (tablet), 4 col (desktop).
* **Fluid typography:** `clamp()` for headings.
* **Sticky interactions:** Bottom CTA bar on mobile; side summary panel on checkout desktop.
* **RTL support:**

  * `dir="rtl"` toggles; auto‑flip paddings, icons (chevrons), progress arrows.

---

## 4 · Visual Design & Theming

### Design Tokens

```css
--color-primary: #0063E5;
--color-primary-dark: #0047B3;
--color-secondary: #FF6A00;
--color-neutral-100: #F9FAFB;
--color-neutral-900: #111827;
--spacing-xs: 4px;
--spacing-sm: 8px;
--spacing-md: 16px;
--spacing-lg: 24px;
--font-base: "Inter", sans-serif;
--radius-lg: 12px;
```

> Tokens exported via *Figma Tokens* plugin for automatic handoff.

### Visual Identity Guidelines

* **Color Palette:** Blue (primary) for trust; Orange for highlights; Greens for success; Greyscale 100–900 range; follow AA contrast ≥ 4.5:1.
* **Typography:** Inter (400, 500, 700). H1 32 px, H2 24 px, body 16 px.
* **Depth & Elevation:** Shadow 2 for cards, 4 for dialogs; 2 xl rounded corners.
* **Dark Mode:** Material‑like surface elevations; swap neutrals; keep brand blue with light 80 % tint.
* **Icons:** Lucide for clarity; line 1.5 px width.
* **Accessibility:** Focus ring `2px solid var(--color-primary)`; visible on keyboard nav.

---

## 5 · UI Flow for Core Interactions

### 5.1 Create Account & On‑Board

1. **Welcome →** Choose language (EN/AR).
2. **Sign‑Up Modal →** Enter phone/email → OTP verify → Success toast.
3. **KYC Wizard (Stepper):** Upload Emirates ID (camera / upload) → Selfie capture → Consent checkboxes → Progress % bar.
4. **Dashboard Redirect**; bottom‑sheet tips.

### 5.2 Buy / Lease / Rent Car

1. **Explore Tab** → Instant search suggestions.
2. Select filters (sticky filter bar).
3. Tap vehicle card → **Vehicle Detail**.
4. Chatbot FAB → ask questions.
5. Choose transaction mode (Buy / Lease / Rent) → **Checkout**.
6. Finance calculator updates monthly.
7. **Payment Step** → HyperPay sheet → Success dialog → Receipt email.

### 5.3 Predictive Maintenance & Service

1. Telematics alert pushes “Brake pad life < 15 %”.
2. Toast deep‑links to **Service** screen.
3. Suggested garages list (distance sort).
4. Confirm booking slot → Calendar add‑to‑device.

> All flows animated via **Framer Motion** (fade‑in 150 ms, slide‑up 100 ms, ease‑in‑out), respecting `prefers‑reduced‑motion`.

---

## 6 · Filter UI Guidelines (Enterprise)

* Inline filter bar (desktop) vs. collapsible sidebar (mobile) – never overlay content.
* **Apply** & **Reset** buttons sticky bottom inside filter panel.
* Real‑time filtering with **300 ms debounce**.
* Keyboard navigation: `Tab` → focus filter group, `Arrow` keys move, `Space` select (compliant with WCAG).
* Visual cues per *filter-ui.docx* guidance (active state checkmark, hover shade) citeturn0file0.
* Preserve filter state via URL query params & local storage.

---

## 7 · State Management Strategy

* **Global:** Zustand store per domain slice (auth, inventory, cart, user).
* **Local / UI:** React Context for theme & i18n; component internal state for ephemeral UI.
* Cross‑module events via **EventEmitter** hook; memoised selectors to avoid re‑renders.

---

## 8 · Localization & Internationalization

* All strings via `react-i18next`; translation JSON files per locale.
* Numbers & currency formatted with Intl API; user locale stored in profile.
* RTL mirror with `emotion-rtl` plugin; automated LTR ↔ RTL flip.

---

## 9 · Performance & Optimization

* **Code splitting:** React Lazy route‑level; dynamic import vehicle carousel.
* **Lazy loading:** Images via `<img loading="lazy">` + blur‑up.
* **Virtualised lists:** `react-window` for search results ≥ 50 items.
* **Prefetch:** Link hover prefetch vehicle detail JSON.
* **Caching:** SWR with 5 min stale‑while‑revalidate for inventory.
* **Debounce/Throttle:** Search (300 ms), Telematics WS messages (1 s throttle).

---

## 10 · Dark Mode & Theming Variants

* Theme provider toggles CSS variables; persists in `localStorage` & OS default.
* Adjust shadows (opacity 0.6→0.9), borders (#FFFFFF1A) for dark surfaces.
* Ensure contrast ≥ AA; automated tests via `axe-core` dark snapshots.

---

## 11 · Testing & QA Readiness

| Layer                 | Tooling                        | Coverage Goal             |
| --------------------- | ------------------------------ | ------------------------- |
| **Unit**              | Vitest + React Testing Library | 80 % lines                |
| **E2E**               | Playwright cloud grid          | Core flows Buy/Lease/Rent |
| **Visual Regression** | Chromatic CI                   | Every PR screenshots      |
| **Accessibility**     | Axe‑Playwright audit           | 100 % pages pass          |
| **Performance**       | Lighthouse CI                  | PWA score ≥ 90            |

---

## 12 · Next Steps

1. Align with design team on high‑fidelity mockups & update Figma links.
2. Generate design tokens JSON & integrate with Storybook.
3. Kick‑off component library sprint (Atomic → Molecules → Organisms).
4. Set up CI pipeline (lint, test, Chromatic, Playwright) before first PR.

---

*End of UI Development Plan v0.1 — ready for review & iterations*
