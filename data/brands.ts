import { Brand, ClothingCategory, Season } from '@/types';

export const brands: Brand[] = [
  {
    id: '1',
    name: 'Ethereal Couture',
    image: 'https://picsum.photos/seed/ethereal-1/800/600',
    description: 'A contemporary luxury brand specializing in flowing silhouettes and artisanal craftsmanship. Each piece tells a story of elegance and timeless sophistication.',
    video: 'https://videos.pexels.com/video-files/3045163/3045163-hd_1920_1080_30fps.mp4',
    features: ['Vogue', 'Harper\'s Bazaar', 'Elle'],
    publications: ['Featured in Vogue Paris', 'Elle Magazine Cover', 'Harper\'s Bazaar Editorial'],
    collections: [
      {
        id: 'c1',
        name: 'Spring Awakening',
        thumbnail: 'https://picsum.photos/seed/spring-1/600/800',
        description: 'A celebration of renewal and fresh beginnings',
        products: [
          {
            id: 'p1',
            name: 'Silk Floral Maxi Dress',
            images: [
              'https://picsum.photos/seed/dress-1/800/1000',
              'https://picsum.photos/seed/dress-2/800/1000',
              'https://picsum.photos/seed/dress-3/800/1000',
            ],
            description: 'Flowing silk maxi dress with hand-painted floral motifs. Features a deep V-neckline and adjustable straps.',
            price: 1250,
            availableSizes: ['XS', 'S', 'M', 'L', 'XL'],
            category: 'dresses',
            season: 'Summer/Spring',
            customizationOptions: ['Color variations', 'Length adjustment', 'Embellishment options'],
          },
          {
            id: 'p2',
            name: 'Linen Co-ord Set',
            images: [
              'https://picsum.photos/seed/coord-1/800/1000',
              'https://picsum.photos/seed/coord-2/800/1000',
            ],
            description: 'Elegant two-piece set in premium linen. Cropped blazer with matching wide-leg trousers.',
            price: 980,
            availableSizes: ['XS', 'S', 'M', 'L'],
            category: 'co-ord sets',
            season: 'Summer/Spring',
          },
        ],
      },
      {
        id: 'c2',
        name: 'Evening Elegance',
        thumbnail: 'https://picsum.photos/seed/evening-1/600/800',
        description: 'Sophisticated evening wear for the modern woman',
        products: [
          {
            id: 'p3',
            name: 'Velvet Evening Gown',
            images: [
              'https://picsum.photos/seed/gown-1/800/1000',
            ],
            description: 'Luxurious velvet gown with intricate beading and a dramatic train.',
            price: 3200,
            availableSizes: ['XS', 'S', 'M', 'L', 'XL'],
            category: 'evening wear',
            season: 'Fall/Winter',
          },
        ],
      },
    ],
    featuredLookbook: [
      {
        id: 'l1',
        image: 'https://picsum.photos/seed/lookbook-1/1920/1080',
        caption: 'Spring Collection 2024',
      },
      {
        id: 'l2',
        image: 'https://picsum.photos/seed/lookbook-2/1920/1080',
        caption: 'Elegance Redefined',
      },
      {
        id: 'l3',
        image: 'https://picsum.photos/seed/lookbook-3/1920/1080',
        caption: 'Timeless Sophistication',
      },
    ],
  },
  {
    id: '2',
    name: 'Minimalist Luxe',
    image: 'https://picsum.photos/seed/minimalist-1/800/600',
    description: 'Clean lines and architectural silhouettes define this modern luxury brand. Perfect for the sophisticated minimalist.',
    collections: [
      {
        id: 'c3',
        name: 'Architectural Forms',
        thumbnail: 'https://picsum.photos/seed/architectural-1/600/800',
        description: 'Bold geometric shapes meet luxurious fabrics',
        products: [
          {
            id: 'p4',
            name: 'Structured Blazer',
            images: [
              'https://picsum.photos/seed/blazer-1/800/1000',
            ],
            description: 'Sharp-shouldered blazer in premium wool blend.',
            price: 890,
            availableSizes: ['XS', 'S', 'M', 'L', 'XL'],
            category: 'tops',
            season: 'Fall/Winter',
          },
        ],
      },
    ],
  },
  {
    id: '3',
    name: 'Artisan Threads',
    image: 'https://picsum.photos/seed/artisan-1/800/600',
    description: 'Handcrafted luxury with traditional techniques. Each piece is a work of art.',
    collections: [
      {
        id: 'c4',
        name: 'Heritage Collection',
        thumbnail: 'https://picsum.photos/seed/heritage-1/600/800',
        description: 'Celebrating traditional craftsmanship',
        products: [
          {
            id: 'p5',
            name: 'Hand-Embroidered Tunic',
            images: [
              'https://picsum.photos/seed/tunic-1/800/1000',
            ],
            description: 'Intricately embroidered tunic in silk.',
            price: 1450,
            availableSizes: ['S', 'M', 'L'],
            category: 'tops',
            season: 'resortwear',
          },
        ],
      },
    ],
  },
  {
    id: '4',
    name: 'Coastal Elegance',
    image: 'https://picsum.photos/seed/coastal-1/800/600',
    description: 'Resort wear that seamlessly transitions from beach to evening. Effortless sophistication.',
    collections: [
      {
        id: 'c5',
        name: 'Resort Collection',
        thumbnail: 'https://picsum.photos/seed/resort-1/600/800',
        description: 'Perfect for your next getaway',
        products: [
          {
            id: 'p6',
            name: 'Flowy Resort Dress',
            images: [
              'https://picsum.photos/seed/resort-dress-1/800/1000',
            ],
            description: 'Lightweight dress perfect for resort settings.',
            price: 750,
            availableSizes: ['XS', 'S', 'M', 'L', 'XL'],
            category: 'dresses',
            season: 'resortwear',
          },
        ],
      },
    ],
  },
  {
    id: '5',
    name: 'Urban Sophisticate',
    image: 'https://picsum.photos/seed/urban-1/800/600',
    description: 'Contemporary designs for the modern urban woman. Where city meets couture.',
    collections: [
      {
        id: 'c6',
        name: 'City Collection',
        thumbnail: 'https://picsum.photos/seed/city-1/600/800',
        description: 'Designed for the urban lifestyle',
        products: [
          {
            id: 'p7',
            name: 'Tailored Trousers',
            images: [
              'https://picsum.photos/seed/trousers-1/800/1000',
            ],
            description: 'Perfectly tailored trousers in premium fabric.',
            price: 650,
            availableSizes: ['XS', 'S', 'M', 'L', 'XL'],
            category: 'pants',
            season: 'Fall/Winter',
          },
        ],
      },
    ],
  },
];

export function filterBrands(category?: ClothingCategory, season?: Season): Brand[] {
  if (!category && !season) return brands;
  
  return brands.filter(brand => {
    const hasMatchingCollection = brand.collections.some(collection =>
      collection.products.some(product => {
        const categoryMatch = !category || product.category === category;
        const seasonMatch = !season || product.season === season;
        return categoryMatch && seasonMatch;
      })
    );
    return hasMatchingCollection;
  });
}

