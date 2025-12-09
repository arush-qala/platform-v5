'use client'

import { useRef, useState, useEffect } from 'react'
import { motion, useScroll, useMotionValueEvent } from 'framer-motion'
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
    const [currentX, setCurrentX] = useState(0)
    const [maxScroll, setMaxScroll] = useState(0)

    // Calculate the maximum scroll distance based on actual content width
    useEffect(() => {
        const calculateMaxScroll = () => {
            if (contentRef.current) {
                const contentWidth = contentRef.current.scrollWidth
                const viewportWidth = window.innerWidth
                // Maximum amount we need to scroll left (in pixels)
                // Add buffer to ensure CTA is fully visible (10% viewport width cushion)
                const maxScrollDistance = contentWidth - viewportWidth + (0.1 * viewportWidth)

                console.log(`LookbookViewer: ${images.length} images, content=${contentWidth}px, viewport=${viewportWidth}px, maxScroll=${maxScrollDistance.toFixed(0)}px`)

                setMaxScroll(maxScrollDistance)
            }
        }

        // Calculate after images are loaded and DOM is ready
        const timer = setTimeout(calculateMaxScroll, 100)

        // Recalculate on window resize
        window.addEventListener('resize', calculateMaxScroll)
        return () => {
            clearTimeout(timer)
            window.removeEventListener('resize', calculateMaxScroll)
        }
    }, [images.length])

    const { scrollYProgress } = useScroll({
        target: targetRef,
    })

    // Update the horizontal position based on scroll progress
    // This approach uses pixel values
    useMotionValueEvent(scrollYProgress, "change", (progress) => {
        const newX = -progress * maxScroll
        setCurrentX(newX)
    })

    // Calculate section height based on number of images
    // More images = more scroll height needed for smooth experience
    // Base: 250vh per 5 images, minimum 500vh
    const sectionHeight = Math.max(500, Math.ceil(images.length / 5) * 250)

    return (
        <section ref={targetRef} className="relative bg-white pt-32" style={{ height: `${sectionHeight}vh` }}>
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
                    animate={{ x: currentX }}
                    transition={{ type: "spring", damping: 40, stiffness: 90 }}
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
