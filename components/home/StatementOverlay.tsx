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
    const [activeModal, setActiveModal] = useState<'category' | 'season' | null>(null)

    return (
        <>
            {/* Centered Statement Container */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-20 w-full max-w-[90%] md:max-w-none flex justify-center pointer-events-none">
                <div
                    className="bg-[#F5F3F0]/90 backdrop-blur-md rounded-sm shadow-sm flex flex-wrap items-center justify-center gap-x-2 gap-y-3 text-[18px] md:text-[20px] leading-relaxed pointer-events-auto transition-all duration-300 hover:bg-[#F5F3F0]/95"
                    style={{ padding: '2.5rem 4rem' }}
                >
                    <span className="text-[#6b6b6b] font-normal whitespace-nowrap">
                        I want to source for
                    </span>

                    <button
                        onClick={() => setActiveModal('category')}
                        className="inline-flex items-center gap-1 font-medium text-[#1a1a1a] hover:text-black hover:underline decoration-black/30 underline-offset-4 transition-all"
                    >
                        {category}
                        <ChevronDown size={14} className={`transition-transform duration-200 ${activeModal === 'category' ? 'rotate-180' : ''}`} />
                    </button>

                    <span className="text-[#6b6b6b] font-normal whitespace-nowrap">
                        & my boutique is
                    </span>

                    <button
                        onClick={() => setActiveModal('season')}
                        className="inline-flex items-center gap-1 font-medium text-[#1a1a1a] hover:text-black hover:underline decoration-black/30 underline-offset-4 transition-all"
                    >
                        {season}
                        <ChevronDown size={14} className={`transition-transform duration-200 ${activeModal === 'season' ? 'rotate-180' : ''}`} />
                    </button>

                    {/* Find Button */}
                    <button
                        onClick={onFind}
                        className="ml-4 px-8 py-2.5 bg-black text-white text-sm uppercase tracking-widest rounded-sm hover:bg-gray-800 transition-colors shadow-lg"
                    >
                        Find
                    </button>
                </div>
            </div>

            {/* Full Screen Modals */}
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
