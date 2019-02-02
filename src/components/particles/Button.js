import { css, jsx } from '@emotion/core'; /** @jsx jsx */
import { noop, omit } from 'lodash';
import { colors } from '../styles';
import Link from './Link';

const buttonCss = css`
  height: 40px;
  border-radius: 5px;
  border: 2px solid white;
  cursor: pointer;
  background: transparent;
  outline: none;
  color: ${colors.white};
  transition: all 0.25s ease-out;
  transition-property: color, background;

  span {
    padding: 0 15px;
    font-size: 14px;
  }

  &:hover {
    color: ${colors.black};
    background: ${colors.white};
  }

  &:active {
    transform: translateY(3px);
  }
`;

const Button = (props) => {
  const { text, href, onClick = noop } = props;
  const otherProps = omit(props, ['text', 'href', 'onClick']);

  const button = (
    <button
      css={buttonCss}
      onClick={onClick}
      type='button'
      {...otherProps}
    >
      <span>{text}</span>
    </button>
  );

  return href ? (
    <Link href={href}>
      {button}
    </Link>
  ) : button;
};

export default Button;
