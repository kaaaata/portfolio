import { css, jsx } from '@emotion/core'; /** @jsx jsx */
import { Spacer, FlexContainer } from '../../particles';
import { Button } from '../Button';
import { colors, zIndex } from '../../styles';

const modalCss = (halfModal, transparent, _zIndex) => css`
  position: absolute;
  width: 100%;
  height: ${halfModal ? '65%' : `calc(100% - 40px)`};
  bottom: 0;
  background: rgba(0, 0, 0, ${transparent ? 0.8 : 1});
  font-size: 20px;
  ${halfModal ? 'transform: translateY(-22%);' : ''}
  ${halfModal ? `box-shadow: 4px 4px 8px ${colors.black};` : ''}
  ${_zIndex ? `z-index: ${zIndex[_zIndex]};` : ''}

  .content {
    .title {
      font-size: 36px;
    }

    .continue_options {
      button {
        display: inline-block;
        margin-right: 15px;

        &:last-child {
          margin-right: 0;
        }
      }
    }
  }
`;

export const Modal = ({
  title,
  continueOptions = [], // [{ text, color, onClick }],
  halfModal = false,
  transparent = true,
  zIndex,
  children
}) => {
  const modalTitle = title && (
    <div className='title'>
      {title}
      <Spacer height={30} />
    </div>
  );

  const modalContinueOptions = (
    <div className='continue_options'>
      {continueOptions.map(i => (
        <Button
          key={i.text}
          color={i.color}
          onClick={i.onClick}
        >
          {i.text}
        </Button>
      ))}
    </div>
  );

  return (
    <div css={modalCss(halfModal, transparent, zIndex)}>
      <FlexContainer
        className='content'
        alignItems='center'
        flexDirection='column'
      >
        <Spacer height={30} />
        {modalTitle}
        {children}
        <Spacer height={30} />
        {modalContinueOptions}
      </FlexContainer>
    </div>
  );
};
