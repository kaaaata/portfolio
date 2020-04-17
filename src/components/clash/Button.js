import React, { useState, useEffect } from 'react'; // eslint-ignore-line
import { css, jsx } from '@emotion/core'; /** @jsx jsx */
import { Image, Spacer, Filter, FlexContainer } from '../particles';
import { colors, zIndex } from '../styles';



export const Button = ({
  text,
  color = 'white',
  cb
}) => (
  <button
    onClick={cb}
    css={css`
      min-width: 120px;
      height: 40px;
      font-size: 20px;
      padding: 0 15px;
      border-radius: 5px;
      border: none;
      outline: none;
      background: ${colors[color]};
      cursor: pointer;
    `}
  >
    {text}
  </button>
);