// middleware.ts
import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export function middleware(request: NextRequest) {
    const { pathname } = request.nextUrl;

    // Cloudflare (and some proxies) provide country headers.
    const country =
        request.headers.get('CF-IPCountry') ||
        request.headers.get('x-vercel-ip-country') ||
        'ZZ';

    // Default to Spanish
    let lang = 'es';

    // Country-specific language codes for SEO (A1)
    if (pathname.startsWith('/brasil')) {
        lang = 'pt-BR';
    } else if (pathname.startsWith('/peru')) {
        lang = 'es-PE';
    } else if (pathname.startsWith('/chile')) {
        lang = 'es-CL';
    } else if (pathname.startsWith('/mexico')) {
        lang = 'es-MX';
    } else if (pathname.startsWith('/colombia')) {
        lang = 'es-CO';
    } else if (pathname.startsWith('/argentina')) {
        lang = 'es-AR';
    } else if (pathname.startsWith('/madrid')) {
        lang = 'es-ES';
    }

    // Clone the request headers and add our custom header
    const requestHeaders = new Headers(request.headers);
    requestHeaders.set('x-lang', lang);
    requestHeaders.set('x-user-country', country);

    // Return the response with the modified headers
    return NextResponse.next({
        request: {
            headers: requestHeaders,
        },
    });
}

export const config = {
    matcher: [
        // Match all paths except static files, api, _next
        '/((?!api|_next/static|_next/image|favicon.ico|images|.*\\..*).*)',
    ],
};
