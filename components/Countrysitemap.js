'use client';

import { useEffect, useRef, useState } from 'react';

export default function CountryMap() {
    const mapRef = useRef(null);
    const [status, setStatus] = useState('Loading...');
    const [errors, setErrors] = useState([]);

    useEffect(() => {
        let mounted = true;

        const loadScript = (src) => {
            return new Promise((resolve, reject) => {
                // Check if script already exists
                const existing = document.querySelector(`script[src="${src}"]`);
                if (existing) {
                    resolve();
                    return;
                }

                const script = document.createElement('script');
                script.src = src;
                script.async = false;
                script.onload = () => {
                    console.log(`✅ Loaded: ${src}`);
                    resolve();
                };
                script.onerror = () => {
                    const error = `❌ Failed to load: ${src}`;
                    console.error(error);
                    reject(new Error(error));
                };
                document.head.appendChild(script);
            });
        };

        const initializeMap = async () => {
            try {
                setStatus('Loading SimpleMaps library...');

                // Load SimpleMaps library first
                await loadScript('/simplemaps_countrymap.js');

                if (!mounted) return;
                setStatus('Loading map data...');

                // Then load your map data
                await loadScript('/mapdata.js');

                if (!mounted) return;
                setStatus('Initializing map...');

                // Wait a bit for scripts to fully execute
                await new Promise(resolve => setTimeout(resolve, 100));

                // Check if SimpleMaps is available
                if (typeof window.simplemaps_countrymap === 'undefined') {
                    throw new Error('simplemaps_countrymap is not defined. Check if simplemaps_countrymap.js loaded correctly.');
                }

                // Check if mapdata is available
                if (typeof window.simplemaps_countrymap_mapdata === 'undefined') {
                    console.warn('mapdata might not be loaded yet, trying to initialize anyway...');
                }

                console.log('🗺️ Initializing map...');
                window.simplemaps_countrymap.load();

                if (!mounted) return;
                setStatus('Map loaded successfully! ✅');

            } catch (error) {
                console.error('Map initialization error:', error);
                if (mounted) {
                    setStatus('Error loading map ❌');
                    setErrors(prev => [...prev, error.message]);
                }
            }
        };

        initializeMap();

        return () => {
            mounted = false;
        };
    }, []);

    return (
        <div className="w-full max-w-6xl mx-auto p-6">
            <h1 className="text-3xl font-bold mb-4 text-gray-800">Interactive Country Map</h1>

            {/* Status indicator */}
            <div className={`mb-4 p-4 rounded-lg ${status.includes('✅') ? 'bg-green-100 text-green-800' :
                status.includes('❌') ? 'bg-red-100 text-red-800' :
                    'bg-blue-100 text-blue-800'
                }`}>
                <p className="font-semibold">{status}</p>
                {errors.length > 0 && (
                    <div className="mt-2 space-y-1">
                        {errors.map((error, i) => (
                            <p key={i} className="text-sm">• {error}</p>
                        ))}
                    </div>
                )}
            </div>

            {/* Map container */}
            <div
                id="map"
                ref={mapRef}
                className="w-full bg-gray-50 rounded-lg shadow-lg border-2 border-gray-300"
                style={{ minHeight: '600px' }}
            />

            {/* Troubleshooting Guide */}
            <div className="mt-6 space-y-4">
                <div className="p-6 bg-yellow-50 rounded-lg border border-yellow-200">
                    <h2 className="font-bold text-lg mb-3 text-yellow-900">🔍 Troubleshooting Steps:</h2>
                    <ol className="list-decimal list-inside space-y-2 text-gray-700">
                        <li>
                            <strong>Check Browser Console:</strong> Press F12 and look for errors in the Console tab
                        </li>
                        <li>
                            <strong>Verify files exist:</strong> Go to{' '}
                            <a href="/simplemaps_countrymap.js" target="_blank" className="text-blue-600 hover:underline">
                                /simplemaps_countrymap.js
                            </a>
                            {' '}and{' '}
                            <a href="/mapdata.js" target="_blank" className="text-blue-600 hover:underline">
                                /mapdata.js
                            </a>
                            {' '}to check if files load
                        </li>
                        <li>
                            <strong>File location:</strong> Ensure both files are in <code className="bg-yellow-100 px-2 py-1 rounded">public/</code> folder (not public/static or anywhere else)
                        </li>
                        <li>
                            <strong>Restart dev server:</strong> Stop and restart <code className="bg-yellow-100 px-2 py-1 rounded">npm run dev</code>
                        </li>
                    </ol>
                </div>



                <div className="p-6 bg-purple-50 rounded-lg border border-purple-200">
                    <h2 className="font-bold text-lg mb-3 text-purple-900">💡 Common Issues:</h2>
                    <ul className="list-disc list-inside space-y-2 text-gray-700">
                        <li>Files are in wrong folder (like public/static/ instead of public/)</li>
                        <li>Files have wrong names or extra extensions (.js.txt)</li>
                        <li>Dev server wasn't restarted after adding files</li>
                        <li>Browser cache - try hard refresh (Ctrl+Shift+R or Cmd+Shift+R)</li>
                        <li>mapdata.js doesn't match the library version</li>
                    </ul>
                </div>
            </div>
        </div>
    );
}