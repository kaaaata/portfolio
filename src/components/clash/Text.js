import { css, jsx } from '@emotion/core'; /** @jsx jsx */
import { colors } from '../styles';

const textCss = {
  mini: css`
    font-size: 12px;
  `,
  small: css`
    font-size: 16px;
    text-shadow: 1px 1px 2px ${colors.black};
  `,
  normal: css`
    font-size: 24px;
    text-shadow: 1px 1px 2px ${colors.black};
  `,
  header: css`
    font-size: 36px;
    text-shadow: 2px 2px 3px ${colors.black};
  `,
  title: css`
    font-size: 48px;
    text-shadow: 3px 3px 4px ${colors.black};
  `
};

export const Text = ({
  type = 'normal',
  className = '',
  onClick,
  color,
  centered = false,
  children
}) => {
  return (
    <div
      className={`text ${className}`}
      css={css`
        ${onClick ? 'cursor: pointer;' : ''}
        ${centered ? 'text-align: center;' : ''}
        ${color ? `color: ${colors[color]};` : ''}
        ${textCss[type]}
        ${color ? 'text-shadow: none;' : ''}
      `}
      onClick={onClick}
    >
      {children}
    </div>
  );
};
