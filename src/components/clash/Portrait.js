import React, { useState, useEffect } from 'react'; // eslint-ignore-line
import { css, jsx } from '@emotion/core'; /** @jsx jsx */
import { Image, Spacer, Filter, FlexContainer } from '../particles';
import { colors, zIndex } from '../styles';
import { cardBodyCss } from './cardCss';

const portraitCss = (location) => css`
  position: absolute;
  left: ${location === 'top' ? 885 : 22}px;
  top: ${location === 'top' ? 60 : 435}px;

  .number {
    font-size: 36px;
    text-align: center;
    margin-top: 11px;
    text-shadow: 2px 2px 4px ${colors.black};
  }

  .shields {
    position: absolute;
    top: -30px;
    ${location === 'top' ? 'left: -15px;' : 'right: -15px;'}
    
    .number {
      margin-top: 18px;
      margin-left: -3px;
    }
  }

  .stats {
    margin: -3px -5px 0 -5px;

    .attack {
      .number {
        margin-left: -7px;
      }
    }

    .magic {
      .number {
        margin-left: -2px;
      }
    }

    .defense {
      .number {
        margin-left: -3px;
      }
    }
  }
`;

const PortraitComponent = ({ player, location }) => {
  const portrait = (
    <Image
      src={`/clash/portraits/${player}.png`}
      width={96}
      height={96}
    />
  );

  const attackDisplay = (
    <Image
      className='attack'
      src='/clash/attack.png'
      width={30}
      height={30}
    >
      <div className='number'>2</div>
    </Image>
  );

  const magicDisplay = (
    <Image
      className='magic'
      src='/clash/magic.png'
      width={30}
      height={30}
    >
      <div className='number'>0</div>
    </Image>
  );

  const defenseDisplay = (
    <Image
      className='defense'
      src='/clash/defense.png'
      width={30}
      height={30}
    >
      <div className='number'>1</div>
    </Image>
  );

  const shieldsDisplay = (
    <Image
      className='shields'
      src='/clash/defense.png'
      width={72}
      height={72}
    >
      <div className='number'>5</div>
    </Image>
  );

  return (
    <div css={portraitCss(location)}>
      {portrait}
      {shieldsDisplay}
      <FlexContainer
        className='stats'
        justifyContent='space-between'
      >
        {attackDisplay}
        {magicDisplay}
        {defenseDisplay}
      </FlexContainer>
    </div>
  );
};

export const Portrait = PortraitComponent;
