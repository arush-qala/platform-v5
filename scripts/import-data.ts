/**
 * DATA IMPORT SCRIPT FOR QALA PLATFORM V5
 * 
 * This script imports brand, collection, and product data from JSON files
 * into your PostgreSQL database using Prisma.
 * 
 * USAGE:
 * 1. Fill in the JSON files in data-templates/ folder
 * 2. Move them to a new folder: data-import/
 * 3. Run: npx tsx scripts/import-data.ts
 * 
 * PREREQUISITES:
 * - Database must be set up and migrated (npx prisma migrate dev)
 * - JSON files must follow the template structure
 */

import { PrismaClient } from '@prisma/client'
import * as fs from 'fs'
import * as path from 'path'

const prisma = new PrismaClient()

// File paths
const DATA_DIR = path.join(process.cwd(), 'data-import')
const BRANDS_FILE = path.join(DATA_DIR, 'brands.json')
const COLLECTIONS_FILE = path.join(DATA_DIR, 'collections.json')
const PRODUCTS_FILE = path.join(DATA_DIR, 'products.json')

interface BrandData {
    name: string
    slug: string
    description: string | null
    story: string | null
    videoUrl: string | null
    logoUrl: string | null
    coverImage: string | null
    founded: string | null
    location: string | null
    aesthetic: string
    featured: boolean
}

interface CollectionData {
    brandSlug: string
    name: string
    slug: string
    description: string | null
    season: string
    year: string | null
    coverImage: string | null
    lookbookImages: string
    featured: boolean
}

interface ProductImageData {
    url: string
    alt: string | null
    order: number
    isPrimary: boolean
}

interface ProductSizeData {
    size: string
    inStock: boolean
    quantity: number
}

interface ProductData {
    brandSlug: string
    collectionSlug: string
    name: string
    slug: string
    description: string | null
    category: string
    price: number
    fabricDetails: string | null
    careInstructions: string | null
    colors: string
    featured: boolean
    images: ProductImageData[]
    sizes: ProductSizeData[]
}

async function importBrands() {
    console.log('\n📦 Importing Brands...\n')

    if (!fs.existsSync(BRANDS_FILE)) {
        console.log('⚠️  brands.json not found. Skipping brands import.')
        return
    }

    const brandsData: BrandData[] = JSON.parse(fs.readFileSync(BRANDS_FILE, 'utf-8'))

    for (const brandData of brandsData) {
        try {
            const brand = await prisma.brand.upsert({
                where: { slug: brandData.slug },
                update: {
                    name: brandData.name,
                    description: brandData.description,
                    story: brandData.story,
                    videoUrl: brandData.videoUrl,
                    logoUrl: brandData.logoUrl,
                    coverImage: brandData.coverImage,
                    founded: brandData.founded,
                    location: brandData.location,
                    aesthetic: brandData.aesthetic,
                    featured: brandData.featured,
                },
                create: {
                    name: brandData.name,
                    slug: brandData.slug,
                    description: brandData.description,
                    story: brandData.story,
                    videoUrl: brandData.videoUrl,
                    logoUrl: brandData.logoUrl,
                    coverImage: brandData.coverImage,
                    founded: brandData.founded,
                    location: brandData.location,
                    aesthetic: brandData.aesthetic,
                    featured: brandData.featured,
                },
            })
            console.log(`✅ Upserted brand: ${brand.name} (${brand.slug})`)
        } catch (error) {
            console.error(`❌ Failed to upsert brand: ${brandData.name}`, error)
        }
    }
}

async function importCollections() {
    console.log('\n📦 Importing Collections...\n')

    if (!fs.existsSync(COLLECTIONS_FILE)) {
        console.log('⚠️  collections.json not found. Skipping collections import.')
        return
    }

    const collectionsData: CollectionData[] = JSON.parse(fs.readFileSync(COLLECTIONS_FILE, 'utf-8'))

    for (const collectionData of collectionsData) {
        try {
            // Find the brand by slug
            const brand = await prisma.brand.findUnique({
                where: { slug: collectionData.brandSlug },
            })

            if (!brand) {
                console.error(`❌ Brand not found: ${collectionData.brandSlug}`)
                continue
            }

            const collection = await prisma.collection.upsert({
                where: {
                    brandId_slug: {
                        brandId: brand.id,
                        slug: collectionData.slug,
                    }
                },
                update: {
                    name: collectionData.name,
                    description: collectionData.description,
                    season: collectionData.season,
                    year: collectionData.year,
                    coverImage: collectionData.coverImage,
                    lookbookImages: collectionData.lookbookImages,
                    featured: collectionData.featured,
                },
                create: {
                    brandId: brand.id,
                    name: collectionData.name,
                    slug: collectionData.slug,
                    description: collectionData.description,
                    season: collectionData.season,
                    year: collectionData.year,
                    coverImage: collectionData.coverImage,
                    lookbookImages: collectionData.lookbookImages,
                    featured: collectionData.featured,
                },
            })
            console.log(`✅ Upserted collection: ${collection.name} (${brand.name}/${collection.slug})`)
        } catch (error) {
            console.error(`❌ Failed to upsert collection: ${collectionData.name}`, error)
        }
    }
}

