# DATA MIGRATION GUIDE - QALA PLATFORM V5

## Overview
This guide provides the exact data structure needed to populate your new Qala Platform (v5) with data from your existing Shopify website (www.qala.global).

**Deadline Context**: Investor meeting on Monday - this guide will help you quickly migrate your existing brand, collection, and product data.

---

## Data Structure Hierarchy

```
Brand (e.g., "Khara Kapas")
  └── Collection (e.g., "Highland", "Spring Summer 2024")
      └── Product (e.g., "Lush Floral Top")
          ├── ProductImage (multiple images)
          └── ProductSize (size variants)
```

---

## 1. BRAND DATA

### Database Table: `Brand`

Each brand needs the following fields:

```json
{
  "name": "Khara Kapas",
  "slug": "khara-kapas",
  "description": "Short description visible on brand cards and discovery page (1-2 sentences)",
  "story": "Detailed brand story - heritage, craftsmanship, values, founder story (multiple paragraphs)",
  "videoUrl": "https://youtube.com/... or https://vimeo.com/... (optional)",
  "logoUrl": "/images/brands/khara-kapas/logo.png",
  "coverImage": "/images/brands/khara-kapas/cover.jpg",
  "founded": "2015" or "2015-06-01",
  "location": "Jaipur, India",
  "aesthetic": "[\"sustainable\", \"handcrafted\", \"traditional\", \"luxury\"]",
  "featured": true
}
```

### Field Mapping from Shopify:

| Platform V5 Field | Where to Find on qala.global | Example |
|------------------|------------------------------|---------|
| `name` | Collection title (e.g., /collections/khara_kapas) | "Khara Kapas" |
| `slug` | URL slug from collection URL | "khara-kapas" |
| `description` | Short description on collection page | "Handcrafted luxury from Jaipur" |
| `story` | Full brand description/about section | Extract from brand page |
| `videoUrl` | Brand video if embedded | Check brand page |
| `logoUrl` | Brand logo image | Save locally and reference |
| `coverImage` | Hero/banner image on brand page | Save locally and reference |
| `founded` | About section or manually add | "2015" |
| `location` | About section or manually add | "Jaipur, India" |
| `aesthetic` | Tags shown on brand page | ["sustainable", "handcrafted"] |
| `featured` | Manually decide | true/false |

### Example Brand Records:

```json
[
  {
    "name": "Khara Kapas",
    "slug": "khara-kapas",
    "description": "Handcrafted luxury fashion celebrating traditional Indian textiles with contemporary design.",
    "story": "Founded in 2015 in the heart of Jaipur, Khara Kapas represents the perfect fusion of traditional Indian craftsmanship and modern luxury fashion. Each piece is meticulously handcrafted by skilled artisans using time-honored techniques passed down through generations...",
    "videoUrl": null,
    "logoUrl": "/images/brands/khara-kapas/logo.png",
    "coverImage": "/images/brands/khara-kapas/cover.jpg",
    "founded": "2015",
    "location": "Jaipur, India",
    "aesthetic": "[\"sustainable\", \"handcrafted\", \"traditional\", \"luxury\"]",
    "featured": true
  }
]
```

---

## 2. BRAND FEATURES (Press & Publications)

### Database Table: `BrandFeature`

Optional but recommended for building trust with investors and buyers.

```json
{
  "brandId": "clxxx123...",
  "title": "Featured in Vogue India",
  "publication": "Vogue India",
  "url": "https://www.vogue.in/...",
  "imageUrl": "/images/brands/khara-kapas/features/vogue.jpg",
  "date": "March 2024"
}
```

### Example Records:

```json
[
  {
    "brandId": "[BRAND_ID_FROM_DATABASE]",
    "title": "Sustainable Fashion Leaders 2024",
    "publication": "Vogue India",
    "url": "https://www.vogue.in/article",
    "imageUrl": "/images/brands/khara-kapas/features/vogue.jpg",
    "date": "March 2024"
  },
  {
    "brandId": "[BRAND_ID_FROM_DATABASE]",
    "title": "Best Handcrafted Collections",
    "publication": "Elle India",
    "url": null,
    "imageUrl": null,
    "date": "January 2024"
  }
]
```

---

## 3. COLLECTION DATA

### Database Table: `Collection`

Collections are seasonal groups of products (e.g., "Highland", "Spring Summer 2024").

```json
{
  "brandId": "clxxx123...",
  "name": "Highland",
  "slug": "highland",
  "description": "Inspired by the misty highlands, this collection features flowing silhouettes and earthy tones.",
  "season": "Summer/Spring",
  "year": "2024",
  "coverImage": "/images/brands/khara-kapas/collections/highland/cover.jpg",
  "lookbookImages": "[\"image1.jpg\", \"image2.jpg\", \"image3.jpg\"]",
  "featured": true
}
```

