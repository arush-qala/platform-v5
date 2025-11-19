import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function main() {
  console.log('🌱 Seeding database...')

  // Clean existing data
  await prisma.message.deleteMany()
  await prisma.customization.deleteMany()
  await prisma.productSize.deleteMany()
  await prisma.productImage.deleteMany()
  await prisma.product.deleteMany()
  await prisma.collection.deleteMany()
  await prisma.brandFeature.deleteMany()
  await prisma.brand.deleteMany()
  await prisma.user.deleteMany()

  // Create 5 luxury brands
  const brands = [
    {
      name: 'Maison Solène',
      slug: 'maison-solene',
      description: 'Contemporary elegance meets timeless craftsmanship',
      story: 'Founded in 2018 by French designer Solène Mercier, Maison Solène embodies the essence of modern Parisian luxury. Each piece is crafted with meticulous attention to detail, using only the finest sustainable fabrics sourced from Italian and French mills. The brand philosophy centers on creating investment pieces that transcend seasons, celebrating the female form through architectural silhouettes and unexpected draping.',
      videoUrl: 'https://player.vimeo.com/video/example1',
      logoUrl: 'https://images.unsplash.com/photo-1594633312681-425c7b97ccd1?w=300&h=100&fit=crop',
      coverImage: 'https://images.unsplash.com/photo-1539008835657-9e8e9680c956?w=1920&h=1080&fit=crop',
      founded: '2018',
      location: 'Paris, France',
      aesthetic: ['dresses', 'evening wear', 'minimalist', 'architectural'],
      featured: true,
    },
    {
      name: 'Atelier Lumière',
      slug: 'atelier-lumiere',
      description: 'Where art meets fashion in luminous harmony',
      story: 'Atelier Lumière is the brainchild of sisters Marie and Claire Dubois, who bring together their backgrounds in fine arts and fashion design. The brand is known for its painterly approach to textiles, featuring hand-painted silk and innovative dyeing techniques that create one-of-a-kind pieces. Each collection tells a story of light, color, and feminine strength, perfect for the discerning buyer seeking unique pieces that make a statement.',
      videoUrl: 'https://player.vimeo.com/video/example2',
      logoUrl: 'https://images.unsplash.com/photo-1594633313593-bab3825d0caf?w=300&h=100&fit=crop',
      coverImage: 'https://images.unsplash.com/photo-1490481651871-ab68de25d43d?w=1920&h=1080&fit=crop',
      founded: '2020',
      location: 'Lyon, France',
      aesthetic: ['dresses', 'co-ord sets', 'tops', 'artistic', 'colorful'],
      featured: true,
    },
    {
      name: 'Casa Valentina',
      slug: 'casa-valentina',
      description: 'Italian sophistication with a modern edge',
      story: 'Casa Valentina represents the pinnacle of Italian craftsmanship, founded by Valentina Romano in Milan. With over 20 years of experience at prestigious fashion houses, Valentina launched her eponymous label to celebrate the art of slow fashion. Each garment is produced in limited quantities in the brand\'s Milanese atelier, utilizing heritage techniques passed down through generations of artisans. The brand specializes in luxurious resort wear and elegant daywear that transitions seamlessly from city to coast.',
      videoUrl: 'https://player.vimeo.com/video/example3',
      logoUrl: 'https://images.unsplash.com/photo-1594633312519-88fdc88fa1b6?w=300&h=100&fit=crop',
      coverImage: 'https://images.unsplash.com/photo-1483985988355-763728e1935b?w=1920&h=1080&fit=crop',
      founded: '2015',
      location: 'Milan, Italy',
      aesthetic: ['evening wear', 'pants', 'shirts', 'resortwear', 'sophisticated'],
      featured: true,
    },
    {
      name: 'Noir & Ivoire',
      slug: 'noir-ivoire',
      description: 'Monochromatic mastery in modern tailoring',
      story: 'Noir & Ivoire is the vision of Belgian designer Anaïs De Smet, who believes in the power of monochrome. The brand focuses exclusively on black and white pieces, creating a cohesive wardrobe philosophy that emphasizes versatility and elegance. Known for impeccable tailoring and innovative fabric combinations, each piece is designed to be a building block in a sophisticated, minimal wardrobe. The brand has gained a cult following among boutique owners who appreciate its distinctive aesthetic and commercial appeal.',
      videoUrl: 'https://player.vimeo.com/video/example4',
      logoUrl: 'https://images.unsplash.com/photo-1594633312943-c1d5271b5296?w=300&h=100&fit=crop',
      coverImage: 'https://images.unsplash.com/photo-1469334031218-e382a71b716b?w=1920&h=1080&fit=crop',
      founded: '2019',
      location: 'Antwerp, Belgium',
      aesthetic: ['shirts', 'pants', 'co-ord sets', 'minimalist', 'tailored'],
      featured: true,
    },
    {
      name: 'Luna Rosa',
      slug: 'luna-rosa',
      description: 'Bohemian luxury with an ethereal touch',
      story: 'Luna Rosa brings the romance of Mediterranean summers to life through its dreamy, feminine designs. Founded by Spanish designer Isabella Martínez, the brand draws inspiration from coastal landscapes, ancient textiles, and the golden hour light of Ibiza. Using organic linens, silk chiffons, and hand-embroidered details, Luna Rosa creates pieces that feel both timeless and contemporary. The brand is particularly beloved for its flowing dresses and coordinated sets that capture effortless sophistication.',
      videoUrl: 'https://player.vimeo.com/video/example5',
      logoUrl: 'https://images.unsplash.com/photo-1594633312993-c0bf28e62402?w=300&h=100&fit=crop',
      coverImage: 'https://images.unsplash.com/photo-1509631179647-0177331693ae?w=1920&h=1080&fit=crop',
      founded: '2017',
      location: 'Barcelona, Spain',
      aesthetic: ['dresses', 'co-ord sets', 'tops', 'resortwear', 'bohemian'],
      featured: true,
    },
  ]

  for (const brandData of brands) {
    const brand = await prisma.brand.create({
      data: {
        ...brandData,
        aesthetic: JSON.stringify(brandData.aesthetic),
      },
    })

    // Create features for each brand
    const features = [
      {
        title: 'Featured in Vogue',
        publication: 'Vogue International',
        url: 'https://vogue.com',
        imageUrl: 'https://images.unsplash.com/photo-1490481651871-ab68de25d43d?w=800&h=600&fit=crop',
        date: '2024',
      },
      {
        title: 'Harper\'s Bazaar Emerging Designer',
        publication: 'Harper\'s Bazaar',
        url: 'https://harpersbazaar.com',
        imageUrl: 'https://images.unsplash.com/photo-1483985988355-763728e1935b?w=800&h=600&fit=crop',
        date: '2023',
      },
    ]

    for (const feature of features) {
      await prisma.brandFeature.create({
        data: {
          ...feature,
          brandId: brand.id,
        },
      })
    }

    console.log(`✓ Created brand: ${brand.name}`)

    // Create collections for each brand
    const collections = getBrandCollections(brand.slug)

    for (const collectionData of collections) {
      const collection = await prisma.collection.create({
        data: {
          ...collectionData,
          brandId: brand.id,
          lookbookImages: JSON.stringify(collectionData.lookbookImages),
        },
      })

      console.log(`  ✓ Created collection: ${collection.name}`)

      // Create products for each collection
      const products = getCollectionProducts(brand.slug, collection.slug)

      for (const productData of products) {
        const { images, sizes, ...productInfo } = productData

        const product = await prisma.product.create({
          data: {
            ...productInfo,
            collectionId: collection.id,
            colors: JSON.stringify(productInfo.colors),
          },
        })

        // Create product images
        for (const image of images) {
          await prisma.productImage.create({
            data: {
              ...image,
              productId: product.id,
            },
          })
        }

        // Create product sizes
        for (const size of sizes) {
          await prisma.productSize.create({
            data: {
              ...size,
              productId: product.id,
            },
          })
        }

        console.log(`    ✓ Created product: ${product.name}`)
      }
    }
  }

  // Create sample user
  await prisma.user.create({
    data: {
      email: 'boutique@example.com',
      name: 'Sarah Thompson',
      storeName: 'The Luxe Collective',
      storeLocation: 'New York, NY',
      phone: '+1-555-0123',
    },
  })

  console.log('✅ Database seeded successfully!')
}

