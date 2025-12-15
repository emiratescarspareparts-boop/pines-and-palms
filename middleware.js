import { NextResponse } from 'next/server';

export function middleware(request) {
    const ua = request.headers.get('user-agent')?.toLowerCase() || '';

    // Allow legit services
    const allowed = [
        'googlebot',
        'bingbot',
        'facebookexternalhit',
        'twitterbot',
        'linkedinbot',
        'whatsapp',
        'slackbot',
        'telegrambot',
    ];

    if (allowed.some(bot => ua.includes(bot))) {
        return NextResponse.next();
    }

    // Block abusive scrapers & AI bots
    const blocked = [
        'mj12bot',
        'dotbot',
        'ahrefsbot',
        'semrushbot',
        'blexbot',
        'serpstatbot',
        'sistrix',
        'spbot',
        'dataforseobot',

        // AI / ML scrapers
        'gptbot',
        'chatgpt',
        'openai',
        'claudebot',
        'anthropic',
        'bytespider',
        'ccbot',
        'diffbot',

        // Scripted scrapers
        'curl',
        'wget',
        'python-requests',
        'axios',
        'go-http-client',
    ];

    if (blocked.some(bot => ua.includes(bot))) {
        return new NextResponse('Access denied', { status: 403 });
    }

    return NextResponse.next();
}

export const config = {
    matcher: ['/api/:path*'], // 🔥 ONLY APIs
};