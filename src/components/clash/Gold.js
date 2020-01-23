import { css, jsx } from '@emotion/core'; /** @jsx jsx */
import { Image, FlexContainer } from '../particles';
import { colors } from '../styles';

export const Gold = ({ value, color = colors.yellow }) => (
  <FlexContainer
    justifyContent='center'
    className='gold'
  >
    <Image
      src='/clash/gold.png'
      width={20}
      height={20}
    />
    <div css={css`
      font-size: 20px;
      color: ${color};
    `}>
      {value}
    </div>
  </FlexContainer>
);
