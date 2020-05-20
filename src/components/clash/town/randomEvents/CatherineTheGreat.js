import React, { useState } from 'react';
import { EventModal } from '../EventModal';
import { MonsterPreview } from '../../modals/MonsterPreview';
import { eventMonsters } from '../../monsters/monsters';

export const CatherineTheGreat = ({ closeModal }) => {
  const [page, setPage] = useState(1);
  const [isMonsterPreviewOpen, setIsMonsterPreviewOpen] = useState(false);

  return isMonsterPreviewOpen ? (
    <MonsterPreview
      title='You accept the challenge!'
      monsterOverride={eventMonsters['Catherine the Great']}
      closeModal={closeModal}
    />
  ) : (
    <EventModal
      title='Catherine the Great'
      image='cat_the_great_event'
      page={page}
      pages={[
        {
          text: (
            <React.Fragment>
              You are confronted by a lightly armored fighter, who looks like she just got done fighting someone! There is <span className='red'>blood</span> splattered over her armor.
              <br /><br />
              "I am <span className='yellow'>Catherine the Great!</span> I challenge you to a duel!"
            </React.Fragment>
          ),
          options: [
            {
              name: 'Accept',
              greenText: 'Fight enemy: Catherine the Great.',
              onClick: () => setIsMonsterPreviewOpen(true)
            },
            {
              name: 'Decline',
              onClick: () => setPage(2)
            }
          ]
        },
        {
          text: 'You decline the challenge, and run for your life!',
          options: [{
            name: 'Continue',
            onClick: closeModal
          }]
        }
      ]}
    />
  );
};
