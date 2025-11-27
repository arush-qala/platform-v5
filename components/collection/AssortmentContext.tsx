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

type AssortmentContextType = {
    items: Product[]
    addItem: (product: Product) => boolean
    removeItem: (id: string) => void
    isTrayOpen: boolean
    setTrayOpen: (open: boolean) => void
}

const AssortmentContext = createContext<AssortmentContextType | undefined>(undefined)

export function AssortmentProvider({ children }: { children: ReactNode }) {
    const [items, setItems] = useState<Product[]>([])
    const [isTrayOpen, setTrayOpen] = useState(false)

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

    return (
        <AssortmentContext.Provider value={{ items, addItem, removeItem, isTrayOpen, setTrayOpen }}>
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
