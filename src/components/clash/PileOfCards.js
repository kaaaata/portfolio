import { css, jsx } from '@emotion/core'; /** @jsx jsx */
import { colors } from '../styles';
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
    width: 135px;
    height: 160px;
    border: 2px solid ${themeColor};
    transform: rotate3d(1, 0, 0, 65deg);
  `;

  const cardCountContainerCss = css`
    position: absolute;
    left: ${countX}px;
    top: ${countY}px;
    width: 135px;
    height: 160px;
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
    renderProps={{ x: 150, y: 440, themeColor: colors.green, countX: 140, countY: 445 }}
  />
);

export const YourDiscard = ({ cards }) => (
  <PileOfCards
    cards={cards}
    renderProps={{ x: 395, y: 440, themeColor: colors.red, countX: 395, countY: 445 }}
  />
);

export const YourBanish = ({ cards }) => (
  <PileOfCards
    cards={cards}
    renderProps={{ x: 540, y: 440, themeColor: colors.black, countX: 545, countY: 445 }}
  />
);

export const EnemyBanish = ({ cards }) => (
  <PileOfCards
    cards={cards}
    renderProps={{ x: 50, y: 130, themeColor: colors.black, countX: 35, countY: 125 }}
  />
);

export const EnemyDiscard = ({ cards }) => (
  <PileOfCards
    cards={cards}
    renderProps={{ x: 195, y: 130, themeColor: colors.red, countX: 185, countY: 125 }}
  />
);

export const EnemyDeck = ({ cards }) => (
  <PileOfCards
    cards={cards}
    renderProps={{ x: 450, y: 130, themeColor: colors.green, countX: 455, countY: 125 }}
  />
);
