import { css, jsx } from '@emotion/core'; /** @jsx jsx */
import { omit } from 'lodash';
import { mq } from '../styles';

const flexContainerCss = ({
  justifyContent,
  alignItems,
  flexDirection,
  flexWrap,
  flexFlow,
  _css = ''
}) => css`
  display: flex;
  ${mq.genResponsiveCss('justify-content', justifyContent)}
  ${mq.genResponsiveCss('align-items', alignItems)}
  ${mq.genResponsiveCss('flex-direction', flexDirection)}
  ${mq.genResponsiveCss('flex-wrap', flexWrap)}
  ${mq.genResponsiveCss('flex-flow', flexFlow)}

  ${_css}
`;

const FlexContainer = (props) => {
  const { className = '', children } = props;
  const otherProps = omit(props, [
    'justifyContent', 'alignItems', 'flexDirection', 'flexWrap', 'flexFlow',
    '_css', 'className', 'children'
  ]);

  return (
    <div
      css={flexContainerCss(props)}
      className={`flex_container ${className}`}
      {...otherProps}
    >
      {children}
    </div>
  );
};

export default FlexContainer;
