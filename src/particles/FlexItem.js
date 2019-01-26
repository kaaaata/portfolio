import { css, jsx } from '@emotion/core'; /** @jsx jsx */
import { omit } from 'lodash';
import { mq } from '../styles';

const flexItemCss = ({
  flex,
  flexGrow = 1,
  flexShrink,
  flexBasis,
  _css
}) => css`
  ${mq.genResponsiveCss('flex', flex, false)}
  ${mq.genResponsiveCss('flex-grow', flexGrow, false)}
  ${mq.genResponsiveCss('flex-shrink', flexShrink, false)}
  ${mq.genResponsiveCss('flex-basis', flexBasis, false)}

  ${_css}
`;

const FlexItem = (props) => {
  const { className = '', children } = props;
  const otherProps = omit(props, [
    'flex', 'flexGrow', 'flexShrink', 'flexBasis',
    '_css', 'className', 'children'
  ]);

  return (
    <div
      css={flexItemCss(props)}
      className={`flex_item ${className}`}
      {...otherProps}
    >
      {children}
    </div>
  );
};

export default FlexItem;
