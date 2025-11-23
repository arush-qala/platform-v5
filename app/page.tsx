'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Link from 'next/link'
import Image from 'next/image'
import { ChevronDown } from 'lucide-react'
import { useRouter } from 'next/navigation'

const categories = ['Everything', 'Dresses', 'Co-ord Sets', 'Evening Wear', 'Tops', 'Shirts', 'Pants']
const seasons = ['Everyone', 'Summer/Spring', 'Fall/Winter', 'Resortwear']

export default function Home() {
  const router = useRouter()
  const [selectedCategory, setSelectedCategory] = useState('Everything')
  const [selectedSeason, setSelectedSeason] = useState('Everyone')
  const [showCategoryDropdown, setShowCategoryDropdown] = useState(false)
  const [showSeasonDropdown, setShowSeasonDropdown] = useState(false)

  const navigateToDiscover = () => {
    const params = new URLSearchParams()
    if (selectedCategory !== 'Everything') params.append('category', selectedCategory)
    if (selectedSeason !== 'Everyone') params.append('season', selectedSeason)
    
    router.push(`/discover?${params.toString()}`)
  }

  const handleCategorySelect = (category: string) => {
    setSelectedCategory(category)
    setShowCategoryDropdown(false)
  }

  const handleSeasonSelect = (season: string) => {
    setSelectedSeason(season)
    setShowSeasonDropdown(false)
  }

  return (
    <main className="min-h-screen bg-[#f5f5f5] relative">
      {/* Hero Section - Pentagram Style Minimalism */}
      <section className="min-h-screen flex items-center justify-center px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="text-center max-w-5xl mx-auto"
        >
          {/* The Sentence with Inline Dropdowns */}
          <div className="flex flex-col items-center gap-8">
            <div className="inline-flex flex-wrap items-center justify-center gap-3 text-3xl md:text-4xl lg:text-5xl font-light leading-relaxed">
              <span className="text-deep-charcoal">I want to source for</span>
              
              {/* Category Dropdown - Inline */}
              <div className="relative inline-block">
                <button
                  onClick={() => {
                    setShowCategoryDropdown(!showCategoryDropdown)
                    setShowSeasonDropdown(false)
                  }}
                  className="group inline-flex items-center gap-2 px-6 py-3 bg-[#e8e8e8] hover:bg-[#d8d8d8] transition-all duration-300 rounded-sm"
                >
                  <span className="font-normal text-deep-charcoal">
                    {selectedCategory}
                  </span>
                  <ChevronDown className={`w-5 h-5 text-charcoal transition-transform ${showCategoryDropdown ? 'rotate-180' : ''}`} />
                </button>

              {/* Category Modal Overlay */}
              <AnimatePresence>
                {showCategoryDropdown && (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="fixed inset-0 z-50 flex items-center justify-center bg-[#f5f5f5]/95"
                    onClick={() => setShowCategoryDropdown(false)}
                  >
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: 20 }}
                      className="relative max-w-4xl w-full px-6"
                      onClick={(e) => e.stopPropagation()}
                    >
                      <div className="flex flex-wrap justify-center gap-3">
                        {categories.map((cat) => (
                          <button
                            key={cat}
                            onClick={() => handleCategorySelect(cat)}
                            className={`px-8 py-4 text-xl font-light transition-all duration-300 rounded-sm ${
                              selectedCategory === cat
                                ? 'bg-deep-charcoal text-ivory'
                                : 'bg-[#e8e8e8] text-deep-charcoal hover:bg-[#d8d8d8]'
                            }`}
                          >
                            {cat}
                          </button>
                        ))}
                      </div>
                    </motion.div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
            
            <span className="text-deep-charcoal">&</span>
            <span className="text-deep-charcoal">my boutique is</span>
            
            {/* Season Dropdown - Inline */}
            <div className="relative inline-block">
              <button
                onClick={() => {
                  setShowSeasonDropdown(!showSeasonDropdown)
                  setShowCategoryDropdown(false)
                }}
                className="group inline-flex items-center gap-2 px-6 py-3 bg-[#e8e8e8] hover:bg-[#d8d8d8] transition-all duration-300 rounded-sm"
              >
                <span className="font-normal text-deep-charcoal">
                  {selectedSeason}
                </span>
                <ChevronDown className={`w-5 h-5 text-charcoal transition-transform ${showSeasonDropdown ? 'rotate-180' : ''}`} />
              </button>

              {/* Season Modal Overlay */}
              <AnimatePresence>
                {showSeasonDropdown && (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="fixed inset-0 z-50 flex items-center justify-center bg-[#f5f5f5]/95"
                    onClick={() => setShowSeasonDropdown(false)}
                  >
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: 20 }}
                      className="relative max-w-4xl w-full px-6"
                      onClick={(e) => e.stopPropagation()}
                    >
                      <div className="flex flex-wrap justify-center gap-3">
                        {seasons.map((season) => (
                          <button
                            key={season}
                            onClick={() => handleSeasonSelect(season)}
                            className={`px-8 py-4 text-xl font-light transition-all duration-300 rounded-sm ${
                              selectedSeason === season
                                ? 'bg-deep-charcoal text-ivory'
                                : 'bg-[#e8e8e8] text-deep-charcoal hover:bg-[#d8d8d8]'
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
            </div>
          </div>

          {/* Find Button */}
          <motion.button
            onClick={navigateToDiscover}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.6 }}
            className="mt-8 px-16 py-4 bg-white text-black hover:bg-gray-100 transition-all duration-300 text-xl font-light tracking-wide border border-black"
          >
            Find
          </motion.button>
        </div>

        </motion.div>
      </section>

      {/* Floating Liquid Glass Qala Logo - Bottom Right */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ 
          opacity: 1, 
          y: [0, -8, 0],
        }}
        transition={{ 
          opacity: { duration: 1, delay: 0.8 },
          y: { 
            duration: 3, 
            repeat: Infinity, 
            ease: "easeInOut" 
          }
        }}
        className="fixed bottom-8 right-8 z-50"
      >
        <div className="relative group">
          {/* Liquid Glass Effect */}
          <div className="absolute inset-0 bg-gradient-to-br from-white/40 to-white/10 rounded-2xl blur-xl"></div>
          
          {/* Main Glass Container */}
          <div className="relative px-6 py-3 bg-white/30 backdrop-blur-md rounded-2xl border border-white/50 shadow-2xl overflow-hidden">
            {/* Animated Gradient Overlay */}
            <motion.div
              animate={{
                background: [
                  'radial-gradient(circle at 0% 0%, rgba(255,255,255,0.3) 0%, transparent 50%)',
                  'radial-gradient(circle at 100% 100%, rgba(255,255,255,0.3) 0%, transparent 50%)',
                  'radial-gradient(circle at 0% 0%, rgba(255,255,255,0.3) 0%, transparent 50%)',
                ],
              }}
              transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
              className="absolute inset-0 pointer-events-none"
            />
            
            {/* Qala Logo */}
            <Link href="/" className="relative block">
              <Image 
                src="/qala-logo.png" 
                alt="Qala Global"
                width={120}
                height={60}
                className="object-contain opacity-70"
                priority
              />
            </Link>
            
            {/* Subtle shimmer effect */}
            <motion.div
              animate={{
                x: ['-100%', '200%'],
              }}
              transition={{
                duration: 3,
                repeat: Infinity,
                repeatDelay: 2,
                ease: "easeInOut"
              }}
              className="absolute inset-0 w-1/3 bg-gradient-to-r from-transparent via-white/20 to-transparent skew-x-12"
            />
          </div>
        </div>
      </motion.div>
    </main>
  )
}
