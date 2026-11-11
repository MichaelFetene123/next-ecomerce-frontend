"use client";

import React, { useState } from 'react';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { Settings, ShieldCheck, DollarSign, Store, Bell, CheckCircle2 } from 'lucide-react';
import { toast } from 'sonner';

export default function AdminSettingsPage() {
  const [activeTab, setActiveTab] = useState<'general' | 'payment' | 'shipping'>('general');
  const [isSaving, setIsSaving] = useState(false);

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSaving(true);
    setTimeout(() => {
      setIsSaving(false);
      toast.success('Settings saved successfully');
    }, 600);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-2 border-b border-border">
        <div>
          <div className="flex items-center gap-2">
            <Settings className="w-5 h-5 text-primary" />
            <h1 className="text-2xl font-bold tracking-tight text-foreground">
              Store Settings
            </h1>
          </div>
          <p className="text-sm text-muted-foreground mt-1">
            Configure system preferences, operational parameters, and payment gateways.
          </p>
        </div>
      </div>

      {/* Navigation Tabs */}
      <div className="flex items-center gap-2 border-b border-border pb-3">
        {(['general', 'payment', 'shipping'] as const).map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`px-4 py-2 text-xs font-semibold rounded-lg capitalize transition-colors ${
              activeTab === tab
                ? 'bg-primary text-primary-foreground shadow-xs'
                : 'text-muted-foreground hover:text-foreground hover:bg-muted/60'
            }`}
          >
            {tab === 'general' ? 'Store Information' : tab === 'payment' ? 'Payment Gateways' : 'Delivery & Shipping'}
          </button>
        ))}
      </div>

      {/* Tab 1: General Settings */}
      {activeTab === 'general' && (
        <form onSubmit={handleSave} className="space-y-6">
          <Card className="border-border bg-card shadow-none rounded-xl">
            <CardHeader className="p-6 pb-4">
              <CardTitle className="text-base font-bold text-foreground">Store Profile</CardTitle>
              <CardDescription className="text-xs">
                Visible to customers during catalog browsing and checkout receipt delivery.
              </CardDescription>
            </CardHeader>
            <CardContent className="p-6 pt-0 space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <Label htmlFor="store_name">Storefront Brand Name</Label>
                  <Input id="store_name" defaultValue="Storefront Ecommerce" className="h-9 text-xs rounded-xl" />
                </div>
                <div className="space-y-1.5">
                  <Label htmlFor="support_email">Customer Support Email</Label>
                  <Input id="support_email" defaultValue="support@nextlaravelecommerce.com" className="h-9 text-xs rounded-xl" />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <Label htmlFor="currency">Base Currency</Label>
                  <Input id="currency" defaultValue="ETB (Ethiopian Birr)" disabled className="h-9 text-xs rounded-xl bg-muted/40" />
                </div>
                <div className="space-y-1.5">
                  <Label htmlFor="timezone">Default Timezone</Label>
                  <Input id="timezone" defaultValue="Africa/Addis_Ababa (UTC+3)" disabled className="h-9 text-xs rounded-xl bg-muted/40" />
                </div>
              </div>
            </CardContent>
          </Card>

          <div className="flex justify-end">
            <Button type="submit" disabled={isSaving} className="rounded-xl text-xs font-semibold">
              {isSaving ? 'Saving...' : 'Save Changes'}
            </Button>
          </div>
        </form>
      )}

      {/* Tab 2: Payment Gateways */}
      {activeTab === 'payment' && (
        <div className="space-y-6">
          <Card className="border-border bg-card shadow-none rounded-xl">
            <CardHeader className="p-6 pb-4 flex flex-row items-center justify-between">
              <div>
                <CardTitle className="text-base font-bold text-foreground">Chapa Gateway Configuration</CardTitle>
                <CardDescription className="text-xs">
                  Server-to-server payment checkout, webhook verification, and automated callback dispatcher.
                </CardDescription>
              </div>
              <Badge className="bg-emerald-500/15 text-emerald-600 dark:text-emerald-400 border-emerald-500/30 text-[10px] font-bold py-0 h-5">
                <CheckCircle2 className="w-3 h-3 mr-1" /> Active
              </Badge>
            </CardHeader>
            <CardContent className="p-6 pt-0 space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <Label>Base API Endpoint</Label>
                  <Input defaultValue="https://api.chapa.co/v1" disabled className="h-9 text-xs font-mono rounded-xl bg-muted/40" />
                </div>
                <div className="space-y-1.5">
                  <Label>Webhook Callback URI</Label>
                  <Input defaultValue="/api/webhooks/chapa" disabled className="h-9 text-xs font-mono rounded-xl bg-muted/40" />
                </div>
              </div>

              <div className="p-4 rounded-xl bg-muted/30 border border-border text-xs text-muted-foreground space-y-1">
                <div className="flex items-center gap-1.5 font-semibold text-foreground">
                  <ShieldCheck className="w-4 h-4 text-emerald-600" />
                  <span>Signature Security Enforced</span>
                </div>
                <p>
                  Incoming webhook payloads are authenticated using HMAC SHA-256 against <code className="bg-muted px-1 rounded">x-chapa-signature</code>.
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
      )}

      {/* Tab 3: Delivery & Shipping */}
      {activeTab === 'shipping' && (
        <div className="space-y-6">
          <Card className="border-border bg-card shadow-none rounded-xl">
            <CardHeader className="p-6 pb-4">
              <CardTitle className="text-base font-bold text-foreground">Shipping Rates</CardTitle>
              <CardDescription className="text-xs">
                Thresholds for complimentary shipping and standard delivery fees.
              </CardDescription>
            </CardHeader>
            <CardContent className="p-6 pt-0 space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <Label>Free Shipping Minimum Threshold</Label>
                  <Input defaultValue="2,000 ETB" disabled className="h-9 text-xs rounded-xl bg-muted/40" />
                </div>
                <div className="space-y-1.5">
                  <Label>Standard Shipping Fee</Label>
                  <Input defaultValue="150 ETB" disabled className="h-9 text-xs rounded-xl bg-muted/40" />
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  );
}

