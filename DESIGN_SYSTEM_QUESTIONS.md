# Global Luxury Design System Questions

To ensure the new "Generic Luxury" aesthetic is implemented correctly across all pages (except landing), please answer the following questions:

## 1. Typography & Hierarchy
Your current system uses **Optima Nova LT Pro** (Serif) and **Open Sauce Two** (Sans).
The example provided mentions *Playfair Display/Bodoni* and *Inter/Lato*.

**Question:** Do you want to:
- [ ] **Option A:** Keep current fonts (Optima/Open Sauce) but apply the new sizing/spacing rules (Massive thin H1s, wide tracking)?
- [ ] **Option B:** Switch to the specific fonts mentioned in the example (Playfair/Inter)?

## 2. Color Palette
Your current "Old Money" palette is warm (Cream, Sand, Warm Grey, Gold).
The "Gallery" aesthetic example is cooler/starker (Pure White, Off-White #F9F9F9, Charcoal, Deep Gunmetal).

**Question:** Which direction should we take?
- [ ] **Option A:** Keep the current **Warm/Sand** luxury palette (Warmer feel).
- [ ] **Option B:** Switch to the strict **White/Black/Charcoal** "Gallery" aesthetic (Starker, more modern gallery feel).

## 3. Spacing & Whitespace ("Radical Whitespace")
The rule is "Low Density" and "Double Padding".
- **Current Layouts:** Often use standard grid gaps (gap-4, gap-6).
- **New Rule:** We will increase this to `gap-12` or `gap-16` and padding `p-10` or `p-12`.

**Question:** Are there any specific data-heavy screens (like an order list or inventory table) where you **CANNOT** afford low density? Or should *everything* strictly follow the low density rule?
- [ ] **Strict:** Apply low density everywhere, even if it means more scrolling.
- [ ] **Hybrid:** Keep tables/data compact, but make page wrappers spacious.

## 4. Components & Interactive Elements
The example specifies "Solid rectangular buttons with sharp edges (0px border-radius) or fully pill-shaped".
Your currently have some rounded UI.

**Question:** What is your preference for shapes?
- [ ] **Sharp:** 0px border radius for cards, images, buttons (Brutalist luxury).
- [ ] **Pill:** Fully rounded buttons (Current style).
- [ ] **Soft:** Small border radius (4px-8px).

## 5. Scope
**Question:** Confirming specifically which areas to apply this to:
- App/Dashboard (`/experience/*`)? **Yes/No**
- Brand Store Pages (`/collections/*`)? **Yes/No**
- Product Detail Pages? **Yes/No**
- Auth/Login Pages? **Yes/No**

## 6. Navigation
Luxury sites often use minimal navigation to preserve whitespace.
**Question:** Should we simplify the global navigation bar to be minimal (hamburger menu or text only) on these pages to match the aesthetic?

---
*Please reply with your choices (e.g., "1A, 2B, 3-Strict, 4-Sharp...") or any specific instructions.*
