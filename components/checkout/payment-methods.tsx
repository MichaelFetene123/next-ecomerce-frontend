import React from 'react';
import { CheckCircle2, Loader2, CreditCard } from 'lucide-react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { cn } from '@/lib/utils';

// We define PaymentGateway here if it's not exported from types/order yet
export type PaymentGateway = 'chapa';

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
  return (
    <Card className="p-6 sm:p-8 bg-white border-[#c4c5d8]">
      {/* Header */}
      <div className="flex items-center gap-3 mb-6">
        <div className="w-7 h-7 rounded-full bg-[#f3f2ff] border border-[#c4c5d8] text-[#012169] font-bold text-xs flex items-center justify-center">
          2
        </div>
        <h2 className="text-xl font-bold text-[#012169]">Payment Method</h2>
      </div>

      {/* Gateway Options */}
      <RadioGroup
        value={selectedGateway}
        onValueChange={(val) => onSelectGateway(val as PaymentGateway)}
        className="grid grid-cols-1 sm:grid-cols-2 gap-3"
      >
        <div className="relative">
          <RadioGroupItem
            value="chapa"
            id="gateway-chapa"
            className="peer sr-only"
          />
          <label
            htmlFor="gateway-chapa"
            className={cn(
              'h-24 rounded-lg border flex flex-col items-center justify-center relative cursor-pointer transition-all duration-200 w-full',
              selectedGateway === 'chapa'
                ? 'border-[#FDD79A] bg-[#fbf8ff] ring-1 ring-[#FDD79A]'
                : 'border-[#c4c5d8] bg-white hover:border-[#747687] peer-focus-visible:ring-2 peer-focus-visible:ring-[#012169] peer-focus-visible:ring-offset-2'
            )}
          >
            {selectedGateway === 'chapa' && (
              <div className="absolute top-2 right-2">
                <CheckCircle2 className="w-4 h-4 text-[#FDD79A] fill-[#FDD79A]/20" />
              </div>
            )}

            <div className="flex flex-col items-center gap-1">
              <span
                className={cn(
                  'text-sm font-bold tracking-tight',
                  selectedGateway === 'chapa' ? 'text-[#012169]' : 'text-[#434655]'
                )}
              >
                Chapa
              </span>
              <span className="text-[10px] text-[#747687]">
                Supports Telebirr, CBE Birr, Cards
              </span>
            </div>
          </label>
        </div>
      </RadioGroup>

      {/* Action Button */}
      <div className="mt-8 flex justify-end">
        <Button
          onClick={onSubmitPayment}
          disabled={isProcessing}
          className="w-full sm:w-auto px-8 py-6 bg-[#012169] hover:bg-[#012169]/90 text-white font-bold text-sm"
        >
          {isProcessing ? (
            <>
              <Loader2 className="w-4 h-4 mr-2 animate-spin" />
              Initializing Gateway...
            </>
          ) : (
            'Proceed to Payment'
          )}
        </Button>
      </div>
    </Card>
  );
};
