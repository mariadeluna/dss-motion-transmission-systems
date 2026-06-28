import { RULES } from './rules.js';
import { ARCHETYPES, PLA_FILTER, CRITERIA, MATRIX } from './data.js';

const UPPER_CAP = 3.0;
const LOWER_CAP = 0.5;

function ruleMatch(rule, userAnswers) {

    function answerMatch(question, expectedAnswer) {
        const userAnswer = userAnswers[question];

        if (expectedAnswer.includes(userAnswer)) {
            return true;

        } else {
            return false;

        }
    }

    if (rule.conditions) {
        for (const condition of rule.conditions) {
            if (!answerMatch(condition.question, condition.answer)) {
                return false;
            }
        }
        return true;
    }

    return answerMatch(rule.question, rule.answer);
}

function calculateWeights(userAnswers) {
    let baseWeights = {};
    const activatedRules = [];
    const accumulatedMultipliers = {};

    for (const criterion of CRITERIA) {
        baseWeights[criterion] = 1.0;
        accumulatedMultipliers[criterion] = 1.0;

    }

    for (const rule of RULES) {
        if (ruleMatch(rule, userAnswers)) {
            activatedRules.push(rule)
            for (const effect of rule.effects) {
                baseWeights[effect.criterion] *= effect.multiplier;
            }
        }
    }

    let cappedWeights = {};

    for (const criterion of Object.keys(baseWeights)) {
        cappedWeights[criterion] = Math.min(Math.max(baseWeights[criterion], LOWER_CAP), UPPER_CAP);
    }

    const sumCapWeigths = Object.values(cappedWeights).reduce((sum, value) => sum + value, 0);
    let normalizedWeights = {};
    for (const criterion of Object.keys(cappedWeights)) {
        normalizedWeights[criterion] = cappedWeights[criterion] / sumCapWeigths;
    }

    return { normalizedWeights, activatedRules, accumulatedMultipliers };
}

function calculateScores(candidates, normalizedWeights, adjustComplexity) {

    let candidateScores = {};
    for (const candidate of candidates) {
    let score = 0;
    for (const criterion of CRITERIA) {
        const normalizedCriteria = MATRIX[criterion][candidate] / 3;
        score += normalizedWeights[criterion] * normalizedCriteria;
    }
    // fuera del bucle de criterios
    if (adjustComplexity.includes(candidate)) {
        score -= MATRIX['Complexity_level'][candidate] / 3
            * normalizedWeights['Complexity_level']
            * 0.20;
    }
    candidateScores[candidate] = score;
}

    return Object.entries(candidateScores).sort((a, b) => b[1] - a[1]);
}

/*
PLA_FILTER = {
    "PLA_fully_printable":        { A1: 0, A2: 0, A5: 1, ... },
    "PLA_Needs_simple_components": { A1: 1, A2: 0, ... },
    "PLA_Needs_complex_components":{ A1: 1, A2: 1, ... }
} 
*/
function manufacturingPLAfilter(integration_level) {
    const suitable = [];
    const eliminated = [];
    const adjustComplexity = [];

    if (integration_level === 'fully_printable') {
        const row = PLA_FILTER['PLA_fully_printable'];
        for (const archetype of ARCHETYPES) {
            if (row[archetype] === 1) {
                suitable.push(archetype);
            } else {

                eliminated.push(archetype);
            }
        }
    }
    if (integration_level === 'simple_components') {
        const simpleRow = PLA_FILTER['PLA_Needs_simple_components'];
        const complexRow = PLA_FILTER['PLA_Needs_complex_components'];
        for (const archetype of ARCHETYPES) {
            if (simpleRow[archetype] === 1) {
                suitable.push(archetype);
                if (complexRow[archetype] === 1) {
                    adjustComplexity.push(archetype);

                }
            } else {
                eliminated.push(archetype);
            }
        }
    }
    if (integration_level === 'complex_components') {
        ARCHETYPES.forEach(a => suitable.push(a));
    }

    return {
        suitable,
        eliminated,
        adjustComplexity
    };
}

function architecturalBranching(suitable, userAnswers) {
    const remote = userAnswers['C2_remote'];
    const actuation = userAnswers['C8_actuation_type'];

    let candidates = [];
    const excluded = [];
    if (remote === 'no') {
        for (const archetype of suitable) {
            if (MATRIX['Remote_transmission'][archetype] === 3) {
                excluded.push(archetype);
            } else {
                candidates.push(archetype);
            }
        }
    } else {
        candidates = [...suitable];
    }
    if (actuation === 'active') {
        for (const archetype of candidates) {
            if (MATRIX['Active_actuation_compatibility'][archetype] === 1) {
                excluded.push(archetype);
            }
        }
        candidates = candidates.filter(archetype =>
            MATRIX['Active_actuation_compatibility'][archetype] !== 1
        );
    }
    return {
        candidates,
        excluded
    };
}


export function runDSS(userAnswers) {
    const { suitable, eliminated, adjustComplexity } = manufacturingPLAfilter(userAnswers['integration_level']);
    const { candidates, excluded } = architecturalBranching(suitable, userAnswers);
    const { normalizedWeights, activatedRules, accumulatedMultipliers } = calculateWeights(userAnswers);
    const ranking = calculateScores(candidates, normalizedWeights, adjustComplexity);
    const sortedWeights = Object.entries(normalizedWeights).sort((a, b) => b[1] - a[1]);

    return {
        ranking, 
        sortedWeights,
        normalizedWeights,
        candidates, 
        eliminated, 
        excluded,
        adjustComplexity,
        activatedRules,
        accumulatedMultipliers
    };
}