### Field Mapping from Shopify:

| Platform V5 Field | Where to Find on qala.global | Example |
|------------------|------------------------------|---------|
| `brandId` | Link to parent brand | Get from Brand table |
| `name` | Sub-collection name | "Highland" |
| `slug` | URL slug | "highland" |
| `description` | Collection description | Extract from page |
| `season` | Season category | "Summer/Spring", "Fall/Winter", or "Resortwear" |
| `year` | Collection year | "2024" |
| `coverImage` | Collection hero image | Save locally |
| `lookbookImages` | Multiple lookbook images | JSON array of paths |
| `featured` | Manually decide | true/false |

### Season Values (Must use exactly these):
- `"Summer/Spring"` - Warm weather collections
- `"Fall/Winter"` - Cool weather collections  
- `"Resortwear"` - Vacation/travel collections

### Example Collection Records:

```json
[
  {
    "brandId": "[BRAND_ID_FROM_DATABASE]",
    "name": "Highland",
    "slug": "highland",
    "description": "Inspired by the misty highlands of Scotland, this collection features flowing silhouettes, earthy tones, and luxurious natural fabrics.",
    "season": "Summer/Spring",
    "year": "2024",
    "coverImage": "/images/brands/khara-kapas/collections/highland/cover.jpg",
    "lookbookImages": "[\"/images/brands/khara-kapas/collections/highland/lookbook-1.jpg\", \"/images/brands/khara-kapas/collections/highland/lookbook-2.jpg\", \"/images/brands/khara-kapas/collections/highland/lookbook-3.jpg\"]",
    "featured": true
  }
]
```

---

## 4. PRODUCT DATA

### Database Table: `Product`

Individual products within collections.

```json
{
  "collectionId": "clxxx456...",
  "name": "Lush Floral Top",
  "slug": "lush-floral-top",
  "description": "A beautiful handcrafted top featuring intricate floral embroidery. Perfect for summer events and casual elegance.",
  "category": "tops",
  "price": 4500.00,
  "fabricDetails": "100% Cotton, Hand-block printed, Natural dyes",
  "careInstructions": "Dry clean only. Do not bleach. Iron on low heat.",
  "colors": "[\"Emerald Green\", \"Ivory\", \"Coral\"]",
  "featured": false
}
```

### Field Mapping from Shopify:

| Platform V5 Field | Where to Find on qala.global | Example |
|------------------|------------------------------|---------|
| `collectionId` | Parent collection | Get from Collection table |
| `name` | Product title | "Lush Floral Top" |
| `slug` | URL slug | "lush-floral-top" |
| `description` | Product description/details tab | Full description |
| `category` | Product category/type | "tops" |
| `price` | Bulk price (B2B wholesale) | 4500.00 |
| `fabricDetails` | Material tab | "100% Cotton, Hand-block printed" |
| `careInstructions` | Wash & Care tab | "Dry clean only..." |
| `colors` | Available colors | JSON array |
| `featured` | Manually decide | true/false |

### Category Values (Must use exactly these):
- `"dresses"` - All types of dresses
- `"co-ord sets"` - Matching sets (top + bottom)
- `"evening wear"` - Formal evening attire
- `"tops"` - Shirts, blouses, camisoles
- `"shirts"` - Button-down and structured shirts
- `"pants"` - Trousers, wide-leg, tailored pants

### Example Product Records:

```json
[
  {
    "collectionId": "[COLLECTION_ID_FROM_DATABASE]",
    "name": "Lush Floral Top",
    "slug": "lush-floral-top",
    "description": "A beautiful handcrafted top featuring intricate floral embroidery on premium cotton. The flowing silhouette and delicate details make it perfect for summer events and casual elegance. Hand-block printed using traditional techniques.",
    "category": "tops",
    "price": 4500.00,
    "fabricDetails": "100% Cotton, Hand-block printed, Natural dyes, Sourced from Jaipur artisans",
    "careInstructions": "Dry clean only. Do not bleach. Iron on low heat. Store in a cool, dry place.",
    "colors": "[\"Emerald Green\", \"Ivory\", \"Coral\"]",
    "featured": false
  }
]
```

---

## 5. PRODUCT IMAGES

### Database Table: `ProductImage`

Multiple images per product (front, back, detail shots, styling).

```json
{
  "productId": "clxxx789...",
  "url": "/images/brands/khara-kapas/products/lush-floral-top/front.jpg",
  "alt": "Lush Floral Top - Front View",
  "order": 0,
  "isPrimary": true
}
```

### Field Details:

