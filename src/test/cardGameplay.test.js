import { cards } from '../components/clash/cards/cards';
import { createCard } from '../components/clash/cards/createCard';
import {
  stateCopy,
  resetGlobalVariables
} from '../components/clash/gameplay/globalVariables';
import { CardsArray } from '../components/clash/gameplay/CardsArray';
import { playCard } from '../components/clash/gameplay/playCard';

const simulatePlayCard = (card, player = 'you', location = 'hand') => {
  playCard({
    ...card,
    player: card.player || player,
    location: card.location || location
  });
};

beforeEach(() => {
  resetGlobalVariables();

  stateCopy.you = {
    name: 'You',
    deck: CardsArray(Array(10).fill('Strike'), { player: 'you', location: 'deck' }),
    discard: CardsArray(Array(10).fill('Strike'), { player: 'you', location: 'discard' }),
    banish: CardsArray(Array(10).fill('Strike'), { player: 'you', location: 'banish' }),
    hand: CardsArray(Array(3).fill('Strike'), { player: 'you', location: 'hand' }),
    shields: 0,
    temporaryStats: { attack: 0, magic: 0, defense: 0 },
    permanentStats: { attack: 0, magic: 0, defense: 0 }
  };
  stateCopy.enemy = {
    name: 'You',
    deck: CardsArray(Array(10).fill('Strike'), { player: 'enemy', location: 'deck' }),
    discard: CardsArray(Array(10).fill('Strike'), { player: 'enemy', location: 'discard' }),
    banish: CardsArray(Array(10).fill('Strike'), { player: 'enemy', location: 'banish' }),
    hand: CardsArray(Array(3).fill('Strike'), { player: 'enemy', location: 'hand' }),
    shields: 0,
    temporaryStats: { attack: 0, magic: 0, defense: 0 },
    permanentStats: { attack: 0, magic: 0, defense: 0 }
  };
  stateCopy.stack = CardsArray([]);
  stateCopy.winner = null;
});

test('Damage and damage self works (Sunder)', () => {
  const card = cards['Sunder'];
  simulatePlayCard(card);
  expect(stateCopy.enemy.deck.length).toBe(10 - card.attack);
  expect(stateCopy.enemy.discard.length).toBe(10 + card.attack);
  expect(stateCopy.you.deck.length).toBe(10 - card.damageSelf);
  // the +1 at the end is because the played card gets discarded
  expect(stateCopy.you.discard.length).toBe(10 + card.damageSelf + 1);
});

test('Healing and heal enemy works (Mermaid)', () => {
  const card = cards['Mermaid'];
  simulatePlayCard(card);
  // the +1 at the end is because the played card gets discarded
  expect(stateCopy.you.discard.length).toBe(10 - card.heal + 1);
  expect(stateCopy.you.deck.length).toBe(10 + card.heal);
  expect(stateCopy.enemy.deck.length).toBe(10 + card.healEnemy);
  expect(stateCopy.enemy.discard.length).toBe(10 - card.healEnemy);
});

test('Shield works (Slash, Strike)', () => {
  const slash = cards['Slash'];
  const strike = cards['Strike'];
  simulatePlayCard(slash);
  expect(stateCopy.you.shields).toBe(slash.defense);
  simulatePlayCard(strike, 'enemy');
  expect(stateCopy.you.deck.length).toBe(10 - (strike.attack - slash.defense));
});

test('Banishing damage works (Fire)', () => {
  const card = cards['Fire'];
  simulatePlayCard(card);
  expect(stateCopy.enemy.deck.length).toBe(10 - card.attack);
  expect(stateCopy.enemy.discard.length).toBe(10);
  expect(stateCopy.enemy.banish.length).toBe(10 + card.attack);
});

test('Banishes on play works (Healing Potion)', () => {
  const card = cards['Healing Potion'];
  simulatePlayCard(card);
  expect(stateCopy.you.banish.getRandomCardIndexByFilter(card => card.name === 'Healing Potion'))
    .not.toBe(-1);
  expect(stateCopy.you.discard.length).toBe(10 - card.heal);
});

test('Pierce works (Chop)', () => {
  stateCopy.enemy.shields = 2;
  
  const card = cards['Chop'];
  simulatePlayCard(card);
  expect(stateCopy.enemy.deck.length).toBe(10 - card.attack);
});

test('Temporary stats gain works (Mage)', () => {
  const card = cards['Mage'];
  simulatePlayCard(card);
  expect(stateCopy.you.temporaryStats.magic = card.temporaryStatGain.magic);
});

test('Attacks are buffed by Attack (Strike)', () => {
  stateCopy.you.temporaryStats.attack = 1;

  const card = cards['Strike'];
  simulatePlayCard(card);
  expect(stateCopy.enemy.deck.length).toBe(10 - (card.attack + 1));
});

test('Magics are buffed by Magic (Fire)', () => {
  stateCopy.you.temporaryStats.magic = 1;

  const card = cards['Fire'];
  simulatePlayCard(card);
  expect(stateCopy.enemy.deck.length).toBe(10 - (card.attack + 1));
});

