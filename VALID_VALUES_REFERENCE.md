# QUICK REFERENCE - VALID VALUES

This document lists all the valid/allowed values for specific fields in your data.

---

## PRODUCT CATEGORIES

**Field**: `Product.category`

**Valid Values** (use exactly as shown):
- `"dresses"` - All types of dresses
- `"co-ord sets"` - Matching sets (top + bottom)
- `"evening wear"` - Formal evening attire
- `"tops"` - Shirts, blouses, camisoles
- `"shirts"` - Button-down and structured shirts
- `"pants"` - Trousers, wide-leg, tailored pants

**Example**:
```json
{
  "category": "tops"
}
```

---

## COLLECTION SEASONS

**Field**: `Collection.season`

**Valid Values** (use exactly as shown):
- `"Summer/Spring"` - Warm weather collections
- `"Fall/Winter"` - Cool weather collections
- `"Resortwear"` - Vacation/travel collections

**Example**:
```json
{
  "season": "Summer/Spring"
}
```

---

## PRODUCT SIZES

**Field**: `ProductSize.size`

**Standard Values**:
- `"XS"` - Extra Small
- `"S"` - Small
- `"M"` - Medium
- `"L"` - Large
- `"XL"` - Extra Large
- `"2XL"` - 2X Large
- `"3XL"` - 3X Large

**Alternative Values**:
- `"Free Size"` - One size fits all
- `"One Size"` - One size fits all

**Custom Values**: You can use custom sizes if needed (e.g., "28", "30", "32" for waist sizes)

**Example**:
```json
{
  "sizes": [
    { "size": "S", "inStock": true, "quantity": 10 },
    { "size": "M", "inStock": true, "quantity": 15 },
    { "size": "L", "inStock": true, "quantity": 12 }
  ]
}
```

---

## BRAND AESTHETIC TAGS

**Field**: `Brand.aesthetic` (JSON array)

**Suggested Values** (you can use any combination):
- `"sustainable"` - Eco-friendly, sustainable practices
- `"handcrafted"` - Handmade, artisanal
- `"traditional"` - Traditional techniques, heritage
- `"luxury"` - High-end, premium
- `"minimalist"` - Clean, simple design
- `"contemporary"` - Modern, current
- `"bold"` - Statement pieces, bold designs
- `"urban"` - City-inspired, streetwear
- `"bohemian"` - Boho, free-spirited
- `"elegant"` - Sophisticated, refined
- `"casual"` - Everyday wear, relaxed
- `"formal"` - Business, formal occasions
- `"ethnic"` - Traditional cultural wear
- `"fusion"` - Mix of traditional and modern
- `"vintage"` - Retro, vintage-inspired

**Format**: JSON stringified array

**Example**:
```json
{
  "aesthetic": "[\"sustainable\", \"handcrafted\", \"luxury\"]"
}
```

---

## PRODUCT COLORS

**Field**: `Product.colors` (JSON array)

**Format**: JSON stringified array of color names

**Example Values**:
- Basic: `"Black"`, `"White"`, `"Navy"`, `"Grey"`, `"Beige"`
- Rich: `"Emerald Green"`, `"Sapphire Blue"`, `"Ruby Red"`, `"Ivory"`, `"Charcoal"`
- Descriptive: `"Midnight Blue"`, `"Rose Gold"`, `"Champagne"`, `"Burgundy"`, `"Teal"`

**Example**:
```json
{
  "colors": "[\"Emerald Green\", \"Ivory\", \"Coral\", \"Navy\"]"
}
```

---

## LOOKBOOK IMAGES

**Field**: `Collection.lookbookImages` (JSON array)

**Format**: JSON stringified array of image paths

**Example**:
```json
{
  "lookbookImages": "[\"/images/brands/brand-slug/collections/collection-slug/lookbook-1.jpg\", \"/images/brands/brand-slug/collections/collection-slug/lookbook-2.jpg\", \"/images/brands/brand-slug/collections/collection-slug/lookbook-3.jpg\"]"
}
```

