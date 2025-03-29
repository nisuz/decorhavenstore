
import React from 'react';
import { Hero } from '@/components/home/Hero';
import { FeaturedProducts } from '@/components/home/FeaturedProducts';
import { CategoryShowcase } from '@/components/home/CategoryShowcase';
import { Promotion } from '@/components/home/Promotion';
import { Testimonials } from '@/components/home/Testimonials';
import { Newsletter } from '@/components/home/Newsletter';

const Index = () => {
  return (
    <div>
      <Hero />
      <FeaturedProducts />
      <CategoryShowcase />
      <Promotion />
      <Testimonials />
      <Newsletter />
    </div>
  );
};

export default Index;
