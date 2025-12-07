const fs = require('fs');
const path = require('path');

const csvPath = 'C:\\Users\\arush\\.gemini\\antigravity\\brain\\4e5837b2-823b-43af-9bfa-322d396c198b\\doodlage_default.csv';

try {
    const data = fs.readFileSync(csvPath, 'utf8');
    const lines = data.split(/\r?\n/);
    const headers = lines[0].split(',');

    // Vendor is usually index 4 based on previous inspection
    // ID,Handle,Title,Body HTML,Vendor,...
    const vendorIndex = headers.findIndex(h => h.toLowerCase() === 'vendor');

    if (vendorIndex === -1) {
        console.error('Could not find Vendor column');
        process.exit(1);
    }

    const vendorCounts = {};

    for (let i = 1; i < lines.length; i++) {
        const line = lines[i];
        if (!line || !line.trim()) continue;

        // Robust split logic
        let columns = [];
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

        // Clean quotes from vendor
        let vendor = columns[vendorIndex]?.trim();
        if (vendor) {
            vendor = vendor.replace(/^"|"$/g, '');
            if (vendor) {
                vendorCounts[vendor] = (vendorCounts[vendor] || 0) + 1;
            }
        }
    }

    console.log('Unique Vendors Found:');
    Object.entries(vendorCounts).forEach(([vendor, count]) => {
        console.log(`- ${vendor}: ${count} rows`);
    });

} catch (err) {
    console.error('Error:', err);
}
