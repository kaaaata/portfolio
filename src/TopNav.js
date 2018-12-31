import React from 'react';
import { css, jsx } from '@emotion/core'; /** @jsx jsx */
import { colors, fonts, zIndex } from './styles';
import { Filter } from './particles';

const topNavCss = css`
  position: fixed;
  width: 100%;
  height: 40px;
  z-index: ${zIndex.stickyNav};
  opacity: 1;

  .topNavContent {
    position: absolute;
    z-index: ${zIndex.stickyNavContent};
  }

  .filter {
    z-index: ${zIndex.stickyNavFilter};
  }
`;

const TopNav = () => {
  return (
    <section css={topNavCss}>
      <Filter
        color={colors.slateDark}
        opacity={0.5}
      />
      <div className='topNavContent'>
        a b c d
      </div>
    </section>
  );
};

export default TopNav;
