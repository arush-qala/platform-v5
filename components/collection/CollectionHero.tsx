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
                <div className="w-1/2 flex flex-col justify-center pl-12">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, delay: 0.2 }}
                    >
                        <h2 className="text-sm uppercase tracking-[0.3em] text-gray-400 mb-6 font-light">{season}</h2>
                        <h1 className="text-7xl md:text-9xl font-light text-black mb-10 tracking-tight leading-[0.9]">{collectionName}</h1>
                        <p className="text-xl text-gray-600 font-light leading-loose max-w-lg tracking-wide">
                            {description}
                        </p>

                        <div className="mt-20 flex items-center gap-6 text-xs uppercase tracking-[0.25em] text-black/60">
                            <span>Scroll to Explore</span>
                            <div className="w-24 h-[1px] bg-black/40" />
                        </div>
                    </motion.div>
                </div>
            </div>
        </div>
    )
}
