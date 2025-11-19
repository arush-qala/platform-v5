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

  // Brand 1: Maison Solène
  const maisonSolene = await prisma.brand.create({
    data: {
      name: 'Maison Solène',
      slug: 'maison-solene',
      description: 'Contemporary elegance meets timeless Parisian craftsmanship. Architectural silhouettes define modern luxury.',
      story: 'Founded in 2018 by French designer Solène Mercier, Maison Solène embodies the essence of modern Parisian luxury. Each piece is crafted with meticulous attention to detail, using only the finest sustainable fabrics sourced from Italian and French mills. Our design philosophy centers on creating investment pieces that transcend seasons, celebrating the female form through architectural silhouettes.',
      videoUrl: 'https://player.vimeo.com/video/example1',
      coverImage: '/images/brands/maison-solene/campaign/hero.jpg',
      founded: '2018',
      location: 'Paris, France',
      aesthetic: JSON.stringify(['dresses', 'evening wear', 'minimalist', 'architectural', 'contemporary']),
      featured: true,
    },
  })

  await prisma.brandFeature.createMany({
    data: [
      { brandId: maisonSolene.id, title: 'Featured Designer', publication: 'Vogue', date: '2024' },
      { brandId: maisonSolene.id, title: 'Emerging Talent', publication: 'Elle', date: '2023' },
    ],
  })

  const maisonSoleneCollection = await prisma.collection.create({
    data: {
      brandId: maisonSolene.id,
      name: 'Architecte',
      slug: 'architecte',
      description: 'A celebration of structure and form, where precision tailoring meets fluid movement.',
      season: 'Fall/Winter',
      year: '2024',
      coverImage: '/images/brands/maison-solene/lookbook/look-01.jpg',
      lookbookImages: JSON.stringify([
        '/images/brands/maison-solene/lookbook/look-01.jpg',
        '/images/brands/maison-solene/lookbook/look-02.jpg',
        '/images/brands/maison-solene/lookbook/look-03.jpg',
        '/images/brands/maison-solene/lookbook/look-04.jpg',
        '/images/brands/maison-solene/lookbook/look-05.jpg',
      ]),
      featured: true,
    },
  })

  // Maison Solène Products
  const msDress = await prisma.product.create({
    data: {
      collectionId: maisonSoleneCollection.id,
      name: 'Structural Drape Dress',
      slug: 'structural-drape-dress',
      description: 'Sculptural dress with asymmetric draping and architectural details',
      category: 'dresses',
      price: 895,
      fabricDetails: '100% Italian silk crepe, fully lined',
      careInstructions: 'Dry clean only',
      colors: JSON.stringify(['Black', 'Ivory', 'Deep Navy']),
      featured: true,
    },
  })

  await prisma.productImage.createMany({
    data: [
      { productId: msDress.id, url: '/images/brands/maison-solene/products/dress-01.jpg', order: 1, isPrimary: true },
      { productId: msDress.id, url: '/images/brands/maison-solene/lookbook/look-01.jpg', order: 2 },
    ],
  })

  await prisma.productSize.createMany({
    data: [
      { productId: msDress.id, size: 'XS', inStock: true, quantity: 5 },
      { productId: msDress.id, size: 'S', inStock: true, quantity: 8 },
      { productId: msDress.id, size: 'M', inStock: true, quantity: 10 },
      { productId: msDress.id, size: 'L', inStock: true, quantity: 6 },
    ],
  })

  const msBlazer = await prisma.product.create({
    data: {
      collectionId: maisonSoleneCollection.id,
      name: 'Asymmetric Blazer',
      slug: 'asymmetric-blazer',
      description: 'Tailored blazer with asymmetric closure and sculptural shoulders',
      category: 'evening wear',
      price: 1250,
      fabricDetails: 'Wool crepe with silk lining',
      careInstructions: 'Dry clean only',
      colors: JSON.stringify(['Black', 'Charcoal']),
    },
  })

  await prisma.productImage.createMany({
    data: [
      { productId: msBlazer.id, url: '/images/brands/maison-solene/products/blazer-01.jpg', order: 1, isPrimary: true },
    ],
  })

  await prisma.productSize.createMany({
    data: [
      { productId: msBlazer.id, size: 'S', inStock: true, quantity: 4 },
      { productId: msBlazer.id, size: 'M', inStock: true, quantity: 6 },
      { productId: msBlazer.id, size: 'L', inStock: true, quantity: 4 },
    ],
  })

  const msPants = await prisma.product.create({
    data: {
      collectionId: maisonSoleneCollection.id,
      name: 'Sculptural Wide-Leg Pants',
      slug: 'sculptural-pants',
      description: 'High-waisted pants with architectural pleating',
      category: 'pants',
      price: 685,
      fabricDetails: 'Italian wool gabardine',
      careInstructions: 'Dry clean only',
      colors: JSON.stringify(['Black', 'Ivory', 'Camel']),
    },
  })

  await prisma.productImage.createMany({
    data: [
      { productId: msPants.id, url: '/images/brands/maison-solene/products/pants-01.jpg', order: 1, isPrimary: true },
    ],
  })

  await prisma.productSize.createMany({
    data: [
      { productId: msPants.id, size: 'XS', inStock: true, quantity: 5 },
      { productId: msPants.id, size: 'S', inStock: true, quantity: 8 },
      { productId: msPants.id, size: 'M', inStock: true, quantity: 10 },
      { productId: msPants.id, size: 'L', inStock: true, quantity: 6 },
    ],
  })

  console.log('✓ Created brand: Maison Solène')

  // Brand 2: Atelier Lumière
  const atelierLumiere = await prisma.brand.create({
    data: {
      name: 'Atelier Lumière',
      slug: 'atelier-lumiere',
      description: 'Where art meets fashion. Hand-painted silks and artistic textiles tell stories of light and color.',
      story: 'Atelier Lumière is the brainchild of sisters Marie and Claire Dubois, who bring together their backgrounds in fine arts and fashion design. Each piece features hand-painted silk and innovative dyeing techniques that create one-of-a-kind wearable art. Our collections tell stories of light, color, and feminine strength.',
      videoUrl: 'https://player.vimeo.com/video/example2',
      coverImage: '/images/brands/atelier-lumiere/campaign/hero.jpg',
      founded: '2020',
      location: 'Lyon, France',
      aesthetic: JSON.stringify(['dresses', 'co-ord sets', 'tops', 'artistic', 'colorful', 'unique']),
      featured: true,
    },
  })

  await prisma.brandFeature.createMany({
    data: [
      { brandId: atelierLumiere.id, title: 'Best Artistic Collection', publication: 'Harper\'s Bazaar', date: '2024' },
      { brandId: atelierLumiere.id, title: 'Designer to Watch', publication: 'WWD', date: '2023' },
    ],
  })

  const atelierCollection = await prisma.collection.create({
    data: {
      brandId: atelierLumiere.id,
      name: 'Chromatic Dreams',
      slug: 'chromatic-dreams',
      description: 'A painterly exploration of color, light, and movement on silk.',
      season: 'Summer/Spring',
      year: '2024',
      coverImage: '/images/brands/atelier-lumiere/lookbook/look-01.jpg',
      lookbookImages: JSON.stringify([
        '/images/brands/atelier-lumiere/lookbook/look-01.jpg',
        '/images/brands/atelier-lumiere/lookbook/look-02.jpg',
        '/images/brands/atelier-lumiere/lookbook/look-03.jpg',
        '/images/brands/atelier-lumiere/lookbook/look-04.jpg',
        '/images/brands/atelier-lumiere/lookbook/look-05.jpg',
      ]),
      featured: true,
    },
  })

  const alSilkDress = await prisma.product.create({
    data: {
      collectionId: atelierCollection.id,
      name: 'Hand-Painted Silk Dress',
      slug: 'hand-painted-silk-dress',
      description: 'One-of-a-kind hand-painted silk dress with watercolor gradient',
      category: 'dresses',
      price: 1450,
      fabricDetails: '100% hand-painted silk charmeuse',
      careInstructions: 'Gentle hand wash or dry clean',
      colors: JSON.stringify(['Sunset Gradient', 'Ocean Blue', 'Rose Garden']),
      featured: true,
    },
  })

  await prisma.productImage.createMany({
    data: [
      { productId: alSilkDress.id, url: '/images/brands/atelier-lumiere/products/silk-dress-01.jpg', order: 1, isPrimary: true },
      { productId: alSilkDress.id, url: '/images/brands/atelier-lumiere/lookbook/look-02.jpg', order: 2 },
    ],
  })

  await prisma.productSize.createMany({
    data: [
      { productId: alSilkDress.id, size: 'XS', inStock: true, quantity: 3 },
      { productId: alSilkDress.id, size: 'S', inStock: true, quantity: 4 },
      { productId: alSilkDress.id, size: 'M', inStock: true, quantity: 5 },
      { productId: alSilkDress.id, size: 'L', inStock: true, quantity: 3 },
    ],
  })

  const alCoordSet = await prisma.product.create({
    data: {
      collectionId: atelierCollection.id,
      name: 'Color Block Co-ord Set',
      slug: 'color-block-coord',
      description: 'Two-piece set with abstract color blocking',
      category: 'co-ord sets',
      price: 980,
      fabricDetails: 'Linen blend with hand-dyed details',
      careInstructions: 'Hand wash cold',
      colors: JSON.stringify(['Coral & Teal', 'Mauve & Gold']),
    },
  })

  await prisma.productImage.createMany({
    data: [
      { productId: alCoordSet.id, url: '/images/brands/atelier-lumiere/products/coord-set-01.jpg', order: 1, isPrimary: true },
    ],
  })

  await prisma.productSize.createMany({
    data: [
      { productId: alCoordSet.id, size: 'XS', inStock: true, quantity: 4 },
      { productId: alCoordSet.id, size: 'S', inStock: true, quantity: 6 },
      { productId: alCoordSet.id, size: 'M', inStock: true, quantity: 8 },
      { productId: alCoordSet.id, size: 'L', inStock: false, quantity: 0 },
    ],
  })

  console.log('✓ Created brand: Atelier Lumière')

  // Brand 3: Casa Valentina
  const casaValentina = await prisma.brand.create({
    data: {
      name: 'Casa Valentina',
      slug: 'casa-valentina',
      description: 'Italian sophistication with a modern edge. Luxurious resort wear crafted in our Milanese atelier.',
      story: 'Casa Valentina represents the pinnacle of Italian craftsmanship, founded by Valentina Romano in Milan. With over 20 years of experience at prestigious fashion houses, each garment is produced in limited quantities utilizing heritage techniques passed down through generations. We specialize in luxurious resort wear that transitions seamlessly from city to coast.',
      videoUrl: 'https://player.vimeo.com/video/example3',
      coverImage: '/images/brands/casa-valentina/campaign/hero.jpg',
      founded: '2015',
      location: 'Milan, Italy',
      aesthetic: JSON.stringify(['evening wear', 'pants', 'shirts', 'resortwear', 'sophisticated', 'Italian']),
      featured: true,
    },
  })

  await prisma.brandFeature.createMany({
    data: [
      { brandId: casaValentina.id, title: 'Italian Excellence', publication: 'Vogue Italia', date: '2024' },
      { brandId: casaValentina.id, title: 'Resort Wear Masters', publication: 'Elle', date: '2023' },
    ],
  })

  const cvCollection = await prisma.collection.create({
    data: {
      brandId: casaValentina.id,
      name: 'Costa Azzurra',
      slug: 'costa-azzurra',
      description: 'Inspired by the Italian Riviera. Effortless elegance for sun-soaked days.',
      season: 'Resortwear',
      year: '2024',
      coverImage: '/images/brands/casa-valentina/lookbook/look-01.jpg',
      lookbookImages: JSON.stringify([
        '/images/brands/casa-valentina/lookbook/look-01.jpg',
        '/images/brands/casa-valentina/lookbook/look-02.jpg',
        '/images/brands/casa-valentina/lookbook/look-03.jpg',
        '/images/brands/casa-valentina/lookbook/look-04.jpg',
        '/images/brands/casa-valentina/lookbook/look-05.jpg',
      ]),
      featured: true,
    },
  })

  const cvShirt = await prisma.product.create({
    data: {
      collectionId: cvCollection.id,
      name: 'Italian Linen Shirt',
      slug: 'italian-linen-shirt',
      description: 'Classic linen shirt with refined details',
      category: 'shirts',
      price: 450,
      fabricDetails: '100% Italian linen',
      careInstructions: 'Machine wash gentle or dry clean',
      colors: JSON.stringify(['White', 'Natural', 'Sky Blue']),
      featured: true,
    },
  })

  await prisma.productImage.createMany({
    data: [
      { productId: cvShirt.id, url: '/images/brands/casa-valentina/products/linen-shirt-01.jpg', order: 1, isPrimary: true },
    ],
  })

  await prisma.productSize.createMany({
    data: [
      { productId: cvShirt.id, size: 'XS', inStock: true, quantity: 10 },
      { productId: cvShirt.id, size: 'S', inStock: true, quantity: 12 },
      { productId: cvShirt.id, size: 'M', inStock: true, quantity: 15 },
      { productId: cvShirt.id, size: 'L', inStock: true, quantity: 8 },
      { productId: cvShirt.id, size: 'XL', inStock: true, quantity: 5 },
    ],
  })

  const cvPants = await prisma.product.create({
    data: {
      collectionId: cvCollection.id,
      name: 'Wide-Leg Resort Pants',
      slug: 'resort-pants',
      description: 'Flowing wide-leg pants perfect for coastal elegance',
      category: 'pants',
      price: 520,
      fabricDetails: 'Linen-silk blend',
      careInstructions: 'Dry clean recommended',
      colors: JSON.stringify(['Cream', 'Sand', 'Terracotta']),
    },
  })

  await prisma.productImage.createMany({
    data: [
      { productId: cvPants.id, url: '/images/brands/casa-valentina/products/resort-pants-01.jpg', order: 1, isPrimary: true },
    ],
  })

  await prisma.productSize.createMany({
    data: [
      { productId: cvPants.id, size: 'XS', inStock: true, quantity: 6 },
      { productId: cvPants.id, size: 'S', inStock: true, quantity: 10 },
      { productId: cvPants.id, size: 'M', inStock: true, quantity: 12 },
      { productId: cvPants.id, size: 'L', inStock: true, quantity: 8 },
    ],
  })

  const cvDress = await prisma.product.create({
    data: {
      collectionId: cvCollection.id,
      name: 'Silk Evening Dress',
      slug: 'silk-evening-dress',
      description: 'Elegant silk dress for special occasions',
      category: 'evening wear',
      price: 1680,
      fabricDetails: 'Pure silk satin',
      careInstructions: 'Dry clean only',
      colors: JSON.stringify(['Champagne', 'Midnight Blue', 'Ruby']),
    },
  })

  await prisma.productImage.createMany({
    data: [
      { productId: cvDress.id, url: '/images/brands/casa-valentina/products/evening-dress-01.jpg', order: 1, isPrimary: true },
    ],
  })

  await prisma.productSize.createMany({
    data: [
      { productId: cvDress.id, size: 'XS', inStock: true, quantity: 4 },
      { productId: cvDress.id, size: 'S', inStock: true, quantity: 5 },
      { productId: cvDress.id, size: 'M', inStock: true, quantity: 6 },
      { productId: cvDress.id, size: 'L', inStock: true, quantity: 4 },
    ],
  })

  console.log('✓ Created brand: Casa Valentina')

  // Brand 4: Noir & Ivoire
  const noirIvoire = await prisma.brand.create({
    data: {
      name: 'Noir & Ivoire',
      slug: 'noir-ivoire',
      description: 'Monochromatic mastery in modern tailoring. Where black meets white in perfect harmony.',
      story: 'Noir & Ivoire is the vision of Belgian designer Anaïs De Smet, who believes in the power of monochrome. Focusing exclusively on black and white pieces, we create a cohesive wardrobe philosophy that emphasizes versatility and elegance. Known for impeccable tailoring and innovative fabric combinations, each piece is designed to be a building block in a sophisticated, minimal wardrobe.',
      videoUrl: 'https://player.vimeo.com/video/example4',
      coverImage: '/images/brands/noir-ivoire/campaign/hero.jpg',
      founded: '2019',
      location: 'Antwerp, Belgium',
      aesthetic: JSON.stringify(['shirts', 'pants', 'co-ord sets', 'minimalist', 'tailored', 'monochrome']),
      featured: true,
    },
  })

  await prisma.brandFeature.createMany({
    data: [
      { brandId: noirIvoire.id, title: 'Minimalist Icon', publication: 'WWD', date: '2024' },
      { brandId: noirIvoire.id, title: 'Tailoring Excellence', publication: 'Business of Fashion', date: '2023' },
    ],
  })

  const niCollection = await prisma.collection.create({
    data: {
      brandId: noirIvoire.id,
      name: 'Monochrome',
      slug: 'monochrome',
      description: 'The art of black and white. Timeless pieces for the modern wardrobe.',
      season: 'Fall/Winter',
      year: '2024',
      coverImage: '/images/brands/noir-ivoire/lookbook/look-01.jpg',
      lookbookImages: JSON.stringify([
        '/images/brands/noir-ivoire/lookbook/look-01.jpg',
        '/images/brands/noir-ivoire/lookbook/look-02.jpg',
        '/images/brands/noir-ivoire/lookbook/look-03.jpg',
        '/images/brands/noir-ivoire/lookbook/look-04.jpg',
        '/images/brands/noir-ivoire/lookbook/look-05.jpg',
      ]),
      featured: true,
    },
  })

  const niBlazer = await prisma.product.create({
    data: {
      collectionId: niCollection.id,
      name: 'Tailored Black Blazer',
      slug: 'tailored-black-blazer',
      description: 'Perfectly tailored blazer with peak lapels',
      category: 'evening wear',
      price: 1350,
      fabricDetails: 'Italian wool with silk lining',
      careInstructions: 'Dry clean only',
      colors: JSON.stringify(['Black', 'White']),
      featured: true,
    },
  })

  await prisma.productImage.createMany({
    data: [
      { productId: niBlazer.id, url: '/images/brands/noir-ivoire/products/blazer-01.jpg', order: 1, isPrimary: true },
    ],
  })

  await prisma.productSize.createMany({
    data: [
      { productId: niBlazer.id, size: 'XS', inStock: true, quantity: 4 },
      { productId: niBlazer.id, size: 'S', inStock: true, quantity: 8 },
      { productId: niBlazer.id, size: 'M', inStock: true, quantity: 10 },
      { productId: niBlazer.id, size: 'L', inStock: true, quantity: 6 },
    ],
  })

  const niPants = await prisma.product.create({
    data: {
      collectionId: niCollection.id,
      name: 'Contrast Stitch Pants',
      slug: 'contrast-stitch-pants',
      description: 'Wide-leg pants with contrast topstitching',
      category: 'pants',
      price: 720,
      fabricDetails: 'Italian cotton-wool blend',
      careInstructions: 'Dry clean recommended',
      colors: JSON.stringify(['Black', 'White']),
    },
  })

  await prisma.productImage.createMany({
    data: [
      { productId: niPants.id, url: '/images/brands/noir-ivoire/products/pants-01.jpg', order: 1, isPrimary: true },
    ],
  })

  await prisma.productSize.createMany({
    data: [
      { productId: niPants.id, size: 'XS', inStock: true, quantity: 5 },
      { productId: niPants.id, size: 'S', inStock: true, quantity: 10 },
      { productId: niPants.id, size: 'M', inStock: true, quantity: 12 },
      { productId: niPants.id, size: 'L', inStock: true, quantity: 8 },
    ],
  })

  const niCoord = await prisma.product.create({
    data: {
      collectionId: niCollection.id,
      name: 'Monochrome Co-ord Set',
      slug: 'monochrome-coord-set',
      description: 'Two-piece set with architectural lines',
      category: 'co-ord sets',
      price: 1450,
      fabricDetails: 'Cotton-silk blend',
      careInstructions: 'Dry clean only',
      colors: JSON.stringify(['Black & White', 'White & Black']),
    },
  })

  await prisma.productImage.createMany({
    data: [
      { productId: niCoord.id, url: '/images/brands/noir-ivoire/products/coord-set-01.jpg', order: 1, isPrimary: true },
    ],
  })

  await prisma.productSize.createMany({
    data: [
      { productId: niCoord.id, size: 'XS', inStock: true, quantity: 4 },
      { productId: niCoord.id, size: 'S', inStock: true, quantity: 6 },
      { productId: niCoord.id, size: 'M', inStock: true, quantity: 8 },
      { productId: niCoord.id, size: 'L', inStock: false, quantity: 0 },
    ],
  })

  console.log('✓ Created brand: Noir & Ivoire')

  // Brand 5: Luna Rosa
  const lunaRosa = await prisma.brand.create({
    data: {
      name: 'Luna Rosa',
      slug: 'luna-rosa',
      description: 'Bohemian luxury with an ethereal touch. Dreamy designs inspired by Mediterranean summers.',
      story: 'Luna Rosa brings the romance of Mediterranean summers to life through dreamy, feminine designs. Founded by Spanish designer Isabella Martínez, we draw inspiration from coastal landscapes, ancient textiles, and the golden hour light of Ibiza. Using organic linens, silk chiffons, and hand-embroidered details, Luna Rosa creates pieces that feel both timeless and contemporary.',
      videoUrl: 'https://player.vimeo.com/video/example5',
      coverImage: '/images/brands/luna-rosa/campaign/hero.jpg',
      founded: '2017',
      location: 'Barcelona, Spain',
      aesthetic: JSON.stringify(['dresses', 'co-ord sets', 'tops', 'resortwear', 'bohemian', 'romantic']),
      featured: true,
    },
  })

  await prisma.brandFeature.createMany({
    data: [
      { brandId: lunaRosa.id, title: 'Bohemian Chic', publication: 'Elle', date: '2024' },
      { brandId: lunaRosa.id, title: 'Summer Style', publication: 'Marie Claire', date: '2023' },
    ],
  })

  const lrCollection = await prisma.collection.create({
    data: {
      brandId: lunaRosa.id,
      name: 'Mediterranean Whispers',
      slug: 'mediterranean-whispers',
      description: 'Flowing silhouettes and delicate embroidery inspired by coastal magic.',
      season: 'Summer/Spring',
      year: '2024',
      coverImage: '/images/brands/luna-rosa/lookbook/look-01.jpg',
      lookbookImages: JSON.stringify([
        '/images/brands/luna-rosa/lookbook/look-01.jpg',
        '/images/brands/luna-rosa/lookbook/look-02.jpg',
        '/images/brands/luna-rosa/lookbook/look-03.jpg',
        '/images/brands/luna-rosa/lookbook/look-04.jpg',
        '/images/brands/luna-rosa/lookbook/look-05.jpg',
      ]),
      featured: true,
    },
  })

  const lrMaxi = await prisma.product.create({
    data: {
      collectionId: lrCollection.id,
      name: 'Embroidered Maxi Dress',
      slug: 'embroidered-maxi-dress',
      description: 'Flowing maxi dress with hand-embroidered details',
      category: 'dresses',
      price: 950,
      fabricDetails: '100% organic cotton with silk embroidery',
      careInstructions: 'Hand wash cold or dry clean',
      colors: JSON.stringify(['Ivory', 'Dusty Rose', 'Sage Green']),
      featured: true,
    },
  })

  await prisma.productImage.createMany({
    data: [
      { productId: lrMaxi.id, url: '/images/brands/luna-rosa/products/maxi-dress-01.jpg', order: 1, isPrimary: true },
      { productId: lrMaxi.id, url: '/images/brands/luna-rosa/lookbook/look-02.jpg', order: 2 },
    ],
  })

  await prisma.productSize.createMany({
    data: [
      { productId: lrMaxi.id, size: 'XS', inStock: true, quantity: 6 },
      { productId: lrMaxi.id, size: 'S', inStock: true, quantity: 10 },
      { productId: lrMaxi.id, size: 'M', inStock: true, quantity: 12 },
      { productId: lrMaxi.id, size: 'L', inStock: true, quantity: 8 },
    ],
  })

  const lrCoord = await prisma.product.create({
    data: {
      collectionId: lrCollection.id,
      name: 'Linen Co-ord Set',
      slug: 'linen-coord-set',
      description: 'Relaxed linen two-piece with delicate detailing',
      category: 'co-ord sets',
      price: 680,
      fabricDetails: 'European linen',
      careInstructions: 'Machine wash gentle',
      colors: JSON.stringify(['Natural', 'White', 'Coral']),
    },
  })

  await prisma.productImage.createMany({
    data: [
      { productId: lrCoord.id, url: '/images/brands/luna-rosa/products/linen-coord-01.jpg', order: 1, isPrimary: true },
    ],
  })

  await prisma.productSize.createMany({
    data: [
      { productId: lrCoord.id, size: 'XS', inStock: true, quantity: 8 },
      { productId: lrCoord.id, size: 'S', inStock: true, quantity: 12 },
      { productId: lrCoord.id, size: 'M', inStock: true, quantity: 14 },
      { productId: lrCoord.id, size: 'L', inStock: true, quantity: 10 },
    ],
  })

  const lrCami = await prisma.product.create({
    data: {
      collectionId: lrCollection.id,
      name: 'Silk Cami Top',
      slug: 'silk-cami-top',
      description: 'Delicate silk camisole with lace trim',
      category: 'tops',
      price: 380,
      fabricDetails: 'Pure silk charmeuse with French lace',
      careInstructions: 'Hand wash or dry clean',
      colors: JSON.stringify(['Blush', 'Ivory', 'Champagne']),
    },
  })

  await prisma.productImage.createMany({
    data: [
      { productId: lrCami.id, url: '/images/brands/luna-rosa/products/silk-cami-01.jpg', order: 1, isPrimary: true },
    ],
  })

  await prisma.productSize.createMany({
    data: [
      { productId: lrCami.id, size: 'XS', inStock: true, quantity: 10 },
      { productId: lrCami.id, size: 'S', inStock: true, quantity: 15 },
      { productId: lrCami.id, size: 'M', inStock: true, quantity: 15 },
      { productId: lrCami.id, size: 'L', inStock: true, quantity: 10 },
    ],
  })

  console.log('✓ Created brand: Luna Rosa')

  console.log('\n✅ Database seeded successfully!')
  console.log(`\nCreated:`)
  console.log(`- 5 luxury brands`)
  console.log(`- 5 collections`)
  console.log(`- 15 products`)
  console.log(`- 47+ product images (local paths)`)
  console.log(`- 10 brand features`)
}

main()
  .then(async () => {
    await prisma.$disconnect()
  })
  .catch(async (e) => {
    console.error(e)
    await prisma.$disconnect()
    process.exit(1)
  })
