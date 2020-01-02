import { useState, useEffect, useRef } from 'react';
import { css, jsx } from '@emotion/core'; /** @jsx jsx */
import useInterval from '../utils/useInterval';
import deckUtils from './deckUtils';
import { Spacer } from '../particles';
import { Card } from './Card';
import {
  YourDeck,
  YourDiscard,
  YourBanish,
  EnemyDeck,
  EnemyDiscard,
  EnemyBanish
} from './PileOfCards';
import { cards } from './cards';

const clashCss = css`
  width: 800px;
  height: 600px;
  position: relative;
  background: #B2967D;
`;

export const Clash = () => {
  const [yourDeck, setYourDeck] = useState([
    ...Array(15).fill(cards['Strike']).map(card => ({ ...card, player: 'you' })),
    { ...cards['Healing Potion'], player: 'you' }
  ]);
  const [yourDiscard, setYourDiscard] = useState([
    ...Array(3).fill(cards['Strike']).map(card => ({ ...card, player: 'you' })),
  ]);
  const [yourBanish, setYourBanish] = useState([]);
  const [enemyDeck, setEnemyDeck] = useState([
    ...Array(13).fill(cards['Strike']),
    cards['Healing Potion'],
    ...Array(3).fill(cards['Strike'])
  ].map(card => ({ ...card, player: 'opponent' })));
  const [enemyDiscard, setEnemyDiscard] = useState([]);
  const [enemyBanish, setEnemyBanish] = useState([]);
  const [yourHand, setYourHand] = useState([]);

  const [isPlayersTurn, setIsPlayersTurn] = useState(true);
  const [isAnimating, setIsAnimating] = useState(false);

  let interval;

  useEffect(() => {
    setYourHand(yourDeck.slice(yourDeck.length - 3, yourDeck.length));
    setYourDeck(yourDeck.slice(0, yourDeck.length - 3));
  }, []);

  const playCard = (card, isPlayersTurn) => {
    if (isAnimating || !isPlayersTurn) {
      return;
    } else {
      setIsAnimating(true);
    }

    console.log('playing card', card);

    // create copies of state
    let playerDeck = [...(card.player === 'you' ? yourDeck : enemyDeck)];
    let playerDiscard = [...(card.player === 'you' ? yourDiscard : enemyDiscard)];
    let playerBanish = [...(card.player === 'you' ? yourBanish : enemyBanish)];
    let opponentDeck = [...(card.player === 'you' ? enemyDeck : yourDeck)];
    let opponentDiscard = [...(card.player === 'you' ? enemyDiscard : yourDiscard)];
    let opponentBanish = [...(card.player === 'you' ? enemyBanish : yourBanish)];

    // define relative setters
    let setPlayerDeck = card.player === 'you' ? setYourDeck : setEnemyDeck;
    let setPlayerDiscard = card.player === 'you' ? setYourDiscard : setEnemyDiscard;
    let setPlayerBanish = card.player === 'you' ? setYourBanish : setEnemyBanish;
    let setOpponentDeck = card.player === 'you' ? setEnemyDeck : setYourDeck;
    let setOpponentDiscard = card.player === 'you' ? setEnemyDiscard : setYourDiscard;
    let setOpponentBanish = card.player === 'you' ? setEnemyBanish : setYourBanish;

    const actions = [];

    const rotatePerspective = () => {
      let temp;
      temp = opponentDeck; opponentDeck = playerDeck; playerDeck = temp;
      temp = opponentDiscard; opponentDiscard = playerDiscard; playerDiscard = temp;
      temp = opponentBanish; opponentBanish = playerBanish; playerBanish = temp;
      temp = setOpponentDeck; setOpponentDeck = setPlayerDeck; setPlayerDeck = temp;
      temp = setOpponentDiscard; setOpponentDiscard = setPlayerDiscard; setPlayerDiscard = temp;
      temp = setOpponentBanish; setOpponentBanish = setPlayerBanish; setPlayerBanish = temp;
    };

    const generateActionsForCard = (card) => {
      // attack
      const attack = card.attack;
      if (attack) {
        for (let i = 0; i < attack; i++) {
          if (!opponentDeck.length) {
            return;
          }

          const removedCard = deckUtils.getTopCard(opponentDeck);
          opponentDeck = deckUtils.removeTopCard(opponentDeck);
          opponentDiscard = deckUtils.addCardToTop(opponentDiscard, removedCard);

          actions.push([
            {
              pile: opponentDeck,
              setter: setOpponentDeck,
              message: 'hitting opponent for 1 (deck -1)'
            },
            {
              pile: opponentDiscard,
              setter: setOpponentDiscard,
              message: 'hitting opponent for 1 (discard +1)'
            }
          ]);
          console.log('removed card', removedCard);
          if (removedCard.onDiscard) {
            const mockCard = {
              ...removedCard,
              ...removedCard.onDiscard,
              onDiscard: null
            };

            rotatePerspective();
            generateActionsForCard(mockCard);
            rotatePerspective();
          }
        }
      }

      // heal
      const { heal } = card;
      if (heal) {
        for (let i = 0; i < heal; i++) {
          if (!playerDiscard.length) {
            return;
          }

          const healedCard = deckUtils.getTopCard(playerDiscard);
          playerDeck = deckUtils.addCardToTop(playerDeck, healedCard);
          playerDiscard = deckUtils.removeTopCard(playerDiscard);

          actions.push([
            {
              pile: playerDeck,
              setter: setPlayerDeck,
              message: 'healing opponent for 1 (deck -1)'
            },
            {
              pile: playerDiscard,
              setter: setPlayerDiscard,
              message: 'hitting opponent for 1 (discard +1)'
            }
          ]);
        }
      }
    };

    generateActionsForCard(card);
    console.log('actions=', actions);

    if (!actions.length) {
      return;
    }

    let i = 0;
    interval = setInterval(() => {
      actions[i].forEach(action => {
        const { pile, setter, message } = action;
        console.log(message);
        setter(pile);
      });

      if (++i === actions.length) {
        setIsAnimating(false);
        clearInterval(interval);
      }
    }, 500);
  };

  return (
    <section css={clashCss}>
      <Card cardProps={cards['Strike']} renderProps={{ x: 300, y: 5 }} />

      <div style={{ perspective: '1600px' }}>
        <EnemyDeck cards={enemyDeck} />
        <EnemyDiscard cards={enemyDiscard} />
        <EnemyBanish cards={enemyBanish} />
      </div>

      {yourHand.map((card, index) => (
        <Card
          key={index}
          cardProps={card}
          renderProps={{ x: 150 * (index + 1), y: 290 }}
          onClick={() => playCard(card, isPlayersTurn)}
        />
      ))}

      <div style={{ perspective: '1600px' }}>
        <YourDeck cards={yourDeck} />
        <YourDiscard cards={yourDiscard} />
        <YourBanish cards={yourBanish} />
      </div>


    </section>
  );
};
