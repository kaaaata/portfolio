import { cards } from '../components/clash/cards/cards';
import { createCard } from '../components/clash/cards/createCard';
import { CardsArray } from '../components/clash/gameplay/CardsArray';
import { playCard } from '../components/clash/gameplay/playCard';

const state = {};

const simulatePlayCard = (card, player = 'you') => {
  state[player].hand[0] = cards[card];
  playCard(state, card, player, 'hand', 0);
};

const resetState = () => {
  state.you = {
    name: 'You',
    deck: CardsArray(Array(10).fill('Strike')),
    discard: CardsArray(Array(10).fill('Strike')),
    banish: CardsArray(Array(10).fill('Strike')),
    hand: CardsArray(Array(3).fill('Strike')),
    shields: 0,
    statBonuses: { attack: 0, magic: 0, defense: 0 },
    stats: { attack: 0, magic: 0, defense: 0 }
  };
  state.enemy = {
    name: 'You',
    deck: CardsArray(Array(10).fill('Strike')),
    discard: CardsArray(Array(10).fill('Strike')),
    banish: CardsArray(Array(10).fill('Strike')),
    hand: CardsArray(Array(3).fill('Strike')),
    shields: 0,
    statBonuses: { attack: 0, magic: 0, defense: 0 },
    stats: { attack: 0, magic: 0, defense: 0 }
  };
  state.stack = CardsArray([]);
  state.winner = null;
  state.logs = [];
  state.renderActions = [];
};

beforeEach(resetState);

test('Damage and damage self works (Sunder)', () => {
  const card = cards['Sunder'];
  simulatePlayCard(card);
  expect(state.enemy.deck.length).toBe(10 - card.attack);
  expect(state.enemy.discard.length).toBe(10 + card.attack);
  expect(state.you.deck.length).toBe(10 - card.damageSelf);
  // the +1 at the end is because the played card gets discarded
  expect(state.you.discard.length).toBe(10 + card.damageSelf + 1);
});

test('Healing and heal enemy works (Mermaid)', () => {
  const card = cards['Mermaid'];
  simulatePlayCard(card);
  // the +1 at the end is because the played card gets discarded
  expect(state.you.discard.length).toBe(10 - card.heal + 1);
  expect(state.you.deck.length).toBe(10 + card.heal);
  expect(state.enemy.deck.length).toBe(10 + card.healEnemy);
  expect(state.enemy.discard.length).toBe(10 - card.healEnemy);
});

test('Shield works (Slash, Strike)', () => {
  const slash = cards['Slash'];
  const strike = cards['Strike'];
  simulatePlayCard(slash);
  expect(state.you.shields).toBe(slash.defense);
  simulatePlayCard(strike, 'enemy');
  expect(state.you.deck.length).toBe(10 - (strike.attack - slash.defense));
});

test('Banishing damage works (Devastating Blow)', () => {
  const card = cards['Devastating Blow'];
  simulatePlayCard(card);
  expect(state.enemy.deck.length).toBe(10 - card.attack);
  expect(state.enemy.discard.length).toBe(10);
  expect(state.enemy.banish.length).toBe(10 + card.attack);
});

test('Banishes on play works (Healing Potion)', () => {
  const card = cards['Healing Potion'];
  simulatePlayCard(card);
  expect(state.you.banish.getRandomCardIndexByFilter(card => card.name === 'Healing Potion'))
    .not.toBe(-1);
  expect(state.you.discard.length).toBe(10 - card.heal);
});

test('Piercing damage aka "Pierces" works (Fire)', () => {
  state.enemy.shields = 10;
  
  const card = cards['Fire'];
  simulatePlayCard(card);
  expect(state.enemy.deck.length).toBe(10 - card.attack);
});

test('Stat bonuses works (Mage)', () => {
  const card = cards['Mage'];
  simulatePlayCard(card);
  expect(state.you.statBonuses.magic = card.statBonuses.magic);
});

test('Attacks are buffed by Attack (Strike)', () => {
  state.you.statBonuses.attack = 1;

  const card = cards['Strike'];
  simulatePlayCard(card);
  expect(state.enemy.deck.length).toBe(10 - (card.attack + 1));
});

test('Magics are buffed by Magic (Fire)', () => {
  state.you.statBonuses.magic = 1;

  const card = cards['Fire'];
  simulatePlayCard(card);
  expect(state.enemy.deck.length).toBe(10 - (card.attack + 1));
});

test('Shield is buffed by Defense, expect when gain is 0 (Slash)', () => {
  state.you.statBonuses.defense = 1;

  const strike = cards['Strike'];
  simulatePlayCard(strike);
  expect(state.you.shields).toBe(0);
  const slash = cards['Slash'];
  simulatePlayCard(slash);
  expect(state.you.shields).toBe(slash.defense + 1);
});

test('Allies are not buffed by stats (Weapons Guy)', () => {
  state.you.statBonuses.attack = 1;
  state.you.statBonuses.defense = 1;

  const card = cards['Weapons Guy'];
  simulatePlayCard(card);
  expect(state.enemy.deck.length).toBe(10 - card.attack);
  expect(state.you.shields).toBe(card.defense);
});

