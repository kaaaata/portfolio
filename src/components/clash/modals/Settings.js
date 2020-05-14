import React, { useState } from 'react';
import { css, jsx } from '@emotion/core'; /** @jsx jsx */
import { useSelector, useDispatch, shallowEqual } from 'react-redux';
import * as actions from '../../stores/actions';
import { shuffle, sampleSize, random } from 'lodash';
import { genMonsterDeck } from '../monsters/genMonsterDeck';
import { Modal } from './Modal';
import { Text } from '../Text';
import { cards } from '../cards/cards';
import { rarityColors } from '../cards/rarity';
import { Button } from '../Button';
import { Spacer } from '../../particles';
import { Card } from '../Card';
import { cardsArray } from '../cards/cards';
import { Collection } from './Collection';

const inDevelopment = process.env.NODE_ENV !== 'production';

export const Settings = () => {
  const [isAllCardsModalActive, setIsAllCardsModalActive] = useState(false);

  return (
    <React.Fragment>
      <Modal halfModal>
        <Spacer height={100} />
        <Button mini isDisabled>Concede Battle</Button>
        <Spacer height={20} />
        <Button onClick={() => setIsAllCardsModalActive(true)} mini>View All Cards</Button>
      </Modal>
      
      {isAllCardsModalActive && inDevelopment && (
        <Collection cardsOverride={cardsArray.map(card => card.name)} />
      )}
    </React.Fragment>
  );
};