---

## BOOLEAN FLAGS

**Fields**: `featured`, `inStock`, `isPrimary`

**Valid Values**:
- `true`
- `false`

**Example**:
```json
{
  "featured": true,
  "inStock": false
}
```

---

## PRICE FORMAT

**Field**: `Product.price`

**Format**: Number (Float), not string

**Currency**: Store in your base currency (e.g., INR)

**Example**:
```json
{
  "price": 4500.00
}
```

❌ **Wrong**: `"price": "₹4500"` or `"price": "4,500"`
✅ **Correct**: `"price": 4500.00`

---

## IMAGE PATHS

**Fields**: `logoUrl`, `coverImage`, `ProductImage.url`, etc.

**Format**: Relative path from `public/` directory

**Pattern**: `/images/brands/[brand-slug]/[type]/[filename]`

**Examples**:
```json
{
  "logoUrl": "/images/brands/khara-kapas/logo.png",
  "coverImage": "/images/brands/khara-kapas/cover.jpg",
  "productImage": "/images/brands/khara-kapas/products/lush-floral-top/front.jpg"
}
```

**File Organization**:
```
public/
  images/
    brands/
      khara-kapas/
        logo.png
        cover.jpg
        collections/
          highland/
            cover.jpg
            lookbook-1.jpg
        products/
          lush-floral-top/
            front.jpg
            back.jpg
```

---

## SLUGS

**Fields**: `Brand.slug`, `Collection.slug`, `Product.slug`

**Format**: Lowercase, hyphen-separated, URL-friendly

**Rules**:
- Use lowercase only
- Replace spaces with hyphens
- Remove special characters
- Keep it short and descriptive

**Examples**:
- "Khara Kapas" → `"khara-kapas"`
- "Lush Floral Top" → `"lush-floral-top"`
- "Spring/Summer 2024" → `"spring-summer-2024"`

---

## NULL VALUES

**Optional Fields**: Can be `null` if not available

**Fields that can be null**:
- `Brand.description`
- `Brand.story`
- `Brand.videoUrl`
- `Brand.logoUrl`
- `Brand.coverImage`
- `Brand.founded`
- `Brand.location`
- `Collection.description`
- `Collection.year`
- `Collection.coverImage`
- `Product.description`
- `Product.fabricDetails`
- `Product.careInstructions`
- `ProductImage.alt`

**Example**:
```json
{
  "videoUrl": null,
  "founded": null
}
```

---

## CUSTOMIZATION STATUS

**Field**: `Customization.status`

**Valid Values**:
- `"pending"` - Awaiting brand review (default)
- `"approved"` - Brand approved the customization
- `"declined"` - Brand declined the request

**Example**:
```json
{
  "status": "pending"
}
```

---

## DATES

**Fields**: `createdAt`, `updatedAt`

**Format**: ISO 8601 date string or let Prisma auto-generate

**Auto-generated**: These fields are automatically set by Prisma, you don't need to provide them in your import data.

**If manually setting**:
```json
{
  "createdAt": "2024-01-15T10:30:00Z"
}
```

---

## SUMMARY CHECKLIST

When preparing your data, ensure:

- [ ] Product categories use exact values: `"dresses"`, `"tops"`, `"co-ord sets"`, etc.
- [ ] Collection seasons use exact values: `"Summer/Spring"`, `"Fall/Winter"`, `"Resortwear"`
- [ ] Prices are numbers, not strings: `4500.00` not `"₹4500"`
- [ ] JSON arrays are stringified: `"[\"value1\", \"value2\"]"`
- [ ] Slugs are lowercase with hyphens: `"khara-kapas"`
- [ ] Image paths start with `/images/`: `/images/brands/...`
- [ ] Boolean values are `true` or `false`, not strings
- [ ] Optional fields use `null` if not available
