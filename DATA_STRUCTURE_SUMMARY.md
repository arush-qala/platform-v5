# DATA STRUCTURE SUMMARY - QALA PLATFORM V5

Quick visual reference for the data structure needed to populate your platform.

---

## 📊 DATABASE SCHEMA OVERVIEW

```
┌─────────────────────────────────────────────────────────────────┐
│                         BRAND                                    │
│  • name, slug, description, story                                │
│  • logoUrl, coverImage, videoUrl                                 │
│  • founded, location, aesthetic                                  │
│  • featured                                                      │
└─────────────────────────────────────────────────────────────────┘
                              │
                              │ has many
                              ▼
┌─────────────────────────────────────────────────────────────────┐
│                       COLLECTION                                 │
│  • brandId (FK)                                                  │
│  • name, slug, description                                       │
│  • season, year                                                  │
│  • coverImage, lookbookImages                                    │
│  • featured                                                      │
└─────────────────────────────────────────────────────────────────┘
                              │
                              │ has many
                              ▼
┌─────────────────────────────────────────────────────────────────┐
│                        PRODUCT                                   │
│  • collectionId (FK)                                             │
│  • name, slug, description                                       │
│  • category, price                                               │
│  • fabricDetails, careInstructions                               │
│  • colors, featured                                              │
└─────────────────────────────────────────────────────────────────┘
                    │                        │
          has many  │                        │ has many
                    ▼                        ▼
    ┌───────────────────────┐    ┌───────────────────────┐
    │   PRODUCT IMAGE       │    │   PRODUCT SIZE        │
    │  • productId (FK)     │    │  • productId (FK)     │
    │  • url, alt           │    │  • size               │
    │  • order, isPrimary   │    │  • inStock, quantity  │
    └───────────────────────┘    └───────────────────────┘
```

---

## 📁 FILE STRUCTURE

```
platform-v5/
│
├── prisma/
│   └── schema.prisma                    # Database schema definition
│
├── data-templates/                      # Templates for data collection
│   ├── brands-template.json
│   ├── collections-template.json
│   └── products-template.json
│
├── data-import/                         # Your filled data (create this)
│   ├── brands.json
│   ├── collections.json
│   └── products.json
│
├── scripts/
│   └── import-data.ts                   # Import script
│
├── public/
│   └── images/
│       └── brands/
│           └── [brand-slug]/
│               ├── logo.png
│               ├── cover.jpg
│               ├── collections/
│               │   └── [collection-slug]/
│               │       ├── cover.jpg
│               │       └── lookbook-*.jpg
│               └── products/
│                   └── [product-slug]/
│                       ├── front.jpg
│                       ├── back.jpg
│                       ├── detail.jpg
│                       └── styled.jpg
│
└── Documentation/
    ├── DATA_MIGRATION_GUIDE.md          # Comprehensive guide
    ├── DATA_MIGRATION_WORKFLOW.md       # Step-by-step workflow
    └── VALID_VALUES_REFERENCE.md        # Valid field values
```

---

## 🔄 DATA FLOW

```
┌─────────────────────────────────────────────────────────────────┐
│  STEP 1: Extract from qala.global (Shopify)                     │
│  ─────────────────────────────────────────────────────────────  │
│  • Navigate to brand/collection/product pages                   │
│  • Copy text content (names, descriptions, details)             │
│  • Download images (logos, covers, products)                    │
│  • Note prices, sizes, colors                                   │
└─────────────────────────────────────────────────────────────────┘
                              │
                              ▼
┌─────────────────────────────────────────────────────────────────┐
│  STEP 2: Organize Data                                          │
│  ─────────────────────────────────────────────────────────────  │
│  • Fill in JSON templates or spreadsheets                       │
│  • Organize images in public/images/ folder structure           │
│  • Validate JSON format                                         │
│  • Verify all image paths                                       │
└─────────────────────────────────────────────────────────────────┘
                              │
                              ▼
┌─────────────────────────────────────────────────────────────────┐
│  STEP 3: Import to Database                                     │
│  ─────────────────────────────────────────────────────────────  │
│  • Run: npx tsx scripts/import-data.ts                          │
│  • Script reads JSON files                                      │
│  • Creates database records with relationships                  │
│  • Links products to collections, collections to brands         │
└─────────────────────────────────────────────────────────────────┘
                              │
                              ▼
┌─────────────────────────────────────────────────────────────────┐
│  STEP 4: Verify & Test                                          │
│  ─────────────────────────────────────────────────────────────  │
│  • Open Prisma Studio: npx prisma studio                        │
│  • Start dev server: npm run dev                                │
│  • Test all pages and features                                  │
│  • Fix any issues                                               │
└─────────────────────────────────────────────────────────────────┘
```

