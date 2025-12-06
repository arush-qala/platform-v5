'use client'

import Image from 'next/image'
import { motion } from 'framer-motion'

interface VisualStoryProps {
    mediaItems: {
        type: 'image' | 'video'
        src: string
        alt?: string
        aspect?: 'portrait' | 'landscape' | 'square'
    }[]
    processText: string
}

export function VisualStory({ mediaItems, processText }: VisualStoryProps) {
    return (
        <section className="py-48 md:py-64 px-12 md:px-24 bg-white">
            <div className="max-w-[1800px] mx-auto">

                {/* Grid Layout - Mixed Media */}
                <div className="grid grid-cols-1 md:grid-cols-12 gap-y-32 gap-x-24 items-center">

                    {/* Item 1: Portrait (Left) */}
                    <div className="md:col-span-4 relative aspect-[3/4]">
                        <Image
                            src={mediaItems[0].src}
                            alt={mediaItems[0].alt || "Campaign Shot"}
                            fill
                            className="object-cover grayscale hover:grayscale-0 transition-all duration-[1.5s]"
                        />
                    </div>

                    {/* Process Text (Center) - Flanked by images */}
                    <div className="md:col-span-4 flex flex-col justify-center text-center px-8">
                        <motion.div
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 1 }}
                        >
                            <h3 className="text-xs uppercase tracking-[0.3em] text-gray-400 mb-12">The Process</h3>
                            <p className="text-xl md:text-2xl font-light leading-loose text-black tracking-wide">
                                {processText}
                            </p>
                        </motion.div>
                    </div>

                    {/* Item 2: Portrait (Right) */}
                    <div className="md:col-span-4 relative aspect-[3/4]">
                        <Image
                            src={mediaItems[2].src} // Using item 2 for right side
                            alt={mediaItems[2].alt || "Detail Shot"}
                            fill
                            className="object-cover grayscale hover:grayscale-0 transition-all duration-700"
                        />
                    </div>

                    {/* Item 3: Landscape Video/Image (Full Width below) */}
                    <div className="md:col-span-12 relative aspect-[21/9] mt-12">
                        {mediaItems[1].type === 'video' ? (
                            <video
                                autoPlay
                                muted
                                loop
                                playsInline
                                className="w-full h-full object-cover"
                            >
                                <source src={mediaItems[1].src} type="video/mp4" />
                            </video>
                        ) : (
                            <Image
                                src={mediaItems[1].src}
                                alt={mediaItems[1].alt || "Studio Shot"}
                                fill
                                className="object-cover"
                            />
                        )}
                    </div>

                </div>
            </div>
        </section>
    )
}
