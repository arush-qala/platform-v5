'use client';

import { useState, useEffect, Suspense } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import DualSelectorFilter from '@/components/DualSelectorFilter';
import BrandTimeline from '@/components/BrandTimeline';
import { filterBrands } from '@/data/brands';
import { ClothingCategory, Season } from '@/types';

function HomeContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [category, setCategory] = useState<ClothingCategory | null>(
    (searchParams.get('category') as ClothingCategory) || null
  );
  const [season, setSeason] = useState<Season | null>(
    (searchParams.get('season') as Season) || null
  );
  const [filteredBrands, setFilteredBrands] = useState(filterBrands(category, season));

  const handleFilterChange = (newCategory: ClothingCategory | null, newSeason: Season | null) => {
    setCategory(newCategory);
    setSeason(newSeason);
    
    // Update URL
    const params = new URLSearchParams();
    if (newCategory) params.set('category', newCategory);
    if (newSeason) params.set('season', newSeason);
    router.push(`/?${params.toString()}`, { scroll: false });
    
    // Filter brands
    const filtered = filterBrands(newCategory, newSeason);
    setFilteredBrands(filtered);
  };

  return (
    <main className="min-h-screen luxury-bg">
      {/* Hero Section with Filter */}
      <div className="relative min-h-screen flex items-center justify-center">
        <div className="absolute inset-0 z-0">
          <div className="w-full h-full bg-gradient-to-br from-[#faf8f3] via-[#f5f1e8] to-[#f0ede3]" />
        </div>
        
        <DualSelectorFilter onFilterChange={handleFilterChange} />
        
        <div className="absolute bottom-20 left-1/2 -translate-x-1/2 text-center z-10">
          <p className="text-sm text-gray-500 mb-2">
            {filteredBrands.length} {filteredBrands.length === 1 ? 'brand' : 'brands'} found
          </p>
        </div>
      </div>

      {/* Brand Timeline Section */}
      {filteredBrands.length > 0 && (
        <BrandTimeline brands={filteredBrands.slice(0, 5)} />
      )}

      {filteredBrands.length === 0 && (
        <div className="min-h-screen flex items-center justify-center">
          <div className="text-center">
            <h2 className="text-3xl font-light text-gray-700 mb-4">No brands found</h2>
            <p className="text-gray-500">Try adjusting your filters</p>
          </div>
        </div>
      )}
    </main>
  );
}

export default function Home() {
  return (
    <Suspense fallback={
      <main className="min-h-screen luxury-bg flex items-center justify-center">
        <div className="text-center">
          <p className="text-gray-600">Loading...</p>
        </div>
      </main>
    }>
      <HomeContent />
    </Suspense>
  );
}
