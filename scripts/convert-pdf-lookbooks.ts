/**
 * PDF to Images Converter Script
 * Converts PDF lookbooks to individual page images for the horizontal scroll viewer.
 * 
 * Usage: npx tsx scripts/convert-pdf-lookbooks.ts
 * 
 * Prerequisites: 
 *   - Install pdf-poppler: npm install pdf-poppler
 *   - Windows users may need Poppler binaries in PATH
 */

import * as fs from 'fs';
import * as path from 'path';

// We'll use pdf-poppler for conversion
// If pdf-poppler doesn't work, we'll fall back to pdf2pic or similar

async function convertPdfToImages() {
    const lookbooksDir = path.join(process.cwd(), 'public', 'lookbooks');

    // Define the PDFs to convert
    const pdfs = [
        {
            brand: 'Doodlage',
            brandSlug: 'doodlage',
            file: 'Seeds of Change .pdf',
            collection: 'seeds-of-change'
        },
        {
            brand: 'MARGN',
            brandSlug: 'margn',
            file: 'MARGN-Silent GuardiansLookbook.pdf',
            collection: 'silent-guardians'
        }
    ];

    try {
        // Try to import pdf-poppler
        const pdfPoppler = await import('pdf-poppler');

        for (const pdf of pdfs) {
            const pdfPath = path.join(lookbooksDir, pdf.brand, pdf.file);
            const outputDir = path.join(lookbooksDir, pdf.brand, 'pages');

            // Create output directory
            if (!fs.existsSync(outputDir)) {
                fs.mkdirSync(outputDir, { recursive: true });
            }

            console.log(`\n📄 Converting: ${pdf.brand} - ${pdf.file}`);
            console.log(`   Output: ${outputDir}`);

            // Check if PDF exists
            if (!fs.existsSync(pdfPath)) {
                console.error(`   ❌ PDF not found: ${pdfPath}`);
                continue;
            }

            // Convert PDF to images
            const opts = {
                format: 'jpeg',
                out_dir: outputDir,
                out_prefix: 'page',
                page: null, // Convert all pages
                scale: 2048, // High resolution
            };

            try {
                await pdfPoppler.convert(pdfPath, opts);

                // List generated images
                const images = fs.readdirSync(outputDir)
                    .filter(f => f.endsWith('.jpg') || f.endsWith('.jpeg'))
                    .sort((a, b) => {
                        const numA = parseInt(a.match(/\d+/)?.[0] || '0');
                        const numB = parseInt(b.match(/\d+/)?.[0] || '0');
                        return numA - numB;
                    });

                console.log(`   ✅ Generated ${images.length} page images`);

                // Output the paths for database update
                const imagePaths = images.map(img => `/lookbooks/${pdf.brand}/pages/${img}`);
                console.log(`   📝 Image paths for database:`);
                console.log(`   ${JSON.stringify(imagePaths)}`);

            } catch (convError) {
                console.error(`   ❌ Conversion failed:`, convError);
            }
        }

    } catch (importError) {
        console.error('❌ pdf-poppler not installed. Please run:');
        console.error('   npm install pdf-poppler');
        console.error('\n   On Windows, you may also need to install Poppler:');
        console.error('   1. Download from: https://github.com/oschwartz10612/poppler-windows/releases');
        console.error('   2. Extract and add bin folder to PATH');
        process.exit(1);
    }
}

convertPdfToImages().catch(console.error);
