"use client";

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useRegister } from '@/hooks/use-auth';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent } from '@/components/ui/card';
import { toast } from 'sonner';
import { Loader2 } from 'lucide-react';

export default function RegisterPage() {
  const router = useRouter();
  const register = useRegister();
  
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [passwordConfirmation, setPasswordConfirmation] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !email || !password || !passwordConfirmation) return;

    if (password !== passwordConfirmation) {
      toast.error('Passwords do not match');
      return;
    }

    setIsLoading(true);
    try {
      await register.mutateAsync({ 
        name, 
        email, 
        password, 
        password_confirmation: passwordConfirmation 
      });
      toast.success('Account created successfully! Please log in.');
      router.push('/login');
    } catch (err: any) {
      toast.error(err?.response?.data?.message || 'Registration failed');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Card className="border-[#c4c5d8] shadow-sm">
      <CardContent className="pt-8 px-8 pb-8">
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-2">
            <Label htmlFor="name" className="text-[#012169] font-semibold">Full Name</Label>
            <Input 
              id="name" 
              required 
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="border-[#c4c5d8] focus-visible:ring-[#012169] h-12" 
              placeholder="John Doe"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="email" className="text-[#012169] font-semibold">Email address</Label>
            <Input 
              id="email" 
              type="email" 
              required 
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="border-[#c4c5d8] focus-visible:ring-[#012169] h-12" 
              placeholder="you@company.com"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="password" className="text-[#012169] font-semibold">Password</Label>
            <Input 
              id="password" 
              type="password" 
              required 
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="border-[#c4c5d8] focus-visible:ring-[#012169] h-12" 
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="password_confirmation" className="text-[#012169] font-semibold">Confirm Password</Label>
            <Input 
              id="password_confirmation" 
              type="password" 
              required 
              value={passwordConfirmation}
              onChange={(e) => setPasswordConfirmation(e.target.value)}
              className="border-[#c4c5d8] focus-visible:ring-[#012169] h-12" 
            />
          </div>

          <Button 
            type="submit" 
            className="w-full bg-[#012169] hover:bg-[#012169]/90 text-white font-bold h-12"
            disabled={isLoading}
          >
            {isLoading ? <Loader2 className="w-5 h-5 animate-spin" /> : 'Create Account'}
          </Button>
        </form>

        <div className="mt-6 text-center text-sm text-[#434655]">
          Already have an account?{' '}
          <Link href="/login" className="font-medium text-[#012169] hover:underline">
            Sign in
          </Link>
        </div>
      </CardContent>
    </Card>
  );
}
