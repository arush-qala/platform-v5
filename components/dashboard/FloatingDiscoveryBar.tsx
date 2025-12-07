'use client'

import { useState, useEffect } from 'react'
import { motion, useScroll, useTransform, AnimatePresence } from 'framer-motion'
import { ChevronDown, Search } from 'lucide-react'
import { useRouter } from 'next/navigation'

export function FloatingDiscoveryBar() {
    const [isSticky, setIsSticky] = useState(false)
    const { scrollY } = useScroll()
    const router = useRouter()

    // Threshold to switch to sticky bottom mode
    useEffect(() => {
        return scrollY.onChange((latest) => {
            setIsSticky(latest > 200)
        })
    }, [scrollY])

    return (
        <>
            {/* Placeholder to prevent layout shift when bar becomes fixed */}
            <div className="h-24 w-full mb-12 pointer-events-none" />

            <motion.div
                layout
                initial={{ y: 0 }}
                animate={{
                    y: isSticky ? 0 : 0,
                    position: isSticky ? 'fixed' : 'absolute',
                    bottom: isSticky ? 32 : 'auto',
                    top: isSticky ? 'auto' : 340, // Adjust based on header height
                    left: '50%',
                    transform: 'translateX(-50%)',
                    width: isSticky ? 'auto' : '100%',
                    maxWidth: isSticky ? '90%' : '100%',
                }}
                transition={{ type: 'spring', damping: 20, stiffness: 100 }}
                className={`z-40 flex justify-center ${isSticky ? 'pointer-events-auto' : 'pointer-events-auto'}`}
            >
                <div
                    className={`bg-[#F5F3F0]/90 backdrop-blur-md shadow-sm flex flex-wrap items-center justify-center gap-x-3 gap-y-3 
                    text-[16px] md:text-[18px] leading-relaxed transition-all duration-300
                    ${isSticky ? 'rounded-full px-8 py-3 shadow-lg border border-white/20' : 'rounded-sm px-12 py-6 w-full md:w-auto'}
                    `}
                >
                    <span className="text-[#6b6b6b] font-normal whitespace-nowrap">
                        I want to source for
                    </span>

                    <button className="inline-flex items-center gap-1 font-medium text-[#1a1a1a] border-b border-black/20 hover:border-black transition-colors">
                        Ready-to-wear
                        <ChevronDown size={14} />
                    </button>

                    <span className="text-[#6b6b6b] font-normal whitespace-nowrap">
                        & my boutique is in
                    </span>

                    <button className="inline-flex items-center gap-1 font-medium text-[#1a1a1a] border-b border-black/20 hover:border-black transition-colors">
                        Summer/Spring
                        <ChevronDown size={14} />
                    </button>

                    <button
                        onClick={() => router.push('/discover')}
                        className={`
                            bg-black text-white hover:bg-gray-800 transition-colors uppercase tracking-widest font-medium
                            ${isSticky ? 'ml-4 px-6 py-2 rounded-full text-xs' : 'ml-8 px-8 py-2 border border-black text-sm'}
                        `}
                    >
                        {isSticky ? <Search size={14} /> : 'Find'}
                    </button>
                </div>
            </motion.div>
        </>
    )
}
