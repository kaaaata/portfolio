import { actionGenerators } from './actionGenerators';
import { createCard } from '../cards/createCard';
import { cards } from '../cards/cards';
import { customCardEffects } from './customCardEffects';
import { genShuffleCardsIntoDeckActions } from './genShuffleCardsIntoDeckActions';

export const genPlayCardActions = (stateCopy, actions, logs, card, index) => {
  const opponent = card.player === 'you' ? 'enemy' : 'you';
  const {
    name,
    attack,
    defense,
    heal,
    healEnemy,
    damageSelf,
    player,
    unblockable,
    dealsBanishingDamage,
    pierce,
    type,
    isMockCard,
    customEffect,
    playCopyOfCard,
    shuffleCardCopiesIntoDeck,
    shuffleCardCopiesIntoEnemyDeck,
    temporaryStatGain
  } = card;

  const triggerDiscardEffect = (player) => {
    const discardedCard = stateCopy[player].discard.getTopCard();
    logs.push(`
      ${player} triggers discard effect of ${discardedCard.name}: ${discardedCard.description}
    `);

    actions.push([
      actionGenerators.removeCard(stateCopy, player, 'discard', 'top'),
      actionGenerators.addCardToStack(stateCopy, discardedCard)
    ]);

    const mockCard = createCard({
      ...discardedCard.onDiscard,
      player: discardedCard.player,
      isMockCard: true
    });

    genPlayCardActions(stateCopy, actions, logs, mockCard);
  };

  if (!isMockCard) {
    actions.push([
      actionGenerators.addCardToStack(stateCopy, card),
      actionGenerators.removeCard(stateCopy, player, 'hand', index)
    ]);
  }

  actions.push([]);

  if (temporaryStatGain) {
    Object.keys(temporaryStatGain).forEach(stat => {
      const amount = temporaryStatGain[stat];
      const sign = amount > 0 ? '+' : '-';
      logs.push(`${player} receives ${sign}${amount} ${stat} until end of battle`);
    })
    actions.push([actionGenerators.setTemporaryStats(stateCopy, player, temporaryStatGain)]);
  }

  if (typeof attack === 'number') {
    let totalDamageDealt = attack;
    if (attack && ['attack', 'magic'].includes(type)) {
      const bonusStatsDamage = stateCopy[player].temporaryStats[type]
        + stateCopy[player].permanentStats[type];
      totalDamageDealt += bonusStatsDamage;
    }
    if (!unblockable) {
      totalDamageDealt -= stateCopy[opponent].shields;
      if (totalDamageDealt < 0) {
        totalDamageDealt = 0;
      }
    }
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
        actions.push([actionGenerators.setShields(
          stateCopy,
          player,
          stateCopy[player].shields
        )]);
      }
    }

    if (totalDamageDealt) {
      logs.push(`${opponent} receives ${totalDamageDealt} damage`);

      for (let i = 0; i < totalDamageDealt; i++) {
        const removedCard = stateCopy[opponent].deck.getTopCard();
        const destination = dealsBanishingDamage ? 'banish' : 'discard';
        const destinationVerb = dealsBanishingDamage ? 'banishes' : 'discards';
        logs.push(`${opponent} ${destinationVerb}: ${removedCard.name}`);
        const damageAction = [
          actionGenerators.removeCard(stateCopy, opponent, 'deck', 'top'),
          actionGenerators.addCard(
            stateCopy,
            removedCard,
            opponent,
            destination,
            'top'
          )
        ];
        if (i === 0) {
          damageAction.push(actionGenerators.setShields(
            stateCopy,
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
          actions.push([actionGenerators.setWinner(stateCopy, player)]);
          return;
        } else if (!stateCopy[opponent].deck.length) {
          logs.push(`${opponent} won!`);
          actions.push([actionGenerators.setWinner(stateCopy, opponent)]);
          return;
        }
      }
    }
  }

  if (heal) {
    logs.push(`${player} heals ${heal}`);

    for (let i = 0; i < heal; i++) {
      if (!stateCopy[player].discard.length) {
        break;
      }

      const healedCard = stateCopy[player].discard.getTopCard();
      logs.push(`${player} heals: ${healedCard.name}`);
      actions.push([
        actionGenerators.removeCard(stateCopy, player, 'discard', 'top'),
        actionGenerators.addCard(
          stateCopy,
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
        actionGenerators.removeCard(stateCopy, opponent, 'discard', 'top'),
        actionGenerators.addCard(
          stateCopy,
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
        actionGenerators.removeCard(stateCopy, player, 'deck', 'top'),
        actionGenerators.addCard(
          stateCopy,
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
        actions.push([actionGenerators.setWinner(stateCopy, player)]);
        return;
      } else if (!stateCopy[opponent].deck.length) {
        logs.push(`${opponent} won!`);
        actions.push([actionGenerators.setWinner(stateCopy, opponent)]);
        return;
      }
    }
  }

  if (playCopyOfCard) {
    logs.push(`${player} plays a copy of ${playCopyOfCard}`);
    genPlayCardActions(stateCopy, actions, logs, {
      ...cards[playCopyOfCard],
      player: card.player
    });
  }

  if (shuffleCardCopiesIntoEnemyDeck) {
    genShuffleCardsIntoDeckActions(
      stateCopy,
      actions,
      logs,
      shuffleCardCopiesIntoEnemyDeck.map(cardName => cards[cardName]),
      opponent
    );
  }

  if (shuffleCardCopiesIntoDeck) {
    genShuffleCardsIntoDeckActions(
      stateCopy,
      actions,
      logs,
      shuffleCardCopiesIntoDeck.map(cardName => cards[cardName]),
      player
    );
  }

  if (customEffect) {
    customCardEffects[name](stateCopy, actions, logs, card);
  }

  const playedCard = isMockCard
    ? stateCopy.stack.getTopCard()
    : card;

  actions.push([
    actionGenerators.removeTopCardFromStack(stateCopy),
    actionGenerators.addCard(
      stateCopy,
      playedCard,
      playedCard.player,
      playedCard.banishesOnPlay ? 'banish' : 'discard',
      'top'
    )
  ]);
};
