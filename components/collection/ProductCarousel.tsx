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

    const x = useTransform(scrollYProgress, [0, 1], ["0%", "-90%"])
    const smoothX = useSpring(x, { damping: 20, stiffness: 90 })

    return (
        <section ref={targetRef} className="relative h-[600vh] bg-white">
            <div className="sticky top-0 h-screen flex items-center overflow-hidden">
                <motion.div
                    style={{ x: smoothX }}
                    className="flex items-center h-[80vh] pl-[50vw]"
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
        <div className="relative h-full aspect-[2/3] flex-shrink-0 group transition-all duration-500 border-r border-white/10">
            <div className="relative w-full h-full overflow-hidden bg-gray-100">
                <Image
                    src={product.image}
                    alt={product.name}
                    fill
                    className="object-cover transition-transform duration-700 group-hover:scale-105"
                />
                {/* Dimmed overlay that vanishes on hover/active - simulating the focus effect */}
                <div className="absolute inset-0 bg-black/20 group-hover:bg-transparent transition-colors duration-500" />
            </div>
        </div>
    )
}
