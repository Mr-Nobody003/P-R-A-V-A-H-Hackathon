export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  category: 'weaving' | 'bamboo' | 'pottery' | 'woodcarving';
  images: string[];
  artisan: Artisan;
  stock: number;
}

export interface Artisan {
  id: string;
  name: string;
  location: string;
  story: string;
  image: string;
  specialization: string;
}