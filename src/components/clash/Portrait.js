import { css, jsx } from '@emotion/core'; /** @jsx jsx */
import { connect } from 'react-redux';
import { Image } from '../particles';
import { Attributes } from './Attributes';
import { colors } from '../styles';
import { useState, useEffect } from 'react';

const portraitCss = (location) => css`
  position: absolute;
  left: ${location === 'top' ? 885 : 20}px;
  top: ${location === 'top' ? 48 : 405}px;

  .portrait {
    position: absolute;
    transition: transform 2s ease-in, width 2s ease-in, height 2s ease-in;

    &.dead {
      transform: rotate(1260deg);
      width: 0px;
      height: 0px;
    }
  }

  .portrait_placeholder {
    width: 100px;
    height: 125px;
  }

  .shields {
    position: absolute;
    top: -30px;
    ${location === 'top' ? 'left: -15px;' : 'right: -15px;'}
    
    .number {
      font-size: 36px;
      text-align: center;
      text-shadow: 2px 2px 4px ${colors.black};
      color: black;
      margin-top: 18px;
      margin-left: -3px;
    }
  }

  .attributes {
    margin: -3px -5px 0 -5px;
  }
`;

const Portrait = ({
  location,
  image,
  temporaryStats,
  permanentStats,
  shields,
  isDead
}) => {
  const [portraitClassName, setPortraitClassName] = useState('portrait');

  useEffect(() => {
    if (isDead) {
      setPortraitClassName('portrait dead');
    }
  }, [isDead]);

  const portrait = (
    <Image
      src={`/clash/${image}.png`}
      width={100}
      height={125}
      className={portraitClassName}
    />
  );

  // hold the place during the spinny death animation
  const portraitPlaceholder = (
    <div className='portrait_placeholder' />
  );

  const shieldsDisplay = !!shields && (
    <Image
      className='shields'
      src='/clash/defense.png'
      width={72}
      height={72}
    >
      <div className='number'>{shields}</div>
    </Image>
  );

  return (
    <div css={portraitCss(location)}>
      {portrait}
      {portraitPlaceholder}
      {shieldsDisplay}
      <Attributes
        attack={temporaryStats.attack + permanentStats.attack}
        magic={temporaryStats.magic + permanentStats.magic}
        defense={temporaryStats.defense + permanentStats.defense}
      />
    </div>
  );
};

const mapStateToPropsYourPortrait = (state) => ({
  name: state.clashBattleStats.yourName,
  image: state.clashBattleStats.yourImage,
  temporaryStats: state.clashBattleStats.yourTemporaryStats,
  permanentStats: state.clashBattleStats.yourPermanentStats,
  shields: state.clashBattleStats.yourShields,
  location: 'bottom',
  isDead: state.clashBattleStats.winner === state.clashBattleStats.enemyName
});
const mapStateToPropsEnemyPortrait = (state) => ({
  name: state.clashBattleStats.enemyName,
  image: state.clashBattleStats.enemyImage,
  temporaryStats: state.clashBattleStats.enemyTemporaryStats,
  permanentStats: state.clashBattleStats.enemyPermanentStats,
  shields: state.clashBattleStats.enemyShields,
  location: 'top',
  isDead: state.clashBattleStats.winner === state.clashBattleStats.yourName
});

export const YourPortrait = connect(mapStateToPropsYourPortrait)(Portrait);
export const EnemyPortrait = connect(mapStateToPropsEnemyPortrait)(Portrait);
