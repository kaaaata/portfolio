import { css, jsx } from '@emotion/core'; /** @jsx jsx */
import { zIndex, colors, layout } from '../styles';
import { FlexContainer } from '../particles';

const footerCss = css`
  width: 100%;
  height: 80px;
  z-index: ${zIndex.stickyNav};
  background: ${colors.blackDark};
  padding: 0 ${layout.MAIN_PADDING}px;
`;

export const Footer = () => (
  <FlexContainer
    alignItems='center'
    _css={footerCss}
  >
    <h2>© Cat 2019</h2>
  </FlexContainer>
);
