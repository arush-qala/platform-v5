'use client'

import { Calendar, MapPin, Clock } from 'lucide-react'

export default function AppointmentsPage() {
    // Mock Appointments Data
    const appointments = [
        {
            id: 'apt_123',
            type: 'Private Showcase',
            date: '2025-12-19', // Matching the user's screenshot date
            time: '1:00 PM',
            status: 'Confirmed',
            location: 'Qala Showroom, Paris',
            notes: 'Viewing Spring/Summer 2026 Collection'
        },
        // We can add the "New" one here dynamically in a real app
    ]

    return (
        <div className="max-w-5xl mx-auto">
            <header className="mb-12">
                <h1 className="font-serif text-3xl mb-2">Your Appointments</h1>
                <p className="text-gray-500 font-light">Manage your upcoming showcases and meetings.</p>
            </header>

            <div className="space-y-6">
                {appointments.map((apt) => (
                    <div key={apt.id} className="bg-white p-8 border border-gray-100 shadow-sm flex flex-col md:flex-row gap-8 items-start md:items-center justify-between group hover:shadow-md transition-all duration-300">
                        {/* Date Box */}
                        <div className="flex flex-col items-center justify-center w-20 h-20 bg-gray-50 border border-gray-100">
                            <span className="text-xs uppercase text-gray-500">Dec</span>
                            <span className="font-serif text-2xl">19</span>
                        </div>

                        {/* Info */}
                        <div className="flex-1 space-y-2">
                            <div className="flex items-center gap-3">
                                <h3 className="font-serif text-xl">{apt.type}</h3>
                                <span className="bg-green-50 text-green-700 text-[10px] px-2 py-1 uppercase tracking-widest font-medium border border-green-100">
                                    {apt.status}
                                </span>
                            </div>

                            <div className="flex items-center gap-6 text-sm text-gray-500">
                                <div className="flex items-center gap-2">
                                    <Clock size={14} />
                                    {apt.time}
                                </div>
                                <div className="flex items-center gap-2">
                                    <MapPin size={14} />
                                    {apt.location}
                                </div>
                            </div>
                            <p className="text-sm text-gray-400 italic">"{apt.notes}"</p>
                        </div>

                        {/* Actions */}
                        <div className="flex gap-4">
                            <button className="px-6 py-3 border border-gray-200 text-xs uppercase tracking-widest hover:bg-black hover:text-white transition-colors">
                                Reschedule
                            </button>
                            <button className="px-6 py-3 border border-transparent text-red-500 text-xs uppercase tracking-widest hover:bg-red-50 transition-colors">
                                Cancel
                            </button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    )
}
