'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import Image from 'next/image'
import { ArrowRight } from 'lucide-react'

export default function ExperiencePage() {
    return (
        <div className="relative w-full h-screen bg-[#0a0a09] flex flex-col md:flex-row overflow-hidden">
            {/* Noise Texture Overlay */}
            <div className="fixed inset-0 pointer-events-none z-50 opacity-[0.03] mix-blend-overlay">
                <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
                    <filter id="noiseFilter">
                        <feTurbulence type="fractalNoise" baseFrequency="0.65" numOctaves="3" stitchTiles="stitch" />
                    </filter>
                    <rect width="100%" height="100%" filter="url(#noiseFilter)" />
                </svg>
            </div>

            {/* Global Header */}
            <div className="absolute top-12 left-0 w-full flex justify-center pointer-events-none z-40">
                <motion.div
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 1, delay: 0.5 }}
                    className="px-12 py-6 bg-[#0a0a09]/80 backdrop-blur-md border border-white/20 rounded-sm shadow-2xl"
                >
                    <h1 className="font-serif text-xl md:text-2xl uppercase tracking-[0.3em] text-[#e8e6e1] opacity-90">
                        Select Experience
                    </h1>
                </motion.div>
            </div>

            <ExperienceColumn
                title="Sample Crate"
                subtitle="Curated Selection"
                description="Order a sample crate at manufacturing cost (up to 5 pieces)."
                image="/images/experience/sample-crate.png"
                href="/experience/sample-crate"
                ctaText="Explore"
                index={0}
            />

            <ExperienceColumn
                title="Place Order"
                subtitle="Wholesale Assortment"
                description="Browse detailed line sheets and place production orders directly."
                image="https://images.unsplash.com/photo-1558769132-cb1aea458c5e?q=80&w=2000&auto=format&fit=crop" // Reliable Fashion clothing rack image
                href="/order"
                ctaText="Begin"
                index={1}
            />

            <ExperienceColumn
                title="Private Showcase"
                subtitle="In-Person Appointment"
                description="Schedule a private viewing with our design team."
                image="/images/experience/private-showcase.png"
                href="/order/appointment"
                ctaText="Book now"
                index={2}
            />

            <ExperienceColumn
                title="Trade Show"
                subtitle="Exhibition Calendar"
                description="Meet the brand at upcoming international trade shows."
                image="/images/experience/trade-show.png"
                href="/experience/tradeshow"
                ctaText="View event"
                index={3}
            />
        </div>
    )
}

function ExperienceColumn({ title, subtitle, description, image, href, index, ctaText }: any) {
    return (
        <Link href={href} className="relative group flex-1 min-h-[25vh] md:min-h-screen border-b md:border-b-0 md:border-r border-white/5 last:border-0 overflow-hidden">
            <motion.div
                className="w-full h-full relative"
                initial={{ opacity: 0, scale: 1.1 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1], delay: index * 0.1 }}
                whileHover={{ scale: 1.05 }}
            >
                {/* Background Image */}
                <Image
                    src={image}
                    alt={title}
                    fill
                    className="object-cover transition-all duration-1000 grayscale group-hover:grayscale-0 group-hover:scale-105"
                    priority
                />

                {/* Dark Overlay - Luxury Tint */}
                <div className="absolute inset-0 bg-[#0a0a09]/50 group-hover:bg-[#0a0a09]/30 transition-colors duration-700" />

                {/* Gradient */}
                <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a09] via-[#0a0a09]/40 to-transparent opacity-90" />
            </motion.div>

            {/* Content */}
            <div className="absolute inset-0 flex flex-col justify-end p-8 md:p-12 z-20">
                <div className="transform transition-transform duration-700 group-hover:-translate-y-4">
                    <p className="text-[10px] uppercase tracking-widest text-[#B8956A] mb-3 font-sans opacity-90">{subtitle}</p>
                    <h2 className="font-serif text-3xl md:text-5xl text-[#f2f0eb] mb-5 leading-tight">{title}</h2>

                    <div className="h-0 group-hover:h-auto overflow-hidden opacity-0 group-hover:opacity-100 transition-all duration-700 delay-100 ease-out">
                        <p className="text-sm text-[#adaaa5] font-light max-w-xs leading-relaxed mb-6">
                            {description}
                        </p>

                        {/* Glassmorphic Button */}
                        <div className="inline-flex items-center gap-3 px-6 py-3 rounded-full backdrop-blur-md bg-white/5 border border-white/10 text-white text-xs uppercase tracking-widest transition-all duration-500 hover:bg-white/10 hover:border-white/30 shadow-lg hover:shadow-xl group/btn">
                            {ctaText} <ArrowRight size={14} className="text-[#B8956A] transition-transform group-hover/btn:translate-x-1" />
                        </div>
                    </div>
                </div>
            </div>

            {/* Number Index */}
            <div className="absolute top-8 right-8 text-white/5 font-serif text-6xl md:text-7xl select-none pointer-events-none z-10 font-thin italic">
                0{index + 1}
            </div>
        </Link>
    )
}
