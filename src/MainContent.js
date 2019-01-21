import React from 'react';
import { css, jsx } from '@emotion/core'; /** @jsx jsx */
import { colors } from './styles';
import { Spacer } from './particles';
import Skills from './Skills';
import Contact from './Contact';
import Intro from './Intro';
import Biography from './Biography';

const mainContentCss = css`
  margin: auto;
`;
const contentDividerCss = css`
  color: ${colors.grey};
  border-bottom: none;
  max-width: 250px;
`;

const ContentDivider = () => <>
  <Spacer height={[120, 80, 40]} />
  <hr css={contentDividerCss} />
  <Spacer height={[120, 80, 40]} />
</>;

const MainContent = () => (
  <section css={mainContentCss}>
    <Intro /><ContentDivider />
    <Biography /><ContentDivider />
    <Skills /><ContentDivider />
    <Contact />
    <Spacer height={[120, 80, 40]} />
  </section>
);

export default MainContent;
