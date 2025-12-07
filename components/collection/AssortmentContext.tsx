'use client'

import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react'

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

    // B2B Order Logic
    orderQuantities: Record<string, Record<string, number>> // productId -> size -> quantity
    updateOrderQuantity: (productId: string, size: string, quantity: number) => void
    customizationNotes: Record<string, string> // productId -> note
    updateCustomizationNote: (productId: string, note: string) => void
    appointmentDetails: {
        scheduled: boolean
        date?: string
        slot?: string
    }
    scheduleAppointment: (date: string, slot: string) => void
}

const AssortmentContext = createContext<AssortmentContextType | undefined>(undefined)

export function AssortmentProvider({ children }: { children: ReactNode }) {
    const [items, setItems] = useState<Product[]>([])
    const [isTrayOpen, setTrayOpen] = useState(false)
    const [sampleItems, setSampleItems] = useState<SampleItem[]>([])

    // B2B Order State
    const [orderQuantities, setOrderQuantities] = useState<Record<string, Record<string, number>>>({})
    const [customizationNotes, setCustomizationNotes] = useState<Record<string, string>>({})
    const [appointmentDetails, setAppointmentDetails] = useState<{ scheduled: boolean, date?: string, slot?: string }>({ scheduled: false })

    const [isHydrated, setIsHydrated] = useState(false)

    // Load from localStorage on mount
    useEffect(() => {
        const savedItems = localStorage.getItem('qala_assortment')
        const savedSamples = localStorage.getItem('qala_sample_cart')
        const savedQuantities = localStorage.getItem('qala_order_quantities')
        const savedNotes = localStorage.getItem('qala_customization_notes')
        const savedAppointment = localStorage.getItem('qala_appointment')

        if (savedItems) {
            try { setItems(JSON.parse(savedItems)) } catch (e) { console.error(e) }
        }
        if (savedSamples) {
            try { setSampleItems(JSON.parse(savedSamples)) } catch (e) { console.error(e) }
        }
        if (savedQuantities) {
            try { setOrderQuantities(JSON.parse(savedQuantities)) } catch (e) { console.error(e) }
        }
        if (savedNotes) {
            try { setCustomizationNotes(JSON.parse(savedNotes)) } catch (e) { console.error(e) }
        }
        if (savedAppointment) {
            try { setAppointmentDetails(JSON.parse(savedAppointment)) } catch (e) { console.error(e) }
        }

        setIsHydrated(true)
    }, [])

    // Save to localStorage
    useEffect(() => {
        if (isHydrated) {
            localStorage.setItem('qala_assortment', JSON.stringify(items))
            localStorage.setItem('qala_sample_cart', JSON.stringify(sampleItems))
            localStorage.setItem('qala_order_quantities', JSON.stringify(orderQuantities))
            localStorage.setItem('qala_customization_notes', JSON.stringify(customizationNotes))
            localStorage.setItem('qala_appointment', JSON.stringify(appointmentDetails))
        }
    }, [items, sampleItems, orderQuantities, customizationNotes, appointmentDetails, isHydrated])

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
        if (sampleItems.some(i => i.product.id === product.id)) {
            setSampleItems(prev => {
                return prev.map(i => i.product.id === product.id ? { product, size } : i)
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

    // B2B Order Methods
    const updateOrderQuantity = (productId: string, size: string, quantity: number) => {
        setOrderQuantities(prev => {
            const productQty = prev[productId] || {}
            if (quantity <= 0) {
                const { [size]: _, ...rest } = productQty
                if (Object.keys(rest).length === 0) {
                    const { [productId]: __, ...restProducts } = prev
                    return restProducts
                }
                return { ...prev, [productId]: rest }
            }
            return {
                ...prev,
                [productId]: {
                    ...productQty,
                    [size]: quantity
                }
            }
        })
    }

    const updateCustomizationNote = (productId: string, note: string) => {
        setCustomizationNotes(prev => ({
            ...prev,
            [productId]: note
        }))
    }

    const scheduleAppointment = (date: string, slot: string) => {
        setAppointmentDetails({ scheduled: true, date, slot })
    }

    return (
        <AssortmentContext.Provider value={{
            items, addItem, removeItem, setItems, isTrayOpen, setTrayOpen,
            sampleItems, addToSampleCart, removeFromSampleCart, isInSampleCart,
            orderQuantities, updateOrderQuantity, customizationNotes, updateCustomizationNote,
            appointmentDetails, scheduleAppointment
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
