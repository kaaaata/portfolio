import { css, jsx } from '@emotion/core'; /** @jsx jsx */
import { Image, FlexContainer } from '../particles';
import { colors } from '../styles';

export const Gold = ({
  value,
  color = colors.yellow,
  big
}) => (
  <FlexContainer
    justifyContent='center'
    className='gold'
  >
    <Image
      src='/clash/gold.png'
      width={big ? 100 : 24}
      height={big ? 100 : 24}
    />
    <div css={css`
      font-size: ${big ? 100 : 24}px;
      color: ${color};
      margin-left: ${big ? 20 : 5}px;
    `}>
      {value}
    </div>
  </FlexContainer>
);
