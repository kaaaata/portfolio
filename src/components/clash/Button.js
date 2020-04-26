import { css, jsx } from '@emotion/core'; /** @jsx jsx */
import { colors } from '../styles';

export const Button = ({
  color = 'white',
  onClick,
  children
}) => (
  <button
    onClick={onClick}
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
    {children}
  </button>
);
