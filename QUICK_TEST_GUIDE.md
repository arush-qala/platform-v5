# Quick Test Guide - Qala Platform v5

## 🚀 How to Run the Application

### 1. Start the Development Server
```bash
npm run dev
```

The application will be available at: **http://localhost:3000**

---

## 🧪 Testing the New Features

### Page 1: Homepage - Filter Interface

**What to Test**:
1. **Full-screen slideshow background** - Notice the subtle animated background
2. **Sentence-based filter** - "I want to source for [Category] & my boutique is [Season]"
3. **Modal overlays**:
   - Click on a dropdown → Full-screen modal appears with blur backdrop
   - Select an option → Modal closes smoothly
   - Options displayed as large pill-style buttons

**Expected Behavior**:
- ✅ Background image has subtle opacity animation
- ✅ Dropdowns open as full-screen overlays (Pentagram-style)
- ✅ Selected options show in deep charcoal background
- ✅ Brands are filtered dynamically
- ✅ Counter shows "X brands discovered"

---

### Page 2: Brand Timeline (Bulgari-Inspired)

**What to Test**:
1. **Horizontal timeline**:
   - 5 circular markers numbered 1-5
   - Click any marker to jump to that brand
   - Notice the animated progress line filling from left to right

2. **Brand showcase**:
   - Large brand name and description
   - 5-image gallery on the right (responsive grid)
   - USP tags as pills
   - Previous/Next arrows at bottom

3. **Heart/Like functionality**:
   - Click "Like Brand" button
   - Heart icon fills with color
   - Button changes to "Liked" with muted rose background
   - Click again to unlike

4. **CTAs**:
   - "Visit Brand Store" → Goes to brand page
   - "Like Brand" → Toggles like state

**Expected Behavior**:
- ✅ Smooth transitions between brands (fade/slide animation)
- ✅ Timeline progress indicator animates smoothly
- ✅ Image gallery displays collection images
- ✅ Like button toggles state with animation
- ✅ Counter shows "3 of 5" format

**Try These Actions**:
```
1. Click marker "1" → View first brand
2. Click "Like Brand" → Heart fills
3. Click marker "3" → Jump to third brand
4. Click "Next →" → Navigate to fourth brand
5. Click "Visit Brand Store" → Go to brand page
```

---

### Page 3: Brand Store with Scroll-Hijacking

**What to Test**:

**Section 1: Hero** (Full-screen)
- Brand logo, location, featured publications
- Brand intro description

**Section 2: Horizontal Scroll Lookbook** 🎯 **KEY FEATURE**
- Start scrolling down vertically
- Notice the lookbook images sliding horizontally
- Look numbers (01, 02, 03...) in top-left of each image
- "Scroll to explore →" indicator at bottom
- Continue scrolling until you see "Start Selecting" CTA
- This section has **300vh height** - meaning 3× viewport scroll

**Section 3: Vertical Scroll Resumes**
- After lookbook, normal vertical scrolling continues
- Process write-up and sustainability icons
- Behind-the-scenes images

**Section 4 & 5: CTAs**
- Other collections grid
- "Discover More Brands" CTA

**Expected Behavior**:
- ✅ **Vertical scroll drives horizontal movement** in lookbook section
- ✅ Smooth 1:1 scroll mapping
- ✅ Images slide from right to left as you scroll down
- ✅ After lookbook section, vertical scroll resumes normally
- ✅ Sticky header stays visible throughout

**Scroll Test**:
```
1. Enter a brand page
2. Scroll down past hero section
3. Notice lookbook images sliding horizontally ← ← ←
4. Keep scrolling to see all lookbook images
5. Continue scrolling to see process section
6. Notice vertical scroll has resumed
```

---

## 🎨 Visual Quality Checks

### Typography
- [ ] Large, elegant Cormorant Garamond headings
- [ ] Clean Inter body text
- [ ] Proper hierarchy (7xl → xl)

