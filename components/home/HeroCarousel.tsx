'use client'

import { useState, useEffect } from 'react'
import Image from 'next/image'
import { motion, AnimatePresence } from 'framer-motion'

export interface Slide {
    id: number
    image: string
    title: string
    description: string
    category: string
    season: string
}

interface HeroCarouselProps {
    slides: Slide[]
    currentIndex: number
    onChange: (index: number) => void
}

export function HeroCarousel({ slides, currentIndex, onChange }: HeroCarouselProps) {
    // Auto-advance timer
    useEffect(() => {
        const timer = setInterval(() => {
            onChange((currentIndex + 1) % slides.length)
        }, 4000)

        return () => clearInterval(timer)
    }, [currentIndex, slides.length, onChange])

    return (
        <div className="relative w-full h-screen overflow-hidden bg-black">
            {/* Slides */}
            <AnimatePresence mode="popLayout">
                <motion.div
                    key={currentIndex}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.8, ease: "easeInOut" }}
                    className="absolute inset-0 w-full h-full"
                >
                    <Image
                        src={slides[currentIndex].image}
                        alt={slides[currentIndex].title}
                        fill
                        priority
                        className="object-cover w-full h-full"
                        quality={90}
                    />
                    onClick={() => onChange(index)}
                    className={`w-3 h-3 rounded-full transition-all duration-300 ${index === currentIndex
                        ? 'bg-white scale-110'
                        : 'bg-white/50 hover:bg-white/80'
                        }`}
                    aria-label={`Go to slide ${index + 1}`}
                    />
                ))}
                </div>
        </div>
    )
}
