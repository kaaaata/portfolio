import React, { useState } from 'react';
import { useSelector, useDispatch, shallowEqual } from 'react-redux';
import * as actions from '../../stores/actions';
import { Modal } from './Modal';
import { Button } from '../Button';
import { Spacer } from '../../particles';
import { cardsArray } from '../cards/cards';
import { Collection } from './Collection';

const inDevelopment = process.env.NODE_ENV !== 'production';

export const Settings = ({ closeModal }) => {
  const { scene, enemyName } = useSelector(state => ({
    scene: state.clashScene.scene,
    enemyName: state.clashBattleStats.enemyName
  }), shallowEqual);
  const dispatch = useDispatch();

  const [isAllCardsModalActive, setIsAllCardsModalActive] = useState(false);

  return (
    <React.Fragment>
      <Modal halfModal transparent={false}>
        <Spacer height={100} />
        <Button 
          mini
          isDisabled={scene !== 'battle'}
          onClick={() => {
            dispatch(actions.setWinner(enemyName));
            closeModal();
          }}
        >
          Concede Battle
        </Button>
        <Spacer height={20} />
        {inDevelopment && (
          <Button
            mini
            onClick={() => setIsAllCardsModalActive(true)}
          >
            View All Cards
          </Button>
        )}
      </Modal>
      
      {isAllCardsModalActive && inDevelopment && (
        <Collection cardsOverride={cardsArray.map(card => card.name)} />
      )}
    </React.Fragment>
  );
};
