
async function run() {
    try {
        const response = await fetch('https://docs.google.com/spreadsheets/d/124vaMaCKRn7G-BEz2mT2vTSIoyk0Zow-j-8uqIIhJi8/gviz/tq?tqx=out:csv');
        const text = await response.text();
        const parseCSV = (t) => {
            const rows = [];
            let cur = [];
            let val = '';
            let q = false;
            for (let i = 0; i < t.length; i++) {
                const c = t[i];
                if (c === '"') q = !q;
                else if (c === ',' && !q) { cur.push(val); val = ''; }
                else if ((c === '\n' || c === '\r') && !q) {
                    cur.push(val); rows.push(cur); cur = []; val = '';
                    if (t[i + 1] === '\n') i++;
                }
                else val += c;
            }
            if (cur.length) rows.push(cur);
            return rows;
        };
        const rows = parseCSV(text);

        console.log('--- HEADERS ---');
        // Print 12 to 16
        if (rows[0]) rows[0].slice(12, 17).forEach((c, i) => console.log(`[${i + 12}] ${c.replace(/^"|"$/g, '')}`));

        console.log('--- DATA ROWS ---');
        // Print Name (2), Photo (11), and Cols 12-16 for first 5 rows
        rows.slice(1, 6).forEach((r, idx) => {
            const name = r[2] ? r[2].replace(/^"|"$/g, '') : 'UNK';
            const photo = r[11] ? r[11].replace(/^"|"$/g, '').substr(0, 20) + '...' : 'NONE';
            console.log(`Row ${idx + 1}: ${name} | Photo: ${photo}`);
            r.slice(12, 17).forEach((c, i) => console.log(`   [${i + 12}] ${c ? c.substr(0, 30).replace(/^"|"$/g, '') : ''}`));
        });

    } catch (e) { console.error(e); }
}
run();
