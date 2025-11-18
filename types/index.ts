export type ClothingCategory = 
  | 'dresses' 
  | 'co-ord sets' 
  | 'evening wear' 
  | 'tops' 
  | 'shirts' 
  | 'pants';

export type Season = 'Summer/Spring' | 'Fall/Winter' | 'resortwear';

export interface Brand {
  id: string;
  name: string;
  image: string;
  description: string;
  video?: string;
  features?: string[];
  publications?: string[];
  collections: Collection[];
  featuredLookbook?: LookbookImage[];
}

export interface Collection {
  id: string;
  name: string;
  thumbnail: string;
  description: string;
  products: Product[];
}

export interface Product {
  id: string;
  name: string;
  images: string[];
  description: string;
  price: number;
  availableSizes: string[];
  category: ClothingCategory;
  season: Season;
  customizationOptions?: string[];
}

export interface LookbookImage {
  id: string;
  image: string;
  caption?: string;
}

export interface BodyShape {
  id: string;
  name: string;
  measurements: {
    bust: number;
    waist: number;
    hips: number;
    height: number;
  };
}

