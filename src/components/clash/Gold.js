import { jsx } from '@emotion/core'; /** @jsx jsx */
import { Image, FlexContainer } from '../particles';
import { Text } from './Text';

export const Gold = ({
  gold,
  color = 'yellow',
  big
}) => (
  <FlexContainer
    alignItems='center'
    className='gold'
  >
    <Image
      src='/clash/gold.png'
      width={big ? 100 : 36}
      height={big ? 100 : 36}
    />
    <Text color={color} lineHeight='36px'>{gold}</Text>
  </FlexContainer>
);
