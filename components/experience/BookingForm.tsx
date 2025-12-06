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
            <div className="mb-12 text-center">
                <h2 className="font-serif text-3xl mb-4">Confirm Details</h2>
                <div className="flex items-center justify-center gap-2 text-gray-500 text-sm">
                    <span>{selectedDate?.toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric' })}</span>
                    <span>•</span>
                    <span>{selectedTime}</span>
                </div>
            </div>

            <form onSubmit={handleSubmit} className="space-y-12">
                {/* Boutique Name */}
                <div className="space-y-4">
                    <label className="block text-xs uppercase tracking-widest text-gray-500">Boutique Name</label>
                    <div className="relative group">
                        <Building2 className="absolute left-0 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-black transition-colors" size={20} />
                        <input
                            required
                            type="text"
                            value={formData.boutiqueName}
                            onChange={(e) => setFormData({ ...formData, boutiqueName: e.target.value })}
                            className="w-full border-b border-gray-200 py-4 pl-8 text-xl font-light focus:outline-none focus:border-black transition-colors bg-transparent placeholder-gray-300"
                            placeholder="Store Name"
                        />
                    </div>
                </div>

                {/* Address */}
                <div className="space-y-4">
                    <label className="block text-xs uppercase tracking-widest text-gray-500">Boutique Address</label>
                    <div className="relative group">
                        <MapPin className="absolute left-0 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-black transition-colors" size={20} />
                        <input
                            required
                            type="text"
                            value={formData.address}
                            onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                            className="w-full border-b border-gray-200 py-4 pl-8 text-xl font-light focus:outline-none focus:border-black transition-colors bg-transparent placeholder-gray-300"
                            placeholder="Full Address"
                        />
                    </div>
                </div>

                {/* Comments */}
                <div className="space-y-4">
                    <label className="block text-xs uppercase tracking-widest text-gray-500">Comments (Optional)</label>
                    <div className="relative group">
                        <MessageSquare className="absolute left-0 top-4 text-gray-400 group-focus-within:text-black transition-colors" size={20} />
                        <textarea
                            value={formData.comments}
                            onChange={(e) => setFormData({ ...formData, comments: e.target.value })}
                            className="w-full border-b border-gray-200 py-4 pl-8 text-lg font-light focus:outline-none focus:border-black transition-colors bg-transparent placeholder-gray-300 min-h-[100px] resize-none"
                            placeholder="Any specific requirements?"
                        />
                    </div>
                </div>

                {/* Actions */}
                <div className="flex items-center gap-4 pt-8">
                    <button
                        type="button"
                        onClick={onBack}
                        className="flex-1 py-4 border border-gray-200 text-gray-500 uppercase tracking-widest hover:border-black hover:text-black transition-all"
                    >
                        Back
                    </button>
                    <button
                        type="submit"
                        className="flex-1 py-4 bg-black text-white uppercase tracking-widest hover:bg-gray-800 transition-all"
                    >
                        Confirm Booking
                    </button>
                </div>
            </form>
        </div>
    )
}