---

## 📋 DATA REQUIREMENTS CHECKLIST

### For Each Brand:
```
✅ Required:
   • name (string)
   • slug (string, unique, lowercase-hyphenated)
   • aesthetic (JSON array of tags)

⭐ Recommended:
   • description (short, 1-2 sentences)
   • story (detailed, multiple paragraphs)
   • logoUrl (image path)
   • coverImage (image path)
   • founded (year or date)
   • location (city, country)
   • featured (boolean)

🎬 Optional:
   • videoUrl (YouTube/Vimeo URL)
```

### For Each Collection:
```
✅ Required:
   • brandSlug (parent brand identifier)
   • name (string)
   • slug (string, unique per brand)
   • season ("Summer/Spring" | "Fall/Winter" | "Resortwear")

⭐ Recommended:
   • description (collection theme/inspiration)
   • year (e.g., "2024")
   • coverImage (image path)
   • lookbookImages (JSON array of image paths)
   • featured (boolean)
```

### For Each Product:
```
✅ Required:
   • brandSlug (parent brand)
   • collectionSlug (parent collection)
   • name (string)
   • slug (string, unique per collection)
   • category ("dresses" | "tops" | "co-ord sets" | "evening wear" | "shirts" | "pants")
   • price (number, wholesale price)
   • colors (JSON array of color names)
   • images (array of image objects)
   • sizes (array of size objects)

⭐ Recommended:
   • description (detailed product description)
   • fabricDetails (material, origin, techniques)
   • careInstructions (washing, storage)
   • featured (boolean)
```

### For Each Product Image:
```
✅ Required:
   • url (image path)
   • order (number, 0-indexed)
   • isPrimary (boolean, true for first image)

⭐ Recommended:
   • alt (accessibility text)
```

### For Each Product Size:
```
✅ Required:
   • size (string: "XS" | "S" | "M" | "L" | "XL" | "2XL" | etc.)
   • inStock (boolean)
   • quantity (number)
```

---

## 🎯 QUICK START FOR INVESTOR DEMO

### Minimum Viable Data (4-6 hours):

```
2 BRANDS
├── Brand 1: "Khara Kapas"
│   ├── 2 Collections
│   │   ├── Collection 1: "Highland" (8 products)
│   │   └── Collection 2: "Urban Nomad" (8 products)
│   └── Total: 16 products
│
└── Brand 2: "[Your Second Brand]"
    ├── 2 Collections
    │   ├── Collection 1: (8 products)
    │   └── Collection 2: (8 products)
    └── Total: 16 products

GRAND TOTAL: 2 brands, 4 collections, 32 products
```

### Image Requirements:
- **Per Brand**: 1 logo + 1 cover = 2 images
- **Per Collection**: 1 cover + 3 lookbook = 4 images
- **Per Product**: 3-4 images (front, back, detail, styled)

**Total Images**:
- Brands: 2 × 2 = 4 images
- Collections: 4 × 4 = 16 images
- Products: 32 × 3 = 96 images
- **Grand Total**: ~116 images

---

## 📝 EXAMPLE DATA SNIPPET

### Complete Product Example:

```json
{
  "brandSlug": "khara-kapas",
  "collectionSlug": "highland",
  "name": "Lush Floral Top",
  "slug": "lush-floral-top",
  "description": "A beautiful handcrafted top featuring intricate floral embroidery on premium cotton. The flowing silhouette and delicate details make it perfect for summer events and casual elegance.",
  "category": "tops",
  "price": 4500.00,
  "fabricDetails": "100% Cotton, Hand-block printed, Natural dyes, Sourced from Jaipur artisans",
  "careInstructions": "Dry clean only. Do not bleach. Iron on low heat. Store in a cool, dry place.",
  "colors": "[\"Emerald Green\", \"Ivory\", \"Coral\"]",
  "featured": false,
  "images": [
    {
      "url": "/images/brands/khara-kapas/products/lush-floral-top/front.jpg",
      "alt": "Lush Floral Top - Front View",
      "order": 0,
      "isPrimary": true
    },
    {
      "url": "/images/brands/khara-kapas/products/lush-floral-top/back.jpg",
      "alt": "Lush Floral Top - Back View",
      "order": 1,
      "isPrimary": false
    },
    {
      "url": "/images/brands/khara-kapas/products/lush-floral-top/detail.jpg",
      "alt": "Lush Floral Top - Embroidery Detail",
      "order": 2,
      "isPrimary": false
    }
  ],
  "sizes": [
    { "size": "S", "inStock": true, "quantity": 15 },
    { "size": "M", "inStock": true, "quantity": 20 },
    { "size": "L", "inStock": true, "quantity": 15 },
    { "size": "XL", "inStock": false, "quantity": 0 }
  ]
}
```

