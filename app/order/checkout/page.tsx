'use client'

import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { useAssortment } from '@/components/collection/AssortmentContext'
import { ArrowLeft, CreditCard, ShieldCheck, Truck, Check } from 'lucide-react'
import { useRouter } from 'next/navigation'
import Image from 'next/image'

const PAYMENT_MODES = [
    { id: 'amex', label: 'Amex / Credit Card' },
    { id: 'wire', label: 'Wire Transfer' },
    { id: 'netbanking', label: 'Net Banking' }
]

const PAYMENT_TERMS = [
    { id: '50-50', label: '50% Advance - 50% Before Delivery', desc: 'Standard terms' },
    { id: '30-70', label: '30% Advance - 70% Before Delivery', desc: 'For trusted partners' }
]

export default function CheckoutPage() {
    const router = useRouter()
    const { items, orderQuantities, customizationNotes, appointmentDetails } = useAssortment()
    const [term, setTerm] = useState('50-50')
    const [mode, setMode] = useState('amex')
    const [isProcessing, setIsProcessing] = useState(false)
    const [isSuccess, setIsSuccess] = useState(false)

    // Calculate totals
    let subtotal = 0
    const orderItems = items.filter(p => {
        const qty = orderQuantities[p.id] || {}
        return Object.values(qty).reduce((a, b) => a + b, 0) > 0
    })

    orderItems.forEach(product => {
        const productQtyObj = orderQuantities[product.id] || {}
        const productTotalQty = Object.values(productQtyObj).reduce((a, b) => a + b, 0)
        const price = parseFloat(product.price.replace('$', '')) || 0
        subtotal += price * productTotalQty
    })

    const SHIPPING_COST = 150
    const total = subtotal + SHIPPING_COST

    const handlePayment = () => {
        setIsProcessing(true)
        setTimeout(() => {
            setIsProcessing(false)
            setIsSuccess(true)
            // Redirect to dashboard logic here (currently just showing success screen)
        }, 2000)
    }

    if (isSuccess) {
        return (
            <div className="min-h-screen bg-white flex flex-col items-center justify-center text-center p-8">
                <motion.div
                    initial={{ scale: 0.8, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    className="bg-black text-white p-8 rounded-full mb-6"
                >
                    <Check size={48} />
                </motion.div>
                <h1 className="font-serif text-4xl mb-4">Order Placed Successfully</h1>
                <p className="text-gray-500 mb-8 max-w-md mx-auto">
                    Thank you for your order. A confirmation email has been sent.
                    You can track your order status in your dashboard.
                </p>
                <button
                    onClick={() => router.push('/')}
                    className="px-8 py-3 border border-black hover:bg-black hover:text-white transition-all uppercase tracking-widest text-xs font-bold"
                >
                    Back to Home
                </button>
            </div>
        )
    }

    return (
        <div className="min-h-screen bg-white">
            {/* Header */}
            <div className="border-b border-gray-100 bg-white sticky top-0 z-50">
                <div className="max-w-7xl mx-auto px-8 py-6 flex items-center gap-4">
                    <button onClick={() => router.back()} className="p-2 hover:bg-gray-50 rounded-full transition-colors hidden md:block">
                        <ArrowLeft size={20} className="text-gray-600" />
                    </button>
                    <h1 className="font-serif text-2xl">Purchase Order & Checkout</h1>
                </div>
            </div>

            <main className="max-w-7xl mx-auto px-8 py-12 grid grid-cols-1 lg:grid-cols-12 gap-16">

                {/* Left Column: Review & Payment */}
                <div className="lg:col-span-7 space-y-12">

                    {/* Item Review */}
                    <section>
                        <h2 className="font-serif text-xl mb-6 flex items-center gap-2">
                            <span className="bg-black text-white w-6 h-6 rounded-full text-xs flex items-center justify-center">1</span>
                            Order Review
                        </h2>
                        <div className="space-y-6">
                            {orderItems.map(item => {
                                const qtyObj = orderQuantities[item.id]
                                const totalProductQty = Object.values(qtyObj).reduce((a, b) => a + b, 0)
                                return (
                                    <div key={item.id} className="flex gap-4 border-b border-gray-50 pb-6">
                                        <div className="relative w-20 aspect-[3/4] bg-gray-50 rounded-sm">
                                            <Image src={item.image} alt={item.name} fill className="object-cover" />
                                        </div>
                                        <div className="flex-1">
                                            <div className="flex justify-between mb-1">
                                                <h3 className="font-serif font-medium">{item.name}</h3>
                                                <p className="font-serif">${item.price}</p>
                                            </div>
                                            <p className="text-xs text-gray-400 mb-2">ID: {item.id.slice(0, 8)}</p>

                                            {/* Size Breakdown */}
                                            <div className="flex flex-wrap gap-2 mb-2">
                                                {Object.entries(qtyObj).map(([size, q]) => q > 0 && (
                                                    <span key={size} className="bg-gray-50 px-2 py-1 text-[10px] text-gray-600 rounded">
                                                        {size}: {q}
                                                    </span>
                                                ))}
                                            </div>

                                            {/* Customisation Note */}
                                            {customizationNotes[item.id] && (
                                                <div className="bg-yellow-50 p-2 rounded text-xs text-yellow-800 border border-yellow-100 mt-2">
                                                    <span className="font-semibold">Note:</span> {customizationNotes[item.id]}
                                                </div>
                                            )}
                                        </div>
                                    </div>
                                )
                            })}
                        </div>
                    </section>

                    {/* Payment Terms */}
                    <section>
                        <h2 className="font-serif text-xl mb-6 flex items-center gap-2">
                            <span className="bg-black text-white w-6 h-6 rounded-full text-xs flex items-center justify-center">2</span>
                            Payment Terms
                        </h2>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            {PAYMENT_TERMS.map((t) => (
                                <button
                                    key={t.id}
                                    onClick={() => setTerm(t.id)}
                                    className={`p-4 border rounded-lg text-left transition-all ${term === t.id ? 'border-black bg-gray-50' : 'border-gray-200'
                                        }`}
                                >
                                    <h4 className="font-medium text-sm mb-1">{t.label}</h4>
                                    <p className="text-xs text-gray-500">{t.desc}</p>
                                </button>
                            ))}
                        </div>
                    </section>

                    {/* Payment Mode */}
                    <section>
                        <h2 className="font-serif text-xl mb-6 flex items-center gap-2">
                            <span className="bg-black text-white w-6 h-6 rounded-full text-xs flex items-center justify-center">3</span>
                            Payment Method
                        </h2>
                        <div className="space-y-3">
                            {PAYMENT_MODES.map((m) => (
                                <button
                                    key={m.id}
                                    onClick={() => setMode(m.id)}
                                    className={`w-full p-4 border rounded-lg flex items-center justify-between transition-all ${mode === m.id ? 'border-black bg-gray-50' : 'border-gray-200'
                                        }`}
                                >
                                    <span className="text-sm font-medium">{m.label}</span>
                                    {mode === m.id && <div className="w-3 h-3 bg-black rounded-full" />}
                                </button>
                            ))}
                        </div>
                    </section>
                </div>

                {/* Right Column: Final Summary */}
                <div className="lg:col-span-5">
                    <div className="bg-gray-50 p-8 rounded-xl sticky top-24">
                        <h2 className="font-serif text-2xl mb-6">Payment Summary</h2>

                        <div className="space-y-4 text-sm mb-6 border-b border-gray-200 pb-6">
                            <div className="flex justify-between text-gray-600">
                                <span>Subtotal</span>
                                <span>${subtotal.toFixed(2)}</span>
                            </div>
                            <div className="flex justify-between text-gray-600">
                                <span>Shipping & Handling</span>
                                <span>${SHIPPING_COST.toFixed(2)}</span>
                            </div>
                            <div className="flex justify-between text-green-600 text-xs">
                                <span>Duties & Taxes</span>
                                <span>Included</span>
                            </div>
                        </div>

                        <div className="flex justify-between items-end mb-8">
                            <span className="font-medium text-lg">Total Payable</span>
                            <div className="text-right">
                                <span className="font-serif text-3xl font-bold block">${total.toFixed(2)}</span>
                                <span className="text-xs text-gray-500">
                                    {term === '50-50' ? '50% due now: $' + (total * 0.5).toFixed(2) : '30% due now: $' + (total * 0.3).toFixed(2)}
                                </span>
                            </div>
                        </div>

                        {/* Appointment Info badge */}
                        {appointmentDetails.scheduled && (
                            <div className="bg-white p-3 rounded border border-green-100 flex items-center gap-2 text-xs text-green-800 mb-6">
                                <Check size={14} /> Customisation Consultation Scheduled
                            </div>
                        )}

                        <button
                            onClick={handlePayment}
                            disabled={isProcessing}
                            className="w-full bg-black text-white py-4 text-sm uppercase tracking-widest font-bold hover:bg-gray-800 transition-all shadow-lg disabled:opacity-70 flex items-center justify-center gap-2"
                        >
                            {isProcessing ? 'Processing...' : (
                                <>Make Payment <CreditCard size={16} /></>
                            )}
                        </button>

                        <div className="mt-6 flex items-center justify-center gap-2 text-gray-400 text-xs">
                            <ShieldCheck size={14} /> Secure Payment Processing
                        </div>
                    </div>
                </div>
            </main>
        </div>
    )
}
