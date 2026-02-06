
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

        if (rows[0]) {
            console.log('--- COLUMNS 8+ ---');
            rows[0].slice(8).forEach((c, i) => console.log(`[${i + 8}] ${c.substr(0, 50).replace(/^"|"$/g, '')}`));
        }
        if (rows[1]) {
            console.log('--- ROW 1 COLUMNS 8+ ---');
            rows[1].slice(8).forEach((c, i) => console.log(`[${i + 8}] ${c.substr(0, 50).replace(/^"|"$/g, '')}`));
        }
    } catch (e) { console.error(e); }
}
run();
