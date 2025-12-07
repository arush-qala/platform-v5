'use client'

import { useSearchParams } from 'next/navigation'
import { ArrowUpRight, Clock, MapPin } from 'lucide-react'
import { motion } from 'framer-motion'
import { Suspense } from 'react'

function AssortmentsContent() {
    const searchParams = useSearchParams()
    const rsvpConfirmed = searchParams.get('rsvp_confirmed') === 'true'
    const showName = searchParams.get('show_name')

    // Mock Assortment Data
    const assortments = [
        {
            id: 'assort_001',
            collectionName: "Qala SS26 Main Collection",
            brand: "Qala",
            season: "SS26",
            items: 42,
            totalValue: "$12,405.00",
            status: rsvpConfirmed && showName?.includes('Paris') ? `Meeting at ${showName}` : "Draft",
            lastUpdated: "2 hours ago"
        },
        {
            id: 'assort_002',
            collectionName: "Qala SS26 Edit",
            brand: "Qala",
            season: "SS26",
            items: 18,
            status: rsvpConfirmed && showName?.includes('Coterie') ? `Meeting at ${showName}` : "In Review",
            totalValue: "$5,200.00",
            lastUpdated: "3 days ago"
        },
        {
            id: 'assort_003',
            collectionName: "Highland Wool Basics",
            brand: "Qala",
            season: "FW25",
            items: 156,
            status: "Ordered",
            totalValue: "$45,900.00",
            lastUpdated: "1 week ago"
        }
    ]

    return (
        <div className="max-w-6xl mx-auto">
            {/* Header */}
            <header className="flex items-end justify-between mb-16 border-b border-gray-100 pb-8">
                <div>
                    <h1 className="font-serif text-4xl mb-2 font-light">Your Assortments</h1>
                    <p className="text-gray-400 font-light text-sm uppercase tracking-wider">Manage your selections and orders</p>
                </div>
                <button className="px-8 py-4 bg-black text-white text-xs uppercase tracking-[0.2em] hover:bg-neutral-800 transition-colors">
                    New Assortment
                </button>
            </header>

            {/* List */}
            <div className="space-y-4">
                {assortments.map((item) => (
                    <motion.div
                        key={item.id}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="group bg-white border border-gray-100 p-8 hover:border-black transition-colors duration-300 relative overflow-hidden"
                    >
                        <div className="flex flex-col md:flex-row md:items-center justify-between gap-8 relative z-10">
                            {/* Info */}
                            <div className="space-y-1">
                                <span className="text-[10px] uppercase tracking-widest text-gray-400">{item.brand} • {item.season}</span>
                                <h3 className="font-serif text-2xl font-light">{item.collectionName}</h3>
                                <div className="flex items-center gap-6 text-sm text-gray-500 font-light mt-4">
                                    <span>{item.items} Items</span>
                                    <span>{item.totalValue}</span>
                                    <span>Updated {item.lastUpdated}</span>
                                </div>
                            </div>

                            {/* Status & Action */}
                            <div className="flex items-center gap-12">
                                <div className={`flex items-center gap-3 px-4 py-2 border ${item.status.includes('Meeting') ? 'border-black bg-black text-white' : item.status === 'Ordered' ? 'border-green-200 bg-green-50 text-green-800' : 'border-gray-200 bg-gray-50 text-gray-600'}`}>
                                    {item.status.includes('Meeting') ? <MapPin size={14} /> : item.status === 'Ordered' ? <Clock size={14} /> : null}
                                    <span className="text-xs uppercase tracking-widest font-medium">{item.status}</span>
                                </div>
                                <button className="p-4 hover:bg-gray-50 rounded-full md:rounded-none group-hover:translate-x-2 transition-transform duration-300">
                                    <ArrowUpRight size={20} strokeWidth={1} />
                                </button>
                            </div>
                        </div>
                    </motion.div>
                ))}
            </div>

            {/* Success Toast (Visual only) */}
            {rsvpConfirmed && (
                <motion.div
                    initial={{ opacity: 0, y: 50 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 50 }}
                    className="fixed bottom-12 right-12 bg-black text-white p-6 shadow-2xl z-50 flex items-center gap-4 max-w-sm"
                >
                    <div className="w-8 h-8 flex items-center justify-center border border-white/20 rounded-none">
                        <MapPin size={14} />
                    </div>
                    <div>
                        <p className="text-xs uppercase tracking-widest text-gray-400 mb-1">Status Updated</p>
                        <p className="font-serif text-lg leading-none">Meeting confirmed at {showName}</p>
                    </div>
                </motion.div>
            )}
        </div>
    )
}

export default function AssortmentsPage() {
    return (
        <Suspense fallback={<div>Loading...</div>}>
            <AssortmentsContent />
        </Suspense>
    )
}
