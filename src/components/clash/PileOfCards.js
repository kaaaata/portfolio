import { useState, useEffect } from 'react';
import { css, jsx } from '@emotion/core'; /** @jsx jsx */
import { Image, Spacer, Filter, FlexContainer } from '../particles';
import { colors, zIndex } from '../styles';
import { Card } from './Card';

const PileOfCards = ({ cards, renderProps }) => {
  const {
    x,
    y,
    themeColor,
    countX,
    countY
  } = renderProps;

  const outlineCss = css`
    position: absolute;
    left: ${x - 5}px;
    top: ${y - 5}px;
    width: 150px;
    height: 170px;
    border: 2px solid ${themeColor};
    transform: rotate3d(1, 0, 0, 65deg);
  `;

  const cardCountContainerCss = css`
    position: absolute;
    left: ${countX}px;
    top: ${countY}px;
    width: 150px;
    height: 170px;
    display: flex;
    justify-content: center;
    align-items: flex-end;

    .card_count {
      color: ${themeColor};
      font-size: 60px;
      text-shadow: 2px 2px 6px ${colors.black};
    }
  `;

  return (
    <div>
      <div css={outlineCss} />
      {cards.map((card, index) => (
        <Card
          cardProps={card}
          renderProps={{
            x,
            y: y - index * 2,
            isInPileOfCards: true,
            shouldAnimateEntry: index === cards.length - 1
          }}
          key={index}
        />
      ))}
      <div css={cardCountContainerCss}>
        <div className='card_count'>
          {cards.length}
        </div>
      </div>
    </div>
  );
};

// "countX", and "countY" cannot be derived from "x" because of perspective.

export const YourDeck = ({ cards }) => (
  <PileOfCards
    cards={cards}
    renderProps={{ x: 150, y: 420, themeColor: colors.green, countX: 140, countY: 420 }}
  />
);

export const YourDiscard = ({ cards }) => (
  <PileOfCards
    cards={cards}
    renderProps={{ x: 380, y: 420, themeColor: colors.red, countX: 385, countY: 420 }}
  />
);

export const YourBanish = ({ cards }) => (
  <PileOfCards
    cards={cards}
    renderProps={{ x: 540, y: 420, themeColor: colors.black, countX: 550, countY: 420 }}
  />
);

export const EnemyBanish = ({ cards }) => (
  <PileOfCards
    cards={cards}
    renderProps={{ x: 50, y: 125, themeColor: colors.black, countX: 35, countY: 110 }}
  />
);

export const EnemyDiscard = ({ cards }) => (
  <PileOfCards
    cards={cards}
    renderProps={{ x: 210, y: 125, themeColor: colors.red, countX: 200, countY: 110 }}
  />
);

export const EnemyDeck = ({ cards }) => (
  <PileOfCards
    cards={cards}
    renderProps={{ x: 430, y: 125, themeColor: colors.green, countX: 435, countY: 110 }}
  />
);
