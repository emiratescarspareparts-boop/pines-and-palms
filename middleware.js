import { NextResponse } from 'next/server';

export function middleware(request) {
    const country = request.headers.get('x-vercel-ip-country');

    if (country === 'CN') {
        return new NextResponse('Blocked CN', { status: 403 });
    }

    return NextResponse.next();
}

export const config = {
    matcher: '/:path*',
};