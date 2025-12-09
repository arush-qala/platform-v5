'use client'

import React from 'react'
import { motion } from 'framer-motion'
import { useAssortment } from '@/components/collection/AssortmentContext'
import { Calendar, ArrowRight, CheckCircle2, AlertCircle } from 'lucide-react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'

export default function OrderSummary() {
    const router = useRouter()
    const { items, orderQuantities, appointmentDetails } = useAssortment()

    // Calculate Totals
    let totalQty = 0
    let subtotal = 0

    items.forEach(product => {
        const productQtyObj = orderQuantities[product.id] || {}
        const productTotalQty = Object.values(productQtyObj).reduce((a, b) => a + b, 0)

        if (productTotalQty > 0) {
            totalQty += productTotalQty
            // Parse price
            const price = parseFloat(product.price.replace('$', '')) || 0
            subtotal += price * productTotalQty
        }
    })

    const shipping = 0 // "Explicit mention of Delivery duties paid" usually means included or 0 separate? 
    // User request: "A bill summary including shipping etc. Explicit mention of Delivery duties paid"
    // Let's assume Shipping is calculated or fixed. 
    const SHIPPING_ESTIMATE = 150 // Mock value
    const total = subtotal + SHIPPING_ESTIMATE

    const hasItems = totalQty > 0

    return (
        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200 sticky top-6">
            <h2 className="font-serif text-2xl mb-2">Order Summary</h2>
            <p className="text-gray-500 text-xs mb-6">Review your selection and proceed to verify details.</p>

            {/* Customisation / Appointment Section */}
            <div className="mb-6 border-b border-gray-200 pb-6">
                {appointmentDetails.scheduled ? (
                    <div className="bg-green-50 border border-green-100 p-4 rounded-lg flex items-start gap-3">
                        <CheckCircle2 className="text-green-600 shrink-0 mt-1" size={18} />
                        <div>
                            <h4 className="font-medium text-green-900 text-sm">Customisation Appointment Scheduled</h4>
                            <p className="text-xs text-green-700 mt-1">
                                {appointmentDetails.date} at {appointmentDetails.slot}
                            </p>
                            <button
                                onClick={() => router.push('/order/appointment')}
                                className="text-xs underline mt-2 text-green-800 hover:text-green-950"
                            >
                                Reschedule
                            </button>
                        </div>
                    </div>
                ) : (
                    <div className="bg-white border border-gray-200 p-4 rounded-lg shadow-sm">
                        <div className="flex items-center gap-3 mb-3">
                            <div className="bg-black text-white p-2 rounded-full">
                                <Calendar size={16} />
                            </div>
                            <h4 className="font-serif text-md">Need Customisations?</h4>
                        </div>
                        <p className="text-xs text-gray-500 mb-4 leading-relaxed">
                            Brands can customise sizing, designs, colors, and silhouettes for you. Schedule a call with the designer.
                        </p>
                        <Link href="/order/appointment">
                            <button className="w-full py-2 bg-white border border-black text-xs uppercase tracking-wider font-medium hover:bg-black hover:text-white transition-all rounded">
                                Schedule Appointment
                            </button>
                        </Link>
                    </div>
                )}
            </div>

            {/* Bill Breakdown */}
            <div className="space-y-4 mb-6">
                <div className="flex justify-between text-gray-600">
                    <span className="text-[9px] uppercase tracking-widest text-gray-500">Selected Pieces</span>
                    <span className="text-sm font-medium">{totalQty}</span>
                </div>
                <div className="flex justify-between text-gray-600">
                    <span className="text-[9px] uppercase tracking-widest text-gray-500">Subtotal</span>
                    <span className="text-sm font-medium">${subtotal.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-gray-600">
                    <span className="text-[9px] uppercase tracking-widest text-gray-500">Estimated Shipping</span>
                    <span className="text-sm font-medium">${SHIPPING_ESTIMATE.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-green-600 items-center">
                    <span className="flex items-center gap-1 text-[9px] uppercase tracking-widest"><CheckCircle2 size={10} /> Import Duties</span>
                    <span className="text-[9px] uppercase tracking-widest">Paid by Brand</span>
                </div>

                <div className="border-t border-gray-200 pt-4 flex justify-between items-end">
                    <span className="font-serif text-lg">Total</span>
                    <span className="font-serif text-2xl">${total.toFixed(2)}</span>
                </div>
            </div>

            {/* Main CTA */}
            <button
                disabled={!hasItems}
                onClick={() => router.push('/order/checkout')}
                className={`w-full py-4 text-xs uppercase tracking-[0.2em] font-bold flex items-center justify-center gap-2 transition-all bg-black text-white rounded ${hasItems
                    ? 'hover:bg-gray-800 shadow-lg'
                    : 'opacity-50 cursor-not-allowed'
                    }`}
            >
                Proceed to Checkout <ArrowRight size={14} />
            </button>

            {!hasItems && (
                <p className="text-center text-[10px] text-red-400 mt-2 flex items-center justify-center gap-1">
                    <AlertCircle size={10} /> Add quantities to proceed
                </p>
            )}

            {/* Timeline Info */}
            <div className="mt-8 pt-6 border-t border-gray-100 text-center">
                <p className="text-[9px] uppercase tracking-widest text-gray-400">
                    Expected Production Timeline: <span className="text-black ml-1">4-6 Weeks</span>
                </p>
            </div>
        </div>
    )
}
