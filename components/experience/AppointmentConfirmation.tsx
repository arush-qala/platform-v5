'use client'

import { motion } from 'framer-motion'
import { Check } from 'lucide-react'

export function AppointmentConfirmation() {
    return (
        <div className="w-full h-[60vh] flex flex-col items-center justify-center text-center">
            <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ type: "spring", duration: 0.6 }}
                className="w-24 h-24 bg-green-50 rounded-full flex items-center justify-center mb-8"
            >
                <Check size={48} className="text-green-600" strokeWidth={1.5} />
            </motion.div>

            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
            >
                <h2 className="font-serif text-3xl mb-4">Request Confirmed</h2>
                <p className="text-gray-500 text-lg mb-2">We have sent a confirmation email to you.</p>
                <p className="text-sm text-gray-400">Redirecting to dashboard...</p>
            </motion.div>
        </div>
    )
}
