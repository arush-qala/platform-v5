# 📦 DATA MIGRATION RESOURCES

Complete toolkit for migrating data from your Shopify website (qala.global) to Qala Platform V5.

**Created for**: Investor meeting preparation (Monday deadline)  
**Last Updated**: December 6, 2024

---

## 🎯 QUICK START

**If you're in a hurry, follow these 3 steps:**

1. **Read**: `DATA_STRUCTURE_SUMMARY.md` (5 min overview)
2. **Follow**: `DATA_MIGRATION_WORKFLOW.md` (step-by-step guide)
3. **Execute**: Fill templates → Run import script → Test

**Estimated Time**: 4-6 hours for minimal viable demo data

---

## 📚 DOCUMENTATION

### Core Guides

| Document | Purpose | When to Use |
|----------|---------|-------------|
| **DATA_STRUCTURE_SUMMARY.md** | Visual overview & quick reference | Start here for big picture |
| **DATA_MIGRATION_WORKFLOW.md** | Step-by-step execution plan | Follow this to actually do the work |
| **DATA_MIGRATION_GUIDE.md** | Comprehensive technical reference | Look up specific field details |
| **VALID_VALUES_REFERENCE.md** | Field constraints & valid values | When filling in data |

### Templates & Tools

| Resource | Purpose | Location |
|----------|---------|----------|
| **JSON Templates** | Pre-formatted data collection templates | `data-templates/` |
| **Import Script** | Automated database population | `scripts/import-data.ts` |
| **Prisma Schema** | Database structure definition | `prisma/schema.prisma` |

---

## 🗂️ FILE STRUCTURE

```
platform-v5/
│
├── 📄 Documentation (READ THESE)
│   ├── DATA_STRUCTURE_SUMMARY.md      ⭐ START HERE
│   ├── DATA_MIGRATION_WORKFLOW.md     ⭐ STEP-BY-STEP GUIDE
│   ├── DATA_MIGRATION_GUIDE.md        📖 Technical Reference
│   └── VALID_VALUES_REFERENCE.md      📋 Valid Field Values
│
├── 📋 Templates (USE THESE)
│   └── data-templates/
│       ├── brands-template.json
│       ├── collections-template.json
│       └── products-template.json
│
├── 📥 Your Data (CREATE THIS)
│   └── data-import/                   ← Create this folder
│       ├── brands.json                ← Your filled data
│       ├── collections.json           ← Your filled data
│       └── products.json              ← Your filled data
│
├── 🖼️ Images (ORGANIZE THESE)
│   └── public/images/brands/
│       └── [brand-slug]/
│           ├── logo.png
│           ├── cover.jpg
│           ├── collections/
│           │   └── [collection-slug]/
│           │       ├── cover.jpg
│           │       └── lookbook-*.jpg
│           └── products/
│               └── [product-slug]/
│                   ├── front.jpg
│                   ├── back.jpg
│                   ├── detail.jpg
│                   └── styled.jpg
│
├── 🔧 Tools (RUN THESE)
│   └── scripts/
│       └── import-data.ts             ← Import automation
│
└── 🗄️ Database
    └── prisma/
        └── schema.prisma              ← Database schema
```

---

## 🚀 WORKFLOW OVERVIEW

```
┌─────────────────────────────────────────────────────────────────┐
│  1. EXTRACT from qala.global                                    │
│     • Navigate to brand/collection/product pages                │
│     • Copy content, download images                             │
└─────────────────────────────────────────────────────────────────┘
                              ↓
┌─────────────────────────────────────────────────────────────────┐
│  2. ORGANIZE data                                               │
│     • Fill JSON templates in data-templates/                    │
│     • Save images to public/images/brands/                      │
└─────────────────────────────────────────────────────────────────┘
                              ↓
┌─────────────────────────────────────────────────────────────────┐
│  3. VALIDATE data                                               │
│     • Check JSON format (jsonlint.com)                          │
│     • Verify image paths                                        │
└─────────────────────────────────────────────────────────────────┘
                              ↓
┌─────────────────────────────────────────────────────────────────┐
│  4. IMPORT to database                                          │
│     • Move filled JSONs to data-import/                         │
│     • Run: npx tsx scripts/import-data.ts                       │
└─────────────────────────────────────────────────────────────────┘
                              ↓
┌─────────────────────────────────────────────────────────────────┐
│  5. TEST & VERIFY                                               │
│     • Open Prisma Studio: npx prisma studio                     │
│     • Start dev server: npm run dev                             │
│     • Test all pages                                            │
└─────────────────────────────────────────────────────────────────┘
```

---

## 📊 DATA STRUCTURE AT A GLANCE

### Hierarchy
```
Brand (e.g., "Khara Kapas")
  └── Collection (e.g., "Highland")
      └── Product (e.g., "Lush Floral Top")
          ├── ProductImage (multiple)
          └── ProductSize (multiple)
```

### Required Data

**Per Brand**:
- Name, slug, aesthetic (JSON array)
- Recommended: description, story, logo, cover, founded, location

**Per Collection**:
- Brand slug, name, slug, season
- Recommended: description, year, cover, lookbook images

**Per Product**:
- Brand slug, collection slug, name, slug, category, price
- Colors (JSON array), images (array), sizes (array)
- Recommended: description, fabric details, care instructions

---

## 🎯 MINIMUM VIABLE DATA

For a successful investor demo, you need:

