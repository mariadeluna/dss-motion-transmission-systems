import { runDSS } from "./engine.js";
import { ARCHETYPE_NAMES, MATRIX, PLA_FILTER, ARCHETYPES } from "./data.js";
const userAnswers = {};

export function showData() {

    let tableConfigurations = '<table>';

    tableConfigurations += '<tr><th>Criteria</th>';
    for (const archetype in ARCHETYPE_NAMES) {
        tableConfigurations += '<th>' + ARCHETYPE_NAMES[archetype] + '</th>';

    }
    tableConfigurations += '</tr>';

    for (const criterion in MATRIX) {
        tableConfigurations += '<tr><td>' + criterion + '</td>';
        for (const archetype of ARCHETYPES) {
            tableConfigurations += '<td>' + MATRIX[criterion][archetype] + '</td>';
        }


        tableConfigurations += '</tr>';
    }
    tableConfigurations += '</table>';

    let tablePLA = '<table>';

    tablePLA += '<tr><th>PLA manufacturing suitability</th>';
    for (const archetype in ARCHETYPE_NAMES) {
        tablePLA += '<th>' + ARCHETYPE_NAMES[archetype] + '</th>';

    }
    tablePLA += '</tr>';

    for (const filter in PLA_FILTER) {
        tablePLA += '<tr><td>' + filter + '</td>';
        for (const archetype of ARCHETYPES) {
            tablePLA += '<td>' + PLA_FILTER[filter][archetype] + '</td>';
        }
        tablePLA += '</tr>';
    }



    document.getElementById('showData').innerHTML = `<h1>Data matrices used in the DSS</h1>
    <h2>Archetype–criteria configuration matrix</h2> 
    <p>Scores the suitability of each transmission archetype for each evaluation criterion using a 1–3 scale.</p>`
    + tableConfigurations + `<br>` +
        `<h2>PLA manufacturing filter matrix</h2> 
        <p>Defines which archetypes are feasible for each manufacturing integration level, using 1 for eligible candidates and 0 for excluded candidates.</p>`+
        tablePLA + `<br>`;

}

function updateProgress() {
    const totalAnswered = Object.keys(userAnswers).length;
    const totalQuestions = 14;
    const percentage = (totalAnswered / totalQuestions) * 100;
    document.getElementById('progress-fill').style.width = percentage + '%';

    document.getElementById('progress-label').textContent = totalAnswered + '/14 questions answered';


    if (totalAnswered == totalQuestions) {
        const runDSSbutton = document.getElementById('run-btn');
        runDSSbutton.disabled = false;
    }


}

export function initUI() {
    document.querySelectorAll('.btn-group').forEach(options => {

        options.querySelectorAll('.btn-opt').forEach(button => {

            button.addEventListener('click', () => {
                options.querySelectorAll('.btn-opt').forEach(b => b.classList.remove('selected'));
                button.classList.add('selected');
                const question = options.dataset.key;
                const answer = button.dataset.val;

                userAnswers[question] = answer;
                updateProgress();


            });

        });
    });
    document.getElementById('run-btn').addEventListener('click', () => {
        const result = runDSS(userAnswers);
        showResults(result);
    });
    document.getElementById('reset-btn').addEventListener('click', resetQuestionnaire);
}

function showResults(result) {
    // Eliminated candidates
    let printEliminated = '';
    for (const archetype of result.eliminated) {
        printEliminated += archetype + ', ';
    }
    // Complexity penalty
    let printPenalty = '';
    for (const archetype of result.adjustComplexity) {
        if (result.candidates.includes(archetype)) {
            printPenalty += archetype + ', ';
        }
    }
    if (printPenalty === '') {
        printPenalty = 'None';
    }

    // Activated rules
    let printRules = '<ul>';
    for (const rule of result.activatedRules) {
        printRules += '<li><strong>' + rule.id + '</strong>: ';
        for (const effect of rule.effects) {
            printRules += effect.criterion + ' x' + effect.multiplier + ' ';
        }
        printRules += '</li>';
    }
    printRules += '</ul>';

    // Normalized weights
    let printWeights = '<table><tr><th>Criterion</th><th>Weight</th></tr>';
    for (const [criterion, weight] of result.sortedWeights) {
        printWeights += '<tr><td>' + criterion + '</td><td>' + (weight * 100).toFixed(1) + '%</td></tr>';
    }
    printWeights += '</table>';

    // TOP 3
    let printRanking = '<ol>';
    const topN = Math.min(3, result.ranking.length);
    for (let i = 0; i < topN; i++) {
        const id = result.ranking[i][0];
        const score = result.ranking[i][1];
        const name = ARCHETYPE_NAMES[id];
        printRanking += '<li>' + id + ': ' + name + ' (' + score.toFixed(4) + ')' +
    '<br><img src="./images/' + id + '.jpg" alt="' + name + '" style="max-width:400px; margin-top:6px; margin-left: 450px;" onerror="this.style.display=\'none\'">' +
    '</li>';
    }
    printRanking += '</ol>';

    const output = document.getElementById('output');

    output.innerHTML = `
        <h2>Phase 0 Manufacturing filter</h2>

    <p>Eliminated systems: ${printEliminated}</p>

    <h2>Architectural branching</h2>
    <p>Excluded systems: ${result.excluded.join(', ')}</p>
     <h2>Complexity penalty (×0.80 on Complexity_level)</h2>
    <p>Applied to: ${printPenalty}</p>

    <h2>Activated rules</h2>
    <p>${printRules}</p>

    <h2>Normalized weights</h2>
    <p>${printWeights}</p>

    <h2>Top 3 ranking</h2>
    <p>${printRanking}</p>

    `;
}

function resetQuestionnaire() {
    for (const values in userAnswers) {
        delete userAnswers[values];
    }
    document.querySelectorAll('.btn-opt').forEach(b => b.classList.remove('selected'));
    document.getElementById('run-btn').disabled = true;
    document.getElementById('output').innerHTML = '';
    updateProgress();
}
