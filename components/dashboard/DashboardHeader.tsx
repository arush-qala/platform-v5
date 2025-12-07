'use client'

import { motion } from 'framer-motion'

interface DashboardHeaderProps {
    userName: string
    date: string
}

export function DashboardHeader({ userName, date }: DashboardHeaderProps) {
    return (
        <div className="w-full flex justify-between items-end mb-8">
            <div>
                <motion.h1
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="font-serif text-4xl md:text-5xl text-black mb-2"
                >
                    Good Morning, {userName}
                </motion.h1>
                <motion.p
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.2 }}
                    className="text-gray-500 font-light"
                >
                    Here is what's happening in your store today.
                </motion.p>
            </div>
            <div className="hidden md:block text-right">
                <p className="text-sm uppercase tracking-widest text-gray-400">{date}</p>
            </div>
        </div>
    )
}
