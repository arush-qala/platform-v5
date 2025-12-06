'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { motion, AnimatePresence } from 'framer-motion'
import { ArrowLeft } from 'lucide-react'
import { BookingCalendar } from '@/components/experience/BookingCalendar'
import { BookingForm } from '@/components/experience/BookingForm'
import { AppointmentConfirmation } from '@/components/experience/AppointmentConfirmation'

export default function PrivateShowcasePage() {
    const router = useRouter()
    const [step, setStep] = useState(1)
    const [bookingData, setBookingData] = useState<{
        date: Date | null
        time: string | null
        details: any | null
    }>({
        date: null,
        time: null,
        details: null
    })

    const handleSlotSelect = (date: Date, time: string) => {
        setBookingData(prev => ({ ...prev, date, time }))
        setStep(2)
    }

    const handleFormSubmit = (details: any) => {
        setBookingData(prev => ({ ...prev, details }))
        // Simulate API call
        setTimeout(() => {
            setStep(3)
        }, 1000)
    }

    // Handle Redirect after success
    useEffect(() => {
        if (step === 3) {
            const timer = setTimeout(() => {
                router.push('/dashboard/appointments')
            }, 3000)
            return () => clearTimeout(timer)
        }
    }, [step, router])

    return (
        <div className="min-h-screen bg-white">
            {/* Nav */}
            <div className="fixed top-0 left-0 w-full p-8 z-50">
                <button
                    onClick={() => step === 1 ? router.back() : setStep(step - 1)}
                    className="flex items-center gap-2 text-sm uppercase tracking-widest hover:text-gray-600 transition-colors"
                >
                    <ArrowLeft size={16} />
                    {step === 1 ? 'Exit' : 'Back'}
                </button>
            </div>

            <div className="max-w-7xl mx-auto px-8 pt-32 pb-12">
                {/* Progress Indicator (Optional) */}
                {step < 3 && (
                    <div className="flex justify-center mb-16 gap-4">
                        <div className={`h-1 w-12 transition-colors ${step >= 1 ? 'bg-black' : 'bg-gray-100'}`} />
                        <div className={`h-1 w-12 transition-colors ${step >= 2 ? 'bg-black' : 'bg-gray-100'}`} />
                    </div>
                )}

                <AnimatePresence mode="wait">
                    {step === 1 && (
                        <motion.div
                            key="calendar"
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            exit={{ opacity: 0, x: -20 }}
                        >
                            <div className="text-center mb-16">
                                <h1 className="font-serif text-4xl mb-4">Request Private Showcase</h1>
                                <p className="text-gray-500 font-light">Select a date and time for your team to visit our showroom.</p>
                            </div>
                            <BookingCalendar onSelect={handleSlotSelect} />
                        </motion.div>
                    )}

                    {step === 2 && (
                        <motion.div
                            key="form"
                            initial={{ opacity: 0, x: 20 }}
                            animate={{ opacity: 1, x: 0 }}
                            exit={{ opacity: 0, x: -20 }}
                        >
                            <BookingForm
                                onSubmit={handleFormSubmit}
                                onBack={() => setStep(1)}
                                selectedDate={bookingData.date}
                                selectedTime={bookingData.time}
                            />
                        </motion.div>
                    )}

                    {step === 3 && (
                        <motion.div
                            key="success"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                        >
                            <AppointmentConfirmation />
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>
        </div>
    )
}
