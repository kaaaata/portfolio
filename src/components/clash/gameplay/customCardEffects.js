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
      const attackIndex = stateCopy[card.player].discard.getRandomCardIndexByFilter(
        card => card.type === 'attack'
      );
      if (attackIndex !== -1) {
        playCard({
          ...stateCopy[card.player].discard[attackIndex],
          banishesOnPlay: true
        }, attackIndex);
      }
    }
  },
  'Recruiter': (card) => {
    // Play a random Ally from your discard pile, then banish them.
    const allyIndex = stateCopy[card.player].discard.getRandomCardIndexByFilter(
      card => card.type === 'ally'
    );
    if (allyIndex !== -1) {
      playCard({
        ...stateCopy[card.player].discard[allyIndex],
        banishesOnPlay: true
      }, allyIndex);
    }
  },
  'Cleric': (card) => {
    // When played or discarded, shuffle a random Potion from your banish into your deck.
    const potionIndex = stateCopy[card.player].banish.getRandomCardIndexByFilter(
      card => card.type === 'potion'
    );
    if (potionIndex !== -1) {
      addCardCopiesIntoPiles(
        [{ card: stateCopy[card.player].banish[potionIndex].name, pile: 'deck' }],
        card.player,
        { player: card.player, location: 'banish', index: potionIndex }
      );
    }
  },
  'Magic Scroll': (card) => {
    // Play a copy of a random magic attack.
    const magic = cardsArray.getRandomCardByFilter(
      card => card.type === 'magic' && card.name !== 'Magic Scroll'
    );
    playCard({
      ...magic,
      player: card.player
    });
  }
};
