
import React from 'react';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';

export function Hero() {
  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-decor-cream to-white">
      <div className="container py-20 lg:py-32">
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-2 lg:gap-8">
          <div className="flex flex-col justify-center space-y-6">
            <div className="space-y-4">
              <h1 className="text-4xl font-bold tracking-tighter sm:text-5xl md:text-6xl">
                Transform Your <span className="text-primary">Living Space</span> with Timeless Decor
              </h1>
              <p className="text-lg text-muted-foreground md:text-xl">
                Discover unique home decor pieces that reflect your style and elevate your living space.
              </p>
            </div>
            <div className="flex flex-col space-y-4 sm:flex-row sm:space-y-0 sm:space-x-4">
              <Button asChild size="lg">
                <Link to="/shop">Shop Collection</Link>
              </Button>
              <Button variant="outline" asChild size="lg">
                <Link to="/categories">View Categories</Link>
              </Button>
            </div>
          </div>
          <div className="relative hidden lg:block">
            <div className="absolute -right-12 top-0 h-64 w-64 rounded-full bg-decor-sage/20"></div>
            <div className="absolute -left-12 bottom-0 h-48 w-48 rounded-full bg-decor-terracotta/10"></div>
            <div className="relative rounded-lg overflow-hidden shadow-2xl transform rotate-1">
              <img
                src="https://images.unsplash.com/photo-1513161455079-7dc1de15ef3e?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1000&q=80"
                alt="Home decor showcase"
                className="h-full w-full object-cover"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
