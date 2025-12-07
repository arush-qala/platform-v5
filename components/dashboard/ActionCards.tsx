'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import { ArrowRight, Package, Calendar, FileText } from 'lucide-react'

export function ActionCards() {
    const cards = [
        {
            title: "My Assortments",
            description: "View and edit your curated collections and sample requests.",
            icon: <Package size={32} strokeWidth={1} />,
            href: "/experience/sample-crate",
            image: "https://images.unsplash.com/photo-1441986300917-64674bd600d8?q=80&w=800&auto=format&fit=crop"
        },
        {
            title: "My Appointments",
            description: "Manage your upcoming design consultations and showroom visits.",
            icon: <Calendar size={32} strokeWidth={1} />,
            href: "/dashboard/appointments", // Placeholder route
            image: "https://images.unsplash.com/photo-1551232864-3f52236a2629?q=80&w=800&auto=format&fit=crop"
        },
        {
            title: "My Orders",
            description: "Track status of your production orders and invoices.",
            icon: <FileText size={32} strokeWidth={1} />,
            href: "/dashboard/orders", // Placeholder route
            image: "https://images.unsplash.com/photo-1553531580-652231dae097?q=80&w=800&auto=format&fit=crop"
        }
    ]

    return (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 w-full mb-20">
            {cards.map((card, idx) => (
                <Link href={card.href} key={idx} className="block group">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ delay: idx * 0.1 }}
                        className="relative h-[400px] w-full overflow-hidden bg-gray-100 relative"
                    >
                        <div
                            className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-105"
                            style={{ backgroundImage: `url(${card.image})` }}
                        />
                        <div className="absolute inset-0 bg-black/30 group-hover:bg-black/50 transition-colors" />

                        <div className="absolute bottom-0 left-0 p-8 w-full text-white">
                            <div className="mb-4 opacity-80">{card.icon}</div>
                            <h3 className="font-serif text-2xl mb-2">{card.title}</h3>
                            <p className="text-white/80 text-sm font-light mb-6 opacity-0 group-hover:opacity-100 transition-opacity duration-300 transform translate-y-4 group-hover:translate-y-0">
                                {card.description}
                            </p>
                            <div className="flex items-center gap-2 text-xs uppercase tracking-widest font-medium">
                                View Details <ArrowRight size={14} />
                            </div>
                        </div>
                    </motion.div>
                </Link>
            ))}
        </div>
    )
}
