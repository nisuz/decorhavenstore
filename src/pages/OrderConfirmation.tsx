
import React from 'react';
import { Button } from '@/components/ui/button';
import { Link, useNavigate } from 'react-router-dom';
import { CheckCircle } from 'lucide-react';

const OrderConfirmation = () => {
  const navigate = useNavigate();

  // Generate a random order number for demo
  const orderNumber = `ORD-${Math.floor(100000 + Math.random() * 900000)}`;
  
  React.useEffect(() => {
    // If someone directly navigates to this page without checking out, redirect them
    const timeout = setTimeout(() => {
      if (!orderNumber) {
        navigate('/');
      }
    }, 100);
    
    return () => clearTimeout(timeout);
  }, [navigate, orderNumber]);
  
  if (!orderNumber) {
    return null;
  }

  return (
    <div className="container max-w-3xl py-16">
      <div className="text-center">
        <div className="inline-flex items-center justify-center h-16 w-16 rounded-full bg-primary/10 mb-4">
          <CheckCircle className="h-8 w-8 text-primary" />
        </div>
        <h1 className="text-3xl font-bold mb-3">Thank You for Your Order!</h1>
        <p className="text-muted-foreground mb-8">
          Your order has been received and is being processed.
        </p>
      </div>
      
      <div className="bg-card border rounded-lg p-8 mb-8">
        <div className="space-y-6">
          <div className="border-b pb-6">
            <h2 className="text-lg font-medium mb-3">Order Details</h2>
            <div className="grid grid-cols-2 gap-y-3">
              <div className="text-sm text-muted-foreground">Order Number:</div>
              <div className="text-sm font-medium">{orderNumber}</div>
              
              <div className="text-sm text-muted-foreground">Date:</div>
              <div className="text-sm">{new Date().toLocaleDateString()}</div>
              
              <div className="text-sm text-muted-foreground">Payment Method:</div>
              <div className="text-sm">Cash on Delivery</div>
              
              <div className="text-sm text-muted-foreground">Status:</div>
              <div className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-amber-100 text-amber-800">
                Processing
              </div>
            </div>
          </div>
          
          <div>
            <h2 className="text-lg font-medium mb-3">What Happens Next?</h2>
            <ol className="space-y-4 ml-5 list-decimal">
              <li>
                <p>
                  <span className="font-medium">Order Processing:</span> Our team is preparing your items for shipment.
                </p>
              </li>
              <li>
                <p>
                  <span className="font-medium">Shipping:</span> You'll receive a confirmation email with tracking information once your order ships.
                </p>
              </li>
              <li>
                <p>
                  <span className="font-medium">Delivery:</span> Your items will be delivered to the address you provided during checkout.
                </p>
              </li>
            </ol>
          </div>
        </div>
      </div>
      
      <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
        <Button asChild variant="outline">
          <Link to="/">Continue Shopping</Link>
        </Button>
        <Button asChild>
          <Link to="/account/orders">View Orders</Link>
        </Button>
      </div>
    </div>
  );
};

export default OrderConfirmation;