### Colors (Old Money Luxury)
- [ ] Cream backgrounds (#FAF8F5)
- [ ] Ivory surfaces (#FFFEF9)
- [ ] Gold accent highlights (#B8956A)
- [ ] Muted rose for heart button (#D4ABA4)
- [ ] Warm, light tones throughout

### Animations
- [ ] Smooth fade transitions (600ms)
- [ ] Scale effects on hover
- [ ] No janky animations
- [ ] GPU-accelerated transforms

### Responsive
- [ ] Test on mobile (stacked layouts)
- [ ] Test on tablet (optimized grids)
- [ ] Test on desktop (full multi-column)

---

## 🔍 Specific Test Cases

### Test Case 1: Filter and Navigation
```
1. Go to homepage
2. Click "Everything" dropdown
3. Select "Dresses"
4. Click "Everyone" dropdown
5. Select "Summer/Spring"
6. Verify brands are filtered
7. Scroll to timeline
8. Click marker "2"
9. Click "Visit Brand Store"
```

### Test Case 2: Like Functionality
```
1. On homepage, scroll to timeline
2. Navigate to brand 1
3. Click "Like Brand" → verify heart fills
4. Navigate to brand 2
5. Click "Like Brand" → verify state
6. Navigate back to brand 1
7. Verify it's still liked
8. Click "Like Brand" again → verify unlike
```

### Test Case 3: Scroll-Hijacking
```
1. Visit any brand page (e.g., /brands/maison-solene)
2. Scroll down slowly past hero
3. Observe horizontal movement in lookbook
4. Count the number of looks (should slide through all)
5. Continue scrolling until CTA appears
6. Continue scrolling to vertical content
7. Verify smooth transition between scroll modes
```

### Test Case 4: Complete User Journey
```
1. Homepage → Select filters
2. View brand recommendations in timeline
3. Like a brand
4. Visit brand store
5. Experience horizontal lookbook scroll
6. View process/sustainability info
7. Click "Other Collections"
8. Browse products in collection
9. Use chat panel to contact brand
```

---

## 📊 Performance Checks

- [ ] Images load progressively (Next.js Image optimization)
- [ ] No layout shifts (CLS)
- [ ] Smooth scroll performance (60fps)
- [ ] No console errors
- [ ] Fast page transitions

---

## 🐛 Common Issues & Solutions

### Issue: Lookbook doesn't scroll horizontally
**Solution**: Make sure you're scrolling vertically through the lookbook section (300vh height)

### Issue: Modal doesn't close
**Solution**: Click outside the modal content or on the backdrop blur

### Issue: Images not loading
**Solution**: Check that database is seeded: `npm run db:seed`

### Issue: Dev server not starting
**Solution**: 
```bash
# Kill any running processes on port 3000
# Windows:
netstat -ano | findstr :3000
taskkill /PID <PID> /F

# Then restart
npm run dev
```

---

## ✅ Acceptance Criteria

All of these should work:
- [x] Full-screen slideshow background on homepage
- [x] Sentence-based filter: "I want to source for [X] & my boutique is [Y]"
- [x] Modal overlay dropdowns with backdrop blur
- [x] Horizontal timeline with 5 brand markers
- [x] Animated progress indicator on timeline
- [x] Heart/like button with toggle functionality
- [x] 5-image brand gallery
- [x] Smooth transitions between brand selections
- [x] Scroll-hijacking horizontal lookbook
- [x] Vertical scroll driving horizontal movement
- [x] Process write-up section
- [x] Socio-environmental tags
- [x] Other collections CTA
- [x] See more brands CTA
- [x] Old money luxury color palette
- [x] Seamless transitions throughout

---

## 🎯 Pro Tips

1. **Best viewed on desktop** first to see the full scroll-hijacking effect
2. **Scroll slowly** through the lookbook section to appreciate the animation
3. **Try keyboard navigation** in product carousel (arrow keys)
4. **Check mobile view** for responsive layouts
5. **Test with different brands** - each has unique content

---

## 📸 Screenshot Points

Take screenshots at these moments to showcase:
1. Homepage filter interface (modal open)
2. Brand timeline with progress indicator
3. Horizontal lookbook mid-scroll
4. Brand process section
5. Like button in active state

---

**Happy Testing!** 🎉

If you encounter any issues, check the console for errors and refer to the `MODIFICATIONS_SUMMARY.md` for detailed implementation notes.

