import { css, jsx } from '@emotion/core'; /** @jsx jsx */
import { zIndex, colors } from './styles';

const footerCss = css`
  width: 100%;
  height: 56px;
  z-index: ${zIndex.stickyNav};
  opacity: 1;
  background: ${colors.red};
  display: flex;
  align-items: center;
  padding: 0 40px;
`;

const Footer = () => (
  <section css={footerCss}>
    <h2>© Cat 2019</h2>
  </section>
);

export default Footer;
