'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { MapPin, Building2, MessageSquare } from 'lucide-react'

interface BookingFormProps {
    onSubmit: (data: any) => void
    onBack: () => void
    selectedDate: Date | null
    selectedTime: string | null
}

export function BookingForm({ onSubmit, onBack, selectedDate, selectedTime }: BookingFormProps) {
    const [formData, setFormData] = useState({
        boutiqueName: '',
        address: '',
        comments: ''
    })

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault()
        onSubmit(formData)
    }

    return (
        <div className="w-full max-w-2xl mx-auto">
            {/* Header */}
            <div className="mb-16 text-center border-b border-gray-100 pb-12">
                <h2 className="font-serif text-4xl mb-4 font-light">Confirm Details</h2>
                <div className="flex items-center justify-center gap-4 text-gray-500 text-sm uppercase tracking-widest">
                    <span>{selectedDate?.toLocaleDateString('en-US', { weekday: 'short', month: 'long', day: 'numeric' })}</span>
                    <span className="text-gray-300">|</span>
                    <span>{selectedTime}</span>
                </div>
            </div>

            <form onSubmit={handleSubmit} className="space-y-16">
                {/* Boutique Name */}
                <div className="space-y-6">
                    <label className="block text-[10px] uppercase tracking-[0.2em] text-gray-400 font-medium">Boutique Name</label>
                    <div className="relative group">
                        <Building2 className="absolute left-0 top-1/2 -translate-y-1/2 text-gray-300 group-focus-within:text-black transition-colors duration-300" size={24} strokeWidth={1} />
                        <input
                            required
                            type="text"
                            value={formData.boutiqueName}
                            onChange={(e) => setFormData({ ...formData, boutiqueName: e.target.value })}
                            className="w-full border-b border-gray-200 py-4 pl-10 text-2xl font-serif font-light focus:outline-none focus:border-black transition-all duration-300 bg-transparent placeholder-gray-200 rounded-none"
                            placeholder="Store Name"
                        />
                    </div>
                </div>

                {/* Address */}
                <div className="space-y-6">
                    <label className="block text-[10px] uppercase tracking-[0.2em] text-gray-400 font-medium">Boutique Address</label>
                    <div className="relative group">
                        <MapPin className="absolute left-0 top-1/2 -translate-y-1/2 text-gray-300 group-focus-within:text-black transition-colors duration-300" size={24} strokeWidth={1} />
                        <input
                            required
                            type="text"
                            value={formData.address}
                            onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                            className="w-full border-b border-gray-200 py-4 pl-10 text-2xl font-serif font-light focus:outline-none focus:border-black transition-all duration-300 bg-transparent placeholder-gray-200 rounded-none"
                            placeholder="Full Address"
                        />
                    </div>
                </div>

                {/* Comments */}
                <div className="space-y-6">
                    <label className="block text-[10px] uppercase tracking-[0.2em] text-gray-400 font-medium">Comments (Optional)</label>
                    <div className="relative group">
                        <MessageSquare className="absolute left-0 top-4 text-gray-300 group-focus-within:text-black transition-colors duration-300" size={24} strokeWidth={1} />
                        <textarea
                            value={formData.comments}
                            onChange={(e) => setFormData({ ...formData, comments: e.target.value })}
                            className="w-full border-b border-gray-200 py-4 pl-10 text-lg font-light focus:outline-none focus:border-black transition-all duration-300 bg-transparent placeholder-gray-200 min-h-[120px] resize-none rounded-none"
                            placeholder="Any specific requirements?"
                        />
                    </div>
                </div>

                {/* Actions */}
                <div className="flex items-center gap-6 pt-12">
                    <button
                        type="button"
                        onClick={onBack}
                        className="py-5 px-12 border border-gray-200 text-gray-400 uppercase tracking-widest hover:border-black hover:text-black transition-all duration-500 rounded-none text-xs"
                    >
                        Back
                    </button>
                    <button
                        type="submit"
                        className="flex-1 py-5 bg-black text-white uppercase tracking-[0.2em] hover:bg-neutral-800 transition-all duration-500 rounded-none text-sm font-medium shadow-xl hover:shadow-2xl"
                    >
                        Confirm Booking
                    </button>
                </div>
            </form>
        </div>
    )
}
