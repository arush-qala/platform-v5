'use client'

import { useRef } from 'react'
import { motion, useScroll, useTransform, useSpring } from 'framer-motion'
import Image from 'next/image'

interface Product {
    id: string
    name: string
    image: string
    price?: string
}

interface ProductCarouselProps {
    products: Product[]
}

export function ProductCarousel({ products }: ProductCarouselProps) {
    const targetRef = useRef<HTMLDivElement>(null)
    const { scrollYProgress } = useScroll({
        target: targetRef,
    })

    // Map vertical scroll to horizontal movement
    // We start after the hero section (which takes up 100vh)
    // The total scrollable distance needs to accommodate all products
'use client'

import { useRef } from 'react'
import { motion, useScroll, useTransform, useSpring } from 'framer-motion'
import Image from 'next/image'

interface Product {
    id: string
    name: string
    image: string
    price?: string
}

interface ProductCarouselProps {
    products: Product[]
}

export function ProductCarousel({ products }: ProductCarouselProps) {
    const targetRef = useRef<HTMLDivElement>(null)
    const { scrollYProgress } = useScroll({
        target: targetRef,
    })

    // Map vertical scroll to horizontal movement
    // We start after the hero section (which takes up 100vh)
    // The total scrollable distance needs to accommodate all products
    const x = useTransform(scrollYProgress, [0, 1], ["0%", "-90%"])
    const smoothX = useSpring(x, { damping: 20, stiffness: 90 })

    return (
        <section ref={targetRef} className="relative h-[600vh] bg-white">
            <div className="sticky top-0 h-screen flex items-center overflow-hidden">
                <motion.div
                    style={{ x: smoothX }}
                    className="flex items-center pl-[50vw]" // Start with padding to center the first item relative to scroll
                >
                    {products.map((product, index) => (
                        <ProductTile key={product.id} product={product} index={index} />
                    ))}
                </motion.div>
            </div>
        </section>
    )
}

function ProductTile({ product, index }: { product: Product; index: number }) {
    return (
        <div className="relative w-[300px] md:w-[400px] aspect-[3/4] flex-shrink-0 group transition-all duration-500">
            <div className="relative w-full h-full overflow-hidden bg-gray-100">
                <Image
                    src={product.image}
                    alt={product.name}
                    fill
                    className="object-cover transition-transform duration-700 group-hover:scale-105"
                />
                {/* Overlay for non-hover state (optional, if we want "dimmed" effect by default) */}
                {/* <div className="absolute inset-0 bg-white/20 group-hover:bg-transparent transition-colors duration-500" /> */}
            </div>
        </div>
    )
}
