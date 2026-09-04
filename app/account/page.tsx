"use client";

import React from 'react';
import { useUser } from '@/hooks/use-auth';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { formatDate } from '@/lib/utils';
import { User, Mail, Phone, Calendar, ShieldCheck } from 'lucide-react';

export default function AccountProfilePage() {
  const { data: user } = useUser();

  if (!user) {
    return null;
  }

  return (
    <div className="space-y-4 sm:space-y-6">
      <div className="space-y-1">
        <h1 className="text-xl sm:text-2xl font-bold tracking-tight text-foreground">
          Welcome back, {user.name.split(' ')[0]}
        </h1>
        <p className="text-sm sm:text-base text-muted-foreground">
          Manage your account profile, appearance preferences, and security details.
        </p>
      </div>

      {/* Profile Information Card */}
      <Card className="w-full">
        <CardHeader className="p-4 sm:p-6 pb-3 sm:pb-4">
          <div className="flex items-start justify-between gap-3">
            <div className="min-w-0 flex-1">
              <CardTitle className="text-lg sm:text-xl">Profile Information</CardTitle>
              <CardDescription className="text-sm sm:text-base mt-0.5">
                Your registered account credentials and contact details
              </CardDescription>
            </div>
            <Badge variant="secondary" className="capitalize shrink-0 text-sm sm:text-base">
              {user.role}
            </Badge>
          </div>
        </CardHeader>

        <CardContent className="p-4 sm:p-6 pt-0 sm:pt-0 space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
            <div className="flex items-start gap-3 p-3 sm:p-3.5 rounded-lg bg-muted/40 border border-border/40 min-w-0">
              <User className="w-5 h-5 text-muted-foreground mt-0.5 shrink-0" />
              <div className="min-w-0 flex-1">
                <p className="text-base font-medium text-muted-foreground">Full Name</p>
                <p className="text-base sm:text-lg font-semibold truncate">{user.name}</p>
              </div>
            </div>

            <div className="flex items-start gap-3 p-3 sm:p-3.5 rounded-lg bg-muted/40 border border-border/40 min-w-0">
              <Mail className="w-5 h-5 text-muted-foreground mt-0.5 shrink-0" />
              <div className="min-w-0 flex-1">
                <p className="text-base font-medium text-muted-foreground">Email Address</p>
                <p className="text-base sm:text-lg font-semibold truncate">{user.email}</p>
              </div>
            </div>

            <div className="flex items-start gap-3 p-3 sm:p-3.5 rounded-lg bg-muted/40 border border-border/40 min-w-0">
              <Phone className="w-5 h-5 text-muted-foreground mt-0.5 shrink-0" />
              <div className="min-w-0 flex-1">
                <p className="text-base font-medium text-muted-foreground">Phone Number</p>
                <p className="text-base sm:text-lg font-semibold truncate">{user.phone || 'Not provided'}</p>
              </div>
            </div>

            <div className="flex items-start gap-3 p-3 sm:p-3.5 rounded-lg bg-muted/40 border border-border/40 min-w-0">
              <Calendar className="w-5 h-5 text-muted-foreground mt-0.5 shrink-0" />
              <div className="min-w-0 flex-1">
                <p className="text-base font-medium text-muted-foreground">Member Since</p>
                <p className="text-base sm:text-lg font-semibold truncate">
                  {user.created_at ? formatDate(user.created_at) : 'N/A'}
                </p>
              </div>
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-2 pt-2 text-sm sm:text-base text-muted-foreground">
            <ShieldCheck className="w-4 h-4 text-green-600 dark:text-green-400 shrink-0" />
            <span>
              Account status: <span className="font-semibold text-foreground">Active & Secure</span>
            </span>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
