import { css, jsx } from '@emotion/core'; /** @jsx jsx */
import { colors } from '../styles';
import { Text } from './Text';

export const Button = ({
  onClick,
  mini = false,
  isDisabled = false,
  color,
  children // String|Node
}) => {
  return (
    <button
      onClick={onClick}
      css={css`
        background: ${isDisabled ? colors.greyDark : colors.slate};
        padding: 0 10px;
        height: 32px;
        line-height: 32px;
        border-radius: 4px;
        border: none;
        outline: none;
        width: ${mini ? '200px' : '100%'};
        color: ${colors.white};
        text-align: ${mini ? 'center' : 'left'};
        cursor: ${isDisabled ? 'default' : 'pointer'};
    
        &:hover {
          ${isDisabled ? '' : `background: ${colors.slateLight};`}
        }
      `}
    >
      {typeof children === 'string' ? (
        <Text type='small' inline color={color}>{children}</Text>
      ) : children}
    </button>
  );
};