---

## 🚀 IMPORT COMMANDS

```bash
# 1. Ensure database is ready
npx prisma migrate dev

# 2. (Optional) View current database
npx prisma studio

# 3. Run import script
npx tsx scripts/import-data.ts

# 4. Verify import in Prisma Studio
npx prisma studio

# 5. Start development server
npm run dev

# 6. Open browser
# Navigate to http://localhost:3000
```

---

## 🎨 VALID VALUES QUICK REFERENCE

### Product Categories:
- `"dresses"`
- `"co-ord sets"`
- `"evening wear"`
- `"tops"`
- `"shirts"`
- `"pants"`

### Collection Seasons:
- `"Summer/Spring"`
- `"Fall/Winter"`
- `"Resortwear"`

### Product Sizes:
- `"XS"`, `"S"`, `"M"`, `"L"`, `"XL"`, `"2XL"`, `"3XL"`
- `"Free Size"`, `"One Size"`

### Brand Aesthetic Tags (examples):
- `"sustainable"`, `"handcrafted"`, `"traditional"`
- `"luxury"`, `"minimalist"`, `"contemporary"`
- `"bold"`, `"urban"`, `"bohemian"`
- `"elegant"`, `"casual"`, `"ethnic"`, `"fusion"`

---

## 📚 DOCUMENTATION INDEX

1. **DATA_MIGRATION_GUIDE.md** - Comprehensive reference
   - Detailed field descriptions
   - Mapping from Shopify to Platform V5
   - JSON/CSV format examples
   - Image organization

2. **DATA_MIGRATION_WORKFLOW.md** - Step-by-step process
   - Phase-by-phase workflow
   - Time estimates
   - Troubleshooting guide
   - Demo preparation

3. **VALID_VALUES_REFERENCE.md** - Field constraints
   - All valid category values
   - Season options
   - Size standards
   - Format requirements

4. **data-templates/** - JSON templates
   - brands-template.json
   - collections-template.json
   - products-template.json

5. **scripts/import-data.ts** - Import automation
   - Reads JSON files
   - Creates database records
   - Handles relationships
   - Error reporting

---

## ⏱️ TIME ESTIMATES

| Phase | Task | Time |
|-------|------|------|
| 1 | Preparation & Setup | 30 min |
| 2 | Brand Data Collection (2 brands) | 1-2 hours |
| 3 | Collection Data (4 collections) | 1-2 hours |
| 4 | Product Data (32 products) | 2-4 hours |
| 5 | Data Organization | 30 min |
| 6 | Database Import | 30 min |
| 7 | Testing | 30 min |
| 8 | Demo Preparation | 1 hour |
| **TOTAL** | **Complete Migration** | **6-10 hours** |

**For Monday deadline**: Focus on 2 brands with 16 products each = ~4-6 hours

---

## 🎯 SUCCESS CRITERIA

Your data migration is complete when:

- [ ] All brands display on homepage with filters working
- [ ] Brand store pages show logo, cover, story, collections
- [ ] Collection pages show lookbook and products
- [ ] Product pages show all images, details, sizes
- [ ] Prices display correctly
- [ ] "Add to Assortment" works
- [ ] "Sample Crate" works
- [ ] Responsive design works on mobile/tablet/desktop
- [ ] No broken images
- [ ] No console errors

---

## 💡 PRO TIPS

1. **Start Small**: Import 1 brand completely, test, then scale
2. **Batch Images**: Download all images at once using browser tools
3. **Reuse Content**: Adapt similar product descriptions
4. **Use Defaults**: If data missing, use reasonable placeholders
5. **Test Early**: Don't wait until all data is collected
6. **Focus on Visuals**: Investors care about design - prioritize good images

---

## 🆘 NEED HELP?

If you encounter issues:

1. Check `DATA_MIGRATION_WORKFLOW.md` → Troubleshooting section
2. Verify JSON format at jsonlint.com
3. Check Prisma Studio for database state
4. Review console errors in browser/terminal
5. Ensure image paths match actual files

---

**Ready to start?** Begin with `DATA_MIGRATION_WORKFLOW.md` for step-by-step instructions!

Good luck with your investor meeting! 🚀
