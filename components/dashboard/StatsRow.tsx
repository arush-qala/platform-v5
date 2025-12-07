'use client'

import { motion } from 'framer-motion'
import { Link } from 'lucide-react'

interface StatsData {
    pendingOrders: number
    upcomingAppointments: number
    activeAssortments: number
}

export function StatsRow({ stats }: { stats: StatsData }) {
    const items = [
        { label: 'Pending Orders', value: stats.pendingOrders, href: '/dashboard/orders' },
        { label: 'Upcoming Appointments', value: stats.upcomingAppointments, href: '/dashboard/appointments' },
        { label: 'Active Assortments', value: stats.activeAssortments, href: '/dashboard/assortments' },
    ]

    return (
        <div className="flex gap-8 md:gap-16 mb-12 border-b border-gray-100 pb-8">
            {items.map((item, idx) => (
                <motion.div
                    key={item.label}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.1 * idx }}
                    className="flex flex-col"
                >
                    <span className="text-4xl font-serif text-black">{item.value}</span>
                    <span className="text-xs uppercase tracking-widest text-gray-500 mt-1">{item.label}</span>
                </motion.div>
            ))}
        </div>
    )
}
