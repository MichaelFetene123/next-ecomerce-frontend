import {
  LayoutDashboard,
  Package,
  FolderTree,
  ShoppingBag,
  Users,
  CreditCard,
  Settings,
  LucideIcon,
} from 'lucide-react';

export interface AdminNavItem {
  title: string;
  href: string;
  icon: LucideIcon;
  badge?: string | number;
  description?: string;
  exact?: boolean;
}

export const ADMIN_NAV_ITEMS: AdminNavItem[] = [
  {
    title: 'Dashboard',
    href: '/admin',
    icon: LayoutDashboard,
    exact: true,
    description: 'System overview & real-time metrics',
  },
  {
    title: 'Products',
    href: '/admin/products',
    icon: Package,
    description: 'Catalog, pricing & inventory',
  },
  {
    title: 'Categories',
    href: '/admin/categories',
    icon: FolderTree,
    description: 'Taxonomy & category hierarchy',
  },
  {
    title: 'Orders',
    href: '/admin/orders',
    icon: ShoppingBag,
    description: 'Customer purchases & fulfillment',
  },
  {
    title: 'Customers',
    href: '/admin/customers',
    icon: Users,
    description: 'Registered users & account activity',
  },
  {
    title: 'Payments',
    href: '/admin/payments',
    icon: CreditCard,
    description: 'Chapa gateway transactions & payouts',
  },
  {
    title: 'Settings',
    href: '/admin/settings',
    icon: Settings,
    description: 'Store preferences & integrations',
  },
];

export function getAdminBreadcrumb(pathname: string): { label: string; href?: string }[] {
  const crumbs: { label: string; href?: string }[] = [{ label: 'Admin', href: '/admin' }];

  if (pathname === '/admin' || pathname === '/admin/') {
    return crumbs;
  }

  const parts = pathname.replace(/^\/admin\/?/, '').split('/').filter(Boolean);
  let currentPath = '/admin';

  parts.forEach((part, index) => {
    currentPath += `/${part}`;
    const matched = ADMIN_NAV_ITEMS.find((item) => item.href === currentPath);
    const isLast = index === parts.length - 1;

    crumbs.push({
      label: matched ? matched.title : part.charAt(0).toUpperCase() + part.slice(1),
      href: isLast ? undefined : currentPath,
    });
  });

  return crumbs;
}

