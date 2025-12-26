import Link from 'next/link'
import React from 'react'

export default function NotFound() {
    return (
        <div>
            <div className="flex flex-col items-center justify-center h-screen text-center">
                <h1 className="text-4xl font-bold text-blue-900">404 - Page Not Found</h1>
                <p className="text-black text-xl">The part you are looking for is not available in this page. Kindly submit your inquiry at </p>
                <Link href="/" className="mt-4 text-blue-500 hover:underline">
                    Get In Touch
                </Link>
            </div>
        </div>
    )
}
