'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ArrowLeft, Calendar, MapPin, X, Check, ArrowRight } from 'lucide-react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'

export default function TradeShowPage() {
    const router = useRouter()
    const [selectedShow, setSelectedShow] = useState<any | null>(null)
    const [rsvpStep, setRsvpStep] = useState(0) // 0: None, 1: Calendar, 2: Success

    const tradeShows = [
        {
            id: 'pfw-26',
            name: "Paris Fashion Week",
            season: "Spring/Summer 2026",
            date: "Sep 28 - Oct 3, 2025",
            location: "Palais de Tokyo, Paris",
            venue: "Gallery 3, Booth 42",
            collection: "Qala SS26 Main",
            image: "https://images.unsplash.com/photo-1500917293048-f4605911dd46?q=80&w=2970&auto=format&fit=crop"
        },
        {
            id: 'coterie-26',
            name: "Coterie New York",
            season: "Spring/Summer 2026",
            date: "Sep 19 - Sep 21, 2025",
            location: "Javits Center, NYC",
            venue: "Level 3, Booth 104",
            collection: "Qala SS26 Edit",
            image: "https://images.unsplash.com/photo-1549890632-15f532b27072?q=80&w=2692&auto=format&fit=crop"
        }
    ]

    const handleRSVP = (show: any) => {
        setSelectedShow(show)
        setRsvpStep(1)
    }

    const handleSkipCalendar = () => {
        setRsvpStep(2)
    }

    // Handle Redirect after Success
    useEffect(() => {
        if (rsvpStep === 2 && selectedShow) {
            const timer = setTimeout(() => {
                const params = new URLSearchParams()
                params.set('rsvp_confirmed', 'true')
                params.set('show_name', selectedShow.name)
                router.push(`/dashboard/assortments?${params.toString()}`)
            }, 3000)
            return () => clearTimeout(timer)
        }
    }, [rsvpStep, selectedShow, router])

    return (
        <div className="min-h-screen bg-black text-white">
            {/* Nav */}
            <div className="fixed top-0 left-0 w-full p-8 z-50 flex justify-between items-center mix-blend-difference">
                <Link href="/experience" className="flex items-center gap-2 text-sm uppercase tracking-widest hover:text-gray-300 transition-colors">
                    <ArrowLeft size={16} />
                    Back
                </Link>
                <div className="font-serif text-xl tracking-widest">QALA</div>
                <div className="w-16" /> {/* Spacer */}
            </div>

            {/* Split Layout Content */}
            <div className="flex flex-col">
                {tradeShows.map((show, idx) => (
                    <div key={show.id} className="min-h-[80vh] flex flex-col md:flex-row border-b border-gray-900 group relative">
                        {/* Image Section (Alternating) */}
                        <div className={`w-full md:w-1/2 h-[50vh] md:h-auto relative overflow-hidden ${idx % 2 === 1 ? 'md:order-2' : ''}`}>
                            <div className="absolute inset-0 bg-gray-900">
                                <motion.img
                                    src={show.image}
                                    alt={show.name}
                                    className="w-full h-full object-cover opacity-60 group-hover:opacity-80 group-hover:scale-105 transition-all duration-1000 grayscale group-hover:grayscale-0"
                                />
                            </div>
                        </div>

                        {/* Content Section */}
                        <div className="w-full md:w-1/2 p-16 md:p-32 flex flex-col justify-center gap-12 bg-black">
                            <div className="space-y-4">
                                <span className="text-xs uppercase tracking-[0.2em] text-gray-500">{show.season}</span>
                                <h2 className="font-serif text-5xl md:text-7xl font-light leading-[0.9]">{show.name}</h2>
                            </div>

                            <div className="space-y-6 text-sm font-light tracking-wide text-gray-400">
                                <div className="flex items-center gap-4">
                                    <Calendar size={18} />
                                    <span>{show.date}</span>
                                </div>
                                <div className="flex items-start gap-4">
                                    <MapPin size={18} className="mt-1" />
                                    <div>
                                        <p className="text-white">{show.location}</p>
                                        <p>{show.venue}</p>
                                    </div>
                                </div>
                                <div className="pt-4 border-t border-gray-900">
                                    <span className="uppercase text-xs tracking-widest text-gray-600 block mb-2">Showcasing</span>
                                    <p className="text-white text-lg font-serif italic">{show.collection}</p>
                                </div>
                            </div>

                            <button
                                onClick={() => handleRSVP(show)}
                                className="group/btn relative w-fit py-4 px-12 border border-white overflow-hidden rounded-none"
                            >
                                <span className="relative z-10 text-sm uppercase tracking-[0.2em] group-hover/btn:text-black transition-colors duration-500">
                                    RSVP Now
                                </span>
                                <div className="absolute inset-0 bg-white translate-y-full group-hover/btn:translate-y-0 transition-transform duration-500 will-change-transform" />
                            </button>
                        </div>
                    </div>
                ))}
            </div>

            {/* RSVP Modal Overlay */}
            <AnimatePresence>
                {rsvpStep > 0 && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 z-[100] bg-black/90 backdrop-blur-md flex items-center justify-center p-4"
                    >
                        <div className="max-w-xl w-full bg-white text-black p-12 relative">
                            {/* Close Button */}
                            {rsvpStep === 1 && (
                                <button
                                    onClick={() => setRsvpStep(0)}
                                    className="absolute top-6 right-6 p-2 hover:bg-gray-100 transition-colors"
                                >
                                    <X size={24} />
                                </button>
                            )}

                            {/* Step 1: Calendar */}
                            {rsvpStep === 1 && (
                                <motion.div
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    className="text-center space-y-8"
                                >
                                    <h3 className="font-serif text-3xl font-light">Add to Calendar?</h3>
                                    <p className="text-gray-500 font-light">Would you like to add this event to your calendar?</p>

                                    <div className="flex flex-col gap-4">
                                        <a
                                            href="https://calendar.google.com"
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            onClick={handleSkipCalendar} // Advance after click
                                            className="w-full py-4 bg-black text-white hover:bg-neutral-800 transition-colors uppercase tracking-widest text-sm flex items-center justify-center gap-3"
                                        >
                                            <Calendar size={16} />
                                            Add to Google Calendar
                                        </a>
                                        <button
                                            onClick={handleSkipCalendar}
                                            className="w-full py-4 border border-black hover:bg-gray-50 transition-colors uppercase tracking-widest text-sm"
                                        >
                                            Skip
                                        </button>
                                    </div>
                                </motion.div>
                            )}

                            {/* Step 2: Success */}
                            {rsvpStep === 2 && (
                                <motion.div
                                    initial={{ opacity: 0, scale: 0.9 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    className="text-center py-8"
                                >
                                    <div className="w-16 h-16 border border-black flex items-center justify-center mx-auto mb-8">
                                        <Check size={32} />
                                    </div>
                                    <h3 className="font-serif text-4xl font-light mb-4">Great!</h3>
                                    <p className="text-gray-500 text-lg font-light">See you at {selectedShow?.name}.</p>
                                    <div className="mt-8 flex items-center justify-center gap-2 text-xs uppercase tracking-widest text-gray-400 animate-pulse">
                                        <span>Redirecting to Assortment</span>
                                        <ArrowRight size={12} />
                                    </div>
                                </motion.div>
                            )}
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    )
}
