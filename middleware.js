import { NextResponse } from 'next/server';

export function middleware(request) {
    const ua = request.headers.get('user-agent')?.toLowerCase() || '';

    const blockedBots = [
        'mj12bot',
        'dotbot',
        'ahrefsbot',
        'semrushbot',
    ];

    // Always allow Google, Bing, etc.
    if (ua.includes('googlebot') || ua.includes('bingbot')) {
        return NextResponse.next();
    }

    if (blockedBots.some(bot => ua.includes(bot))) {
        return new NextResponse('Blocked', { status: 403 });
    }

    return NextResponse.next();
}

// Only match pages where bot blocking is required
export const config = {
    matcher: ['/search-by-make/:path*', '/api/:path*'],
};