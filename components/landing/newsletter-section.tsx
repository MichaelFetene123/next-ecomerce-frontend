'use client';

import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { toast } from 'sonner';
import { Check, Mail } from 'lucide-react';

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
    <section className="w-full rounded-[24px] sm:rounded-[32px] bg-[#001c54] text-white p-8 sm:p-12 lg:p-14 border border-white/10 shadow-2xl relative overflow-hidden">
      {/* Decorative ambient background accents */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-72 h-72 bg-[#FDD79A]/10 rounded-full blur-3xl pointer-events-none" />

      <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
        {/* Left Column: Heading and info */}
        <div className="lg:col-span-7 space-y-2.5 max-w-xl">
          <span className="text-[11px] font-bold tracking-[0.25em] text-[#FDD79A] uppercase block">
            Join The Private Roster
          </span>
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-white tracking-tight leading-tight">
            Receive Private Runway Invitations
          </h2>
          <p className="text-xs sm:text-sm text-white/80 leading-relaxed font-normal">
            Subscribers receive early access to seasonal allocations, capsule previews, and private concierge appointments.
          </p>
        </div>

        {/* Right Column: Input and Join Button */}
        <div className="lg:col-span-5 w-full">
          <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row items-stretch gap-2.5">
            <div className="relative flex-1">
              <Mail className="w-4 h-4 text-white/40 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your corporate email address..."
                className="w-full h-12 pl-10 pr-4 rounded-xl bg-white text-slate-900 placeholder:text-slate-400 text-xs sm:text-sm font-medium focus:outline-hidden focus:ring-2 focus:ring-[#FDD79A] shadow-inner"
                required
              />
            </div>

            <Button
              type="submit"
              className="h-12 bg-[#FDD79A] hover:bg-[#FCD082] text-[#012169] hover:text-[#012169] font-extrabold text-xs tracking-wider uppercase px-7 rounded-xl shadow-lg hover:shadow-xl transition-all duration-200 cursor-pointer shrink-0"
            >
              {isSubmitted ? (
                <span className="flex items-center gap-1.5">
                  <Check className="w-4 h-4 stroke-[3]" />
                  Joined
                </span>
              ) : (
                'Join Roster'
              )}
            </Button>
          </form>

          <p className="text-[10px] text-white/50 mt-2.5 text-center sm:text-left">
            We respect discretion. Unsubscribe with one click anytime.
          </p>
        </div>
      </div>
    </section>
  );
};
