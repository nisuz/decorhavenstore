
import React from 'react';
import { Link } from 'react-router-dom';
import { useCart } from '@/context/CartContext';
import { Button } from '@/components/ui/button';
import { Minus, Plus, Trash2, ChevronLeft, ShoppingCart } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

const Cart = () => {
  const { cartItems, updateQuantity, removeFromCart, getTotalPrice } = useCart();
  const { toast } = useToast();
  
  const handleRemove = (id: string, name: string) => {
    removeFromCart(id);
    toast({
      description: `${name} removed from cart.`,
    });
  };
  
  const handleQuantityChange = (id: string, newQuantity: number) => {
    if (newQuantity < 1) return;
    updateQuantity(id, newQuantity);
  };
  
  return (
    <div className="container py-12">
      <h1 className="text-3xl font-bold mb-8">Your Shopping Cart</h1>
      
      {cartItems.length === 0 ? (
        <div className="text-center py-16">
          <div className="flex justify-center mb-4">
            <ShoppingCart className="h-16 w-16 text-muted-foreground" />
          </div>
          <h2 className="text-xl font-medium mb-2">Your cart is empty</h2>
          <p className="text-muted-foreground mb-8">Looks like you haven't added any items to your cart yet.</p>
          <Button asChild size="lg">
            <Link to="/shop">Start Shopping</Link>
          </Button>
        </div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            <div className="border rounded-lg">
              <div className="hidden md:grid grid-cols-6 gap-4 p-4 border-b font-medium text-muted-foreground">
                <div className="col-span-3">Product</div>
                <div className="text-center">Price</div>
                <div className="text-center">Quantity</div>
                <div className="text-right">Total</div>
              </div>
              
              {cartItems.map(item => (
                <div key={item.id} className="border-b last:border-b-0 p-4">
                  <div className="md:grid md:grid-cols-6 md:gap-4 md:items-center">
                    <div className="md:col-span-3 flex items-center">
                      <div className="w-16 h-16 border rounded overflow-hidden mr-4">
                        <img 
                          src={item.image} 
                          alt={item.name} 
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <div>
                        <h3 className="font-medium">
                          <Link to={`/product/${item.id}`} className="hover:text-primary">
                            {item.name}
                          </Link>
                        </h3>
                        <button 
                          className="text-sm text-muted-foreground hover:text-destructive flex items-center mt-1"
                          onClick={() => handleRemove(item.id, item.name)}
                          type="button"
                        >
                          <Trash2 className="h-3 w-3 mr-1" /> Remove
                        </button>
                      </div>
                    </div>
                    
                    <div className="text-center mt-4 md:mt-0">
                      <div className="md:hidden text-sm text-muted-foreground">Price:</div>
                      ${item.price.toFixed(2)}
                    </div>
                    
                    <div className="flex items-center justify-center mt-4 md:mt-0">
                      <div className="md:hidden text-sm text-muted-foreground mr-2">Quantity:</div>
                      <div className="flex items-center border rounded-md">
                        <Button 
                          variant="ghost" 
                          size="icon" 
                          className="h-8 w-8"
                          onClick={() => handleQuantityChange(item.id, item.quantity - 1)}
                          type="button"
                        >
                          <Minus className="h-3 w-3" />
                        </Button>
                        <span className="w-8 text-center text-sm">{item.quantity}</span>
                        <Button 
                          variant="ghost" 
                          size="icon" 
                          className="h-8 w-8"
                          onClick={() => handleQuantityChange(item.id, item.quantity + 1)}
                          type="button"
                        >
                          <Plus className="h-3 w-3" />
                        </Button>
                      </div>
                    </div>
                    
                    <div className="text-right mt-4 md:mt-0 font-medium">
                      <div className="md:hidden text-sm text-muted-foreground">Total:</div>
                      ${(item.price * item.quantity).toFixed(2)}
                    </div>
                  </div>
                </div>
              ))}
            </div>
            
            <div className="mt-8">
              <Link to="/shop" className="inline-flex items-center text-sm text-muted-foreground hover:text-foreground">
                <ChevronLeft className="h-4 w-4 mr-1" /> Continue Shopping
              </Link>
            </div>
          </div>
          
          <div className="lg:col-span-1">
            <div className="border rounded-lg p-6 bg-secondary/50">
              <h2 className="text-lg font-semibold mb-4">Order Summary</h2>
              
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Subtotal</span>
                  <span>${getTotalPrice().toFixed(2)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Shipping</span>
                  <span>Calculated at checkout</span>
                </div>
              </div>
              
              <div className="border-t my-4 pt-4">
                <div className="flex justify-between items-center mb-6">
                  <span className="font-medium">Total</span>
                  <span className="text-xl font-bold">${getTotalPrice().toFixed(2)}</span>
                </div>
                
                <Button asChild size="lg" className="w-full">
                  <Link to="/checkout">Proceed to Checkout</Link>
                </Button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Cart;
