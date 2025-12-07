'use client'

import { useAssortment } from "@/components/collection/AssortmentContext"
import AssortmentReview from "@/components/collection/AssortmentReview"
import { useRouter } from "next/navigation"
import { AnimatePresence } from "framer-motion"

export function GlobalTray() {
    const { isTrayOpen, setTrayOpen } = useAssortment()
    const router = useRouter()

    return (
        <AnimatePresence>
            {isTrayOpen && (
                <AssortmentReview
                    onClose={() => setTrayOpen(false)}
                    onNavigate={(product) => {
                        setTrayOpen(false)
                        // Determine brand slug and collection slug?
                        // Product object in context might not have simple URL info.
                        // Assuming simplistic navigation or just closing for now.
                    }}
                />
            )}
        </AnimatePresence>
    )
}