test('Play copies of cards works (Hobgoblin)', () => {
  const hobgoblin = cards['Hobgoblin'];
  const slice = cards['Slice'];
  simulatePlayCard(hobgoblin);
  expect(state.enemy.deck.length).toBe(10 - hobgoblin.attack - slice.attack);
  expect(state.you.discard.getRandomCardIndexByFilter(card => card.name === 'Slice'))
    .not.toBe(-1);
});

test('Shuffle card copies into pile works (Goblin, Catherine the Great)', () => {
  const goblin = cards['Goblin'];
  const catherine = cards['Catherine the Great'];
  simulatePlayCard(goblin);
  expect(state.enemy.deck.filter(card => card.name === 'Bomb').length).toBe(3);
  simulatePlayCard(catherine);
  expect(state.you.deck.filter(card => card.name === 'Healing Blade').length).toBe(2);
});

test('Discard effects work (Healing Potion, Slice)', () => {
  state.you.deck = CardsArray(['Strike', 'Healing Potion', 'Strike', 'Strike', 'Strike']);
  state.you.discard = CardsArray([]);
  state.you.banish = CardsArray([]);

  const slice = cards['Slice'];
  const potion = cards['Healing Potion'];
  simulatePlayCard(slice, 'enemy');
  expect(state.you.discard.length).toBe(0);
  expect(state.you.banish.length).toBe(1);
  expect(state.you.deck.length).toBe(potion.onDiscard.heal + 1);
});

test('Player should lose if deck size hits 0 (Healing Potion, Slice)', () => {
  state.you.deck = CardsArray(['Healing Potion', 'Strike', 'Strike', 'Strike']);

  const slice = cards['Slice'];
  simulatePlayCard(slice, 'enemy');
  expect(state.you.deck.length).toBe(0);
});


test('Mock cards disappear after being played', () => {
  const card = createCard({
    attack: 1,
    isMockCard: true
  });
  simulatePlayCard(card);
  expect(state.you.discard.length).toBe(10);
  expect(state.you.deck.length).toBe(10);
  expect(state.you.banish.length).toBe(10);
  expect(state.enemy.discard.length).toBe(11);
  expect(state.enemy.deck.length).toBe(9);
  expect(state.enemy.banish.length).toBe(10);
});

test('Dealing damage greater than deck size should be handled well', () => {
  state.enemy.deck = CardsArray(Array(10).fill('Bomb'));
  const damageCard = createCard({
    attack: 20,
    isMockCard: true
  });
  simulatePlayCard(damageCard);
  expect(state.enemy.deck.length).toBe(0);

  resetState();

  state.you.deck = CardsArray(Array(10).fill('Bomb'));
  const damageSelfCard = createCard({
    damageSelf: 20,
    isMockCard: true
  });
  simulatePlayCard(damageSelfCard);
  expect(state.you.deck.length).toBe(0);
});


test('CUSTOM CARD EFFECT (Weapons Guy)', () => {
  const card = cards['Weapons Guy'];
  simulatePlayCard(card);
  expect(state.you.deck.filter(card => card.type === 'attack').length).toBe(12);
});

test('CUSTOM CARD EFFECT (Brawler, Strike)', () => {
  const card = cards['Brawler'];
  simulatePlayCard(card);
  expect(state.enemy.deck.length).toBe(10 - 2 - 2);
  expect(state.you.discard.length).toBe(10 - 2 + 1);
  expect(state.you.banish.filter(card => card.name === 'Strike').length).toBe(12);
});

test('CUSTOM CARD EFFECT (Recruiter, Mage)', () => {
  state.you.discard.push(cards['Mage']);

  const card = cards['Recruiter'];
  simulatePlayCard(card);
  expect(state.you.discard.getRandomCardIndexByFilter(card => card.name === 'Mage'))
    .toBe(-1);
  expect(state.you.banish.getRandomCardIndexByFilter(card => card.name === 'Mage'))
    .not.toBe(-1);
});

test('CUSTOM CARD EFFECT (Cleric, Healing Potion)', () => {
  state.you.banish.push(cards['Healing Potion']);

  const card = cards['Cleric'];
  simulatePlayCard(card);
  expect(state.you.banish.getRandomCardIndexByFilter(card => card.name === 'Healing Potion'))
    .toBe(-1);
  expect(state.you.deck.getRandomCardIndexByFilter(card => card.name === 'Healing Potion'))
    .not.toBe(-1);
});

test('CUSTOM CARD EFFECT (Magic Scroll)', () => {
  const card = cards['Magic Scroll'];
  simulatePlayCard(card);
  expect(state.you.discard.getRandomCardIndexByFilter(card => card.type === 'magic'))
    .not.toBe(-1);
});

test('CUSTOM CARD EFFECT (Golden Goblet)', () => {
  const card = cards['Golden Goblet'];
  simulatePlayCard(card);
  expect(state.you.banish.length).toBe(4);
  expect(state.you.discard.length).toBe(10);
  expect(state.you.deck.length).toBe(17);
});
