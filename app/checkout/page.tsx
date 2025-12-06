'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import Image from 'next/image'
import { X, ArrowLeft, CreditCard, Truck, ShieldCheck } from 'lucide-react'
import { useRouter } from 'next/navigation'
import { useAssortment } from '@/components/collection/AssortmentContext'

export const dynamic = 'force-dynamic'

export default function CheckoutPage() {
    const router = useRouter()
    const { sampleItems, removeFromSampleCart } = useAssortment()
    const [isProcessing, setIsProcessing] = useState(false)

    // Calculations
    const SAMPLE_PRICE = 50
    const SHIPPING_COST = 24
    const subtotal = sampleItems.length * SAMPLE_PRICE
    const total = subtotal + SHIPPING_COST

    const handlePlaceOrder = () => {
        setIsProcessing(true)
        // Simulate API call
        setTimeout(() => {
            setIsProcessing(false)
            alert('Order Placed Successfully! (Demo)')
            router.push('/') // Redirect to home or success page
        }, 2000)
    }

    if (sampleItems.length === 0) {
        return (
            <div className="min-h-screen flex flex-col items-center justify-center bg-white">
                <h1 className="text-2xl font-serif mb-4">Your Cart is Empty</h1>
                <button
                    onClick={() => router.back()}
                    className="text-sm underline underline-offset-4"
                >
                    Go back to selection
                </button>
            </div>
        )
    }

    return (
        <div className="min-h-screen bg-white">
            <div className="max-w-7xl mx-auto px-8 py-12 grid grid-cols-1 lg:grid-cols-12 gap-16">

                {/* Left Column: Cart Items & Details */}
                <div className="lg:col-span-7 space-y-12">
                    <div className="flex items-center gap-4 mb-8">
                        <button onClick={() => router.back()} className="p-2 hover:bg-gray-100 rounded-full transition-colors">
                            <ArrowLeft size={20} />
                        </button>
                        <h1 className="font-serif text-xl">Shopping Bag ({sampleItems.length})</h1>
                    </div>

                    {/* Items List */}
                    <div className="space-y-8">
                        {sampleItems.map((item) => (
                            <motion.div
                                layout
                                key={item.product.id}
                                className="flex gap-6 border-b border-gray-100 pb-8"
                            >
                                <div className="relative w-32 aspect-[3/4] bg-gray-50 rounded-lg overflow-hidden">
                                    <Image
                                        src={item.product.image}
                                        alt={item.product.name}
                                        fill
                                        className="object-cover"
                                    />
                                </div>
                                <div className="flex-1 flex justify-between">
                                    <div className="space-y-2">
                                        <h3 className="font-serif text-base">{item.product.name}</h3>
                                        <p className="text-xs text-gray-500">Sample ID: {item.product.id.slice(0, 8)}</p>
                                        <div className="flex items-center gap-4 mt-4">
                                            <div className="bg-gray-50 px-3 py-1 rounded text-[10px] font-medium">
                                                Size: {item.size}
                                            </div>
                                            <div className="text-[10px] text-green-600 flex items-center gap-1">
                                                <ShieldCheck size={12} />
                                                Import duties included
                                            </div>
                                        </div>
                                    </div>
                                    <div className="text-right flex flex-col justify-between">
                                        <p className="font-medium text-sm">${SAMPLE_PRICE}</p>
                                        <button
                                            onClick={() => removeFromSampleCart(item.product.id)}
                                            className="text-gray-400 hover:text-red-500 transition-colors self-end p-2"
                                        >
                                            <X size={20} />
                                        </button>
                                    </div>
                                </div>
                            </motion.div>
                        ))}
                    </div>

                    {/* Delivery Info (Static) */}
                    <div className="bg-gray-50 p-6 rounded-xl space-y-4">
                        <div className="flex items-center gap-3 text-gray-800">
                            <Truck size={20} />
                            <h3 className="font-medium text-sm">Estimated Delivery</h3>
                        </div>
                        <p className="text-xs text-gray-500 pl-8">
                            Express Shipping • 3-5 Business Days
                        </p>
                    </div>
                </div>

                {/* Right Column: Order Summary */}
                <div className="lg:col-span-5">
                    <div className="sticky top-12 bg-gray-50 p-8 rounded-2xl space-y-8">
                        <h2 className="font-serif text-xl">Summary</h2>

                        <div className="space-y-4 text-xs">
                            <div className="flex justify-between text-gray-600">
                                <span>Subtotal</span>
                                <span>${subtotal.toFixed(2)}</span>
                            </div>
                            <div className="flex justify-between text-gray-600">
                                <span>Delivery</span>
                                <span>${SHIPPING_COST.toFixed(2)}</span>
                            </div>
                            <div className="flex justify-between text-green-600">
                                <span>Sale (Sample Pricing)</span>
                                <span>Included</span>
                            </div>
                        </div>

                        <div className="border-t border-gray-200 pt-4 flex justify-between items-end">
                            <span className="font-medium text-base">Total</span>
                            <div className="text-right">
                                <span className="font-bold text-xl block">${total.toFixed(2)}</span>
                                <span className="text-[10px] text-gray-500">Import duties included</span>
                            </div>
                        </div>

                        <button
                            onClick={handlePlaceOrder}
                            disabled={isProcessing}
                            className="w-full bg-black text-white py-4 rounded-full uppercase tracking-widest text-sm font-bold hover:bg-gray-800 transition-all shadow-lg disabled:opacity-70 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                        >
                            {isProcessing ? (
                                <span className="animate-pulse">Processing...</span>
                            ) : (
                                <>
                                    Go To Checkout <CreditCard size={16} />
                                </>
                            )}
                        </button>

                        <div className="flex items-center justify-center gap-4 text-gray-400">
                            {/* Payment Icons Placeholder */}
                            <div className="w-8 h-5 bg-gray-200 rounded" />
                            <div className="w-8 h-5 bg-gray-200 rounded" />
                            <div className="w-8 h-5 bg-gray-200 rounded" />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
