import type { MetadataRoute } from 'next';
import { siteOrigin } from '@/lib/site';

/**
 * Robots policy:
 * - allow all canonical content
 * - disallow /admin (admin CMS) and /api (server endpoints)
 * - point to the dynamic sitemap
 */
export default function robots(): MetadataRoute.Robots {
  const origin = siteOrigin();
  return {
    rules: [
      {
        userAgent: '*',
        allow: ['/'],
        disallow: ['/admin/', '/api/'],
      },
    ],
    sitemap: `${origin}/sitemap.xml`,
    host: origin,
  };
}
