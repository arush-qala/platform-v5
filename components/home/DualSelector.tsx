'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ChevronDown } from 'lucide-react'

const categories = [
  'Everything',
  'Dresses',
  'Co-ord Sets',
  'Evening Wear',
  'Tops',
  'Shirts',
  'Pants',
]

const seasons = [
  'Everyone',
  'Summer/Spring',
  'Fall/Winter',
  'Resortwear',
]

interface DualSelectorProps {
  onSelectionChange: (category: string, season: string) => void
}

export function DualSelector({ onSelectionChange }: DualSelectorProps) {
  const [selectedCategory, setSelectedCategory] = useState('Everything')
  const [selectedSeason, setSelectedSeason] = useState('Everyone')
  const [activeModal, setActiveModal] = useState<'category' | 'season' | null>(null)

  const handleCategorySelect = (category: string) => {
    setSelectedCategory(category)
    setActiveModal(null)
    onSelectionChange(category, selectedSeason)
  }

  const handleSeasonSelect = (season: string) => {
    setSelectedSeason(season)
    setActiveModal(null)
    onSelectionChange(selectedCategory, season)
  }

  return (
    <>
      <div className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-30 w-full max-w-4xl px-6">
        <div className="text-center">
          <h2 className="text-4xl md:text-5xl lg:text-6xl mb-8 text-deep-charcoal font-light">
            I want to find
          </h2>
          
          <div className="flex flex-col md:flex-row items-center justify-center gap-4 md:gap-6 text-2xl md:text-3xl lg:text-4xl">
            <button
              onClick={() => setActiveModal('category')}
              className="group relative inline-flex items-center gap-3 px-8 py-4 bg-ivory border-2 border-warm-grey hover:border-gold-accent transition-all duration-300 rounded-sm"
            >
              <span className="font-cormorant text-charcoal group-hover:text-gold-accent transition-colors">
                {selectedCategory}
              </span>
              <ChevronDown className="w-6 h-6 text-taupe group-hover:text-gold-accent transition-all group-hover:translate-y-1" />
            </button>
            
            <span className="text-taupe font-light">for</span>
            
            <button
              onClick={() => setActiveModal('season')}
              className="group relative inline-flex items-center gap-3 px-8 py-4 bg-ivory border-2 border-warm-grey hover:border-gold-accent transition-all duration-300 rounded-sm"
            >
              <span className="font-cormorant text-charcoal group-hover:text-gold-accent transition-colors">
                {selectedSeason}
              </span>
              <ChevronDown className="w-6 h-6 text-taupe group-hover:text-gold-accent transition-all group-hover:translate-y-1" />
            </button>
          </div>
        </div>
      </div>

      {/* Category Modal */}
      <AnimatePresence>
        {activeModal === 'category' && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-40 flex items-center justify-center"
            onClick={() => setActiveModal(null)}
          >
            <div className="absolute inset-0 bg-cream/95 backdrop-blur-md" />
            
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              transition={{ duration: 0.3, delay: 0.1 }}
              className="relative z-50 max-w-4xl w-full px-6"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="text-center mb-12">
                <h3 className="text-3xl md:text-4xl font-cormorant text-deep-charcoal mb-4">
                  Select Category
                </h3>
                <p className="text-taupe">What are you looking for?</p>
              </div>
              
              <div className="flex flex-wrap justify-center gap-4">
                {categories.map((category) => (
                  <button
                    key={category}
                    onClick={() => handleCategorySelect(category)}
                    className={`px-8 py-4 text-lg md:text-xl font-cormorant rounded-full transition-all duration-300 ${
                      selectedCategory === category
                        ? 'bg-deep-charcoal text-ivory'
                        : 'bg-ivory text-charcoal hover:bg-sand border-2 border-warm-grey hover:border-gold-accent'
                    }`}
                  >
                    {category}
                  </button>
                ))}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Season Modal */}
      <AnimatePresence>
        {activeModal === 'season' && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-40 flex items-center justify-center"
            onClick={() => setActiveModal(null)}
          >
            <div className="absolute inset-0 bg-cream/95 backdrop-blur-md" />
            
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              transition={{ duration: 0.3, delay: 0.1 }}
              className="relative z-50 max-w-4xl w-full px-6"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="text-center mb-12">
                <h3 className="text-3xl md:text-4xl font-cormorant text-deep-charcoal mb-4">
                  Select Season
                </h3>
                <p className="text-taupe">Which season or occasion?</p>
              </div>
              
              <div className="flex flex-wrap justify-center gap-4">
                {seasons.map((season) => (
                  <button
                    key={season}
                    onClick={() => handleSeasonSelect(season)}
                    className={`px-8 py-4 text-lg md:text-xl font-cormorant rounded-full transition-all duration-300 ${
                      selectedSeason === season
                        ? 'bg-deep-charcoal text-ivory'
                        : 'bg-ivory text-charcoal hover:bg-sand border-2 border-warm-grey hover:border-gold-accent'
                    }`}
                  >
                    {season}
                  </button>
                ))}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}

