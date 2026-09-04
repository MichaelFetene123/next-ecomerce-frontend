import React from 'react';
import { CheckCircle2, Loader2, CreditCard } from 'lucide-react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { cn } from '@/lib/utils';

import { PaymentGateway } from '@/types/order';

interface PaymentMethodSelectorProps {
  selectedGateway: PaymentGateway;
  onSelectGateway: (gw: PaymentGateway) => void;
  onSubmitPayment: () => void;
  isProcessing: boolean;
}

export const PaymentMethodSelector: React.FC<PaymentMethodSelectorProps> = ({
  selectedGateway,
  onSelectGateway,
  onSubmitPayment,
  isProcessing,
}) => {
  const paymentOptions = [
    { id: 'chapa', name: 'Chapa', desc: 'Secure local payment (Telebirr, CBE Birr, Cards)' }
  ];

  return (
    <Card className="p-6 sm:p-8 bg-card border-border shadow-none rounded-xl">
      {/* Header */}
      <div className="flex items-center gap-3 mb-6">
        <div className="w-7 h-7 rounded-full bg-muted border border-border text-foreground font-bold text-xs flex items-center justify-center">
          2
        </div>
        <h2 className="text-xl font-bold text-foreground">Payment Method</h2>
      </div>

      {/* Gateway Options */}
      <RadioGroup
        value={selectedGateway}
        onValueChange={(val) => onSelectGateway(val as PaymentGateway)}
        className="grid grid-cols-1 gap-4"
      >
        {paymentOptions.map((opt) => {
          const isSelected = selectedGateway === opt.id;
          return (
            <div key={opt.id} className="relative">
              <RadioGroupItem
                value={opt.id}
                id={`gateway-${opt.id}`}
                className="peer sr-only"
              />
              <label
                htmlFor={`gateway-${opt.id}`}
                className={cn(
                  'h-22 rounded-lg border flex flex-col items-center justify-center relative cursor-pointer transition-all w-full',
                  isSelected
                    ? 'border-[#FDD79A] bg-muted/40 shadow-sm ring-1 ring-[#FDD79A]'
                    : 'border-border bg-card hover:border-foreground/40'
                )}
              >
                {isSelected && (
                  <div className="absolute top-2.5 right-2.5">
                    <CheckCircle2 className="w-4.5 h-4.5 text-[#FDD79A] fill-[#FDD79A]/20" />
                  </div>
                )}
                <div className="flex flex-col items-center gap-0.5">
                  <span className={cn('text-[13px] font-bold tracking-tight', isSelected ? 'text-[#012169] dark:text-[#FDD79A]' : 'text-foreground')}>
                    {opt.name}
                  </span>
                  <span className="text-[10px] text-muted-foreground font-medium">
                    {opt.desc}
                  </span>
                </div>
              </label>
            </div>
          );
        })}
      </RadioGroup>

      {/* Action Button */}
      <div className="mt-8 flex justify-end">
        <Button
          onClick={onSubmitPayment}
          disabled={isProcessing}
          className="w-full bg-[#FDD79A] hover:bg-[#FDD79A]/90 text-[#012169] font-bold text-[13px] h-12 rounded-lg shadow-none"
        >
          {isProcessing ? (
            <>
              <Loader2 className="w-4 h-4 mr-2 animate-spin" />
              Initializing Gateway...
            </>
          ) : (
            'Proceed to Chapa Payment'
          )}
        </Button>
      </div>
    </Card>
  );
};
