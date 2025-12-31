'use client';

import { useEffect, useRef, useState } from 'react';
import Script from 'next/script';

export default function CountryMap() {
    const [scriptsLoaded, setScriptsLoaded] = useState({ lib: false, data: false });
    const [status, setStatus] = useState('Waiting for scripts...');
    const initAttempted = useRef(false);

    const checkAndInitialize = () => {
        if (scriptsLoaded.lib && scriptsLoaded.data && !initAttempted.current) {
            initAttempted.current = true;
            setStatus('Initializing map...');

            setTimeout(() => {
                try {
                    if (typeof window.simplemaps_countrymap !== 'undefined') {
                        console.log('🗺️ Initializing SimpleMaps...');
                        window.simplemaps_countrymap.load();
                        setStatus('Map loaded successfully! ✅');
                    } else {
                        setStatus('Error: SimpleMaps library not found ❌');
                    }
                } catch (error) {
                    console.error('Map initialization error:', error);
                    setStatus('Error initializing map ❌');
                }
            }, 200);
        }
    };

    useEffect(() => {
        checkAndInitialize();
    }, [scriptsLoaded]);

    return (
        <>
            {/* Load SimpleMaps library */}
            <Script
                src="/simplemaps_countrymap.js"
                strategy="afterInteractive"
                onLoad={() => {
                    console.log('✅ SimpleMaps library loaded');
                    setScriptsLoaded(prev => ({ ...prev, lib: true }));
                    setStatus('Library loaded, waiting for map data...');
                }}
                onError={() => {
                    console.error('❌ Failed to load SimpleMaps library');
                    setStatus('Error: Could not load simplemaps_countrymap.js ❌');
                }}
            />

            {/* Load map data */}
            <Script
                src="/mapdata.js"
                strategy="afterInteractive"
                onLoad={() => {
                    console.log('✅ Map data loaded');
                    setScriptsLoaded(prev => ({ ...prev, data: true }));
                    setStatus('Map data loaded, initializing...');
                }}
                onError={() => {
                    console.error('❌ Failed to load map data');
                    setStatus('Error: Could not load mapdata.js ❌');
                }}
            />

            <div className="w-full max-w-6xl mx-auto p-6">
                <h1 className="text-3xl font-bold mb-4 text-gray-800">Interactive Country Map</h1>

                {/* Status indicator */}
                <div className={`mb-4 p-4 rounded-lg ${status.includes('✅') ? 'bg-green-100 text-green-800' :
                    status.includes('❌') ? 'bg-red-100 text-red-800' :
                        'bg-blue-100 text-blue-800'
                    }`}>
                    <p className="font-semibold">{status}</p>
                    <div className="mt-2 text-sm">
                        <p>• Library loaded: {scriptsLoaded.lib ? '✅' : '⏳'}</p>
                        <p>• Map data loaded: {scriptsLoaded.data ? '✅' : '⏳'}</p>
                    </div>
                </div>

                {/* Map container - SimpleMaps will render here */}
                <div
                    id="map"
                    className="w-full bg-gray-50 rounded-lg shadow-lg border-2 border-gray-300"
                    style={{ minHeight: '600px' }}
                />

                {/* Troubleshooting Guide */}
                <div className="mt-6 space-y-4">
                    <div className="p-6 bg-yellow-50 rounded-lg border border-yellow-200">
                        <h2 className="font-bold text-lg mb-3 text-yellow-900">🔍 Quick Checks:</h2>
                        <ul className="space-y-2 text-gray-700">
                            <li>
                                ✓ Check if files exist:{' '}
                                <a href="/simplemaps_countrymap.js" target="_blank" className="text-blue-600 hover:underline">
                                    simplemaps_countrymap.js
                                </a>
                                {' | '}
                                <a href="/mapdata.js" target="_blank" className="text-blue-600 hover:underline">
                                    mapdata.js
                                </a>
                            </li>
                            <li>✓ Press F12 to open Console and check for errors</li>
                            <li>✓ Files must be in <code className="bg-yellow-100 px-2 py-1 rounded">public/</code> folder</li>
                            <li>✓ Restart dev server after adding files</li>
                        </ul>
                    </div>

                    <div className="p-6 bg-blue-50 rounded-lg border border-blue-200">
                        <h2 className="font-bold text-lg mb-3 text-blue-900">📁 Required File Structure:</h2>
                        <pre className="bg-gray-800 text-green-400 p-4 rounded overflow-x-auto text-sm">
                            {`your-nextjs-project/
├── public/
│   ├── simplemaps_countrymap.js  ← Required
│   └── mapdata.js                ← Required
├── app/
│   └── your-map-component.js     ← This component
└── ...`}
                        </pre>
                    </div>

                    <div className="p-6 bg-purple-50 rounded-lg border border-purple-200">
                        <h2 className="font-bold text-lg mb-3 text-purple-900">💡 If map still doesn't show:</h2>
                        <ol className="list-decimal list-inside space-y-2 text-gray-700">
                            <li>Make sure you downloaded BOTH files from SimpleMaps</li>
                            <li>Verify file names are exactly <code className="bg-purple-100 px-1">simplemaps_countrymap.js</code> and <code className="bg-purple-100 px-1">mapdata.js</code></li>
                            <li>Check that files are plain .js (not .js.txt or other extensions)</li>
                            <li>Try hard refresh: Ctrl+Shift+R (Windows) or Cmd+Shift+R (Mac)</li>
                            <li>Stop and restart your dev server completely</li>
                        </ol>
                    </div>
                </div>
            </div>
        </>
    );
}