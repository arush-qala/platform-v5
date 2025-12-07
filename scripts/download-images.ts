import { PrismaClient } from '@prisma/client';
import fs from 'fs';
import path from 'path';
import https from 'https';

const prisma = new PrismaClient();

const TARGET_DIR = path.join(process.cwd(), 'public', 'images', 'brands', 'doodlage');

if (!fs.existsSync(TARGET_DIR)) {
    fs.mkdirSync(TARGET_DIR, { recursive: true });
}

async function downloadImage(url: string, filepath: string): Promise<boolean> {
    return new Promise((resolve, reject) => {
        const file = fs.createWriteStream(filepath);
        https.get(url, (response) => {
            if (response.statusCode !== 200) {
                console.error(`Status code ${response.statusCode} for ${url}`);
                response.resume(); // consume header to free memory
                resolve(false);
                return;
            }
            response.pipe(file);
            file.on('finish', () => {
                file.close();
                resolve(true);
            });
        }).on('error', (err) => {
            console.error(`Error downloading ${url}:`, err.message);
            fs.unlink(filepath, () => { });
            resolve(false);
        });
    });
}

async function main() {
    console.log('🖼️  Starting image download for Doodlage...');

    const products = await prisma.product.findMany({
        where: {
            collection: {
                brand: { slug: 'doodlage' }
            }
        },
        include: {
            images: true
        }
    });

    console.log(`Found ${products.length} products.`);

    let totalDownloaded = 0;
    let totalUpdated = 0;

    for (const product of products) {
        console.log(`Processing ${product.name} (${product.slug})...`);

        for (let i = 0; i < product.images.length; i++) {
            const img = product.images[i];

            // Skip already local images
            if (!img.url.startsWith('http')) {
                console.log(`  - Image ${i + 1} already local: ${img.url}`);
                continue;
            }

            const extension = path.extname(img.url.split('?')[0]) || '.jpg';
            const filename = `${product.slug}-${i + 1}${extension}`;
            const localPath = path.join(TARGET_DIR, filename);
            const dbPath = `/images/brands/doodlage/${filename}`;

            console.log(`  - Downloading image ${i + 1}...`);
            const success = await downloadImage(img.url, localPath);

            if (success) {
                await prisma.productImage.update({
                    where: { id: img.id },
                    data: { url: dbPath }
                });
                console.log(`    ✅ Saved to ${filename} and updated DB.`);
                totalDownloaded++;
                totalUpdated++;
            } else {
                console.log(`    ❌ Failed to download.`);
            }
        }
    }

    console.log('\n✨ Image download complete!');
    console.log(`Downloaded: ${totalDownloaded}`);
    console.log(`Updated DB: ${totalUpdated}`);
}

main()
    .catch(e => console.error(e))
    .finally(async () => {
        await prisma.$disconnect();
    });
