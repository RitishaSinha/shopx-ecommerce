# ShopX — Smart E-Commerce Shopping Cart

A modern, fully responsive shopping interface where users can browse products, apply filters, add items to a cart, adjust quantities, apply discount codes, and proceed through a checkout flow, built with HTML, CSS, JAVASCRIPT & REACT(CDN).

## Live Demo
<link>

## Features Implemented

1. **Product Catalog** — 24 products across 4 categories (Electronics, Fashion, Home & Sports).
2. **Search & Filter** — Apply filter by category, max price slider or keyword search.
3. **Sort Options** — Sort by default, price (low-to-high or high-to-low) and top rated products.
4. **Shopping Cart** — Add, remove, or update item quantities with a slide-out cart panel.
5. **Discount Codes** — Apply coupon codes like (`SAVE10`, `SHOPX20`, `WELCOME15`, `FLAT50`).
6. **Budget Coach** — Live budget tracker with a progress bar and spending alerts.
7. **Checkout Flow** — Full checkout form with name, email-address, residential-address, state, PIN and various Payment methods.
8. **Live Review System** — Leave star ratings and written reviews per product, persisted in localStorage.
9. **Product Detail Modal** — View full product info + reviews(with customer name, rating and date) in a scrollable modal.
10. **Order Confirmation** — Confirm the order with a clear success message and provide a unique order ID on each purchase.
11. **Toast Notifications** — Non-intrusive feedback messages for all key actions.
12. **Fully Responsive** — Works on mobile, tablet as well as desktop.

## Technologies Used
HTML5- Page structure ||
CSS-   Styling, animations, responsive layout ||
React 18 (CDN)- UI components and state management  ||
Babel (CDN)- JSX transpilation in the browser ||
localStorage- Persisting reviews across sessions ||
Google Fonts- Syne + DM Sans typography ||

## Project Structure

```
shopx/
├── index.html       # Entry point — loads React via CDN
├── script.js        # All React components and app logic
├── style.css        # All styles and animations
├── images/          # Product images
│   ├── headphones.jpg
│   ├── watch.jpg
│   └── ... (24 product images)
└── README.md
```

## How to Run
### Open Locally (No setup needed)
1. Clone or download this repository.
2. Open `index.html` directly in any modern browser.
3. That's it — React loads via CDN, no npm or build step required.

## Discount Codes (for testing)
| Code | Discount |
|---|---|
| `SAVE10` | 10% off |
| `WELCOME15` | 15% off |
| `SHOPX20` | 20% off |
| `FLAT50` | 50% off |

## Notes
- Reviews are saved in the browser's `localStorage` — they persist across page refreshes.
- Free shipping is applied automatically on orders above ₹100.
- The project uses **React 18 via CDN** — no Node.js, npm setup, or build tools needed.

## Author
**Ritisha Sinha**  
**24BCE0301**  
*Web Programming Project*
