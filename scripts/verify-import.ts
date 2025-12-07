
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
    const brands = await prisma.brand.findMany({
        include: {
            collections: {
                include: { _count: { select: { products: true } } }
            }
        }
    });

    console.log('--- Verification Report ---');
    console.log(`Total Brands: ${brands.length}`);

    for (const brand of brands) {
        console.log(`\nBrand: ${brand.name} (${brand.slug})`);
        console.log(`  Collections: ${brand.collections.length}`);
        for (const col of brand.collections) {
            console.log(`    - ${col.name}: ${col._count.products} products`);
        }
    }
}

main()
    .catch(console.error)
    .finally(() => prisma.$disconnect());
