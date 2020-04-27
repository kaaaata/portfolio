import { actionGenerators } from './actionGenerators';
import { createCard } from '../cards/createCard';
import { cards } from '../cards/cards';
import { customCardEffects } from './customCardEffects';
import { addCardCopiesIntoPiles } from './addCardCopiesIntoPiles';
import { stateCopy, actions, logs } from './globalVariables';

export const playCard = (card = {}, index) => {
  const opponent = card.player === 'you' ? 'enemy' : 'you';
  const {
    name,
    attack,
    defense,
    heal,
    healEnemy,
    damageSelf,
    player,
    dealsBanishingDamage,
    pierces,
    type,
    isMockCard,
    customEffect,
    playCopiesOfCards,
    shuffleCardCopiesIntoOpponentsPiles,
    shuffleCardCopiesIntoYourPiles,
    temporaryStatGain
  } = card;

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
      player: discardedCard.player,
      isMockCard: true
    });

    playCard(mockCard);
  };

  if (!isMockCard) {
    actions.push([
      actionGenerators.addCardToStack(card),
      actionGenerators.removeCard(player, card.location, index)
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
    })
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
        player: card.player
      });
    });
  }

  if (typeof attack === 'number') {
    let totalDamageDealt = attack;
    if (attack && ['attack', 'magic'].includes(type)) {
      const bonusStatsDamage = stateCopy[player].temporaryStats[type]
        + stateCopy[player].permanentStats[type];
      totalDamageDealt += bonusStatsDamage;
    }
    if (!pierces) {
      totalDamageDealt = Math.max(totalDamageDealt - stateCopy[opponent].shields, 0);
    }
    totalDamageDealt = Math.min(totalDamageDealt, stateCopy[opponent].deck.length);
    logs.push(`${opponent} receives ${totalDamageDealt} damage`);

    let totalShieldsGained = defense;
    if (defense) {
      if (type !== 'ally') {
        const bonusShields = stateCopy[player].temporaryStats.defense
          + stateCopy[player].permanentStats.defense;
        totalShieldsGained += bonusShields;
      }
      totalShieldsGained = Math.max(totalShieldsGained, 0);
      logs.push(`${player} gains ${totalShieldsGained} shields`);
      stateCopy[player].shields = totalShieldsGained;
      if (totalDamageDealt === 0) {
        // if no damage is dealt, set shields independently of damage ticks.
        actions.push([actionGenerators.setShields(
          player,
          stateCopy[player].shields
        )]);
      }
    }

    for (let i = 0; i < totalDamageDealt; i++) {
      const removedCard = stateCopy[opponent].deck.getTopCard();
      const destination = dealsBanishingDamage ? 'banish' : 'discard';
      const destinationVerb = dealsBanishingDamage ? 'banishes' : 'discards';
      logs.push(`${opponent} ${destinationVerb}: ${removedCard.name}`);
      const damageAction = [
        actionGenerators.removeCard(opponent, 'deck', 'top'),
        actionGenerators.addCard(
          removedCard,
          opponent,
          destination,
          'top'
        )
      ];
      if (i === 0) {
        // set the shields on the same tick as the first instance of damage
        damageAction.push(actionGenerators.setShields(
          player,
          stateCopy[player].shields
        ));
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
        actionGenerators.addCard(
          healedCard,
          player,
          'deck',
          'random'
        )
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
        actionGenerators.addCard(
          healedCard,
          opponent,
          'deck',
          'random'
        )
      ]);
    }
  }

  if (damageSelf) {
    // TODO: refactor damage dealing to deal full amount but stop when deck is empty
    // to account for bombs/shuffles in deck.
    const totalSelfDamage = Math.min(damageSelf, stateCopy[player].deck.length);
    logs.push(`${player} receives ${totalSelfDamage} damage`);

    for (let i = 0; i < totalSelfDamage; i++) {
      console.log('asdf', { i, statecopydeck: stateCopy[player].deck });
      const removedCard = stateCopy[player].deck.getTopCard();
      const destination = dealsBanishingDamage ? 'banish' : 'discard';
      const destinationVerb = dealsBanishingDamage ? 'banishes' : 'discards';
      logs.push(`${opponent} ${destinationVerb}: ${removedCard.name}`);
      actions.push([
        actionGenerators.removeCard(player, 'deck', 'top'),
        actionGenerators.addCard(
          removedCard,
          player,
          destination,
          'top'
        )
      ]);

      if (destination === 'discard' && removedCard.onDiscard) {
        triggerDiscardEffect(player);
      }
    }
  }

  // stateCopy.stack.length should usually be truthy
  // but it could be falsy if a mock card is played before a real card is played.
  if (stateCopy.stack.length) {
    actions.push([
      actionGenerators.removeTopCardFromStack(),
      actionGenerators.addCard(
        card,
        card.player,
        card.banishesOnPlay ? 'banish' : 'discard',
        'top'
      )
    ]);
  }
};
