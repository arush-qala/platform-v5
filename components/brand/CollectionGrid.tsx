'use client'

import Image from 'next/image'
import Link from 'next/link'

interface Collection {
    id: string
    name: string
    season: string
    thumbnail: string
}

interface CollectionGridProps {
    collections: Collection[]
}

export function CollectionGrid({ collections }: CollectionGridProps) {
    return (
        <section className="py-48 px-12 md:px-24 bg-white">
            <div className="max-w-[1800px] mx-auto">

                <div className="flex flex-col md:flex-row justify-between items-end mb-48 gap-8">
                    <h2 className="text-7xl md:text-8xl font-light text-black tracking-tight">More Collections</h2>
                    <Link href="/discover" className="text-xs uppercase tracking-[0.25em] text-gray-400 hover:text-black transition-colors border-b border-transparent hover:border-black pb-2 mb-4">
                        View All
                    </Link>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-x-16 gap-y-32">
                    {collections.map((collection) => (
                        <Link key={collection.id} href={`/collection/${collection.id}`} className="group block cursor-pointer">
                            <div className="relative aspect-[3/4] overflow-hidden bg-gray-50 mb-10">
                                <Image
                                    src={collection.thumbnail}
                                    alt={collection.name}
                                    fill
                                    className="object-cover transition-transform duration-[1.5s] ease-out group-hover:scale-105"
                                />
                                {/* Overlay on hover */}
                                <div className="absolute inset-0 bg-white/0 group-hover:bg-white/10 transition-colors duration-500" />
                            </div>

                            <div className="flex flex-col items-start px-2">
                                <h3 className="text-2xl font-light text-black mb-3 group-hover:text-gray-600 transition-colors">
                                    {collection.name}
                                </h3>
                                <p className="text-xs uppercase tracking-[0.25em] text-gray-400">
                                    {collection.season}
                                </p>
                            </div>
                        </Link>
                    ))}
                </div>

            </div>
        </section>
    )
}
