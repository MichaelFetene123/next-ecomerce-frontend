'use client';

import React, { useState } from 'react';
import { Check, Mail } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { toast } from 'sonner';

export const NewsletterSection: React.FC = () => {
  const [email, setEmail] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const cleanEmail = email.trim();
    if (!cleanEmail || !cleanEmail.includes('@')) {
      toast.error('Please enter a valid corporate email address');
      return;
    }

    setIsSubmitted(true);
    toast.success('You have been added to the Private Runway Roster');
    setEmail('');
  };

  return (
    <section className="relative w-full overflow-hidden rounded-xl border border-white/10 bg-[#001c54] p-8 text-white shadow-2xl sm:rounded-2xl sm:p-12 lg:p-14">
      <div className="pointer-events-none absolute top-0 right-0 h-96 w-96 rounded-full bg-blue-500/10 blur-3xl" />
      <div className="pointer-events-none absolute bottom-0 left-0 h-72 w-72 rounded-full bg-[#FDD79A]/10 blur-3xl" />

      <div className="relative z-10 grid grid-cols-1 items-center gap-8 lg:grid-cols-12 lg:gap-12">
        <div className="max-w-xl space-y-2.5 lg:col-span-7">
          <span className="block text-[11px] font-bold tracking-[0.25em] text-[#FDD79A] uppercase">
            Join The Private Roster
          </span>
          <h2 className="text-2xl leading-tight font-extrabold tracking-tight text-white sm:text-3xl lg:text-4xl">
            Receive Private Runway Invitations
          </h2>
          <p className="text-xs leading-relaxed font-normal text-white/80 sm:text-sm">
            Subscribers receive early access to seasonal allocations, capsule previews, and private
            concierge appointments.
          </p>
        </div>

        <div className="w-full lg:col-span-5">
          <form onSubmit={handleSubmit} className="flex flex-col items-stretch gap-2.5 sm:flex-row">
            <div className="relative flex-1">
              <Label htmlFor="roster-email" className="sr-only">
                Corporate email address
              </Label>
              <Mail className="pointer-events-none absolute top-1/2 left-3.5 size-4 -translate-y-1/2 text-slate-400" />
              <Input
                id="roster-email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your corporate email address..."
                required
                className="h-12 rounded-xl border-transparent bg-white pl-10 text-xs font-medium text-slate-900 shadow-inner md:text-sm dark:bg-white"
              />
            </div>

            <Button
              type="submit"
              className="h-12 shrink-0 cursor-pointer rounded-xl bg-[#FDD79A] px-7 text-xs font-extrabold tracking-wider text-[#012169] uppercase shadow-lg hover:bg-[#FCD082] hover:text-[#012169] hover:shadow-xl"
            >
              {isSubmitted ? (
                <span className="flex items-center gap-1.5">
                  <Check className="size-4 stroke-3" />
                  Joined
                </span>
              ) : (
                'Join Roster'
              )}
            </Button>
          </form>

          <p className="mt-2.5 text-center text-[10px] text-white/50 sm:text-left">
            We respect discretion. Unsubscribe with one click anytime.
          </p>
        </div>
      </div>
    </section>
  );
};
