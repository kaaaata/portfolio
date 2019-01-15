import React from 'react';
import { css, jsx } from '@emotion/core'; /** @jsx jsx */
import { colors } from './styles';
import { Spacer } from './particles';
import Skills from './Skills';
import Contact from './Contact';

const ContentDivider = () => <>
  <Spacer height={75} />
  <hr
    css={css`
      color: ${colors.grey};
      border-bottom: none;
    `}
  />
  <Spacer height={75} />
</>;

const MainContent = () => (
  <section>
    <Skills /><ContentDivider />
    <Contact />
    <Spacer height={75} />
  </section>
);

export default MainContent;
