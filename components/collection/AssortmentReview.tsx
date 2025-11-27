'use client'

import Image from 'next/image'
import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { X, GripVertical } from 'lucide-react'

type Product = {
    id: string
    name: string
    price: string
    image: string
    fabric: string
    feels_like: string
}

type Props = {
    products: Product[]
    onClose: () => void
    onRemove: (productId: string) => void
    onProductClick: (productId: string) => void
    onReorder: (products: Product[]) => void
}

export default function AssortmentReview({
    products,
    onClose,
    onRemove,
    onProductClick,
    onReorder,
}: Props) {
    const [draggedIndex, setDraggedIndex] = useState<number | null>(null)

    const handleDragStart = (index: number) => {
        setDraggedIndex(index)
    }

    const handleDragOver = (e: React.DragEvent, index: number) => {
        e.preventDefault()
        if (draggedIndex === null || draggedIndex === index) return

        const newProducts = [...products]
        const draggedProduct = newProducts[draggedIndex]
        newProducts.splice(draggedIndex, 1)
        newProducts.splice(index, 0, draggedProduct)

        setDraggedIndex(index)
        onReorder(newProducts)
    }

    const handleDragEnd = () => {
        setDraggedIndex(null)
    }

    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] bg-white flex flex-col"
        >
            {/* Header */}
            <div className="border-b border-gray-200 px-8 py-6">
                <div className="max-w-7xl mx-auto flex items-center justify-between">
                    <div>
                        <h2 className="text-2xl font-serif text-black">Review Your Assortment</h2>
                        <p className="text-sm text-gray-500 mt-1">
                            {products.length} item{products.length !== 1 ? 's' : ''} selected
                        </p>
                    </div>
                    <button
                        onClick={onClose}
                        className="p-2 hover:bg-gray-100 rounded-full transition-colors"
                    >
                        <X size={24} />
                    </button>
                </div>
            </div>

            {/* Product Grid */}
            <div className="flex-1 overflow-y-auto px-8 py-8">
                <div className="max-w-7xl mx-auto">
                    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
                        <AnimatePresence mode="popLayout">
                            {products.map((product, index) => (
                                <motion.div
                                    key={product.id}
                                    layout
                                    initial={{ scale: 0, opacity: 0 }}
                                    animate={{ scale: 1, opacity: 1 }}
                                    exit={{ scale: 0, opacity: 0 }}
                                    transition={{ duration: 0.2 }}
                                    draggable
                                    onDragStart={() => handleDragStart(index)}
                                    onDragOver={(e) => handleDragOver(e, index)}
                                    onDragEnd={handleDragEnd}
                                    className={`relative group cursor-move ${draggedIndex === index ? 'opacity-50' : ''
                                        }`}
                                >
                                    {/* Drag Handle */}
                                    <div className="absolute top-2 left-2 z-10 opacity-0 group-hover:opacity-100 transition-opacity">
                                        <div className="bg-white/90 backdrop-blur-sm rounded p-1">
                                            <GripVertical size={16} className="text-gray-600" />
                                        </div>
                                    </div>

                                    {/* Remove Button */}
                                    <button
                                        onClick={() => onRemove(product.id)}
                                        className="absolute top-2 right-2 z-10 w-8 h-8 bg-black text-white rounded-full opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center hover:bg-red-500"
                                    >
                                        <X size={16} />
                                    </button>

                                    {/* Product Image */}
                                    <div
                                        onClick={() => onProductClick(product.id)}
                                        className="aspect-[3/4] bg-gray-100 cursor-pointer overflow-hidden"
                                    >
                                        <Image
                                            src={product.image}
                                            alt={product.name}
                                            width={300}
                                            height={400}
                                            className="object-cover w-full h-full hover:scale-105 transition-transform"
                                        />
                                    </div>

                                    {/* Product Info */}
                                    <div className="mt-3">
                                        <h3 className="text-sm font-medium text-black truncate">
                                            {product.name}
                                        </h3>
                                        <p className="text-xs text-gray-500 mt-1">{product.price}</p>
                                    </div>

                                    {/* Index Badge */}
                                    <div className="absolute bottom-2 left-2 w-6 h-6 bg-black text-white text-xs rounded-full flex items-center justify-center">
                                        {index + 1}
                                    </div>
                                </motion.div>
                            ))}
                        </AnimatePresence>
                    </div>

                    {/* Empty State */}
                    {products.length === 0 && (
                        <div className="text-center py-20">
                            <p className="text-gray-400 text-lg">No products selected yet</p>
                            <button
                                onClick={onClose}
                                className="mt-4 text-sm text-black underline underline-offset-4"
                            >
                                Return to browsing
                            </button>
                        </div>
                    )}
                </div>
            </div>

            {/* Footer Actions */}
            <div className="border-t border-gray-200 px-8 py-6 bg-white">
                <div className="max-w-7xl mx-auto flex items-center justify-between">
                    <button
                        onClick={onClose}
                        className="text-sm text-gray-600 hover:text-black transition-colors"
                    >
                        ← Back to browsing
                    </button>

                    <button
                        disabled
                        className="px-8 py-4 bg-gray-300 text-gray-500 uppercase tracking-[0.2em] text-xs cursor-not-allowed"
                    >
                        Continue →
                    </button>
                </div>
            </div>
        </motion.div>
    )
}
