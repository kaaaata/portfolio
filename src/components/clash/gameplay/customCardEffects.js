import { cardsArray } from '../cards/cards';
import { genShuffleCardsIntoDeckActions } from './genShuffleCardsIntoDeckActions';
import { genPlayCardActions } from './genPlayCardActions';
import { stateCopy } from './globalVariables';

export const customCardEffects = {
  'Weapons Guy': (card) => {
    // Shuffle 2 random attacks into your deck.
    const twoRandomAttacks = [
      cardsArray.getRandomCardByFilter(card => card.type === 'attack'),
      cardsArray.getRandomCardByFilter(card => card.type === 'attack')
    ];
    genShuffleCardsIntoDeckActions(twoRandomAttacks, card.player);
  },
  'Brawler': (card) => {
    // Play 2 random attacks from your discard pile, then banish them.
    for (let i = 0; i < 2; i++) {
      const attack = stateCopy[card.player].discard.getRandomCardByFilter(
        (card) => card.type === 'attack'
      );
      if (attack) {
        genPlayCardActions({
          ...attack,
          banishesOnPlay: true
        });
      }
    }
  },
  'Recruiter': (card) => {
    // Play a random Ally from your discard pile, then banish them.
    const ally = stateCopy[card.player].discard.getRandomCardByFilter(
      (card) => card.type === 'ally'
    );
    if (ally) {
      genPlayCardActions({
        ...ally,
        banishesOnPlay: true
      });
    }
  },
};
