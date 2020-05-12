import { actionGenerators } from './actionGenerators';
import { cards } from '../cards/cards';
import { createCard } from '../cards/createCard';
import { customCardEffects } from './customCardEffects';
import { addCardCopiesIntoPiles } from './addCardCopiesIntoPiles';

// can't move triggerDiscardEffect into new file because it calls playCard (import loop)
const triggerDiscardEffect = (state, player) => {
  const { logs, renderActions } = state; // state gets mutated. only declare objects here!
  const discardedCard = state[player].discard.getTopCard();
  logs.push(
    `${player} triggers discard effect of ${discardedCard.name}: ${discardedCard.description}`
  );

  renderActions.push([
    actionGenerators.removeCard(state, player, 'discard', 'top'),
    actionGenerators.addCardToStack(state, discardedCard)
  ]);

  const mockCard = createCard({
    name: discardedCard.name,
    ...discardedCard.onDiscard,
    player,
    isMockCard: true
  });

  playCard(state, mockCard, player);

  renderActions.push([
    actionGenerators.removeTopCardFromStack(state),
    actionGenerators.addCard(
      state,
      discardedCard,
      player,
      discardedCard.banishesOnPlay ? 'banish' : 'discard',
      'top'
    )
  ]);
};

// a player loses if their deck size reaches 0.
// the exception is if the last card discarded was a heal, in which case the heal triggers.
export const playCard = (state, card, player, location, index) => {
  const { logs, renderActions } = state; // state gets mutated. only declare objects here!
  const {
    name,
    attack,
    defense,
    heal,
    healEnemy,
    damageSelf,
    dealsBanishingDamage,
    banishesOnPlay,
    pierces,
    type,
    isMockCard,
    customEffect,
    playCopiesOfCards,
    shuffleCardCopiesIntoOpponentsPiles,
    shuffleCardCopiesIntoYourPiles,
    temporaryStatGain
  } = card;
  const opponent = player === 'you' ? 'enemy' : 'you';

  if (state.winner) {
    return;
  } else if (!state[player].deck.length) {
    state.winner = opponent;
    return;
  } else if (!state[opponent].deck.length) {
    state.winner = player;
    return;
  }

  if (!state.winner && !isMockCard && location) {
    renderActions.push([
      actionGenerators.addCardToStack(state, card),
      actionGenerators.removeCard(state, player, location, index)
    ]);
  }

  if (!state.winner) {
    renderActions.push([]);
  }

  if (!state.winner && customEffect) {
    customCardEffects[name](state, card, player);
  }

  if (!state.winner && temporaryStatGain) {
    Object.keys(temporaryStatGain).forEach(stat => {
      const amount = temporaryStatGain[stat];
      const sign = amount > 0 ? '+' : '-';
      logs.push(`${player} receives ${sign}${amount} ${stat} until end of battle`);
    });
    renderActions.push([actionGenerators.setTemporaryStats(state, player, temporaryStatGain)]);
  }

  if (!state.winner && shuffleCardCopiesIntoOpponentsPiles) {
    addCardCopiesIntoPiles(state, shuffleCardCopiesIntoOpponentsPiles, opponent);
  }

  if (!state.winner && shuffleCardCopiesIntoYourPiles) {
    addCardCopiesIntoPiles(state, shuffleCardCopiesIntoYourPiles, player);
  }

  if (!state.winner && playCopiesOfCards) {
    playCopiesOfCards.forEach(cardName => {
      logs.push(`${player} plays a copy of ${cardName}`);
      playCard(state, { ...cards[cardName], player }, player);
    });
  }

  if (!state.winner && typeof attack === 'number') {
    let totalDamageDealt = attack;
    if (attack && ['attack', 'magic'].includes(type)) {
      totalDamageDealt += state[player].temporaryStats[type];
      totalDamageDealt += state[player].permanentStats[type];
    }
    if (!pierces) {
      totalDamageDealt = Math.max(totalDamageDealt - state[opponent].shields, 0);
    }
    logs.push(`${opponent} receives ${totalDamageDealt} damage`);

    let totalShieldsGained = defense;
    if (defense) {
      if (['attack', 'magic'].includes(type)) {
        totalShieldsGained += state[player].temporaryStats.defense;
        totalShieldsGained += state[player].permanentStats.defense;
      }
      logs.push(`${player} gains ${totalShieldsGained} shields`);
      if (totalDamageDealt === 0) {
        // if no damage is dealt, set shields independently of damage ticks.
        // otherwise, set the shields on the same tick as the first instance of damage. (below)
        renderActions.push([actionGenerators.setShields(state, player, totalShieldsGained)]);
      }
    }

    totalDamageDealt = Math.min(totalDamageDealt, state[opponent].deck.length);

    for (let i = 0; i < totalDamageDealt; i++) {
      const removedCard = state[opponent].deck.getTopCard();
      const destination = dealsBanishingDamage ? 'banish' : 'discard';
      logs.push(`${opponent} ${dealsBanishingDamage ? 'banishes' : 'discards'}: ${removedCard.name}`);
      const damageAction = [
        actionGenerators.removeCard(state, opponent, 'deck', 'top'),
        actionGenerators.addCard(state, removedCard, opponent, destination, 'top')
      ];
      if (i === 0) {
        // if damage is dealt, set the shields on the same tick as the first instance of damage.
        // otherwise, set shields independently of damage ticks (above)
        damageAction.push(actionGenerators.setShields(state, player, totalShieldsGained));
      }
      renderActions.push(damageAction);

      if (destination === 'discard' && removedCard.onDiscard) {
        triggerDiscardEffect(state, opponent);
        if (state.winner) break;
      }
      
      if (!state[opponent].deck.length) {
        logs.push(`${opponent} received fatal damage!`);
        state.winner = player;
        break;
      }
    }
  }
  
  if (!state.winner && heal) {
    const totalHeal = Math.min(heal, state[player].discard.length);
    logs.push(`${player} heals ${totalHeal}`);

    for (let i = 0; i < totalHeal; i++) {
      const healedCard = state[player].discard.getTopCard();
      logs.push(`${player} heals: ${healedCard.name}`);
      renderActions.push([
        actionGenerators.removeCard(state, player, 'discard', 'top'),
        actionGenerators.addCard(state, healedCard, player, 'deck', 'random')
      ]);
    }
  }

  if (!state.winner && healEnemy) {
    const totalHeal = Math.min(healEnemy, state[player].discard.length);
    logs.push(`${opponent} heals ${totalHeal}`);

    for (let i = 0; i < totalHeal; i++) {
      if (!state[opponent].discard.length) {
        break;
      }

      const healedCard = state[opponent].discard.getTopCard();
      logs.push(`${opponent} heals: ${healedCard}`);
      renderActions.push([
        actionGenerators.removeCard(state, opponent, 'discard', 'top'),
        actionGenerators.addCard(state, healedCard, opponent, 'deck', 'random')
      ]);
    }
  }

  if (!state.winner && damageSelf) {
    const totalSelfDamage = Math.min(damageSelf, state[player].deck.length);
    logs.push(`${player} receives ${totalSelfDamage} damage`);

    for (let i = 0; i < totalSelfDamage; i++) {
      const removedCard = state[player].deck.getTopCard();
      const destination = dealsBanishingDamage ? 'banish' : 'discard';
      logs.push(`${player} ${dealsBanishingDamage ? 'banishes' : 'discards'}: ${removedCard.name}`);
      renderActions.push([
        actionGenerators.removeCard(state, player, 'deck', 'top'),
        actionGenerators.addCard(state, removedCard, player, destination, 'top')
      ]);

      if (destination === 'discard' && removedCard.onDiscard) {
        triggerDiscardEffect(state, player);
        if (state.winner) break;
      }

      if (!state[player].deck.length) {
        logs.push(`${player} received fatal damage!`);
        state.winner = opponent;
        break;
      }
    }
  }

  if (state.stack.length && !isMockCard) {
    renderActions.push([
      actionGenerators.removeTopCardFromStack(state),
      actionGenerators.addCard(state, card, player, banishesOnPlay ? 'banish' : 'discard', 'top')
    ]);
  }
};