test('Shield is buffed by Defense, expect when gain is 0 (Slash)', () => {
  stateCopy.you.temporaryStats.defense = 1;

  const strike = cards['Strike'];
  simulatePlayCard(strike);
  expect(stateCopy.you.shields).toBe(0);
  const slash = cards['Slash'];
  simulatePlayCard(slash);
  expect(stateCopy.you.shields).toBe(slash.defense + 1);
});

test('Allies are not buffed by stats (Weapons Guy)', () => {
  stateCopy.you.temporaryStats.attack = 1;
  stateCopy.you.temporaryStats.defense = 1;

  const card = cards['Weapons Guy'];
  simulatePlayCard(card);
  expect(stateCopy.enemy.deck.length).toBe(10 - card.attack);
  expect(stateCopy.you.shields).toBe(card.defense);
});

test('Play copies of cards works (Hobgoblin)', () => {
  const hobgoblin = cards['Hobgoblin'];
  const slice = cards['Slice'];
  simulatePlayCard(hobgoblin);
  expect(stateCopy.enemy.deck.length).toBe(10 - hobgoblin.attack - slice.attack);
  expect(stateCopy.you.discard.getRandomCardIndexByFilter(card => card.name === 'Slice'))
    .not.toBe(-1);
});

test('Shuffle card copies into pile works (Wayne, Catherine the Great)', () => {
  const dragon = cards['Wayne'];
  const catherine = cards['Catherine the Great'];
  simulatePlayCard(dragon);
  expect(stateCopy.enemy.deck.filter(card => card.name === 'Bomb').length).toBe(2);
  simulatePlayCard(catherine);
  expect(stateCopy.you.deck.filter(card => card.name === 'Healing Blade').length).toBe(2);
});

test('Discard effects work (Healing Potion, Slice)', () => {
  stateCopy.you.deck = CardsArray(
    ['Healing Potion', 'Strike', 'Strike', 'Strike'],
    { player: 'you', location: 'deck' }
  );
  stateCopy.you.discard = CardsArray([]);
  stateCopy.you.banish = CardsArray([]);

  const slice = cards['Slice'];
  const potion = cards['Healing Potion'];
  simulatePlayCard(slice, 'enemy');
  expect(stateCopy.you.discard.length).toBe(0);
  expect(stateCopy.you.banish.length).toBe(1);
  expect(stateCopy.you.deck.length).toBe(potion.onDiscard.heal);
});

test('Mock cards disappear after being played', () => {
  const card = createCard({
    attack: 1,
    player: 'you',
    isMockCard: true
  });
  simulatePlayCard(card);
  expect(stateCopy.you.discard.length).toBe(10);
  expect(stateCopy.you.deck.length).toBe(10);
  expect(stateCopy.you.banish.length).toBe(10);
  expect(stateCopy.enemy.discard.length).toBe(11);
  expect(stateCopy.enemy.deck.length).toBe(9);
  expect(stateCopy.enemy.banish.length).toBe(10);
});

test('CUSTOM CARD EFFECT (Weapons Guy)', () => {
  const card = cards['Weapons Guy'];
  simulatePlayCard(card);
  expect(stateCopy.you.deck.filter(card => card.type === 'attack').length).toBe(12);
});

test('CUSTOM CARD EFFECT (Brawler, Strike)', () => {
  const card = cards['Brawler'];
  simulatePlayCard(card);
  expect(stateCopy.enemy.deck.length).toBe(10 - 2 - 2);
  expect(stateCopy.you.discard.length).toBe(10 - 2 + 1);
  expect(stateCopy.you.banish.filter(card => card.name === 'Strike').length).toBe(12);
});

test('CUSTOM CARD EFFECT (Recruiter, Mage)', () => {
  stateCopy.you.discard.push({
    ...cards['Mage'],
    player: 'you',
    location: 'discard'
  });

  const card = cards['Recruiter'];
  simulatePlayCard(card);
  expect(stateCopy.you.discard.getRandomCardIndexByFilter(card => card.name === 'Mage'))
    .toBe(-1);
  expect(stateCopy.you.banish.getRandomCardIndexByFilter(card => card.name === 'Mage'))
    .not.toBe(-1);
});

test('CUSTOM CARD EFFECT (Cleric, Healing Potion)', () => {
  stateCopy.you.banish.push({
    ...cards['Healing Potion'],
    player: 'you',
    location: 'banish'
  });

  const card = cards['Cleric'];
  simulatePlayCard(card);
  expect(stateCopy.you.banish.getRandomCardIndexByFilter(card => card.name === 'Healing Potion'))
    .toBe(-1);
  expect(stateCopy.you.deck.getRandomCardIndexByFilter(card => card.name === 'Healing Potion'))
    .not.toBe(-1);
});

test('CUSTOM CARD EFFECT (Magic Scroll)', () => {
  const card = cards['Magic Scroll'];
  simulatePlayCard(card);
  expect(stateCopy.you.discard.getRandomCardIndexByFilter(card => card.type === 'magic'))
    .not.toBe(-1);
});
