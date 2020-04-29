import { cardsArray } from '../cards/cards';
import { addCardCopiesIntoPiles } from './addCardCopiesIntoPiles';
import { playCard } from './playCard';

export const customCardEffects = {
  'Weapons Guy': (state, card, player) => {
    // Shuffle 2 random attacks into your deck.
    const twoRandomAttacks = [
      { card: cardsArray.getRandomCardByFilter(card => card.type === 'attack').name, pile: 'deck' },
      { card: cardsArray.getRandomCardByFilter(card => card.type === 'attack').name, pile: 'deck' }
    ];
    addCardCopiesIntoPiles(state, twoRandomAttacks, player);
  },
  'Brawler': (state, card, player) => {
    // Play 2 random attacks from your discard pile, then banish them.
    for (let i = 0; i < 2; i++) {
      const attackIndex = state[player].discard.getRandomCardIndexByFilter(
        card => card.type === 'attack'
      );
      if (attackIndex !== -1) {
        playCard(
          state,
          { ...state[player].discard[attackIndex], banishesOnPlay: true },
          player,
          'discard',
          attackIndex
        );
      }
    }
  },
  'Recruiter': (state, card, player) => {
    // Play a random Ally from your discard pile, then banish them.
    const allyIndex = state[player].discard.getRandomCardIndexByFilter(
      card => card.type === 'ally'
    );
    if (allyIndex !== -1) {
      playCard(
        state,
        { ...state[player].discard[allyIndex], banishesOnPlay: true },
        player,
        'discard',
        allyIndex
      );
    }
  },
  'Cleric': (state, card, player) => {
    // When played or discarded, shuffle a random Potion from your banish into your deck.
    const potionIndex = state[player].banish.getRandomCardIndexByFilter(
      card => card.type === 'potion' && !card.isToken
    );
    if (potionIndex !== -1) {
      addCardCopiesIntoPiles(
        state,
        [{ card: state[player].banish[potionIndex].name, pile: 'deck' }],
        player,
        { player, location: 'banish', index: potionIndex }
      );
    }
  },
  'Golden Goblet': (state, card, player) => {
    // Shuffle 7 cards from your banish into your discard. Heal 7.
    for (let i = 0; i < 7; i++) {
      const banishCardIndex = state[player].banish.getRandomCardIndex();
      if (banishCardIndex !== -1) {
        addCardCopiesIntoPiles(
          state,
          [{ card: state[player].banish[banishCardIndex].name, pile: 'discard' }],
          player,
          { player, location: 'banish', index: banishCardIndex }
        );
      }
    }
  },
  'Magic Scroll': (state, card, player) => {
    // Play a copy of a random magic attack.
    const magic = cardsArray.getRandomCardByFilter(
      card => card.type === 'magic' && card.name !== 'Magic Scroll'
    );
    playCard(state, { ...magic, player }, player);
  }
};
