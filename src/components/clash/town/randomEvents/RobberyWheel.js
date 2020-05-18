import React, { useState } from 'react';
import { css, jsx } from '@emotion/core'; /** @jsx jsx */
import { useDispatch } from 'react-redux';
import * as actions from '../../../stores/actions';
import { EventModal } from '../EventModal';
import { Image, FlexContainer } from '../../../particles';
import { colors } from '../../../styles';
import { genPackCards } from '../../shop/genPackCards';
import { packs } from '../../shop/packs';
import { CardLootModal } from '../../modals/CardLootModal';

const wheelImages = [
  { image: 'gold', width: 36, height: 36 },
  { image: 'silver_bar', width: 36, height: 36 },
  { image: 'bomb', width: 36, height: 36 },
  { image: 'cursed_gold', width: 36, height: 50 },
  { image: 'candy_corn', width: 45, height: 45 },
  { image: 'key', width: 45, height: 45 },
];

const robberyWheelCss = css`
  position: relative;

  #robbery_wheel {
    height: 200px;
    width: 200px;
    border-radius: 50%;
    background: ${colors.slate};
    border: 3px solid ${colors.greyDark};
    position: relative;
    transition: transform 5s ease-out;
    box-sizing: content-box;
    margin-right: 20px;
    flex: 0 0 auto;

    .divider {
      position: absolute;
      top: 0;
      left: 98px;
      width: 3px;
      height: 201px;
      background: ${colors.greyDark};

      &.divider_1 {
        transform: rotate(60deg);
      }

      &.divider_2 {
        transform: rotate(120deg);
      }
    }

    .option {
      position: absolute;

      &.option_0 { left: 120px; top: 22px; transform: rotate(30deg); }
      &.option_1 { left: 149px; top: 81px; transform: rotate(90deg); }
      &.option_2 { left: 117px; top: 142px; transform: rotate(150deg); }
      &.option_3 { left: 48px; top: 142px; transform: rotate(210deg); }
      &.option_4 { left: 7px; top: 80px; transform: rotate(270deg); }
      &.option_5 { left: 50px; top: 22px; transform: rotate(330deg); }
    }
  }

  .pointer {
    position: absolute;
    left: 62px;
    top: -20px;
    transform: rotate(138deg);
  }
`;

export const RobberyWheel = ({ rng, closeModal }) => {
  const dispatch = useDispatch();

  const [isSpinning, setIsSpinning] = useState(false);
  const [selectedOptionIndex, setSelectedOptionIndex] = useState(-1);
  const [isCardLootModalOpen, setIsCardLootModalOpen] = useState(false);

  let flavorText;
  let continueGoodText;
  let continueBadText;
  let continueOnClick;

  switch (selectedOptionIndex) {
    case 0:
      flavorText = (
        <React.Fragment>
          You win some <span className='yellow'>gold!</span>
        </React.Fragment>
      );
      continueGoodText = 'Receive 100 gold.'
      continueOnClick = () => {
        dispatch(actions.adjustPlayerGold(100));
        dispatch(actions.addTownFeedText(`Received: 100 gold`));
        closeModal();
      };
      break;
    case 1:
      flavorText = (
        <React.Fragment>
          You win a silver pack!
        </React.Fragment>
      );
      continueGoodText = 'Select cards to keep.'
      continueOnClick = () => setIsCardLootModalOpen(true);
      break;
    case 2:
      flavorText = (
        <React.Fragment>
          You win a <span className='red'>Bomb!</span>
        </React.Fragment>
      );
      continueBadText = 'Add a copy of Bomb to your deck.'
      continueOnClick = () => {
        dispatch(actions.addCardsToCollection('Bomb'));
        closeModal();
      };
      break;
    case 3:
      flavorText = (
        <React.Fragment>
          You win some <span className='red'>cursed gold!</span> It makes you poorer!
        </React.Fragment>
      );
      continueBadText = 'Lose 25 gold.'
      continueOnClick = () => {
        dispatch(actions.adjustPlayerGold(-25));
        dispatch(actions.addTownFeedText(`Lost: 25 gold`));
        closeModal();
      };
      break;
    case 4:
      flavorText = (
        <React.Fragment>
          You win some <span className='green'>candy corn!</span>
        </React.Fragment>
      );
      continueGoodText = 'Add a copy of Candy Corn to your deck.'
      continueOnClick = () => {
        dispatch(actions.addCardsToCollection('Candy Corn'));
        closeModal();
      };
      break;
    case 5:
      flavorText = (
        <React.Fragment>
          You win a <span className='violet'>strange key!</span>
        </React.Fragment>
      );
      continueGoodText = 'Add a copy of Strange Key to your deck.'
      continueOnClick = () => {
        dispatch(actions.addCardsToCollection('Strange Key'));
        closeModal();
      };
      break;
    default:
      break;
  }

  return isCardLootModalOpen ? (
    <CardLootModal
      title='Silver Pack'
      cards={genPackCards(packs.silver)}
      closeModal={closeModal}
    />
  ) : (
    <EventModal
      title='Robbery Wheel'
      image='goblin_boss'
      page={1}
      pages={[
        {
          text: (
            <FlexContainer css={robberyWheelCss}>
              <div id='robbery_wheel'>
                {[0, 1, 2].map(i => (
                  <div key={i} className={`divider divider_${i}`} />
                ))}
                {wheelImages.map((i, index) => (
                  <Image
                    key={index}
                    src={`/clash/${i.image}.png`}
                    width={i.width}
                    height={i.height}
                    className={`option option_${index}`}
                  />
                ))}
              </div>
              <Image
                src='/clash/strike.png'
                width={80}
                height={60}
                className='pointer'
              />
              <div>
                <React.Fragment>
                  You encounter a strange goblin lurking in the shadows. <span className='violet'>"Spin my wheel!"</span> he says. <span className='violet'>"Hee hee hee!"</span>
                  <br /><br />
                  {flavorText}
                </React.Fragment>
              </div>
            </FlexContainer>
          ),
          options: [
            selectedOptionIndex === -1 ? {
              name: 'Spin the Wheel',
              isDisabled: isSpinning,
              onClick: () => {
                setIsSpinning(true);
                const el = document.getElementById('robbery_wheel');
                const selectedOptionIndex = Math.floor(rng * 5);
                el.style.transform = `rotate(${360 * 8 + 30 + 60 * (5 - selectedOptionIndex)}deg)`;

                setTimeout(() => {
                  setSelectedOptionIndex(selectedOptionIndex);
                }, 5500);
              }
            } : {
              name: 'Continue',
              goodText: continueGoodText,
              badText: continueBadText,
              onClick: continueOnClick
            }
          ]
        }
      ]}
    />
  );
};
