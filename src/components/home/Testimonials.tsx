
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';

interface Testimonial {
  id: string;
  name: string;
  location: string;
  quote: string;
}

const testimonials: Testimonial[] = [
  {
    id: '1',
    name: 'Sarah Johnson',
    location: 'New York, NY',
    quote: 'The quality of DecorHaven products exceeded my expectations. The throw pillows I ordered perfectly complement my living room and arrived earlier than expected.'
  },
  {
    id: '2',
    name: 'Michael Chen',
    location: 'San Francisco, CA',
    quote: 'I\'ve been looking for the perfect plant pots for months. DecorHaven\'s ceramic planters are exactly what I wanted - stylish, well-crafted, and reasonably priced.'
  },
  {
    id: '3',
    name: 'Emma Wilson',
    location: 'Chicago, IL',
    quote: 'The customer service at DecorHaven is outstanding. When I had questions about my order, the team responded quickly and was incredibly helpful.'
  }
];

export function Testimonials() {
  return (
    <section className="py-16 bg-secondary">
      <div className="container">
        <h2 className="text-3xl font-bold tracking-tight text-center mb-2">What Our Customers Say</h2>
        <p className="text-muted-foreground text-center mb-10">Hear from our satisfied customers</p>

        <div className="grid gap-6 md:grid-cols-3">
          {testimonials.map((testimonial) => (
            <Card key={testimonial.id} className="border-0 shadow-sm">
              <CardContent className="pt-6">
                <div className="mb-4 flex justify-center">
                  <svg xmlns="http://www.w3.org/2000/svg" width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round" className="text-decor-terracotta/40">
                    <path d="M3 21c3 0 7-1 7-8V5c0-1.25-.756-2.017-2-2H4c-1.25 0-2 .75-2 1.972V11c0 1.25.75 2 2 2 1 0 1 0 1 1v1c0 1-1 2-2 2s-1 .008-1 1.031V20c0 1 0 1 1 1z"></path>
                    <path d="M15 21c3 0 7-1 7-8V5c0-1.25-.757-2.017-2-2h-4c-1.25 0-2 .75-2 1.972V11c0 1.25.75 2 2 2h.75c0 2.25.25 4-2.75 4v3c0 1 0 1 1 1z"></path>
                  </svg>
                </div>
                <p className="text-center mb-4">{testimonial.quote}</p>
                <div className="text-center">
                  <p className="font-medium">{testimonial.name}</p>
                  <p className="text-sm text-muted-foreground">{testimonial.location}</p>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
