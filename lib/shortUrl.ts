import { NextRequest, NextResponse } from 'next/server';
import { resolveShortUrl, SHORT_URL_FALLBACK_PATH } from '@/lib/api';

type RouteContext = { params: Promise<{ slug: string }> };

function redirectHome(request: NextRequest) {
  return NextResponse.redirect(new URL(SHORT_URL_FALLBACK_PATH, request.nextUrl.origin), 302);
}

/** Shared GET handler for `/q/[slug]` and `/api/short-url/[slug]`. */
export async function handleShortUrlGet(request: NextRequest, context: RouteContext) {
  try {
    const { slug } = await context.params;
    const decodedSlug = decodeURIComponent(slug ?? '').trim();

    if (!decodedSlug) {
      return redirectHome(request);
    }

    const destination = await resolveShortUrl(decodedSlug);

    if (!destination) {
      return redirectHome(request);
    }

    return NextResponse.redirect(new URL(destination, request.nextUrl.origin), 302);
  } catch {
    return redirectHome(request);
  }
}
