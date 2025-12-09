'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import Image from 'next/image'
import { ArrowRight } from 'lucide-react'

export default function ExperiencePage() {
    return (
        <div className="min-h-screenw-full h-screen bg-black flex flex-col md:flex-row overflow-hidden">
            <ExperienceColumn
                title="Sample Crate"
                subtitle="Curated Selection"
                description="Order a sample crate at manufacturing cost (up to 5 pieces)."
                image="/images/experience/sample-crate.png"
                href="/experience/sample-crate"
                index={0}
            />
            <ExperienceColumn
                title="Private Showcase"
                subtitle="In-Person Appointment"
                description="Schedule a private viewing with our design team."
                image="/images/experience/private-showcase.png"
                href="/order/appointment"
                index={1}
            />
            <ExperienceColumn
                title="Trade Show"
                subtitle="Exhibition Calendar"
                description="Meet the brand at upcoming international trade shows."
                image="/images/experience/trade-show.png"
                href="/experience/tradeshow"
                index={2}
            />

            {/* Global Header Overlay (Optional, or integrate into columns) */}
            <div className="absolute top-8 left-0 w-full text-center pointer-events-none z-50 mix-blend-difference text-white">
                <h1 className="font-serif text-2xl uppercase tracking-[0.2em] opacity-80">Select Experience</h1>
            </div>
        </div>
    )
}

function ExperienceColumn({ title, subtitle, description, image, href, index }: any) {
    return (
        <Link href={href} className="relative group flex-1 min-h-[33vh] md:min-h-screen border-b md:border-b-0 md:border-r border-white/10 last:border-0 overflow-hidden">
            <motion.div
                className="w-full h-full relative"
                whileHover={{ scale: 1.05 }}
                transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            >
                {/* Background Image */}
                <Image
                    src={image}
                    alt={title}
                    fill
                    className="object-cover transition-all duration-700 grayscale group-hover:grayscale-0 group-hover:scale-105"
                    priority
                />

                {/* Dark Overlay */}
                <div className="absolute inset-0 bg-black/40 group-hover:bg-black/20 transition-colors duration-700" />

                {/* Gradient Gradient */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent opacity-80" />
            </motion.div>

            {/* Content Content */}
            <div className="absolute inset-0 flex flex-col justify-end p-8 md:p-12 z-20">
                <div className="transform transition-transform duration-500 group-hover:-translate-y-4">
                    <p className="text-[10px] uppercase tracking-widest text-white/70 mb-2 font-sans">{subtitle}</p>
                    <h2 className="font-serif !text-3xl md:!text-5xl text-white mb-4 leading-tight">{title}</h2>

                    <div className="h-0 group-hover:h-auto overflow-hidden opacity-0 group-hover:opacity-100 transition-all duration-500 delay-100">
                        <p className="text-sm text-gray-300 font-light max-w-xs leading-relaxed mb-6">
                            {description}
                        </p>
                        <div className="flex items-center gap-2 text-white text-xs uppercase tracking-widest group/btn">
                            Explore <ArrowRight size={14} className="transition-transform group-hover/btn:translate-x-1" />
                        </div>
                    </div>
                </div>
            </div>

            {/* Number Index */}
            <div className="absolute top-8 right-8 text-white/20 font-serif text-6xl md:text-8xl select-none pointer-events-none z-10 font-thin italic">
                0{index + 1}
            </div>
        </Link>
    )
}
