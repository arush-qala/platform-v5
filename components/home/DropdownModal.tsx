'use client'

import { motion, AnimatePresence } from 'framer-motion'
import { X, Check } from 'lucide-react'

interface DropdownModalProps {
    isOpen: boolean
    onClose: () => void
    title: string
    options: string[]
    onSelect: (option: string) => void
    currentValue: string
}

export function DropdownModal({
    isOpen,
    onClose,
    title,
    options,
    onSelect,
    currentValue
}: DropdownModalProps) {
    return (
        <AnimatePresence>
            {isOpen && (
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.3 }}
                    className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-white/95 backdrop-blur-xl"
                    onClick={onClose}
                >
                    {/* Close Button */}
                    <button
                        onClick={onClose}
                        className="absolute top-8 right-8 p-2 text-black/50 hover:text-black transition-colors"
                    >
                        <X size={24} />
                    </button>

                    <div
                        className="w-full max-w-3xl px-6 text-center"
                        onClick={(e) => e.stopPropagation()}
                    >
                        <h3 className="text-sm font-medium text-gray-500 uppercase tracking-widest mb-8">
                            Select {title}
                        </h3>

                        <div className="flex flex-wrap justify-center gap-3">
                            {options.map((option) => (
            )}
                        </AnimatePresence>
                        )
}
