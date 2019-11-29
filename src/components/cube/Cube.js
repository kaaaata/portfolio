import { useState } from 'react';
import { css, jsx } from '@emotion/core'; /** @jsx jsx */
import OLL from './OLL';
import CubeNotation from './CubeNotation';
import { FlexContainer, FlexItem, Image, Spacer, Button } from '../particles';
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
        <h4>{step} {algorithm.id}</h4>
        <Image
          src={algorithm.img}
          width={80}
          height={80}
          external
        />
      </div>
      <FlexItem>
        <h4>"{algorithm.name}"</h4>
        {algorithm.algos.map((a, index) => (
          <CubeNotation notation={a} key={index} />
        ))}
      </FlexItem>
      <h4 className='square_count'>
        Squares: {algorithm.squares}
      </h4>
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

const sortFnMap = {
  ID: (a, b) => a.id - b.id
};

const Cube = () => {
  const [step, filterStep] = useState('OLL');
  const [sort, setSort] = useState('ID');

  const algorithms = OLL.sort(sortFnMap[sort]);

  return (
    <section>
      <FlexContainer>
        <FlexContainer alignItems='center'>
          <h4>Sort |&nbsp;&nbsp;</h4>
          <Button>Asdf</Button>
        </FlexContainer>
      </FlexContainer>
      <Spacer height={20} />
      <hr />
      <Spacer height={20} />
      <Algorithms algorithms={algorithms} step={step} />
    </section>
  );
};

export default Cube;
