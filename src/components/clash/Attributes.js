import { css, jsx } from '@emotion/core'; /** @jsx jsx */
import { Image, FlexContainer } from '../particles';
import { Text } from './Text';

const attributesCss = css`
  cursor: default;
  text-align: center;

  .text {
    margin-top: 11px;
  }

  .attack {
    .text {
      margin-left: -7px;
    }
  }

  .magic {
    .text {
      margin-left: -2px;
    }
  }

  .defense {
    .text {
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
      <Text>{attack}</Text>
    </Image>
  );

  const magicDisplay = (
    <Image
      className='magic'
      src='/clash/magic.png'
      width={30}
      height={30}
    >
      <Text>{magic}</Text>
    </Image>
  );

  const defenseDisplay = (
    <Image
      className='defense'
      src='/clash/defense.png'
      width={30}
      height={30}
    >
      <Text>{defense}</Text>
    </Image>
  );

  return (
    <FlexContainer
      className='attributes'
      justifyContent='space-between'
      css={attributesCss}
    >
      {attackDisplay}
      {magicDisplay}
      {defenseDisplay}
    </FlexContainer>
  );
};
