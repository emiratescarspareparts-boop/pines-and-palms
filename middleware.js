import { NextResponse } from 'next/server';

export function middleware(request) {
    const ua = request.headers.get('user-agent')?.toLowerCase() || '';

    const blockedBots = [
        'mj12bot',
        'dotbot',
        'bingpreview',
        'ahrefsbot',
        'semrushbot',
    ];

    if (blockedBots.some(bot => ua.includes(bot))) {
        return new NextResponse('Blocked', { status: 403 });
    }

    return NextResponse.next();
}

export const config = {
    matcher: '/:path*',
};