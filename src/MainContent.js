import { css, jsx } from '@emotion/core'; /** @jsx jsx */
import { colors } from './styles';
import Skills from './Skills';
import Contact from './Contact';

const mainContentCss = css`
  hr {
    color: ${colors.grey};
    border-bottom: none;
  }
`;

const MainContent = () => (
  <section css={mainContentCss}>
    <Skills /><hr />
    <Contact />
  </section>
);

export default MainContent;
