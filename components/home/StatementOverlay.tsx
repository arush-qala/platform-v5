'use client'

import { useState } from 'react'
import { ChevronDown } from 'lucide-react'
import { DropdownModal } from './DropdownModal'

interface StatementOverlayProps {
    category: string
    season: string
    onCategoryChange: (category: string) => void
    onSeasonChange: (season: string) => void
    onFind: () => void
}

const CATEGORIES = [
    'Dresses', 'Co-ord sets', 'Evening wear', 'Tops', 'Shirts', 'Pants', 'Outerwear', 'Accessories'
]

const SEASONS = [
    'Summer/Spring', 'Fall/Winter', 'Resortwear', 'Pre-Fall'
]

export function StatementOverlay({
    category,
    season,
    onCategoryChange,
    onSeasonChange,
    onFind
}: StatementOverlayProps) {
    {/* Full Screen Modals */ }
            <DropdownModal
                isOpen={activeModal === 'category'}
                onClose={() => setActiveModal(null)}
                title="Category"
                options={CATEGORIES}
                currentValue={category}
                onSelect={onCategoryChange}
            />

            <DropdownModal
                isOpen={activeModal === 'season'}
                onClose={() => setActiveModal(null)}
                title="Season"
                options={SEASONS}
                currentValue={season}
                onSelect={onSeasonChange}
            />
        </>
    )
}
