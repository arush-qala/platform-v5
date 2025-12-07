'use client'

import { useState } from 'react'
import { Check } from 'lucide-react'
import { useAssortment } from '@/components/collection/AssortmentContext'

export function AssortmentActions({ product }: { product: any }) {
    const { addItem, items, setTrayOpen } = useAssortment()
    const [isAdded, setIsAdded] = useState(items.some(i => i.id === product.id))

    const handleAddToAssortment = () => {
        const success = addItem({
            id: product.id,
            name: product.name,
            price: product.price.toString(),
            image: product.images[0]?.url || '',
            fabric: product.fabricDetails || 'Unknown'
        })

        if (success) {
            setIsAdded(true)
            setTrayOpen(true)
        }
    }

    return (
        <div className="flex flex-col gap-4">
            <div className="flex items-center justify-between mb-2">
                <div>
                    <p className="text-[10px] text-[#999] mb-1 uppercase tracking-[0.15em]">Price</p>
                    <p className="text-xl font-light text-[#1a1a1a] tracking-[0.5px]">
                        ${product.price.toFixed(2)}
                    </p>
                </div>
            </div>

            <button
                onClick={handleAddToAssortment}
                disabled={isAdded}
                className={`w-full py-4 font-light transition-all tracking-[0.15em] text-[12px] flex items-center justify-center gap-2 ${isAdded
                        ? 'bg-gray-100 text-gray-500 cursor-default'
                        : 'bg-black hover:bg-gray-800 text-white'
                    }`}
            >
                {isAdded ? (
                    <>
                        <Check size={16} />
                        ADDED TO ASSORTMENT
                    </>
                ) : (
                    'ADD TO ASSORTMENT'
                )}
            </button>

            {isAdded && (
                <p className="text-center text-[10px] text-gray-400 uppercase tracking-wider">
                    View in Assortment Tray to proceed
                </p>
            )}
        </div>
    )
}
