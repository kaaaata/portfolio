import { useState } from 'react';
import { css, jsx } from '@emotion/core'; /** @jsx jsx */
import { Spacer } from '../particles';
import { Card } from './Card';
import { PileOfCards } from './PileOfCards';

const card = {
  name: 'Strike',
  image: 'sword',
  rarity: 'common',
  attack: 1,
  defense: 1,
};

const cards = [card, card, card, card, card, card, card];

const clashCss = css`
  width: 800px;
  height: 600px;
  position: relative;
  background: #B2967D;
`;

export const Clash = () => {
  const [yourDeck, setYourDeck] = useState(cards);

  return (
    <section css={clashCss}>
      <button type='button' onClick={() => setYourDeck([...yourDeck, card])}>
        Add Card
      </button>

      <div style={{ perspective: '1600px' }}>
        <PileOfCards cards={cards} renderProps={{ x: 50, y: 100 }} />
        <PileOfCards cards={cards} renderProps={{ x: 210, y: 100 }} />
        <PileOfCards cards={cards} renderProps={{ x: 425, y: 100 }} />
      </div>

      <Card cardProps={card} renderProps={{ x: 150, y: 255 }} />
      <Card cardProps={card} renderProps={{ x: 310, y: 255 }} />
      <Card cardProps={card} renderProps={{ x: 470, y: 255 }} />

      <div style={{ perspective: '1600px' }}>
        <PileOfCards cards={yourDeck} renderProps={{ x: 150, y: 425 }} />
        <PileOfCards cards={cards} renderProps={{ x: 375, y: 425 }} />
        <PileOfCards cards={cards} renderProps={{ x: 535, y: 425 }} />
      </div>


    </section>
  );
};
