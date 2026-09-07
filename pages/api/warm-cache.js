const BASE = 'https://www.emirates-car.com'
const BATCH_SIZE = 10
const DELAY_MS = 200

const PRIORITY_MAKES = [
    'Honda', 'Nissan', 'Toyota', 'Mitsubishi', 'Lexus',
    'Hyundai', 'Kia', 'Mazda', 'Audi', 'Volkswagen',
    'Mercedes-Benz', 'BMW', 'Ford', 'Chevrolet', 'Jeep',
    'Infiniti', 'GMC', 'Volvo', 'Dodge', 'Land%20Rover',
    'Exeed', 'BYD', 'Genesis', 'Porsche', 'Daihatsu',
    'Suzuki', 'Renault', 'Dacia', 'Peugeot', 'Lincoln',
    'Ram', 'Hummer', 'Cadillac', 'Subaru', 'Tesla',
    'Mini', 'Alfa%20Romeo', 'Chrysler', 'Daewoo', 'Scion',
    'Seres', 'McLaren', 'Bugatti', 'Fiat', 'Ferrari',
    'Bentley', 'Rolls-Royce', 'Maserati', 'Jaguar'
]

const PRIORITY_MODELS = [
    ['Honda', 'Accord'], ['Honda', 'Civic'], ['Honda', 'CR-V'],
    ['Honda', 'Fit'], ['Honda', 'Pilot'], ['Honda', 'Insight'],
    ['Honda', 'HR-V%202WD'],
    ['Toyota', 'Yaris'], ['Toyota', 'Corolla'], ['Toyota', 'Prado'],
    ['Toyota', 'RAV4'], ['Toyota', 'Land%20Cruiser'],
    ['Toyota', 'Highlander'], ['Toyota', 'Sienna'],
    ['Toyota', 'Camry%20Hybrid'], ['Toyota', 'C-HR'],
    ['Nissan', 'Patrol'], ['Nissan', 'Altima'], ['Nissan', 'Kicks'],
    ['Nissan', 'Rogue'], ['Nissan', 'Versa'], ['Nissan', 'JUKE'],
    ['Nissan', '350Z'], ['Nissan', '370Z'], ['Nissan', 'Maxima'],
    ['Mitsubishi', 'Pajero'], ['Mitsubishi', 'Outlander'],
    ['Mitsubishi', 'Lancer'], ['Mitsubishi', 'Montero'],
    ['Lexus', 'ES%20350'], ['Lexus', 'LX%20570'],
    ['Lexus', 'RX'], ['Lexus', 'GX%20460'],
    ['Lexus', 'IS'], ['Lexus', 'LS%20460'],
    ['Hyundai', 'Santa%20Fe'], ['Hyundai', 'Sonata'],
    ['Hyundai', 'Elantra'], ['Hyundai', 'Veloster'],
    ['Kia', 'Sportage'], ['Kia', 'Sorento'], ['Kia', 'Rio'],
    ['Mazda', 'CX-9'], ['Mazda', 'Mazda3'],
    ['Chevrolet', 'Malibu'], ['Chevrolet', 'TrailBlazer'],
    ['Chevrolet', 'Tahoe'], ['Chevrolet', 'Lumina'],
    ['GMC', 'Acadia'], ['Infiniti', 'Q50'],
    ['Audi', 'Q7'], ['Audi', 'Q5'], ['Audi', 'e-tron'],
    ['Volkswagen', 'Tiguan'], ['Volkswagen', 'ID.4%201st'],
    ['Ford', 'Fusion'], ['Dodge', 'Charger'],
    ['Jeep', 'Grand%20Cherokee'], ['Land%20Rover', 'Discovery'],
    ['Volvo', 'XC60'], ['Volvo', 'XC90'],
    ['Suzuki', 'Grand%20Vitara'],
    ['JAC', 'J7'], ['JAC', 'JS4'], ['JAC', 'J4'],
    ['BYD', 'Leopard'], ['Exeed', 'RX'], ['Exeed', 'TXL'],
]

const PRIORITY_PARTS = [
    'Battery', 'Engine%20Assembly', 'Gearbox', 'Radiator',
    'AC%20Compressor', 'Alternator', 'Suspension', 'Shock%20Absorber',
    'Headlight%20Assembly', 'Bumpers', 'Brake%20Disc', 'Turbocharger',
    'Steering%20Rack', 'Water%20Pump', 'Fuel%20Pump', 'Starter',
    'Taillight', 'Axle%20Assembly', 'Lower%20Control%20Arm',
    'Upper%20Control%20Arm', 'Catalytic%20Convertor', 'AC%20Condenser',
    'Wheel', 'Mirrors', 'Steering%20Box', 'Fender%20Liner',
    'Grille', 'Brake%20Pads', 'Bumper%20Cover%20(Rear)',
    'Fender%20(Front)', 'Camshaft', 'Power%20Steering%20Pump',
    'Engine%20Block', 'Accessories', 'Spoiler', 'Crankshaft', 'Flywheel'
]

