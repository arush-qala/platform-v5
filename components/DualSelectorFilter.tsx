'use client';

import { useState } from 'react';
import { X } from 'lucide-react';
import { ClothingCategory, Season } from '@/types';

interface DualSelectorFilterProps {
  onFilterChange: (category: ClothingCategory | null, season: Season | null) => void;
}

const categories: ClothingCategory[] = ['dresses', 'co-ord sets', 'evening wear', 'tops', 'shirts', 'pants'];
const seasons: Season[] = ['Summer/Spring', 'Fall/Winter', 'resortwear'];

export default function DualSelectorFilter({ onFilterChange }: DualSelectorFilterProps) {
  const [selectedCategory, setSelectedCategory] = useState<ClothingCategory | null>(null);
  const [selectedSeason, setSelectedSeason] = useState<Season | null>(null);
  const [isCategoryOpen, setIsCategoryOpen] = useState(false);
  const [isSeasonOpen, setIsSeasonOpen] = useState(false);

  const handleCategorySelect = (category: ClothingCategory) => {
    setSelectedCategory(category);
    setIsCategoryOpen(false);
    onFilterChange(category, selectedSeason);
  };

  const handleSeasonSelect = (season: Season) => {
    setSelectedSeason(season);
    setIsSeasonOpen(false);
    onFilterChange(selectedCategory, season);
  };

  const handleClear = () => {
    setSelectedCategory(null);
    setSelectedSeason(null);
    onFilterChange(null, null);
  };

  return (
    <div className="fixed top-8 left-1/2 -translate-x-1/2 z-50">
      <div className="bg-white/95 backdrop-blur-md rounded-full px-8 py-4 shadow-lg border border-gray-200/50">
        <div className="flex items-center gap-2 text-lg">
          <span className="text-gray-700">I want to find</span>
          
          {/* Category Dropdown */}
          <div className="relative">
            <button
              onClick={() => {
                setIsCategoryOpen(true);
                setIsSeasonOpen(false);
              }}
              className="px-4 py-2 rounded-full bg-gray-100 hover:bg-gray-200 transition-colors min-w-[140px] text-left"
            >
              {selectedCategory || 'Everything'}
            </button>
            
            {isCategoryOpen && (
              <>
                <div 
                  className="fixed inset-0 bg-black/20 backdrop-blur-sm z-40"
                  onClick={() => setIsCategoryOpen(false)}
                />
                <div className="fixed inset-0 flex items-center justify-center z-50 pointer-events-none">
                  <div className="bg-white rounded-2xl p-8 max-w-2xl w-full mx-4 shadow-2xl pointer-events-auto">
                    <div className="flex justify-between items-center mb-6">
                      <h3 className="text-2xl font-light">Select Category</h3>
                      <button
                        onClick={() => setIsCategoryOpen(false)}
                        className="p-2 hover:bg-gray-100 rounded-full transition-colors"
                      >
                        <X className="w-5 h-5" />
                      </button>
                    </div>
                    <div className="flex flex-wrap gap-3 justify-center">
                      {categories.map((category) => (
                        <button
                          key={category}
                          onClick={() => handleCategorySelect(category)}
                          className={`px-6 py-3 rounded-full text-base transition-all ${
                            selectedCategory === category
                              ? 'bg-gray-900 text-white'
                              : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                          }`}
                        >
                          {category}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
              </>
            )}
          </div>

          <span className="text-gray-700">for</span>

          {/* Season Dropdown */}
          <div className="relative">
            <button
              onClick={() => {
                setIsSeasonOpen(true);
                setIsCategoryOpen(false);
              }}
              className="px-4 py-2 rounded-full bg-gray-100 hover:bg-gray-200 transition-colors min-w-[140px] text-left"
            >
              {selectedSeason || 'Everyone'}
            </button>
            
            {isSeasonOpen && (
              <>
                <div 
                  className="fixed inset-0 bg-black/20 backdrop-blur-sm z-40"
                  onClick={() => setIsSeasonOpen(false)}
                />
                <div className="fixed inset-0 flex items-center justify-center z-50 pointer-events-none">
                  <div className="bg-white rounded-2xl p-8 max-w-2xl w-full mx-4 shadow-2xl pointer-events-auto">
                    <div className="flex justify-between items-center mb-6">
                      <h3 className="text-2xl font-light">Select Season</h3>
                      <button
                        onClick={() => setIsSeasonOpen(false)}
                        className="p-2 hover:bg-gray-100 rounded-full transition-colors"
                      >
                        <X className="w-5 h-5" />
                      </button>
                    </div>
                    <div className="flex flex-wrap gap-3 justify-center">
                      {seasons.map((season) => (
                        <button
                          key={season}
                          onClick={() => handleSeasonSelect(season)}
                          className={`px-6 py-3 rounded-full text-base transition-all ${
                            selectedSeason === season
                              ? 'bg-gray-900 text-white'
                              : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                          }`}
                        >
                          {season}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
              </>
            )}
          </div>

          {(selectedCategory || selectedSeason) && (
            <button
              onClick={handleClear}
              className="ml-2 px-3 py-1 text-sm text-gray-500 hover:text-gray-700 transition-colors"
            >
              Clear
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

