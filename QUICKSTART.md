# Qala Platform - Quick Start Guide

## 🚀 Getting Started in 3 Minutes

### Step 1: Verify Installation
The dependencies are already installed and the database is seeded with 5 luxury brands!

### Step 2: Start the Server
The dev server should already be running. If not:
```bash
npm run dev
```

### Step 3: Open Your Browser
Visit: **http://localhost:3000**

---

## 🎯 What to Explore

### 1. Homepage (Already Open)
- **Try the dual-selector**: "I want to find [Category] for [Season]"
- Click the dropdown buttons to see the full-screen modal
- Select different combinations:
  - "Dresses for Summer/Spring"
  - "Evening Wear for Fall/Winter"
  - "Co-ord Sets for Resortwear"

### 2. Brand Timeline (Bottom of Homepage)
- After selecting filters, see 5 brands appear
- **Click the dots** on the timeline to switch between brands
- **Click "Explore Brand"** button to visit the brand storefront

### 3. Brand Storefront
Example URLs to try:
- http://localhost:3000/brands/maison-solene
- http://localhost:3000/brands/atelier-lumiere
- http://localhost:3000/brands/casa-valentina
- http://localhost:3000/brands/noir-ivoire
- http://localhost:3000/brands/luna-rosa

**What to click:**
- "Contact Brand" → Opens chat panel
- Featured Lookbook banner → Opens horizontal scroll gallery
- Collection thumbnails → Opens product collection

### 4. Horizontal Lookbook Gallery
- **Scroll down** to see images move horizontally
- Enjoy the parallax effect
- See the scroll indicator at the bottom
- Continue scrolling to reach "Shop This Collection" button

### 5. Product Collection Page
Example: http://localhost:3000/brands/maison-solene/collections/architecte

**Top Half**: Product carousel
- Use **arrow keys** or click **arrow buttons** to navigate
- See adjacent products at 40% opacity
- Watch smooth transitions

**Bottom Half**: Product details
- Select sizes and quantities using +/- buttons
- Add brand kit ($75 option)
- Write customization requests
- See total price update in real-time

**Scroll Down**: Virtual Try-On
- Select body shape template (Petite, Average, Tall, Plus)
- Click "Customize Measurements" to use sliders
- Click play button on virtual runway

### 6. Chat Feature
- Click "Contact Brand" on any brand page
- Type a message and press Enter
- See simulated brand response
- Try the quick action buttons

---

## 🎨 Design Elements to Notice

### Luxury Aesthetic
- **Cream and ivory** backgrounds (old money luxury)
- **Gold accents** on hover and active states
- **Cormorant Garamond** font for headings (elegant serif)
- **Inter** font for body text (clean sans-serif)

### Smooth Animations
- Page transitions fade in/out
- Elements animate on scroll
- Hover effects on all buttons
- Loading spinners match color scheme

### Responsive Design
- Try resizing your browser window
- Works on mobile, tablet, and desktop
- Navigation adapts to screen size

---

## 📊 Sample Data Available

### Brands (5 total)
1. **Maison Solène** - French contemporary (2 collections)
2. **Atelier Lumière** - Hand-painted textiles (1 collection)
3. **Casa Valentina** - Italian resort wear (1 collection)
4. **Noir & Ivoire** - Monochromatic minimalism (1 collection)
5. **Luna Rosa** - Bohemian luxury (1 collection)

### Products (16 total)
- Dresses
- Co-ord Sets
- Evening Wear
- Tops
- Shirts
- Pants

All with:
- Multiple images
- Detailed descriptions
- Fabric information
- Care instructions
- Multiple sizes (XS, S, M, L, XL)
- Color variants
- Realistic pricing

---

## 🧪 Testing Checklist

### Homepage
- [ ] Click both filter dropdowns
- [ ] Select different categories and seasons
- [ ] See brand results update
- [ ] Check results count in top-right
- [ ] Click timeline dots to switch brands
- [ ] Click "Explore Brand" button

### Brand Page
- [ ] Scroll through entire page
- [ ] Click "Contact Brand" button
- [ ] View collections grid
- [ ] Click featured lookbook banner
- [ ] Click collection thumbnails

### Lookbook
- [ ] Scroll down to move images horizontally
- [ ] See look counter update (01/04)
- [ ] Reach final "Shop Collection" button

### Product Collection
- [ ] Use carousel arrows to navigate
- [ ] Try keyboard arrow keys
- [ ] Click dots at top to jump
- [ ] Add quantities for different sizes
- [ ] Toggle brand kit option
- [ ] Type in customization field
- [ ] See total price update

### Virtual Try-On
- [ ] Select different body templates
- [ ] Click "Customize Measurements"
- [ ] Adjust sliders
- [ ] Click play button
- [ ] See loading animation

### Chat
- [ ] Open chat panel
- [ ] Type and send message
- [ ] See auto-response
- [ ] Click quick action buttons
- [ ] Close panel

---

## 🔧 Useful Commands

### Development
```bash
npm run dev          # Start dev server
npm run build        # Build for production
npm run start        # Start production server
```

### Database
```bash
npm run db:seed      # Reseed database
npm run db:studio    # Open Prisma Studio (visual DB editor)
npx prisma db push   # Push schema changes
```

### Viewing Data
```bash
npm run db:studio
```
This opens a browser-based database viewer where you can see all brands, products, and data.

---

## 🎯 Key Features to Demonstrate

### To Stakeholders
1. **Discovery Flow** (Homepage → Timeline → Brand)
2. **Visual Storytelling** (Brand page design)
3. **Immersive Experience** (Lookbook horizontal scroll)
4. **Product Browsing** (Carousel with details)
5. **Virtual Try-On** (Body customization)

### To Developers
1. **Clean API Routes** (`/api/brands`, `/api/collections`)
2. **Reusable Components** (All in `components/`)
3. **Type Safety** (TypeScript throughout)
4. **Animation Performance** (Framer Motion + GPU acceleration)
5. **Database Schema** (Prisma with relationships)

---

## 🚨 Troubleshooting

### Dev Server Won't Start
```bash
# Kill any process on port 3000
netstat -ano | findstr :3000
# Note the PID and kill it
taskkill /PID <PID> /F

# Restart
npm run dev
```

### Database Issues
```bash
# Reset everything
rm -rf prisma/dev.db
npx prisma db push
npm run db:seed
```

### Missing Dependencies
```bash
npm install
npx prisma generate
```

---

## 📱 Best Viewing Experience

- **Browser**: Chrome, Firefox, Safari, or Edge (latest version)
- **Screen Size**: 1440px+ for best desktop experience
- **Connection**: Local (no internet required for core features)

---

## 🎉 You're Ready!

The platform is fully functional and ready to explore. Every feature mentioned in your requirements has been implemented and is working.

**Enjoy exploring the Qala luxury fashion sourcing platform!** ✨

---

Need help? Check:
- `README.md` - Full documentation
- `DEVELOPMENT_SUMMARY.md` - Technical details
- Prisma Studio - Visual database browser

