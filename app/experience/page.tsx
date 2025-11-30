'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { ShoppingBag, Shirt, MapPin, MessageCircle, ArrowRight } from 'lucide-react'
import Link from 'next/link'

export default function ExperiencePage() {
    return (
        <div className="min-h-screen bg-white flex flex-col items-center justify-center relative overflow-hidden">
            {/* Background Pattern (Optional - minimal dots as per wireframe) */}
            <div className="absolute inset-0 bg-[radial-gradient(#e5e7eb_1px,transparent_1px)] [background-size:16px_16px] opacity-30 pointer-events-none" />

            {/* Header */}
            <div className="text-center mb-16 z-10 px-4">
                <h1 className="font-serif text-4xl mb-4 text-black">Experience this brand</h1>
                <p className="text-gray-500 font-light text-lg">Choose how you'd like to experience this brand before placing an order.</p>
            </div>

            {/* Experience Grid */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl w-full px-8 z-10 mb-20">
                <ExperienceCard
                    icon={<ShoppingBag size={48} strokeWidth={1} />}
                    title="Order Sample Crate"
                    description="Order a sample crate @ manf cost (upto 5 pieces)"
                />
                <ExperienceCard
                    icon={<Shirt size={48} strokeWidth={1} />}
                    title="Request Private Showcase"
                    description="Schedule an in-person viewing with the Qala team"
                />
                <ExperienceCard
                    icon={<MapPin size={48} strokeWidth={1} />}
                    title="Meet at a Trade Show"
                    description="Catch the brand at an upcoming Trade show"
                />
            </div>

            {/* Proceed CTA */}
            <div className="w-full max-w-6xl px-8 z-10">
                <Link href="/order" className="block w-full">
                    <motion.div
                        whileHover={{ scale: 1.01 }}
                        whileTap={{ scale: 0.99 }}
                        className="w-full bg-white border border-gray-200 py-8 flex flex-col items-center justify-center gap-2 shadow-sm hover:shadow-md transition-all cursor-pointer group"
                    >
                        <h2 className="font-serif text-2xl text-black group-hover:text-gray-800">Proceed to Order</h2>
                        <p className="text-sm text-gray-400 font-light">Skip physical experience and go straight to quantities and order details</p>
                    </motion.div>
                </Link>
            </div>

            {/* Floating Chat Button */}
            <button className="fixed bottom-8 right-8 bg-white border border-gray-200 shadow-lg p-4 rounded-full flex items-center gap-3 hover:bg-gray-50 transition-colors z-50 group">
                <div className="text-right hidden group-hover:block">
                    <p className="text-[10px] text-gray-400 uppercase tracking-widest">Need help deciding?</p>
                    <p className="text-xs font-medium">Chat with us</p>
                </div>
                <MessageCircle size={24} />
            </button>
        </div>
    )
}

function ExperienceCard({ icon, title, description }: { icon: React.ReactNode, title: string, description: string }) {
    return (
        <motion.div
            className="aspect-square bg-white border border-gray-100 flex flex-col items-center justify-center p-8 text-center cursor-pointer group relative overflow-hidden shadow-sm hover:shadow-xl transition-all duration-500"
        >
            {/* Default State: Icon + Title */}
            <motion.div
                className="flex flex-col items-center gap-6 transition-transform duration-500 group-hover:-translate-y-4"
            >
                <div className="text-gray-800 group-hover:scale-110 transition-transform duration-500">
                    {icon}
                </div>
                <h3 className="font-serif text-xl text-gray-900">{title}</h3>
            </motion.div>

            {/* Hover State: Description Slide Up */}
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileHover={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3 }}
                className="absolute bottom-0 left-0 w-full p-6 bg-white/95 backdrop-blur-sm border-t border-gray-50 translate-y-full group-hover:translate-y-0 transition-transform duration-500 flex flex-col items-center justify-center min-h-[30%]"
            >
                <p className="text-sm text-gray-600 font-light leading-relaxed max-w-[80%]">
                    {description}
                </p>
            </motion.div>
        </motion.div>
    )
}
