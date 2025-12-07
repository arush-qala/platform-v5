'use client'

import { motion } from 'framer-motion'
import { Check } from 'lucide-react'

export function AppointmentConfirmation() {
    return (
        <div className="w-full h-[60vh] flex flex-col items-center justify-center text-center">
            <motion.div
                initial={{ scale: 0, rotate: -45 }}
                animate={{ scale: 1, rotate: 0 }}
                transition={{ type: "spring", duration: 1.2, bounce: 0.3 }}
                className="w-32 h-32 border border-black flex items-center justify-center mb-16 rounded-none"
            >
                <Check size={64} className="text-black" strokeWidth={0.5} />
            </motion.div>

            <motion.div
                initial={{ opacity: 0, y: 40 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3, duration: 0.8 }}
                className="space-y-6"
            >
                <h2 className="font-serif text-5xl md:text-6xl font-thin tracking-wide">Request Confirmed</h2>
                <div className="h-px w-24 bg-black mx-auto my-8" />
                <p className="text-gray-500 text-lg font-light tracking-wide">A confirmation email has been sent to you.</p>
                <p className="text-xs text-gray-400 uppercase tracking-[0.2em] mt-8">Redirecting to Dashboard...</p>
            </motion.div>
        </div>
    )
}
