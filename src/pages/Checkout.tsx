
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useCart } from '@/context/CartContext';
import { PaymentMethod, Address } from '@/types';
import { api } from '@/services/api';
import { useToast } from '@/hooks/use-toast';
import { useAuth } from '@/context/AuthContext';
import { CreditCard, DollarSign, Phone } from 'lucide-react';
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"

interface CheckoutForm {
  name: string;
  email: string;
  phone: string;
  billingAddress: Address;
  deliveryAddress: Address;
  sameAsShipping: boolean;
  paymentMethod: PaymentMethod;
}

const paymentMethods: { value: PaymentMethod; label: string; icon: React.ReactNode }[] = [
  { 
    value: 'cod', 
    label: 'Cash on Delivery', 
    icon: <DollarSign className="h-4 w-4" /> 
  },
  { 
    value: 'card', 
    label: 'Credit/Debit Card', 
    icon: <CreditCard className="h-4 w-4" /> 
  },
  { 
    value: 'esewa', 
    label: 'eSewa', 
    icon: <Phone className="h-4 w-4" /> 
  },
  { 
    value: 'khalti', 
    label: 'Khalti', 
    icon: <Phone className="h-4 w-4" /> 
  },
  { 
    value: 'banking', 
    label: 'Banking App', 
    icon: <Phone className="h-4 w-4" /> 
  }
];

