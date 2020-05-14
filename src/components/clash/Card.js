import React, { useState, useEffect } from 'react'; // eslint-ignore-line
import { css, jsx } from '@emotion/core'; /** @jsx jsx */
import { cards } from './cards/cards';
import { Image, Spacer, FlexContainer } from '../particles';
import { colors, zIndex } from '../styles';
import { rarityColors } from './cards/rarity';
import { cardBodyCss } from './cardBodyCss';

export const Card = ({
  name,
  width = 120,
  height = 170,
  x = 0,
  y = 0,
  isFaceDown,
  isInPileOfCards = false,
  shouldAnimateEntry = false,
  isBlurred = false,
  _css = '',
  onClick
}) => {
  const {
    image,
    rarity,
    attack,
    defense,
    type,
    description
  } = cards[name];

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
    ${x && y ? `
      position: absolute;
      left: ${x}px;
      top: ${y}px;
    ` : 'position: relative;'}
    user-select: none;
    border: 2px solid ${isFaceDown ? colors.steel : colors[rarityColors[rarity]]};
    border-radius: 5px;
    ${isInPileOfCards ? transformCss : `
      box-shadow: 2px 2px 3px ${colors.black};

      &:hover {
        z-index: ${zIndex.mouseEventArea5};
        ${onClick ? 'transform: scale(1.25);' : transformCss}
      }
    `}
    transition: transform ${onClick ? '0.1s' : '0.2s'} ease-out;
    cursor: ${onClick ? 'pointer' : 'default'};
    ${isBlurred ? 'filter: blur(3px);' : ''}

    ${_css}
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
      <Spacer height={70} />
      <Image
        src={`/clash/${image}.png`}
        width='100%'
        height={70}
        size='contain'
        _css='position: absolute;'
      />
    </React.Fragment>
  );

  const attackDisplay = type !== 'potion' && (
    <Image
      className='attack'
      src={`/clash/${type}.png`}
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

  const cardTypeFlair = (
    <Image
      className='type_flair'
      src={`/clash/${type === 'potion' ? 'healing_potion' : type}.png`}
      width={12}
      height={12}
    />
  );

  return isFaceDown ? (
    <div
      css={css`
        width: ${width}px;
        height: ${height}px;
        background: ${colors.blackMediumDark};
        ${cardCss}
      `}
      onClick={onClick}
      className='card'
    >
      <Image
        src='/clash/card_back.png'
        width={width}
        height={height}
        _css={css`
          margin: -2px 0 0 -2px;
          border-radius: 5px;
        `}
      />
    </div>
  ) : (
    <Image
      src='/clash/rock.png'
      width={width}
      height={height}
      onClick={onClick}
      _css={cardCss}
      rgbaFilter='rgba(0, 0, 0, 0.45)'
      className='card'
    >
      <div css={cardBodyCss(colors[rarityColors[rarity]])}>
        <div className='name'>{name}</div>
        <div className='border' />
        <div className='image_container'>
          {cardArt}
          {attackDisplay}
          {defenseDisplay}
        </div>
        <div className='border' />
        <FlexContainer
          className='flair'
          justifyContent='space-between'
          alignItems='center'
        >
          <div>
            {type[0].toUpperCase()}{type.slice(1)}{' - '}
            <span className='rarity'>
              {rarity[0].toUpperCase()}{rarity.slice(1)}
            </span>
          </div>
          {cardTypeFlair}
        </FlexContainer>
        <div className='border' />
        <div className='description'>{description}</div>
      </div>
    </Image>
  );
};

// refactor this eventually to show the card back
export const PileCardPlaceholder = ({ x, y, isInvisible }) => (
  <div
    css={css`
      width: 120px;
      height: 170px;
      position: absolute;
      left: ${x}px;
      top: ${y}px;
      border: 1px solid ${colors.white};
      border-radius: 5px;
      transform: rotate3d(1, 0, 0, 65deg);
    `}
  />
);
