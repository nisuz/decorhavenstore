
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Category } from '@/types';
import { api } from '@/services/api';
import { Card, CardContent } from '@/components/ui/card';

export function CategoryShowcase() {
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const data = await api.getCategories();
        setCategories(data);
      } catch (error) {
        console.error('Error fetching categories:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchCategories();
  }, []);

  if (loading) {
    return (
      <section className="py-12 bg-secondary">
        <div className="container">
          <h2 className="text-3xl font-bold tracking-tight text-center mb-10">Shop by Category</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {[1, 2, 3].map((i) => (
              <Card key={i} className="overflow-hidden">
                <div className="h-48 bg-gray-100 animate-pulse"></div>
                <CardContent className="pt-4">
                  <div className="h-4 bg-gray-100 animate-pulse mb-2"></div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="py-12 bg-secondary">
      <div className="container">
        <h2 className="text-3xl font-bold tracking-tight text-center mb-2">Shop by Category</h2>
        <p className="text-muted-foreground text-center mb-10">Find the perfect pieces for every room</p>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {categories.slice(0, 3).map((category) => (
            <Link 
              key={category.id} 
              to={`/category/${category.id}`}
              className="group block overflow-hidden"
            >
              <Card className="overflow-hidden transition-all duration-200 hover:shadow-md h-full border-0 shadow-lg">
                <div className="relative h-60 overflow-hidden">
                  <div className="absolute inset-0 bg-black/20 z-10 transition-opacity group-hover:bg-black/10"></div>
                  <img 
                    src={category.image} 
                    alt={category.name} 
                    className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 flex items-center justify-center z-20">
                    <h3 className="text-2xl font-serif text-white font-bold shadow-text px-4 py-2 bg-black/30 backdrop-blur-sm rounded-md">
                      {category.name}
                    </h3>
                  </div>
                </div>
              </Card>
            </Link>
          ))}
        </div>
        
        <div className="text-center mt-8">
          <Link 
            to="/categories"
            className="inline-block px-6 py-3 text-sm font-medium transition-colors hover:text-primary"
          >
            View All Categories →
          </Link>
        </div>
      </div>
    </section>
  );
}