### Scope
- **2 brands** with complete information
- **2 collections** per brand (4 total)
- **8 products** per collection (32 total)
- **3-4 images** per product (~100 images)

### Time Estimate
- **4-6 hours** total
- Can be done in one focused work session

### What This Achieves
- ✅ Demonstrates brand discovery and filtering
- ✅ Shows brand storytelling capabilities
- ✅ Displays product catalog with rich details
- ✅ Proves technical functionality
- ✅ Showcases design and UX

---

## 🛠️ COMMANDS REFERENCE

```bash
# Setup database
npx prisma migrate dev

# View database (optional)
npx prisma studio

# Import data
npx tsx scripts/import-data.ts

# Start development server
npm run dev

# Open in browser
# http://localhost:3000
```

---

## 📋 VALID VALUES QUICK REFERENCE

### Product Categories
`"dresses"` | `"co-ord sets"` | `"evening wear"` | `"tops"` | `"shirts"` | `"pants"`

### Collection Seasons
`"Summer/Spring"` | `"Fall/Winter"` | `"Resortwear"`

### Product Sizes
`"XS"` | `"S"` | `"M"` | `"L"` | `"XL"` | `"2XL"` | `"3XL"` | `"Free Size"`

### Brand Aesthetic (examples)
`"sustainable"` | `"handcrafted"` | `"luxury"` | `"minimalist"` | `"contemporary"` | `"traditional"`

---

## ✅ CHECKLIST

### Before You Start
- [ ] Read DATA_STRUCTURE_SUMMARY.md
- [ ] Review Prisma schema (prisma/schema.prisma)
- [ ] Ensure database is set up (npx prisma migrate dev)
- [ ] Create data-import/ folder

### Data Collection
- [ ] List brands to migrate (recommend 2-3)
- [ ] Copy JSON templates from data-templates/
- [ ] Extract brand data from qala.global
- [ ] Extract collection data
- [ ] Extract product data
- [ ] Download all images
- [ ] Organize images in public/images/brands/

### Data Validation
- [ ] Validate JSON format (jsonlint.com)
- [ ] Check all image paths exist
- [ ] Verify categories use valid values
- [ ] Verify seasons use valid values
- [ ] Ensure prices are numbers, not strings
- [ ] Ensure JSON arrays are stringified

### Import & Testing
- [ ] Move filled JSONs to data-import/
- [ ] Run import script
- [ ] Check for errors in console
- [ ] Verify in Prisma Studio
- [ ] Test homepage
- [ ] Test brand store pages
- [ ] Test product pages
- [ ] Test responsive design

### Demo Preparation
- [ ] Plan demo flow
- [ ] Practice demo 2-3 times
- [ ] Prepare talking points
- [ ] Document known issues

---

## 🆘 TROUBLESHOOTING

### Common Issues

**Import fails with "Brand not found"**
- Ensure brands.json is imported before collections.json

**Images not displaying**
- Verify paths start with `/images/` not `public/images/`
- Check file extensions match (.jpg vs .jpeg)

**JSON parsing errors**
- Validate at jsonlint.com
- Check for unescaped quotes in strings
- Ensure arrays use proper format

**Unique constraint errors**
- Check for duplicate slugs in your data
- Slugs must be unique per brand/collection

---

## 💡 PRO TIPS

1. **Start with 1 brand**: Import completely, test, then scale
2. **Batch download images**: Use browser extensions for efficiency
3. **Reuse content**: Adapt similar descriptions across products
4. **Use reasonable defaults**: If data missing, use placeholders
5. **Test early and often**: Don't wait until all data is collected
6. **Prioritize visuals**: Good images > quantity of products

---

## 📞 SUPPORT

If you get stuck:

1. Check the **Troubleshooting** section in DATA_MIGRATION_WORKFLOW.md
2. Validate your JSON at [jsonlint.com](https://jsonlint.com)
3. Review the Prisma schema to understand relationships
4. Check browser console and terminal for error messages
5. Use Prisma Studio to inspect database state

---

## 🎉 SUCCESS CRITERIA

Your migration is complete when:

- ✅ Homepage shows brands with working filters
- ✅ Brand pages display logos, covers, stories, collections
- ✅ Collection pages show lookbooks and products
- ✅ Product pages show images, details, sizes, prices
- ✅ No broken images or console errors
- ✅ Responsive design works on all devices
- ✅ Assortment and Sample Crate features work

---

## 📅 TIMELINE FOR MONDAY DEMO

### Saturday (Today)
- [ ] Read documentation (1 hour)
- [ ] Extract data for 1 brand (2 hours)
- [ ] Import and test (1 hour)

### Sunday
- [ ] Extract data for 2nd brand (2 hours)
- [ ] Complete import (30 min)
- [ ] Full testing (1 hour)
- [ ] Demo preparation (1 hour)

### Monday Morning
- [ ] Final testing
- [ ] Practice demo flow
- [ ] Prepare backup plan

---

## 🚀 NEXT STEPS

1. **Read** DATA_STRUCTURE_SUMMARY.md (5 minutes)
2. **Follow** DATA_MIGRATION_WORKFLOW.md (start working)
3. **Reference** other docs as needed
4. **Import** your data
5. **Test** thoroughly
6. **Prepare** your demo
7. **Impress** your investor! 🎯

---

**Good luck with your investor meeting!** 🚀

You've got this! The platform is solid, the data structure is clear, and you have all the tools you need. Focus on quality over quantity - 2 well-presented brands will impress more than 10 incomplete ones.
