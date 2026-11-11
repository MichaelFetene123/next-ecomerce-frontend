"use client";

import React, { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { formatCurrency } from '@/lib/utils';
import {
  CreditCard,
  ShieldCheck,
  CheckCircle2,
  Clock,
  Search,
  RefreshCw,
  ExternalLink,
  DollarSign,
  ArrowUpRight,
} from 'lucide-react';

export default function AdminPaymentsPage() {
  const [search, setSearch] = useState('');

  // Sample transaction log data structured according to Chapa integration
  const transactions = [
    {
      id: 'tx_1',
      tx_ref: 'TX-F87A1BC90D4E',
      order_number: 'ORD-893120',
      customer_email: 'abebe.bikila@gmail.com',
      gateway: 'chapa',
      amount: 5000.0,
      currency: 'ETB',
      status: 'success',
      channel: 'Telebirr',
      verified_at: '2026-11-03 14:10',
    },
    {
      id: 'tx_2',
      tx_ref: 'TX-C34E7812AB90',
      order_number: 'ORD-549102',
      customer_email: 'john.doe@gmail.com',
      gateway: 'chapa',
      amount: 1199.0,
      currency: 'ETB',
      status: 'success',
      channel: 'CBE Birr',
      verified_at: '2026-11-03 12:45',
    },
    {
      id: 'tx_3',
      tx_ref: 'TX-90A12BC87D43',
      order_number: 'ORD-109283',
      customer_email: 'jane.smith@gmail.com',
      gateway: 'chapa',
      amount: 3200.0,
      currency: 'ETB',
      status: 'initiated',
      channel: 'Card',
      verified_at: null,
    },
  ];

  const filtered = transactions.filter(
    (t) =>
      t.tx_ref.toLowerCase().includes(search.toLowerCase()) ||
      t.order_number.toLowerCase().includes(search.toLowerCase()) ||
      t.customer_email.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-2 border-b border-border">
        <div>
          <div className="flex items-center gap-2">
            <CreditCard className="w-5 h-5 text-primary" />
            <h1 className="text-2xl font-bold tracking-tight text-foreground">
              Payments & Gateway Transactions
            </h1>
          </div>
          <p className="text-sm text-muted-foreground mt-1">
            Monitor incoming Chapa payments, verification callbacks, and transaction snapshots.
          </p>
        </div>

        <div className="flex items-center gap-2 shrink-0">
          <Button variant="outline" size="sm" className="text-xs font-medium rounded-xl gap-1.5">
            <RefreshCw className="w-3.5 h-3.5" />
            <span>Refresh Logs</span>
          </Button>
        </div>
      </div>

      {/* Gateway Status Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card className="p-5 border-border bg-card shadow-none rounded-xl space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-xs font-medium text-muted-foreground">Primary Gateway</span>
            <Badge className="bg-emerald-500/15 text-emerald-600 dark:text-emerald-400 text-[10px] font-bold py-0">
              Active
            </Badge>
          </div>
          <div className="text-xl font-bold text-foreground flex items-center gap-2">
            <ShieldCheck className="w-5 h-5 text-secondary" />
            <span>Chapa Hosted Gateway</span>
          </div>
          <p className="text-xs text-muted-foreground">
            Server-to-server TLS 1.1 verification active. Webhook verification enabled.
          </p>
        </Card>

        <Card className="p-5 border-border bg-card shadow-none rounded-xl space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-xs font-medium text-muted-foreground">Settlement Currency</span>
            <Badge variant="outline" className="text-[10px] font-bold py-0">
              ETB
            </Badge>
          </div>
          <div className="text-xl font-bold text-foreground">
            Ethiopian Birr
          </div>
          <p className="text-xs text-muted-foreground">
            Default transactional settlement currency configured in backend.
          </p>
        </Card>

        <Card className="p-5 border-border bg-card shadow-none rounded-xl space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-xs font-medium text-muted-foreground">Verification Route</span>
            <Badge variant="secondary" className="text-[10px] font-bold py-0">
              Protected
            </Badge>
          </div>
          <div className="text-sm font-mono font-bold text-foreground">
            /api/checkout/verify
          </div>
          <p className="text-xs text-muted-foreground">
            Webhook endpoint at <code className="text-xs bg-muted px-1 rounded">/api/webhooks/chapa</code>.
          </p>
        </Card>
      </div>

      {/* Search Bar */}
      <div className="flex items-center justify-between gap-3">
        <div className="relative max-w-sm w-full">
          <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
          <Input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search by tx_ref, order # or email..."
            className="pl-9 h-9 text-xs rounded-xl"
          />
        </div>
      </div>

      {/* Transactions Table */}
      <Card className="border-border bg-card shadow-none rounded-xl overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-muted/50 border-b border-border text-muted-foreground font-semibold">
              <tr>
                <th className="p-4 pl-6">Transaction Ref</th>
                <th className="p-4">Order Number</th>
                <th className="p-4">Customer</th>
                <th className="p-4">Amount</th>
                <th className="p-4">Channel</th>
                <th className="p-4">Status</th>
                <th className="p-4 pr-6 text-right">Verified At</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border/60">
              {filtered.map((tx) => (
                <tr key={tx.id} className="hover:bg-muted/30 transition-colors">
                  <td className="p-4 pl-6 font-mono font-semibold text-foreground">
                    {tx.tx_ref}
                  </td>

                  <td className="p-4 font-mono text-muted-foreground">
                    {tx.order_number}
                  </td>

                  <td className="p-4 text-foreground font-medium">
                    {tx.customer_email}
                  </td>

                  <td className="p-4 font-bold text-foreground">
                    {formatCurrency(tx.amount, tx.currency)}
                  </td>

                  <td className="p-4 text-muted-foreground">
                    {tx.channel}
                  </td>

                  <td className="p-4">
                    {tx.status === 'success' ? (
                      <Badge className="bg-emerald-500/15 text-emerald-600 dark:text-emerald-400 border-emerald-500/30 text-[10px] font-bold py-0 h-5">
                        <CheckCircle2 className="w-3 h-3 mr-1" /> Success
                      </Badge>
                    ) : (
                      <Badge variant="outline" className="text-amber-600 dark:text-amber-400 text-[10px] font-bold py-0 h-5">
                        <Clock className="w-3 h-3 mr-1" /> Initiated
                      </Badge>
                    )}
                  </td>

                  <td className="p-4 pr-6 text-right text-muted-foreground">
                    {tx.verified_at || 'Pending'}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>
    </div>
  );
}

