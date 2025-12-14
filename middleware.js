import { NextResponse } from 'next/server';

export function middleware(request) {
    const country = request.geo?.country;

    if (country === 'CN') {
        return new NextResponse('Access denied', { status: 403 });
    }

    return NextResponse.next();
}