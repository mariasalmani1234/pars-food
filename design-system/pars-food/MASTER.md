# Pars Food design system

Direction: modern, warm, food-first Persian interface. The original pink remains recognizable; dark rose is used where contrast is required.

## Tokens

- Accent: #FF4F9A. Action/text: #C52269. Ink: #20283A. Navy: #17263D.
- Canvas: #FFFAFD. Surface: #FFFFFF. Blush: #FFEDF4. Muted text: #655E6C. Border: #EADFE6. Success: #146C47.
- Vazirmatn variable, locally bundled from Google Fonts under OFL1.1. Body16px; supporting12–14px; homepage heading38–56px. Persian copy, RTL, localized visible counts and ratings.
- Eight-pixel spacing rhythm. Container1264px including32px desktop gutters,18px mobile. Radii12px controls/19–20px cards. Minimum44px interactive controls.
- Normal text contrast4.5:1. Focus3px rose. Native links/forms and labeled SVG icons. Honor reduced motion, including smooth scrolling.

## Composition and behavior

- Compact shared header, search-first hero, concise categories, live restaurants, short ordering explanation, factual footer.
- Preserve real restaurant photographs and data. No fabricated ratings/counts/promises, inert favorite buttons or fake support routes.
-150–220ms feedback: focus border, arrow movement, subtle card lift/image zoom. No hidden hover-only information.
- Loading/empty/error/populated states are explicit; errors include retry.

## Staged roadmap

1. Complete: typography/tokens, header/footer, homepage search, compact categories and shared restaurant cards.
2. Complete: restaurant results and menu: search/category/open filters, result counts and reset, compact restaurant identity, food search, quantity controls and global basket summary.
3. Complete: cart, authentication and checkout: compact item review, shared food subtotal, form-first auth, safe destination continuity and accessible shipping validation.
4. Complete: order history, profile and management panels: consistent statuses, data hierarchy and responsive records.
5. Complete: final responsive and keyboard audit, shared CSS cleanup, zero build warnings with the original budgets, and removal of the test suite after validation as requested.

## Inspiration and provenance

Independent Angular/CSS implementation inspired by Uiverse search/CTA focus feedback (https://uiverse.io/alexruix/evil-parrot-25 and https://uiverse.io/neerajbaniwal/hungry-mule-59) and21st active capsule navigation/hover surfaces (https://21st.dev/@educalvolpz/components/animated-tabs and https://21st.dev/@serafimcloud/components/hover-effect). No external component source copied and no React/Tailwind runtime added.

Existing project photography is reused. Font source: https://github.com/google/fonts/tree/main/ofl/vazirmatn ; license in src/assets/fonts/OFL.txt.

## Restaurant discovery and menu patterns

- Search and category chips keep clear active states; homepage q/category deep links remain valid, and clear filters resets URL and controls.
- Restaurant identity is compact and only shows available metadata. Unknown delivery times are omitted.
- Food cards use nearby price/quantity controls and flexible descriptions. Closed/unavailable foods cannot increase; existing items can still decrease.
- The basket summary always represents the whole basket, including mixed restaurants. Mobile uses a bottom bar with safe-area/footer space and focus reveal above it.
- The pizza-special legacy image path now resolves to the existing clean margarita photo rather than the watermarked asset. Missing burger/chicken photographs retain the generic plate fallback.

## Purchase flow patterns

- Cart review shows unit and line prices beside44px quantity controls. The compact mobile summary comes before rows, keeping the continuation action early without a fixed overlay.
- Shared purchase steps identify cart, account and delivery information. Totals describe food prices only; no shipping/payment data is invented.
- Login/registration use a focused shared shell, local field errors, first-invalid focus, proper autocomplete and optional password visibility. Checkout destinations are sanitized and preserved through registration.
- Checkout keeps the delivery form early, with item review on desktop and a compact subtotal before mobile submit. Catalog/POST failures preserve inputs and basket; changed prices need explicit reconfirmation.
- Successful order submission consumes only the submitted snapshot quantities so additions made while awaiting a response are retained.

## Account and management patterns

- Shared compact workspace headers and order records keep all five order statuses explicit. Order dates use the Persian calendar in Asia/Tehran; quantities, counts and values use Persian digits.
- Order history filters stay scoped to the signed-in user. Profile metrics and recent orders appear only after successful loading; cancelled orders are excluded from the clearly labeled order value.
- Admin sections provide read-only users, restaurants and orders with real search and filters. Passwords never enter the displayed user records. Numeric search accepts Persian/Arabic digits and grouping separators.
- Restaurant management keeps assigned-account scope, menu editing and deletion confirmation. Mobile task shortcuts jump to and focus the menu or food field; editing uses the same reduced-motion-aware focus behavior.
- Category, restaurant, menu and order-stat requests have independent loading/error/retry states. Failed saves retain entered fields. Late responses cannot replace a newly selected restaurant; mutations lock repeat submission and preserve existing rating/availability.

## Final polish

- Shared action, search, select, chip, form, empty-state and purchase-layout classes live in src/styles.css. Page-specific styling stays beside each component; no extra cosmetic components were added for style budgets.
- Long account and food names wrap without hiding totals. Menu quantity changes retain keyboard focus, and the management add shortcut starts a new food draft.
- Restaurant lookup failures distinguish missing restaurants from retryable menu/category failures. All routes were checked at320,390,768,1024 and1440px, including populated and empty states.
- The87-case regression suite passed before its files and harness were removed. Future validation uses production builds and the documented manual application flow.
