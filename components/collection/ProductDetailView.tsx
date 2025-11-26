'use client'

import { useRef } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'
import Image from 'next/image'
import { X, ChevronRight, ChevronLeft } from 'lucide-react'

interface Product {
    id: string
    name: string
    image: string
    price?: string
    fabric?: string
    feels_like?: string
    description?: string
}

interface ProductDetailViewProps {
    product: Product
    prevProduct?: Product
    nextProduct?: Product
    onClose: () => void
    onNavigate: (product: Product) => void
}

export function ProductDetailView({ product, prevProduct, nextProduct, onClose, onNavigate }: ProductDetailViewProps) {
    const containerRef = useRef<HTMLDivElement>(null)
    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start start", "end end"]
    })

    // Animation: Shift images to the left as user scrolls down
    // Shift reduced to -5vw to ensure it stays within the central lane
    const imageX = useTransform(scrollYProgress, [0, 0.1], ["0vw", "-5vw"])
    const detailsOpacity = useTransform(scrollYProgress, [0.05, 0.15], [0, 1])
    const detailsX = useTransform(scrollYProgress, [0.05, 0.15], [50, 0])

    const productImages = [product.image, product.image, product.image]

    return (
        <div ref={containerRef} className="relative min-h-[200vh] bg-white z-50 overflow-x-hidden">

            {/* Close Button */}
            <button
                onClick={onClose}
                className="fixed top-6 right-6 z-[60] p-2 bg-white/80 backdrop-blur-md rounded-full hover:bg-black hover:text-white transition-colors"
            >
                <X size={24} />
            </button>

            {/* Navigation Sidebars - Fixed Width & Overflow Hidden to prevent bleed */}
            {prevProduct && (
                <div
                    onClick={() => onNavigate(prevProduct)}
                    className="fixed left-0 top-0 h-screen w-[15vw] hidden md:flex items-center justify-start pl-4 cursor-pointer z-[55] group hover:bg-white/5 transition-colors overflow-hidden"
                >
                    <div className="absolute left-0 top-1/2 -translate-y-1/2 w-full h-[60vh] opacity-40 group-hover:opacity-60 transition-opacity duration-500 pointer-events-none grayscale group-hover:grayscale-0">
                        {/* -ml-[75%] ensures 75% is off-screen, 25% is visible */}
                        <div className="relative w-full h-full -ml-[75%]">
                            <Image src={prevProduct.image} alt="Prev" fill className="object-cover" />
                        </div>
                    </div>
                    <div className="relative z-10 opacity-0 group-hover:opacity-100 transition-opacity duration-300 ml-8">
                        <ChevronLeft size={32} className="text-black" />
                    </div>
                </div>
            )}

            {nextProduct && (
                <div
                    onClick={() => onNavigate(nextProduct)}
                    className="fixed right-0 top-0 h-screen w-[15vw] hidden md:flex items-center justify-end pr-4 cursor-pointer z-[55] group hover:bg-white/5 transition-colors overflow-hidden"
                >
                    <div className="absolute right-0 top-1/2 -translate-y-1/2 w-full h-[60vh] opacity-40 group-hover:opacity-60 transition-opacity duration-500 pointer-events-none grayscale group-hover:grayscale-0">
                        {/* -mr-[75%] ensures 75% is off-screen, 25% is visible */}
                        <div className="relative w-full h-full -mr-[75%]">
                            <Image src={nextProduct.image} alt="Next" fill className="object-cover" />
                        </div>
                    </div>
                    <div className="relative z-10 opacity-0 group-hover:opacity-100 transition-opacity duration-300 mr-8">
                        <ChevronRight size={32} className="text-black" />
                    </div>
                </div>
            )}

            {/* Main Content Area */}
            {/* Grid layout enforces strict columns: 30vw empty | Content | 30vw empty */}
            {/* This guarantees the content starts at 30vw. With -5vw shift, it goes to 25vw. */}
            {/* Sidebar is 15vw. Gap is 10vw. */}
            <div className="w-full grid grid-cols-[30vw_1fr_30vw] pt-24 relative z-40">

                {/* Image Column - Shifts Left */}
                <motion.div
                    style={{ x: imageX }}
                    className="col-start-2 w-full flex flex-col gap-4 items-center"
                >
                    {productImages.map((img, idx) => (
                        // Max width constrained to 25vw
                        <div key={idx} className="relative w-full max-w-[25vw] aspect-[3/4] bg-gray-100">
                            <Image
                                src={img}
                                alt={`${product.name} - View ${idx + 1}`}
                                fill
                                className="object-cover"
                                priority={idx === 0}
                            />
                        </div>
                    ))}
                </motion.div>

                {/* Details Column - Appears on Right */}
                <motion.div
                    style={{ opacity: detailsOpacity, x: detailsX }}
                    className="fixed top-24 right-[15%] w-[25%] h-[calc(100vh-6rem)] hidden md:flex flex-col gap-8 overflow-y-auto pb-12 no-scrollbar"
                >
                    {/* Product Header */}
                    <div>
                        <h1 className="text-3xl font-serif text-black mb-2">{product.name}</h1>
                        <p className="text-sm text-gray-500 tracking-wide">{product.price}</p>
                    </div>

                    {/* Specs */}
                    <div className="space-y-4 text-sm text-gray-800 font-light">
                        <div className="flex gap-2">
                            <span className="font-medium uppercase tracking-wider text-xs w-24">Fabric:</span>
                            <span>{product.fabric || '100% Organic Silk'}</span>
                        </div>
                        <div className="flex gap-2">
                            <span className="font-medium uppercase tracking-wider text-xs w-24">Feels Like:</span>
                            <span>{product.feels_like || 'Lightweight, fluid drape'}</span>
                        </div>
                        <div className="flex gap-2 items-center">
                            <span className="font-medium uppercase tracking-wider text-xs w-24">Size Guide:</span>
                            <button className="underline underline-offset-4 hover:text-gray-500">View Chart</button>
                        </div>
                    </div>

                    {/* Selection CTA */}
                    <button className="w-full py-4 border border-black text-black uppercase tracking-[0.2em] text-xs hover:bg-black hover:text-white transition-all duration-300">
                        Select This Style
                    </button>

                    {/* Virtual Trial Panel */}
                    <div className="w-full aspect-video bg-gray-50 border border-gray-200 flex flex-col items-center justify-center gap-2 p-4 text-center">
                        <span className="text-xs uppercase tracking-widest text-gray-400">Virtual Trial Panel</span>
                        <p className="text-[10px] text-gray-400">AI Try-On Coming Soon</p>
                    </div>

                    {/* Details Tabs */}
                    <div className="border-t border-gray-200 pt-6">
                        <div className="flex gap-6 mb-4 border-b border-gray-100 pb-2 overflow-x-auto">
                            {['Details', 'Wash & Care', 'Bulk Price', 'Shipping'].map((tab, i) => (
                                <button key={tab} className={`text-xs uppercase tracking-widest whitespace-nowrap pb-1 ${i === 0 ? 'text-black border-b border-black' : 'text-gray-400 hover:text-gray-600'}`}>
                                    {tab}
                                </button>
                            ))}
                        </div>
                        <div className="text-xs text-gray-600 leading-relaxed min-h-[100px]">
                            <p>
                                Meticulously crafted with attention to architectural lines. This piece embodies the collection's ethos of structured fluidity.
                                Designed for the modern wardrobe, offering versatility and timeless elegance.
                            </p>
                        </div>
                    </div>

                </motion.div>
            </div>
        </div>
    )
}
