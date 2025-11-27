'use client'

import { motion } from 'framer-motion'
import Image from 'next/image'
import { X, ArrowRight } from 'lucide-react'
import { useAssortment } from './AssortmentContext'

type Props = {
    onClose: () => void
    onNavigate: (product: any) => void
}

export default function AssortmentReview({ onClose, onNavigate }: Props) {
    const { items, removeItem } = useAssortment()

    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[90] bg-white/95 backdrop-blur-xl flex flex-col"
        >
            {/* Header */}
            <div className="flex items-center justify-between px-12 py-8 border-b border-gray-100">
                <h2 className="text-3xl font-serif">Your Assortment ({items.length})</h2>
                <button
                    onClick={onClose}
                    className="p-2 hover:bg-gray-100 rounded-full transition-colors"
                >
                    <X size={32} />
                </button>
            </div>

            {/* Grid Content */}
            <div className="flex-1 overflow-y-auto p-12">
                <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-8 max-w-7xl mx-auto">
                    {items.map((item, index) => (
                        <motion.div
                            key={item.id}
                            layoutId={item.id}
                            className="relative aspect-[3/4] bg-gray-50 group cursor-pointer"
                            onClick={() => {
                                onClose()
                                onNavigate(item)
                            }}
                        >
                            <Image
                                src={item.image}
                                alt={item.name}
                                fill
                                className="object-cover"
                            />

                            {/* Sequence Number */}
                            <div className="absolute -top-4 -left-4 w-12 h-12 bg-black text-white flex items-center justify-center text-xl font-serif z-10">
                                {index + 1}
                            </div>

                            {/* Overlay Actions */}
                            <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity flex flex-col justify-between p-4">
                                <div className="self-end">
                                    <button
                                        onClick={(e) => {
                                            e.stopPropagation()
                                            removeItem(item.id)
                                        }}
                                        className="p-2 bg-white rounded-full hover:bg-red-500 hover:text-white transition-colors"
                                    >
                                        <X size={16} />
                                    </button>
                                </div>
                                <div className="text-white text-center">
                                    <p className="font-serif text-lg">{item.name}</p>
                                    <p className="text-sm opacity-80">{item.price}</p>
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>

            {/* Footer Actions */}
            <div className="px-12 py-8 border-t border-gray-100 flex justify-end items-center gap-8 bg-white">
                <div className="text-sm text-gray-500">
                    {items.length}/10 Styles Selected
                </div>
                <button
                    disabled
                    className="px-8 py-4 bg-gray-200 text-gray-400 uppercase tracking-widest text-sm flex items-center gap-2 cursor-not-allowed"
                >
                    Continue <ArrowRight size={16} />
                </button>
            </div>
        </motion.div>
    )
}
