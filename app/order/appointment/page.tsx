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
        <div className="min-h-screen bg-[#F9F8F6] flex flex-col items-center justify-center p-6 md:p-12 font-sans text-[#1a1a1a]">

            {/* Confirmation View */}
            {isConfirmed ? (
                <div className="max-w-2xl w-full text-center">
                    <motion.div
                        initial={{ scale: 0.9, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        className="bg-white p-16 shadow-2xl border border-[#e5e2dd] relative overflow-hidden"
                    >
                        {/* Decorative Corner */}
                        <div className="absolute top-0 left-0 w-24 h-24 border-l-4 border-t-4 border-[#d4af37]/20 -ml-4 -mt-4"></div>
                        <div className="absolute bottom-0 right-0 w-24 h-24 border-r-4 border-b-4 border-[#d4af37]/20 -mr-4 -mb-4"></div>

                        <div className="w-16 h-16 rounded-full bg-[#f9f8f6] flex items-center justify-center mx-auto mb-8 text-[#d4af37]">
                            <Check size={32} />
                        </div>

                        <h1 className="font-serif text-4xl mb-6 text-[#1a1a1a]">Appointment Confirmed</h1>
                        <p className="text-[#666] mb-8 font-light leading-relaxed max-w-md mx-auto">
                            We have reserved a private viewing for you. Your personal relationship manager will be in touch shortly with the details.
                        </p>

                        <div className="inline-block px-4 py-2 bg-[#f9f8f6] border border-[#e5e2dd]">
                            <p className="text-xs uppercase tracking-[0.2em] text-[#1a1a1a]">{SLOTS[selectedSlot!].date} • {SLOTS[selectedSlot!].time}</p>
                        </div>
                    </motion.div>
                </div>
            ) : (
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="max-w-4xl w-full bg-white shadow-2xl overflow-hidden flex flex-col md:flex-row min-h-[600px]"
                >
                    {/* Left Panel: Decorative/Info */}
                    <div className="md:w-5/12 bg-[#1a1a1a] text-white p-12 flex flex-col justify-between relative">
                        <div className="absolute top-0 left-0 w-full h-full opacity-10 pointer-events-none"
                            style={{ backgroundImage: 'url("https://www.transparenttextures.com/patterns/cubes.png")' }}></div>

                        <div>
                            <button onClick={() => router.back()} className="flex items-center gap-2 text-white/50 hover:text-white transition-colors mb-12">
                                <ArrowLeft size={16} /> <span className="text-xs uppercase tracking-widest">Back</span>
                            </button>
                            <h2 className="font-serif text-3xl md:text-4xl leading-tight mb-6">Private <br />Showcase</h2>
                            <p className="text-white/60 font-light text-sm leading-relaxed">
                                Experience our collection in a private setting tailored to your needs. Discuss custom sizing, fabrications, and exclusive pieces.
                            </p>
                        </div>

                        <div className="mt-12">
                            <div className="h-px w-12 bg-[#d4af37] mb-6"></div>
                            <p className="text-[10px] uppercase tracking-[0.3em] text-white/40">By Invitation Only</p>
                        </div>
                    </div>

                    {/* Right Panel: Time Selection */}
                    <div className="md:w-7/12 p-12 bg-white flex flex-col">
                        <h3 className="font-serif text-2xl mb-8 text-[#1a1a1a]">Select Availability</h3>

                        <div className="flex-1 space-y-4">
                            {SLOTS.map((slot, index) => (
                                <button
                                    key={index}
                                    onClick={() => setSelectedSlot(index)}
                                    className={`w-full group flex items-center justify-between p-6 border transition-all duration-300 ${selectedSlot === index
                                        ? 'border-[#1a1a1a] bg-[#f9f8f6]'
                                        : 'border-[#e5e2dd] hover:border-[#999] hover:bg-white'
                                        }`}
                                >
                                    <div className="flex items-center gap-6">
                                        <div className={`w-3 h-3 rounded-full border border-[#ccc] flex items-center justify-center transition-colors ${selectedSlot === index ? 'border-[#1a1a1a]' : ''}`}>
                                            {selectedSlot === index && <div className="w-1.5 h-1.5 rounded-full bg-[#1a1a1a]"></div>}
                                        </div>
                                        <div className="text-left">
                                            <p className={`font-serif text-lg ${selectedSlot === index ? 'text-[#1a1a1a]' : 'text-[#666]'}`}>{slot.date}</p>
                                        </div>
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <Clock size={14} className={selectedSlot === index ? 'text-[#1a1a1a]' : 'text-[#ccc]'} />
                                        <span className={`text-sm tracking-wide ${selectedSlot === index ? 'text-[#1a1a1a] font-medium' : 'text-[#999]'}`}>{slot.time}</span>
                                    </div>
                                </button>
                            ))}
                        </div>

                        <div className="mt-12 pt-8 border-t border-[#f0f0f0] flex justify-end">
                            <button
                                disabled={selectedSlot === null}
                                onClick={handleConfirm}
                                className={`px-10 py-4 flex items-center gap-3 text-xs uppercase tracking-[0.2em] transition-all duration-300 ${selectedSlot !== null
                                    ? 'bg-[#1a1a1a] text-white hover:bg-[#333]'
                                    : 'bg-[#f0f0f0] text-[#ccc] cursor-not-allowed'
                                    }`}
                            >
                                Confirm Request <ArrowRight size={14} />
                            </button>
                        </div>
                    </div>
                </motion.div>
            )}
        </div>
    )
}