async function importProducts() {
    console.log('\n📦 Importing Products...\n')

    if (!fs.existsSync(PRODUCTS_FILE)) {
        console.log('⚠️  products.json not found. Skipping products import.')
        return
    }

    const productsData: ProductData[] = JSON.parse(fs.readFileSync(PRODUCTS_FILE, 'utf-8'))

    for (const productData of productsData) {
        try {
            // Find the brand by slug
            const brand = await prisma.brand.findUnique({
                where: { slug: productData.brandSlug },
            })

            if (!brand) {
                console.error(`❌ Brand not found: ${productData.brandSlug}`)
                continue
            }

            // Find the collection by slug and brandId
            const collection = await prisma.collection.findFirst({
                where: {
                    slug: productData.collectionSlug,
                    brandId: brand.id,
                },
            })

            if (!collection) {
                console.error(`❌ Collection not found: ${productData.collectionSlug} (brand: ${productData.brandSlug})`)
                continue
            }

            // Check if product already exists
            const existingProduct = await prisma.product.findUnique({
                where: {
                    collectionId_slug: {
                        collectionId: collection.id,
                        slug: productData.slug
                    }
                }
            })

            if (existingProduct) {
                console.log(`⏭️  Skipping existing product: ${productData.name}`)
                continue
            }

            // Create product with images and sizes
            const product = await prisma.product.create({
                data: {
                    collectionId: collection.id,
                    name: productData.name,
                    slug: productData.slug,
                    description: productData.description,
                    category: productData.category,
                    price: productData.price,
                    fabricDetails: productData.fabricDetails,
                    careInstructions: productData.careInstructions,
                    colors: productData.colors,
                    featured: productData.featured,
                    images: {
                        create: productData.images.map((img) => ({
                            url: img.url,
                            alt: img.alt,
                            order: img.order,
                            isPrimary: img.isPrimary,
                        })),
                    },
                    sizes: {
                        create: productData.sizes.map((size) => ({
                            size: size.size,
                            inStock: size.inStock,
                            quantity: size.quantity,
                        })),
                    },
                },
                include: {
                    images: true,
                    sizes: true,
                },
            })

            console.log(`✅ Created product: ${product.name} (${brand.name}/${collection.name}/${product.slug})`)
            console.log(`   - ${product.images.length} images`)
            console.log(`   - ${product.sizes.length} sizes`)
        } catch (error) {
            console.error(`❌ Failed to create product: ${productData.name}`, error)
        }
    }
}

async function main() {
    console.log('🚀 Starting data import for Qala Platform V5...')
    console.log(`📁 Looking for data files in: ${DATA_DIR}`)

    // Check if data-import directory exists
    if (!fs.existsSync(DATA_DIR)) {
        console.error(`\n❌ Error: data-import directory not found!`)
        console.log(`\nPlease create the directory and add your JSON files:`)
        console.log(`  1. Create folder: data-import/`)
        console.log(`  2. Copy your filled templates there as:`)
        console.log(`     - brands.json`)
        console.log(`     - collections.json`)
        console.log(`     - products.json`)
        process.exit(1)
    }

    try {
        // Import in order: Brands → Collections → Products
        await importBrands()
        await importCollections()
        await importProducts()

        console.log('\n✨ Data import completed successfully!\n')

        // Show summary
        const brandCount = await prisma.brand.count()
        const collectionCount = await prisma.collection.count()
        const productCount = await prisma.product.count()
        const imageCount = await prisma.productImage.count()
        const sizeCount = await prisma.productSize.count()

        console.log('📊 Database Summary:')
        console.log(`   - ${brandCount} brands`)
        console.log(`   - ${collectionCount} collections`)
        console.log(`   - ${productCount} products`)
        console.log(`   - ${imageCount} product images`)
        console.log(`   - ${sizeCount} product sizes`)
        console.log('')

    } catch (error) {
        console.error('\n❌ Import failed:', error)
        process.exit(1)
    } finally {
        await prisma.$disconnect()
    }
}

main()
