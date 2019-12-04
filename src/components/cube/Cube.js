import { useState } from 'react';
import { css, jsx } from '@emotion/core'; /** @jsx jsx */
import { Algorithms } from './Algorithms';
import { PLLTrainer } from './PLLTrainer';
import { Spacer, Button } from '../particles';

export const Cube = () => {
  const [content, setContent] = useState('pll_trainer');

  let contentComponent = null;
  switch (content) {
    case 'algorithms':
      contentComponent = <Algorithms />;
      break;
    case 'pll_trainer':
      contentComponent = <PLLTrainer />;
      break;
    default:
      break;
  }

  return (
    <section>
      <h1>Cat's Cubing Page</h1>
      <Spacer height={20} /><hr /><Spacer height={20} />
      <Button
        onClick={() => setContent('pll_trainer')}
        isSelected={content === 'algorithms'}
        isDisabled={content === 'algorithms'}
      >
        Algorithms
      </Button>
      <Button
        onClick={() => setContent('pll_trainer')}
        isSelected={content === 'pll_trainer'}
        isDisabled={content === 'pll_trainer'}
        _css={css`margin-left: 10px;`}
      >
        PLL Trainer
      </Button>
      <Spacer height={20} /><hr /><Spacer height={20} />
      {contentComponent}
    </section>
  );
};
