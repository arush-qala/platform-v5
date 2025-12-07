'use client'

import { motion } from 'framer-motion'
import Image from 'next/image'
import Link from 'next/link'

export function Recommendations() {
    // Mock Data for "Recommended For You"
    const recommendations = [
        {
            id: 'rec1',
            brand: 'Doodlage',
            name: 'Upcycled Patchwork Jacket',
            image: '/images/products/product1.jpg', // Ensure this exists or use remote
            price: '$180',
            slug: 'doodlage-collection'
        },
        {
            id: 'rec2',
            brand: 'Label Two',
            name: 'Linen Summer Dress',
            image: '/images/products/product2.jpg',
            price: '$220',
            slug: 'doodlage-collection-label-two'
        },
        {
            id: 'rec3',
            brand: 'Label Three',
            name: 'Structured Trench',
            image: '/images/products/product3.jpg',
            price: '$350',
            slug: 'doodlage-collection-label-three'
        }
    ]

    return (
        <div className="w-full">
            <div className="flex items-center justify-between mb-8">
                <h2 className="font-serif text-3xl">Curated For You</h2>
                <Link href="/discover" className="text-sm border-b border-black pb-1 hover:opacity-70">
                    View All Recommendations
                </Link>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-x-8 gap-y-12">
                {recommendations.map((item, idx) => (
                    <Link href={`/brands/doodlage/collections/${item.slug}`} key={item.id}>
                        <motion.div
                            initial={{ opacity: 0 }}
                            whileInView={{ opacity: 1 }}
                            transition={{ delay: idx * 0.1 }}
                            className="group cursor-pointer"
                        >
                            <div className="relative aspect-[3/4] overflow-hidden bg-gray-100 mb-4">
                                <Image
                                    src={item.image}
                                    alt={item.name}
                                    fill
                                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                                />
                                <div className="absolute top-4 left-4 bg-white/90 px-3 py-1 text-[10px] uppercase tracking-widest">
                                    New Arrival
                                </div>
                            </div>
                            <h4 className="text-xs uppercase tracking-widest text-gray-500 mb-1">{item.brand}</h4>
                            <h3 className="font-serif text-lg text-black mb-1">{item.name}</h3>
                            <p className="text-sm font-medium">{item.price}</p>
                        </motion.div>
                    </Link>
                ))}
            </div>
        </div>
    )
}
