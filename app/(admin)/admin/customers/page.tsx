"use client";

import React, { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Users, Search, RefreshCw, Mail, Phone, Calendar, UserCheck } from 'lucide-react';

export default function AdminCustomersPage() {
  const [search, setSearch] = useState('');

  // Sample structured customer placeholder records
  const sampleCustomers = [
    {
      id: 1,
      name: 'Abebe Bikila',
      email: 'abebe.bikila@gmail.com',
      phone: '+251 91 123 4567',
      role: 'customer',
      ordersCount: 4,
      totalSpent: 12500,
      joinedAt: '2026-08-15',
    },
    {
      id: 2,
      name: 'John Doe',
      email: 'john.doe@gmail.com',
      phone: '+251 92 234 5678',
      role: 'customer',
      ordersCount: 2,
      totalSpent: 4800,
      joinedAt: '2026-09-01',
    },
    {
      id: 3,
      name: 'Jane Smith',
      email: 'jane.smith@gmail.com',
      phone: '+251 93 345 6789',
      role: 'customer',
      ordersCount: 1,
      totalSpent: 2450,
      joinedAt: '2026-09-20',
    },
    {
      id: 4,
      name: 'Store Administrator',
      email: 'admin@gmail.com',
      phone: '+251 91 100 0001',
      role: 'admin',
      ordersCount: 5,
      totalSpent: 28500,
      joinedAt: '2026-08-01',
    },
  ];

  const filteredCustomers = sampleCustomers.filter(
    (c) =>
      c.name.toLowerCase().includes(search.toLowerCase()) ||
      c.email.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-2 border-b border-border">
        <div>
          <div className="flex items-center gap-2">
            <Users className="w-5 h-5 text-primary" />
            <h1 className="text-2xl font-bold tracking-tight text-foreground">
              Customers Directory
            </h1>
          </div>
          <p className="text-sm text-muted-foreground mt-1">
            Registered customer accounts, purchasing history, and communication details.
          </p>
        </div>

        <div className="flex items-center gap-2 shrink-0">
          <Button variant="outline" size="sm" className="text-xs font-medium rounded-xl gap-1.5">
            <RefreshCw className="w-3.5 h-3.5" />
            <span>Refresh</span>
          </Button>
        </div>
      </div>

      {/* Search */}
      <div className="flex items-center justify-between gap-3">
        <div className="relative max-w-sm w-full">
          <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
          <Input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search customers by name or email..."
            className="pl-9 h-9 text-xs rounded-xl"
          />
        </div>
      </div>

      {/* Customers Table */}
      <Card className="border-border bg-card shadow-none rounded-xl overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-muted/50 border-b border-border text-muted-foreground font-semibold">
              <tr>
                <th className="p-4 pl-6">Customer</th>
                <th className="p-4">Contact</th>
                <th className="p-4">Account Type</th>
                <th className="p-4">Total Orders</th>
                <th className="p-4">Member Since</th>
                <th className="p-4 pr-6 text-right">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border/60">
              {filteredCustomers.map((customer) => (
                <tr key={customer.id} className="hover:bg-muted/30 transition-colors">
                  <td className="p-4 pl-6">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-full bg-primary/10 text-primary flex items-center justify-center font-bold text-xs uppercase">
                        {customer.name.slice(0, 2)}
                      </div>
                      <div>
                        <span className="font-semibold text-foreground block">
                          {customer.name}
                        </span>
                        <span className="text-[11px] text-muted-foreground flex items-center gap-1 mt-0.5">
                          <Mail className="w-3 h-3" /> {customer.email}
                        </span>
                      </div>
                    </div>
                  </td>

                  <td className="p-4 text-muted-foreground font-mono text-[11px]">
                    <div className="flex items-center gap-1">
                      <Phone className="w-3 h-3 text-muted-foreground" />
                      <span>{customer.phone}</span>
                    </div>
                  </td>

                  <td className="p-4">
                    <Badge
                      variant={customer.role === 'admin' ? 'default' : 'secondary'}
                      className="text-[10px] uppercase font-bold py-0 h-5"
                    >
                      {customer.role}
                    </Badge>
                  </td>

                  <td className="p-4 font-semibold text-foreground">
                    {customer.ordersCount} orders
                  </td>

                  <td className="p-4 text-muted-foreground">
                    <div className="flex items-center gap-1">
                      <Calendar className="w-3 h-3" />
                      <span>{customer.joinedAt}</span>
                    </div>
                  </td>

                  <td className="p-4 pr-6 text-right">
                    <Badge className="bg-emerald-500/15 text-emerald-600 dark:text-emerald-400 border-emerald-500/30 text-[10px] font-bold py-0 h-5">
                      <UserCheck className="w-3 h-3 mr-1" /> Active
                    </Badge>
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

