'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { LayoutDashboard, Calendar, ShoppingBag, Settings, LogOut } from 'lucide-react'

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
    const pathname = usePathname()

    const navItems = [
        { icon: LayoutDashboard, label: 'Overview', href: '/dashboard' },
        { icon: ShoppingBag, label: 'Assortments', href: '/dashboard/assortments' },
        { icon: Calendar, label: 'Appointments', href: '/dashboard/appointments' },
        { icon: ShoppingBag, label: 'Orders', href: '/dashboard/orders' },
        { icon: Settings, label: 'Settings', href: '/dashboard/settings' },
    ]

    return (
        <div className="min-h-screen bg-gray-50 flex">
            {/* Sidebar */}
            <aside className="w-64 bg-white border-r border-gray-200 fixed h-full z-10 hidden md:block">
                <div className="p-8">
                    <Link href="/" className="font-serif text-2xl tracking-widest">QALA</Link>
                </div>

                <nav className="px-4 space-y-2">
                    {navItems.map((item) => {
                        const isActive = pathname === item.href
                        return (
                            <Link
                                key={item.href}
                                href={item.href}
                                className={`flex items-center gap-3 px-4 py-3 text-sm uppercase tracking-wider transition-colors ${isActive
                                    ? 'bg-black text-white'
                                    : 'text-gray-500 hover:bg-gray-50 hover:text-black'
                                    }`}
                            >
                                <item.icon size={18} />
                                {item.label}
                            </Link>
                        )
                    })}
                </nav>

                <div className="absolute bottom-8 left-0 w-full px-4">
                    <button className="flex items-center gap-3 px-4 py-3 text-sm uppercase tracking-wider text-gray-400 hover:text-red-500 w-full transition-colors">
                        <LogOut size={18} />
                        Sign Out
                    </button>
                </div>
            </aside>

            {/* Main Content */}
            <main className="flex-1 md:ml-64 p-8 md:p-12">
                {children}
            </main>
        </div>
    )
}
