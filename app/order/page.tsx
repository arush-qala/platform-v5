'use client'

import React from 'react'
import { useAssortment } from '@/components/collection/AssortmentContext'
import OrderProductRow from '@/components/order/OrderProductRow'
import OrderSummary from '@/components/order/OrderSummary'
import Link from 'next/link'
import { ArrowLeft } from 'lucide-react'

export const dynamic = 'force-dynamic'

export default function OrderPage() {
    const { items } = useAssortment()

    return (
        <div className="min-h-screen bg-white">
            {/* Header / Nav */}
            <div className="border-b border-gray-100 sticky top-0 bg-white/95 backdrop-blur-sm z-50">
                <div className="max-w-7xl mx-auto px-8 py-6 flex items-center gap-4">
                    <Link href="/experience" className="p-2 hover:bg-gray-50 rounded-full transition-colors">
                        <ArrowLeft size={20} className="text-gray-600" />
                    </Link>
                    <div>
                        <h1 className="font-serif text-2xl">Start Your Order</h1>
                        <p className="text-xs text-gray-500">Qala / Assortment / Order</p>
                    </div>
                </div>
            </div>

            <main className="max-w-7xl mx-auto px-8 py-12">
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-16">

                    {/* Left Column: Product List */}
                    <div className="lg:col-span-8">
                        <div className="mb-8">
                            <h2 className="font-serif text-3xl mb-2">My Assortment</h2>
                            <p className="text-gray-500 font-light">
                                Select quantities for each style. Prices shown are estimated landed costs.
                            </p>
                        </div>

                        {items.length === 0 ? (
                            <div className="text-center py-20 bg-gray-50 rounded-lg border border-dashed border-gray-200">
                                <p className="text-gray-400 mb-4">Your assortment is empty.</p>
                                <Link href="/collection/all">
                                    <button className="px-6 py-2 bg-black text-white text-xs uppercase tracking-widest">
                                        Browse Collections
                                    </button>
                                </Link>
                            </div>
                        ) : (
                            <div className="space-y-4">
                                {/* Table Header (Pseudo) */}
                                <div className="hidden md:grid grid-cols-12 gap-6 text-xs text-gray-400 uppercase tracking-wider px-2 pb-2 border-b border-gray-100">
                                    <div className="col-span-3">Product Details</div>
                                    <div className="col-span-6 text-center">Quantities (Size Grid)</div>
                                    <div className="col-span-3 text-right">Total</div>
                                </div>

                                {/* Rows */}
                                {items.map((item) => (
                                    <OrderProductRow key={item.id} product={item} />
                                ))}
                            </div>
                        )}
                    </div>

                    {/* Right Column: Summary & Actions */}
                    <div className="lg:col-span-4">
                        <OrderSummary />
                    </div>
                </div>
            </main>
        </div>
    )
}
