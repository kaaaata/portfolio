import React, { useState, useEffect } from 'react'; // eslint-ignore-line
import { css, jsx } from '@emotion/core'; /** @jsx jsx */
import { Image, Spacer, Filter } from '../particles';
import { colors, zIndex } from '../styles';
import { cardBodyCss, pileCardPlaceholderCss } from './cardCss';

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
    defense,
    description,
    type,
    heal,
    onDiscard
  } = cardProps;

  const {
    width = 120,
    height = 150,
    x = 0,
    y = 0,
    isInPileOfCards = false,
    shouldAnimateEntry = false,
    isBlurred = false
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

  const cardCss = css`
    position: absolute;
    left: ${x}px;
    top: ${y}px;
    border: 2px solid ${colors.grey};
    border-radius: 5px;
    transition: transform 0.1s ease-out;
    ${onClick ? `
      &:hover {
        transform: scale(1.25);
        z-index: ${zIndex.mouseEventArea5};
      }
    ` : transformCss}
    ${onClick ? 'cursor: pointer;' : ''}
    ${isBlurred ? 'filter: blur(3px);' : ''}
  `;

  useEffect(() => {
    // i have no idea why setTimeout(0) is needed here.
    // without it, the animation only works 50% of the time.
    setTimeout(() => {
      if (transformCss === animatedEntryStartingTransformCss) {
        setTransformCss(restingPositionTransformCss);
      }
    }, 0);
  });

  const cardArt = (
    <React.Fragment>
      <Spacer height={48} />
      <Image
        src={`/clash/${image}.png`}
        width={48}
        height={48}
        _css='position: absolute;'
      />
    </React.Fragment>
  );

  const attackDisplay = typeof attack === 'number' && (
    <Image
      className='attack'
      src='/clash/attack.png'
      width={20}
      height={20}
    >
      <div className='number'>{attack}</div>
    </Image>
  );

  const defenseDisplay = typeof defense === 'number' && (
    <Image
      className='defense'
      src='/clash/defense.png'
      width={20}
      height={20}
    >
      <div className='number'>{defense}</div>
    </Image>
  );

  let descriptionText = '';
  if (heal) {
    descriptionText += `Heal ${heal}. `;
  }
  descriptionText += description;

  return (
    <Image
      src='/clash/rock.png'
      width={width}
      height={height}
      onClick={onClick}
      _css={cardCss}
    >
      <Filter opacity={0.45} color={colors.black} />
      <div css={cardBodyCss}>
        <div className='name'>{name}</div>
        <div className='border' />
        <div className='image_container'>
          <Filter opacity={0.25} color={colors.white} />
          {cardArt}
          {attackDisplay}
          {defenseDisplay}
        </div>
        <div className='border' />
        <div className='description'>
          {descriptionText}
        </div>
      </div>
    </Image>
  );
};

// in a card pile, only the top two cards need to actually render.
// the others can just render as a placeholder outline.
export const PileCardPlaceholder = ({ renderProps }) => (
  <div
    css={css`
      width: 120px;
      height: 150px;
      position: absolute;
      left: ${renderProps.x}px;
      top: ${renderProps.y}px;
      border: 1px solid ${colors.grey};
      border-radius: 5px;
      transform: rotate3d(1, 0, 0, 65deg);
    `}
  />
);
