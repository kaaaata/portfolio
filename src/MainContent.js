import React from 'react';
import { css, jsx } from '@emotion/core'; /** @jsx jsx */
import { colors } from './styles';
import { Spacer } from './particles';
import Skills from './Skills';
import Contact from './Contact';
import Intro from './Intro';
import Biography from './Biography';

const contentDividerCss = css`
  color: ${colors.grey};
  border-bottom: none;
  max-width: 250px;
`;

const ContentDivider = () => <>
  <Spacer height={120} />
  <hr css={contentDividerCss} />
  <Spacer height={120} />
</>;

const MainContent = () => (
  <section>
    <Intro /><ContentDivider />
    <Biography /><ContentDivider />
    <Skills /><ContentDivider />
    <Contact />
    <Spacer height={120} />
  </section>
);

export default MainContent;
