import { css, jsx } from '@emotion/core'; /** @jsx jsx */
import { Spacer, FlexContainer, Filter } from '../../particles';
import { colors } from '../../styles';

const modalCss = css`
  border: 3px solid green;

  .content {
    position: absolute;
    width: 100%;

    .title {
      font-size: 24px;
    }
  }
`;

export const Modal = ({
  title,
  children
}) => {
  const modalTitle = (
    <div className='title'>
      {title}
    </div>
  );

  return (
    <div css={modalCss}>
      <Filter opacity={0.75} color={colors.black} />
      <FlexContainer
        className='content'
        alignItems='center'
        flexDirection='column'
      >
        <Spacer height={80} />
        {modalTitle}
        <Spacer height={40} />
        {children}
      </FlexContainer>
    </div>
  );
};
