import { type NextRequest, NextResponse } from 'next/server';
import createMiddleware from 'next-intl/middleware';
import { createServerClient } from '@supabase/ssr';
import { routing } from './i18n/routing';

const intlMiddleware = createMiddleware(routing);

const ADMIN_PATTERN = /^\/(el|ru|en)\/(admin)/;

/**
 * Security headers applied to every response. Mirrors the OWASP
 * Secure Headers project recommendations and pins down what the site
 * actually needs:
 *
 * - Content-Security-Policy:
 *   - default-src self only
 *   - script: self + inline + Vercel Analytics
 *   - style: self + inline (Tailwind generates inline styles for some
 *     features; tightening to nonces would require a per-request nonce
 *     and a refactor of every dangerouslySetInnerHTML JSON-LD block)
 *   - img: self + data + https (we hotlink news photos and YouTube
 *     thumbnails)
 *   - font: self + data
 *   - connect: self + Supabase + Vercel Analytics
 *   - frame: youtube-nocookie + youtube (the video player modal)
 *   - frame-ancestors none — replaces legacy X-Frame-Options DENY,
 *     prevents the site being framed
 *   - object-src none — disable Flash / legacy plugin embeds
 *   - base-uri self
 *
 * - Strict-Transport-Security: 1 year, all subdomains, preload-eligible
 *   when domain is added to the HSTS preload list.
 * - Referrer-Policy: strict-origin-when-cross-origin so an external
 *   click leak only the origin, not the path with article slugs.
 * - X-Content-Type-Options: nosniff to lock MIME sniffing.
 * - Permissions-Policy: tightly disable camera, microphone, geolocation,
 *   payment, usb — none of which the site uses.
 * - X-Frame-Options: DENY for legacy crawlers that don't honour CSP
 *   frame-ancestors.
 */
const CSP = [
  "default-src 'self'",
  "script-src 'self' 'unsafe-inline' 'unsafe-eval' https://www.youtube.com https://www.youtube-nocookie.com https://va.vercel-scripts.com",
  "style-src 'self' 'unsafe-inline' https://fonts.googleapis.com",
  "img-src 'self' blob: data: https:",
  "font-src 'self' data: https://fonts.gstatic.com",
  "connect-src 'self' https://*.supabase.co https://*.supabase.in https://va.vercel-scripts.com https://vitals.vercel-insights.com",
  "frame-src 'self' https://www.youtube-nocookie.com https://www.youtube.com",
  "media-src 'self' https:",
  "frame-ancestors 'none'",
  "object-src 'none'",
  "base-uri 'self'",
  "form-action 'self'",
  // upgrade-insecure-requests on production only; safer not to enable
  // in dev where some assets may be served over http.
].join('; ');

const SECURITY_HEADERS: Record<string, string> = {
  'Content-Security-Policy': CSP,
  'Strict-Transport-Security': 'max-age=31536000; includeSubDomains; preload',
  'Referrer-Policy': 'strict-origin-when-cross-origin',
  'X-Content-Type-Options': 'nosniff',
  'X-Frame-Options': 'DENY',
  'Permissions-Policy': 'camera=(), microphone=(), geolocation=(), payment=(), usb=(), interest-cohort=()',
  'X-DNS-Prefetch-Control': 'on',
};

function applySecurityHeaders(response: NextResponse): NextResponse {
  for (const [name, value] of Object.entries(SECURITY_HEADERS)) {
    response.headers.set(name, value);
  }
  return response;
}

async function checkAdminAuth(request: NextRequest): Promise<NextResponse | null> {
  const response = NextResponse.next();

  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll() {
          return request.cookies.getAll();
        },
        setAll(cookiesToSet: Array<{ name: string; value: string; options?: Record<string, unknown> }>) {
          cookiesToSet.forEach(({ name, value, options }) => {
            response.cookies.set(name, value, options as any);
          });
        },
      },
    },
  );

  const { data: { user } } = await supabase.auth.getUser();

  if (!user) {
    const locale = request.nextUrl.pathname.split('/')[1] || routing.defaultLocale;
    return NextResponse.redirect(new URL(`/${locale}/admin/login`, request.url));
  }

  const { data: profile } = await supabase
    .from('profiles')
    .select('role')
    .eq('id', user.id)
    .single();

  if (!profile || !['admin', 'editor'].includes(profile.role)) {
    const locale = request.nextUrl.pathname.split('/')[1] || routing.defaultLocale;
    return NextResponse.redirect(new URL(`/${locale}`, request.url));
  }

  return null;
}

export default async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  if (ADMIN_PATTERN.test(pathname) && !pathname.endsWith('/admin/login')) {
    const authRedirect = await checkAdminAuth(request);
    if (authRedirect) return applySecurityHeaders(authRedirect);
  }

  const response = intlMiddleware(request);
  return applySecurityHeaders(response);
}

export const config = {
  matcher: ['/', '/(el|ru|en)/:path*'],
};
