# IMPLEMENTATION PLAN - Global Luxury Aesthetic Update

## Goal Description
Refactor the entire application (excluding Landing Page) to adhere to a strict "Generic Luxury" aesthetic based on the "Radical Whitespace" and "Old Money" principles. This involves standardizing typography, spacing, colors, and component shapes across all functional pages.

## User Review Required
> [!IMPORTANT]
> **Scope:** This will affect almost every component in `components/ui` and pages in `/experience`, `/collections`, `/products`, and `/auth`.
> **Visual Change:** The app will feel significantly more spacious (lower density) and sharper (0px borders).

## Proposed Changes

### 1. Global CSS & Tailwind Config
#### [MODIFY] [globals.css](file:///c:/Users/arush/OneDrive/Documents/GitHub/platform-v5/app/globals.css) & [tailwind.config.ts](file:///c:/Users/arush/OneDrive/Documents/GitHub/platform-v5/tailwind.config.ts)
- **Objective:** Update base theme variables and utility classes.
- **Actions:**
    - update defaults to use `gap-12`/`p-12` standards.
    - Set standard border radius to `0px` globally for specific components.
    - Define new typography classes for "Massive Thin H1s" (`text-5xl font-light tracking-wide`).

### 2. UI Component Refactor (The Foundation)
All base UI components must be updated to enforce the new rules by default.

#### [MODIFY] [components/ui](file:///c:/Users/arush/OneDrive/Documents/GitHub/platform-v5/components/ui)
- **Button.tsx:** Enforce `rounded-none` (Sharp) or `rounded-full` (Pill) if strictly requested, but user said "Sharp". So `rounded-none`. Update padding to `px-8 py-4` (Double standard).
- **Container.tsx:** Update default max-width and padding to ensure "15-20% negative space".
- **Card/Panel Components:** Remove shadows, generic borders `border-[0.5px] border-warm-grey`, `rounded-none`.
- **Inputs/Forms:** `rounded-none`, `border-b` only styles (minimalist forms) or sharp rectangular inputs.

### 3. Page Layouts & Wrappers
#### [MODIFY] [app/experience/*](file:///c:/Users/arush/OneDrive/Documents/GitHub/platform-v5/app/experience) (Dashboard)
- Update page containers to use "Low Density" spacing.
- Increase gap between header, content, and footer.

#### [MODIFY] [app/experience/brand/[slug]](file:///c:/Users/arush/OneDrive/Documents/GitHub/platform-v5/app/experience/brand) (Brand Store)
- Apply "Gallery" aesthetic: Large hero images, sparse text, massive headings.

#### [MODIFY] [app/experience/products/[slug]](file:///c:/Users/arush/OneDrive/Documents/GitHub/platform-v5/app/experience/products) (Product Details)
- Refactor product grid and info section for maximum breathing room.

#### [MODIFY] [app/auth/*](file:///c:/Users/arush/OneDrive/Documents/GitHub/platform-v5/app/auth)
- Center forms in a large whitespace field. Minimalist styling.

### 4. Navigation
#### [MODIFY] [components/layout/Navbar.tsx](file:///c:/Users/arush/OneDrive/Documents/GitHub/platform-v5/components/layout/Navbar.tsx)
- Simplify to a minimal bar.
- Use wide tracking for links.
- Potentially switch to Hamburger menu for cleaner look if feasible, or just minimal text links.

## Verification Plan

### Automated Tests
- None specific for visual design.

### Manual Verification
- **Visual Check:** Navigate to Dashboard, Brand Page, Product Page, Sample Crate, Login.
- **Criteria:**
    - Is there massive whitespace (120px+ sections)?
    - Are borders sharp (0px radius)?
    - Is typography thin and widely spaced?
    - Are colors consistent with "Warm/Sand" palette?
    - Is the "Proceed to Checkout" button still visible and styled correctly?
