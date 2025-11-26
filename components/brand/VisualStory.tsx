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
        <section className="py-32 px-6 md:px-12 bg-white">
            <div className="max-w-[1600px] mx-auto">

                {/* Grid Layout - Mixed Media */}
                <div className="grid grid-cols-1 md:grid-cols-12 gap-y-24 gap-x-12 items-center">

                    {/* Item 1: Large Portrait (Left) */}
                    <div className="md:col-span-5 relative aspect-[3/4]">
                        <Image
                            src={mediaItems[0].src}
                            alt={mediaItems[0].alt || "Campaign Shot"}
                            fill
                            className="object-cover grayscale hover:grayscale-0 transition-all duration-700"
                        />
                    </div>

                    {/* Process Text (Center/Right) - Negative Space Heavy */}
                    <div className="md:col-span-7 md:pl-20 flex flex-col justify-center">
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.8 }}
                            className="max-w-md"
                        >
                            <h3 className="text-xs uppercase tracking-[0.2em] text-gray-400 mb-8">The Process</h3>
                            <p className="text-2xl md:text-3xl font-serif leading-relaxed text-black">
                                {processText}
                            </p>
                        </motion.div>
                    </div>

                    {/* Item 2: Landscape Video/Image (Full Width or Large Span) */}
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

                    {/* Item 3 & 4: Side by Side with offset */}
                    <div className="md:col-span-6 relative aspect-square md:mt-20">
                        <Image
                            src={mediaItems[2].src}
                            alt={mediaItems[2].alt || "Detail Shot"}
                            fill
                            className="object-cover grayscale hover:grayscale-0 transition-all duration-700"
                        />
                    </div>

                    <div className="md:col-span-5 md:col-start-8 relative aspect-[3/4] md:-mt-20">
                        <Image
                            src={mediaItems[3].src}
                            alt={mediaItems[3].alt || "BTS Shot"}
                            fill
                            className="object-cover grayscale hover:grayscale-0 transition-all duration-700"
                        />
                    </div>

                </div>
            </div>
        </section>
    )
}
