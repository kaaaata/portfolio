import { useState } from 'react';
import { css, jsx } from '@emotion/core'; /** @jsx jsx */
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

      <Card cardProps={card} renderProps={{ x: 300, y: 5 }} />

      <div style={{ perspective: '1600px' }}>
        <EnemyDeck cards={cards} />
        <EnemyDiscard cards={cards} />
        <EnemyBanish cards={cards} />
      </div>

      <Card cardProps={card} renderProps={{ x: 150, y: 290 }} />
      <Card cardProps={card} renderProps={{ x: 300, y: 290 }} />
      <Card cardProps={card} renderProps={{ x: 450, y: 290 }} />

      <div style={{ perspective: '1600px' }}>
        <YourDeck cards={yourDeck} />
        <YourDiscard cards={cards} />
        <YourBanish cards={cards} />
      </div>


    </section>
  );
};
