import { cardsArray } from '../cards/cards';
import { addCardCopiesIntoPiles } from './addCardCopiesIntoPiles';
import { playCard } from './playCard';

export const customCardEffects = {
  'Brawler': (state, card, player) => {
    // Play a random attack from your discard pile, then banish it.
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
  },
  'Recruiter': (state, card, player) => {
    // Play a random ally from your discard pile, then banish it.
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
    // When played or discarded, shuffle a random potion from your banish into your deck.
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
    const randomCard = cardsArray.getRandomCardByFilter(
      card => !card.isToken && card.name !== 'Magic Scroll' && card.rarity !== 'legendary'
    );
    state.logs.push(`${player} plays a copy of ${randomCard.name}`);
    playCard(state, randomCard, player);
  },
  'Edible Slime': (state, card, player) => {
    // Shuffle 3 random non-legendary cards into your deck.
    const copies = [1, 2, 3].map(i => ({
      card: cardsArray.getRandomCardByFilter(
        card => !card.isToken && card.name !== 'Edible Slime' && card.rarity !== 'legendary'
      ).name,
      pile: 'deck'
    }));
    addCardCopiesIntoPiles(state, copies, player);
  }
};
