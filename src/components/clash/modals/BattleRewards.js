import { useState } from 'react';
import { css, jsx } from '@emotion/core'; /** @jsx jsx */
import { connect } from 'react-redux';
import * as actions from '../../stores/actions';
import { Modal } from './Modal';
import { Gold } from '../Gold';
import { FlexContainer, Spacer } from '../../particles';
import { Card } from '../Card';
import { colors } from '../../styles';

const cardsLootedCountCss = (isRed) => css`
  color: ${isRed ? colors.red : colors.green};
`;

const rowOfCardsCss = css`
  border-radius: 5px;

  .card_container {
    margin-right: 20px;

    &:last-child {
      margin-right: 0;
    }

    &.hidden {
      visibility: hidden;
    }
  }
`;

const BattleRewardsComponent = ({
  player,
  winner,
  enemyLevel,
  battleRewardCards,
  battleRewardGold,
  setPlayerProperties,
  setScene
}) => {
  const [cardsLootedIndices, setCardsLootedIndices] = useState('');
  const cardsLootedCount = cardsLootedIndices.length;
  const win = player === winner;
  const goldReward = win ? battleRewardGold : 10;

  const rowOfCards = (
    <FlexContainer
      justifyContent='center'
      css={rowOfCardsCss}
    >
      {battleRewardCards.map((i, index) => (
        <div
          key={index}
          className={`card_container ${cardsLootedIndices.includes(index) ? 'hidden' : ''}`}
        >
          <Card
            name={i}
            // isFaceDown
            onClick={cardsLootedCount === 3 ? null : () => {
              if (cardsLootedCount < 3) {
                console.log(`adding ${i} to deck`);
                setCardsLootedIndices(`${cardsLootedIndices}${index}`);
              }
            }}
          />
        </div>
      ))}
    </FlexContainer>
  );

  const cardsLootedCountComponent = (
    <span css={cardsLootedCountCss(cardsLootedCount === 3)}>
      ({cardsLootedCount}/3)
    </span>
  );

  return (
    <Modal
      title='Battle Rewards'
      continueOptions={[{
        text: 'Continue',
        color: 'green',
        onClick: () => {
          setPlayerProperties({ gold: player.gold + goldReward });
          setScene('map');
        }
      }]}
    >
      <Gold value={goldReward} big />
      <Spacer height={30} />
      <h1>Take up to 3 cards from the enemy's deck! {cardsLootedCountComponent}</h1>
      <Spacer height={30} />
      {rowOfCards}
    </Modal>
  );
};

const mapStateToProps = (state) => ({
  player: state.clashPlayer,
  winner: state.clashBattleStats.winner,
  enemyLevel: state.clashBattleStats.enemyLevel,
  battleRewardCards: state.clashBattleCards.battleRewardCards,
  battleRewardGold: state.clashBattleCards.battleRewardGold
});
const mapDispatchToProps = (dispatch) => ({
  setPlayerProperties: payload => dispatch(actions.setPlayerProperties(payload)),
  setScene: payload => dispatch(actions.setScene(payload)),
});

export const BattleRewards = connect(mapStateToProps, mapDispatchToProps)(BattleRewardsComponent);
