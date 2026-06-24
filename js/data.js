export let MATRIX = {};
export let PLA_FILTER = {};
export let ARCHETYPES = [];
export let ARCHETYPE_NAMES = {};
export let CRITERIA = [];

export function parseCSV(archiveCSV) {
    const result = Papa.parse(archiveCSV, {
        header: false,
        delimiter: ";",
        skipEmptyLines: true

    });

    const headers = result.data[0].slice(1);
    const archetypes = [];
    const archetypeNames = {};

    headers.forEach(header => {
        const parts = header.split(/\r?\n/);
        const id = parts[0].trim();
        if (!id) return;
        const name = parts[1] ? parts[1].trim() : id;
        archetypes.push(id);
        archetypeNames[id] = name;

    });

    const values = result.data.slice(1);
    const matrixValue = {};
    const criteria = [];

    values.forEach(row => {
        const criterion = row[0].trim();
        if (!criterion) return;

        criteria.push(criterion);
        matrixValue[criterion] = {};

        archetypes.forEach((id, index) => {
            matrixValue[criterion][id] = Number(row[index + 1]);

        });
    });

    return {
        archetypeNames,
        archetypes,
        matrixValue,
        criteria
    };
}
const rutes = ['./data/configurations_matrix.csv', './data/PLA_filter.csv']

export async function loadCSV() {
    let ok = true;


    try {
        const [res1, res2] = await Promise.all([
            fetch(rutes[0]),
            fetch(rutes[1])

        ]);

        const data1 = await res1.text();
        const data2 = await res2.text();

        const parsed1 = parseCSV(data1);
        const parsed2 = parseCSV(data2);

        ARCHETYPES.push(...parsed1.archetypes);
        CRITERIA.push(...parsed1.criteria);
        Object.assign(MATRIX, parsed1.matrixValue);
        Object.assign(ARCHETYPE_NAMES, parsed1.archetypeNames);
        Object.assign(PLA_FILTER, parsed2.matrixValue);

    } catch (error) {
        console.error('Error fetching CSV:', error);
        ok = false;

    }
    return ok;

}