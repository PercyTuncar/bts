// middleware.ts
import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export function middleware(request: NextRequest) {
    const { pathname } = request.nextUrl;

    // Cloudflare inyecta este header
    const country = request.headers.get('CF-IPCountry') || 'US';

    // Default to Spanish
    let lang = 'es';

    // Check if path is for Brazil
    if (pathname.startsWith('/brasil')) {
        lang = 'pt-BR';
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
