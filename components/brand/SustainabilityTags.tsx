'use client'

import { Leaf, Recycle, Heart, Droplets } from 'lucide-react'

interface SustainabilityTagsProps {
    tags: {
        name: string
        icon: 'leaf' | 'recycle' | 'heart' | 'water'
    }[]
}

const ICON_MAP = {
    leaf: Leaf,
    recycle: Recycle,
    heart: Heart,
    water: Droplets
}

export function SustainabilityTags({ tags }: SustainabilityTagsProps) {
    return (
        <section className="bg-white border-t border-gray-100" style={{ padding: '200px 0' }}>
            <div className="max-w-6xl mx-auto px-6">
                <div className="flex flex-wrap justify-center gap-16 md:gap-32">
                    {tags.map((tag, index) => {
                        const Icon = ICON_MAP[tag.icon] || Leaf
                        return (
                            <div key={index} className="flex flex-col items-center gap-6 group">
                                <div className="p-6 rounded-full border border-gray-100 group-hover:border-black transition-colors duration-500">
                                    <Icon size={32} strokeWidth={1} className="text-gray-600 group-hover:text-black transition-colors duration-500" />
                                </div>
                                <span className="text-xs uppercase tracking-[0.2em] text-gray-500 group-hover:text-black transition-colors duration-500">
                                    {tag.name}
                                </span>
                            </div>
                        )
                    })}
                </div>
            </div>
        </section>
    )
}
