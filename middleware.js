import { NextResponse } from 'next/server';

// These bots IGNORE robots.txt - must block at middleware level
const blockedBots = /blexbot|serpstatbot|ahrefsbot|semrushbot|dataforseobot|dotbot|petalbot|magpie-crawler|rogerbot|mj12bot|seekbot/i;

export function middleware(request) {
    const ua = request.headers.get('user-agent') || '';

    if (blockedBots.test(ua)) {
        console.log(`Blocked bot: ${ua}`);
        return new NextResponse('Access Denied', { status: 403 });
    }

    return NextResponse.next();
}

export const config = {
    // Only run on HTML pages, not static assets
    matcher: [
        '/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp|ico|css|js|woff2|json|xml|txt)$).*)',
    ],
};