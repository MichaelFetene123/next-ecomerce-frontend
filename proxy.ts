import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000';

function buildLoginRedirect(request: NextRequest): NextResponse {
  const loginUrl = new URL('/login', request.url);
  const redirectTarget = `${request.nextUrl.pathname}${request.nextUrl.search}`;
  loginUrl.searchParams.set('redirect', redirectTarget);
  return NextResponse.redirect(loginUrl);
}

async function hasAuthenticatedSession(request: NextRequest): Promise<boolean> {
  const cookieHeader = request.headers.get('cookie');
  if (!cookieHeader) {
    return false;
  }

  try {
    const response = await fetch(new URL('/api/me', API_URL).toString(), {
      method: 'GET',
      headers: {
        cookie: cookieHeader,
        accept: 'application/json',
        'x-requested-with': 'XMLHttpRequest',
        referer: request.nextUrl.origin,
        origin: request.nextUrl.origin,
      },
      cache: 'no-store',
    });

    if (!response.ok) {
      return false;
    }

    const payload = await response.json();
    return Boolean(payload?.data);
  } catch {
    return false;
  }
}

export async function proxy(request: NextRequest) {
  const isAuthenticated = await hasAuthenticatedSession(request);

  if (!isAuthenticated) {
    return buildLoginRedirect(request);
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/admin', '/admin/:path*'],
};
