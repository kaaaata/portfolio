import { actionGenerators } from './actionGenerators';
import { createCard } from '../cards/createCard';
import { cards } from '../cards/cards';
import { customCardEffects } from './customCardEffects';
import { addCardCopiesIntoPiles } from './addCardCopiesIntoPiles';
import { stateCopy, actions, logs } from './globalVariables';

const triggerDiscardEffect = (player) => {
  const discardedCard = stateCopy[player].discard.getTopCard();
  logs.push(`${player} triggers discard effect of ${discardedCard.name}: ${discardedCard.description}`);

  actions.push([
    actionGenerators.removeCard(player, 'discard', 'top'),
    actionGenerators.addCardToStack(discardedCard)
  ]);

  const mockCard = createCard({
    name: discardedCard.name,
    ...discardedCard.onDiscard,
    player,
    isMockCard: true
  });

  playCard(mockCard);

  actions.push([
    actionGenerators.removeTopCardFromStack(),
    actionGenerators.addCard(
      discardedCard,
      player,
      discardedCard.banishesOnPlay ? 'banish' : 'discard',
      'top'
    )
  ]);
};

// if a player loses (receives damage while deck size = 0), playCard returns.
export const playCard = (card, index) => {
  const {
    name,
    attack,
    defense,
    heal,
    healEnemy,
    damageSelf,
    player,
    location,
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

  if (!isMockCard) {
    actions.push([
      actionGenerators.addCardToStack(card),
      actionGenerators.removeCard(player, location, index)
    ]);
  }

  actions.push([]);

  if (customEffect) {
    customCardEffects[name](card);
  }

  if (temporaryStatGain) {
    Object.keys(temporaryStatGain).forEach(stat => {
      const amount = temporaryStatGain[stat];
      const sign = amount > 0 ? '+' : '-';
      logs.push(`${player} receives ${sign}${amount} ${stat} until end of battle`);
    });
    actions.push([actionGenerators.setTemporaryStats(player, temporaryStatGain)]);
  }

  if (shuffleCardCopiesIntoOpponentsPiles) {
    addCardCopiesIntoPiles(shuffleCardCopiesIntoOpponentsPiles, opponent);
  }

  if (shuffleCardCopiesIntoYourPiles) {
    addCardCopiesIntoPiles(shuffleCardCopiesIntoYourPiles, player);
  }

  if (playCopiesOfCards) {
    playCopiesOfCards.forEach(cardName => {
      logs.push(`${player} plays a copy of ${cardName}`);
      playCard({
        ...cards[cardName],
        player
      });
    });
  }

  if (typeof attack === 'number') {
    let totalDamageDealt = attack;
    if (attack && ['attack', 'magic'].includes(type)) {
      totalDamageDealt += stateCopy[player].temporaryStats[type];
      totalDamageDealt += stateCopy[player].permanentStats[type];
    }
    if (!pierces) {
      totalDamageDealt = Math.max(totalDamageDealt - stateCopy[opponent].shields, 0);
    }
    logs.push(`${opponent} receives ${totalDamageDealt} damage`);

    let totalShieldsGained = defense;
    if (defense) {
      if (['attack', 'magic'].includes(type)) {
        totalShieldsGained += stateCopy[player].temporaryStats.defense;
        totalShieldsGained += stateCopy[player].permanentStats.defense;
      }
      logs.push(`${player} gains ${totalShieldsGained} shields`);
      if (totalDamageDealt === 0) {
        // if no damage is dealt, set shields independently of damage ticks.
        // otherwise, set the shields on the same tick as the first instance of damage. (below)
        actions.push([actionGenerators.setShields(player, totalShieldsGained)]);
      }
    }

    for (let i = 0; i < totalDamageDealt; i++) {
      const removedCard = stateCopy[opponent].deck.getTopCard();
      if (!removedCard) {
        return;
      }
      const destination = dealsBanishingDamage ? 'banish' : 'discard';
      logs.push(`${opponent} ${dealsBanishingDamage ? 'banishes' : 'discards'}: ${removedCard.name}`);
      const damageAction = [
        actionGenerators.removeCard(opponent, 'deck', 'top'),
        actionGenerators.addCard(removedCard, opponent, destination, 'top')
      ];
      if (i === 0) {
        // if damage is dealt, set the shields on the same tick as the first instance of damage.
        // otherwise, set shields independently of damage ticks (above)
        damageAction.push(actionGenerators.setShields(player, totalShieldsGained));
      }
      actions.push(damageAction);

      if (destination === 'discard' && removedCard.onDiscard) {
        triggerDiscardEffect(opponent);
      }
    }
  }
  
  if (heal) {
    const totalHeal = Math.min(heal, stateCopy[player].discard.length);
    logs.push(`${player} heals ${totalHeal}`);

    for (let i = 0; i < totalHeal; i++) {
      const healedCard = stateCopy[player].discard.getTopCard();
      logs.push(`${player} heals: ${healedCard.name}`);
      actions.push([
        actionGenerators.removeCard(player, 'discard', 'top'),
        actionGenerators.addCard(healedCard, player, 'deck', 'random')
      ]);
    }
  }

  if (healEnemy) {
    const totalHeal = Math.min(healEnemy, stateCopy[player].discard.length);
    logs.push(`${opponent} heals ${totalHeal}`);

    for (let i = 0; i < totalHeal; i++) {
      if (!stateCopy[opponent].discard.length) {
        break;
      }

      const healedCard = stateCopy[opponent].discard.getTopCard();
      logs.push(`${opponent} heals: ${healedCard}`);
      actions.push([
        actionGenerators.removeCard(opponent, 'discard', 'top'),
        actionGenerators.addCard(healedCard, opponent, 'deck', 'random')
      ]);
    }
  }

  if (damageSelf) {
    const totalSelfDamage = Math.min(damageSelf, stateCopy[player].deck.length);
    logs.push(`${player} receives ${totalSelfDamage} damage`);

    for (let i = 0; i < totalSelfDamage; i++) {
      const removedCard = stateCopy[player].deck.getTopCard();
      if (!removedCard) {
        return;
      }
      const destination = dealsBanishingDamage ? 'banish' : 'discard';
      logs.push(`${opponent} ${dealsBanishingDamage ? 'banishes' : 'discards'}: ${removedCard.name}`);
      actions.push([
        actionGenerators.removeCard(player, 'deck', 'top'),
        actionGenerators.addCard(removedCard, player, destination, 'top')
      ]);

      if (destination === 'discard' && removedCard.onDiscard) {
        triggerDiscardEffect(player);
      }
    }
  }

  if (stateCopy.stack.length && !isMockCard) {
    actions.push([
      actionGenerators.removeTopCardFromStack(),
      actionGenerators.addCard(card, player, banishesOnPlay ? 'banish' : 'discard', 'top')
    ]);
  }
};
