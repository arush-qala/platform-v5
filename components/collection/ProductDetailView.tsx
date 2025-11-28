'use client'

import Image from 'next/image'
import { useRef, useState } from 'react'
import { motion, useScroll, useTransform, AnimatePresence } from 'framer-motion'
import { X, ChevronLeft, ChevronRight } from 'lucide-react'
import AssortmentTray from './AssortmentTray'
import AssortmentReview from './AssortmentReview'
import { useAssortment } from './AssortmentContext'

type Product = {
    id: string
    name: string
    price: string
    image: string
    fabric?: string
    feels_like?: string
}

type Props = {
    product: Product
    onClose: () => void
    onNavigate: (product: Product) => void
    prevProduct?: Product
    nextProduct?: Product
}

export default function ProductDetailView({
    product,
    onClose,
    onNavigate,
    prevProduct,
    nextProduct,
}: Props) {
    const containerRef = useRef<HTMLDivElement>(null)
    const [zoomedImage, setZoomedImage] = useState<string | null>(null)
    const [activeTab, setActiveTab] = useState('Details')
    const [showSizeGuide, setShowSizeGuide] = useState(false)
    const [showReview, setShowReview] = useState(false)
    const [flyingImage, setFlyingImage] = useState<{ src: string, x: number, y: number } | null>(null)
    const { addItem } = useAssortment()
    const { scrollYProgress } = useScroll({ target: containerRef })

    // Animation: Shift images to the left as user scrolls down
    // Start: 50vw (Center of screen) -> Requires -6.5vw offset from 56.5vw center of 85vw col
    // Shift: -25vw relative to start
    const imageX = useTransform(scrollYProgress, [0, 0.1], ["-6.5vw", "-31.5vw"])
    const detailsOpacity = useTransform(scrollYProgress, [0.05, 0.15], [0, 1])
    const detailsX = useTransform(scrollYProgress, [0.05, 0.15], [50, 0])

    // Mock multiple images for the vertical stack
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
                    className="fixed left-0 top-0 h-screen w-[4vw] hidden md:flex items-center justify-start pl-4 cursor-pointer z-[55] group hover:bg-white/5 transition-colors overflow-hidden"
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
                    className="fixed right-0 top-0 h-screen w-[4vw] hidden md:flex items-center justify-end pr-4 cursor-pointer z-[55] group hover:bg-white/5 transition-colors overflow-hidden"
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
            {/* Grid layout enforces strict columns: 14vw empty | Content | 1vw empty */}
            {/* This guarantees the content starts at 14vw. */}
            {/* Sidebar is 4vw. Gap is 1vw. */}
            <div className="w-full grid grid-cols-[14vw_1fr_1vw] pt-24 relative z-40">

                {/* Image Column - Shifts Left */}
                <motion.div
                    style={{ x: imageX }}
                    className="col-start-2 w-full flex flex-col gap-4 items-center"
                >
                    {productImages.map((img, idx) => (
                        // Max width constrained to 25vw
                        <div
                            key={idx}
                            onClick={() => setZoomedImage(img)}
                            className="relative w-full max-w-[25vw] aspect-[3/4] bg-gray-100 cursor-zoom-in"
                        >
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
                    className="fixed top-24 right-[15%] w-[40%] h-[calc(100vh-6rem)] hidden md:flex flex-col gap-8 overflow-y-auto pb-12 no-scrollbar"
                >
                    {/* Product Header */}
                    <div>
                        <h1 className="text-lg font-serif text-black mb-2" style={{ fontSize: '30px' }}>{product.name}</h1>
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
                            <button
                                onClick={() => setShowSizeGuide(true)}
                                className="underline underline-offset-4 hover:text-gray-500"
                            >
                                View Chart
                            </button>
                        </div>
                    </div>

                    {/* Selection CTA */}
                    <button
                        onClick={(e) => {
                            const rect = (e.target as HTMLElement).getBoundingClientRect()
                            setFlyingImage({
                                src: product.image,
                                x: rect.left + rect.width / 2,
                                y: rect.top + rect.height / 2
                            })

                            // Delay adding to context to match animation
                            setTimeout(() => {
                                addItem(product)
                                setFlyingImage(null)
                            }, 800)
                        }}
                        style={{ backgroundColor: '#B8956A', color: 'white', borderColor: '#B8956A', padding: '12px 8px' }}
                        className="uppercase tracking-[0.2em] text-sm font-bold hover:opacity-90 transition-all duration-300 border flex items-center justify-center group relative z-10"
                    >
                        <span className="relative z-10">Select This Style</span>
                    </button>

                    {/* Virtual Trial Panel */}
                    <div className="w-full aspect-video bg-gray-50 border border-gray-200 flex flex-col items-center justify-center overflow-hidden relative">
                        <video
                            src="/videos/virtual-try-on.mp4"
                            autoPlay
                            loop
                            muted
                            playsInline
                            className="absolute inset-0 w-full h-full object-cover"
                        />
                        <div className="absolute bottom-2 left-2 bg-white/80 backdrop-blur-sm px-2 py-1">
                            <span className="text-[10px] uppercase tracking-widest text-black">Virtual Trial</span>
                        </div>
                    </div>

                    {/* Details Tabs */}
                    <div className="border-t border-gray-200 pt-6">
                        <div className="flex gap-6 mb-4 border-b border-gray-100 pb-2 overflow-x-auto">
                            {['Details', 'Wash & Care', 'Bulk Price', 'Shipping'].map((tab) => (
                                <button
                                    key={tab}
                                    onClick={() => setActiveTab(tab)}
                                    className={`text-xs uppercase tracking-widest whitespace-nowrap pb-1 transition-colors ${activeTab === tab ? 'text-black border-b border-black' : 'text-gray-400 hover:text-gray-600'}`}
                                >
                                    {tab}
                                </button>
                            ))}
                        </div>
                        <div className="text-xs text-gray-600 leading-relaxed min-h-[100px]">
                            {activeTab === 'Details' && (
                                <p>
                                    Meticulously crafted with attention to architectural lines. This piece embodies the collection's ethos of structured fluidity.
                                    Designed for the modern wardrobe, offering versatility and timeless elegance.
                                </p>
                            )}
                            {activeTab === 'Wash & Care' && (
                                <p>
                                    Dry clean only. Do not bleach. Iron on low heat. Store in a cool, dry place away from direct sunlight to preserve the fabric's integrity.
                                </p>
                            )}
                            {activeTab === 'Bulk Price' && (
                                <div className="space-y-2">
                                    <div className="flex justify-between"><span>10-50 units:</span> <span className="font-medium">$450</span></div>
                                    <div className="flex justify-between"><span>51-100 units:</span> <span className="font-medium">$420</span></div>
                                    <div className="flex justify-between"><span>100+ units:</span> <span className="font-medium">$395</span></div>
                                </div>
                            )}
                            {activeTab === 'Shipping' && (
                                <p>
                                    Global shipping available. Standard delivery: 5-7 business days. Express delivery: 2-3 business days. Duties and taxes calculated at checkout.
                                </p>
                            )}
                        </div>
                    </div>

                </motion.div>
            </div>

            {/* Zoom Modal */}
            <AnimatePresence>
                {zoomedImage && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={() => setZoomedImage(null)}
                        className="fixed inset-0 z-[100] bg-white/95 backdrop-blur-sm flex items-center justify-center cursor-zoom-out"
                    >
                        <div className="relative w-[90vw] h-[90vh]">
                            <Image
                                src={zoomedImage}
                                alt="Zoomed View"
                                fill
                                className="object-contain"
                                quality={100}
                            />
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>

            {/* Size Guide Overlay */}
            <AnimatePresence>
                {showSizeGuide && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={() => setShowSizeGuide(false)}
                        className="fixed inset-0 z-[100] bg-black/80 backdrop-blur-sm flex items-center justify-center cursor-pointer"
                    >
                        <div className="relative w-[90vw] max-w-4xl h-[90vh] flex items-center justify-center">
                            <Image
                                src="/images/size-guide.jpg"
                                alt="Size Guide"
                                fill
                                className="object-contain"
                                quality={100}
                            />
                            <button
                                onClick={() => setShowSizeGuide(false)}
                                className="absolute top-4 right-4 p-2 bg-white/90 backdrop-blur-md rounded-full hover:bg-white transition-colors"
                            >
                                <X size={24} className="text-black" />
                            </button>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
            {/* Assortment Tray */}
            <AssortmentTray onReview={() => setShowReview(true)} />

            {/* Assortment Review Modal */}
            <AnimatePresence>
                {showReview && (
                    <AssortmentReview
                        onClose={() => setShowReview(false)}
                        onNavigate={(p) => {
                            setShowReview(false)
                            onNavigate(p)
                        }}
                    />
                )}
            </AnimatePresence>

            {/* Flying Image Animation */}
            <AnimatePresence>
                {flyingImage && (
                    <motion.div
                        initial={{
                            position: 'fixed',
                            left: flyingImage.x,
                            top: flyingImage.y,
                            width: 200,
                            height: 300,
                            opacity: 1,
                            zIndex: 100,
                            x: '-50%',
                            y: '-50%'
                        }}
                        animate={{
                            left: '50%',
                            top: '100%',
                            width: 50,
                            height: 50,
                            opacity: 0,
                            scale: 0.2
                        }}
                        transition={{ duration: 0.8, ease: "easeInOut" }}
                        className="pointer-events-none"
                    >
                        <Image
                            src={flyingImage.src}
                            alt="Flying Product"
                            fill
                            className="object-cover rounded-md"
                        />
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    )
}
