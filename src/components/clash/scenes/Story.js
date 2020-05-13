import { useState } from 'react';
import { css, jsx } from '@emotion/core'; /** @jsx jsx */
import { useDispatch } from 'react-redux';
import * as actions from '../../stores/actions';
import { Text } from '../Text';

const storyCss = css`
  @keyframes fadeIn {
    0% {
      opacity: 0;
    }
    100% {
      opacity: 1;
    }
  }

  height: 100%;
  cursor: pointer;

  .text {
    animation: fadeIn 0.75s ease-out;
    padding: 50px;

    &.click_to_continue {
      position: absolute;
      bottom: 0;
      width: 100%;
    }
  }
`;

export const Story = ({ setScene }) => {
  const dispatch = useDispatch();

  const [step, setStep] = useState(1);

  return (
    <div css={storyCss} onClick={() => step === 3 ? dispatch(actions.setScene('town')) : setStep(step + 1)}>
      <Text type='header' centered>
        Your village is under attack by monsters...
      </Text>
      {step >= 2 && (
        <Text type='header' centered>
          Can you survive for 12 days and nights...
        </Text>
      )}
      {step >= 3 && (
        <Text type='header' centered>
          And then defeat the Dragon?!
        </Text>
      )}
      <Text className='click_to_continue' centered>
        {'(click to continue)'}
      </Text>
    </div>
  );
};
