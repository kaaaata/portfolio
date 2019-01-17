import React from 'react';
import { css, jsx } from '@emotion/core'; /** @jsx jsx */
import { colors } from './styles';
import { Spacer, Image } from './particles';

const introCss = css`
  .image {
    margin: auto;
  }
`;

const Intro = () => (
  <section css={introCss}>
    <Image
      src='logo.png'
      width={[500, 420, 320]}
      height={750}
    />
  </section>
);

export default Intro;
