import { actionGenerators } from './actionGenerators';
import { createCard } from '../cards/createCard';
import { cards } from '../cards/cards';
import { customCardEffects } from './customCardEffects';
import { genShuffleCardsIntoDeckActions } from './genShuffleCardsIntoDeckActions';
import { stateCopy, actions, logs } from './globalVariables';

export const genPlayCardActions = (card, index) => {
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
    pierce,
    type,
    isMockCard,
    customEffect,
    playCopiesOfCards,
    shuffleCardCopiesIntoDeck,
    shuffleCardCopiesIntoEnemyDeck,
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
      ...discardedCard.onDiscard,
      player: discardedCard.player,
      isMockCard: true
    });

    genPlayCardActions(mockCard);
  };

  if (!isMockCard) {
    actions.push([
      actionGenerators.addCardToStack(card),
      actionGenerators.removeCard(player, 'hand', index)
    ]);
  }

  actions.push([]);

  if (temporaryStatGain) {
    Object.keys(temporaryStatGain).forEach(stat => {
      const amount = temporaryStatGain[stat];
      const sign = amount > 0 ? '+' : '-';
      logs.push(`${player} receives ${sign}${amount} ${stat} until end of battle`);
    })
    actions.push([actionGenerators.setTemporaryStats(player, temporaryStatGain)]);
  }

  if (typeof attack === 'number') {
    let totalDamageDealt = attack;
    if (attack && ['attack', 'magic'].includes(type)) {
      const bonusStatsDamage = stateCopy[player].temporaryStats[type]
        + stateCopy[player].permanentStats[type];
      totalDamageDealt += bonusStatsDamage;
    }
    totalDamageDealt = Math.max(totalDamageDealt - stateCopy[opponent].shields, 0);
    const bonusPierceDamage = pierce > stateCopy[opponent].shields
      ? stateCopy[opponent].shields
      : pierce;
    totalDamageDealt += bonusPierceDamage;

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

    logs.push(`${opponent} receives ${totalDamageDealt} damage`);

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

      if (!stateCopy[opponent].deck.length) {
        logs.push(`${player} won!`);
        actions.push([actionGenerators.setWinner(player)]);
        return;
      } else if (!stateCopy[opponent].deck.length) {
        logs.push(`${opponent} won!`);
        actions.push([actionGenerators.setWinner(opponent)]);
        return;
      }
    }
  }

  const totalHeal = heal && stateCopy[player].discard.length;
  if (totalHeal) {
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
    logs.push(`${opponent} heals ${heal}`);

    for (let i = 0; i < healEnemy; i++) {
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
    logs.push(`${player} receives ${damageSelf} damage`);

    for (let i = 0; i < damageSelf; i++) {
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

      if (!stateCopy[opponent].deck.length) {
        logs.push(`${player} won!`);
        actions.push([actionGenerators.setWinner(player)]);
        return;
      } else if (!stateCopy[opponent].deck.length) {
        logs.push(`${opponent} won!`);
        actions.push([actionGenerators.setWinner(opponent)]);
        return;
      }
    }
  }

  if (playCopiesOfCards) {
    playCopiesOfCards.forEach(cardName => {
      logs.push(`${player} plays a copy of ${cardName}`);
      genPlayCardActions({
        ...cards[cardName],
        player: card.player
      });
    });
  }

  if (shuffleCardCopiesIntoEnemyDeck) {
    genShuffleCardsIntoDeckActions(
      shuffleCardCopiesIntoEnemyDeck.map(cardName => ({
        ...cards[cardName],
        player: 'enemy'
      })),
      opponent
    );
  }

  if (shuffleCardCopiesIntoDeck) {
    genShuffleCardsIntoDeckActions(
      shuffleCardCopiesIntoDeck.map(cardName => ({
        ...cards[cardName],
        player: 'you'
      })),
      player
    );
  }

  if (customEffect) {
    customCardEffects[name](card);
  }

  const playedCard = isMockCard
    ? stateCopy.stack.getTopCard()
    : card;

  actions.push([
    actionGenerators.removeTopCardFromStack(),
    actionGenerators.addCard(
      playedCard,
      playedCard.player,
      playedCard.banishesOnPlay ? 'banish' : 'discard',
      'top'
    )
  ]);
};
