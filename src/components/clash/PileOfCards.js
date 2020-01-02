import { useState, useEffect } from 'react';
import { css, jsx } from '@emotion/core'; /** @jsx jsx */
import { Image, Spacer, Filter } from '../particles';
import { colors } from '../styles';
import { Card } from './Card';

export const PileOfCards = ({ cards, renderProps }) => {
  const {
    x,
    y
  } = renderProps;

  return (
    <div>
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
    </div>
  );
};
