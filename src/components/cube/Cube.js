import { useState } from 'react';
import { css, jsx } from '@emotion/core'; /** @jsx jsx */
import OLL from './OLL';
import CubeNotation from './CubeNotation';
import { FlexContainer, FlexItem, Image, Spacer } from '../particles';
import { mq } from '../styles';

const algorithmCss = css`
  .id_and_image {
    width: 120px;
    flex: none;
  }

  .square_count {
    width: 80px;
    flex: none;

    ${mq.phone(`
      display: none;
    `)}
  }
`;

const Algorithm = ({ algorithm = {}, step }) => (
  <article css={algorithmCss}>
    <FlexContainer justifyContent='space-between'>
      <div className='id_and_image'>
        <h3>{step} {algorithm.id}</h3>
        <Image
          src={algorithm.img}
          width={80}
          height={80}
          external
        />
      </div>
      <FlexItem>
        <h3>"{algorithm.name}"</h3>
        {algorithm.algos.map((a, index) => (
          <CubeNotation notation={a} key={index} />
        ))}
      </FlexItem>
      <div className='square_count'>
        Squares: {algorithm.squares}
      </div>
    </FlexContainer>
    <Spacer height={20} />
  </article>
);

const Algorithms = ({ algorithms = [], step }) => (
  <section>
    {algorithms.map((a, index) => (
      <Algorithm algorithm={a} step={step} key={index} />
    ))}
  </section>
);

const Cube = () => {
  const [step, filterStep] = useState('OLL');

  return (
    <section>
      <Algorithms algorithms={OLL} step={step} />
    </section>
  );
};

export default Cube;
