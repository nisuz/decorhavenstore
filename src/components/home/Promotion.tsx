
import React from 'react';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';

export function Promotion() {
  return (
    <section className="py-16">
      <div className="container">
        <div className="relative overflow-hidden rounded-lg bg-decor-terracotta text-white">
          <div 
            className="absolute inset-0 bg-cover bg-center opacity-20" 
            style={{ backgroundImage: "url('https://images.unsplash.com/photo-1585412727339-54e4bae3bbf9?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1000&q=80')" }}
          ></div>
          
          <div className="relative z-10 px-6 py-12 md:py-16 lg:py-20 flex flex-col items-center text-center">
            <h2 className="text-3xl font-bold tracking-tight md:text-4xl">
              Special Summer Sale
            </h2>
            <p className="mt-4 text-lg max-w-2xl">
              Enjoy up to 30% off selected home decor items. Refresh your space with our bestselling pieces at special prices.
            </p>
            <Button asChild size="lg" className="mt-8 bg-white text-decor-terracotta hover:bg-white/90">
              <Link to="/shop?sale=true">Shop the Sale</Link>
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
