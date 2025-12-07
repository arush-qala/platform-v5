'use client'

import { AssortmentProvider } from "@/components/collection/AssortmentContext"
import { GlobalTray } from "@/components/GlobalTray"
import { ReactNode } from "react"

export function Providers({ children }: { children: ReactNode }) {
    return (
        <AssortmentProvider>
            {children}
            <GlobalTray />
        </AssortmentProvider>
    )
}
