import { css, jsx } from '@emotion/core'; /** @jsx jsx */
import { useSelector } from 'react-redux';
import { colors } from '../styles';
import { Card, PileCardPlaceholder } from './Card';

const PileOfCards = ({
  cards,
  x,
  y,
  themeColor,
  countX,
  countY
}) => {
  const pileOfCardsCss = css`
    cursor: pointer;

    .outline {
      position: absolute;
      left: ${x - 5}px;
      top: ${y - 5}px;
      width: 130px;
      height: 180px;
      border: 2px solid ${themeColor};
      transform: rotate3d(1, 0, 0, 65deg);
    }

    .card_count {
      position: absolute;
      left: ${countX}px;
      top: ${countY}px;
      width: 130px;
      text-align: center;
  
      .count {
        color: ${themeColor};
        font-size: 60px;
        text-shadow: 2px 2px 6px ${colors.black};
      }
    }
  `;

  return (
    <div css={pileOfCardsCss}>
      <div className='outline' />
      {cards.map((card, index) => (
        (index >= cards.length - 2) ? (
          <Card
            key={index}
            name={card}
            x={x}
            y={y - index}
            isInPileOfCards
            shouldAnimateEntry={index === cards.length - 1}
          />
        ) : (
          <PileCardPlaceholder
            key={index}
            x={x}
            y={y - index}
          />
        )
      ))}
      <div className='card_count'>
        <div className='count'>{cards.length}</div>
      </div>
    </div>
  );
};

// "countX", "countY" cannot be derived from "x", "y" because of perspective.
export const YourDeck = () => {
  const { cards } = useSelector(state => ({
    cards: state.clashBattleCards.yourDeck,
  }));

  return (
    <PileOfCards
      cards={cards}
      x={150}
      y={385}
      themeColor={colors.green}
      countX={135}
      countY={500}
    />
  );
};

export const YourDiscard = () => {
  const { cards } = useSelector(state => ({
    cards: state.clashBattleCards.yourDiscard,
  }));

  return (
    <PileOfCards
      cards={cards}
      x={695}
      y={385}
      themeColor={colors.red}
      countX={705}
      countY={500}
    />
  );
};

export const YourBanish = () => {
  const { cards } = useSelector(state => ({
    cards: state.clashBattleCards.yourBanish,
  }));

  return (
    <PileOfCards
      cards={cards}
      x={835}
      y={385}
      themeColor={colors.black}
      countX={850}
      countY={500}
    />
  );
};

export const YourHand = ({ onClick }) => {
  const { cards, winner } = useSelector(state => ({
    cards: state.clashBattleCards.yourHand,
    winner: state.clashBattleStats.winner
  }));

  return cards.map((card, index) => (
    card ? (
      <Card
        key={index}
        name={card}
        x={300 + 125 * index}
        y={400}
        onClick={() => {
          if (!winner) {
            onClick(index);
          }
        }}
      />
    ) : null
  ));
};

export const EnemyBanish = () => {
  const { cards } = useSelector(state => ({
    cards: state.clashBattleCards.enemyBanish,
  }));

  return (
    <PileOfCards
      cards={cards}
      x={45}
      y={45}
      themeColor={colors.black}
      countX={25}
      countY={145}
    />
  );
};

export const EnemyDiscard = () => {
  const { cards } = useSelector(state => ({
    cards: state.clashBattleCards.enemyDiscard,
  }));

  return (
    <PileOfCards
      cards={cards}
      x={185}
      y={45}
      themeColor={colors.red}
      countX={170}
      countY={145}
    />
  );
};

export const EnemyDeck = () => {
  const { cards } = useSelector(state => ({
    cards: state.clashBattleCards.enemyDeck,
  }));

  return (
    <PileOfCards
      cards={cards}
      x={725}
      y={45}
      themeColor={colors.green}
      countX={735}
      countY={145}
    />
  );
};

export const EnemyHand = () => {
  const { cards } = useSelector(state => ({
    cards: state.clashBattleCards.enemyHand,
  }));

  return cards.map((card, index) => (
    card ? (
      <Card
        key={index}
        name={card}
        x={330 + 125 * index}
        y={45}
      />
    ) : null
  ));
};

export const Stack = () => {
  const { cards } = useSelector(state => ({
    cards: state.clashBattleCards.stack,
  }));

  return cards.map((card, index) => (
    <Card
      key={index}
      name={card}
      x={350 + index * 15}
      y={222}
      isBlurred={cards.length >= 2 && index !== cards.length - 1}
    />
  ));
};
