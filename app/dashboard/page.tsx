'use client'

import { DashboardHeader } from '@/components/dashboard/DashboardHeader'
import { StatsRow } from '@/components/dashboard/StatsRow'
import { FloatingDiscoveryBar } from '@/components/dashboard/FloatingDiscoveryBar'
import { ActionCards } from '@/components/dashboard/ActionCards'
import { Recommendations } from '@/components/dashboard/Recommendations'
import { useAssortment } from '@/components/collection/AssortmentContext'

export default function DashboardPage() {
    const { items, appointmentDetails } = useAssortment()

    // Mock user & stats (In real app, fetch this from auth/DB)
    const user = {
        name: 'Arush',
        date: new Date().toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric' })
    }

    const stats = {
        pendingOrders: 2, // Mocked
        upcomingAppointments: appointmentDetails.scheduled ? 1 : 0,
        activeAssortments: 1 // Assuming current session is 1
    }

    return (
        <main className="min-h-screen bg-white">
            <div className="max-w-[1440px] mx-auto px-6 md:px-12 py-12 relative">

                {/* 1. Header Section */}
                <DashboardHeader userName={user.name} date={user.date} />

                {/* 2. Floating Persistent Bar - Starts here, sticks to bottom on scroll */}
                <FloatingDiscoveryBar />

                {/* 3. Stats Overview */}
                <StatsRow stats={stats} />

                {/* 4. Primary Action Cards */}
                <ActionCards />

                {/* 5. Editorial Recommendations */}
                <Recommendations />

            </div>
        </main>
    )
}
