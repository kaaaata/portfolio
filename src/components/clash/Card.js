import { useState, useEffect } from 'react';
import { css, jsx } from '@emotion/core'; /** @jsx jsx */
import { Image, Spacer, Filter } from '../particles';
import { colors } from '../styles';

const cardCss = (x, y, transformCss) => css`
  position: absolute;
  left: ${x}px;
  top: ${y}px;
  border: 2px solid ${colors.grey};
  border-radius: 5px;
  transition: transform 0.1s ease-out;
  ${transformCss}
`;

const cardBodyCss = css`
  position: absolute;
  width: 100%;
  height: 100%;

  .name {
    text-align: center;
    padding: 5px;
  }

  .image {
    display: flex;
    justify-content: center;
    padding: 15px;
  }

  .border {
    height: 2px;
    background: ${colors.grey};
  }

  .description {
    padding: 5px;
  }
`;

export const Card = ({
  cardProps,
  renderProps,
  onClick
}) => {
  const {
    name,
    image,
    rarity,
    attack,
    defense
  } = cardProps;

  const {
    width = 140,
    height = 160,
    x = 0,
    y = 0,
    isInPileOfCards,
    shouldAnimateEntry
  } = renderProps;

  const animatedEntryStartingTransformCss = 'transform: rotate3d(0, 1, 0, 65deg);';
  const restingPositionTransformCss = isInPileOfCards
    ? 'transform: rotate3d(1, 0, 0, 65deg);'
    : '';

  const [transformCss, setTransformCss] = useState(
    shouldAnimateEntry
      ? animatedEntryStartingTransformCss
      : restingPositionTransformCss
  );

  useEffect(() => {
    // i have no idea why setTimeout(0) is needed here.
    // without it, the animation only works 50% of the time.
    setTimeout(() => {
      if (transformCss === animatedEntryStartingTransformCss) {
        setTransformCss(restingPositionTransformCss);
      }
    }, 0);
  });

  return (
    <Image
      src='/clash/dirt.png'
      width={width}
      height={height}
      onClick={onClick}
      _css={cardCss(x, y, transformCss)}
    >
      <Filter
        opacity={0.4}
        color={colors.black}
      />
      <div css={cardBodyCss}>
        <div className='name'>
          {name}
        </div>
        <div className='border' />
        <div className='image'>
          <Image
            src={`/clash/${image}.png`}
            width={48}
            height={48}
          />
        </div>
        <div className='border' />
        <div className='description'>
          +1 Strength
        </div>
      </div>
    </Image>
  );
};
