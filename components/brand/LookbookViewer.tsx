'use client'

import { useRef, useState, useEffect } from 'react'
import { motion, useScroll, useTransform, useSpring } from 'framer-motion'
import Image from 'next/image'

interface LookbookViewerProps {
    images: string[]
    collectionName: string
}

export function LookbookViewer({ images, collectionName }: LookbookViewerProps) {
    const targetRef = useRef<HTMLDivElement>(null)
    const containerRef = useRef<HTMLDivElement>(null)

    // We need a tall container to map vertical scroll to horizontal scroll
    // The height determines how "long" the scroll interaction feels
    const { scrollYProgress } = useScroll({
        target: targetRef,
    })

    // Map vertical scroll (0 to 1) to horizontal x position
    // We want to scroll the entire width of the images container minus the viewport width
    const x = useTransform(scrollYProgress, [0, 1], ["0%", "-85%"])

    // Smooth out the scroll
    const smoothX = useSpring(x, { damping: 15, stiffness: 100 })

    return (
        <section ref={targetRef} className="relative h-[400vh] bg-white">
            {/* Sticky Container */}
            <div className="sticky top-0 h-screen flex flex-col overflow-hidden bg-white">

                {/* Section Header - Now in normal flow to prevent overlap */}
                <div className="w-full px-12 pt-32 pb-24 flex justify-between items-end shrink-0 z-20 bg-white">
                    <div>
                        <h2 className="text-4xl font-serif text-black mb-2">Featured Lookbook</h2>
                        <p className="text-sm uppercase tracking-widest text-gray-500">{collectionName}</p>
                    </div>
                    <div className="text-xs uppercase tracking-widest text-gray-400">
                        Scroll to Explore
                    </div>
                </div>

                {/* Horizontal Scroll Track */}
                <motion.div
                    style={{ x: smoothX }}
                    className="flex gap-12 pl-[10vw] pr-[10vw] items-center h-[70vh]"
                >
                    {images.map((src, index) => (
                        <div
                            key={index}
                            className="relative h-full aspect-[2/3] shrink-0 overflow-hidden group"
                        >
                            <Image
                                src={src}
                                alt={`Look ${index + 1}`}
                                fill
                                className="object-cover transition-transform duration-700 group-hover:scale-105"
                                sizes="(max-height: 70vh) 50vw, 33vw"
                            />
                            <div className="absolute bottom-4 left-4 text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300 text-xs tracking-widest uppercase drop-shadow-md">
                                Look {index + 1}
                            </div>
                        </div>
                    ))}

                    {/* CTA at the end of scroll */}
                    <div className="h-full aspect-[1/2] shrink-0 flex items-center justify-center ml-12">
                        <button className="px-10 py-4 border border-black text-black text-sm uppercase tracking-[0.2em] hover:bg-black hover:text-white transition-all duration-300">
                            Open Collection
                        </button>
                    </div>

                </motion.div>
            </div>
        </section>
    )
}
