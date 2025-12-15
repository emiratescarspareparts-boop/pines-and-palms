import { NextResponse } from 'next/server';

export function middleware(request) {
    const ua = request.headers.get('user-agent')?.toLowerCase() || '';
    const country = request.geo?.country || '';

    // Geo block: China (CN) and Singapore (SG)
    const blockedCountries = ['CN', 'SG'];
    if (blockedCountries.includes(country)) {
        return new NextResponse('Access Denied - Geo Blocked', { status: 403 });
    }

    // Legitimate search engines and social crawlers
    const allowed = [
        'googlebot',
        'bingbot',
        'yandex',
        'duckduckbot',
        'baiduspider',
        'facebookexternalhit',
        'twitterbot',
        'linkedinbot',
        'slackbot',
        'whatsapp',
        'telegrambot',
    ];

    if (allowed.some(bot => ua.includes(bot))) {
        return NextResponse.next();
    }

    // Abusive scrapers & AI bots
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
        'gptbot',
        'chatgpt',
        'openai',
        'claudebot',
        'anthropic',
        'bytespider',
        'ccbot',
        'diffbot',
        'curl',
        'wget',
        'python-requests',
        'axios',
        'go-http-client',
        'httpclient',
        'java',
        'pycurl',
        'libwww',
        'fetch'
    ];

    if (blocked.some(bot => ua.includes(bot))) {
        return new NextResponse('Access Denied - Bot', { status: 403 });
    }

    // Block empty or suspicious user agents
    if (!ua || ua.length < 10) {
        return new NextResponse('Invalid User Agent', { status: 403 });
    }

    // Block if multiple bot patterns present
    const suspiciousPatterns = ['bot', 'crawl', 'spider', 'scrape'];
    const matchCount = suspiciousPatterns.filter(pattern => ua.includes(pattern)).length;
    if (matchCount >= 2) {
        return new NextResponse('Access Denied - Suspicious UA', { status: 403 });
    }

    return NextResponse.next();
}

// Apply to all pages except static assets, images, and common files
export const config = {
    matcher: [
        '/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp|ico|css|js|woff2)$).*)',
    ],
};