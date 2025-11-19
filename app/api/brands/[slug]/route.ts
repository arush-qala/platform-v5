import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ slug: string }> }
) {
  try {
    const { slug } = await params
    
    const brand = await prisma.brand.findUnique({
      where: { slug },
      include: {
        collections: {
          include: {
            products: {
              include: {
                images: {
                  where: { isPrimary: true },
                  take: 1,
                },
              },
              take: 3,
            },
          },
        },
        features: true,
      },
    })

    if (!brand) {
      return NextResponse.json(
        { error: 'Brand not found' },
        { status: 404 }
      )
    }

    return NextResponse.json(brand)
  } catch (error) {
    console.error('Error fetching brand:', error)
    return NextResponse.json(
      { error: 'Failed to fetch brand' },
      { status: 500 }
    )
  }
}

