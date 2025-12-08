'use client'

import { useRef, useState, useEffect, useCallback } from 'react'
import { motion, useScroll, useTransform, useSpring } from 'framer-motion'
import Image from 'next/image'
import Link from 'next/link'

interface LookbookViewerProps {
    images: string[]
    collectionName: string
    brandSlug: string
    collectionSlug: string
}

export function LookbookViewer({ images, collectionName, brandSlug, collectionSlug }: LookbookViewerProps) {
    const targetRef = useRef<HTMLDivElement>(null)
    const contentRef = useRef<HTMLDivElement>(null)
    const [scrollEndPercent, setScrollEndPercent] = useState(-100)

    // Calculate the scroll distance dynamically based on actual content width
    const calculateScrollDistance = useCallback(() => {
        if (contentRef.current) {
            const contentWidth = contentRef.current.scrollWidth
            const viewportWidth = window.innerWidth

            // We need to move the content left by (contentWidth - viewportWidth)
            // As a percentage of content width: ((contentWidth - viewportWidth) / contentWidth) * 100
            // Add a small buffer (5%) to ensure the CTA is fully visible
            const scrollPercent = ((contentWidth - viewportWidth) / contentWidth) * 100 + 5

            console.log(`LookbookViewer v4: ${images.length} images, content=${contentWidth}px, viewport=${viewportWidth}px, scroll=${scrollPercent.toFixed(1)}%`)

            setScrollEndPercent(-scrollPercent)
        }
    }, [images.length])

    // Calculate on mount and when images change
    useEffect(() => {
        calculateScrollDistance()

        // Recalculate on window resize
        window.addEventListener('resize', calculateScrollDistance)
        return () => window.removeEventListener('resize', calculateScrollDistance)
    }, [calculateScrollDistance])

    const { scrollYProgress } = useScroll({
        target: targetRef,
    })

    // Map vertical scroll to horizontal movement.
    // The scroll percentage is dynamically calculated based on actual content width
    const x = useTransform(scrollYProgress, [0, 1], ["0%", `${scrollEndPercent}%`])
    const smoothX = useSpring(x, { damping: 40, stiffness: 90 })

    // Calculate section height based on number of images
    // More images = more scroll height needed for smooth experience
    // Base: 300vh per 5 images, minimum 500vh
    const sectionHeight = Math.max(500, Math.ceil(images.length / 5) * 300)

    return (
        <section ref={targetRef} className="relative bg-white pt-32" style={{ height: `${sectionHeight}vh` }}>
            {/* Sticky Container */}
            <div className="sticky top-0 h-screen flex flex-col overflow-hidden bg-white">

                {/* Section Header - Now in normal flow to prevent overlap */}
                <div className="w-full px-12 pt-12 pb-40 flex justify-between items-end shrink-0 z-20 bg-white">
                    <div>
                        <h2 className="text-4xl font-serif text-black mb-2">Featured Lookbook</h2>
                        <p className="text-sm uppercase tracking-widest text-gray-500">{collectionName}</p>
                    </div>
                    <div className="text-xs uppercase tracking-widest text-gray-400">
                        Scroll to Explore ({images.length} looks)
                    </div>
                </div>

                {/* Horizontal Scroll Track */}
                <motion.div
                    ref={contentRef}
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
                        <Link href={`/brands/${brandSlug}/collections/${collectionSlug}`}>
                            <button className="px-10 py-4 border border-black text-black text-sm uppercase tracking-[0.2em] hover:bg-black hover:text-white transition-all duration-300">
                                Open Collection
                            </button>
                        </Link>
                    </div>

                </motion.div>
            </div>
        </section>
    )
}
