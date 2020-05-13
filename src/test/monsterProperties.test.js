import { monstersByTier } from '../components/clash/monsters/monsters';

test('all monsters are valid', () => {
  const errorMessages = [];

  const testIsMonsterValid = (monster, index) => {
    if (!monster) {
      return;
    }

    const { name, tier, image, stats, deck } = monster;

    if (!name) {
      errorMessages.push(`monster at index ${index} is missing name`);
    }
    if (!tier || typeof tier !== 'number') {
      errorMessages.push(`monster at index ${index} is missing tier`);
    }
    if (!image) {
      errorMessages.push(`monster at index ${index} is missing image`);
    }
    if (!stats) {
      errorMessages.push(`monster at index ${index} is missing stats`);
    } else {
      if (typeof stats.attack !== 'number') {
        errorMessages.push(`monster at index ${index} is missing attack stat`);
      }
      if (typeof stats.magic !== 'number') {
        errorMessages.push(`monster at index ${index} is missing magic stat`);
      }
      if (typeof stats.defense !== 'number') {
        errorMessages.push(`monster at index ${index} is missing defense stat`);
      }
    }
    if (!deck || !Array.isArray(deck)) {
      errorMessages.push(`monster at index ${index} is missing deck`);
    }
  };

  Object.values(monstersByTier).forEach(monsters => {
    monsters.forEach((monster, index) => {
      testIsMonsterValid(monster, index);
    });
  });

  errorMessages.forEach(error => {
    console.log(error);
  });

  expect(errorMessages.length).toBe(0);
});
