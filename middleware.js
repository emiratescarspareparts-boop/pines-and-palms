export function middleware(request) {
    const country = request.geo?.country;

    if (country === 'CN') {
        return new Response('Access Denied', { status: 403 });
    }

    return NextResponse.next();
}