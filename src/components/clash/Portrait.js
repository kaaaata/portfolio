import { css, jsx } from '@emotion/core'; /** @jsx jsx */
import { connect } from 'react-redux';
import { Image } from '../particles';
import { Attributes } from './Attributes';

const portraitCss = (location) => css`
  position: absolute;
  left: ${location === 'top' ? 885 : 20}px;
  top: ${location === 'top' ? 48 : 405}px;

  .shields {
    position: absolute;
    top: -30px;
    ${location === 'top' ? 'left: -15px;' : 'right: -15px;'}
    
    .number {
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
  shields
}) => {
  const portrait = (
    <Image
      src={`/clash/${image}.png`}
      width={100}
      height={125}
    />
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
      {shieldsDisplay}
      <Attributes
        attack={temporaryStats.attack + permanentStats.attack}
        magic={temporaryStats.magic + permanentStats.magic}
        defense={temporaryStats.defense + permanentStats.defense}
      />
    </div>
  );
};

const mapStateToPropsYou = (state) => ({
  name: state.clashBattleStats.yourName,
  image: state.clashBattleStats.yourImage,
  temporaryStats: state.clashBattleStats.yourTemporaryStats,
  permanentStats: state.clashBattleStats.yourPermanentStats,
  shields: state.clashBattleStats.yourShields,
  location: 'bottom'
});
const mapStateToPropsEnemy = (state) => ({
  name: state.clashBattleStats.enemyName,
  image: state.clashBattleStats.enemyImage,
  temporaryStats: state.clashBattleStats.enemyTemporaryStats,
  permanentStats: state.clashBattleStats.enemyPermanentStats,
  shields: state.clashBattleStats.enemyShields,
  location: 'top'
});

export const YourPortrait = connect(mapStateToPropsYou)(Portrait);
export const EnemyPortrait = connect(mapStateToPropsEnemy)(Portrait);
