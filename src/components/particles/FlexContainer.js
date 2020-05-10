import { css, jsx } from '@emotion/core'; /** @jsx jsx */
import { mq } from '../styles';

export const FlexContainer = ({
  className = '',
  id,
  justifyContent,
  alignItems,
  flexDirection,
  flexWrap,
  _css = '',
  children
}) => {
  const idProps = id ? { id } : {};
  const flexContainerCss = css`
    display: flex;
    ${mq.genResponsiveCss('justify-content', justifyContent)}
    ${mq.genResponsiveCss('align-items', alignItems)}
    ${mq.genResponsiveCss('flex-direction', flexDirection)}
    ${mq.genResponsiveCss('flex-wrap', flexWrap)}
    ${_css}
  `;

  return (
    <div
      css={flexContainerCss}
      className={`flex_container ${className}`}
      {...idProps}
    >
      {children}
    </div>
  );
};
