import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import * as actions from '../../stores/actions';
import { EventModal, EventModalPage } from '../modals/EventModal';

export const DrinkPotion = ({ closeModal }) => {
  const dispatch = useDispatch();

  const [page, setPage] = useState('default');
  const [flavorText, setFlavorText] = useState('');

  let pageComponent;
  switch (page) {
    case 'default':
      pageComponent = (
        <EventModalPage
          page={1}
          text={
            <React.Fragment>
              You see three <span className='blue'>bottles</span> in front of you.
            </React.Fragment>
          }
          options={[
            {
              name: 'Attack Potion',
              greenText: 'Gain +1 attack until end of day.',
              onClick: () => {
                setFlavorText('stronger');
                setPage('drinked_potion');
                dispatch(actions.addTownFeedText('Gained temporary boost: +1 attack'));
                dispatch(actions.setStats({
                  stats: { attack: 1 },
                  type: 'bonuses',
                  player: 'you',
                  operation: 'adjust'
                }));
              }
            },
            {
              name: 'Magic Potion',
              greenText: 'Gain +1 magic until end of day.',
              onClick: () => {
                setFlavorText('wiser');
                setPage('drinked_potion');
                dispatch(actions.addTownFeedText('Gained temporary boost: +1 magic'));
                dispatch(actions.setStats({
                  stats: { magic: 1 },
                  type: 'bonuses',
                  player: 'you',
                  operation: 'adjust'
                }));
              }
            },
            {
              name: 'Defense Potion',
              greenText: 'Gain +1 defense until end of day.',
              onClick: () => {
                setFlavorText('tougher');
                setPage(2);
                dispatch(actions.addTownFeedText('Gained temporary boost: +1 defense'));
                dispatch(actions.setStats({
                  stats: { defense: 1 },
                  type: 'bonuses',
                  player: 'you',
                  operation: 'adjust'
                }));
              }
            }
          ]}
        />
      );
      break;
    case 'drinked_potion':
      pageComponent = (
        <EventModalPage
          page={2}
          text={
            <React.Fragment>
              You feel a little <span className='yellow'>{flavorText}.</span>
            </React.Fragment>
          }
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
      title='Once a day, you can drink a potion.'
      image='blue_potion'
    >
      {pageComponent}
    </EventModal>
  );
};
