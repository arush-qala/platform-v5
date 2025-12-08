/**
 * LIST COLLECTIONS FOR TARGET BRANDS
 * 
 * Helper script to show available collections for:
 * - Ituvana
 * - AKHL Studio
 * - Margn
 * - Asaii
 */

import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

const TARGET_BRANDS = ['Ituvana', 'AKHL Studio', 'Margn', 'Asaii']

async function listCollections() {
    console.log('\n📋 Collections for Target Brands:\n')

    for (const brandName of TARGET_BRANDS) {
        const brand = await prisma.brand.findFirst({
            where: { name: brandName },
            include: {
                collections: {
                    select: {
                        id: true,
                        name: true,
                        slug: true,
                        season: true,
                        featured: true,
                        lookbookImages: true
                    }
                }
            }
        })

        if (!brand) {
            console.log(`⚠️  Brand "${brandName}" not found`)
            continue
        }

        console.log(`🔹 ${brand.name} (${brand.collections.length} collections)`)
        brand.collections.forEach(c => {
            const hasImages = c.lookbookImages && c.lookbookImages.length > 2
            console.log(`   - [${c.featured ? 'FEATURED' : ' '}] ${c.name} (${c.season})`)
            console.log(`     Slug: ${c.slug}`)
            console.log(`     Lookbook: ${hasImages ? '✅ Has images' : '❌ No images'}`)
        })
        console.log('')
    }
}

listCollections()
    .catch(console.error)
    .finally(() => prisma.$disconnect())
