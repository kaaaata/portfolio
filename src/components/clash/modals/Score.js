import { css, jsx } from '@emotion/core'; /** @jsx jsx */
import { connect } from 'react-redux';
import * as actions from '../../stores/actions';
import { Modal } from './Modal';
import { Gold } from '../Gold';
import { FlexContainer } from '../../particles';

const ScoreComponent = ({
  player,
  winner,
  setPlayerProperties,
  goToNextScene
}) => {
  const bonuses = {
    'Base Gold': 100
  };

  if (player.name === winner) {
    bonuses['Win Bonus'] = 25
  }

  const totalGoldEarned = Object.values(bonuses).reduce((a, b) => a + b);

  return (
    <Modal
      title='Rewards'
      continueOptions={[]}
      // continueOnClick={() => {
      //   setPlayerProperties({
      //     gold: player.gold + totalGoldEarned
      //   });

      //   // goToNextScene();
      // }}
    >
      {Object.keys(bonuses).map(key => (
        <FlexContainer key={key} alignItems='center'>
          <div>{key}&nbsp;</div>
          <Gold value={bonuses[key]} />
        </FlexContainer>
      ))}
      <hr style={{ width: '300px', margin: '20px' }} />
      <FlexContainer alignItems='center'>
        <div>Total Gold Earned&nbsp;</div>
        <Gold value={totalGoldEarned} />
      </FlexContainer>
    </Modal>
  );
};

const mapStateToProps = (state) => ({
  player: state.clashPlayer,
  winner: state.clashBattleStats.winner
});
const mapDispatchToProps = (dispatch) => ({
  setPlayerProperties: payload => dispatch(actions.setPlayerProperties(payload))
});

export const Score = connect(mapStateToProps, mapDispatchToProps)(ScoreComponent);
