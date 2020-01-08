import { css, jsx } from '@emotion/core'; /** @jsx jsx */
import { connect } from 'react-redux';
import { Image, FlexContainer } from '../particles';
import { colors } from '../styles';

const portraitCss = (location) => css`
  position: absolute;
  left: ${location === 'top' ? 885 : 20}px;
  top: ${location === 'top' ? 48 : 405}px;

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

  const attackDisplay = (
    <Image
      className='attack'
      src='/clash/attack.png'
      width={30}
      height={30}
    >
      <div className='number'>
        {temporaryStats.attack + permanentStats.attack}
      </div>
    </Image>
  );

  const magicDisplay = (
    <Image
      className='magic'
      src='/clash/magic.png'
      width={30}
      height={30}
    >
      <div className='number'>
        {temporaryStats.magic + permanentStats.magic}
      </div>
    </Image>
  );

  const defenseDisplay = (
    <Image
      className='defense'
      src='/clash/defense.png'
      width={30}
      height={30}
    >
      <div className='number'>
        {temporaryStats.defense + permanentStats.defense}
      </div>
    </Image>
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

const mapStateToPropsYou = state => ({
  name: state.clashBattleStats.yourName,
  image: state.clashBattleStats.yourImage,
  temporaryStats: state.clashBattleStats.yourTemporaryStats,
  permanentStats: state.clashBattleStats.yourPermanentStats,
  shields: state.clashBattleStats.yourShields,
  location: 'bottom'
});
const mapStateToPropsEnemy = state => ({
  name: state.clashBattleStats.enemyName,
  image: state.clashBattleStats.enemyImage,
  temporaryStats: state.clashBattleStats.enemyTemporaryStats,
  permanentStats: state.clashBattleStats.enemyPermanentStats,
  shields: state.clashBattleStats.enemyShields,
  location: 'top'
});

export const YourPortrait = connect(mapStateToPropsYou)(Portrait);
export const EnemyPortrait = connect(mapStateToPropsEnemy)(Portrait);
