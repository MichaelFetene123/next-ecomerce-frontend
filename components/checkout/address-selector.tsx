import React from 'react';
import { Address } from '@/types/order';
import { CheckCircle2, Plus } from 'lucide-react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { cn } from '@/lib/utils';

interface AddressSelectorProps {
  addresses: Address[];
  selectedAddressId: number | null;
  onSelectAddress: (id: number) => void;
  onOpenAddModal: () => void;
}

export const AddressSelector: React.FC<AddressSelectorProps> = ({
  addresses,
  selectedAddressId,
  onSelectAddress,
  onOpenAddModal,
}) => {
  return (
    <Card className="p-6 sm:p-8 bg-card border-border shadow-none rounded-xl">
      {/* Header */}
      <div className="flex items-center gap-3 mb-6">
        <div className="w-7 h-7 rounded-full bg-[#FDD79A] text-[#012169] font-bold text-xs flex items-center justify-center">
          1
        </div>
        <h2 className="text-xl font-bold text-foreground">Shipping Address</h2>
      </div>

      {/* Addresses Grid */}
      <RadioGroup
        value={selectedAddressId?.toString() || ''}
        onValueChange={(val) => onSelectAddress(Number(val))}
        className="grid grid-cols-1 md:grid-cols-2 gap-4"
      >
        {addresses.map((address) => {
          const isSelected = address.id === selectedAddressId;

          return (
            <div key={address.id} className="relative">
              <RadioGroupItem
                value={address.id.toString()}
                id={`address-${address.id}`}
                className="peer sr-only"
              />
              <label
                htmlFor={`address-${address.id}`}
                className={cn(
                  'p-5 rounded-lg border transition-all duration-200 cursor-pointer relative flex flex-col justify-between min-h-35 w-full',
                  isSelected
                    ? 'border-[#FDD79A] bg-muted/40 shadow-sm ring-1 ring-[#FDD79A]'
                    : 'border-border bg-card hover:border-foreground/40'
                )}
              >
                <div className="flex justify-between items-start mb-2">
                  <span className="font-bold text-[13px] text-[#012169] dark:text-foreground">
                    {address.full_name}
                  </span>
                  {isSelected && (
                    <CheckCircle2 className="w-4.5 h-4.5 text-[#FDD79A] fill-[#FDD79A]/20" />
                  )}
                </div>

                <div className="text-[12px] text-muted-foreground space-y-0.5 leading-relaxed font-medium">
                  <p>{address.line1}</p>
                  {address.line2 && <p>{address.line2}</p>}
                  <p>
                    {address.city}
                    {address.region && `, ${address.region}`}
                    {', '}
                    {address.country}
                  </p>
                  {address.postal_code && <p>Postal Code: {address.postal_code}</p>}
                  {address.phone && (
                    <p className="pt-1 text-muted-foreground">
                      Phone: {address.phone}
                    </p>
                  )}
                </div>
              </label>
            </div>
          );
        })}
      </RadioGroup>

      {/* Add New Address Button */}
      <button
        onClick={onOpenAddModal}
        className="mt-6 w-full py-4 border border-dashed border-border hover:border-foreground/40 rounded-lg text-[13px] font-bold text-muted-foreground hover:text-foreground hover:bg-muted/40 bg-transparent transition-colors flex items-center justify-center cursor-pointer"
      >
        <Plus className="w-4 h-4 mr-2" /> Add New Address
      </button>
    </Card>
  );
};
