import React, { useState } from 'react'
import { jsx } from '@emotion/core'; /** @jsx jsx */
import { connect } from 'react-redux';
import * as actions from '../../stores/actions';
import { EventModal } from '../town/EventModal';
import { CardLootModal } from '../modals/CardLootModal';
import { Text } from '../Text';

const BattleRewardsComponent = ({
  didPlayerWin,
  winnerImage,
  battleRewardCards,
  battleRewardGold,
  adjustPlayerGold,
  startNewDay
}) => {
  const [page, setPage] = useState(1);
  const [isCardLootModalOpen, setIsCardLootModalOpen] = useState(false);

  return isCardLootModalOpen ? (
    <CardLootModal
      title="Take up to 2 cards from the enemy's deck"
      maxCardsToTake={2}
      cards={battleRewardCards}
      closeModal={startNewDay}
    />
  ) : (
    <EventModal
      title={didPlayerWin ? 'Victory!' : 'Defeat!'}
      image={winnerImage}
      page={page}
      pages={[
        {
          text: didPlayerWin
            ? 'The enemy drops some gold.'
            : (
              <React.Fragment>
                <Text type='paragraph'>
                  You are forced to retreat!
                  <br /><br />
                  Maybe you can recover some loot tomorrow.
                </Text>
              </React.Fragment>
            ),
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
          text: 'As the enemy flees, they drop some cards from their deck!',
          options: [{
            name: 'Continue',
            goodText: "Take up to 2 cards from the enemy's deck.",
            onClick: () => setIsCardLootModalOpen(true)
          }]
        }
      ]}
    />
  )
};

const mapStateToProps = (state) => ({
  didPlayerWin: state.clashPlayer.name === state.clashBattleStats.winner,
  winnerImage: state.clashBattleStats.winnerImage,
  battleRewardGold: state.clashBattleCards.battleRewardGold,
  battleRewardCards: state.clashBattleCards.battleRewardCards
});
const mapDispatchToProps = dispatch => ({
  adjustPlayerGold: payload => dispatch(actions.adjustPlayerGold(payload)),
  startNewDay: payload => dispatch(actions.startNewDay(payload))
});

export const BattleRewards = connect(mapStateToProps, mapDispatchToProps)(BattleRewardsComponent);
