import { cardsArray } from '../cards/cards';
import { genShuffleCardsIntoDeckActions } from './genShuffleCardsIntoDeckActions';
import { genPlayCardActions } from './genPlayCardActions';

// each function should use (stateCopy, actions, card) as the arguments.
export const customCardEffects = {
  'Weapons Guy': (stateCopy, actions, card) => {
    // Shuffle 2 random attacks into your deck.
    const twoRandomAttacks = [
      cardsArray.getRandomCardByFilter(card => card.type === 'attack'),
      cardsArray.getRandomCardByFilter(card => card.type === 'attack')
    ];
    genShuffleCardsIntoDeckActions(stateCopy, actions, twoRandomAttacks, card.player);
  },
  'Brawler': (stateCopy, actions, card) => {
    // Play 2 random attacks from your discard pile, then banish them.
    for (let i = 0; i < 2; i++) {
      const attack = stateCopy[card.player].discard.getRandomCardByFilter(
        (card) => card.type === 'attack'
      );
      if (attack) {
        genPlayCardActions(stateCopy, actions, {
          ...attack,
          banishesOnPlay: true
        });
      }
    }
  },
  'Recruiter': (stateCopy, actions, card) => {
    // Play a random Ally from your discard pile, then banish them.
    const ally = stateCopy[card.player].discard.getRandomCardByFilter(
      (card) => card.type === 'ally'
    );
    if (ally) {
      genPlayCardActions(stateCopy, actions, {
        ...ally,
        banishesOnPlay: true
      });
    }
  }
};