function getBrandCollections(brandSlug: string) {
  const collectionsMap: Record<string, any[]> = {
    'maison-solene': [
      {
        name: 'Architecte',
        slug: 'architecte',
        description: 'A study in structure and form, the Architecte collection explores the intersection of geometric precision and fluid femininity. Crisp lines meet soft draping in pieces designed for the modern woman who commands attention.',
        season: 'Fall/Winter',
        year: '2024',
        coverImage: 'https://images.unsplash.com/photo-1515372039744-b8f02a3ae446?w=1200&h=1600&fit=crop',
        lookbookImages: [
          'https://images.unsplash.com/photo-1515372039744-b8f02a3ae446?w=1200&h=1600&fit=crop',
          'https://images.unsplash.com/photo-1539008835657-9e8e9680c956?w=1200&h=1600&fit=crop',
          'https://images.unsplash.com/photo-1434389677669-e08b4cac3105?w=1200&h=1600&fit=crop',
          'https://images.unsplash.com/photo-1490481651871-ab68de25d43d?w=1200&h=1600&fit=crop',
        ],
        featured: true,
      },
      {
        name: 'Lumière d\'Été',
        slug: 'lumiere-dete',
        description: 'Inspired by the golden light of summer evenings in Provence, this collection celebrates ease and elegance with flowing silhouettes in breathable linens and silk.',
        season: 'Summer/Spring',
        year: '2024',
        coverImage: 'https://images.unsplash.com/photo-1469334031218-e382a71b716b?w=1200&h=1600&fit=crop',
        lookbookImages: [
          'https://images.unsplash.com/photo-1469334031218-e382a71b716b?w=1200&h=1600&fit=crop',
          'https://images.unsplash.com/photo-1502716119720-b23a93e5fe1b?w=1200&h=1600&fit=crop',
          'https://images.unsplash.com/photo-1496747611176-843222e1e57c?w=1200&h=1600&fit=crop',
        ],
        featured: false,
      },
    ],
    'atelier-lumiere': [
      {
        name: 'Chromatic Dreams',
        slug: 'chromatic-dreams',
        description: 'A bold exploration of color and texture, featuring hand-painted silk pieces that blur the line between fashion and art. Each piece is unique, celebrating individuality and artistic expression.',
        season: 'Summer/Spring',
        year: '2024',
        coverImage: 'https://images.unsplash.com/photo-1490481651871-ab68de25d43d?w=1200&h=1600&fit=crop',
        lookbookImages: [
          'https://images.unsplash.com/photo-1490481651871-ab68de25d43d?w=1200&h=1600&fit=crop',
          'https://images.unsplash.com/photo-1483985988355-763728e1935b?w=1200&h=1600&fit=crop',
          'https://images.unsplash.com/photo-1467043153537-a4fba2cd39ef?w=1200&h=1600&fit=crop',
        ],
        featured: true,
      },
    ],
    'casa-valentina': [
      {
        name: 'Costa Azzurra',
        slug: 'costa-azzurra',
        description: 'Capturing the essence of the Italian Riviera, this resort collection features luxurious separates in crisp cottons, flowing silks, and sophisticated linens. Perfect for the jet-set lifestyle.',
        season: 'Resortwear',
        year: '2024',
        coverImage: 'https://images.unsplash.com/photo-1483985988355-763728e1935b?w=1200&h=1600&fit=crop',
        lookbookImages: [
          'https://images.unsplash.com/photo-1483985988355-763728e1935b?w=1200&h=1600&fit=crop',
          'https://images.unsplash.com/photo-1502716119720-b23a93e5fe1b?w=1200&h=1600&fit=crop',
          'https://images.unsplash.com/photo-1529139574466-a303027c1d8b?w=1200&h=1600&fit=crop',
        ],
        featured: true,
      },
    ],
    'noir-ivoire': [
      {
        name: 'Monochrome',
        slug: 'monochrome',
        description: 'The ultimate expression of minimalist luxury. This collection proves that black and white are anything but basic, with unexpected textures, precise tailoring, and innovative fabric pairings.',
        season: 'Fall/Winter',
        year: '2024',
        coverImage: 'https://images.unsplash.com/photo-1469334031218-e382a71b716b?w=1200&h=1600&fit=crop',
        lookbookImages: [
          'https://images.unsplash.com/photo-1469334031218-e382a71b716b?w=1200&h=1600&fit=crop',
          'https://images.unsplash.com/photo-1515372039744-b8f02a3ae446?w=1200&h=1600&fit=crop',
          'https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?w=1200&h=1600&fit=crop',
        ],
        featured: true,
      },
    ],
    'luna-rosa': [
      {
        name: 'Mediterranean Whispers',
        slug: 'mediterranean-whispers',
        description: 'Ethereal pieces inspired by coastal sunsets and ancient textiles. Flowing dresses, coordinated sets, and delicate tops in organic fabrics with hand-embroidered details.',
        season: 'Resortwear',
        year: '2024',
        coverImage: 'https://images.unsplash.com/photo-1509631179647-0177331693ae?w=1200&h=1600&fit=crop',
        lookbookImages: [
          'https://images.unsplash.com/photo-1509631179647-0177331693ae?w=1200&h=1600&fit=crop',
          'https://images.unsplash.com/photo-1502716119720-b23a93e5fe1b?w=1200&h=1600&fit=crop',
          'https://images.unsplash.com/photo-1496747611176-843222e1e57c?w=1200&h=1600&fit=crop',
        ],
        featured: true,
      },
    ],
  }

  return collectionsMap[brandSlug] || []
}

