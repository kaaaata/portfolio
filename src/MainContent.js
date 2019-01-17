import React from 'react';
import { css, jsx } from '@emotion/core'; /** @jsx jsx */
import { colors } from './styles';
import { Spacer } from './particles';
import Skills from './Skills';
import Contact from './Contact';
import Intro from './Intro';

const contentDividerCss = css`
  color: ${colors.grey};
  border-bottom: none;
  max-width: 500px;
`;

const ContentDivider = () => <>
  <Spacer height={75} />
  <hr css={contentDividerCss} />
  <Spacer height={75} />
</>;

const MainContent = () => (
  <section>
    <Intro />
    <Skills /><ContentDivider />
    <Contact />
    <Spacer height={75} />
  </section>
);

export default MainContent;
