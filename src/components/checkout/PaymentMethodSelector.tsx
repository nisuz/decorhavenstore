
import React from 'react';
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { PaymentMethod } from '@/types';
import { CreditCard, DollarSign, Phone, Smartphone, Bank } from 'lucide-react';

interface PaymentMethodOption {
  value: PaymentMethod;
  label: string;
  icon: React.ReactNode;
}

interface PaymentMethodSelectorProps {
  value: PaymentMethod;
  onChange: (value: PaymentMethod) => void;
}

const PaymentMethodSelector = ({ value, onChange }: PaymentMethodSelectorProps) => {
  const paymentMethods: PaymentMethodOption[] = [
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
      icon: <Smartphone className="h-4 w-4" /> 
    },
    { 
      value: 'khalti', 
      label: 'Khalti', 
      icon: <Phone className="h-4 w-4" /> 
    },
    { 
      value: 'connectips', 
      label: 'Connect IPS', 
      icon: <Bank className="h-4 w-4" /> 
    },
    { 
      value: 'banking', 
      label: 'Banking App', 
      icon: <Smartphone className="h-4 w-4" /> 
    }
  ];

  return (
    <RadioGroup 
      value={value} 
      onValueChange={(val) => onChange(val as PaymentMethod)}
      className="space-y-3"
    >
      {paymentMethods.map(method => (
        <div 
          key={method.value}
          className={`flex items-center space-x-2 border p-3 rounded-md ${value === method.value ? 'border-primary bg-primary/5' : 'border-input'}`}
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
  );
};

export default PaymentMethodSelector;
