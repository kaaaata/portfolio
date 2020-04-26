import { useState } from 'react';
import { css, jsx } from '@emotion/core'; /** @jsx jsx */
import { connect } from 'react-redux';
import * as actions from '../../stores/actions';
import { Modal } from '../modals/Modal';
import { FlexContainer } from '../../particles';
import { Card } from '../Card';

const cardPackModalCss = css`
  .card {
    margin: 10px;
  }
`;

const CardPackModalComponent = ({ cards, addCardsToCollection, closeModal }) => {
  const [selectedCards, setSelectedCards] = useState({});

  return (
    <Modal
      title='Choose Cards to Keep'
      halfModal
      transparent={false}
      continueOptions={[
        {
          text: 'Take All',
          color: 'green',
          onClick: () => {
            if (Object.keys(selectedCards).length === 5) {
              return;
            }
            addCardsToCollection(cards.filter((_, index) => !selectedCards.hasOwnProperty(index)));
            setSelectedCards({ 0: true, 1: true, 2: true, 3: true, 4: true });
          }
        },
        { text: 'Exit', color: 'green', onClick: closeModal },
      ]}
    >
      <FlexContainer justifyContent='center' css={cardPackModalCss}>
        {cards.map((i, index) => (
          <Card
            key={index}
            name={i}
            onClick={() => {
              setSelectedCards({ ...selectedCards, [index]: true });
              addCardsToCollection([i]);
            }}
            _css={selectedCards.hasOwnProperty(index) ? 'visibility: hidden;' : ''}
          />
        ))}
      </FlexContainer>
    </Modal>
  );
};

const mapDispatchToProps = (dispatch) => ({
  addCardsToCollection: payload => dispatch(actions.addCardsToCollection(payload))
});

export const CardPackModal = connect(null, mapDispatchToProps)(CardPackModalComponent);
