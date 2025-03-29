
import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useAuth } from '@/context/AuthContext';
import { Address } from '@/types';

const Register = () => {
  const emptyAddress: Address = {
    street: '',
    city: '',
    state: '',
    postalCode: '',
    country: ''
  };

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    password: '',
    confirmPassword: '',
    billingAddress: { ...emptyAddress },
    deliveryAddress: { ...emptyAddress },
    sameAddress: true
  });
  
  const [error, setError] = useState('');
  const [currentStep, setCurrentStep] = useState(1);
  
  const { register, isLoading } = useAuth();
  const navigate = useNavigate();
  
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    
    if (name.startsWith('billing.')) {
      const field = name.replace('billing.', '');
      setFormData(prev => ({
        ...prev,
        billingAddress: {
          ...prev.billingAddress,
          [field]: value
        }
      }));
    } else if (name.startsWith('delivery.')) {
      const field = name.replace('delivery.', '');
      setFormData(prev => ({
        ...prev,
        deliveryAddress: {
          ...prev.deliveryAddress,
          [field]: value
        }
      }));
    } else {
      setFormData(prev => ({ ...prev, [name]: value }));
    }
  };
  
  const handleSameAddressChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const checked = e.target.checked;
    setFormData(prev => ({
      ...prev,
      sameAddress: checked,
      billingAddress: checked ? prev.deliveryAddress : emptyAddress
    }));
  };
  
  const validateStep1 = () => {
    if (!formData.name || !formData.email || !formData.phone || !formData.password) {
      setError('All fields are required.');
      return false;
    }
    
    if (formData.password !== formData.confirmPassword) {
      setError('Passwords do not match.');
      return false;
    }
    
    if (formData.password.length < 6) {
      setError('Password must be at least 6 characters long.');
      return false;
    }
    
    return true;
  };
  
  const validateStep2 = () => {
    const { street, city, state, postalCode, country } = formData.deliveryAddress;
    if (!street || !city || !state || !postalCode || !country) {
      setError('All delivery address fields are required.');
      return false;
    }
    
    if (!formData.sameAddress) {
      const { street, city, state, postalCode, country } = formData.billingAddress;
      if (!street || !city || !state || !postalCode || !country) {
        setError('All billing address fields are required.');
        return false;
      }
    }
    
    return true;
  };
  
  const nextStep = () => {
    if (currentStep === 1 && validateStep1()) {
      setError('');
      setCurrentStep(2);
    }
  };
  
  const prevStep = () => {
    setCurrentStep(1);
    setError('');
  };
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateStep2()) {
      return;
    }
    
    setError('');
    
    const userData = {
      name: formData.name,
      email: formData.email,
      phone: formData.phone,
      billingAddress: formData.sameAddress ? formData.deliveryAddress : formData.billingAddress,
      deliveryAddress: formData.deliveryAddress
    };
    
    const success = await register(userData);
    if (success) {
      navigate('/');
    }
  };
  
  return (
    <div className="container max-w-xl py-16">
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold">Create an Account</h1>
        <p className="text-muted-foreground mt-2">Join DecorHaven to get started shopping</p>
      </div>
      
      <div className="bg-card border rounded-lg p-6 md:p-8">
        <div className="flex justify-center mb-8">
          <div className="flex items-center">
            <div className={`h-8 w-8 rounded-full flex items-center justify-center font-medium ${currentStep === 1 ? 'bg-primary text-white' : 'bg-muted text-foreground'}`}>
              1
            </div>
            <div className={`h-1 w-16 ${currentStep === 1 ? 'bg-muted' : 'bg-primary'}`}></div>
            <div className={`h-8 w-8 rounded-full flex items-center justify-center font-medium ${currentStep === 2 ? 'bg-primary text-white' : 'bg-muted text-foreground'}`}>
              2
            </div>
          </div>
        </div>
        
        <form onSubmit={handleSubmit}>
          {error && (
            <div className="bg-destructive/15 text-destructive px-4 py-3 rounded-md mb-6 text-sm">
              {error}
            </div>
          )}
          
          {currentStep === 1 ? (
            <div className="space-y-4">
              <h2 className="text-xl font-semibold mb-4">Personal Information</h2>
              
              <div className="space-y-2">
                <Label htmlFor="name">Full Name</Label>
                <Input
                  id="name"
                  name="name"
                  placeholder="John Doe"
                  value={formData.name}
                  onChange={handleChange}
                  required
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  placeholder="your.email@example.com"
                  value={formData.email}
                  onChange={handleChange}
                  required
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="phone">Phone Number</Label>
                <Input
                  id="phone"
                  name="phone"
                  type="tel"
                  placeholder="(123) 456-7890"
                  value={formData.phone}
                  onChange={handleChange}
                  required
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="password">Password</Label>
                <Input
                  id="password"
                  name="password"
                  type="password"
                  placeholder="••••••••"
                  value={formData.password}
                  onChange={handleChange}
                  required
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="confirmPassword">Confirm Password</Label>
                <Input
                  id="confirmPassword"
                  name="confirmPassword"
                  type="password"
                  placeholder="••••••••"
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  required
                />
              </div>
              
              <Button type="button" className="w-full mt-6" onClick={nextStep}>
                Continue to Address
              </Button>
            </div>
          ) : (
            <div className="space-y-6">
              <h2 className="text-xl font-semibold mb-4">Address Information</h2>
              
              <div>
                <h3 className="font-medium mb-3">Delivery Address</h3>
                <div className="grid grid-cols-1 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="delivery.street">Street Address</Label>
                    <Input
                      id="delivery.street"
                      name="delivery.street"
                      value={formData.deliveryAddress.street}
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
                        value={formData.deliveryAddress.city}
                        onChange={handleChange}
                        required
                      />
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="delivery.state">State/Province</Label>
                      <Input
                        id="delivery.state"
                        name="delivery.state"
                        value={formData.deliveryAddress.state}
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
                        value={formData.deliveryAddress.postalCode}
                        onChange={handleChange}
                        required
                      />
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="delivery.country">Country</Label>
                      <Input
                        id="delivery.country"
                        name="delivery.country"
                        value={formData.deliveryAddress.country}
                        onChange={handleChange}
                        required
                      />
                    </div>
                  </div>
                </div>
              </div>
              
              <div>
                <div className="flex items-center space-x-2 mb-4">
                  <input
                    type="checkbox"
                    id="sameAddress"
                    checked={formData.sameAddress}
                    onChange={handleSameAddressChange}
                    className="rounded border-gray-300 text-primary focus:ring-primary"
                  />
                  <Label htmlFor="sameAddress">Billing address is the same as delivery address</Label>
                </div>
                
                {!formData.sameAddress && (
                  <>
                    <h3 className="font-medium mb-3">Billing Address</h3>
                    <div className="grid grid-cols-1 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="billing.street">Street Address</Label>
                        <Input
                          id="billing.street"
                          name="billing.street"
                          value={formData.billingAddress.street}
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
                            value={formData.billingAddress.city}
                            onChange={handleChange}
                            required
                          />
                        </div>
                        
                        <div className="space-y-2">
                          <Label htmlFor="billing.state">State/Province</Label>
                          <Input
                            id="billing.state"
                            name="billing.state"
                            value={formData.billingAddress.state}
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
                            value={formData.billingAddress.postalCode}
                            onChange={handleChange}
                            required
                          />
                        </div>
                        
                        <div className="space-y-2">
                          <Label htmlFor="billing.country">Country</Label>
                          <Input
                            id="billing.country"
                            name="billing.country"
                            value={formData.billingAddress.country}
                            onChange={handleChange}
                            required
                          />
                        </div>
                      </div>
                    </div>
                  </>
                )}
              </div>
              
              <div className="flex flex-col sm:flex-row gap-4 mt-6">
                <Button type="button" variant="outline" className="flex-1" onClick={prevStep}>
                  Back
                </Button>
                <Button type="submit" className="flex-1" disabled={isLoading}>
                  {isLoading ? 'Creating Account...' : 'Create Account'}
                </Button>
              </div>
            </div>
          )}
        </form>
        
        <div className="mt-6 text-center">
          <p className="text-sm">
            Already have an account?{' '}
            <Link to="/login" className="text-primary hover:underline">
              Sign in
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Register;
