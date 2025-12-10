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
        <div className="min-h-screen bg-[#F9F8F6] font-sans text-[#1a1a1a]">
            {/* Header */}
            <div className="bg-[#0f172a] text-[#f9f8f6] py-16 px-8 relative overflow-hidden">
                <div className="absolute inset-0 opacity-10" style={{ backgroundImage: 'radial-gradient(circle at 2px 2px, rgba(255,255,255,0.15) 1px, transparent 0)', backgroundSize: '40px 40px' }}></div>
                <div className="max-w-4xl mx-auto relative z-10 flex flex-col md:flex-row justify-between items-start md:items-end gap-6">
                    <div>
                        <Link href="/experience" className="inline-flex items-center gap-2 text-[#f9f8f6]/60 hover:text-white mb-8 transition-colors text-xs uppercase tracking-widest">
                            <ArrowLeft size={14} /> Back to Experience
                        </Link>
                        <h1 className="font-serif text-4xl md:text-5xl leading-tight">World Tour <br /><span className="italic text-[#d4af37]">2024-25</span></h1>
                    </div>
                    <p className="text-[#f9f8f6]/70 max-w-sm font-light text-sm leading-relaxed">
                        Join us at the world's premier fashion trade events. Experience the tactile quality of our collections in person.
                    </p>
                </div>
            </div>

            <div className="max-w-4xl mx-auto px-8 py-16 -mt-8 relative z-20">
                <div className="grid gap-8">
                    {shows.map((show, idx) => (
                        <motion.div
                            key={idx}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: idx * 0.1 }}
                            className="bg-white p-0 shadow-xl flex flex-col md:flex-row group transition-all duration-500 hover:-translate-y-1"
                        >
                            {/* Left Ticket Stub style */}
                            <div className="bg-[#1a1a1a] text-white p-8 md:w-32 flex flex-row md:flex-col justify-between items-center md:items-start border-b md:border-b-0 md:border-r border-white/10 relative">
                                <div className="text-2xl font-serif text-[#d4af37]">0{idx + 1}</div>
                                <div className="transform md:-rotate-90 md:origin-bottom-left md:translate-x-8 text-[10px] uppercase tracking-[0.3em] whitespace-nowrap opacity-60">
                                    International Exhibition
                                </div>
                                <div className="w-1.5 h-1.5 rounded-full bg-[#d4af37] hidden md:block"></div>
                            </div>

                            {/* Main Content */}
                            <div className="flex-1 p-8 md:p-10 flex flex-col md:flex-row gap-8 justify-between items-start md:items-center">
                                <div>
                                    <div className="flex items-center gap-3 mb-3 text-[#d4af37] text-xs uppercase tracking-widest font-medium">
                                        <Calendar size={14} />
                                        {show.date}
                                    </div>
                                    <h3 className="font-serif text-3xl mb-4 text-[#1a1a1a]">{show.name}</h3>

                                    <div className="space-y-2">
                                        <div className="flex items-start gap-3 text-[#666]">
                                            <MapPin size={16} className="mt-0.5" />
                                            <div>
                                                <p className="font-medium text-[#1a1a1a]">{show.location}</p>
                                                <p className="text-xs text-[#999] mt-1">{show.booth}</p>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <button className="self-start md:self-center px-8 py-4 border border-[#1a1a1a] text-[#1a1a1a] text-[10px] uppercase tracking-[0.2em] hover:bg-[#1a1a1a] hover:text-white transition-all duration-300 min-w-[140px] text-center">
                                    RSVP
                                </button>
                            </div>
                        </motion.div>
                    ))}
                </div>

                <div className="mt-16 text-center">
                    <p className="font-serif text-xl italic text-[#999]">More dates to be announced soon.</p>
                </div>
            </div>
        </div>
    )
}
