import { jsx } from '@emotion/core'; /** @jsx jsx */
import { useSelector, useDispatch } from 'react-redux';
import * as actions from '../../stores/actions';
import { CardViewModal } from '../modals/CardViewModal';

const cardPileModalNames = {
  enemyDiscard: 'Enemy Discard',
  enemyBanish: 'Enemy Banish',
  yourDiscard: 'Your Discard',
  yourBanish: 'Your Banish'
};

export const CardPileModal = () => {
  const { activeModalCardPile, cards } = useSelector(state => ({
    activeModalCardPile: state.clashBattleCards.activeModalCardPile,
    cards: state.clashBattleCards.activeModalCardPile
      ? state.clashBattleCards[state.clashBattleCards.activeModalCardPile]
      : []
  }), (oldState, newState) => oldState.activeModalCardPile === newState.activeModalCardPile);
  const dispatch = useDispatch();

  console.log('card pile modal rendered');

  return activeModalCardPile ? (
    <CardViewModal
      title={cardPileModalNames[activeModalCardPile]}
      cards={cards.reverse()}
      closeModal={() => dispatch(actions.setActiveModalCardPile(null))}
    />
  ) : null;
};
