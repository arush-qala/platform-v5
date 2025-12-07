import fs from 'fs';
import path from 'path';

const csvPath = 'C:\\Users\\arush\\.gemini\\antigravity\\brain\\4e5837b2-823b-43af-9bfa-322d396c198b\\doodlage_default.csv';
const outputDir = path.join(process.cwd(), 'data-import');

if (!fs.existsSync(outputDir)) {
    fs.mkdirSync(outputDir, { recursive: true });
}

// Brand Data - Hardcoded for Doodlage as we only have one brand in this CSV context
const brandData = {
    name: 'Doodlage',
    slug: 'doodlage',
    description: 'Doodlage upcycles factory waste into short limited edition collections. Recycle, redesign, upcycle & create high street fashion.',
    story: 'At Doodlage, we upcycle factory waste into short limited edition collections. Minimize waste, maximize style.',
    founded: '2012',
    location: 'New Delhi, India',
    aesthetic: JSON.stringify(['Sustainable', 'Upcycled', 'Eco-friendly', 'Chic']),
    logoUrl: '/images/brands/doodlage/logo.png', // Placeholder
    coverImage: '/images/brands/doodlage/cover.jpg', // Placeholder
    featured: true
};

function parseCSV(filePath: string) {
    const fileContent = fs.readFileSync(filePath, 'utf8');
    const lines = fileContent.split(/\r?\n/);
    const headers = lines[0].split(','); // Simple split. Assuming no commas in header names.

    // Indices based on inspection
    // ID | Handle | Title | Body HTML | Vendor | Type | Tags | Status | URL | Image Src | Variant Price
    const idx = {
        handle: headers.indexOf('Handle'),
        title: headers.indexOf('Title'),
        bodyHtml: headers.indexOf('Body HTML'),
        vendor: headers.indexOf('Vendor'),
        type: headers.indexOf('Type'),
        tags: headers.indexOf('Tags'),
        status: headers.indexOf('Status'),
        imageSrc: headers.indexOf('Image Src'),
        price: headers.indexOf('Variant Price'),
        collectionRef: headers.findIndex(h => h.includes('custom.collection_assigned_1')),
        categoryRef: headers.findIndex(h => h.includes('custom.qala_category'))
    };

    const productsMap = new Map();

    // Start from line 1 (skip header)
    for (let i = 1; i < lines.length; i++) {
        // Simple CSV parser for lines, handling quotes roughly
        const line = lines[i];
        if (!line || !line.trim()) continue;

        // Custom split to handle commas inside quotes
        const match = line.match(/(".*?"|[^",\s]+)(?=\s*,|\s*$)/g);
        // Fallback or better manual split if match fails or is complex - actually for this specific task, simple split might be risky.
        // Let's use a slightly more robust regex splitter
        const columns = [];
        let inQuotes = false;
        let currentBuffer = '';

        for (let char of line) {
            if (char === '"') {
                inQuotes = !inQuotes;
            } else if (char === ',' && !inQuotes) {
                columns.push(currentBuffer);
                currentBuffer = '';
            } else {
                currentBuffer += char;
            }
        }
        columns.push(currentBuffer);

        // Filter for Doodlage
        if (columns[idx.vendor]?.trim() !== 'Doodlage') continue;
        if (columns[idx.status]?.trim() !== 'Active') continue; // Only active products

        const handle = columns[idx.handle];
        if (!handle) continue;

        if (!productsMap.has(handle)) {
            productsMap.set(handle, {
                title: columns[idx.title],
                handle: handle,
                description: columns[idx.bodyHtml]?.replace(/^"|"$/g, '').replace(/<[^>]*>?/gm, ''), // Remove quotes and basic HTML strip
                price: parseFloat(columns[idx.price] || '0'),
                category: columns[idx.categoryRef] || columns[idx.type] || 'Uncategorized',
                images: [],
                collectionSlug: 'doodlage-collection', // Default mapping
            });
        }

        const product = productsMap.get(handle);
        const img = columns[idx.imageSrc];
        if (img && img.startsWith('http')) {
            if (!product.images.includes(img)) {
                product.images.push(img);
            }
        }
    }

    return productsMap;
}

const productsMap = parseCSV(csvPath);
console.log(`Parsed ${productsMap.size} unique products.`);

// Generate JSONs

// 1. Brands
const brands = [brandData];

// 2. Collections
// We'll create one main collection for Doodlage as per plan
const collections = [{
    brandSlug: 'doodlage',
    name: 'Doodlage Main Collection',
    slug: 'doodlage-collection',
    description: 'Main collection of upcycled fashion from Doodlage.',
    season: 'Fall/Winter', // Default, required field
    year: '2024',
    coverImage: '/images/brands/doodlage/collection-cover.jpg',
    lookbookImages: JSON.stringify([]),
    featured: true
}];

// 3. Products
const products = Array.from(productsMap.values()).map(p => {
    // Determine category from type or custom field
    // Map raw category to valid values if possible (optional improvement)
    let validCategory = 'dresses'; // Default fallback
    const rawCat = p.category.toLowerCase();
    if (rawCat.includes('dress')) validCategory = 'dresses';
    else if (rawCat.includes('shirt') || rawCat.includes('top')) validCategory = 'tops';
    else if (rawCat.includes('pant') || rawCat.includes('trouser')) validCategory = 'pants';
    else if (rawCat.includes('jacket') || rawCat.includes('coat')) validCategory = 'outerwear';

    return {
        brandSlug: 'doodlage',
        collectionSlug: 'doodlage-collection',
        name: p.title,
        slug: p.handle,
        description: p.description,
        category: validCategory,
        price: p.price,
        fabricDetails: 'Upcycled Fabric', // Default
        careInstructions: 'Machine wash gentle', // Default
        colors: JSON.stringify(['Multi']), // Default
        featured: false,
        images: p.images.map((url: string) => ({
            url: url,
            altText: p.title,
            isCover: false // Logic could be added to make first one cover
        })),
        sizes: [ // Default sizes as agreed
            { size: 'XS', stock: 10 },
            { size: 'S', stock: 10 },
            { size: 'M', stock: 10 },
            { size: 'L', stock: 10 },
            { size: 'XL', stock: 10 }
        ]
    };
});

// Set first image as cover for each product
products.forEach(p => {
    if (p.images.length > 0) {
        p.images[0].isCover = true;
    }
});

fs.writeFileSync(path.join(outputDir, 'brands.json'), JSON.stringify(brands, null, 2));
fs.writeFileSync(path.join(outputDir, 'collections.json'), JSON.stringify(collections, null, 2));
fs.writeFileSync(path.join(outputDir, 'products.json'), JSON.stringify(products, null, 2));

console.log('Successfully generated brands.json, collections.json, products.json');
