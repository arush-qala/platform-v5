'use client'

import { useRef } from 'react'
import { motion, useScroll, useTransform, useSpring } from 'framer-motion'
import Image from 'next/image'
import Link from 'next/link'

interface LookbookViewerProps {
    images: string[]
    collectionName: string
}

export function LookbookViewer({ images, collectionName }: LookbookViewerProps) {
    const targetRef = useRef<HTMLDivElement>(null)

    const { scrollYProgress } = useScroll({
        target: targetRef,
    })

    const x = useTransform(scrollYProgress, [0, 1], ["0%", "-85%"])
    const smoothX = useSpring(x, { damping: 15, stiffness: 100 })

    return (
        <section ref={targetRef} className="relative h-[400vh] bg-white pt-32">
            {/* Sticky Container */}
            <div className="sticky top-0 h-screen flex flex-col overflow-hidden bg-white">

                {/* Section Header - Now in normal flow to prevent overlap */}
                <div className="w-full px-12 md:px-24 pt-24 pb-48 flex justify-between items-end shrink-0 z-20 bg-white">
                    <div>
                        <h2 className="text-6xl md:text-8xl font-light text-black mb-6 tracking-tight">Featured Lookbook</h2>
                        <p className="text-sm md:text-base uppercase tracking-[0.3em] text-gray-400 font-light ml-2">{collectionName}</p>
                    </div>
                    <div className="text-xs uppercase tracking-[0.2em] text-gray-300 rotate-90 origin-right translate-x-4">
                        Scroll to Explore
                    </div>
                </div>

                {/* Horizontal Scroll Track */}
                <motion.div
                    style={{ x: smoothX }}
                    className="flex gap-24 pl-[15vw] pr-[15vw] items-center h-[70vh]"
                >
                    {images.map((src, index) => (
                        <div
                            key={index}
                            className="relative h-full aspect-[2/3] shrink-0 overflow-hidden group bg-gray-50"
                        >
                            <Image
                                src={src}
                                alt={`Look ${index + 1}`}
                                fill
                                className="object-cover transition-transform duration-[1.5s] ease-out group-hover:scale-105"
                                sizes="(max-height: 70vh) 50vw, 33vw"
                            />
                            <div className="absolute bottom-6 left-6 text-white opacity-0 group-hover:opacity-100 transition-opacity duration-500 text-xs tracking-[0.3em] uppercase drop-shadow-md">
                                Look {index + 1}
                            </div>
                        </div>
                    ))}

                    {/* CTA at the end of scroll */}
                    <div className="h-full aspect-[1/2] shrink-0 flex items-center justify-center ml-24">
                        <Link href="/collection/c1">
                            <button className="px-16 py-8 border border-black text-black text-xs uppercase tracking-[0.3em] hover:bg-black hover:text-white transition-all duration-500 rounded-none bg-transparent">
                                Open Collection
                            </button>
                        </Link>
                    </div>

                </motion.div>
            </div>
        </section>
    )
}
