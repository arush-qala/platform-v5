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
        <div className="min-h-screen bg-[#F9F8F6] text-[#1a1a1a] font-sans">
            {/* Header / Nav */}
            <div className="border-b border-[#e5e2dd] sticky top-0 bg-[#F9F8F6]/95 backdrop-blur-sm z-50 transition-all duration-300">
                <div className="max-w-7xl mx-auto px-8 py-6 flex items-center gap-6">
                    <Link href="/experience" className="group flex items-center gap-2 text-[#666] hover:text-[#1a1a1a] transition-colors">
                        <ArrowLeft size={18} className="transition-transform group-hover:-translate-x-1" />
                        <span className="text-xs uppercase tracking-widest hidden md:inline-block">Back</span>
                    </Link>
                    <div className="h-6 w-px bg-[#e5e2dd] hidden md:block"></div>
                    <div>
                        <h1 className="font-serif text-2xl text-[#1a1a1a]">Digital Line Sheet</h1>
                        <p className="text-[10px] uppercase tracking-[0.2em] text-[#888]">Fall/Winter 2025 Assortment</p>
                    </div>
                </div>
            </div>

            <main className="max-w-[1400px] mx-auto px-8 py-16">
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-20">

                    {/* Left Column: Product List */}
                    <div className="lg:col-span-8">
                        <div className="mb-12 border-b border-[#1a1a1a] pb-6 flex justify-between items-end">
                            <div>
                                <h2 className="font-serif text-4xl mb-3 text-[#1a1a1a]">Assortment</h2>
                                <p className="text-[#666] font-light max-w-md">
                                    Review your selection. Enter quantities per size to calculate the estimated order value.
                                </p>
                            </div>
                            <div className="text-right hidden md:block">
                                <p className="text-xs uppercase tracking-widest text-[#999]">Total Styles</p>
                                <p className="font-serif text-2xl">{items.length}</p>
                            </div>
                        </div>

                        {items.length === 0 ? (
                            <div className="text-center py-32 border border-dashed border-[#dcd9d5] rounded-sm bg-[#f4f2ef]">
                                <p className="font-serif text-2xl text-[#999] mb-6 italic">Your assortment is currently empty.</p>
                                <Link href="/collection/all">
                                    <button className="px-8 py-3 bg-[#1a1a1a] text-white text-xs uppercase tracking-[0.2em] hover:bg-[#333] transition-colors">
                                        Browse Collections
                                    </button>
                                </Link>
                            </div>
                        ) : (
                            <div className="space-y-0">
                                {/* Table Header */}
                                <div className="hidden md:grid grid-cols-12 gap-8 text-[10px] uppercase tracking-[0.2em] text-[#666] px-4 pb-4 border-b border-[#e5e2dd]">
                                    <div className="col-span-4">Style Details</div>
                                    <div className="col-span-6 text-center">Quantities</div>
                                    <div className="col-span-2 text-right">Subtotal</div>
                                </div>

                                {/* Rows */}
                                {items.map((item, idx) => (
                                    <OrderProductRow key={item.id} product={item} />
                                ))}
                            </div>
                        )}
                    </div>

                    {/* Right Column: Summary & Actions */}
                    <div className="lg:col-span-4">
                        <div className="sticky top-32">
                            <OrderSummary />
                        </div>
                    </div>
                </div>
            </main>
        </div>
    )
}