const Checkout = () => {
  const { cartItems, getTotalPrice, clearCart } = useCart();
  const { user, isAuthenticated } = useAuth();
  const { toast } = useToast();
  const navigate = useNavigate();

  const emptyAddress: Address = {
    street: '',
    city: '',
    state: '',
    postalCode: '',
    country: ''
  };

  const [form, setForm] = useState<CheckoutForm>({
    name: user?.name || '',
    email: user?.email || '',
    phone: user?.phone || '',
    billingAddress: user?.billingAddress || emptyAddress,
    deliveryAddress: user?.deliveryAddress || emptyAddress,
    sameAsShipping: true,
    paymentMethod: 'cod'
  });

  const [loading, setLoading] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    
    if (name.startsWith('billing.')) {
      const field = name.replace('billing.', '');
      setForm(prev => ({
        ...prev,
        billingAddress: {
          ...prev.billingAddress,
          [field]: value
        }
      }));
    } else if (name.startsWith('delivery.')) {
      const field = name.replace('delivery.', '');
      setForm(prev => ({
        ...prev,
        deliveryAddress: {
          ...prev.deliveryAddress,
          [field]: value
        }
      }));
    } else {
      setForm(prev => ({ ...prev, [name]: value }));
    }
  };

  const handleSameAddressChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const checked = e.target.checked;
    setForm(prev => ({
      ...prev,
      sameAsShipping: checked,
      billingAddress: checked ? prev.deliveryAddress : emptyAddress
    }));
  };

  const handlePaymentMethodChange = (value: string) => {
    setForm(prev => ({ ...prev, paymentMethod: value as PaymentMethod }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (cartItems.length === 0) {
      toast({
        title: "Cart Empty",
        description: "Your cart is empty. Please add items before checking out.",
        variant: "destructive",
      });
      navigate('/shop');
      return;
    }
    
    setLoading(true);
    
    try {
      // Process payment
      const success = await api.processPayment(form.paymentMethod, getTotalPrice());
      
      if (!success) {
        toast({
          title: "Payment Failed",
          description: "There was a problem processing your payment. Please try again.",
          variant: "destructive",
        });
        setLoading(false);
        return;
      }
      
      // Create order
      await api.createOrder({
        userId: user?.id || 'guest',
        items: cartItems.map(item => ({
          productId: item.id,
          name: item.name,
          price: item.price,
          quantity: item.quantity
        })),
        totalAmount: getTotalPrice(),
        paymentMethod: form.paymentMethod,
        status: 'processing',
        billingAddress: form.billingAddress,
        deliveryAddress: form.deliveryAddress
      });
      
      // Clear cart and redirect to confirmation page
      clearCart();
      
      toast({
        title: "Order Placed Successfully",
        description: "Thank you for your purchase!",
      });
      
      navigate('/confirmation');
    } catch (error) {
      console.error('Checkout error:', error);
      toast({
        title: "Checkout Failed",
        description: "An error occurred during the checkout process.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  if (cartItems.length === 0) {
    return (
      <div className="container py-12">
        <div className="text-center py-16">
          <h2 className="text-xl font-medium mb-2">Your cart is empty</h2>
          <p className="text-muted-foreground mb-8">You need to add items to your cart before checkout.</p>
          <Button asChild size="lg">
            <a href="/shop">Shop Now</a>
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="container py-12">
      <h1 className="text-3xl font-bold mb-8">Checkout</h1>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2">
          <form onSubmit={handleSubmit}>
            {/* Customer Information */}
            <div className="space-y-6 mb-8">
              <div className="bg-card p-6 border rounded">
                <h2 className="text-xl font-semibold mb-6">Customer Information</h2>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="name">Full Name</Label>
                    <Input
                      id="name"
                      name="name"
                      value={form.name}
                      onChange={handleChange}
                      required
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="email">Email Address</Label>
                    <Input
                      id="email"
                      name="email"
                      type="email"
                      value={form.email}
                      onChange={handleChange}
                      required
                    />
                  </div>
                  
                  <div className="space-y-2 md:col-span-2">
                    <Label htmlFor="phone">Phone Number</Label>
                    <Input
                      id="phone"
                      name="phone"
                      value={form.phone}
                      onChange={handleChange}
                      required
                    />
                  </div>
                </div>
              </div>
              
              {/* Shipping Address */}
              <div className="bg-card p-6 border rounded">
                <h2 className="text-xl font-semibold mb-6">Delivery Address</h2>
                
                <div className="grid grid-cols-1 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="delivery.street">Street Address</Label>
                    <Input
                      id="delivery.street"
                      name="delivery.street"
                      value={form.deliveryAddress.street}
                      onChange={handleChange}
                      required
                    />
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="delivery.city">City</Label>
                      <Input
                        id="delivery.city"
                        name="delivery.city"
                        value={form.deliveryAddress.city}
                        onChange={handleChange}
                        required
                      />
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="delivery.state">State/Province</Label>
                      <Input
                        id="delivery.state"
                        name="delivery.state"
                        value={form.deliveryAddress.state}
                        onChange={handleChange}
                        required
                      />
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="delivery.postalCode">Postal Code</Label>
                      <Input
                        id="delivery.postalCode"
                        name="delivery.postalCode"
                        value={form.deliveryAddress.postalCode}
                        onChange={handleChange}
                        required
                      />
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="delivery.country">Country</Label>
                      <Input
                        id="delivery.country"
                        name="delivery.country"
                        value={form.deliveryAddress.country}
                        onChange={handleChange}
                        required
                      />
                    </div>
                  </div>
                </div>
              </div>
              
              {/* Billing Address */}
              <div className="bg-card p-6 border rounded">
                <h2 className="text-xl font-semibold mb-4">Billing Address</h2>
                
                <div className="flex items-center space-x-2 mb-6">
                  <input
                    type="checkbox"
                    id="sameAsShipping"
                    checked={form.sameAsShipping}
                    onChange={handleSameAddressChange}
                    className="rounded border-gray-300 text-primary focus:ring-primary"
                  />
                  <Label htmlFor="sameAsShipping">Same as delivery address</Label>
                </div>
                
                {!form.sameAsShipping && (
                  <div className="grid grid-cols-1 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="billing.street">Street Address</Label>
                      <Input
                        id="billing.street"
                        name="billing.street"
                        value={form.billingAddress.street}
                        onChange={handleChange}
                        required
                      />
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="billing.city">City</Label>
                        <Input
                          id="billing.city"
                          name="billing.city"
                          value={form.billingAddress.city}
                          onChange={handleChange}
                          required
                        />
                      </div>
                      
                      <div className="space-y-2">
                        <Label htmlFor="billing.state">State/Province</Label>
                        <Input
                          id="billing.state"
                          name="billing.state"
                          value={form.billingAddress.state}
                          onChange={handleChange}
                          required
                        />
                      </div>
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="billing.postalCode">Postal Code</Label>
                        <Input
                          id="billing.postalCode"
                          name="billing.postalCode"
                          value={form.billingAddress.postalCode}
                          onChange={handleChange}
                          required
                        />
                      </div>
                      
                      <div className="space-y-2">
                        <Label htmlFor="billing.country">Country</Label>
                        <Input
                          id="billing.country"
                          name="billing.country"
                          value={form.billingAddress.country}
                          onChange={handleChange}
                          required
                        />
                      </div>
                    </div>
                  </div>
                )}
              </div>
              
              {/* Payment Method */}
              <div className="bg-card p-6 border rounded">
                <h2 className="text-xl font-semibold mb-6">Payment Method</h2>
                
                <RadioGroup 
                  value={form.paymentMethod} 
                  onValueChange={handlePaymentMethodChange}
                  className="space-y-3"
                >
                  {paymentMethods.map(method => (
                    <div 
                      key={method.value}
                      className={`flex items-center space-x-2 border p-3 rounded-md ${form.paymentMethod === method.value ? 'border-primary bg-primary/5' : 'border-input'}`}
                    >
                      <RadioGroupItem value={method.value} id={`payment-${method.value}`} />
                      <Label htmlFor={`payment-${method.value}`} className="flex items-center flex-1 cursor-pointer">
                        <span className="flex items-center justify-center h-6 w-6 rounded-full bg-primary/10 mr-3">
                          {method.icon}
                        </span>
                        {method.label}
                      </Label>
                    </div>
                  ))}
                </RadioGroup>
              </div>
            </div>
            
            <div className="lg:hidden">
              <OrderSummary cartItems={cartItems} totalPrice={getTotalPrice()} />
              <Button type="submit" className="w-full mt-6" size="lg" disabled={loading}>
                {loading ? 'Processing...' : `Pay $${getTotalPrice().toFixed(2)}`}
              </Button>
            </div>
          </form>
        </div>
        
        <div className="hidden lg:block">
          <div className="sticky top-24">
            <OrderSummary cartItems={cartItems} totalPrice={getTotalPrice()} />
            <Button onClick={handleSubmit} className="w-full mt-6" size="lg" disabled={loading}>
              {loading ? 'Processing...' : `Pay $${getTotalPrice().toFixed(2)}`}
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

function OrderSummary({ cartItems, totalPrice }: { cartItems: any[], totalPrice: number }) {
  return (
    <div className="border rounded-lg p-6 bg-secondary/50">
      <h2 className="text-lg font-semibold mb-4">Order Summary</h2>
      
      <div className="space-y-3 mb-4">
        {cartItems.map((item) => (
          <div key={item.id} className="flex justify-between text-sm">
            <span>
              {item.name} <span className="text-muted-foreground">× {item.quantity}</span>
            </span>
            <span>${(item.price * item.quantity).toFixed(2)}</span>
          </div>
        ))}
      </div>
      
      <div className="border-t pt-4 space-y-2 text-sm">
        <div className="flex justify-between">
          <span className="text-muted-foreground">Subtotal</span>
          <span>${totalPrice.toFixed(2)}</span>
        </div>
        <div className="flex justify-between">
          <span className="text-muted-foreground">Shipping</span>
          <span>Free</span>
        </div>
      </div>
      
      <div className="border-t my-4 pt-4">
        <div className="flex justify-between items-center">
          <span className="font-medium">Total</span>
          <span className="text-xl font-bold">${totalPrice.toFixed(2)}</span>
        </div>
      </div>
    </div>
  );
}

export default Checkout;
