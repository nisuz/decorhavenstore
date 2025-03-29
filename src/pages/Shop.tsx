
import React, { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Product, Category } from '@/types';
import { api } from '@/services/api';
import { Card, CardContent, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { useCart } from '@/context/CartContext';
import { Link } from 'react-router-dom';
import { ShoppingCart, Filter } from 'lucide-react';
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from "@/components/ui/select";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import { 
  Checkbox 
} from '@/components/ui/checkbox';
import { Label } from '@/components/ui/label';
import { useToast } from '@/hooks/use-toast';

const Shop = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchParams, setSearchParams] = useSearchParams();
  const [filterOpen, setFilterOpen] = useState(false);
  
  const { addToCart } = useCart();
  const { toast } = useToast();
  
  const category = searchParams.get('category') || '';
  const sort = searchParams.get('sort') || 'default';
  const sale = searchParams.get('sale') === 'true';
  
  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        // Fetch categories
        const categoriesData = await api.getCategories();
        setCategories(categoriesData);
        
        // Fetch products based on filters
        let productsData;
        if (category) {
          productsData = await api.getProductsByCategory(category);
        } else {
          productsData = await api.getProducts();
        }
        
        // Apply sorting
        let sortedProducts = [...productsData];
        switch (sort) {
          case 'price-low':
            sortedProducts.sort((a, b) => a.price - b.price);
            break;
          case 'price-high':
            sortedProducts.sort((a, b) => b.price - a.price);
            break;
          case 'name-asc':
            sortedProducts.sort((a, b) => a.name.localeCompare(b.name));
            break;
          case 'name-desc':
            sortedProducts.sort((a, b) => b.name.localeCompare(a.name));
            break;
          default:
            // Default sort remains as is
            break;
        }
        
        setProducts(sortedProducts);
      } catch (error) {
        console.error('Error fetching data:', error);
      } finally {
        setLoading(false);
      }
    };
    
    fetchData();
  }, [category, sort, sale]);
  
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
  
  const handleSortChange = (value: string) => {
    setSearchParams(prev => {
      const newParams = new URLSearchParams(prev);
      newParams.set('sort', value);
      return newParams;
    });
  };
  
  const handleCategoryChange = (categoryId: string, checked: boolean) => {
    setSearchParams(prev => {
      const newParams = new URLSearchParams(prev);
      if (checked) {
        newParams.set('category', categoryId);
      } else {
        newParams.delete('category');
      }
      return newParams;
    });
  };
  
  return (
    <div className="container py-8 md:py-12">
      <h1 className="text-3xl font-bold mb-8">Shop Collection</h1>
      
      <div className="flex flex-col md:flex-row gap-8">
        {/* Filters - Mobile */}
        <div className="md:hidden">
          <Collapsible
            open={filterOpen}
            onOpenChange={setFilterOpen}
            className="w-full space-y-2"
          >
            <div className="flex items-center justify-between">
              <h2 className="text-lg font-medium">Filters</h2>
              <CollapsibleTrigger asChild>
                <Button variant="ghost" size="sm">
                  <Filter className="h-4 w-4 mr-2" />
                  {filterOpen ? "Hide Filters" : "Show Filters"}
                </Button>
              </CollapsibleTrigger>
            </div>
            <CollapsibleContent className="space-y-4">
              <div className="space-y-2">
                <h3 className="font-medium">Categories</h3>
                <div className="space-y-1">
                  {categories.map((cat) => (
                    <div key={cat.id} className="flex items-center space-x-2">
                      <Checkbox 
                        id={`category-${cat.id}-mobile`}
                        checked={category === cat.id}
                        onCheckedChange={(checked) => handleCategoryChange(cat.id, checked as boolean)}
                      />
                      <Label htmlFor={`category-${cat.id}-mobile`}>{cat.name}</Label>
                    </div>
                  ))}
                </div>
              </div>
            </CollapsibleContent>
          </Collapsible>
        </div>
        
        {/* Filters - Desktop */}
        <div className="hidden md:block w-64 space-y-6">
          <div>
            <h3 className="font-medium mb-3">Categories</h3>
            <div className="space-y-2">
              {categories.map((cat) => (
                <div key={cat.id} className="flex items-center space-x-2">
                  <Checkbox 
                    id={`category-${cat.id}`}
                    checked={category === cat.id}
                    onCheckedChange={(checked) => handleCategoryChange(cat.id, checked as boolean)}
                  />
                  <Label htmlFor={`category-${cat.id}`}>{cat.name}</Label>
                </div>
              ))}
            </div>
          </div>
        </div>
        
        {/* Product Grid */}
        <div className="flex-1">
          <div className="flex justify-between items-center mb-6">
            <p className="text-sm text-muted-foreground">
              Showing {products.length} products
            </p>
            <div className="flex items-center space-x-2">
              <span className="text-sm">Sort by:</span>
              <Select value={sort} onValueChange={handleSortChange}>
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Default" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="default">Default</SelectItem>
                  <SelectItem value="price-low">Price: Low to High</SelectItem>
                  <SelectItem value="price-high">Price: High to Low</SelectItem>
                  <SelectItem value="name-asc">Name: A to Z</SelectItem>
                  <SelectItem value="name-desc">Name: Z to A</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          
          {loading ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {[1, 2, 3, 4, 5, 6].map((i) => (
                <Card key={i} className="overflow-hidden">
                  <div className="h-48 bg-gray-100 animate-pulse"></div>
                  <CardContent className="pt-4">
                    <div className="h-4 bg-gray-100 animate-pulse mb-2"></div>
                    <div className="h-4 bg-gray-100 animate-pulse w-2/3"></div>
                  </CardContent>
                </Card>
              ))}
            </div>
          ) : products.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-lg">No products found.</p>
              <p className="text-muted-foreground mt-2">Try adjusting your filters.</p>
              <Button 
                variant="outline" 
                className="mt-4"
                onClick={() => setSearchParams({})}
              >
                Clear Filters
              </Button>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
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
                      type="button"
                    >
                      <ShoppingCart className="h-4 w-4 mr-2" /> Add to Cart
                    </Button>
                  </CardFooter>
                </Card>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Shop;
