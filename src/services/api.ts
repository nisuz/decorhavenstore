
import { Product, Category, Order, User, PaymentMethod } from '../types';
import { products, categories } from '../data/mockData';

// In a real application, these would be actual API calls
// For now, we'll use mock data and setTimeout to simulate API latency

export const api = {
  // Product endpoints
  getProducts: async (): Promise<Product[]> => {
    return new Promise((resolve) => {
      setTimeout(() => resolve(products), 500);
    });
  },

  getProduct: async (id: string): Promise<Product | undefined> => {
    return new Promise((resolve) => {
      const product = products.find(p => p.id === id);
      setTimeout(() => resolve(product), 300);
    });
  },

  getProductsByCategory: async (categoryId: string): Promise<Product[]> => {
    return new Promise((resolve) => {
      const filtered = products.filter(p => p.category === categoryId);
      setTimeout(() => resolve(filtered), 300);
    });
  },

  getFeaturedProducts: async (): Promise<Product[]> => {
    return new Promise((resolve) => {
      const featured = products.filter(p => p.featured);
      setTimeout(() => resolve(featured), 300);
    });
  },

  // Category endpoints
  getCategories: async (): Promise<Category[]> => {
    return new Promise((resolve) => {
      setTimeout(() => resolve(categories), 300);
    });
  },

  getCategory: async (id: string): Promise<Category | undefined> => {
    return new Promise((resolve) => {
      const category = categories.find(c => c.id === id);
      setTimeout(() => resolve(category), 200);
    });
  },

  // Order endpoints
  createOrder: async (order: Omit<Order, 'id' | 'createdAt'>): Promise<Order> => {
    return new Promise((resolve) => {
      const newOrder: Order = {
        ...order,
        id: Math.random().toString(36).substring(2, 15),
        createdAt: new Date().toISOString()
      };
      // In a real application, we would send this to a server
      console.log('Order created:', newOrder);
      
      // Send notification to Discord/Telegram (simulated)
      api.sendOrderNotification(newOrder);
      
      setTimeout(() => resolve(newOrder), 600);
    });
  },

  // Notification endpoints
  sendOrderNotification: async (order: Order): Promise<void> => {
    // In a real application, this would send a webhook to Discord or Telegram
    console.log('Sending notification for order:', order);
    return Promise.resolve();
  },

  // User endpoints
  registerUser: async (user: Omit<User, 'id'>): Promise<User> => {
    return new Promise((resolve) => {
      const newUser: User = {
        ...user,
        id: Math.random().toString(36).substring(2, 15)
      };
      // In a real application, we would send this to a server
      console.log('User registered:', newUser);
      setTimeout(() => resolve(newUser), 600);
    });
  },

  loginUser: async (email: string, password: string): Promise<User | null> => {
    // This is a mock login - in a real app, you'd verify credentials with a server
    // For demo purposes, we'll just pretend the login is successful if email includes "@"
    return new Promise((resolve) => {
      if (email.includes('@')) {
        const mockUser: User = {
          id: '123',
          name: 'Demo User',
          email: email,
          phone: '123-456-7890',
          billingAddress: {
            street: '123 Main St',
            city: 'Anytown',
            state: 'State',
            postalCode: '12345',
            country: 'Country'
          },
          deliveryAddress: {
            street: '123 Main St',
            city: 'Anytown',
            state: 'State',
            postalCode: '12345',
            country: 'Country'
          }
        };
        setTimeout(() => resolve(mockUser), 500);
      } else {
        setTimeout(() => resolve(null), 500);
      }
    });
  },

  // Payment processing (mock)
  processPayment: async (method: PaymentMethod, amount: number): Promise<boolean> => {
    return new Promise((resolve) => {
      // Simulate payment processing
      console.log(`Processing ${amount} via ${method}`);
      // 95% success rate for demo purposes
      const success = Math.random() < 0.95;
      setTimeout(() => resolve(success), 800);
    });
  },
  
  // Verify payment status (mock)
  verifyPayment: async (transactionId: string): Promise<{
    verified: boolean;
    method: PaymentMethod;
    amount: number;
  }> => {
    return new Promise((resolve) => {
      // Extract payment method from transaction ID format
      const methodMatch = transactionId.match(/^([A-Z]+)-\d+$/);
      let method: PaymentMethod = 'cod';
      
      if (methodMatch) {
        const prefix = methodMatch[1].toLowerCase();
        if (prefix === 'esewa') method = 'esewa';
        else if (prefix === 'khalti') method = 'khalti';
        else if (prefix === 'connectips') method = 'connectips';
        else if (prefix === 'card') method = 'card';
        else if (prefix === 'banking') method = 'banking';
      }
      
      setTimeout(() => {
        resolve({
          verified: Math.random() < 0.95,
          method,
          amount: Math.floor(Math.random() * 10000) / 100
        });
      }, 500);
    });
  }
};
