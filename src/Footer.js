import { css, jsx } from '@emotion/core'; /** @jsx jsx */
import { zIndex, colors, layout } from './styles';

const footerCss = css`
  width: 100%;
  height: 80px;
  z-index: ${zIndex.stickyNav};
  background: ${colors.blackDark};
  display: flex;
  align-items: center;
  padding: 0 ${layout.MAIN_PADDING}px;
`;

const Footer = () => (
  <section css={footerCss}>
    <h2>© Cat 2019</h2>
  </section>
);

export default Footer;
