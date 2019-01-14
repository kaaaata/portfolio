import React from 'react';
import { css, jsx } from '@emotion/core'; /** @jsx jsx */

const Spacer = ({ size }) => (
  <div
    css={css`
      width: 100%;
      height: ${size}px;
    `}
  />
);

export default Spacer;
