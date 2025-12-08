'use client'

import { motion } from 'framer-motion'
import { Play } from 'lucide-react'

interface BrandHeroProps {
    brandName: string
    location: string
    intro: string
    videoSrc: string
    logoSrc: string // In a real app this would be an image, for now maybe text or placeholder
    featuredIn: string[] // Array of icon names or image URLs
}

export function BrandHero({
    brandName,
    location,
    intro,
    videoSrc,
    logoSrc,
    featuredIn
}: BrandHeroProps) {
    return (
        <section className="relative w-full h-screen min-h-[800px] flex flex-col items-center justify-center text-center text-black overflow-hidden">
            {/* Background Video Container */}
            <div className="absolute inset-0 z-0">
                <video
                    autoPlay
                    muted
                    loop
                    playsInline
                    className="w-full h-full object-cover opacity-90"
                >
                    <source src={videoSrc} type="video/mp4" />
                </video>
                {/* Overlay for better text readability if needed, though design requests negative space/luxury feel */}
                <div className="absolute inset-0 bg-white/10" />
            </div>

            {/* Content Container */}
            <div className="relative z-10 max-w-4xl mx-auto px-6 flex flex-col items-center gap-8 mt-20">

                {/* Brand Name / Logo */}
                <motion.h1
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                    className="text-6xl md:text-8xl font-serif tracking-tight text-white drop-shadow-lg"
                >
                    {brandName}
                </motion.h1>

                {/* Location */}
                <motion.p
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.8, delay: 0.2 }}
                    className="text-sm uppercase tracking-[0.2em] text-white/90 font-medium"
                >
                    {location}
                </motion.p>

                {/* Intro Write-up */}
                <motion.p
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.8, delay: 0.4 }}
                    className="text-lg md:text-xl font-light leading-relaxed text-white max-w-xl drop-shadow-md mt-6"
                >
                    {intro}
                </motion.p>

                {/* Featured In Icons (Placeholders) */}
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.8, delay: 0.6 }}
                    className="flex gap-8 mt-4 items-center justify-center"
                >
                    {featuredIn.map((feature, index) => (
                        <div key={index} className="flex flex-col items-center gap-2 text-white/80">
                            {/* Placeholder Icon Circle */}
                            <div className="w-10 h-10 rounded-full border border-white/30 flex items-center justify-center text-[10px] uppercase">
                                {feature.substring(0, 3)}
                            </div>
                        </div>
                    ))}
                </motion.div>

                {/* Play Video CTA */}
                <motion.button
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.8, delay: 0.8 }}
                    className="mt-8 flex items-center gap-3 px-8 py-3 bg-white/20 backdrop-blur-md border border-white/40 rounded-full text-white hover:bg-white hover:text-black transition-all duration-300 group"
                >
                    <Play size={16} fill="currentColor" className="group-hover:scale-110 transition-transform" />
                    <span className="text-xs uppercase tracking-widest font-medium">Play Brand Film</span>
                </motion.button>

            </div>
        </section>
    )
}
