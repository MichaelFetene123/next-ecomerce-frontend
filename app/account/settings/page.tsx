"use client";

import React from 'react';
import { useUser, useLogout } from '@/hooks/use-auth';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Shield, KeyRound, LogOut, Bell, CheckCircle2 } from 'lucide-react';

export default function AccountSettingsPage() {
  const { data: user } = useUser();
  const logout = useLogout();

  if (!user) {
    return null;
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold tracking-tight text-foreground">Account Settings</h1>
        <p className="text-base text-muted-foreground mt-1">
          Review your account configuration, security credentials, and session management.
        </p>
      </div>

      <div className="space-y-6">
        {/* Security & Access Card */}
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Shield className="w-5 h-5 text-primary" />
                <CardTitle className="text-lg">Security & Authentication</CardTitle>
              </div>
              <Badge variant="secondary" className="text-base">
                Protected
              </Badge>
            </div>
            <CardDescription className="text-base">Details regarding your login credentials and session security</CardDescription>
          </CardHeader>

          <CardContent className="space-y-4">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between p-4 rounded-lg bg-muted/40 border border-border/40 gap-4">
              <div>
                <p className="text-lg font-semibold text-foreground">Password Authentication</p>
                <p className="text-base text-muted-foreground mt-0.5">
                  Your password is encrypted with standard bcrypt hashing on the backend.
                </p>
              </div>
              <div className="flex items-center gap-1.5 text-base text-green-600 dark:text-green-400 font-medium shrink-0">
                <CheckCircle2 className="w-4 h-4" />
                <span>Active</span>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row sm:items-center justify-between p-4 rounded-lg bg-muted/40 border border-border/40 gap-4">
              <div>
                <p className="text-lg font-semibold text-foreground">Sanctum Session Security</p>
                <p className="text-base text-muted-foreground mt-0.5">
                  Authenticated via secure HTTP-only cookies and CSRF protection token.
                </p>
              </div>
              <div className="flex items-center gap-1.5 text-base text-green-600 dark:text-green-400 font-medium shrink-0">
                <CheckCircle2 className="w-4 h-4" />
                <span>Encrypted</span>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Preferences & Notifications */}
        <Card>
          <CardHeader>
            <div className="flex items-center gap-2">
              <Bell className="w-5 h-5 text-primary" />
              <CardTitle className="text-lg">Notifications & Preferences</CardTitle>
            </div>
            <CardDescription className="text-base">Default communication and order update preferences</CardDescription>
          </CardHeader>

          <CardContent className="space-y-3">
            <div className="flex items-center justify-between p-3.5 rounded-lg border border-border/40">
              <div>
                <p className="text-lg font-medium text-foreground">Order Updates</p>
                <p className="text-base text-muted-foreground">Receive tracking and payment status notifications via email.</p>
              </div>
              <Badge variant="outline" className="text-base">Enabled</Badge>
            </div>

            <div className="flex items-center justify-between p-3.5 rounded-lg border border-border/40">
              <div>
                <p className="text-lg font-medium text-foreground">Promotional Offers</p>
                <p className="text-base text-muted-foreground">New arrival announcements and seasonal discounts.</p>
              </div>
              <Badge variant="outline" className="text-base">Optional</Badge>
            </div>
          </CardContent>
        </Card>

        {/* Session Management & Sign Out */}
        <Card className="border-destructive/30">
          <CardHeader>
            <CardTitle className="text-lg text-destructive flex items-center gap-2">
              <LogOut className="w-5 h-5" />
              Session Actions
            </CardTitle>
            <CardDescription className="text-base">Terminate current session and sign out of your account</CardDescription>
          </CardHeader>

          <CardContent className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <p className="text-lg font-medium text-foreground">Sign Out of Account</p>
              <p className="text-base text-muted-foreground">
                Ends your active Sanctum session and redirects you to the login screen.
              </p>
            </div>

            <Button
              variant="destructive"
              size="sm"
              className="text-base font-medium cursor-pointer"
              onClick={() => logout.mutate()}
              disabled={logout.isPending}
            >
              {logout.isPending ? 'Signing out...' : 'Sign Out Now'}
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
