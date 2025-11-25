'use client'

import { motion } from 'framer-motion'
import Image from 'next/image'

interface BackgroundMediaProps {
    type: 'video' | 'image'
    src: string
    overlayOpacity?: number
    className?: string
}

export function BackgroundMedia({
    type,
    src,
    overlayOpacity = 0.4,
    className = ''
}: BackgroundMediaProps) {
    return (
        <div className={`absolute inset-0 z-0 overflow-hidden ${className}`}>
            {/* Media Layer */}
            <motion.div
                initial={{ scale: 1.1, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ duration: 1.5, ease: "easeOut" }}
                className="relative w-full h-full"
            >
                {type === 'video' ? (
                    <video
                        autoPlay
                        muted
                        loop
                        playsInline
                        className="object-cover w-full h-full"
                    >
                        <source src={src} type="video/mp4" />
                    </video>
                ) : (
                    <Image
                        src={src}
                        alt="Background"
                        fill
                        priority
                        className="object-cover w-full h-full"
                        quality={90}
                    />
                )}
            </motion.div>

            {/* Overlay Layer */}
            <div
                className="absolute inset-0 bg-cream mix-blend-multiply"
                style={{ opacity: overlayOpacity }}
            />

            {/* Texture/Grain Layer (Optional Luxury Touch) */}
            <div className="absolute inset-0 opacity-[0.03] pointer-events-none mix-blend-overlay"
                style={{ backgroundImage: 'url("data:image/svg+xml,%3Csvg viewBox=%220 0 200 200%22 xmlns=%22http://www.w3.org/2000/svg%22%3E%3Cfilter id=%22noiseFilter%22%3E%3CfeTurbulence type=%22fractalNoise%22 baseFrequency=%220.65%22 numOctaves=%223%22 stitchTiles=%22stitch%22/%3E%3C/filter%3E%3Crect width=%22100%25%22 height=%22100%25%22 filter=%22url(%23noiseFilter)%22/%3E%3C/svg%3E")' }}
            />
        </div>
    )
}
