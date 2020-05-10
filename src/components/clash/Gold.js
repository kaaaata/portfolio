import React from 'react';
import { Image, FlexContainer } from '../particles';
import { colors } from '../styles';

export const Gold = ({
  gold,
  color = colors.yellow,
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
    <div style={{
      fontSize: big ? '100px' : '24px',
      lineHeight: big ? '100px' : '36px',
      color
    }}>
      {gold}
    </div>
  </FlexContainer>
);
