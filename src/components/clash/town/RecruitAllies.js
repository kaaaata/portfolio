import { useState } from 'react';
import { css, jsx } from '@emotion/core'; /** @jsx jsx */
import * as actions from '../../stores/actions';
import { useSelector, useDispatch, shallowEqual } from 'react-redux';
import { EventModal, EventModalPage } from '../modals/EventModal';
import { genRecruitableAllies } from './genRecruitableAllies';
import { Spacer } from '../../particles';
import { Gold } from '../Gold';
import { Card } from '../Card';

// the margin-top: -15px is a hack to fit all the content inside EventModal.
// the line-height: 1 is a hack to disallow EventModal paragraph line height from impacting card text.
const recruitAlliesCss = css`
  .ally_card {
    margin-right: 40px;
    margin-top: -15px;
    display: inline-block;
    line-height: 1 !important;

    &.hidden {
      visibility: hidden;
    }
  }
`;

export const RecruitAllies = ({ closeModal }) => {
  const { gold } = useSelector(state => ({
    gold: state.clashPlayer.gold
  }), shallowEqual);
  const dispatch = useDispatch();

  const [allies] = useState(genRecruitableAllies());
  const [purchasedAllies, setPurchasedAllies] = useState({});

  return (
    <EventModal
      title='Recruit Allies'
      image='recruiter_event'
    >
      <EventModalPage
        page={1}
        text={
          <div css={recruitAlliesCss}>
            {allies.map((i, index) => (
              <div className={`ally_card ${purchasedAllies[index] ? 'hidden' : ''}`} key={index}>
                <Gold gold={i.cost} color={gold >= i.cost ? 'yellow' : 'red'} />
                <Spacer height={20} />
                <Card
                  name={i.name}
                  onClick={() => {
                    if (gold >= i.cost) {
                      dispatch(actions.adjustPlayerGold(-1 * i.cost));
                      dispatch(actions.addCardsToCollection(i.name));
                      setPurchasedAllies({
                        ...purchasedAllies,
                        [index]: true
                      });
                    } else {
                      dispatch(actions.setToast('Not enough gold!'));
                    }
                  }}
                />
              </div>
            ))}
            <Spacer height={20} />
          </div>
        }
        options={[{
          name: 'Leave',
          onClick: closeModal
        }]}
      />
    </EventModal>
  );
};
