import { css, jsx } from '@emotion/core'; /** @jsx jsx */
import { Spacer, FlexContainer, Filter } from '../../particles';
import { colors } from '../../styles';

const modalCss = css`
  position: absolute;
  width: 100%;
  height: calc(100% - 40px);
  margin-top: 40px;

  .content {
    position: absolute;
    height: 100%;
    width: 100%;

    .title {
      font-size: 24px;
    }
  }
`;

export const Modal = ({
  title,
  continueOnClick,
  children
}) => {
  const modalTitle = title && (
    <div className='title'>
      {title}
      <Spacer height={40} />
    </div>
  );

  const continueButton = continueOnClick && (
    <div>
      <Spacer height={40} />
      <button onClick={continueOnClick}>
        Continue
      </button>
    </div>
  );

  return (
    <div css={modalCss}>
      <Filter opacity={0.8} color={colors.black} />
      <FlexContainer
        className='content'
        alignItems='center'
        flexDirection='column'
      >
        <Spacer height={80} />
        {modalTitle}
        {children}
        {continueButton}
        <Spacer height={80} />
      </FlexContainer>
    </div>
  );
};
