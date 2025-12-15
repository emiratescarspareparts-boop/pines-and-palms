import { NextResponse } from 'next/server';

export function middleware(request) {
    const ua = request.headers.get('user-agent')?.toLowerCase() || '';
    const country = request.geo?.country || 'UNKNOWN';

    /* =========================
       1. HARD GEO BLOCK
       ========================= */

    // Completely block China (bots, scrapers, AI training)
    if (country === 'CN') {
        return new NextResponse('Access denied', { status: 403 });
    }

    /* =========================
       2. ALLOW LEGIT SERVICES
       ========================= */

    const allowedBots = [
        'googlebot',
        'bingbot',
        'facebookexternalhit',
        'twitterbot',
        'linkedinbot',
        'whatsapp',
        'slackbot',
        'telegrambot',
    ];

    if (allowedBots.some(bot => ua.includes(bot))) {
        return NextResponse.next();
    }

    /* =========================
       3. BLOCK AI / SEO / SCRAPERS
       ========================= */

    const blockedBots = [
        // SEO crawlers
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

        // Scripted / headless
        'curl',
        'wget',
        'python-requests',
        'axios',
        'go-http-client',
        'node-fetch',
    ];

    if (blockedBots.some(bot => ua.includes(bot))) {
        return new NextResponse('Access denied', { status: 403 });
    }

    /* =========================
       4. SOFT BLOCK SINGAPORE ABUSE
       ========================= */

    // Singapore is a crawler hotspot
    if (country === 'SG') {
        // Block suspicious or empty user agents
        if (!ua || ua.length < 10 || ua.includes('bot')) {
            return new NextResponse('Access denied', { status: 403 });
        }
    }

    return NextResponse.next();
}

/* =========================
   5. APPLY ONLY TO APIs
   ========================= */

export const config = {
    matcher: ['/api/:path*'],
};