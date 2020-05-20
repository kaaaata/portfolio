import React, { useState } from 'react';
import { useSelector, useDispatch, shallowEqual } from 'react-redux';
import * as actions from '../../../stores/actions';
import { EventModal, EventModalPage } from '../../modals/EventModal';

export const DwarvenSmith = ({ closeModal }) => {
  const { canReforge, canEnhance } = useSelector(state => ({
    canReforge: state.clashPlayer.gold > 20 && state.clashPlayer.deck.includes('Sword'),
    canEnhance: state.clashPlayer.gold > 40 && state.clashPlayer.deck.includes('Sword')
  }), shallowEqual);
  const dispatch = useDispatch();

  const [page, setPage] = useState('default');

  let pageComponent;
  switch (page) {
    case 'default':
      pageComponent = (
        <EventModalPage
          page={1}
          text={
            <React.Fragment>
              While exploring the ruins of an ancient city, you encounter a dwarf. He has set up a small <span className='violet'>smithy</span> in the ruins!
              <br /><br />
              "I can <span className='green'>upgrade</span> your weapons, for a price," he says.
            </React.Fragment>
          }
          options={[
            {
              name: 'Reforge',
              isDisabled: !canReforge,
              redText: canReforge ? 'Lose 20 gold and card: Sword.' : 'Requires 20 gold and card: Sword.',
              greenText: canReforge ? 'Receive card: Mace.' : '',
              redTextFirst: true,
              onClick: () => {
                dispatch(actions.adjustPlayerGold(-20));
                dispatch(actions.addTownFeedText('Lost: 20 gold'));
                dispatch(actions.removeCardsFromCollection('Sword'));
                setPage('reforge');
              }
            },
            {
              name: 'Enhance',
              isDisabled: !canEnhance,
              redText: canEnhance ? 'Lose 40 gold and card: Sword.' : 'Requires 40 gold and card: Sword.',
              greenText: canEnhance ? 'Receive card: Longsword.' : '',
              redTextFirst: true,
              onClick: () => {
                dispatch(actions.adjustPlayerGold(-40));
                dispatch(actions.addTownFeedText('Lost: 40 gold'));
                dispatch(actions.removeCardsFromCollection('Sword'));
                setPage('enhance');
              }
            },
            {
              name: 'Leave',
              onClick: () => setPage('leave')
            }
          ]}
        />
      );
      break;
    case 'reforge':
      pageComponent = (
        <EventModalPage
          page={2}
          text={
            <React.Fragment>
              The dwarf takes your weapon, and places it in a <span className='red'>furnace.</span>
              <br /><br />
              He <span className='violet'>melts</span> the weapon down into molten steel, then <span className='green'>reforges</span> it into a mace!
            </React.Fragment>
          }
          options={[{
            name: 'Continue',
            greenText: 'Receive card: Mace.',
            onClick: () => {
              dispatch(actions.addCardsToCollection('Mace'));
              closeModal();
            }
          }]}
        />
      );
      break;
    case 'enhance':
      pageComponent = (
        <EventModalPage
          page={3}
          text={
            <React.Fragment>
              The dwarf takes your weapon, and places it in a <span className='red'>furnace.</span>
              <br /><br />
              Once the weapon is glowing <span className='red'>red hot,</span> he hammers it around the edges, <span className='green'>enhancing</span> its quality!
            </React.Fragment>
          }
          options={[{
            name: 'Continue',
            greenText: 'Receive card: Longsword.',
            onClick: () => {
              dispatch(actions.addCardsToCollection('Longsword'));
              closeModal();
            }
          }]}
        />
      );
      break;
    case 'leave':
      pageComponent = (
        <EventModalPage
          key={4}
          text='You leave without buying an upgrade.'
          options={[{
            name: 'Continue',
            onClick: closeModal
          }]}
        />
      );
      break;
    default:
      break;
  }

  return (
    <EventModal
      title='Dwarven Smith'
      image='dwarf_event'
    >
      {pageComponent}
    </EventModal>
  );
};
