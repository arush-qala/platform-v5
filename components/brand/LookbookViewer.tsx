'use client'

import { useRef, useState, useEffect } from 'react'
import { motion, useScroll, useMotionValue, useSpring } from 'framer-motion'
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
    const [sectionHeight, setSectionHeight] = useState(500)
    const [maxScrollPx, setMaxScrollPx] = useState(0)

    // Motion value for x position (in pixels)
    const xValue = useMotionValue(0)
    const smoothX = useSpring(xValue, { damping: 30, stiffness: 100 })

    // Calculate dimensions based on actual content
    useEffect(() => {
        const calculateDimensions = () => {
            if (contentRef.current) {
                const contentWidth = contentRef.current.scrollWidth
                const viewportWidth = window.innerWidth
                const viewportHeight = window.innerHeight

                // Calculate how much we need to scroll horizontally (in pixels)
                // Add buffer to ensure CTA is fully visible
                const scrollDistancePx = Math.max(0, contentWidth - viewportWidth + 150)

                // Calculate section height based on number of images
                // Target: ~100vh per 4-5 images for a comfortable scroll pace
                // With ~41 images, that's about 800-1000vh total
                // But we also need to ensure scroll completes when horizontal content ends

                // Alternative: base on scroll distance in "screens" worth
                // If we're scrolling 10704px horizontally, and viewport is ~1156px
                // That's about 9-10 "screens" of horizontal content
                // Map that to roughly 6-8vh per "screen" of horizontal content
                // So section height = (scrollDistance / viewportWidth) * 80vh

                const horizontalScreens = scrollDistancePx / viewportWidth
                // 80vh of vertical scrolling per horizontal screen of content
                // This gives a comfortable 1:0.8 ratio (more horizontal movement per scroll)
                const calculatedHeight = Math.max(400, Math.ceil(horizontalScreens * 80))

                console.log(`LookbookViewer v9: ${images.length} images`)
                console.log(`  Content: ${contentWidth}px, Viewport: ${viewportWidth}x${viewportHeight}`)
                console.log(`  Horizontal screens: ${horizontalScreens.toFixed(1)}, Max scroll: ${scrollDistancePx}px`)
                console.log(`  Section height: ${calculatedHeight}vh`)

                setMaxScrollPx(scrollDistancePx)
                setSectionHeight(calculatedHeight)
            }
        }

        // Calculate after images are loaded and content rendered
        const timer = setTimeout(calculateDimensions, 300)

        // Recalculate on window resize
        window.addEventListener('resize', calculateDimensions)
        return () => {
            clearTimeout(timer)
            window.removeEventListener('resize', calculateDimensions)
        }
    }, [images.length])

    const { scrollYProgress } = useScroll({
        target: targetRef,
    })

    // Subscribe to scroll progress and update x position
    useEffect(() => {
        const unsubscribe = scrollYProgress.on("change", (progress) => {
            // Map scroll progress (0-1) to horizontal position (0 to -maxScrollPx)
            const newX = -progress * maxScrollPx
            xValue.set(newX)
        })

        return () => unsubscribe()
    }, [scrollYProgress, maxScrollPx, xValue])

    return (
        <section
            ref={targetRef}
            className="relative bg-white pt-32"
            style={{ height: `${sectionHeight}vh` }}
        >
            {/* Sticky Container */}
            <div className="sticky top-0 h-screen flex flex-col overflow-hidden bg-white">

                {/* Section Header */}
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
