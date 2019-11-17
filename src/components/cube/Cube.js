import { useState } from 'react';
import { jsx } from '@emotion/core'; /** @jsx jsx */
import OLL from './OLL';
import CubeNotation from './CubeNotation';
import { FlexContainer, FlexItem, Image } from '../particles';

const Algorithm = ({ algorithm = {}, step }) => (
  <article>
    <FlexContainer>
      <FlexItem>
        <h2>{step} {algorithm.id}</h2>
        <Image
          src={algorithm.img}
          width={80}
          height={80}
          external
        />
      </FlexItem>
      <FlexItem>
        <h2>Name: {algorithm.name}</h2>
        {algorithm.algos.map((a, index) => (
          <CubeNotation notation={a} key={index} />
        ))}
      </FlexItem>
      <FlexItem>
        Squares: {algorithm.squares}
      </FlexItem>
    </FlexContainer>
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
