import { useState } from 'react'
import { jsx } from '@emotion/core'; /** @jsx jsx */
import { connect } from 'react-redux';
import * as actions from '../../stores/actions';
import { EventModal } from '../town/EventModal';

const BattleRewardsComponent = ({
  didPlayerWin,
  winnerImage,
  battleRewardGold,
  adjustPlayerGold,
  startNewDay
}) => {
  const [page, setPage] = useState(1);

  return (
    <EventModal
      title={didPlayerWin ? 'You Win!' : 'You Lose!'}
      image={winnerImage}
      page={page}
      pages={[
        {
          text: didPlayerWin
            ? 'The enemy drops some gold.'
            : 'You are forced to retreat, but your allies manage to finish off the enemy. They take most of the loot, but maybe you can pick up what they left behind tomorrow.',
          options: [{
            name: 'Continue',
            goodText: didPlayerWin ? `Receive ${battleRewardGold} gold.` : 'Return to town.',
            onClick: () => {
              if (didPlayerWin) {
                adjustPlayerGold(battleRewardGold);
                setPage(2);
              } else {
                startNewDay();
              };
            }
          }]
        },
        {
          text: 'The enemy also dropped ',
          options: [{
            name: 'Continue',
            goodText: `Receive ${battleRewardGold} gold.`,
            onClick: () => {
              adjustPlayerGold(battleRewardGold);
              setPage(2);
            }
          }]
        }
      ]}
    />
  )
};

const mapStateToProps = (state) => ({
  didPlayerWin: state.clashPlayer.name === state.clashBattleStats.winner,
  winnerImage: state.clashBattleStats.winnerImage,
  battleRewardGold: state.clashBattleCards.battleRewardGold
});
const mapDispatchToProps = dispatch => ({
  adjustPlayerGold: payload => dispatch(actions.adjustPlayerGold(payload)),
  startNewDay: payload => dispatch(actions.startNewDay(payload))
});

export const BattleRewards = connect(mapStateToProps, mapDispatchToProps)(BattleRewardsComponent);
