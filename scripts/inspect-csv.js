const fs = require('fs');
const path = require('path');

const csvPath = 'C:\\Users\\arush\\.gemini\\antigravity\\brain\\4e5837b2-823b-43af-9bfa-322d396c198b\\doodlage_default.csv';

try {
    const data = fs.readFileSync(csvPath, 'utf8');
    const lines = data.split(/\r?\n/);

    // Better CSV splitting for header (handling quotes is hard without lib, but let's try simple split first as headers usually don't have commas)
    const headers = lines[0].split(',');

    console.log('Total lines:', lines.length);
    console.log('Headers count:', headers.length);

    // Find key column indices
    const vendorIndex = headers.findIndex(h => h.toLowerCase() === 'vendor');
    const titleIndex = headers.findIndex(h => h.toLowerCase() === 'title');
    const handleIndex = headers.findIndex(h => h.toLowerCase() === 'handle');
    const option1NameIndex = headers.findIndex(h => h.toLowerCase() === 'option1 name');
    const option1ValueIndex = headers.findIndex(h => h.toLowerCase() === 'option1 value');
    const imageSrcIndex = headers.findIndex(h => h.toLowerCase() === 'image src');

    console.log('Indices:', {
        vendor: vendorIndex,
        title: titleIndex,
        handle: handleIndex,
        option1Name: option1NameIndex,
        option1Value: option1ValueIndex,
        imageSrc: imageSrcIndex
    });

    let doodlageCount = 0;
    const doodlageSamples = [];

    // Basic loop to find Doodlage
    for (let i = 1; i < lines.length; i++) {
        const line = lines[i];
        if (!line) continue;

        // Check if line contains Doodlage
        if (line.toLowerCase().includes('doodlage')) {
            doodlageCount++;
            if (doodlageSamples.length < 5) {
                doodlageSamples.push(line);
            }
        }
    }

    console.log(`Found ${doodlageCount} rows containing "Doodlage".`);

    if (doodlageSamples.length > 0) {
        console.log('Sample Doodlage Row 1 (raw):', doodlageSamples[0]);
    } else {
        console.log('No Doodlage rows found.');
    }

    // Print all headers to see what we have
    console.log('All Headers:', headers.join(' | '));

} catch (err) {
    console.error('Error reading file:', err);
}
