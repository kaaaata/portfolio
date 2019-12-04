import { css, jsx } from '@emotion/core'; /** @jsx jsx */
import { noop } from 'lodash';
import { colors } from '../styles';
import { Link } from './Link';

const buttonCss = (isSelected, isDisabled, _css) => css`
  border-radius: 5px;
  border: 2px solid white;
  cursor: pointer;
  background: ${isSelected ? colors.white : 'transparent'};
  outline: none;
  color: ${isSelected ? colors.black : colors.white};
  transition: all 0.25s ease-out;
  transition-property: color, background;

  ${isDisabled ? '' : `
    &:hover {
      color: ${colors.black};
      background: ${colors.white};
    }

    &:active {
      transform: translateY(3px);
    }
  `}

  ${_css}
`;

export const Button = ({
  href,
  onClick = noop,
  isSelected,
  isDisabled,
  _css,
  children
}) => {
  const button = (
    <button
      css={buttonCss(isSelected, isDisabled, _css)}
      type='button'
      onClick={isDisabled ? noop : onClick}
    >
      {children}
    </button>
  );

  return (href && !isDisabled) ? (
    <Link href={href}>
      {button}
    </Link>
  ) : button;
};
