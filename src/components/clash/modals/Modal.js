import { css, jsx } from '@emotion/core'; /** @jsx jsx */
import { Spacer, FlexContainer, Filter } from '../../particles';
import { Button } from '../Button';
import { colors } from '../../styles';

const modalCss = css`
  position: absolute;
  width: 100%;
  height: calc(100% - 40px);
  bottom: 0;
  background: rgba(0, 0, 0, 0.8);
  font-size: 20px;

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
  continueOptions, // [{ text, color, cb }]
  children
}) => {
  const modalTitle = title && (
    <div className='title'>
      {title}
      <Spacer height={40} />
    </div>
  );

  const modalContinueOptions = (
    <div className='continue_options'>
      {continueOptions.map(i => (
        <Button key={i.text} {...i} />
      ))}
    </div>
  );

  return (
    <div css={modalCss}>
      <FlexContainer
        className='content'
        alignItems='center'
        flexDirection='column'
      >
        <Spacer height={80} />
        {modalTitle}
        {children}
        <Spacer height={40} />
        {modalContinueOptions}
      </FlexContainer>
    </div>
  );
};
