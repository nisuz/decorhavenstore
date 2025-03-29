
import { Product, Category } from '../types';

export const products: Product[] = [
  {
    id: '1',
    name: 'Beige Linen Throw Pillow',
    description: 'Elegant hand-crafted linen throw pillow with tassels, perfect for adding texture to your couch or bed.',
    price: 24.99,
    images: ['https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?auto=format&fit=crop&q=80&w=1000'],
    category: 'pillows',
    stock: 25,
    featured: true
  },
  {
    id: '2',
    name: 'Ceramic Plant Pot',
    description: 'Beautiful ceramic pot for your indoor plants. Features a minimalist design with drainage holes.',
    price: 19.95,
    images: ['https://images.unsplash.com/photo-1485955900006-10f4d324d411?auto=format&fit=crop&q=80&w=1000'],
    category: 'planters',
    stock: 30,
    featured: true
  },
  {
    id: '3',
    name: 'Macrame Wall Hanging',
    description: 'Handmade macrame wall hanging that adds bohemian charm to any room in your home.',
    price: 45.50,
    images: ['https://images.unsplash.com/photo-1629013410237-051a2773296f?auto=format&fit=crop&q=80&w=1000'],
    category: 'wall-decor',
    stock: 15,
    featured: true
  },
  {
    id: '4',
    name: 'Scented Soy Candle',
    description: 'Hand-poured soy wax candle with essential oils and wooden wick. Burns clean for up to 40 hours.',
    price: 18.99,
    images: ['https://images.unsplash.com/photo-1603006905393-0af98d320ad3?auto=format&fit=crop&q=80&w=1000'],
    category: 'candles',
    stock: 40
  },
  {
    id: '5',
    name: 'Terrazzo Coasters (Set of 4)',
    description: 'Modern terrazzo coasters made from sustainable materials. Protects your furniture in style.',
    price: 15.95,
    images: ['https://images.unsplash.com/photo-1614176808776-b450a282e655?auto=format&fit=crop&q=80&w=1000'],
    category: 'tableware',
    stock: 20
  },
  {
    id: '6',
    name: 'Woven Basket Set',
    description: 'Set of 3 nesting baskets made from natural materials. Perfect for storage and organization.',
    price: 35.00,
    images: ['https://images.unsplash.com/photo-1629393448042-4f85085e97e1?auto=format&fit=crop&q=80&w=1000'],
    category: 'storage',
    stock: 18,
    featured: true
  },
  {
    id: '7',
    name: 'Wooden Wall Shelf',
    description: 'Solid wood floating shelf with metal brackets. Adds storage and style to any wall.',
    price: 29.99,
    images: ['https://images.unsplash.com/photo-1618220048045-10a6dbdf83e0?auto=format&fit=crop&q=80&w=1000'],
    category: 'shelving',
    stock: 12
  },
  {
    id: '8',
    name: 'Cotton Throw Blanket',
    description: 'Soft 100% cotton blanket with geometric design. Perfect for cool evenings or as a decorative accent.',
    price: 39.95,
    images: ['https://images.unsplash.com/photo-1580997410245-4310dfcce75a?auto=format&fit=crop&q=80&w=1000'],
    category: 'textiles',
    stock: 22,
    featured: true
  }
];

export const categories: Category[] = [
  {
    id: 'pillows',
    name: 'Decorative Pillows',
    image: 'https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?auto=format&fit=crop&q=80&w=1000',
    description: 'Add comfort and style with our collection of decorative pillows'
  },
  {
    id: 'planters',
    name: 'Plant Pots & Planters',
    image: 'https://images.unsplash.com/photo-1485955900006-10f4d324d411?auto=format&fit=crop&q=80&w=1000',
    description: 'Beautiful homes for your green friends'
  },
  {
    id: 'wall-decor',
    name: 'Wall Decor',
    image: 'https://images.unsplash.com/photo-1629013410237-051a2773296f?auto=format&fit=crop&q=80&w=1000',
    description: 'Transform your walls with artwork, hangings, and more'
  },
  {
    id: 'candles',
    name: 'Candles & Scents',
    image: 'https://images.unsplash.com/photo-1603006905393-0af98d320ad3?auto=format&fit=crop&q=80&w=1000',
    description: 'Create ambiance with our artisanal candles and diffusers'
  },
  {
    id: 'tableware',
    name: 'Tableware',
    image: 'https://images.unsplash.com/photo-1614176808776-b450a282e655?auto=format&fit=crop&q=80&w=1000',
    description: 'Elevate your dining experience with our stylish tableware'
  },
  {
    id: 'storage',
    name: 'Storage & Organization',
    image: 'https://images.unsplash.com/photo-1629393448042-4f85085e97e1?auto=format&fit=crop&q=80&w=1000',
    description: 'Stylish solutions for keeping your home organized'
  }
];
