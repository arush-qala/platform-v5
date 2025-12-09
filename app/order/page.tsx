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
                        <ArrowLeft size={16} className="text-gray-600" />
                    </Link>
                    <div>
                        <h1 className="font-serif !text-lg mb-0.5 text-black font-light tracking-wide">Start Your Order</h1>
                        <p className="!text-[10px] uppercase tracking-wider text-gray-500">Qala / Assortment / Order</p>
                    </div>
                </div>
            </div>

            <main className="max-w-7xl mx-auto px-8 !pt-32 pb-24">
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-16">

                    {/* Left Column: Product List */}
                    <div className="lg:col-span-8">
                        <div className="mb-12">
                            <h2 className="font-serif !text-base mb-2 text-black font-normal tracking-wide">My Assortment</h2>
                            <p className="text-gray-500 font-light !text-xs max-w-md">
                                Select quantities for each style. Prices shown are estimated landed costs.
                            </p>
                        </div>

                        {items.length === 0 ? (
                            <div className="text-center py-20 bg-gray-50 rounded-lg border border-dashed border-gray-200">
                                <p className="text-gray-400 mb-4 text-sm">Your assortment is empty.</p>
                                <Link href="/collection/all">
                                    <button className="px-6 py-3 bg-black text-white text-xs uppercase tracking-widest hover:bg-gray-800 transition-colors">
                                        Browse Collections
                                    </button>
                                </Link>
                            </div>
                        ) : (
                            <div className="space-y-8">
                                {/* Table Header (Pseudo) */}
                                <div className="hidden md:grid grid-cols-12 gap-6 text-[9px] text-gray-400 uppercase tracking-[0.15em] px-2 pb-2 border-b border-gray-100 font-medium">
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
