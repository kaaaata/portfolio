import { css, jsx } from '@emotion/core'; /** @jsx jsx */
import { connect } from 'react-redux';
import { FlexContainer, Image } from '../particles';
import { Attributes } from './Attributes';
import { Gold } from './Gold';
import { colors } from '../styles';

const topNavCss = css`
  height: 40px;
  background: rgba(0, 0, 0, 0.8);
  padding: 0 20px;
  width: 100%;

  & > div {
    border: 1px solid red;
  }

  .left, .right {
    width: 250px;
  }

  .attributes {
    margin-left: 40px;
    width: 110px;
    font-size: 26px;
  }

  .gold {
    margin-left: 40px;
  }
`;

const energyMeterCss = css`
  position: relative;
  width: 400px;
  height: 24px;
  border: 2px solid ${colors.yellowLight};
  border-radius: 3px;
  margin-left: 3px;

  .fill {
    background: ${colors.yellowLight};
    width: 100%;
    height: 100%;
    transition: width 1s ease-out;
  }

  .energy_count {
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
    color: ${colors.white};
    text-shadow: 1px 1px 2px black;
    font-size: 16px;
  }
`;

export const TopNavComponent = ({
  player,
  energy
}) => {
  return (
    <FlexContainer
      justifyContent='space-between'
      alignItems='center'
      _css={topNavCss}
    >
      <FlexContainer className='left'>
        {player && (
          <Image
            src={`/clash/${player.image}.png`}
            width={20}
            height={35}
          />
        )}
        {player && (
          <Attributes
            attack={player.attack}
            magic={player.magic}
            defense={player.defense}
          />
        )}
      </FlexContainer>

      <FlexContainer
        className='center'
        justifyContent='center'
        alignItems='center'
      >
        <Image
          src='/clash/energy.png'
          width={30}
          height={30}
          className='energy'
        />
        <div css={energyMeterCss}>
          <div className='fill' style={{ width: `${energy}%` }} />
          <div className='energy_count'>{energy} / 100</div>
        </div>
      </FlexContainer>

      <FlexContainer className='right' justifyContent='flex-end'>
        {player && <Gold value={player.gold} />}
      </FlexContainer>
    </FlexContainer>
  );
};

const mapStateToProps = (state) => ({
  player: state.clashPlayer,
  energy: state.clashMap.energy,
});

export const TopNav = connect(mapStateToProps)(TopNavComponent);
