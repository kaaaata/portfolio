import { css, jsx } from '@emotion/core'; /** @jsx jsx */
import { CubeNotation } from './CubeNotation';
import { FlexContainer, FlexItem, Image } from '../particles';
import { mq } from '../styles';

const algorithmCss = css`
  margin-bottom: 10px;

  .id_and_image {
    width: 120px;
    flex: none;
  }

  .stats {
    width: 80px;
    flex: none;

    ${mq.phone(`
      display: none;
    `)}
  }
`;

export const AlgorithmsDisplay = ({ algorithms = [], setSearchText }) => (
  <section>
    {algorithms.map((a, index) => (
      <article css={algorithmCss} key={index}>
        <FlexContainer justifyContent='space-between'>
          <div className='id_and_image'>
            <h4>{a.step.toUpperCase()} {a.id}</h4>
            <Image
              src={`cube/${a.step}/${a.step}_${a.id}.gif`}
              width={60}
              height={60}
            />
          </div>
          <FlexItem>
            <h4>"{a.name}"</h4>
            {a.algorithms.map((a2, index2) => (
              <CubeNotation notation={a2} key={index2} setSearchText={setSearchText} />
            ))}
          </FlexItem>
          <div className='stats'>
            <p>Squares: {a.squares}</p>
            <p>Moves: {a.moves}</p>
          </div>
        </FlexContainer>
      </article>
    ))}
  </section>
);
