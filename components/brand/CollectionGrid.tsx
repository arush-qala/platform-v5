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
        <section className="py-32 px-6 md:px-12 bg-white">
            <div className="max-w-[1600px] mx-auto">

                <div className="flex justify-between items-end mb-32">
                    <h2 className="text-3xl font-serif text-black">More Collections</h2>
                    <Link href="/discover" className="text-xs uppercase tracking-widest text-gray-500 hover:text-black transition-colors border-b border-transparent hover:border-black pb-1">
                        View All
                    </Link>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-x-8 gap-y-16">
                    {collections.map((collection) => (
                        <Link key={collection.id} href={`/collection/${collection.id}`} className="group block cursor-pointer">
                            <div className="relative aspect-[3/4] overflow-hidden bg-gray-100 mb-6">
                                <Image
                                    src={collection.thumbnail}
                                    alt={collection.name}
                                    fill
                                    className="object-cover transition-transform duration-700 group-hover:scale-105"
                                />
                                {/* Overlay on hover */}
                                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors duration-300" />
                            </div>

                            <div className="flex flex-col items-center text-center">
                                <h3 className="text-lg font-serif text-black mb-1 group-hover:underline underline-offset-4 decoration-1">
                                    {collection.name}
                                </h3>
                                <p className="text-xs uppercase tracking-widest text-gray-500">
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
