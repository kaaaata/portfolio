import { cardsArray } from '../cards/cards';
import { addCardCopiesIntoPiles } from './addCardCopiesIntoPiles';
import { playCard } from './playCard';
import { stateCopy } from './globalVariables';

export const customCardEffects = {
  'Weapons Guy': (card) => {
    // Shuffle 2 random attacks into your deck.
    const twoRandomAttacks = [
      { card: cardsArray.getRandomCardByFilter(card => card.type === 'attack').name, pile: 'deck' },
      { card: cardsArray.getRandomCardByFilter(card => card.type === 'attack').name, pile: 'deck' }
    ];
    addCardCopiesIntoPiles(twoRandomAttacks, card.player);
  },
  'Brawler': (card) => {
    // Play 2 random attacks from your discard pile, then banish them.
    for (let i = 0; i < 2; i++) {
      const attack = stateCopy[card.player].discard.getRandomCardByFilter(
        (card) => card.type === 'attack'
      );
      if (attack) {
        playCard({
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
      playCard({
        ...ally,
        banishesOnPlay: true
      });
    }
  },
};
