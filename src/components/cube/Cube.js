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

  .stats {
    width: 80px;
    flex: none;

    ${mq.phone(`
      display: none;
    `)}
  }
`;

const Algorithms = ({ algorithms = [], setSearchText }) => (
  <section>
    {algorithms.map((a, index) => (
      <article css={algorithmCss} key={index}>
        <FlexContainer justifyContent='space-between'>
          <div className='id_and_image'>
            <h4>{a.step} {a.id}</h4>
            <Image
              src={a.img}
              width={80}
              height={80}
              external
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

const sortFnMap = {
  ID: (a, b) => a.id - b.id,
  Squares: (a, b) => (
    a.squares === b.squares
      ? a.id - b.id
      : a.squares - b.squares
  ),
  Moves: (a, b) => a.moves - b.moves
};

const Cube = () => {
  const [showOll, setShowOll] = useState(true);
  const [sort, setSort] = useState('ID');
  const [sortOrder, setSortOrder] = useState(1); // 1 = asc, -1 = desc
  const [searchMode, setSearchMode] = useState('Notation');
  const [searchText, setSearchText] = useState('');

  const stepOptions = (
    <FlexContainer alignItems='center'>
      <h4>Steps</h4>
      {['OLL'].map(s => (
        <Button
          key={s}
          onClick={() => setShowOll(!showOll)}
          isSelected={showOll}
          isDisabled
          _css='margin-left: 10px;'
        >
          {s}
        </Button>
      ))}
    </FlexContainer>
  );

  const sortOptions = (
    <FlexContainer alignItems='center'>
      <h4>Sort</h4>
      {Object.keys(sortFnMap).map(s => (
        <Button
          key={s}
          onClick={() => {
            setSortOrder(s === sort ? (sortOrder * -1) : sortOrder);
            setSort(s);
          }}
          isSelected={s === sort}
          _css='margin-left: 10px;'
        >
          {s}
        </Button>
      ))}
    </FlexContainer>
  );


  const searchOptions = (
    <FlexContainer alignItems='center'>
      <h4>Search</h4>
      {['Notation', 'Name'].map(m => (
        <Button
          key={m}
          onClick={() => setSearchMode(m)}
          isSelected={m === searchMode}
          _css='margin-left: 10px;'
        >
          {m}
        </Button>
      ))}
      <input
        value={searchText}
        placeholder="FRUR'U'F"
        onChange={e => setSearchText(
          // todo: filter out useless characters with regex
          e.target.value.replace(/[()\s]/g, '')
        )}
        spellCheck={false}
        css={css`
          outline: none;
          margin-left: 10px;
        `}
      />
      <Button
        onClick={() => setSearchText('')}
        _css='margin-left: 10px;'
      >
        Clear
      </Button>
    </FlexContainer>
  );

  const algorithms = []
    .concat(showOll ? OLL : [])
    .filter((a) => {
      if (searchMode === 'Name') {
        return a.name.includes(searchText.toLowerCase());
      }

      return a.algorithms.some(
        i => i.replace(/[()\s]/g, '').includes(searchText)
      );
    })
    .sort((a, b) => (sortFnMap[sort](a, b) * sortOrder));

  return (
    <section>
      {stepOptions}
      <Spacer height={5} />
      {sortOptions}
      <Spacer height={5} />
      {searchOptions}
      <Spacer height={20} />
      <hr />
      <Spacer height={20} />
      <Algorithms algorithms={algorithms} setSearchText={setSearchText} />
      <Spacer height={20} />
      <hr />
      <Spacer height={20} />
      <p>Notes:</p>
      <p>
        # Moves counts entire cube rotations (x) as one move, and 180 degree turns (U2) as one move. If multiple algorithms are listed, the shorter one is considered.
      </p>
    </section>
  );
};

export default Cube;
