'use client'

import React, { createContext, useContext, useState, ReactNode } from 'react'

type Product = {
    id: string
    name: string
    price: string
    image: string
    fabric?: string
    feels_like?: string
}

type SampleItem = {
    product: Product
    size: string
}

type AssortmentContextType = {
    items: Product[]
    addItem: (product: Product) => boolean
    removeItem: (id: string) => void
    setItems: (items: Product[]) => void
    isTrayOpen: boolean
    setTrayOpen: (open: boolean) => void
    // Sample Crate Logic
    sampleItems: SampleItem[]
    addToSampleCart: (product: Product, size: string) => boolean
    removeFromSampleCart: (productId: string) => void
    isInSampleCart: (productId: string) => boolean
}

const AssortmentContext = createContext<AssortmentContextType | undefined>(undefined)

export function AssortmentProvider({ children }: { children: ReactNode }) {
    const [items, setItems] = useState<Product[]>([])
    const [isTrayOpen, setTrayOpen] = useState(false)
    const [sampleItems, setSampleItems] = useState<SampleItem[]>([])

    const addItem = (product: Product) => {
        if (items.length >= 10) return false
        if (items.some(i => i.id === product.id)) return false

        setItems(prev => [...prev, product])
        setTrayOpen(true)
        return true
    }

    const removeItem = (id: string) => {
        setItems(prev => prev.filter(i => i.id !== id))
    }

    // Sample Crate Methods
    const addToSampleCart = (product: Product, size: string) => {
        if (sampleItems.length >= 5) return false
        // Check if product is already in cart (regardless of size, or maybe allow different sizes? Assuming 1 per product for now based on "selected" state)
        if (sampleItems.some(i => i.product.id === product.id)) {
            // Update size if already exists? Or just return false?
            // Let's update size if it exists, or return false if we want strict "already added"
            // For now, let's just add it. If it exists, we replace it?
            // User requirement: "product will be denoted as selected".
            // So if I select it again, maybe I change size.
            setSampleItems(prev => {
                const existing = prev.find(i => i.product.id === product.id)
                if (existing) {
                    return prev.map(i => i.product.id === product.id ? { product, size } : i)
                }
                return [...prev, { product, size }]
            })
            return true
        }

        setSampleItems(prev => [...prev, { product, size }])
        return true
    }

    const removeFromSampleCart = (productId: string) => {
        setSampleItems(prev => prev.filter(i => i.product.id !== productId))
    }

    const isInSampleCart = (productId: string) => {
        return sampleItems.some(i => i.product.id === productId)
    }

    return (
        <AssortmentContext.Provider value={{
            items, addItem, removeItem, setItems, isTrayOpen, setTrayOpen,
            sampleItems, addToSampleCart, removeFromSampleCart, isInSampleCart
        }}>
            {children}
        </AssortmentContext.Provider>
    )
}

export function useAssortment() {
    const context = useContext(AssortmentContext)
    if (context === undefined) {
        throw new Error('useAssortment must be used within an AssortmentProvider')
    }
    return context
}
