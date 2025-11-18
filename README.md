# Qala Platform - Next Generation Luxury Sourcing Platform

A B2B platform for discovering and sourcing new age independent designer fashion labels for hi-end and luxury niche boutiques and retail stores globally.

## Features

### 🏠 Homepage
- **Dual-Selector Filter Interface**: Natural language filter with two sequential dropdowns ("I want to find [Category] for [Season]")
- **Brand Timeline Navigation**: Horizontal timeline slider with 5 designer brands, featuring smooth transitions and full-screen content displays
- **Luxury Design Aesthetic**: Clean, minimalist UI with quiet, old money luxury color palette

### 🏪 Brand B2B Storefront
- **Visual Storytelling**: High-definition brand videos, features, and publications
- **Collections Gallery**: Grid view of brand collections with hover effects
- **Featured Lookbook**: Clickable banner leading to horizontal scroll-triggered parallax gallery
- **Chat Functionality**: Direct messaging with designers

### 📸 Lookbook Gallery
- **Horizontal Scroll Parallax**: Vertical scrolling drives horizontal content movement
- **Full-Page Experience**: Each panel takes full viewport width
- **Smooth Transitions**: Buttery smooth scroll experience with progress indicator

### 👗 Collection & Product View
- **Centered Carousel**: Instagram-style highlight reel with adjacent item previews
- **Product Details**: Comprehensive product information with size/quantity matrix
- **Customization Options**: Request customizations for products
- **Brand Kit Ordering**: Optional selection of keepsakes, catalog, hand block, and samples
- **Virtual Try-On**: Body shape templates with customizable measurements
- **Virtual Runway**: 3D render preview (placeholder for future implementation)

### 💳 Checkout & Enquiry
- **Enquiry Form**: Complete form for submitting orders to designers
- **Order Tracking**: Real-time tracking with automated updates
- **Status Updates**: Visual progress indicators for order stages

### 📊 Buyer Dashboard
- **Order Management**: View all recent orders with status tracking
- **Feedback System**: Rate and review brands and products
- **Reorder Functionality**: Easy reordering from previous purchases
- **Order History**: Complete order history with tracking links

## Technology Stack

- **Framework**: Next.js 16 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS v4
- **Animations**: Framer Motion
- **Smooth Scrolling**: Lenis
- **Icons**: Lucide React

## Getting Started

### Prerequisites
- Node.js 18+ 
- npm or yarn

### Installation

```bash
# Install dependencies
npm install

# Run development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

### Build for Production

```bash
npm run build
npm start
```

## Project Structure

```
platform-v5/
├── app/                    # Next.js app router pages
│   ├── page.tsx           # Homepage
│   ├── brand/             # Brand pages
│   │   └── [id]/
│   │       ├── page.tsx   # Brand storefront
│   │       ├── lookbook/  # Lookbook gallery
│   │       └── collection/[collectionId]/  # Collection view
│   ├── checkout/          # Checkout/enquiry page
│   ├── tracking/          # Order tracking
│   └── dashboard/         # Buyer dashboard
├── components/            # React components
│   ├── DualSelectorFilter.tsx
│   ├── BrandTimeline.tsx
│   ├── Navigation.tsx
│   └── SmoothScrollProvider.tsx
├── data/                  # Mock data
│   └── brands.ts
├── types/                 # TypeScript types
│   └── index.ts
└── public/               # Static assets
```

## Design Philosophy

The platform is designed with a **quiet, old money luxury** aesthetic:
- Light, neutral color palettes (creams, beiges, soft grays)
- Minimalist design with clean lines
- Smooth, seamless transitions throughout
- Intuitive navigation for users aged 40-60
- Luxury feel without complexity

## Key User Flows

1. **Discovery**: Homepage → Filter → Browse Brands → Select Brand
2. **Exploration**: Brand Page → View Collections → Explore Lookbook
3. **Selection**: Collection → Product Carousel → Select Size/Quantity → Customize
4. **Purchase**: Add to Enquiry → Checkout → Submit Enquiry
5. **Tracking**: Dashboard → View Orders → Track Status → Leave Feedback

## Future Enhancements

- [ ] Real 3D virtual try-on integration
- [ ] Virtual runway with actual 3D renders
- [ ] Real-time chat functionality
- [ ] Backend API integration
- [ ] Payment processing
- [ ] Advanced search and filtering
- [ ] Saved favorites/wishlist
- [ ] Multi-language support

## License

Private - Qala Platform
