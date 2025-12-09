'use client'

import { motion } from 'framer-motion'
import { X } from 'lucide-react'
import Image from 'next/image'
import { useState } from 'react'

type Props = {
    productName: string
    onClose: () => void
    onConfirm: (size: string) => void
}

const SIZES = ['XS', 'S', 'M', 'L', 'XL', 'XXL']

export default function SizeSelectionModal({ productName, onClose, onConfirm }: Props) {
    const [selectedSize, setSelectedSize] = useState<string | null>(null)

    return (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/60 backdrop-blur-sm p-4">
            <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                className="bg-white w-full max-w-2xl rounded-xl overflow-hidden shadow-2xl relative flex flex-col"
            >
                {/* Close Button */}
                <button
                    onClick={onClose}
                    className="absolute top-4 right-4 p-2 hover:bg-gray-100 rounded-full transition-colors z-10"
                >
                    <X size={20} />
                </button>

                <div className="p-8 flex flex-col gap-8">
                    <div className="text-center">
                        <h2 className="font-serif text-2xl mb-2">Select Size</h2>
                        <p className="text-gray-500 text-sm">For {productName}</p>
                    </div>

                    {/* Size Options */}
                    <div className="flex justify-center gap-2">
                        {SIZES.map((size) => (
                            <button
                                key={size}
                                onClick={() => setSelectedSize(size)}
                                className={`w-12 h-12 flex items-center justify-center border transition-all ${selectedSize === size
                                    ? 'border-gray-900 bg-gray-900 text-white shadow-lg scale-105'
                                    : 'border-gray-200 hover:border-gray-900 text-gray-600'
                                    }`}
                            >
                                {size}
                            </button>
                        ))}
                    </div>

                    {/* Size Guide Image Placeholder */}
                    <div className="relative w-full aspect-[16/9] bg-gray-50 border border-gray-100 rounded-lg overflow-hidden flex items-center justify-center">
                        {/* In a real app, this would be the size chart image */}
                        <div className="text-center">
                            <p className="text-gray-400 text-sm mb-2">Size Chart</p>
                            <div className="grid grid-cols-4 gap-4 text-xs text-gray-300">
                                <div>Size</div><div>Bust</div><div>Waist</div><div>Hip</div>
                                <div>XS</div><div>32"</div><div>24"</div><div>34"</div>
                                <div>S</div><div>34"</div><div>26"</div><div>36"</div>
                                <div>M</div><div>36"</div><div>28"</div><div>38"</div>
                                <div>L</div><div>38"</div><div>30"</div><div>40"</div>
                            </div>
                        </div>
                    </div>

                    {/* Confirm Button */}
                    <button
                        disabled={!selectedSize}
                        onClick={() => selectedSize && onConfirm(selectedSize)}
                        className={`w-full py-4 uppercase tracking-widest text-sm font-medium transition-all ${selectedSize
                            ? 'bg-gray-900 text-white hover:bg-gray-800 shadow-lg'
                            : 'bg-gray-100 text-gray-400 cursor-not-allowed'
                            }`}
                    >
                        Confirm Selection
                    </button>
                </div>
            </motion.div>
        </div>
    )
}
