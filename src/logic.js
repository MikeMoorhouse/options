import { BLOCK_ORDER, EBACC_CODES, MUTUAL_EXCLUSIONS, SPECIAL_REVIEW } from './data.js';

export const emptySelections = () => ({
  A: { first: null, second: null },
  B: { first: null, second: null },
  C: { first: null, second: null },
  D: { first: null, second: null }
});

const uniqueByName = (items) => {
  const seen = new Set();
  return items.filter(item => {
    if (!item) return false;
    if (seen.has(item.name)) return false;
    seen.add(item.name);
    return true;
  });
};

export const validateSelections = (selections) => {
  const errors = [];
  const problems = [];
  const warnings = [];
  const optimizationNotes = [];

  const firstChoices = [];
  const secondChoices = [];
  const allChoices = [];

  BLOCK_ORDER.forEach(blockId => {
    const { first, second } = selections[blockId];

    if (!first) errors.push(`Please choose a First Choice for Block ${blockId}.`);
    if (!second) errors.push(`Please choose a Second Choice for Block ${blockId}.`);

    if (first && second && first.id === second.id) {
      errors.push(`Your First and Second Choice in Block ${blockId} must be different.`);
    }

    if (first) firstChoices.push({ ...first, blockId, slot: 'First' });
    if (second) secondChoices.push({ ...second, blockId, slot: 'Second' });
    if (first) allChoices.push({ ...first, blockId, slot: 'First' });
    if (second) allChoices.push({ ...second, blockId, slot: 'Second' });
  });

  const uniqueFirst = uniqueByName(firstChoices.map(choice => choice));
  if (firstChoices.length > 0 && uniqueFirst.length !== firstChoices.length) {
    errors.push('Your First Choices must be four different subjects (one unique choice per block).');
  }

  const secondByName = new Map();
  secondChoices.forEach(choice => {
    if (!secondByName.has(choice.name)) {
      secondByName.set(choice.name, []);
    }
    secondByName.get(choice.name).push(choice.blockId);
  });

  secondByName.forEach((blocks, subjectName) => {
    if (blocks.length > 1) {
      warnings.push(
        `Second Choices should be different. ${subjectName} is selected as a Second Choice in Blocks ${blocks.join(', ')}.`
      );
    }
  });

  const hasEbacc = firstChoices.some(choice => EBACC_CODES.has(choice.code));
  if (!hasEbacc) {
    errors.push('Please include History or Geography as a First Choice to meet the Ebacc requirement.');
  }

  const selectedCodes = new Set(allChoices.map(choice => choice.code));
  MUTUAL_EXCLUSIONS.forEach(([a, b]) => {
    if (selectedCodes.has(a) && selectedCodes.has(b)) {
      const labelA = allChoices.find(choice => choice.code === a)?.name || a;
      const labelB = allChoices.find(choice => choice.code === b)?.name || b;
      errors.push(`You can only choose one of these subjects: ${labelA} or ${labelB}.`);
    }
  });

  const firstByName = new Map();
  firstChoices.forEach(choice => {
    if (!firstByName.has(choice.name)) {
      firstByName.set(choice.name, []);
    }
    firstByName.get(choice.name).push(choice.blockId);
  });

  secondChoices.forEach(choice => {
    const firstBlocks = firstByName.get(choice.name) || [];
    const otherBlock = firstBlocks.find(blockId => blockId !== choice.blockId);
    if (otherBlock) {
      problems.push({
        blockId: choice.blockId,
        message: 'PROBLEM: Invalid Backup – Subject already assigned as a First Choice elsewhere.'
      });
    }
  });

  const duplicates = new Map();
  allChoices.forEach(choice => {
    if (!choice) return;
    if (!duplicates.has(choice.name)) {
      duplicates.set(choice.name, []);
    }
    duplicates.get(choice.name).push(`${choice.slot} (Block ${choice.blockId})`);
  });

  duplicates.forEach((slots, subjectName) => {
    if (slots.length > 1) {
      optimizationNotes.push(`Try to keep all eight slots unique. ${subjectName} appears in ${slots.join(', ')}.`);
    }
  });

  Object.entries(SPECIAL_REVIEW).forEach(([blockId, config]) => {
    const selection = selections[blockId]?.first;
    if (selection && selection.code === config.code) {
      warnings.push(`Teacher Review Required: ${config.label} in Block ${blockId} First Choice.`);
    }
  });

  let status = 'VALID';
  if (errors.length > 0) status = 'INVALID';
  else if (problems.length > 0) status = 'PROBLEM';

  const summary = {
    firstChoices: BLOCK_ORDER.map(blockId => ({
      blockId,
      name: selections[blockId].first?.name || 'Not selected'
    })),
    secondChoices: BLOCK_ORDER.map(blockId => ({
      blockId,
      name: selections[blockId].second?.name || 'Not selected'
    }))
  };

  return {
    status,
    errors,
    problems,
    warnings,
    optimizationNotes,
    summary
  };
};

export const buildBlockStatus = (problems) => {
  const status = {};
  problems.forEach(problem => {
    status[problem.blockId] = problem.message;
  });
  return status;
};
