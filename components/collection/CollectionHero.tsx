'use client'

import { motion } from 'framer-motion'
import Image from 'next/image'

interface CollectionHeroProps {
    collectionName: string
    season: string
    description: string
    coverImage: string
}

export function CollectionHero({ collectionName, season, description, coverImage }: CollectionHeroProps) {
    return (
        <div className="w-screen h-screen flex-shrink-0 flex items-center justify-center bg-white relative overflow-hidden">
            <div className="flex w-full max-w-[90%] md:max-w-[80%] h-[80%] gap-12 md:gap-24 items-center">

                {/* Left: Thumbnail */}
                <div className="w-1/2 h-full relative">
                    <Image
                        src={coverImage}
                        alt={collectionName}
                        fill
                        className="object-cover"
                        priority
                    />
                </div>

                {/* Right: Info */}
                <div className="w-1/2 flex flex-col justify-center">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, delay: 0.2 }}
                    >
                        <h2 className="text-sm uppercase tracking-[0.2em] text-gray-500 mb-4">{season}</h2>
                        <h1 className="text-5xl md:text-7xl font-serif text-black mb-8">{collectionName}</h1>
                        <p className="text-lg text-gray-600 font-serif leading-relaxed max-w-md">
                            {description}
                        </p>

                        <div className="mt-12 flex items-center gap-4 text-xs uppercase tracking-widest text-black">
                            <span>Scroll to Explore</span>
                            <div className="w-12 h-[1px] bg-black" />
                        </div>
                    </motion.div>
                </div>
            </div>
        </div>
    )
}
