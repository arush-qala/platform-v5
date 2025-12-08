// import { prisma } from '../lib/prisma' // Avoiding shared instance
import { PrismaClient } from '@prisma/client'
import * as fs from 'fs'
import * as path from 'path'

const prisma = new PrismaClient()

async function updatePdfLookbooks() {
    const brands = [
        {
            name: 'Doodlage',
            slug: 'doodlage',
            collectionSlug: 'seeds-of-change', // Or whichever collection is featured
            lookbookDir: 'Doodlage/pages'
        },
        {
            name: 'MARGN',
            slug: 'margn',
            collectionSlug: 'silent-guardians',
            lookbookDir: 'MARGN/pages'
        }
    ]

    for (const brand of brands) {
        console.log(`\nProcessing ${brand.name}...`)

        // 1. Get the featured collection
        // We'll try to find the specific collection slug first, OR just the featured one
        const collection = await prisma.collection.findFirst({
            where: {
                brand: { slug: brand.slug },
                OR: [
                    { slug: brand.collectionSlug },
                    { featured: true }
                ]
            },
            include: { brand: true }
        })

        if (!collection) {
            console.error(`❌ Collection not found for ${brand.name}`)
            continue
        }

        console.log(`   Target Collection: ${collection.name} (${collection.slug})`)

        // 2. Read images from directory
        const dirPath = path.join(process.cwd(), 'public', 'lookbooks', brand.lookbookDir)
        if (!fs.existsSync(dirPath)) {
            console.error(`❌ Directory not found: ${dirPath}`)
            continue
        }

        const images = fs.readdirSync(dirPath)
            .filter(f => f.endsWith('.jpg') || f.endsWith('.jpeg'))
            .sort((a, b) => {
                // Sort numerically (page-1 before page-10)
                const numA = parseInt(a.match(/\d+/)?.[0] || '0')
                const numB = parseInt(b.match(/\d+/)?.[0] || '0')
                return numA - numB
            })
            .map(img => `/lookbooks/${brand.lookbookDir}/${img}`)

        console.log(`   Found ${images.length} pages.`)

        // 3. Update Database
        await prisma.collection.update({
            where: { id: collection.id },
            data: {
                lookbookImages: JSON.stringify(images),
                featured: true // Ensure it's featured
            }
        })

        console.log(`   ✅ DB Updated!`)
    }
}

updatePdfLookbooks()
    .catch(console.error)
    .finally(async () => {
        await prisma.$disconnect()
    })
