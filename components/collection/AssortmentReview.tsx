'use client'

import { motion, Reorder } from 'framer-motion'
import Image from 'next/image'
import { X, ArrowRight } from 'lucide-react'
import { useAssortment } from './AssortmentContext'

type Props = {
    onClose: () => void
    onNavigate: (product: any) => void
}

export default function AssortmentReview({ onClose, onNavigate }: Props) {
    const { items, removeItem, setItems } = useAssortment()

    return (
        <motion.div
            initial={{ y: '100%' }}
            animate={{ y: 0 }}
            exit={{ y: '100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
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

            {/* Reorderable Content */}
            <div className="flex-1 overflow-x-auto overflow-y-hidden flex items-center p-12">
                <Reorder.Group
                    axis="x"
                    values={items}
                    onReorder={setItems}
                    className="flex gap-8 mx-auto"
                >
                    {items.map((item, index) => (
                        <Reorder.Item
                            key={item.id}
                            value={item}
                            className="relative aspect-[3/4] w-[300px] bg-gray-50 group cursor-grab active:cursor-grabbing shadow-lg rounded-lg overflow-hidden"
                            onClick={() => {
                                // Optional: Navigate on click if not dragging
                                // onNavigate(item)
                            }}
                        >
                            <Image
                                src={item.image}
                                alt={item.name}
                                fill
                                className="object-cover pointer-events-none" // Prevent image drag interfering
                            />

                            {/* Number Badge */}
                            <div className="absolute top-4 left-4 w-8 h-8 bg-black/50 backdrop-blur-sm rounded-full flex items-center justify-center z-10">
                                <span className="text-sm font-medium text-white">{index + 1}</span>
                            </div>

                            {/* Remove Button */}
                            <button
                                onClick={(e) => {
                                    e.stopPropagation()
                                    removeItem(item.id)
                                }}
                                className="absolute top-4 right-4 w-8 h-8 bg-black/50 hover:bg-red-500 backdrop-blur-sm rounded-full flex items-center justify-center transition-colors z-10"
                            >
                                <X size={16} className="text-white" />
                            </button>

                            {/* Overlay Info */}
                            <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity flex flex-col justify-end p-6 pointer-events-none">
                                <div className="text-white text-center">
                                    <p className="font-serif text-xl mb-1">{item.name}</p>
                                    <p className="text-sm opacity-90">{item.price}</p>
                                </div>
                            </div>
                        </Reorder.Item>
                    ))}
                </Reorder.Group>
            </div>

            {/* Footer Actions */}
            <div className="px-12 py-8 border-t border-gray-100 flex justify-end items-center gap-8 bg-white">
                <div className="text-sm text-gray-500">
                    Drag to reorder • {items.length}/10 Styles Selected
                </div>
                <button
                    disabled
                    className="px-8 py-4 bg-gray-200 text-gray-400 uppercase tracking-widest text-sm flex items-center gap-2 cursor-not-allowed rounded-full"
                >
                    Continue <ArrowRight size={16} />
                </button>
            </div>
        </motion.div>
    )
}