function getCollectionProducts(brandSlug: string, collectionSlug: string) {
  // Common sizes
  const standardSizes = [
    { size: 'XS', inStock: true, quantity: 15 },
    { size: 'S', inStock: true, quantity: 25 },
    { size: 'M', inStock: true, quantity: 30 },
    { size: 'L', inStock: true, quantity: 20 },
    { size: 'XL', inStock: true, quantity: 10 },
  ]

  const productsMap: Record<string, Record<string, any[]>> = {
    'maison-solene': {
      'architecte': [
        {
          name: 'Structural Drape Dress',
          slug: 'structural-drape-dress',
          description: 'A masterpiece of architectural design, this dress features precise pleating on one side while draping softly on the other. The result is a dynamic silhouette that moves beautifully and flatters every body type.',
          category: 'dresses',
          price: 1850,
          fabricDetails: '100% Italian wool crepe, fully lined in silk charmeuse. The fabric holds structure while remaining comfortable and breathable.',
          careInstructions: 'Dry clean only. Store hanging to maintain shape.',
          colors: ['Black', 'Charcoal', 'Cream'],
          featured: true,
          images: [
            { url: 'https://images.unsplash.com/photo-1515372039744-b8f02a3ae446?w=800&h=1200&fit=crop', alt: 'Structural Drape Dress - Front', order: 0, isPrimary: true },
            { url: 'https://images.unsplash.com/photo-1539008835657-9e8e9680c956?w=800&h=1200&fit=crop', alt: 'Structural Drape Dress - Side', order: 1, isPrimary: false },
            { url: 'https://images.unsplash.com/photo-1434389677669-e08b4cac3105?w=800&h=1200&fit=crop', alt: 'Structural Drape Dress - Detail', order: 2, isPrimary: false },
          ],
          sizes: standardSizes,
        },
        {
          name: 'Asymmetric Blazer',
          slug: 'asymmetric-blazer',
          description: 'An unconventional take on the classic blazer, featuring an asymmetric hemline and oversized collar. Perfect for making a statement in the boardroom or at evening events.',
          category: 'evening wear',
          price: 1420,
          fabricDetails: 'Italian wool blend with silk lining. Medium weight with excellent shape retention.',
          careInstructions: 'Dry clean only. Steam gently to refresh.',
          colors: ['Black', 'Navy'],
          featured: false,
          images: [
            { url: 'https://images.unsplash.com/photo-1490481651871-ab68de25d43d?w=800&h=1200&fit=crop', alt: 'Asymmetric Blazer', order: 0, isPrimary: true },
          ],
          sizes: standardSizes,
        },
        {
          name: 'Sculptural Trousers',
          slug: 'sculptural-trousers',
          description: 'High-waisted trousers with architectural pleating at the waist and a wide, flowing leg. These pants elevate any outfit with their distinctive silhouette.',
          category: 'pants',
          price: 980,
          fabricDetails: '100% Italian cotton twill with a subtle sheen. Comfortable stretch waistband.',
          careInstructions: 'Machine wash cold on gentle cycle. Hang dry. Press with warm iron.',
          colors: ['Black', 'Cream', 'Taupe'],
          featured: false,
          images: [
            { url: 'https://images.unsplash.com/photo-1506629082955-511b1aa562c8?w=800&h=1200&fit=crop', alt: 'Sculptural Trousers', order: 0, isPrimary: true },
          ],
          sizes: standardSizes,
        },
      ],
      'lumiere-dete': [
        {
          name: 'Linen Cascade Dress',
          slug: 'linen-cascade-dress',
          description: 'Effortless summer elegance in pure European linen. This dress features a relaxed fit with strategic seaming that creates beautiful movement.',
          category: 'dresses',
          price: 890,
          fabricDetails: '100% European linen, pre-washed for softness. Breathable and perfect for warm weather.',
          careInstructions: 'Machine wash cold. Line dry. Linen naturally wrinkles - embrace the texture or press lightly.',
          colors: ['White', 'Sand', 'Sage'],
          featured: true,
          images: [
            { url: 'https://images.unsplash.com/photo-1469334031218-e382a71b716b?w=800&h=1200&fit=crop', alt: 'Linen Cascade Dress', order: 0, isPrimary: true },
          ],
          sizes: standardSizes,
        },
      ],
    },
    'atelier-lumiere': {
      'chromatic-dreams': [
        {
          name: 'Hand-Painted Silk Dress',
          slug: 'hand-painted-silk-dress',
          description: 'A wearable work of art featuring hand-painted watercolor-inspired patterns on pure silk. Each piece is unique, with slight variations in the painting making your dress one-of-a-kind.',
          category: 'dresses',
          price: 2200,
          fabricDetails: '100% silk charmeuse, hand-painted with permanent textile inks. Each piece takes 8 hours to create.',
          careInstructions: 'Dry clean only with specialist familiar with hand-painted textiles.',
          colors: ['Sunset Blend', 'Ocean Blues', 'Garden Florals'],
          featured: true,
          images: [
            { url: 'https://images.unsplash.com/photo-1490481651871-ab68de25d43d?w=800&h=1200&fit=crop', alt: 'Hand-Painted Silk Dress', order: 0, isPrimary: true },
          ],
          sizes: standardSizes,
        },
        {
          name: 'Color Block Co-ord Set',
          slug: 'color-block-coord-set',
          description: 'Bold and modern, this coordinated set features artistic color blocking in complementary tones. The wide-leg pants and matching top can be worn together or separately.',
          category: 'co-ord sets',
          price: 1650,
          fabricDetails: 'Lightweight silk blend with excellent drape. Comfortable elastic waistband on pants.',
          careInstructions: 'Hand wash cold or dry clean. Hang dry away from direct sunlight.',
          colors: ['Coral/Terracotta', 'Blue/Navy'],
          featured: false,
          images: [
            { url: 'https://images.unsplash.com/photo-1483985988355-763728e1935b?w=800&h=1200&fit=crop', alt: 'Color Block Co-ord Set', order: 0, isPrimary: true },
          ],
          sizes: standardSizes,
        },
      ],
    },
    'casa-valentina': {
      'costa-azzurra': [
        {
          name: 'Italian Linen Shirt',
          slug: 'italian-linen-shirt',
          description: 'The perfect resort essential. This oversized linen shirt features mother-of-pearl buttons and impeccable Italian tailoring. Wear it over swimwear or tucked into trousers for dinner.',
          category: 'shirts',
          price: 680,
          fabricDetails: '100% Italian linen, garment-dyed for rich color. Softens beautifully with each wear.',
          careInstructions: 'Machine wash cold. Line dry. Press while slightly damp for best results.',
          colors: ['White', 'Sky Blue', 'Coral'],
          featured: true,
          images: [
            { url: 'https://images.unsplash.com/photo-1502716119720-b23a93e5fe1b?w=800&h=1200&fit=crop', alt: 'Italian Linen Shirt', order: 0, isPrimary: true },
          ],
          sizes: standardSizes,
        },
        {
          name: 'Wide Leg Resort Pants',
          slug: 'wide-leg-resort-pants',
          description: 'Elegant and comfortable, these wide-leg pants in crisp cotton poplin are a resort staple. High-waisted with a flattering fit that works from beach to dinner.',
          category: 'pants',
          price: 790,
          fabricDetails: '100% cotton poplin with a slight sheen. Hidden side zipper for clean lines.',
          careInstructions: 'Machine wash cold. Tumble dry low. Press with steam for crisp finish.',
          colors: ['White', 'Navy', 'Khaki'],
          featured: false,
          images: [
            { url: 'https://images.unsplash.com/photo-1529139574466-a303027c1d8b?w=800&h=1200&fit=crop', alt: 'Wide Leg Resort Pants', order: 0, isPrimary: true },
          ],
          sizes: standardSizes,
        },
        {
          name: 'Silk Evening Dress',
          slug: 'silk-evening-dress',
          description: 'Sophisticated simplicity in pure silk. This dress features a cowl neckline and bias-cut skirt that skims the body beautifully. Perfect for elegant dinners and special occasions.',
          category: 'evening wear',
          price: 1950,
          fabricDetails: '100% silk crepe de chine, bias-cut for perfect drape. Fully lined.',
          careInstructions: 'Dry clean only. Steam gently to remove wrinkles.',
          colors: ['Black', 'Champagne', 'Emerald'],
          featured: true,
          images: [
            { url: 'https://images.unsplash.com/photo-1483985988355-763728e1935b?w=800&h=1200&fit=crop', alt: 'Silk Evening Dress', order: 0, isPrimary: true },
          ],
          sizes: standardSizes,
        },
      ],
    },
    'noir-ivoire': {
      'monochrome': [
        {
          name: 'Tailored Black Blazer',
          slug: 'tailored-black-blazer',
          description: 'The ultimate wardrobe essential. This impeccably tailored blazer in Italian wool features subtle peak lapels and a slightly oversized fit for contemporary elegance.',
          category: 'shirts',
          price: 1580,
          fabricDetails: 'Italian wool suiting with silk lining. Structured shoulders with natural drape through the body.',
          careInstructions: 'Dry clean only. Store hanging with shoulder shaper.',
          colors: ['Black'],
          featured: true,
          images: [
            { url: 'https://images.unsplash.com/photo-1469334031218-e382a71b716b?w=800&h=1200&fit=crop', alt: 'Tailored Black Blazer', order: 0, isPrimary: true },
          ],
          sizes: standardSizes,
        },
        {
          name: 'Contrast Stitch Pants',
          slug: 'contrast-stitch-pants',
          description: 'Black pants elevated with white topstitching detail. Straight leg with a modern ankle-length cut. A distinctive piece that works for both day and evening.',
          category: 'pants',
          price: 890,
          fabricDetails: 'Cotton-blend twill with slight stretch. Comfortable waistband with hidden closure.',
          careInstructions: 'Machine wash cold inside out. Hang dry. Press with warm iron if needed.',
          colors: ['Black with White Stitch'],
          featured: false,
          images: [
            { url: 'https://images.unsplash.com/photo-1506629082955-511b1aa562c8?w=800&h=1200&fit=crop', alt: 'Contrast Stitch Pants', order: 0, isPrimary: true },
          ],
          sizes: standardSizes,
        },
        {
          name: 'Monochrome Co-ord Set',
          slug: 'monochrome-coord-set',
          description: 'A versatile set in contrasting black and white panels. The structured top and matching pants create a striking silhouette perfect for making an impression.',
          category: 'co-ord sets',
          price: 1680,
          fabricDetails: 'Structured cotton blend with excellent shape retention. Separate pieces can be worn independently.',
          careInstructions: 'Dry clean recommended for best results. Can be hand washed cold if needed.',
          colors: ['Black/White'],
          featured: true,
          images: [
            { url: 'https://images.unsplash.com/photo-1515372039744-b8f02a3ae446?w=800&h=1200&fit=crop', alt: 'Monochrome Co-ord Set', order: 0, isPrimary: true },
          ],
          sizes: standardSizes,
        },
      ],
    },
    'luna-rosa': {
      'mediterranean-whispers': [
        {
          name: 'Embroidered Maxi Dress',
          slug: 'embroidered-maxi-dress',
          description: 'A romantic maxi dress in organic cotton with hand-embroidered details inspired by Mediterranean flora. The perfect piece for sunset dinners and special occasions.',
          category: 'dresses',
          price: 1380,
          fabricDetails: '100% organic cotton voile with hand-embroidered details. Lightweight and breathable.',
          careInstructions: 'Hand wash cold or gentle machine cycle. Hang dry in shade. Warm iron on reverse side.',
          colors: ['Ivory', 'Blush', 'Sky Blue'],
          featured: true,
          images: [
            { url: 'https://images.unsplash.com/photo-1509631179647-0177331693ae?w=800&h=1200&fit=crop', alt: 'Embroidered Maxi Dress', order: 0, isPrimary: true },
          ],
          sizes: standardSizes,
        },
        {
          name: 'Linen Co-ord Set',
          slug: 'linen-coord-set',
          description: 'Effortless bohemian chic in pure linen. This coordinated set features a flowing top and wide-leg pants, perfect for warm weather wandering.',
          category: 'co-ord sets',
          price: 950,
          fabricDetails: 'European linen, pre-washed and softened. Natural fiber breathability.',
          careInstructions: 'Machine wash cold. Line dry. Embrace natural wrinkles or press lightly.',
          colors: ['Natural', 'Terracotta', 'Sage'],
          featured: false,
          images: [
            { url: 'https://images.unsplash.com/photo-1502716119720-b23a93e5fe1b?w=800&h=1200&fit=crop', alt: 'Linen Co-ord Set', order: 0, isPrimary: true },
          ],
          sizes: standardSizes,
        },
        {
          name: 'Silk Cami Top',
          slug: 'silk-cami-top',
          description: 'A delicate silk camisole with adjustable straps and lace trim. Layer it or wear it alone for effortless summer style.',
          category: 'tops',
          price: 420,
          fabricDetails: '100% silk satin with French lace trim. Adjustable shoulder straps.',
          careInstructions: 'Hand wash cold in gentle detergent. Line dry away from sun. Cool iron if needed.',
          colors: ['Ivory', 'Blush', 'Black'],
          featured: false,
          images: [
            { url: 'https://images.unsplash.com/photo-1496747611176-843222e1e57c?w=800&h=1200&fit=crop', alt: 'Silk Cami Top', order: 0, isPrimary: true },
          ],
          sizes: standardSizes,
        },
      ],
    },
  }

  return productsMap[brandSlug]?.[collectionSlug] || []
}

main()
  .then(async () => {
    await prisma.$disconnect()
  })
  .catch(async (e) => {
    console.error('Error seeding database:', e)
    await prisma.$disconnect()
    process.exit(1)
  })

