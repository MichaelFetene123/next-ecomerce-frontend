"use client";

import React from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useOrders } from '@/hooks/use-orders'; 
import { formatCurrency } from '@/lib/utils';
import { Loader2, Download, ArrowLeft, MapPin, CreditCard } from 'lucide-react';

export default function OrderDetailsPage({ params }: { params: Promise<{ id: string }> }) {
  const router = useRouter();
  const { id } = React.use(params);
  const orderId = Number(id);
  
  const { data: response, isLoading } = useOrders();
  const order = response?.data?.find(o => o.id === orderId);

  if (isLoading) {
    return (
      <div className="flex items-center justify-center py-20 w-full">
        <Loader2 className="w-8 h-8 animate-spin text-[#012169]" />
      </div>
    );
  }

  if (!order) {
    return (
      <div className="py-20 text-center w-full">
        <h2 className="text-xl font-bold text-red-600 mb-2">Order not found</h2>
        <p className="text-[#434655] mb-6">The order you are looking for does not exist.</p>
        <button onClick={() => router.push('/orders')} className="bg-[#012169] text-white px-4 py-2 rounded">
          Back to Orders
        </button>
      </div>
    );
  }

  return (
    <div className="w-full">
      {/* Top Header */}
      <div className="flex items-center justify-between mb-8 pb-4 border-b border-[#c4c5d8]">
        <Link href="/orders" className="flex items-center text-[13px] font-bold text-[#434655] hover:text-[#012169] transition-colors">
          <ArrowLeft className="w-4 h-4 mr-2" />
          Order Details
        </Link>
        <button 
          onClick={() => window.print()}
          className="flex items-center text-[13px] font-bold text-[#012169] border border-[#c4c5d8] px-4 py-2 rounded hover:bg-[#fbf8ff] transition-colors cursor-pointer"
        >
          Download Invoice
          <Download className="w-4 h-4 ml-2" />
        </button>
      </div>

      {/* Order Title Area */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
        <div>
          <div className="flex items-center gap-3 mb-1">
            <h1 className="text-2xl md:text-3xl font-bold text-[#012169] tracking-tight">Order #ORD-{order.id}</h1>
            <span className="bg-[#00875A]/10 text-[#00875A] text-[10px] font-bold px-2.5 py-1 rounded-full uppercase tracking-wider">
              {order.status === 'completed' ? 'PAID' : order.status}
            </span>
          </div>
          <div className="text-sm text-[#747687] flex gap-4">
            <span>{new Date(order.created_at).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}</span>
            <span>tx_ref: {order.transaction_id || 'N/A'}</span>
          </div>
        </div>
        <Link 
          href="/"
          className="bg-[#FDD79A] text-[#012169] font-bold text-[13px] px-6 py-3 rounded-lg hover:bg-[#FDD79A]/90 transition-colors text-center w-full md:w-auto"
        >
          Back to Catalog
        </Link>
      </div>

      {/* Two Column Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left Column: Items */}
        <div className="lg:col-span-8">
          <div className="bg-white border border-[#c4c5d8] rounded-xl overflow-hidden shadow-none">
            <div className="p-5 border-b border-[#c4c5d8] bg-[#fbf8ff]">
              <h2 className="font-bold text-[15px] text-[#012169]">Items Breakdown</h2>
            </div>
            
            <div className="divide-y divide-[#c4c5d8]">
              {order.items?.map((item) => (
                <div key={item.id} className="p-5 flex items-center gap-4">
                  <div className="w-16 h-16 bg-[#f3f2ff] rounded-lg border border-[#c4c5d8]/50 overflow-hidden shrink-0">
                    <div className="w-full h-full flex items-center justify-center text-[#c4c5d8] text-[10px] font-medium">Image</div>
                  </div>
                  <div className="flex-1 min-w-0">
                    <h3 className="font-bold text-[14px] text-[#012169] line-clamp-1">{item.product_title_snapshot}</h3>
                    <p className="text-[12px] text-[#747687]">Qty: {item.quantity}</p>
                  </div>
                  <div className="font-bold text-[14px] text-[#1a1b24] shrink-0 text-right">
                    {formatCurrency(item.unit_price_snapshot * item.quantity)}
                  </div>
                </div>
              ))}
            </div>

            <div className="p-6 bg-white border-t border-[#c4c5d8] flex flex-col items-end gap-3">
              <div className="flex justify-between w-full max-w-[240px] text-[13px] text-[#434655]">
                <span>Subtotal</span>
                <span className="font-medium text-[#1a1b24]">{formatCurrency(order.total)}</span>
              </div>
              <div className="flex justify-between w-full max-w-[240px] text-[13px] text-[#434655]">
                <span>Shipping</span>
                <span className="font-medium text-[#1a1b24]">Free</span>
              </div>
              <div className="flex justify-between w-full max-w-[240px] text-[13px] text-[#434655]">
                <span>Tax</span>
                <span className="font-medium text-[#1a1b24]">{formatCurrency(0)}</span>
              </div>
              <div className="w-full max-w-[240px] border-t border-dashed border-[#c4c5d8] my-1" />
              <div className="flex justify-between w-full max-w-[240px]">
                <span className="font-bold text-[15px] text-[#012169]">Total</span>
                <span className="font-bold text-[17px] text-[#1a1b24]">{formatCurrency(order.total)}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Right Column: Info Cards */}
        <div className="lg:col-span-4 flex flex-col gap-6">
          <div className="bg-white border border-[#c4c5d8] rounded-xl p-5 shadow-none">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-8 h-8 rounded bg-[#f3f2ff] flex items-center justify-center text-[#012169]">
                <MapPin className="w-4 h-4" />
              </div>
              <h3 className="font-bold text-[15px] text-[#012169]">Delivery Address</h3>
            </div>
            <div className="text-[13px] text-[#434655] leading-relaxed">
              <p className="font-semibold text-[#1a1b24] mb-1">Corporate Office</p>
              <p>Address ID: {order.billing_address_id}</p>
              <p>Addis Ababa, Ethiopia</p>
            </div>
          </div>

          <div className="bg-white border border-[#c4c5d8] rounded-xl p-5 shadow-none">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-8 h-8 rounded bg-[#f3f2ff] flex items-center justify-center text-[#012169]">
                <CreditCard className="w-4 h-4" />
              </div>
              <h3 className="font-bold text-[15px] text-[#012169]">Payment Method</h3>
            </div>
            <div className="text-[13px] text-[#434655] leading-relaxed">
              <p className="font-semibold text-[#1a1b24] mb-1 capitalize">{order.payment_gateway || 'Chapa'}</p>
              <p>Secure local payment via Chapa integration.</p>
            </div>
          </div>

          <div className="bg-white border border-[#c4c5d8] rounded-xl p-5 shadow-none">
            <h3 className="font-bold text-[15px] text-[#012169] mb-4">Tracking Timeline</h3>
            <div className="relative border-l border-[#c4c5d8] ml-2 pl-4 space-y-6">
              <div className="relative">
                <div className="absolute -left-[21px] top-1 w-2.5 h-2.5 rounded-full bg-[#00875A]" />
                <p className="text-[13px] font-bold text-[#1a1b24]">Order Placed</p>
                <p className="text-[11px] text-[#747687]">{new Date(order.created_at).toLocaleDateString()}</p>
              </div>
              <div className="relative">
                <div className="absolute -left-[21px] top-1 w-2.5 h-2.5 rounded-full bg-[#FDD79A]" />
                <p className="text-[13px] font-bold text-[#1a1b24]">Processing</p>
                <p className="text-[11px] text-[#747687]">We are preparing your items.</p>
              </div>
              <div className="relative">
                <div className="absolute -left-[21px] top-1 w-2.5 h-2.5 rounded-full bg-[#c4c5d8]" />
                <p className="text-[13px] font-medium text-[#434655]">Shipped</p>
              </div>
              <div className="relative">
                <div className="absolute -left-[21px] top-1 w-2.5 h-2.5 rounded-full bg-[#c4c5d8]" />
                <p className="text-[13px] font-medium text-[#434655]">Delivered</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
