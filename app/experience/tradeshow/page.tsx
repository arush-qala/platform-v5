'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import { ArrowLeft, Calendar, MapPin, ExternalLink } from 'lucide-react'

export default function TradeShowPage() {
    const shows = [
        {
            name: "Paris Fashion Week",
            location: "Carrousel du Louvre, Paris",
            date: "Sep 25 - Oct 03, 2024",
            booth: "Hall 3, Booth A-45"
        },
        {
            name: "Coterie New York",
            location: "Javits Center, NYC",
            date: "Sep 19 - Sep 21, 2024",
            booth: "Level 1, Booth 1204"
        },
        {
            name: "Lakmé Fashion Week",
            location: "Jio World Garden, Mumbai",
            date: "Oct 11 - Oct 15, 2024",
            booth: "Sustainable Edit, Booth S-08"
        }
    ]

    return (
        <div className="min-h-screen bg-white">
            <div className="max-w-4xl mx-auto px-8 py-12">
                <Link href="/experience" className="inline-flex items-center gap-2 text-gray-500 hover:text-black mb-12 transition-colors">
                    <ArrowLeft size={18} /> Back to Experience
                </Link>

                <div className="mb-16">
                    <h1 className="font-serif !text-2xl mb-4 text-black">Meet Us at a Tradeshow</h1>
                    <p className="text-gray-500 font-light !text-sm">
                        Experience our collections in person at these upcoming international events.
                        RSVP to schedule a dedicated walkthrough with our sales director.
                    </p>
                </div>

                <div className="grid gap-6">
                    {shows.map((show, idx) => (
                        <motion.div
                            key={idx}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: idx * 0.1 }}
                            className="border border-gray-200 p-8 flex flex-col md:flex-row md:items-center justify-between gap-6 hover:border-black transition-colors group bg-white hover:shadow-lg"
                        >
                            <div>
                                <h3 className="font-serif !text-xl mb-2 text-black">{show.name}</h3>
                                <div className="flex flex-col gap-2 text-gray-500 !text-sm">
                                    <div className="flex items-center gap-2">
                                        <MapPin size={16} />
                                        <span>{show.location}</span>
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <Calendar size={16} />
                                        <span>{show.date}</span>
                                    </div>
                                    <div className="text-xs font-medium text-black mt-2 bg-gray-50 inline-block px-3 py-1 w-fit uppercase tracking-wider">
                                        {show.booth}
                                    </div>
                                </div>
                            </div>

                            <button className="px-6 py-3 border border-black text-black text-xs uppercase tracking-widest hover:bg-black hover:text-white transition-all whitespace-nowrap">
                                RSVP for Meeting
                            </button>
                        </motion.div>
                    ))}
                </div>
            </div>
        </div>
    )
}
