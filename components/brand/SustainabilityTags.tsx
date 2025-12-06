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
        <section className="bg-white" style={{ padding: '240px 0' }}>
            <div className="w-full flex justify-center px-12">
                <div className="flex flex-wrap justify-center items-center gap-24 md:gap-40 max-w-6xl">
                    {tags.map((tag, index) => {
                        const Icon = ICON_MAP[tag.icon] || Leaf
                        return (
                            <div key={index} className="flex flex-col items-center gap-8 group">
                                <div className="p-10 border border-gray-200 group-hover:border-black transition-all duration-700 bg-transparent">
                                    <Icon size={32} strokeWidth={0.75} className="text-gray-400 group-hover:text-black transition-colors duration-700" />
                                </div>
                                <span className="text-xs uppercase tracking-[0.3em] text-gray-400 group-hover:text-black transition-colors duration-700">
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
