import { actionGenerators } from './actionGenerators';
import { createCard } from '../cards/createCard';
import { cards } from '../cards/cards';
import { customCardEffects } from './customCardEffects';
import { genShuffleCardsIntoDeckActions } from './genShuffleCardsIntoDeckActions';

export const genPlayCardActions = (stateCopy, actions, card, index) => {
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

    actions.push([
      actionGenerators.removeCard(stateCopy, player, 'discard', 'top'),
      actionGenerators.addCardToStack(stateCopy, discardedCard)
    ]);

    const mockCard = createCard({
      ...discardedCard.onDiscard,
      player: discardedCard.player,
      isMockCard: true
    });

    genPlayCardActions(stateCopy, actions, mockCard);
  };

  if (!isMockCard) {
    actions.push([
      actionGenerators.addCardToStack(stateCopy, card),
      actionGenerators.removeCard(stateCopy, player, 'hand', index)
    ]);
  }

  actions.push([]);

  if (temporaryStatGain) {
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
      stateCopy[player].shields = Math.max(totalShieldsGained, 0);
      if (totalDamageDealt === 0) {
        actions.push([actionGenerators.setShields(
          stateCopy,
          player,
          stateCopy[player].shields
        )]);
      }
    }

    for (let i = 0; i < totalDamageDealt; i++) {
      const removedCard = stateCopy[opponent].deck.getTopCard();
      const destination = dealsBanishingDamage ? 'banish' : 'discard';
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
        console.log(`${player} won!`);
        actions.push([actionGenerators.setWinner(stateCopy, player)]);
        return;
      } else if (!stateCopy[opponent].deck.length) {
        console.log(`${opponent} won!`);
        actions.push([actionGenerators.setWinner(stateCopy, opponent)]);
        return;
      }
    }
  }

  if (heal) {
    for (let i = 0; i < heal; i++) {
      if (!stateCopy[player].discard.length) {
        break;
      }

      const healedCard = stateCopy[player].discard.getTopCard();
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
    for (let i = 0; i < healEnemy; i++) {
      if (!stateCopy[opponent].discard.length) {
        break;
      }

      const healedCard = stateCopy[opponent].discard.getTopCard();
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
    for (let i = 0; i < damageSelf; i++) {
      const removedCard = stateCopy[player].deck.getTopCard();
      actions.push([
        actionGenerators.removeCard(stateCopy, player, 'deck', 'top'),
        actionGenerators.addCard(
          stateCopy,
          removedCard,
          player,
          'discard',
          'top'
        )
      ]);

      if (removedCard.onDiscard) {
        triggerDiscardEffect(player);
      }

      if (!stateCopy[opponent].deck.length) {
        console.log(`${player} won!`);
        actions.push([actionGenerators.setWinner(stateCopy, player)]);
        return;
      } else if (!stateCopy[opponent].deck.length) {
        console.log(`${opponent} won!`);
        actions.push([actionGenerators.setWinner(stateCopy, opponent)]);
        return;
      }
    }
  }

  if (playCopyOfCard) {
    genPlayCardActions(stateCopy, actions, {
      ...cards[playCopyOfCard],
      player: card.player
    });
  }

  if (shuffleCardCopiesIntoEnemyDeck) {
    genShuffleCardsIntoDeckActions(
      stateCopy,
      actions,
      shuffleCardCopiesIntoEnemyDeck.map(cardName => cards[cardName]),
      opponent
    );
  }

  if (shuffleCardCopiesIntoDeck) {
    genShuffleCardsIntoDeckActions(
      stateCopy,
      actions,
      shuffleCardCopiesIntoDeck.map(cardName => cards[cardName]),
      player
    );
  }

  if (customEffect) {
    customCardEffects[name](stateCopy, actions, card);
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
