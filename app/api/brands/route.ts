import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams
    const category = searchParams.get('category')
    const season = searchParams.get('season')

    let brands = await prisma.brand.findMany({
      where: {
        featured: true,
      },
      include: {
        collections: {
          where: season && season !== 'Everyone' ? {
            season: season,
          } : {},
          take: 1,
        },
      },
      take: 5,
    })

    // Filter by category if specified and not "Everything"
    if (category && category !== 'Everything') {
      brands = brands.filter(brand => {
        const aesthetic = JSON.parse(brand.aesthetic)
        return aesthetic.some((tag: string) => 
          tag.toLowerCase().includes(category.toLowerCase()) ||
          category.toLowerCase().includes(tag.toLowerCase())
        )
      })
    }

    // If we have fewer than 5 brands after filtering, get more
    if (brands.length < 5) {
      const additionalBrands = await prisma.brand.findMany({
        where: {
          featured: true,
          id: {
            notIn: brands.map(b => b.id),
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
        take: 5 - brands.length,
      })
      brands = [...brands, ...additionalBrands]
    }

    return NextResponse.json(brands)
  } catch (error) {
    console.error('Error fetching brands:', error)
    return NextResponse.json(
      { error: 'Failed to fetch brands' },
      { status: 500 }
    )
  }
}

