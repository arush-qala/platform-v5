'use client'

import { AssortmentProvider } from "@/components/collection/AssortmentContext"
import { ReactNode } from "react"

export function Providers({ children }: { children: ReactNode }) {
    return (
        <AssortmentProvider>
            {children}
        </AssortmentProvider>
    )
}
