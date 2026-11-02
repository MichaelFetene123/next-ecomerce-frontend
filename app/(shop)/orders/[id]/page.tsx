import { Suspense } from 'react';
import { OrderDetailSkeleton } from '@/components/skeletons/order-detail-skeleton';
import { OrderDetailClient } from './order-detail-client';

export default async function OrderDetailsPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  return (
    <Suspense fallback={<OrderDetailSkeleton variant="detail" />}>
      <OrderDetailClient params={params} />
    </Suspense>
  );
}
