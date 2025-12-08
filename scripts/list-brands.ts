/**
 * LIST ALL BRANDS SCRIPT
 * Quick script to see all brand names in the database
 */

import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function listBrands() {
    const brands = await prisma.brand.findMany({
        select: {
            id: true,
            name: true,
            slug: true
        },
        orderBy: {
            name: 'asc'
        }
    })

    console.log('\n📋 All brands in database:\n')
    brands.forEach((brand, index) => {
        console.log(`${index + 1}. ${brand.name} (slug: ${brand.slug})`)
    })
    console.log(`\n✨ Total: ${brands.length} brands\n`)
}

listBrands()
    .catch(console.error)
    .finally(() => prisma.$disconnect())