| Field | Description | Example |
|-------|-------------|---------|
| `productId` | Parent product ID | Get from Product table |
| `url` | Image path | "/images/brands/.../front.jpg" |
| `alt` | Accessibility text | "Lush Floral Top - Front View" |
| `order` | Display order (0-indexed) | 0, 1, 2, 3... |
| `isPrimary` | Main thumbnail image | true for first image |

### Example Product Image Records:

```json
[
  {
    "productId": "[PRODUCT_ID_FROM_DATABASE]",
    "url": "/images/brands/khara-kapas/products/lush-floral-top/front.jpg",
    "alt": "Lush Floral Top - Front View",
    "order": 0,
    "isPrimary": true
  },
  {
    "productId": "[PRODUCT_ID_FROM_DATABASE]",
    "url": "/images/brands/khara-kapas/products/lush-floral-top/back.jpg",
    "alt": "Lush Floral Top - Back View",
    "order": 1,
    "isPrimary": false
  },
  {
    "productId": "[PRODUCT_ID_FROM_DATABASE]",
    "url": "/images/brands/khara-kapas/products/lush-floral-top/detail.jpg",
    "alt": "Lush Floral Top - Embroidery Detail",
    "order": 2,
    "isPrimary": false
  },
  {
    "productId": "[PRODUCT_ID_FROM_DATABASE]",
    "url": "/images/brands/khara-kapas/products/lush-floral-top/styled.jpg",
    "alt": "Lush Floral Top - Styled Look",
    "order": 3,
    "isPrimary": false
  }
]
```

---

## 6. PRODUCT SIZES

### Database Table: `ProductSize`

Size variants and inventory for each product.

```json
{
  "productId": "clxxx789...",
  "size": "M",
  "inStock": true,
  "quantity": 15
}
```

### Standard Size Values:
- `"XS"`, `"S"`, `"M"`, `"L"`, `"XL"`, `"2XL"`, `"3XL"`
- Or custom sizes: `"Free Size"`, `"One Size"`

### Example Product Size Records:

```json
[
  {
    "productId": "[PRODUCT_ID_FROM_DATABASE]",
    "size": "XS",
    "inStock": true,
    "quantity": 10
  },
  {
    "productId": "[PRODUCT_ID_FROM_DATABASE]",
    "size": "S",
    "inStock": true,
    "quantity": 15
  },
  {
    "productId": "[PRODUCT_ID_FROM_DATABASE]",
    "size": "M",
    "inStock": true,
    "quantity": 20
  },
  {
    "productId": "[PRODUCT_ID_FROM_DATABASE]",
    "size": "L",
    "inStock": true,
    "quantity": 15
  },
  {
    "productId": "[PRODUCT_ID_FROM_DATABASE]",
    "size": "XL",
    "inStock": false,
    "quantity": 0
  }
]
```

---

## DATA COLLECTION WORKFLOW

### Step 1: Extract Brand Data from Shopify

For each brand on qala.global:

1. Navigate to `/collections/[brand-slug]`
2. Extract:
   - Brand name (collection title)
   - Brand description
   - Brand tags/aesthetic
   - Logo image URL
   - Cover/hero image URL
3. Manually add:
   - Founded year
   - Location
   - Detailed story (if not on Shopify)

### Step 2: Extract Collection Data

For each collection under a brand:

1. Navigate to the collection page
2. Extract:
   - Collection name
   - Collection description
   - Cover image
   - Lookbook images
3. Manually assign:
   - Season (Summer/Spring, Fall/Winter, Resortwear)
   - Year
   - Featured status

### Step 3: Extract Product Data

For each product in a collection:

1. Navigate to product page
2. Extract from tabs:
   - **Details tab**: Product description
   - **Material tab**: Fabric details
   - **Wash & Care tab**: Care instructions
   - **Bulk Price**: Wholesale price
3. Extract:
   - Product name
   - Category
   - All product images
   - Available colors
   - Available sizes

---

## RECOMMENDED DATA FORMAT FOR IMPORT

### Option 1: JSON Files (Easiest for Quick Import)

Create separate JSON files for each entity:

**brands.json**
```json
[
  {
    "name": "Khara Kapas",
    "slug": "khara-kapas",
    "description": "...",
    "story": "...",
    ...
  },
  {
    "name": "Another Brand",
    ...
  }
]
```

**collections.json**
```json
[
  {
    "brandSlug": "khara-kapas",
    "name": "Highland",
    "slug": "highland",
    ...
  }
]
```

**products.json**
```json
[
  {
    "collectionSlug": "highland",
    "brandSlug": "khara-kapas",
    "name": "Lush Floral Top",
    ...
  }
]
```

### Option 2: CSV Files (Good for Spreadsheet Work)

