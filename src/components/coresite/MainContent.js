import { css, jsx } from '@emotion/core'; /** @jsx jsx */
import { Spacer } from '../particles';
import { Skills } from './Skills';
import { Intro } from './Intro';
import { Biography } from './Biography';

const mainContentCss = css`
  margin: auto;
`;

const ContentDivider = () => (
  <Spacer height={[120, 80, 40]} />
);

export const MainContent = () => (
  <section css={mainContentCss}>
    <Intro /><ContentDivider />
    <Biography /><ContentDivider />
    <Skills /><ContentDivider />
  </section>
);
