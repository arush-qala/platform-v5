# Qala - Luxury Fashion Sourcing Platform

A Next Generation B2B platform connecting discerning boutique owners with independent designer fashion labels.

## Overview

Qala is a sophisticated B2B fashion sourcing platform designed for owners and buyers of luxury boutiques and retail stores. The platform provides an elegant, easy-to-use interface for discovering and sourcing unique designer pieces from emerging brands worldwide.

## Features

### ✨ Core Functionality

- **Intelligent Brand Discovery**: Full-screen image slideshow with natural language filter interface ("I want to source for [Category] & my boutique is [Season]") inspired by [Pentagram's design](https://www.pentagram.com/)
- **Brand Timeline Navigation**: Interactive horizontal timeline inspired by [Bulgari's history page](https://www.bulgari.com/en-in/bvlgari-history), showcasing 5 curated brands with image galleries, heart/like functionality, and smooth transitions
- **Brand B2B Storefront**: Single-page visual storytelling featuring brand campaign images, featured publications, process write-ups, and socio-environmental commitments
- **Scroll-Hijacking Lookbooks**: Revolutionary horizontal scroll experience where vertical scrolling drives horizontal content movement through lookbook images (300vh scroll space)
- **Product Carousel**: Instagram-style highlight reel with adjacent item preview for browsing products
- **Smart Size & Quantity Selection**: Matrix-style interface for ordering multiple sizes efficiently
- **Virtual Try-On**: AI-powered body shape customization with 3D runway visualization (placeholder ready for DressX/Vntana integration)
- **Real-time Chat**: Direct messaging with brands for inquiries and customization requests
- **Brand Kit Option**: Order samples, catalogs, and hand blocks to evaluate collections

### 🎨 Design System

**Old Money Luxury Aesthetic**
- Cream (#FAF8F5), Ivory (#FFFEF9), Sand (#E8E2D5) base tones
- Gold Accent (#B8956A) for highlights
- Muted Rose (#D4ABA4) and Sage (#9CAA9E) for depth
- Cormorant Garamond for elegant headings
- Inter for clean, readable body text

### 🏗️ Technical Architecture

**Frontend**
- Next.js 16 with App Router
- React 19 with TypeScript
- Framer Motion for smooth animations
- GSAP for advanced scroll interactions
- Lenis for buttery smooth scrolling
- Tailwind CSS 4 for styling

**Backend**
- Next.js API Routes
- Prisma ORM for database operations
- SQLite for development (easily switchable to PostgreSQL)

**Database Schema**
- Brand, Collection, Product models
- ProductImage, ProductSize for variants
- User, Message for chat functionality
- Customization for bespoke requests

## Getting Started

### Prerequisites

- Node.js 18+ 
- npm or yarn

### Installation

```bash
# Install dependencies
npm install

# Generate Prisma client
npx prisma generate

# Push database schema
npx prisma db push

# Seed database with sample brands
npm run db:seed

# Start development server
npm run dev
```

Visit `http://localhost:3000` to view the platform.

### Database Management

```bash
# View database in Prisma Studio
npm run db:studio

# Reset and reseed database
npx prisma db push --force-reset
npm run db:seed
```

## Project Structure

```
qala-platform/
├── app/
│   ├── api/                    # API routes
│   │   ├── brands/            # Brand endpoints
│   │   └── collections/       # Collection endpoints
│   ├── brands/                # Brand pages
│   │   └── [slug]/
│   │       ├── page.tsx       # Brand storefront
│   │       ├── collections/   # Collection pages
│   │       └── lookbook/      # Lookbook galleries
│   ├── globals.css            # Design system styles
│   ├── layout.tsx             # Root layout
│   └── page.tsx               # Homepage
├── components/
│   ├── chat/                  # Chat components
│   ├── home/                  # Homepage components
│   ├── products/              # Product components
│   └── ui/                    # Reusable UI components
├── lib/
│   └── prisma.ts              # Prisma client
├── prisma/
│   ├── schema.prisma          # Database schema
│   └── seed.ts                # Sample data
└── public/                    # Static assets
```

## Sample Brands

The platform comes seeded with 5 fictional luxury brands:

1. **Maison Solène** - Contemporary Parisian elegance
2. **Atelier Lumière** - Artistic, hand-painted textiles
3. **Casa Valentina** - Italian sophistication
4. **Noir & Ivoire** - Monochromatic mastery
5. **Luna Rosa** - Bohemian luxury

Each brand includes:
- 1-2 collections
- 3+ products per collection
- High-quality imagery
- Complete product details

## User Journey

1. **Discovery (Page 1)**: 
   - Land on full-screen slideshow with elegant filter interface
   - Select from natural language dropdowns: "I want to source for [Category] & my boutique is [Season]"
   - Modal overlays with pill-style selections (Pentagram-inspired)

2. **Browse (Page 2)**:
   - View 5 curated brand recommendations in horizontal timeline (Bulgari-inspired)
   - Navigate using numbered circular markers with animated progress indicator
   - Like brands with heart button for more recommendations
   - View brand info + 5-image gallery for each brand
   - Click "Visit Brand Store" to explore further

3. **Explore Brand Store**:
   - Hero section with brand logo, location, and featured publications
   - **Scroll-hijacking lookbook**: Vertical scrolling drives horizontal image gallery
   - Process write-up with socio-environmental tags
   - Behind-the-scenes content and founder story

4. **Shop Collection**: Use carousel to browse products with details below
5. **Customize**: Select sizes/quantities, add customization requests
6. **Try On**: Use virtual try-on to visualize products on different body shapes
7. **Connect**: Chat with brand representatives for inquiries
8. **Order**: Send enquiry with selected items and customizations

## Customization

### Switching to PostgreSQL

1. Update `prisma/schema.prisma`:
```prisma
datasource db {
  provider = "postgresql"
  url      = env("DATABASE_URL")
}
```

2. Create `.env.local`:
```
DATABASE_URL="postgresql://user:password@localhost:5432/qala"
```

3. Run migrations:
```bash
npx prisma db push
npm run db:seed
```

### Virtual Try-On Integration

The platform includes a sophisticated placeholder for virtual try-on functionality. To integrate with DressX or Vntana:

1. Obtain API credentials from your chosen provider
2. Update `components/products/VirtualTryOn.tsx`
3. Implement API calls for 3D model generation
4. Replace placeholder video with actual rendered output

### Real-time Chat

Current implementation uses simulated responses. To add real-time functionality:

1. Install Socket.io: `npm install socket.io socket.io-client`
2. Create WebSocket server in `app/api/socket/route.ts`
3. Update `components/chat/ChatPanel.tsx` with Socket.io client
4. Connect to your preferred messaging backend

## Performance Optimizations

- Image optimization with Next.js Image component
- Lazy loading for off-screen content
- Smooth scroll with Lenis
- Hardware-accelerated animations with Framer Motion
- Code splitting with dynamic imports

## Browser Support

- Chrome 90+
- Firefox 88+
- Safari 14+
- Edge 90+

## Future Enhancements

- [ ] User authentication and profiles
- [ ] Order tracking and management
- [ ] Wishlist and saved collections
- [ ] Email notifications
- [ ] Invoice generation
- [ ] Multi-language support
- [ ] Currency conversion
- [ ] Mobile app (React Native)
- [ ] AI-powered style recommendations
- [ ] Blockchain-based authenticity verification

## Contributing

This is a proprietary platform. For inquiries about contributing or licensing, please contact the development team.

## License

Copyright © 2024 Qala Platform. All rights reserved.

## Support

For technical support or feature requests, please reach out through the appropriate channels.

---

Built with ❤️ for the luxury fashion industry