**brands.csv**
```csv
name,slug,description,story,videoUrl,logoUrl,coverImage,founded,location,aesthetic,featured
Khara Kapas,khara-kapas,"Short desc","Long story",,/images/...,/images/...,2015,"Jaipur, India","[""sustainable"",""handcrafted""]",true
```

**collections.csv**
```csv
brandSlug,name,slug,description,season,year,coverImage,lookbookImages,featured
khara-kapas,Highland,highland,"Collection desc",Summer/Spring,2024,/images/...,"[""img1.jpg"",""img2.jpg""]",true
```

**products.csv**
```csv
brandSlug,collectionSlug,name,slug,description,category,price,fabricDetails,careInstructions,colors,featured
khara-kapas,highland,Lush Floral Top,lush-floral-top,"Product desc",tops,4500.00,"100% Cotton","Dry clean","[""Green"",""Ivory""]",false
```

---

## IMAGE ORGANIZATION

Store images in this folder structure:

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
            lookbook-2.jpg
            lookbook-3.jpg
        products/
          lush-floral-top/
            front.jpg
            back.jpg
            detail.jpg
            styled.jpg
          another-product/
            front.jpg
            ...
        features/
          vogue.jpg
          elle.jpg
```

---

## QUICK START CHECKLIST

- [ ] **1. List all brands** from qala.global
- [ ] **2. For each brand**, create a brand record with all fields
- [ ] **3. Download and organize** brand logos and cover images
- [ ] **4. List all collections** under each brand
- [ ] **5. For each collection**, create collection record
- [ ] **6. Download and organize** collection cover and lookbook images
- [ ] **7. List all products** in each collection
- [ ] **8. For each product**, extract:
  - [ ] Name, description, category
  - [ ] Price (bulk/wholesale)
  - [ ] Fabric details (Material tab)
  - [ ] Care instructions (Wash & Care tab)
  - [ ] Available colors
  - [ ] Available sizes
- [ ] **9. Download and organize** all product images (front, back, detail, styled)
- [ ] **10. Create import scripts** or use Prisma Studio to populate database

---

## SAMPLE IMPORT SCRIPT STRUCTURE

Once you have your JSON files ready, you can use a script like this:

```typescript
// scripts/import-data.ts
import { PrismaClient } from '@prisma/client'
import brandsData from './data/brands.json'
import collectionsData from './data/collections.json'
import productsData from './data/products.json'

const prisma = new PrismaClient()

async function main() {
  // 1. Import Brands
  for (const brandData of brandsData) {
    const brand = await prisma.brand.create({
      data: brandData
    })
    console.log(`Created brand: ${brand.name}`)
  }

  // 2. Import Collections
  for (const collectionData of collectionsData) {
    const brand = await prisma.brand.findUnique({
      where: { slug: collectionData.brandSlug }
    })
    
    const collection = await prisma.collection.create({
      data: {
        ...collectionData,
        brandId: brand.id
      }
    })
    console.log(`Created collection: ${collection.name}`)
  }

  // 3. Import Products (similar pattern)
  // 4. Import Product Images
  // 5. Import Product Sizes
}

main()
```

---

## MINIMUM VIABLE DATA FOR INVESTOR DEMO

To quickly populate your site for Monday's meeting, prioritize:

### Tier 1 (Must Have):
- **2-3 brands** with complete data
- **2-3 collections** per brand
- **5-10 products** per collection
- **3-4 images** per product
- **Basic sizes** (S, M, L, XL)

### Tier 2 (Nice to Have):
- Brand stories and videos
- Brand features/press
- Lookbook images for collections
- Complete size inventory

### Tier 3 (Can Add Later):
- User accounts
- Messages
- Customization requests

---

## NOTES

1. **IDs**: Don't worry about IDs in your JSON/CSV files. Prisma will auto-generate them.
2. **Relationships**: Use slugs to link entities (brand slug → collection, collection slug → product), then resolve to IDs during import.
3. **JSON Fields**: Fields like `aesthetic`, `colors`, `lookbookImages` must be JSON stringified arrays.
4. **Images**: Store images in `public/images/` and reference them with paths starting with `/images/`
5. **Prices**: Store as numbers (Float), not strings: `4500.00` not `"₹4500"`

---

## NEXT STEPS

1. **Review this guide** and confirm the structure matches your needs
2. **Create a spreadsheet** or JSON template based on the examples above
3. **Start extracting data** from qala.global for your top 2-3 brands
4. **Download and organize images** following the folder structure
5. **Create import script** or use Prisma Studio to manually add data
6. **Test with 1 brand** first to validate the structure
7. **Scale to all brands** once the process is validated

Good luck with your investor meeting! 🚀
