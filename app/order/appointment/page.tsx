'use client'

import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { ArrowLeft, Calendar, Clock, Check, ArrowRight } from 'lucide-react'
import { useRouter } from 'next/navigation'
import { useAssortment } from '@/components/collection/AssortmentContext'

const SLOTS = [
    { date: 'Mon, Oct 24', time: '10:00 AM' },
    { date: 'Mon, Oct 24', time: '02:00 PM' },
    { date: 'Tue, Oct 25', time: '11:00 AM' },
    { date: 'Wed, Oct 26', time: '04:00 PM' },
]

export default function AppointmentPage() {
    const router = useRouter()
    const { scheduleAppointment } = useAssortment()
    const [selectedSlot, setSelectedSlot] = useState<number | null>(null)
    const [isConfirmed, setIsConfirmed] = useState(false)

    const handleConfirm = () => {
        if (selectedSlot !== null) {
            const slot = SLOTS[selectedSlot]
            scheduleAppointment(slot.date, slot.time)
            setIsConfirmed(true)
            // Redirect after delay
            setTimeout(() => {
                router.push('/order')
            }, 2000)
        }
    }

    if (isConfirmed) {
        return (
            <div className="min-h-screen bg-white flex flex-col items-center justify-center text-center p-8">
                <motion.div
                    initial={{ scale: 0.8, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    className="bg-green-50 p-8 rounded-full mb-6"
                >
                    <Check size={48} className="text-green-600" />
                </motion.div>
                <h1 className="font-serif text-3xl mb-4">Appointment Scheduled</h1>
                <p className="text-gray-500 mb-8 max-w-md mx-auto">
                    We've notified the Qala team. A calendar invite has been sent to your email.
                </p>
                <p className="text-xs text-gray-400">Redirecting to your order...</p>
            </div>
        )
    }

    // Group slots by date
    const groupedSlots = SLOTS.reduce((acc, slot, index) => {
        const key = slot.date
        if (!acc[key]) acc[key] = []
        acc[key].push({ ...slot, originalIndex: index })
        return acc
    }, {} as Record<string, typeof SLOTS & { originalIndex: number }[]>)

    return (
        <div className="min-h-screen bg-white">
            <div className="max-w-3xl mx-auto px-8 !pt-32 pb-24">
                <button onClick={() => router.back()} className="mb-8 p-2 hover:bg-gray-50 rounded-full transition-colors flex items-center gap-2 text-gray-500 !text-sm">
                    <ArrowLeft size={16} /> Back
                </button>

                <div className="mb-12">
                    <h1 className="font-serif !text-2xl mb-2 text-black">Schedule Design Consultation</h1>
                    <p className="text-gray-500 font-light !text-sm max-w-xl">
                        Select a time to discuss customisations, specific sizing requirements, or design modifications with the brand.
                    </p>
                </div>

                <div className="space-y-8 mb-12">
                    {Object.entries(groupedSlots).map(([date, slots], groupIndex) => (
                        <div key={date}>
                            <h3 className="font-serif !text-lg mb-4 text-black border-b border-gray-100 pb-2">{date}</h3>
                            <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                                {slots.map((slot) => (
                                    <motion.button
                                        key={slot.originalIndex}
                                        whileHover={{ scale: 1.02 }}
                                        whileTap={{ scale: 0.98 }}
                                        onClick={() => setSelectedSlot(slot.originalIndex)}
                                        className={`p-4 border text-center transition-all rounded-lg group ${selectedSlot === slot.originalIndex
                                            ? 'border-black bg-black text-white shadow-lg'
                                            : 'border-gray-200 hover:border-black'
                                            }`}
                                    >
                                        <div className="flex items-center justify-center gap-2 !text-sm">
                                            <Clock size={14} className={selectedSlot === slot.originalIndex ? 'text-white' : 'text-gray-400 group-hover:text-black'} />
                                            {slot.time}
                                        </div>
                                    </motion.button>
                                ))}
                            </div>
                        </div>
                    ))}
                </div>

                <div className="flex justify-end border-t border-gray-100 pt-8">
                    <button
                        disabled={selectedSlot === null}
                        onClick={handleConfirm}
                        className={`px-8 py-3 rounded-0 flex items-center gap-2 !text-xs uppercase tracking-widest font-bold transition-all ${selectedSlot !== null
                            ? 'bg-black text-white hover:bg-gray-800'
                            : 'bg-gray-100 text-gray-400 cursor-not-allowed'
                            }`}
                    >
                        Confirm Appointment <ArrowRight size={14} />
                    </button>
                </div>
            </div>
        </div>
    )
}