const PRIORITY_CITIES = [
    'Ras%20Al%20Khor%20(Dubai)',
    'Musaffah%20(Abu%20Dhabi)',
    'Jebel%20Ali%20Free%20Zone%20(Dubai)',
    'Khalifa%20City%20(Abu%20Dhabi)',
    'Ajman', 'Abu%20Dhabi', 'Dubai', 'Sharjah',
    'Deira%20(Dubai)', 'Al%20Quoz%20(Dubai)',
    'Al%20Mafraq%20(Abu%20Dhabi)', 'Mussafah',
    'Ras%20al%20Khaimah', 'Umm%20al%20Quwain',
    'Al%20Fujairah', 'Al%20Karama%20(Dubai)',
    'Dibba%20Al%20Fujairah%20(Fujairah)',
    'Hamriya%20Free%20Zone%20Port',
    'Umm%20Ramool%20(Dubai)'
]

function generateUrls(segment) {
    const allUrls = []

    PRIORITY_MAKES.forEach(make => {
        allUrls.push(`${BASE}/search-by-make/${make}`)
    })

    PRIORITY_MODELS.forEach(([make, model]) => {
        allUrls.push(`${BASE}/search-by-make/${make}/${model}`)
    })

    PRIORITY_MAKES.forEach(make => {
        PRIORITY_PARTS.forEach(part => {
            allUrls.push(`${BASE}/search-by-make/${make}/parts/${part}`)
        })
    })

    PRIORITY_CITIES.forEach(city => {
        allUrls.push(`${BASE}/search-by-cities-in-uae/${city}`)
    })

    const SEGMENT_SIZE = 500
    const start = segment * SEGMENT_SIZE
    const end = Math.min(start + SEGMENT_SIZE, allUrls.length)

    return allUrls.slice(start, end)
}

// Pages Router config (replaces `export const maxDuration` from App Router)
export const config = {
    maxDuration: 300, // Vercel Pro
}

export default async function handler(req, res) {
    const { secret, segment: segmentParam } = req.query
    const segment = parseInt(segmentParam || '0')

    console.log('ENV secret:', process.env.WARM_CACHE_SECRET)
    console.log('Received secret:', secret)

    if (secret !== process.env.WARM_CACHE_SECRET) {
        return res.status(401).json({ error: 'Unauthorized' })
    }

    const urls = generateUrls(segment)

    console.log(`\n🔥 SEGMENT ${segment} — ${urls.length} URLs to warm:`)
    console.log('─'.repeat(60))
    urls.forEach((url, i) => {
        console.log(`${i + 1}. ${url}`)
    })
    console.log('─'.repeat(60))
    console.log(`Starting warm...\n`)

    const startTime = Date.now()
    const results = []

    try {
        for (let i = 0; i < urls.length; i += BATCH_SIZE) {
            const batch = urls.slice(i, i + BATCH_SIZE)

            const batchResults = await Promise.all(
                batch.map(async url => {
                    // Validate before fetching — catches malformed URLs cleanly
                    try {
                        new URL(url)
                    } catch (e) {
                        console.log(`⚠️  Invalid URL, skipping → "${url}"`)
                        return { url, status: 'invalid-url', ms: 0 }
                    }

                    try {
                        const start = Date.now()
                        const r = await fetch(url, {
                            headers: { 'User-Agent': 'Emirates-Car-Warmer/1.0' }
                        })
                        const ms = Date.now() - start
                        console.log(`✅ ${r.status} ${ms}ms → ${url}`)
                        return { url, status: r.status, ms }
                    } catch (e) {
                        console.log(`❌ Fetch failed → ${url} (${e.message})`)
                        return { url, status: 'error', ms: 0 }
                    }
                })
            )

            results.push(...batchResults)
            await new Promise(r => setTimeout(r, DELAY_MS))
        }
    } catch (e) {
        console.error('🔥 Handler crashed:', e)
        return res.status(500).json({ error: 'Warm cache failed', message: e.message })
    }

    const duration = Math.round((Date.now() - startTime) / 1000)
    const success = results.filter(r => r.status === 200).length
    const failed = results.filter(r => r.status !== 200).length

    console.log(`\n✅ SEGMENT ${segment} COMPLETE`)
    console.log(`Duration: ${duration}s`)
    console.log(`Success: ${success}`)
    console.log(`Failed: ${failed}`)

    return res.status(200).json({
        segment,
        warmed: urls.length,
        success,
        failed,
        duration: `${duration}s`,
        urls,
        timestamp: new Date().toISOString()
    })
}