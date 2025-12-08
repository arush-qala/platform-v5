import { useRef } from 'react'
import { motion, useScroll, useTransform, useSpring } from 'framer-motion'
import Image from 'next/image'
import { CollectionHero } from './CollectionHero'

interface Product {
    id: string
    name: string
    image: string
    price?: string
}

interface HeroData {
    collectionName: string
    season: string
    description: string
    coverImage: string
}

interface ProductCarouselProps {
    products: Product[]
    onSelect: (product: Product) => void
    heroData: HeroData
}

export function ProductCarousel({ products, onSelect, heroData }: ProductCarouselProps) {
    const targetRef = useRef<HTMLDivElement>(null)
    const { scrollYProgress } = useScroll({
        target: targetRef,
    })

    // Scroll 0 -> 1 maps to moving the rail left.
    // We want to move enough to see the last product.
    // Hero is 100vw. Products are ~30-40vw each.
    // Total width is large. Let's try -85% to start, can be tuned.
    const x = useTransform(scrollYProgress, [0, 1], ["0%", "-85%"])
    const smoothX = useSpring(x, { damping: 40, stiffness: 90 })

    return (
        <section ref={targetRef} className="relative h-[600vh] bg-white">
            <div className="sticky top-0 h-screen flex items-center overflow-hidden">
                <motion.div
                    style={{ x: smoothX }}
                    className="flex items-center h-screen"
                >
                    {/* Hero Section as the first slide */}
                    <div className="w-screen h-screen flex-shrink-0">
                        <CollectionHero {...heroData} />
                    </div>

                    {/* Product Rail */}
                    <div className="flex items-center h-[80vh] pl-12 gap-0">
                        {products.map((product, index) => (
                            <ProductTile
                                key={product.id}
                                product={product}
                                index={index}
                                onClick={() => onSelect(product)}
                            />
                        ))}
                    </div>
                </motion.div>
            </div>
        </section>
    )
}

function ProductTile({ product, index, onClick }: { product: Product; index: number; onClick: () => void }) {
    return (
        <div onClick={onClick} className="relative h-full aspect-[2/3] flex-shrink-0 group transition-all duration-500 border-r border-white/10 cursor-pointer">
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
