'use client'

import { useState, useEffect } from 'react'
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
    const [mounted, setMounted] = useState(false)

    useEffect(() => {
        setMounted(true)
        console.log('Checkout Page Mounted. SampleItems:', sampleItems.length)
    }, [sampleItems])

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

    if (!mounted) return <div className="min-h-screen flex items-center justify-center">Loading...</div>

    if (sampleItems.length === 0) {
        return (
            <div className="min-h-screen flex flex-col items-center justify-center bg-white gap-4">
                <h1 className="text-2xl font-serif">Your Cart is Empty</h1>
                <p className="text-mono text-xs text-red-500">DEBUG: SampleItems length is 0</p>
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
                        <div>
                            <h1 className="font-serif text-3xl">Shopping Bag ({sampleItems.length})</h1>
                            <p className="text-xs text-red-500 font-mono mt-1">DEBUG: SampleItems: {sampleItems.length}</p>
                        </div>
                    </div>

                    {/* Items List */}
                    <div className="space-y-8">
                        {sampleItems.map((item) => (
                            <motion.div
                                layout
                                key={item.product.id}
                                className="flex gap-6 border-b border-gray-100 pb-8"
                            >
                                <div className="relative w-32 aspect-[3/4] bg-gray-50 rounded-lg overflow-hidden border border-gray-200">
                                    {item.product.image ? (
                                        <Image
                                            src={item.product.image}
                                            alt={item.product.name || 'Product'}
                                            fill
                                            className="object-cover"
                                            unoptimized
                                        />
                                    ) : (
                                        <div className="absolute inset-0 flex items-center justify-center text-gray-400 text-xs text-center p-2">
                                            No Image
                                        </div>
                                    )}
                                </div>
                                <div className="flex-1 flex justify-between">
                                    <div className="space-y-2">
                                        <h3 className="font-serif text-xl">{item.product.name || 'Unnamed Product'}</h3>
                                        <p className="text-sm text-gray-500">Sample ID: {item.product.id.slice(0, 8)}</p>
                                        <div className="flex items-center gap-4 mt-4">
                                            <div className="bg-gray-50 px-3 py-1 rounded text-xs font-medium">
                                                Size: {item.size}
                                            </div>
                                            <div className="text-xs text-green-600 flex items-center gap-1">
                                                <ShieldCheck size={12} />
                                                Import duties included
                                            </div>
                                        </div>
                                    </div>
                                    <div className="text-right flex flex-col justify-between">
                                        <p className="font-medium">${SAMPLE_PRICE}</p>
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
                </div>

                {/* Right Column: Order Summary */}
                <div className="lg:col-span-5">
                    <div className="bg-gray-50 p-8 rounded-2xl sticky top-8">
                        <h2 className="font-serif text-2xl mb-8">Order Summary</h2>

                        <div className="space-y-4 mb-8">
                            <div className="flex justify-between text-gray-600">
                                <span>Subtotal</span>
                                <span>${subtotal}</span>
                            </div>
                            <div className="flex justify-between text-gray-600">
                                <span>Simulated Shipping</span>
                                <span>${SHIPPING_COST}</span>
                            </div>
                            <div className="pt-4 border-t border-gray-200 flex justify-between text-lg font-medium">
                                <span>Total</span>
                                <span>${total}</span>
                            </div>
                        </div>

                        <button
                            onClick={handlePlaceOrder}
                            disabled={isProcessing}
                            className="w-full bg-black text-white py-4 rounded-full font-medium tracking-widest hover:bg-gray-800 transition-colors disabled:opacity-50 flex items-center justify-center gap-2"
                        >
                            {isProcessing ? 'Processing...' : (
                                <>
                                    Complete Order <CreditCard size={18} />
                                </>
                            )}
                        </button>

                        <div className="mt-6 flex items-center justify-center gap-2 text-xs text-gray-400">
                            <Truck size={14} />
                            <span>Free returns within 30 days</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
