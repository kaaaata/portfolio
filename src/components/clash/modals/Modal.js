import { css, jsx } from '@emotion/core'; /** @jsx jsx */
import { Spacer, FlexContainer } from '../../particles';
import { Button } from '../Button';
import { colors } from '../../styles';

const unclickableAreaCss = css`
  position: absolute;
  width: 100%;
  height: calc(100% - 40px);
  bottom: 0;
`;
const modalCss = css`
  position: absolute;
  width: 100%;
  height: calc(100% - 40px);
  bottom: 0;
  background: rgba(0, 0, 0, 1);
  font-size: 20px;
  padding: 30px 60px;

  &.half_modal {
    height: 70%;
    transform: translateY(-22%);
    box-shadow: 4px 4px 8px ${colors.black};
    border-top: 3px solid ${colors.yellow};
    border-bottom: 3px solid ${colors.yellow};
  }

  &.transparent {
    background: rgba(0, 0, 0, 0.8);
  }

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
          color={i.color || 'white'}
          onClick={i.onClick}
        >
          {i.text}
        </Button>
      ))}
    </div>
  );

  const modal = (
    <div
      css={modalCss}
      className={`modal ${halfModal ? 'half_modal' : ''} ${transparent ? 'transparent' : ''}`}
    >
      <FlexContainer
        className='content'
        alignItems='center'
        flexDirection='column'
      >
        {modalTitle}
        {children}
        <Spacer height={30} />
        {modalContinueOptions}
      </FlexContainer>
    </div>
  );

  return halfModal ? (
    <div css={unclickableAreaCss}>
      {modal}
    </div>
  ) : modal;
};
