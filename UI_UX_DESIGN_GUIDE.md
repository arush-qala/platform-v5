# 🎨 UI/UX DESIGN GUIDE FOR QALA PLATFORM
## A Non-Designer's Guide to Communicating Design with AI

---

## 📚 TABLE OF CONTENTS

1. [Understanding Design Fundamentals](#-part-1-understanding-design-fundamentals)
2. [Your Current Design System](#-part-2-your-current-design-system)
3. [How to Communicate Design to Cursor](#-part-3-how-to-communicate-design-to-cursor)
4. [Typography Guide](#-part-4-typography-guide)
5. [Color Theory Made Simple](#-part-5-color-theory-made-simple)
6. [Spacing & Layout Rules](#-part-6-spacing--layout-rules)
7. [Component Design Patterns](#-part-7-component-design-patterns)
8. [Finding & Using Design Inspiration](#-part-8-finding--using-design-inspiration)
9. [Prompt Templates for Cursor](#-part-9-prompt-templates-for-cursor)
10. [Design Checklist](#-part-10-design-checklist)

---

# 🎯 PART 1: UNDERSTANDING DESIGN FUNDAMENTALS

## The 4 Pillars of Good UI Design

### 1️⃣ HIERARCHY (What's Most Important?)

```
VISUAL HIERARCHY = What users see FIRST, SECOND, THIRD...

Example - Product Page:
┌────────────────────────────────────────┐
│                                        │
│   MAISON SOLÈNE          ← Brand (small, subtle)
│                                        │
│   Silk Maxi Dress        ← Product Name (LARGEST)
│                                        │
│   $1,200                 ← Price (prominent)
│                                        │
│   A flowing silhouette   ← Description (readable)
│   crafted from pure...                 │
│                                        │
│   [Add to Inquiry]       ← CTA Button (stands out)
│                                        │
└────────────────────────────────────────┘

Rule: Size + Color + Position = Importance
```

**How to tell Cursor:**
> "Make the product name the largest text on the page. The price should be prominent but smaller than the product name. The description should be comfortable reading size."

---

### 2️⃣ CONSISTENCY (Same Things Look the Same)

```
CONSISTENT:                    INCONSISTENT (BAD):
┌──────────────┐               ┌──────────────┐
│ [Button]     │               │ [Button]     │
│ [Button]     │               │ (button)     │
│ [Button]     │               │ «Button»     │
└──────────────┘               └──────────────┘

All buttons same style         Different styles = confusing
```

**How to tell Cursor:**
> "Use the same button style throughout the site. Primary buttons should be gold with dark text. Secondary buttons should be outlined."

---

### 3️⃣ WHITESPACE (Empty Space is Good!)

```
CRAMPED (BAD):                 BREATHING ROOM (GOOD):
┌──────────────────┐           ┌──────────────────┐
│Title             │           │                  │
│DescriptionPrice  │           │  Title           │
│Button            │           │                  │
│AnotherSection    │           │  Description     │
└──────────────────┘           │                  │
                               │  Price           │
                               │                  │
                               │  [Button]        │
                               │                  │
                               └──────────────────┘

Luxury = Space               Cheap = Cramped
```

**How to tell Cursor:**
> "Add generous spacing between sections. This is a luxury brand - use whitespace liberally. Each section should have breathing room."

---

### 4️⃣ ALIGNMENT (Everything Lines Up)

```
MISALIGNED (BAD):              ALIGNED (GOOD):
┌──────────────────┐           ┌──────────────────┐
│    Title         │           │  Title           │
│ Description      │           │  Description     │
│      Price       │           │  Price           │
│   [Button]       │           │  [Button]        │
└──────────────────┘           └──────────────────┘

Elements scattered             Everything on same line
```

**How to tell Cursor:**
> "Left-align all text in this section. Make sure the title, description, and button all start at the same horizontal position."

---

## The Luxury Design Formula

Your platform is for **luxury fashion**. Here's what luxury looks like:

| Element | Cheap/Generic | Luxury/Premium |
|---------|--------------|----------------|
| **Colors** | Bright, many colors | Muted, limited palette |
| **Fonts** | Sans-serif, bold | Serif, elegant, thin |
| **Spacing** | Tight, cramped | Generous, breathing |
| **Images** | Small, many | Large, hero images |
| **Text** | Lots of text | Minimal, curated |
| **Animation** | Fast, bouncy | Slow, smooth, subtle |
| **Buttons** | Bright colors, rounded | Subtle, refined |
| **Layout** | Busy, cluttered | Clean, focused |

---

# 🎨 PART 2: YOUR CURRENT DESIGN SYSTEM

## What You Already Have (from globals.css)

### Your Color Palette:

```
PRIMARY COLORS (Base):
┌─────────────────────────────────────────────────────────────┐
│                                                             │
│  CREAM         IVORY         SAND          CHARCOAL        │
│  #FAF8F5       #FFFEF9       #E8E2D5       #2C2C2C         │
│  ████████      ████████      ████████      ████████        │
│  Background    Highlights    Borders       Text            │
│                                                             │
└─────────────────────────────────────────────────────────────┘

ACCENT COLORS:
┌─────────────────────────────────────────────────────────────┐
│                                                             │
│  GOLD          MUTED ROSE    SAGE          WARM GRAY       │
│  #B8956A       #D4ABA4       #9CAA9E       #8B8680         │
│  ████████      ████████      ████████      ████████        │
│  CTAs/Links    Feminine      Eco/Nature    Subtle text     │
│                                                             │
└─────────────────────────────────────────────────────────────┘
```

### Your Typography:

```
HEADINGS: Cormorant Garamond (Elegant Serif)
─────────────────────────────────────────────

Aa Bb Cc Dd Ee Ff Gg
The Quick Brown Fox Jumps Over The Lazy Dog

Use for: Page titles, brand names, section headers
Feel: Classic, timeless, luxury


BODY TEXT: Inter (Clean Sans-Serif)
─────────────────────────────────────────────

Aa Bb Cc Dd Ee Ff Gg
The quick brown fox jumps over the lazy dog

Use for: Descriptions, paragraphs, UI elements
Feel: Modern, readable, professional
```

---

# 💬 PART 3: HOW TO COMMUNICATE DESIGN TO CURSOR

## ❌ BAD Ways to Ask (Vague):

```
"Make it look better"
"Make it more modern"
"Make it prettier"
"I don't like it"
"Make it pop"
"Make it luxury"
```

**Why these fail:** Too vague. Cursor doesn't know WHAT to change or HOW.

---

## ✅ GOOD Ways to Ask (Specific):

### Template 1: Reference-Based Request

```
"I want this section to look like [WEBSITE URL].
Specifically:
- The large hero image that takes full screen
- The text overlay positioned bottom-left
- The fade-in animation on scroll
- The minimal navigation with just logo and menu icon"
```

### Template 2: Component-Specific Request

```
"For the product card component:
- Image should be 4:5 aspect ratio (portrait)
- Product name in Cormorant Garamond, 18px
- Price in Inter, 14px, gold color (#B8956A)
- Hover effect: slight zoom on image (1.05 scale)
- 16px padding inside the card
- Subtle shadow on hover"
```

### Template 3: Feeling + Specifics

```
"This page should feel calm and luxurious. To achieve this:
- Use cream background (#FAF8F5)
- Large images with lots of whitespace around them
- Slow, smooth animations (0.6s duration)
- Minimal text - only essential information
- Typography should be light weight (300-400)"
```

### Template 4: Problem + Solution

```
"Problem: The current layout feels cramped and cheap.

Solution I want:
- Increase spacing between sections to 120px
- Make images larger (at least 50% of viewport width)
- Reduce the amount of text visible at once
- Add more padding inside cards (32px instead of 16px)"
```

---

## 🎯 THE MAGIC FORMULA FOR DESIGN REQUESTS:

```
WHAT + WHERE + HOW + WHY (optional)

Example:
"Change the button color (WHAT)
 in the product details section (WHERE)
 to gold #B8956A with white text (HOW)
 because it needs to stand out more as the primary action (WHY)"
```

---

## 📝 DESIGN REQUEST TEMPLATES

### For Colors:
```
"Change the [element] color to [hex code or color name].
Current: [what it is now]
New: [what you want]
Reason: [why - optional]"

Example:
"Change the header background color to cream (#FAF8F5).
Current: White (#FFFFFF)
New: Cream (#FAF8F5)
Reason: Matches our luxury aesthetic better"
```

### For Typography:
```
"For [element/component]:
- Font family: [font name]
- Font size: [size in px or rem]
- Font weight: [100-900 or light/regular/bold]
- Line height: [number or percentage]
- Letter spacing: [normal or value]
- Color: [hex code]"

Example:
"For the main page title:
- Font family: Cormorant Garamond
- Font size: 48px on desktop, 32px on mobile
- Font weight: 300 (light)
- Line height: 1.2
- Letter spacing: 0.02em
- Color: Charcoal (#2C2C2C)"
```

### For Spacing:
```
"Add [amount] of [margin/padding] to the [top/bottom/left/right/all sides]
of [element/component]."

Example:
"Add 80px of margin to the top and bottom of each section.
Add 24px of padding inside each product card."
```

### For Layout:
```
"Arrange [elements] in a [grid/flexbox/columns].
- Number of columns: [number] on desktop, [number] on mobile
- Gap between items: [amount]
- Alignment: [left/center/right]"

Example:
"Arrange the product cards in a grid.
- 4 columns on desktop, 2 on tablet, 1 on mobile
- 32px gap between cards
- Center the grid on the page"
```

### For Animations:
```
"Add [animation type] to [element] when [trigger].
- Duration: [time in seconds]
- Easing: [ease/ease-in/ease-out/ease-in-out]
- Delay: [time if needed]"

Example:
"Add a fade-in animation to product cards when they enter the viewport.
- Duration: 0.6 seconds
- Easing: ease-out
- Stagger each card by 0.1 seconds"
```

---

# 📝 PART 4: TYPOGRAPHY GUIDE

## Font Size Scale (Use This!)

```
DESKTOP SIZES:
────────────────────────────────────────────────────────

Hero Title (H1)     │ 64-96px  │ "MAISON SOLÈNE"
Page Title (H2)     │ 48-64px  │ "Our Collections"
Section Title (H3)  │ 32-40px  │ "Summer 2024"
Card Title (H4)     │ 24-28px  │ "Silk Maxi Dress"
Subtitle            │ 18-20px  │ "Parisian Elegance"
Body Text           │ 16-18px  │ Descriptions, paragraphs
Small Text          │ 14px     │ Captions, metadata
Tiny Text           │ 12px     │ Legal, timestamps

MOBILE SIZES (Reduce by ~25%):
────────────────────────────────────────────────────────

Hero Title (H1)     │ 40-56px
Page Title (H2)     │ 32-40px
Section Title (H3)  │ 24-32px
Card Title (H4)     │ 20-24px
Body Text           │ 16px (keep same!)
Small Text          │ 14px (keep same!)
```

## Font Weight Guide

```
WEIGHT SCALE:
────────────────────────────────────────────────────────

100 - Thin        │ Rarely use (hard to read)
200 - Extra Light │ Large headlines only
300 - Light       │ ★ LUXURY HEADLINES - elegant, refined
400 - Regular     │ ★ BODY TEXT - readable
500 - Medium      │ Emphasis, subheadings
600 - Semi-Bold   │ Buttons, important labels
700 - Bold        │ Strong emphasis (use sparingly)
800 - Extra Bold  │ Rarely use (feels heavy)
900 - Black       │ Rarely use (feels aggressive)

LUXURY TIP: Use lighter weights (300-400) for elegance.
            Heavy weights feel "loud" and less refined.
```

## Line Height Guide

```
LINE HEIGHT (Space between lines):
────────────────────────────────────────────────────────

Headlines:  1.1 - 1.2  │ Tighter, more impactful
Subheads:   1.2 - 1.3  │ Slightly tighter
Body Text:  1.5 - 1.7  │ ★ COMFORTABLE READING
Small Text: 1.4 - 1.5  │ Slightly tighter

Example:
"Make the product description have a line-height of 1.6
for comfortable reading."
```

## Letter Spacing Guide

```
LETTER SPACING (Space between letters):
────────────────────────────────────────────────────────

Tight:    -0.02em  │ Large headlines (brings letters together)
Normal:   0        │ Body text (default)
Relaxed:  0.02em   │ Subheadings, elegant feel
Wide:     0.05em   │ ALL CAPS TEXT, labels
Very Wide: 0.1em+  │ LUXURY BRAND NAMES, navigation

LUXURY TIP: Add letter-spacing to uppercase text.
            "MAISON SOLÈNE" with 0.1em spacing looks premium.
```

---

# 🎨 PART 5: COLOR THEORY MADE SIMPLE

## Your Palette Usage Guide

```
┌─────────────────────────────────────────────────────────────┐
│                   COLOR USAGE RULES                         │
├─────────────────────────────────────────────────────────────┤
│                                                             │
│  CREAM (#FAF8F5) - 60% of your design                      │
│  ─────────────────────────────────────                      │
│  Use for: Page backgrounds, card backgrounds                │
│  Feel: Warm, inviting, luxurious                           │
│                                                             │
│  CHARCOAL (#2C2C2C) - 30% of your design                   │
│  ─────────────────────────────────────                      │
│  Use for: Main text, headings, important elements          │
│  Feel: Sophisticated, readable, grounded                   │
│                                                             │
│  GOLD (#B8956A) - 10% of your design                       │
│  ─────────────────────────────────────                      │
│  Use for: CTAs, links, accents, highlights                 │
│  Feel: Premium, attention-grabbing, luxurious              │
│                                                             │
└─────────────────────────────────────────────────────────────┘

THE 60-30-10 RULE:
60% - Primary/Background color (Cream)
30% - Secondary color (Charcoal for text)
10% - Accent color (Gold for highlights)
```

## When to Use Each Color

| Color | Use For | Don't Use For |
|-------|---------|---------------|
| **Cream #FAF8F5** | Backgrounds, large areas | Small text |
| **Ivory #FFFEF9** | Highlights, hover states | Main backgrounds |
| **Sand #E8E2D5** | Borders, dividers, subtle backgrounds | Text |
| **Charcoal #2C2C2C** | Headings, body text, icons | Backgrounds |
| **Gold #B8956A** | Buttons, links, accents | Large areas, body text |
| **Muted Rose #D4ABA4** | Feminine accents, tags | Primary actions |
| **Sage #9CAA9E** | Eco badges, nature themes | Primary actions |
| **Warm Gray #8B8680** | Secondary text, captions | Headlines |

## Color Combinations That Work

```
COMBINATION 1: Classic Luxury
Background: Cream (#FAF8F5)
Text: Charcoal (#2C2C2C)
Accent: Gold (#B8956A)

COMBINATION 2: Soft & Feminine
Background: Ivory (#FFFEF9)
Text: Charcoal (#2C2C2C)
Accent: Muted Rose (#D4ABA4)

COMBINATION 3: Nature & Sustainability
Background: Cream (#FAF8F5)
Text: Charcoal (#2C2C2C)
Accent: Sage (#9CAA9E)

COMBINATION 4: Bold & Editorial
Background: Charcoal (#2C2C2C)
Text: Cream (#FAF8F5)
Accent: Gold (#B8956A)
```

---

# 📐 PART 6: SPACING & LAYOUT RULES

## The 8-Point Grid System

```
ALL SPACING SHOULD BE MULTIPLES OF 8:

8px   │ ▪     │ Tiny gaps (icon to text)
16px  │ ▪▪    │ Small gaps (between related items)
24px  │ ▪▪▪   │ Medium gaps (card padding)
32px  │ ▪▪▪▪  │ Large gaps (between components)
48px  │ ▪▪▪▪▪▪│ Section padding (mobile)
64px  │ ████  │ Section gaps
80px  │ █████ │ Large section gaps
120px │ ██████│ Hero sections, major breaks

WHY 8? Scales well, looks balanced, industry standard.
```

## Spacing Cheat Sheet

```
COMPONENT SPACING:
────────────────────────────────────────────────────────

Inside Cards:
  - Padding: 24px (small cards) or 32px (large cards)
  - Gap between elements: 16px

Between Cards:
  - Grid gap: 24px (mobile) or 32px (desktop)

Between Sections:
  - Margin: 80px (mobile) or 120px (desktop)

Inside Buttons:
  - Padding: 12px 24px (small) or 16px 32px (large)

Navigation:
  - Logo to links: 48px+
  - Between nav items: 32px

Form Fields:
  - Between fields: 24px
  - Label to input: 8px
```

## Container Widths

```
MAX-WIDTH GUIDELINES:
────────────────────────────────────────────────────────

Full-width hero:     100%        │ Edge to edge
Wide content:        1400px      │ Large images, galleries
Standard content:    1200px      │ Most page content
Narrow content:      800px       │ Blog posts, long text
Very narrow:         600px       │ Forms, focused content

SIDE PADDING:
Mobile:  16px - 24px
Tablet:  32px - 48px
Desktop: 48px - 80px
```

## Layout Patterns

```
PATTERN 1: Full-Width Hero + Contained Content
┌────────────────────────────────────────────────────┐
│                    HERO IMAGE                       │
│                   (100% width)                      │
└────────────────────────────────────────────────────┘
        ┌────────────────────────────────┐
        │         CONTENT                │
        │        (1200px max)            │
        └────────────────────────────────┘


PATTERN 2: Two-Column Layout
┌────────────────────────────────────────────────────┐
│                                                    │
│   ┌─────────────────┐    ┌─────────────────┐      │
│   │                 │    │                 │      │
│   │     IMAGE       │    │     TEXT        │      │
│   │     (50%)       │    │     (50%)       │      │
│   │                 │    │                 │      │
│   └─────────────────┘    └─────────────────┘      │
│                                                    │
└────────────────────────────────────────────────────┘


PATTERN 3: Grid of Cards
┌────────────────────────────────────────────────────┐
│                                                    │
│   ┌─────┐  ┌─────┐  ┌─────┐  ┌─────┐             │
│   │     │  │     │  │     │  │     │             │
│   │     │  │     │  │     │  │     │             │
│   └─────┘  └─────┘  └─────┘  └─────┘             │
│                                                    │
│   ┌─────┐  ┌─────┐  ┌─────┐  ┌─────┐             │
│   │     │  │     │  │     │  │     │             │
│   │     │  │     │  │     │  │     │             │
│   └─────┘  └─────┘  └─────┘  └─────┘             │
│                                                    │
└────────────────────────────────────────────────────┘
```

---

# 🧩 PART 7: COMPONENT DESIGN PATTERNS

## Button Styles

```
PRIMARY BUTTON (Main actions):
┌─────────────────────────────────────┐
│  Background: Gold (#B8956A)         │
│  Text: White or Cream               │
│  Padding: 16px 32px                 │
│  Border-radius: 0 (sharp) or 4px    │
│  Font: Inter, 14px, Semi-bold       │
│  Letter-spacing: 0.05em             │
│  Text-transform: uppercase          │
│                                     │
│  Hover: Darken background 10%       │
│  Transition: 0.3s ease              │
└─────────────────────────────────────┘

SECONDARY BUTTON (Secondary actions):
┌─────────────────────────────────────┐
│  Background: Transparent            │
│  Text: Charcoal (#2C2C2C)           │
│  Border: 1px solid Charcoal         │
│  Padding: 16px 32px                 │
│  Border-radius: 0 or 4px            │
│                                     │
│  Hover: Background Charcoal,        │
│         Text Cream                  │
└─────────────────────────────────────┘

GHOST BUTTON (Subtle actions):
┌─────────────────────────────────────┐
│  Background: Transparent            │
│  Text: Gold (#B8956A)               │
│  Border: None                       │
│  Text-decoration: underline         │
│                                     │
│  Hover: Darker gold                 │
└─────────────────────────────────────┘
```

## Card Styles

```
PRODUCT CARD:
┌─────────────────────────────────────┐
│  ┌─────────────────────────────┐   │
│  │                             │   │
│  │                             │   │
│  │         PRODUCT             │   │
│  │          IMAGE              │   │
│  │        (4:5 ratio)          │   │
│  │                             │   │
│  │                             │   │
│  └─────────────────────────────┘   │
│                                     │
│  Brand Name          ← 12px, gray   │
│  Product Title       ← 18px, black  │
│  $1,200              ← 14px, gold   │
│                                     │
└─────────────────────────────────────┘

Specs:
- Background: White or Cream
- Padding: 0 (image) + 16px (text area)
- Image hover: scale(1.05), 0.4s ease
- Shadow: none default, subtle on hover
- Border-radius: 0 (luxury) or 8px (friendly)
```

## Input Fields

```
TEXT INPUT:
┌─────────────────────────────────────┐
│                                     │
│  Label                   ← 14px     │
│  ┌─────────────────────────────┐   │
│  │ Placeholder text...         │   │ ← 16px
│  └─────────────────────────────┘   │
│                                     │
└─────────────────────────────────────┘

Specs:
- Border: 1px solid Sand (#E8E2D5)
- Border-radius: 4px
- Padding: 12px 16px
- Focus: Border Gold (#B8956A)
- Background: White or Ivory
- Font: Inter, 16px
```

---

# 🔍 PART 8: FINDING & USING DESIGN INSPIRATION

## Where to Find Inspiration

### 1️⃣ LUXURY FASHION WEBSITES (Your Direct Competitors)

| Website | What to Learn |
|---------|---------------|
| **net-a-porter.com** | Product grid, filtering, luxury feel |
| **matchesfashion.com** | Editorial approach, storytelling |
| **ssense.com** | Minimal design, bold typography |
| **farfetch.com** | Brand pages, multi-brand platform |
| **mytheresa.com** | Clean luxury, product presentation |
| **brownsfashion.com** | Editorial + commerce blend |

### 2️⃣ DESIGN INSPIRATION SITES

| Website | Best For |
|---------|----------|
| **dribbble.com** | UI components, visual ideas |
| **behance.net** | Full project case studies |
| **awwwards.com** | Award-winning websites |
| **siteinspire.com** | Curated minimal designs |
| **godly.website** | Modern web design |
| **landingfolio.com** | Landing page patterns |

### 3️⃣ BRAND WEBSITES (Luxury References)

| Website | What to Learn |
|---------|---------------|
| **hermes.com** | Storytelling, animation |
| **celine.com** | Extreme minimalism |
| **bottegaveneta.com** | Bold simplicity |
| **loewe.com** | Editorial photography |
| **the-row.com** | Quiet luxury |

---

## How to Use References with Cursor

### Step 1: Find a Reference
```
Browse sites above, find something you like.
Take a screenshot or note the URL.
```

### Step 2: Describe What You Like
```
Don't just say "make it like this site."

Instead, identify SPECIFIC elements:
- "The way the navigation disappears on scroll"
- "The large product images with minimal text"
- "The hover effect on the product cards"
- "The typography pairing of serif headlines + sans body"
```

### Step 3: Write a Clear Request

**Template:**
```
"I want to redesign the [PAGE/COMPONENT] inspired by [WEBSITE].

Specifically, I like:
1. [Specific element 1]
2. [Specific element 2]
3. [Specific element 3]

Please implement these changes while keeping our existing:
- Color palette (cream, charcoal, gold)
- Typography (Cormorant Garamond + Inter)
- Overall brand feel"
```

**Example:**
```
"I want to redesign the product grid inspired by SSENSE.com.

Specifically, I like:
1. The 4-column layout with minimal gaps
2. The way product info appears on hover, not always visible
3. The black and white aesthetic with pops of color
4. The large, clean product photography

Please implement these changes while keeping our existing:
- Color palette (cream, charcoal, gold)
- Typography (Cormorant Garamond + Inter)
- Overall brand feel

Adapt their approach to fit our luxury aesthetic."
```

---

## Creating a Mood Board

Before major design work, create a simple mood board:

```
QALA MOOD BOARD
═══════════════════════════════════════════════════════

FEELING/VIBE:
□ Calm, not energetic
□ Sophisticated, not trendy
□ Warm, not cold
□ Timeless, not dated
□ Exclusive, not mass-market

VISUAL REFERENCES:
1. [Screenshot/URL] - Love the typography
2. [Screenshot/URL] - Love the spacing
3. [Screenshot/URL] - Love the animation
4. [Screenshot/URL] - Love the color usage

AVOID:
✗ Bright, saturated colors
✗ Rounded, playful shapes
✗ Busy, cluttered layouts
✗ Fast, bouncy animations
✗ Generic stock photography
```

---

# 📋 PART 9: PROMPT TEMPLATES FOR CURSOR

## Copy-Paste Templates

### Template 1: New Page Design
```
Create a new [PAGE NAME] page with the following design:

LAYOUT:
- [Describe the overall structure]
- [Number of sections]
- [Key components needed]

HERO SECTION:
- [Background: image/color/gradient]
- [Headline text and style]
- [Subheadline if any]
- [CTA button if any]

CONTENT SECTIONS:
- Section 1: [Description]
- Section 2: [Description]
- Section 3: [Description]

DESIGN REQUIREMENTS:
- Use our color palette: Cream (#FAF8F5), Charcoal (#2C2C2C), Gold (#B8956A)
- Typography: Cormorant Garamond for headings, Inter for body
- Generous whitespace (80-120px between sections)
- Smooth animations on scroll (fade-in, 0.6s duration)
- Mobile responsive

REFERENCE: [URL if any]
```

### Template 2: Component Redesign
```
Redesign the [COMPONENT NAME] component.

CURRENT ISSUES:
- [What's wrong with it now]
- [What doesn't feel right]

DESIRED OUTCOME:
- [What you want it to look like/feel like]

SPECIFIC CHANGES:
1. [Change 1 with exact values]
2. [Change 2 with exact values]
3. [Change 3 with exact values]

KEEP THE SAME:
- [What should stay unchanged]

REFERENCE: [URL or description]
```

### Template 3: Typography Update
```
Update the typography for [PAGE/COMPONENT]:

HEADINGS:
- Font: Cormorant Garamond
- H1: [size]px, weight [weight], color [color]
- H2: [size]px, weight [weight], color [color]
- H3: [size]px, weight [weight], color [color]

BODY TEXT:
- Font: Inter
- Size: [size]px
- Weight: [weight]
- Line-height: [value]
- Color: [color]

SPECIAL TEXT:
- Price: [specs]
- Labels: [specs]
- Captions: [specs]

Ensure proper hierarchy and readability.
```

### Template 4: Spacing Fix
```
Fix the spacing in [PAGE/COMPONENT]:

CURRENT PROBLEM:
- [Describe what feels off]

CHANGES NEEDED:
- Section padding: [top]px top, [bottom]px bottom
- Between sections: [value]px margin
- Inside cards: [value]px padding
- Between cards: [value]px gap
- Text spacing: [value]px between paragraphs

Use the 8-point grid (all values should be multiples of 8).
```

### Template 5: Animation Request
```
Add animations to [PAGE/COMPONENT]:

ON PAGE LOAD:
- [Element 1]: [animation type], [duration], [delay]
- [Element 2]: [animation type], [duration], [delay]

ON SCROLL:
- [Element]: fade in when [X]% in viewport
- Duration: [time]s
- Easing: ease-out

ON HOVER:
- [Element]: [effect]
- Duration: [time]s

Use Framer Motion for React components.
Keep animations subtle and smooth (luxury feel).
```

### Template 6: Color Scheme Change
```
Update the colors in [PAGE/COMPONENT]:

BACKGROUND:
- Main: [color/hex]
- Secondary: [color/hex]

TEXT:
- Headlines: [color/hex]
- Body: [color/hex]
- Secondary: [color/hex]

ACCENTS:
- Primary (buttons, links): [color/hex]
- Secondary: [color/hex]

BORDERS/DIVIDERS:
- [color/hex]

Maintain sufficient contrast for accessibility.
```

---

# ✅ PART 10: DESIGN CHECKLIST

## Before Asking Cursor for Design Help

```
PRE-REQUEST CHECKLIST:
────────────────────────────────────────────────────────

□ I know WHAT I want to change (specific component/page)
□ I know WHY it needs to change (problem it solves)
□ I have a REFERENCE or can describe the outcome
□ I've noted SPECIFIC values (colors, sizes, spacing)
□ I know what should STAY THE SAME

If you can't check all boxes, spend more time planning!
```

## Design Review Checklist

After Cursor makes changes, check:

```
VISUAL HIERARCHY:
□ Is the most important thing the most prominent?
□ Can users tell what to do first?
□ Is there a clear visual flow?

CONSISTENCY:
□ Do similar elements look the same?
□ Are colors used consistently?
□ Are spacing patterns consistent?

WHITESPACE:
□ Does the design have room to breathe?
□ Are elements not crammed together?
□ Does it feel calm, not busy?

TYPOGRAPHY:
□ Is text readable at all sizes?
□ Is there clear hierarchy (H1 > H2 > H3)?
□ Are fonts used consistently?

COLOR:
□ Is there enough contrast?
□ Are accent colors used sparingly?
□ Does the palette feel cohesive?

RESPONSIVENESS:
□ Does it look good on mobile?
□ Does it look good on tablet?
□ Does it look good on large screens?

LUXURY FEEL:
□ Does it feel premium, not cheap?
□ Are animations smooth, not jarring?
□ Is it minimal, not cluttered?
```

---

## Quick Reference Card

```
╔═══════════════════════════════════════════════════════════╗
║              QALA DESIGN QUICK REFERENCE                  ║
╠═══════════════════════════════════════════════════════════╣
║                                                           ║
║  COLORS:                                                  ║
║  Background: #FAF8F5 (cream)                              ║
║  Text: #2C2C2C (charcoal)                                 ║
║  Accent: #B8956A (gold)                                   ║
║  Border: #E8E2D5 (sand)                                   ║
║                                                           ║
║  FONTS:                                                   ║
║  Headings: Cormorant Garamond, 300-400 weight             ║
║  Body: Inter, 400-500 weight                              ║
║                                                           ║
║  SIZES:                                                   ║
║  H1: 64px / H2: 48px / H3: 32px / Body: 16px              ║
║                                                           ║
║  SPACING:                                                 ║
║  Section gap: 80-120px                                    ║
║  Card padding: 24-32px                                    ║
║  Card gap: 24-32px                                        ║
║                                                           ║
║  ANIMATIONS:                                              ║
║  Duration: 0.4-0.6s                                       ║
║  Easing: ease-out                                         ║
║                                                           ║
╚═══════════════════════════════════════════════════════════╝
```

---

# 🎓 BONUS: LEARNING RESOURCES

## Free Courses

| Resource | Topic | Time |
|----------|-------|------|
| **Google UX Design Certificate** (Coursera) | Full UX fundamentals | 6 months |
| **Figma YouTube Channel** | UI design basics | Various |
| **The Futur** (YouTube) | Design thinking | Various |
| **Flux Academy** (YouTube) | Web design | Various |
| **DesignCourse** (YouTube) | UI/UX tutorials | Various |

## Books (Optional)

| Book | What You'll Learn |
|------|-------------------|
| "Don't Make Me Think" - Steve Krug | UX basics |
| "Refactoring UI" - Adam Wathan | Practical UI tips |
| "The Design of Everyday Things" | Design thinking |

## Tools to Explore

| Tool | Purpose | Cost |
|------|---------|------|
| **Figma** | Design mockups before coding | Free |
| **Coolors.co** | Generate color palettes | Free |
| **FontPair** | Find font combinations | Free |
| **Unsplash** | Free high-quality images | Free |
| **Contrast Checker** | Test color accessibility | Free |

---

# 🚀 NEXT STEPS

1. **Save this guide** - Reference it when working with Cursor
2. **Bookmark inspiration sites** - Build a mental library
3. **Practice describing** - The more specific, the better results
4. **Start small** - Fix one component at a time
5. **Iterate** - Design is never done on the first try

---

**Remember:** You don't need to be a designer. You need to be a good **communicator**. 

The more specific and visual your requests to Cursor, the better the output will be!

---














