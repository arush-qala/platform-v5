/**
 * ONE-TIME IMPORT API - POST /api/import-brands
 * 
 * PURPOSE:
 * This is a protected endpoint to trigger brand import for the production database.
 * Can be called once to populate the database with brand data from CSVs.
 * 
 * SECURITY:
 * - Requires a secret key in the request body
 * - Should be disabled/removed after initial import
 */

import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import fs from 'fs'
import path from 'path'
import { parse } from 'csv-parse/sync'
import slugify from 'slugify'

// Simple secret for protection - should be set as env var in production
const IMPORT_SECRET = process.env.IMPORT_SECRET || 'qala-import-2024'

const BRANDS_TO_IMPORT = [
    { name: 'Margn', csvFile: 'margn.csv', handle: 'margn' },
    { name: 'Asaii', csvFile: 'asaii.csv', handle: 'asaii' },
    { name: 'AKHL Studio', csvFile: 'akhl.csv', handle: 'akhl-studio' },
    { name: 'Ituvana', csvFile: 'ituvana.csv', handle: 'ituvana' },
]

const DUMMY_BRANDS_TO_REMOVE = [
    'Label 2', 'Label 3', 'Label 4', 'Label 5', 'Label Two', 'Label Three', 'Label Four', 'Label Five'
]

