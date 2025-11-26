'use client'

import { useState, useEffect } from 'react'
import { HeroCarousel, type Slide } from '@/components/home/HeroCarousel'
import { StatementOverlay } from '@/components/home/StatementOverlay'
import { useRouter } from 'next/navigation'
import { motion } from 'framer-motion'

// Sample Data - In a real app, this might come from a CMS or API
const HERO_SLIDES: Slide[] = [
  {
    id: 1,
    image: '/images/hero/slide1.jpg',
    title: 'Maison Solène',
    description: 'Contemporary elegance meets timeless Parisian craftsmanship.',
    category: 'Dresses',
    season: 'Summer/Spring'
  },
  {
    id: 2,
    image: '/images/hero/slide2.jpg',
    title: 'L\'Art de la Soie',
    description: 'Hand-painted silk collections for the modern resort lifestyle.',
    category: 'Resortwear',
    season: 'Resortwear'
  },
  {
    id: 3,
    image: '/images/hero/slide3.jpg',
    title: 'Nordic Minimalist',
    description: 'Sustainable outerwear designed for the urban explorer.',
    category: 'Outerwear',
    season: 'Fall/Winter'
  },
  {
    id: 4,
    image: '/images/hero/slide4.jpg',
    title: 'Evening Allure',
    description: 'Sophisticated evening wear for special occasions.',
    category: 'Evening wear',
    season: 'Pre-Fall'
  }
]

export default function Home() {
  const router = useRouter()
  const [currentSlideIndex, setCurrentSlideIndex] = useState(0)

  // State for the statement overlay
  // We initialize with the first slide's values
  const [selectedCategory, setSelectedCategory] = useState(HERO_SLIDES[0].category)
  const [selectedSeason, setSelectedSeason] = useState(HERO_SLIDES[0].season)

  // Track if user has manually interacted with the dropdowns
  // If true, we stop auto-syncing with the carousel
  const [hasUserInteracted, setHasUserInteracted] = useState(false)

  // Sync statement with carousel slide changes
  useEffect(() => {
    if (!hasUserInteracted) {
      setSelectedCategory(HERO_SLIDES[currentSlideIndex].category)
      setSelectedSeason(HERO_SLIDES[currentSlideIndex].season)
    }
  }, [currentSlideIndex, hasUserInteracted])

  const handleManualCategoryChange = (category: string) => {
    setSelectedCategory(category)
    setHasUserInteracted(true)
  }

  const handleManualSeasonChange = (season: string) => {
    setSelectedSeason(season)
    setHasUserInteracted(true)
  }

  const handleFindBrands = () => {
    const params = new URLSearchParams()
    params.set('category', selectedCategory)
    params.set('season', selectedSeason)
    router.push(`/discover?${params.toString()}`)
  }

  return (
    <main className="relative min-h-screen bg-white overflow-hidden">
      {/* HERO SECTION */}
      <section className="relative h-screen w-full">
        <HeroCarousel
          slides={HERO_SLIDES}
          currentIndex={currentSlideIndex}
          onChange={setCurrentSlideIndex}
        />

        <StatementOverlay
          category={selectedCategory}
          season={selectedSeason}
          onCategoryChange={handleManualCategoryChange}
          onSeasonChange={handleManualSeasonChange}
          onFind={handleFindBrands}
        />
      </section>

      {/* QALA Logo - Fixed Bottom Right */}
      <div className="fixed bottom-8 right-8 z-50 mix-blend-difference text-white pointer-events-none hidden md:block">
        <h1 className="text-4xl font-cormorant font-light tracking-[0.2em]">QALA</h1>
      </div>
    </main>
  )
}
