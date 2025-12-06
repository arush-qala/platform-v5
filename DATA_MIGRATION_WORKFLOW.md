# STEP-BY-STEP DATA MIGRATION WORKFLOW

This guide walks you through the complete process of migrating data from your Shopify website (qala.global) to your new Platform V5.

**Timeline**: Complete before Monday's investor meeting
**Estimated Time**: 4-8 hours depending on data volume

---

## PHASE 1: PREPARATION (30 minutes)

### Step 1.1: Review Documentation
- [ ] Read `DATA_MIGRATION_GUIDE.md` completely
- [ ] Review `VALID_VALUES_REFERENCE.md` for field constraints
- [ ] Familiarize yourself with the Prisma schema at `prisma/schema.prisma`

### Step 1.2: Set Up Data Collection
- [ ] Create a spreadsheet or use the JSON templates in `data-templates/`
- [ ] Decide which brands to prioritize (recommend 2-3 for investor demo)
- [ ] Create folder structure for images:
  ```
  public/images/brands/
  ```

### Step 1.3: Verify Database
- [ ] Ensure database is running
- [ ] Run migrations: `npx prisma migrate dev`
- [ ] Open Prisma Studio to verify: `npx prisma studio`

---

## PHASE 2: BRAND DATA COLLECTION (1-2 hours)

### Step 2.1: List Your Brands
Visit qala.global and list all brands you want to migrate:

**Example**:
1. Khara Kapas - `/collections/khara_kapas`
2. [Brand 2] - `/collections/[slug]`
3. [Brand 3] - `/collections/[slug]`

### Step 2.2: For Each Brand, Collect:

#### A. Basic Information
- [ ] **Name**: Exact brand name as shown
- [ ] **Slug**: URL-friendly version (e.g., "khara-kapas")
- [ ] **Description**: Short 1-2 sentence description
- [ ] **Story**: Full brand story (if available on Shopify or write one)

#### B. Visual Assets
- [ ] **Logo**: Download brand logo
  - Save to: `public/images/brands/[brand-slug]/logo.png`
  - Record path: `/images/brands/[brand-slug]/logo.png`
- [ ] **Cover Image**: Download hero/banner image
  - Save to: `public/images/brands/[brand-slug]/cover.jpg`
  - Record path: `/images/brands/[brand-slug]/cover.jpg`

#### C. Additional Details
- [ ] **Founded**: Year or date (e.g., "2015")
- [ ] **Location**: City, Country (e.g., "Jaipur, India")
- [ ] **Aesthetic**: Choose 3-5 tags from VALID_VALUES_REFERENCE.md
  - Format: `["sustainable", "handcrafted", "luxury"]`
- [ ] **Featured**: Decide if this brand should be featured (true/false)
- [ ] **Video URL**: If brand has a video (optional)

### Step 2.3: Record Brand Data

**Option A: Using JSON Template**
Copy `data-templates/brands-template.json` and fill in:

```json
{
  "name": "Khara Kapas",
  "slug": "khara-kapas",
  "description": "Handcrafted luxury fashion celebrating traditional Indian textiles",
  "story": "Founded in 2015...",
  "videoUrl": null,
  "logoUrl": "/images/brands/khara-kapas/logo.png",
  "coverImage": "/images/brands/khara-kapas/cover.jpg",
  "founded": "2015",
  "location": "Jaipur, India",
  "aesthetic": "[\"sustainable\", \"handcrafted\", \"luxury\"]",
  "featured": true
}
```

**Option B: Using Spreadsheet**
Create columns: name, slug, description, story, videoUrl, logoUrl, coverImage, founded, location, aesthetic, featured

---

## PHASE 3: COLLECTION DATA COLLECTION (1-2 hours)

### Step 3.1: For Each Brand, List Collections

Visit the brand page and note all collections/sub-collections.

**Example for Khara Kapas**:
1. Highland - `/collections/highland`
2. [Collection 2] - `/collections/[slug]`

