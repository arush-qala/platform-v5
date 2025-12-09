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

    return (
        <div className="min-h-screen bg-white">
            <div className="max-w-3xl mx-auto px-8 py-12">
                <button onClick={() => router.back()} className="mb-8 p-2 hover:bg-gray-50 rounded-full transition-colors flex items-center gap-2 text-gray-500">
                    <ArrowLeft size={18} /> Back
                </button>

                <div className="mb-12">
                    <h1 className="font-serif text-3xl mb-4">Schedule Design Consultation</h1>
                    <p className="text-gray-500 font-light">
                        Select a time to discuss customisations, specific sizing requirements, or design modifications with the brand.
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-12">
                    {SLOTS.map((slot, index) => (
                        <motion.button
                            key={index}
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.98 }}
                            onClick={() => setSelectedSlot(index)}
                            className={`p-6 border text-left transition-all rounded-lg group ${selectedSlot === index
                                ? 'border-black bg-black text-white shadow-lg'
                                : 'border-gray-200 hover:border-black'
                                }`}
                        >
                            <div className="flex items-center gap-3 mb-2 opacity-80">
                                <Calendar size={16} />
                                <span className="text-xs font-medium uppercase tracking-wider">Available Slot</span>
                            </div>
                            <h3 className="font-serif text-xl mb-1">{slot.date}</h3>
                            <div className="flex items-center gap-2 text-sm opacity-90">
                                <Clock size={14} />
                                {slot.time}
                            </div>
                        </motion.button>
                    ))}
                </div>

                <div className="flex justify-end border-t border-gray-100 pt-8">
                    <button
                        disabled={selectedSlot === null}
                        onClick={handleConfirm}
                        className={`px-8 py-3 rounded-0 flex items-center gap-2 text-sm uppercase tracking-widest font-bold transition-all ${selectedSlot !== null
                            ? 'bg-black text-white hover:bg-gray-800'
                            : 'bg-gray-100 text-gray-400 cursor-not-allowed'
                            }`}
                    >
                        Confirm Appointment <ArrowRight size={16} />
                    </button>
                </div>
            </div>
        </div>
    )
}
