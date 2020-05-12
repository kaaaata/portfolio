import React, { useState } from 'react';
import { css, jsx } from '@emotion/core'; /** @jsx jsx */
import { connect } from 'react-redux';
import * as actions from '../../stores/actions';
import { Modal } from '../modals/Modal';
import { FlexContainer, Spacer } from '../../particles';
import { Button } from '../Button';
import { Card } from '../Card';
import { Text } from '../Text';

const cardLootModalCss = css`
  .card {
    margin: 10px;
  }
`;

const continueOptionsCss = css`
  button {
    margin-right: 10px;

    &:last-child {
      margin-right: 0;
    }
  }
`;

const CardLootModalComponent = ({
  cards,
  maxCardsToTake = cards.length,
  title,
  addCardsToCollection,
  closeModal
}) => {
  const [selectedCards, setSelectedCards] = useState({});
  const cardsTakenCount = Object.keys(selectedCards).length;

  const titleText = (
    <React.Fragment>
      {title}&nbsp;
      <Text
        type='header'
        inline
        color={cardsTakenCount === maxCardsToTake ? 'red' : 'green'}
      >
        ({cardsTakenCount}/{maxCardsToTake})
      </Text>
    </React.Fragment>
  );

  const continueOptions = [{ text: 'Done', color: 'green', onClick: closeModal }];
  if (maxCardsToTake === cards.length && cardsTakenCount < maxCardsToTake) {
    continueOptions.unshift({
      text: 'Take All',
      color: cardsTakenCount === maxCardsToTake ? 'red' : 'green',
      onClick: () => {
        if (cardsTakenCount < maxCardsToTake) {
          addCardsToCollection(cards.filter((_, index) => !selectedCards.hasOwnProperty(index)));
          setSelectedCards({ 0: true, 1: true, 2: true, 3: true, 4: true });
          closeModal();
        }
      }
    })
  }

  return (
    <Modal
      halfModal
      title={titleText}
      transparent={false}
    >
      <FlexContainer justifyContent='center' css={cardLootModalCss}>
        {cards.map((i, index) => (
          <Card
            key={index}
            name={i}
            onClick={() => {
              if (cardsTakenCount < maxCardsToTake) {
                setSelectedCards({ ...selectedCards, [index]: true });
                addCardsToCollection([i]);
              }
            }}
            _css={selectedCards.hasOwnProperty(index) ? 'visibility: hidden;' : ''}
          />
        ))}
      </FlexContainer>
      <Spacer height={30} />
      <FlexContainer justifyContent='center' css={continueOptionsCss}>
        {continueOptions.map(i => (
          <Button
            key={i.text}
            mini
            isDisabled={i.text === 'Take All' && cardsTakenCount === maxCardsToTake}
            onClick={i.onClick}
            color={i.color}
          >
            {i.text}
          </Button>
        ))}
      </FlexContainer>
    </Modal>
  );
};

const mapDispatchToProps = (dispatch) => ({
  addCardsToCollection: payload => dispatch(actions.addCardsToCollection(payload))
});

export const CardLootModal = connect(null, mapDispatchToProps)(CardLootModalComponent);
