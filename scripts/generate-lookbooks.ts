/**
 * GENERATE LOOKBOOKS FROM PRODUCTS
 * 
 * This script selects a featured collection for each brand,
 * fetches its products, and uses their images to populate the
 * 'lookbookImages' field.
 */

import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

// Configuration: Brands and their target collections
const TARGETS = [
    { brand: 'AKHL Studio', collectionSlug: 'solaris' },
    { brand: 'Ituvana', collectionSlug: 'smara-vana' },
    { brand: 'Margn', collectionSlug: 'silent-guardians' },
    { brand: 'Asaii', collectionSlug: 'susegad' }
]

async function generateLookbooks() {
    console.log('🔄 Generating lookbooks from product images...\n')

    for (const target of TARGETS) {
        try {
            // 1. Find the collection and its products
            const collection = await prisma.collection.findFirst({
                where: {
                    slug: target.collectionSlug,
                    brand: { name: target.brand }
                },
                include: {
                    products: {
                        take: 10, // Get up to 10 products
                        select: {
                            images: true
                        }
                    }
                }
            })

            if (!collection) {
                console.log(`⚠️  Collection "${target.collectionSlug}" not found for ${target.brand}`)
                continue
            }

            // 2. Extract one image from each product
            const lookbookUrlList: string[] = []

            collection.products.forEach(product => {
                // Parse the images JSON
                let images: any[] = []
                if (typeof product.images === 'string') {
                    try { images = JSON.parse(product.images) } catch (e) { }
                } else {
                    images = product.images as any[]
                }

                // Add the first image if available
                if (images && images.length > 0 && images[0].url) {
                    lookbookUrlList.push(images[0].url)
                }
            })

            if (lookbookUrlList.length < 3) {
                console.log(`⚠️  Not enough product images for ${target.brand} (Found: ${lookbookUrlList.length})`)
                continue
            }

            // 3. Update the collection with the new lookbook images
            await prisma.collection.update({
                where: { id: collection.id },
                data: {
                    lookbookImages: JSON.stringify(lookbookUrlList),
                    featured: true // Ensure it's marked as featured
                }
            })

            console.log(`✅ Updated ${target.brand} lookbook with ${lookbookUrlList.length} images`)

        } catch (error) {
            console.error(`❌ Error processing ${target.brand}:`, error)
        }
    }

    console.log('\n✨ Lookbook generation complete!')
}

generateLookbooks()
    .catch(console.error)
    .finally(() => prisma.$disconnect())
