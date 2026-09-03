import { useRouter, usePathname } from 'next/navigation';
import { useUser } from '@/hooks/use-auth';

/**
 * Hook to protect specific actions (like adding to cart).
 * If the user is authenticated, it executes the provided action.
 * If not, it redirects them to the login page with a redirect parameter
 * so they are brought back to the current page after logging in.
 */
export function useRequireAuth() {
  const router = useRouter();
  const pathname = usePathname();
  const { data: user, isLoading } = useUser();

  const requireAuth = (action: () => void) => {
    if (isLoading) return; // Still loading user state

    if (!user) {
      const redirectUrl = encodeURIComponent(pathname);
      router.push(`/login?redirect=${redirectUrl}`);
      return;
    }

    action();
  };

  return requireAuth;
}
