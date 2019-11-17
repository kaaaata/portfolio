import { useState } from 'react';
import { jsx } from '@emotion/core'; /** @jsx jsx */
import { OLL } from '.';
import { Link, FlexContainer, FlexItem, Image } from '../particles';
// import SidebarToggle from './SidebarToggle';

// import { topNavCss

const Algorithm = ({ algorithm = {}, step }) => {
  return (
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
            <h3 key={index}>{a}</h3>
          ))}
        </FlexItem>
        <FlexItem>
          Squares: {algorithm.squares}
        </FlexItem>
      </FlexContainer>
    </article>
  );
};

const Algorithms = ({ algorithms = [], step }) => (
  <section>
    {algorithms.map((a, index) => (
      <Algorithm algorithm={a} step={step} key={index} />
    ))}
  </section>
);

const Cube = () => {
  // const [step, filterStep] = useState('OLL');
  const step = 'OLL';
  return (
    <section>
      <Algorithms algorithms={OLL} step={step} />
    </section>
  );
};

export default Cube;
