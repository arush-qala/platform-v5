/**
 * BRANDS API ROUTE - GET /api/brands
 * 
 * BUSINESS PURPOSE:
 * This API endpoint fetches brand suggestions for the discover page.
 * It implements the filtering logic based on category and season parameters
 * from the homepage selection.
 * 
 * QUERY PARAMETERS:
 * - category: Product category filter (e.g., "Dresses", "Co-ord Sets")
 *   - If "Everything" or not provided: no category filtering
 * - season: Collection season filter (e.g., "Summer/Spring", "Fall/Winter")
 *   - If "Everyone" or not provided: no season filtering
 * 
 * FILTERING LOGIC:
 * 1. First, fetch featured brands with season-filtered collections
 * 2. If category filter provided, filter brands by matching aesthetic tags
 * 3. If result has fewer than 5 brands, fetch additional brands to fill
 * 
 * BUSINESS REQUIREMENT:
 * Always return exactly 5 brands (or fewer if not enough exist)
 * This ensures the discover page has a consistent, focused experience
 * 
 * RESPONSE FORMAT:
 * Returns array of Brand objects with:
 * - Basic brand info (name, slug, description, location, etc.)
 * - One collection per brand (for display on discover page)
 * - Collections are pre-filtered by season if season param provided
 */

import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

/**
 * GET Handler - Fetch Brands with Filters
 * 
 * FILTERING STRATEGY:
 * 1. Start with featured brands (prioritize quality brands)
 * 2. Filter collections by season if season param provided
 * 3. Filter brands by category using aesthetic tags
 * 4. Fill to 5 brands if needed
 * 
 * PERFORMANCE:
 * - Uses Prisma indexes for fast queries
 * - Limits collections to 1 per brand (only need for display)
 * - Limits total brands to 5 (business requirement)
 */
export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams
    const category = searchParams.get('category')
    const season = searchParams.get('season')

    /**
     * STEP 1: Fetch Featured Brands
     * 
     * QUERY LOGIC:
     * - Only fetch featured brands (quality filter)
     * - Include one collection per brand (for display)
     * - Filter collections by season if season param provided
     * - Limit to 5 brands initially
     */
    let brands = await prisma.brand.findMany({
      where: {
        featured: true, // Only show featured brands
      },
      include: {
        collections: {
          // Filter collections by season if season param provided
          where: season && season !== 'Everyone' ? {
            season: season,
          } : {},
          take: 1, // Only need one collection for discover page display
        },
      },
      take: 5, // Initial limit of 5 brands
    })

    /**
     * STEP 2: Filter by Category (if provided)
     * 
     * CATEGORY MATCHING LOGIC:
     * - Brand.aesthetic is a JSON array of style tags
     * - Check if any aesthetic tag matches the category
     * - Case-insensitive matching
     * - Bidirectional matching (category in tag OR tag in category)
     * 
     * EXAMPLE:
     * - Category: "Dresses"
     * - Brand aesthetic: ["evening wear", "dresses", "luxury"]
     * - Match: "dresses" tag matches "Dresses" category
     */
    if (category && category !== 'Everything') {
      brands = brands.filter(brand => {
        const aesthetic = JSON.parse(brand.aesthetic)
        return aesthetic.some((tag: string) =>
          tag.toLowerCase().includes(category.toLowerCase()) ||
          category.toLowerCase().includes(tag.toLowerCase())
        )
      })
    }

    /**
     * STEP 3: Fill to 5 Brands (if needed)
     * 
     * BUSINESS REQUIREMENT:
     * Discover page should always show 5 brands if available.
     * If filtering reduced results below 5, fetch additional brands
     * to maintain a full, curated experience.
     * 
     * QUERY LOGIC:
     * - Fetch additional featured brands not already in results
     * - Apply same season filter to collections
     * - Take only enough to reach 5 total brands
     */
    if (brands.length < 5) {
      const additionalBrands = await prisma.brand.findMany({
        where: {
          featured: true,
          id: {
            notIn: brands.map(b => b.id), // Exclude already-fetched brands
          },
        },
        include: {
          collections: {
            where: season && season !== 'Everyone' ? {
              season: season,
            } : {},
            take: 1,
          },
        },
        take: 5 - brands.length, // Only fetch enough to reach 5 total
      })
      brands = [...brands, ...additionalBrands]
    }

    // Sort brands to prioritize 'doodlage' as Label 1
    brands.sort((a, b) => {
      if (a.slug === 'doodlage') return -1
      if (b.slug === 'doodlage') return 1
      return 0
    })

    return NextResponse.json(brands)
  } catch (error) {
    console.error('Error fetching brands:', error)
    return NextResponse.json(
      { error: 'Failed to fetch brands' },
      { status: 500 }
    )
  }
}

