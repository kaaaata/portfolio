import { css, jsx } from '@emotion/core'; /** @jsx jsx */
import { connect } from 'react-redux';
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
  const outlineCss = css`
    position: absolute;
    left: ${x - 5}px;
    top: ${y - 5}px;
    width: 130px;
    height: 180px;
    border: 2px solid ${themeColor};
    transform: rotate3d(1, 0, 0, 65deg);
  `;

  const cardCountCss = css`
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
  `;

  return (
    <div css={css`cursor: pointer;`}>
      <div css={outlineCss} />
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
      <div css={cardCountCss}>
        <div className='count'>{cards.length}</div>
      </div>
    </div>
  );
};

// "countX", "countY" cannot be derived from "x", "y" because of perspective.
export const YourDeck = connect(state => ({ cards: state.clashBattleCards.yourDeck }))(
  ({ cards }) => (
    <PileOfCards
      cards={cards}
      x={150}
      y={385}
      themeColor={colors.green}
      countX={135}
      countY={500}
    />
  )
);

export const YourDiscard = connect(state => ({ cards: state.clashBattleCards.yourDiscard }))(
  ({ cards }) => (
    <PileOfCards
      cards={cards}
      x={695}
      y={385}
      themeColor={colors.red}
      countX={705}
      countY={500}
    />
  )
);

export const YourBanish = connect(state => ({ cards: state.clashBattleCards.yourBanish }))(
  ({ cards }) => (
    <PileOfCards
      cards={cards}
      x={835}
      y={385}
      themeColor={colors.black}
      countX={850}
      countY={500}
    />
  )
);

export const YourHand = connect(state => ({ cards: state.clashBattleCards.yourHand }))(
  ({ cards, onClick }) => cards.map((card, index) => (
    card ? (
      <Card
        key={index}
        name={card}
        x={300 + 125 * index}
        y={400}
        isInHand
        onClick={() => onClick(index)}
      />
    ) : null
  ))
);

export const EnemyBanish = connect(state => ({ cards: state.clashBattleCards.enemyBanish }))(
  ({ cards }) => (
    <PileOfCards
      cards={cards}
      x={45}
      y={45}
      themeColor={colors.black}
      countX={25}
      countY={145}
    />
  )
);

export const EnemyDiscard = connect(state => ({ cards: state.clashBattleCards.enemyDiscard }))(
  ({ cards }) => (
    <PileOfCards
      cards={cards}
      x={185}
      y={45}
      themeColor={colors.red}
      countX={170}
      countY={145}
    />
  )
);

export const EnemyDeck = connect(state => ({ cards: state.clashBattleCards.enemyDeck }))(
  ({ cards }) => (
    <PileOfCards
      cards={cards}
      x={725}
      y={45}
      themeColor={colors.green}
      countX={735}
      countY={145}
    />
  )
);

export const EnemyHand = connect(state => ({ cards: state.clashBattleCards.enemyHand }))(
  ({ cards }) => cards.map((card, index) => (
    card ? (
      <Card
        key={index}
        name={card}
        x={330 + 125 * index}
        y={45}
        isInHand
      />
    ) : null
  ))
);

export const Stack = connect(state => ({ cards: state.clashBattleCards.stack }))(
  ({ cards }) => cards.map((card, index) => (
    <Card
      key={index}
      name={card}
      x={350 + index * 15}
      y={225}
      isBlurred={cards.length >= 2 && index !== cards.length - 1}
    />
  ))
);
