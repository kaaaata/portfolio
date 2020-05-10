import { css, jsx } from '@emotion/core'; /** @jsx jsx */
import { Image, FlexContainer } from '../particles';
import { colors } from '../styles';

export const Gold = ({
  gold,
  color = 'yellow',
  big
}) => (
  <FlexContainer
    justifyContent='center'
    className='gold'
  >
    <Image
      src='/clash/gold.png'
      width={big ? 100 : 36}
      height={big ? 100 : 36}
    />
    <div css={css`
      font-size: ${big ? '100px' : '24px'};
      line-height: ${big ? '100px' : '36px'};
      color: ${colors[color]};
    `}>
      {gold}
    </div>
  </FlexContainer>
);
