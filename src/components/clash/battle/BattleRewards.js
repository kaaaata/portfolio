import { useState } from 'react'
import { jsx } from '@emotion/core'; /** @jsx jsx */
import { connect } from 'react-redux';
import * as actions from '../../stores/actions';
import { EventModal } from '../town/EventModal';

const BattleRewardsComponent = ({
  won,
  winnerImage,
  battleRewardGold,
  adjustPlayerGold
}) => {
  const [page, setPage] = useState(1);
  console.log({
    won,
    winnerImage,
  })
  return (
    <EventModal
      title={won ? 'You Win!' : 'You Lose!'}
      image={winnerImage}
      page={page}
      pages={[
        {
          text: 'You find some gold.',
          options: [{
            name: 'Continue',
            goodText: `Receive ${battleRewardGold} gold.`,
            onClick: () => {
              adjustPlayerGold(battleRewardGold);
              setPage(2);
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
  won: state.clashPlayer.name === state.clashBattleStats.winner,
  winnerImage: state.clashBattleStats.winnerImage,
  battleRewardGold: state.clashBattleCards.battleRewardGold
});
const mapDispatchToProps = dispatch => ({
  adjustPlayerGold: payload => dispatch(actions.adjustPlayerGold(payload))
});

export const BattleRewards = connect(mapStateToProps, mapDispatchToProps)(BattleRewardsComponent);