### Step 3.2: For Each Collection, Collect:

#### A. Basic Information
- [ ] **Brand Slug**: Parent brand slug (e.g., "khara-kapas")
- [ ] **Name**: Collection name (e.g., "Highland")
- [ ] **Slug**: URL-friendly version (e.g., "highland")
- [ ] **Description**: Collection description/theme
- [ ] **Season**: Choose from: "Summer/Spring", "Fall/Winter", "Resortwear"
- [ ] **Year**: Collection year (e.g., "2024")
- [ ] **Featured**: true/false

#### B. Visual Assets
- [ ] **Cover Image**: Download collection hero image
  - Save to: `public/images/brands/[brand-slug]/collections/[collection-slug]/cover.jpg`
  - Record path: `/images/brands/[brand-slug]/collections/[collection-slug]/cover.jpg`
  
- [ ] **Lookbook Images**: Download 3-6 lookbook images
  - Save to: `public/images/brands/[brand-slug]/collections/[collection-slug]/lookbook-1.jpg`
  - Save to: `public/images/brands/[brand-slug]/collections/[collection-slug]/lookbook-2.jpg`
  - Save to: `public/images/brands/[brand-slug]/collections/[collection-slug]/lookbook-3.jpg`
  - Record as JSON array: `["/images/.../lookbook-1.jpg", "/images/.../lookbook-2.jpg"]`

### Step 3.3: Record Collection Data

```json
{
  "brandSlug": "khara-kapas",
  "name": "Highland",
  "slug": "highland",
  "description": "Inspired by the misty highlands...",
  "season": "Summer/Spring",
  "year": "2024",
  "coverImage": "/images/brands/khara-kapas/collections/highland/cover.jpg",
  "lookbookImages": "[\"/images/brands/khara-kapas/collections/highland/lookbook-1.jpg\", \"/images/brands/khara-kapas/collections/highland/lookbook-2.jpg\"]",
  "featured": true
}
```

---

## PHASE 4: PRODUCT DATA COLLECTION (2-4 hours)

### Step 4.1: For Each Collection, List Products

Visit the collection page and note all products.

**Example for Highland Collection**:
1. Lush Floral Top - `/products/emerald-glow-top`
2. [Product 2] - `/products/[slug]`

### Step 4.2: For Each Product, Collect:

#### A. Navigate to Product Page
Visit: `https://www.qala.global/products/[product-slug]`

#### B. Basic Information
- [ ] **Brand Slug**: Parent brand (e.g., "khara-kapas")
- [ ] **Collection Slug**: Parent collection (e.g., "highland")
- [ ] **Name**: Product name (e.g., "Lush Floral Top")
- [ ] **Slug**: URL-friendly version (e.g., "lush-floral-top")
- [ ] **Category**: Choose from: "dresses", "tops", "co-ord sets", "evening wear", "shirts", "pants"
- [ ] **Featured**: true/false

#### C. Product Details (Check Tabs)
- [ ] **Description**: From "Details" tab - full product description
- [ ] **Fabric Details**: From "Material" tab - fabric composition, origin
- [ ] **Care Instructions**: From "Wash & Care" tab - care guidelines
- [ ] **Price**: From "Bulk Price" section - wholesale price as number (e.g., 4500.00)
- [ ] **Colors**: Available color options as JSON array (e.g., `["Emerald Green", "Ivory"]`)

#### D. Product Images
Download ALL product images (typically 3-5 per product):

- [ ] **Front View**
  - Save to: `public/images/brands/[brand]/products/[product]/front.jpg`
  - Alt text: "[Product Name] - Front View"
  - Order: 0
  - Is Primary: true

- [ ] **Back View**
  - Save to: `public/images/brands/[brand]/products/[product]/back.jpg`
  - Alt text: "[Product Name] - Back View"
  - Order: 1
  - Is Primary: false

