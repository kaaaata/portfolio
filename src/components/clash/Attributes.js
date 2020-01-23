import { css, jsx } from '@emotion/core'; /** @jsx jsx */
import { Image, FlexContainer } from '../particles';
import { colors } from '../styles';

const attributesCss = css`
  cursor: default;
  font-size: 36px;
  text-align: center;
  text-shadow: 2px 2px 4px ${colors.black};

  .number {
    margin-top: 11px;
  }

  .attack {
    .number {
      margin-left: -7px;
    }
  }

  .magic {
    .number {
      margin-left: -2px;
    }
  }

  .defense {
    .number {
      margin-left: -3px;
    }
  }
`;

export const Attributes = ({
  attack,
  magic,
  defense
}) => {
  const attackDisplay = (
    <Image
      className='attack'
      src='/clash/attack.png'
      width={30}
      height={30}
    >
      <div className='number'>{attack}</div>
    </Image>
  );

  const magicDisplay = (
    <Image
      className='magic'
      src='/clash/magic.png'
      width={30}
      height={30}
    >
      <div className='number'>{magic}</div>
    </Image>
  );

  const defenseDisplay = (
    <Image
      className='defense'
      src='/clash/defense.png'
      width={30}
      height={30}
    >
      <div className='number'>{defense}</div>
    </Image>
  );

  return (
    <FlexContainer
      className='attributes'
      justifyContent='space-between'
      _css={attributesCss}
    >
      {attackDisplay}
      {magicDisplay}
      {defenseDisplay}
    </FlexContainer>
  );
};
