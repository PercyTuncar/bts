// middleware.ts
import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export function middleware(request: NextRequest) {
    const { pathname } = request.nextUrl;

    // Skip middleware for static files and internal paths
    if (
        pathname.includes('.') ||
        pathname.startsWith('/_next') ||
        pathname.startsWith('/api') ||
        pathname.startsWith('/images') ||
        pathname.startsWith('/favicon')
    ) {
        return NextResponse.next();
    }

    // Create response
    const response = NextResponse.next();

    // Cloudflare inyecta este header
    const country = request.headers.get('CF-IPCountry') || 'US';

    // Default to Spanish, Portuguese for Brazil
    const lang = pathname.startsWith('/brasil') ? 'pt-BR' : 'es';

    // Set headers on response instead of modifying request
    response.headers.set('x-lang', lang);
    response.headers.set('x-user-country', country);

    return response;
}

export const config = {
    matcher: [
        // Only match page routes, not static files
        '/((?!_next|api|favicon.ico|images|.*\\.[\\w]+$).*)',
    ],
};
