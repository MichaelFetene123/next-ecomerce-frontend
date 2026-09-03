"use client";

import React, { useState, Suspense } from 'react';
import Link from 'next/link';
import { useRouter, useSearchParams } from 'next/navigation';
import { useLogin, useUser } from '@/hooks/use-auth';
import { useQueryClient } from '@tanstack/react-query';
import { AUTH_QUERY_KEY } from '@/components/querykeys';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent } from '@/components/ui/card';
import { toast } from 'sonner';
import { Loader2 } from 'lucide-react';

function LoginForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const login = useLogin();
  const queryClient = useQueryClient();
  useUser();
  
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !password) return;

    setIsLoading(true);
    try {
      await login.mutateAsync({ email, password });
      await queryClient.invalidateQueries({ queryKey: AUTH_QUERY_KEY });
      toast.success('Successfully logged in');
      
      const redirectUrl = searchParams.get('redirect') || '/';
      router.push(redirectUrl);
    } catch (err: any) {
      toast.error(err?.response?.data?.message || 'Invalid credentials');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Card className="border-[#c4c5d8] shadow-sm">
      <CardContent className="pt-8 px-8 pb-8">
        <form onSubmit={handleSubmit} className="space-y-6">
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
            <div className="flex items-center justify-between">
              <Label htmlFor="password" className="text-[#012169] font-semibold">Password</Label>
              <Link href="#" className="text-sm font-medium text-[#012169] hover:underline">
                Forgot password?
              </Link>
            </div>
            <Input 
              id="password" 
              type="password" 
              required 
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="border-[#c4c5d8] focus-visible:ring-[#012169] h-12" 
            />
          </div>

          <Button 
            type="submit" 
            className="w-full bg-[#012169] hover:bg-[#012169]/90 text-white font-bold h-12"
            disabled={isLoading}
          >
            {isLoading ? <Loader2 className="w-5 h-5 animate-spin" /> : 'Sign in'}
          </Button>
        </form>

        <div className="mt-6 text-center text-sm text-[#434655]">
          Don't have an account?{' '}
          <Link href="/register" className="font-medium text-[#012169] hover:underline">
            Register here
          </Link>
        </div>
      </CardContent>
    </Card>
  );
}

export default function LoginPage() {
  return (
    <Suspense fallback={<div className="flex justify-center p-8"><Loader2 className="w-8 h-8 animate-spin text-[#012169]" /></div>}>
      <LoginForm />
    </Suspense>
  );
}
