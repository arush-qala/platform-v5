import { Brand, ClothingCategory, Season } from '@/types';

export const brands: Brand[] = [
  {
    id: '1',
    name: 'Ethereal Couture',
    image: 'https://images.unsplash.com/photo-1490481651871-ab68de25d43d?w=800&h=600&fit=crop',
    description: 'A contemporary luxury brand specializing in flowing silhouettes and artisanal craftsmanship. Each piece tells a story of elegance and timeless sophistication.',
    video: 'https://videos.pexels.com/video-files/3045163/3045163-hd_1920_1080_30fps.mp4',
    features: ['Vogue', 'Harper\'s Bazaar', 'Elle'],
    publications: ['Featured in Vogue Paris', 'Elle Magazine Cover', 'Harper\'s Bazaar Editorial'],
    collections: [
      {
        id: 'c1',
        name: 'Spring Awakening',
        thumbnail: 'https://images.unsplash.com/photo-1515372039744-b8f02a3ae446?w=600&h=800&fit=crop',
        description: 'A celebration of renewal and fresh beginnings',
        products: [
          {
            id: 'p1',
            name: 'Silk Floral Maxi Dress',
            images: [
              'https://images.unsplash.com/photo-1595777457583-95e059d581b8?w=800&h=1000&fit=crop',
              'https://images.unsplash.com/photo-1594633312681-425c7b97ccd1?w=800&h=1000&fit=crop',
              'https://images.unsplash.com/photo-1595777457583-95e059d581b8?w=800&h=1000&fit=crop',
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
              'https://images.unsplash.com/photo-1594633313593-bab3825d0caf?w=800&h=1000&fit=crop',
              'https://images.unsplash.com/photo-1594633312681-425c7b97ccd1?w=800&h=1000&fit=crop',
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
        thumbnail: 'https://images.unsplash.com/photo-1594633312681-425c7b97ccd1?w=600&h=800&fit=crop',
        description: 'Sophisticated evening wear for the modern woman',
        products: [
          {
            id: 'p3',
            name: 'Velvet Evening Gown',
            images: [
              'https://images.unsplash.com/photo-1595777457583-95e059d581b8?w=800&h=1000&fit=crop',
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
        image: 'https://images.unsplash.com/photo-1515372039744-b8f02a3ae446?w=1920&h=1080&fit=crop',
        caption: 'Spring Collection 2024',
      },
      {
        id: 'l2',
        image: 'https://images.unsplash.com/photo-1595777457583-95e059d581b8?w=1920&h=1080&fit=crop',
        caption: 'Elegance Redefined',
      },
      {
        id: 'l3',
        image: 'https://images.unsplash.com/photo-1594633312681-425c7b97ccd1?w=1920&h=1080&fit=crop',
        caption: 'Timeless Sophistication',
      },
    ],
  },
  {
    id: '2',
    name: 'Minimalist Luxe',
    image: 'https://images.unsplash.com/photo-1483985988355-763728e1935b?w=800&h=600&fit=crop',
    description: 'Clean lines and architectural silhouettes define this modern luxury brand. Perfect for the sophisticated minimalist.',
    collections: [
      {
        id: 'c3',
        name: 'Architectural Forms',
        thumbnail: 'https://images.unsplash.com/photo-1594633313593-bab3825d0caf?w=600&h=800&fit=crop',
        description: 'Bold geometric shapes meet luxurious fabrics',
        products: [
          {
            id: 'p4',
            name: 'Structured Blazer',
            images: [
              'https://images.unsplash.com/photo-1594633312681-425c7b97ccd1?w=800&h=1000&fit=crop',
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
    image: 'https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=800&h=600&fit=crop',
    description: 'Handcrafted luxury with traditional techniques. Each piece is a work of art.',
    collections: [
      {
        id: 'c4',
        name: 'Heritage Collection',
        thumbnail: 'https://images.unsplash.com/photo-1515372039744-b8f02a3ae446?w=600&h=800&fit=crop',
        description: 'Celebrating traditional craftsmanship',
        products: [
          {
            id: 'p5',
            name: 'Hand-Embroidered Tunic',
            images: [
              'https://images.unsplash.com/photo-1595777457583-95e059d581b8?w=800&h=1000&fit=crop',
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
    image: 'https://images.unsplash.com/photo-1469334031218-e382a71b716b?w=800&h=600&fit=crop',
    description: 'Resort wear that seamlessly transitions from beach to evening. Effortless sophistication.',
    collections: [
      {
        id: 'c5',
        name: 'Resort Collection',
        thumbnail: 'https://images.unsplash.com/photo-1594633313593-bab3825d0caf?w=600&h=800&fit=crop',
        description: 'Perfect for your next getaway',
        products: [
          {
            id: 'p6',
            name: 'Flowy Resort Dress',
            images: [
              'https://images.unsplash.com/photo-1515372039744-b8f02a3ae446?w=800&h=1000&fit=crop',
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
    image: 'https://images.unsplash.com/photo-1445205170230-053b83016050?w=800&h=600&fit=crop',
    description: 'Contemporary designs for the modern urban woman. Where city meets couture.',
    collections: [
      {
        id: 'c6',
        name: 'City Collection',
        thumbnail: 'https://images.unsplash.com/photo-1595777457583-95e059d581b8?w=600&h=800&fit=crop',
        description: 'Designed for the urban lifestyle',
        products: [
          {
            id: 'p7',
            name: 'Tailored Trousers',
            images: [
              'https://images.unsplash.com/photo-1594633312681-425c7b97ccd1?w=800&h=1000&fit=crop',
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