- [ ] **Detail Shot**
  - Save to: `public/images/brands/[brand]/products/[product]/detail.jpg`
  - Alt text: "[Product Name] - Detail"
  - Order: 2
  - Is Primary: false

- [ ] **Styled/Lifestyle**
  - Save to: `public/images/brands/[brand]/products/[product]/styled.jpg`
  - Alt text: "[Product Name] - Styled Look"
  - Order: 3
  - Is Primary: false

#### E. Product Sizes
List all available sizes with stock status:

- [ ] XS: In stock? Quantity?
- [ ] S: In stock? Quantity?
- [ ] M: In stock? Quantity?
- [ ] L: In stock? Quantity?
- [ ] XL: In stock? Quantity?

**If quantities not available on Shopify, use reasonable estimates**:
- In stock sizes: 10-20 units
- Out of stock: 0 units

### Step 4.3: Record Product Data

```json
{
  "brandSlug": "khara-kapas",
  "collectionSlug": "highland",
  "name": "Lush Floral Top",
  "slug": "lush-floral-top",
  "description": "A beautiful handcrafted top featuring intricate floral embroidery...",
  "category": "tops",
  "price": 4500.00,
  "fabricDetails": "100% Cotton, Hand-block printed, Natural dyes",
  "careInstructions": "Dry clean only. Do not bleach. Iron on low heat.",
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
    }
  ],
  "sizes": [
    { "size": "S", "inStock": true, "quantity": 15 },
    { "size": "M", "inStock": true, "quantity": 20 },
    { "size": "L", "inStock": true, "quantity": 15 }
  ]
}
```

---

## PHASE 5: DATA ORGANIZATION (30 minutes)

### Step 5.1: Finalize JSON Files

- [ ] Copy filled templates to `data-import/` folder:
  - `data-import/brands.json`
  - `data-import/collections.json`
  - `data-import/products.json`

### Step 5.2: Validate JSON Format

- [ ] Use a JSON validator (e.g., jsonlint.com)
- [ ] Check for common errors:
  - Missing commas
  - Unescaped quotes in strings
  - Incorrect boolean values (use `true`/`false`, not `"true"`/`"false"`)
  - Incorrect number format (use `4500.00`, not `"4500"`)

### Step 5.3: Verify Image Files

- [ ] All referenced images exist in `public/images/` folder
- [ ] Image paths in JSON match actual file locations
- [ ] Images are web-optimized (reasonable file sizes)

---

## PHASE 6: DATABASE IMPORT (30 minutes)

### Step 6.1: Backup Current Database (if any data exists)

```bash
# Optional: Create a backup
npx prisma db push --force-reset
```

### Step 6.2: Run Import Script

```bash
npx tsx scripts/import-data.ts
```

### Step 6.3: Verify Import

- [ ] Check console output for errors
- [ ] Open Prisma Studio: `npx prisma studio`
- [ ] Verify:
  - [ ] All brands imported
  - [ ] All collections imported with correct brandId
  - [ ] All products imported with correct collectionId
  - [ ] Product images linked correctly
  - [ ] Product sizes linked correctly

---

## PHASE 7: TESTING (30 minutes)

### Step 7.1: Start Development Server

```bash
npm run dev
```

### Step 7.2: Test Homepage

- [ ] Visit `http://localhost:3000`
- [ ] Verify brands appear in discovery
- [ ] Test filtering by season, category, aesthetic

### Step 7.3: Test Brand Store Pages

- [ ] Visit `/brands/[brand-slug]`
- [ ] Verify brand story, logo, cover image display
- [ ] Verify collections appear
- [ ] Test collection filtering

### Step 7.4: Test Product Pages

- [ ] Visit a product page
- [ ] Verify all images load
- [ ] Verify product details, fabric, care instructions
- [ ] Verify sizes display correctly
- [ ] Test "Add to Assortment" functionality

### Step 7.5: Test Responsive Design

