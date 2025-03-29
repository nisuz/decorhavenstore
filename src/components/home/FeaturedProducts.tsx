
import React, { useEffect, useState } from 'react';
import { Product } from '@/types';
import { api } from '@/services/api';
import { Link } from 'react-router-dom';
import { Card, CardContent, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { useCart } from '@/context/CartContext';
import { ShoppingCart } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

export function FeaturedProducts() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const { addToCart } = useCart();
  const { toast } = useToast();

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const featuredProducts = await api.getFeaturedProducts();
        setProducts(featuredProducts);
      } catch (error) {
        console.error('Error fetching featured products:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  const handleAddToCart = (product: Product) => {
    addToCart({
      id: product.id,
      name: product.name,
      price: product.price,
      image: product.images[0],
    });
    
    toast({
      title: "Added to cart",
      description: `${product.name} added to your cart.`,
    });
  };

  if (loading) {
    return (
      <section className="py-12">
        <div className="container">
          <h2 className="text-3xl font-bold tracking-tight text-center mb-10">Featured Products</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[1, 2, 3, 4].map((i) => (
              <Card key={i} className="overflow-hidden">
                <div className="h-48 bg-gray-100 animate-pulse"></div>
                <CardContent className="pt-4">
                  <div className="h-4 bg-gray-100 animate-pulse mb-2"></div>
                  <div className="h-4 bg-gray-100 animate-pulse w-2/3"></div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="py-12">
      <div className="container">
        <h2 className="text-3xl font-bold tracking-tight text-center mb-2">Featured Products</h2>
        <p className="text-muted-foreground text-center mb-10">Curated pieces to enhance your home</p>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {products.map((product) => (
            <Card key={product.id} className="overflow-hidden transition-all duration-200 hover:shadow-md">
              <Link to={`/product/${product.id}`}>
                <div className="h-48 overflow-hidden">
                  <img 
                    src={product.images[0]} 
                    alt={product.name} 
                    className="h-full w-full object-cover transition-transform duration-300 hover:scale-105"
                  />
                </div>
              </Link>
              <CardContent className="pt-4">
                <Link to={`/product/${product.id}`}>
                  <h3 className="text-lg font-medium line-clamp-1 hover:text-primary transition-colors">{product.name}</h3>
                </Link>
                <p className="text-muted-foreground text-sm line-clamp-1 mt-1">{product.description}</p>
                <p className="text-lg font-medium text-primary mt-2">${product.price.toFixed(2)}</p>
              </CardContent>
              <CardFooter className="pt-0">
                <Button 
                  variant="default" 
                  size="sm" 
                  className="w-full"
                  onClick={() => handleAddToCart(product)}
                >
                  <ShoppingCart className="h-4 w-4 mr-2" /> Add to Cart
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>
        
        <div className="text-center mt-10">
          <Button asChild variant="outline" size="lg">
            <Link to="/shop">View All Products</Link>
          </Button>
        </div>
      </div>
    </section>
  );
}