export async function POST(request: NextRequest) {
    try {
        const body = await request.json()

        // Check secret
        if (body.secret !== IMPORT_SECRET) {
            return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
        }

        console.log('🚀 Starting Import for New Brands...')

        // 1. Cleanup Dummy Brands
        console.log('🧹 Cleaning up dummy brands...')
        await prisma.brand.deleteMany({
            where: {
                name: { in: DUMMY_BRANDS_TO_REMOVE }
            }
        })

        // 2. Load All Collections Metadata
        console.log('📂 Loading All Collections metadata...')
        const allCollectionsCsv = fs.readFileSync(path.join(process.cwd(), 'data-import/all_collections.csv'), 'utf-8')
        const allCollectionsRecords: any[] = parse(allCollectionsCsv, {
            columns: true,
            skip_empty_lines: true
        })

        // Helper to find Brand Metadata Row
        const findBrandMetadata = (brandName: string) => {
            return allCollectionsRecords.find((r: any) =>
                r['Title']?.toLowerCase() === brandName.toLowerCase() &&
                r['Template Suffix'] === 'brand-store'
            )
        }

        const results: any[] = []

        for (const brandConfig of BRANDS_TO_IMPORT) {
            console.log(`\n📦 Processing Brand: ${brandConfig.name}`)

            const brandMeta: any = findBrandMetadata(brandConfig.name)
            if (!brandMeta) {
                console.warn(`⚠️ Could not find metadata for brand ${brandConfig.name}`)
                results.push({ brand: brandConfig.name, status: 'skipped', reason: 'no metadata' })
                continue
            }

            const aestheticRaw = brandMeta['Metafield: custom.style [list.single_line_text_field]'] || '[]'
            let aesthetic = aestheticRaw.startsWith('[') ? aestheticRaw : JSON.stringify(aestheticRaw.split(',').map((s: string) => s.trim()).filter(Boolean))
            try { JSON.parse(aesthetic) } catch { aesthetic = '["Luxury", "Sustainable"]' }

            const brandData = {
                name: brandConfig.name,
                slug: slugify(brandConfig.name, { lower: true }),
                description: brandMeta['Body HTML']?.replace(/<[^>]*>?/gm, "").substring(0, 500) || brandMeta['Title'],
                story: brandMeta['Metafield: custom.brand_story [multi_line_text_field]'] || brandMeta['Body HTML'],
                logoUrl: brandMeta['Image Src'],
                coverImage: brandMeta['Image Src'],
                location: 'India',
                founded: '2020',
                aesthetic: aesthetic,
                featured: true,
            }

            const brand = await prisma.brand.upsert({
                where: { slug: brandData.slug },
                update: brandData,
                create: brandData,
            })
            console.log(`✅ Upserted Brand: ${brand.name} (${brand.id})`)

            // Get valid collection handles from Brand's `child_collections`
            const childColKey = Object.keys(brandMeta).find(k => k.includes('child_collections'))
            const childColsRaw = childColKey ? brandMeta[childColKey] : ''

            const validHandles = childColsRaw
                ? childColsRaw.split(',').map((s: string) => s.trim().toLowerCase())
                : []

            console.log(`   Found linked collections handles: ${validHandles.join(', ')}`)

            const collectionNameIdMap = new Map<string, string>()

            for (const handle of validHandles) {
                const colRecord: any = allCollectionsRecords.find((r: any) => r['Handle']?.toLowerCase() === handle)
                if (!colRecord) {
                    console.warn(`   ⚠️ Collection handle '${handle}' not found in CSV records.`)
                    continue
                }

                const colName = colRecord['Title']
                const colSlug = slugify(colName, { lower: true })

                const colData = {
                    name: colName,
                    slug: colSlug,
                    brandId: brand.id,
                    description: colRecord['Body HTML']?.replace(/<[^>]*>?/gm, "") || '',
                    season: colRecord['Metafield: custom.seasonality [multi_line_text_field]'] || 'Spring Summer',
                    coverImage: colRecord['Image Src'],
                    lookbookImages: '[]',
                    featured: true
                }

                const collection = await prisma.collection.upsert({
                    where: { brandId_slug: { brandId: brand.id, slug: colSlug } },
                    update: colData,
                    create: colData,
                })

                collectionNameIdMap.set(colName, collection.id)
                collectionNameIdMap.set(handle, collection.id)

                console.log(`   ✨ Upserted Collection: ${collection.name}`)
            }

            // Import Products
            console.log(`   📄 Parsing products from ${brandConfig.csvFile}...`)
            const productsCsv = fs.readFileSync(path.join(process.cwd(), 'data-import', brandConfig.csvFile), 'utf-8')
            const productRecords: any[] = parse(productsCsv, {
                columns: true,
                skip_empty_lines: true
            })

            const productGroups = new Map<string, any[]>()
            for (const row of productRecords) {
                const handle = row['Handle']
                if (!productGroups.has(handle)) productGroups.set(handle, [])
                productGroups.get(handle)?.push(row)
            }

            let productCount = 0
            for (const [handle, rows] of productGroups) {
                const mainRow = rows[0]
                if (!mainRow['Title']) continue

                let collectionId = ''

                const possibleKeys = Object.keys(mainRow).filter(k => k.includes('collection_assigned'))
                for (const key of possibleKeys) {
                    const val = mainRow[key]?.trim()
                    if (val && (collectionNameIdMap.has(val) || collectionNameIdMap.has(slugify(val, { lower: true })))) {
                        collectionId = collectionNameIdMap.get(val) || collectionNameIdMap.get(slugify(val, { lower: true }))!
                        break
                    }
                }

                if (!collectionId) {
                    const tags = (mainRow['Tags'] || '').split(',').map((t: string) => t.trim())
                    for (const tag of tags) {
                        if (collectionNameIdMap.has(tag)) {
                            collectionId = collectionNameIdMap.get(tag)!
                            break
                        }
                    }
                }

                if (!collectionId) {
                    if (collectionNameIdMap.size > 0) {
                        collectionId = collectionNameIdMap.values().next().value!
                    } else {
                        continue
                    }
                }

                const price = parseFloat(mainRow['Variant Price'] || '0')
                const images = rows
                    .map(r => r['Image Src'])
                    .filter(Boolean)
                    .map(url => ({ url, altText: mainRow['Title'], isPrimary: url === mainRow['Image Src'] }))

                const productData = {
                    name: mainRow['Title'],
                    slug: slugify(mainRow['Title'] + '-' + handle, { lower: true, strict: true }),
                    description: mainRow['Body HTML']?.replace(/<[^>]*>?/gm, ""),
                    category: mainRow['Type'] || 'Clothing',
                    price: price,
                    fabricDetails: mainRow['Metafield: custom.fabric_type [single_line_text_field]'] || 'Cotton',
                    careInstructions: mainRow['Metafield: descriptors.care_guide [multi_line_text_field]'] || 'Dry Clean Only',
                    colors: JSON.stringify(['Standard']),
                    featured: false,
                    collectionId: collectionId
                }

                const product = await prisma.product.upsert({
                    where: { collectionId_slug: { collectionId, slug: productData.slug } },
                    update: productData,
                    create: productData
                })

                await prisma.productImage.deleteMany({ where: { productId: product.id } })
                await prisma.productImage.createMany({
                    data: images.map((img, index) => ({
                        productId: product.id,
                        url: img.url,
                        alt: img.altText,
                        isPrimary: index === 0,
                        order: index
                    }))
                })

                await prisma.productSize.deleteMany({ where: { productId: product.id } })
                await prisma.productSize.createMany({
                    data: ['S', 'M', 'L', 'XL'].map(size => ({
                        productId: product.id,
                        size: size,
                        quantity: 50
                    }))
                })

                productCount++
            }
            console.log(`   ✅ Processed ${productCount} products for ${brandConfig.name}`)
            results.push({ brand: brandConfig.name, status: 'success', products: productCount })
        }

        console.log('\n🎉 Import Complete!')
        return NextResponse.json({ success: true, results })
    } catch (error) {
        console.error('Import error:', error)
        return NextResponse.json({ error: 'Import failed', details: String(error) }, { status: 500 })
    }
}
