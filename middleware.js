import { NextResponse } from 'next/server';

export function middleware(request) {
    const country = request.geo?.country;

    // Block China
    if (country === 'CN') {
        return new NextResponse('Access denied', {
            status: 403,
            headers: {
                'Cache-Control': 'no-store',
            },
        });
    }

    return NextResponse.next();
}

export const config = {
    matcher: '/:path*',
};