- [ ] Test on mobile viewport
- [ ] Test on tablet viewport
- [ ] Test on desktop viewport

---

## PHASE 8: INVESTOR DEMO PREPARATION (1 hour)

### Step 8.1: Create Demo Flow

Plan the journey you'll show to investors:

1. **Homepage**: Show brand discovery with filters
2. **Brand Store**: Show 1-2 featured brands with rich stories
3. **Collection**: Show lookbook and product grid
4. **Product Detail**: Show product with multiple images, details
5. **Assortment**: Show curated assortment feature
6. **Sample Crate**: Show sample ordering flow

### Step 8.2: Prepare Talking Points

- [ ] Highlight B2B features (bulk pricing, sample ordering)
- [ ] Emphasize brand storytelling and trust-building
- [ ] Showcase smooth UX and modern design
- [ ] Mention scalability and tech stack

### Step 8.3: Test Demo Flow

- [ ] Run through entire demo flow 2-3 times
- [ ] Note any bugs or issues
- [ ] Fix critical issues
- [ ] Prepare explanations for known limitations

---

## TROUBLESHOOTING

### Import Script Fails

**Error**: "Brand not found"
- **Solution**: Ensure brands are imported before collections

**Error**: "Collection not found"
- **Solution**: Ensure collections are imported before products

**Error**: "Unique constraint failed"
- **Solution**: Check for duplicate slugs in your data

### Images Not Displaying

**Issue**: Images show broken icon
- **Solution**: Verify image paths start with `/images/` (not `public/images/`)
- **Solution**: Ensure images exist in `public/images/` folder
- **Solution**: Check file extensions match (`.jpg` vs `.jpeg`)

### JSON Parsing Errors

**Error**: "Unexpected token"
- **Solution**: Validate JSON at jsonlint.com
- **Solution**: Check for unescaped quotes in strings
- **Solution**: Ensure arrays are properly formatted

---

## MINIMUM VIABLE DATA FOR DEMO

If time is limited, focus on:

### Essential (Must Have):
- **2 brands** with complete data
- **2 collections** per brand (4 total)
- **6-8 products** per collection (24-32 total)
- **3 images** per product minimum
- **Basic sizes** (S, M, L, XL)

### Nice to Have:
- Brand features/press mentions
- Brand videos
- More lookbook images
- Detailed size inventory

### Can Skip:
- User accounts
- Messages
- Customization requests
- Brand features

---

## TIME-SAVING TIPS

1. **Prioritize Quality Over Quantity**: Better to have 2 brands with perfect data than 5 brands with incomplete data

2. **Reuse Content**: If product descriptions are similar, adapt and reuse

3. **Batch Download Images**: Use browser extensions or scripts to download multiple images at once

4. **Use Placeholders**: If missing data, use reasonable defaults:
   - Founded: "2015"
   - Location: "India"
   - Quantity: 15 for in-stock items

5. **Test Early**: Import 1 brand completely and test before doing all brands

6. **Focus on Visual Impact**: Investors care about design and UX - prioritize good images and smooth navigation

---

## FINAL CHECKLIST

Before the investor meeting:

- [ ] Database populated with brands, collections, products
- [ ] All images loading correctly
- [ ] Homepage filters working
- [ ] Brand store pages displaying properly
- [ ] Product pages showing all details
- [ ] Assortment feature working
- [ ] Sample crate feature working
- [ ] Responsive design tested
- [ ] Demo flow practiced
- [ ] Talking points prepared
- [ ] Known issues documented

---

## NEXT STEPS AFTER DEMO

If the investor meeting goes well:

1. **Complete Data Migration**: Add remaining brands and products
2. **Add User Authentication**: Implement login for buyers
3. **Build Messaging System**: Enable buyer-brand communication
4. **Add Order Management**: Track samples and orders
5. **Integrate Payment**: Add payment processing
6. **Deploy to Production**: Move from localhost to live URL

Good luck with your investor meeting! 🚀
