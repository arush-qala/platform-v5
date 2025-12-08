/**
 * UPDATE BRAND DESCRIPTIONS SCRIPT
 * 
 * This script updates the description field for specific brands
 * to display on the Discover page.
 */

import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

const brandDescriptions = {
    'Asaii': 'Asaii blends art with sustainability, crafting hand-painted, eco-conscious apparel. With timeless neutrals and mindful, small-batch production, each garment tells an enduring story of thoughtful creation and conscious style.',

    'Doodlage': 'Doodlage redefines sustainability by transforming discarded textiles into stylish, upcycled garments. Rooted in circular design, the brand blends creativity with conscious fashion, proving that waste can be reimagined into timeless pieces.',

    'Margn': 'Margn builds its world at the intersection of craft and function, blending traditional techniques with modern, performance fabrics. Inspired by the need for protection, it explores how clothing connects us across cultures and time.',

    'AKHL Studio': 'AKHL is a visual innovator creating structured silhouettes inspired by post-modern architecture and installation art. Known for their gradient palettes and light-responsive surfaces, they focus on material exploration and new fabrication techniques.',

    'Ituvana': 'Ituvana—where \'the forest of bliss\' meets conscious design—is a slow luxury label encouraging self-expression through free-flowing silhouettes, Indian-Indonesian roots, and timeless pieces crafted to evolve with the wearer.'
}

async function updateBrandDescriptions() {
    console.log('🔄 Starting brand description updates...\n')

    for (const [brandName, description] of Object.entries(brandDescriptions)) {
        try {
            const brand = await prisma.brand.findFirst({
                where: { name: brandName }
            })

            if (!brand) {
                console.log(`⚠️  Brand "${brandName}" not found in database`)
                continue
            }

            await prisma.brand.update({
                where: { id: brand.id },
                data: { description }
            })

            console.log(`✅ Updated description for "${brandName}"`)
        } catch (error) {
            console.error(`❌ Error updating "${brandName}":`, error)
        }
    }

    console.log('\n✨ Brand description updates complete!')
}

updateBrandDescriptions()
    .catch((error) => {
        console.error('Fatal error:', error)
        process.exit(1)
    })
    .finally(async () => {
        await prisma.$disconnect()
    })
