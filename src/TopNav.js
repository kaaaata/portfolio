import React from 'react';
import { withRouter } from 'react-router';
import { css, jsx } from '@emotion/core'; /** @jsx jsx */
import { colors, fonts, zIndex, layout } from './styles';
import { Filter, Link } from './particles';

const topNavCss = css`
  position: fixed;
  width: 100%;
  height: 65px;
  z-index: ${zIndex.stickyNav};
  opacity: 1;
  font-size: 24px;
  color: white;

  .topNavContent {
    position: absolute;
    padding: 0 40px;
    height: 100%;
    z-index: ${zIndex.stickyNavContent};
  }

  .filter {
    z-index: ${zIndex.stickyNavFilter};
  }

  a {
    height: 100%;
    ${layout.flexCenter};
  }
`;

const HomeButton = () => (
  <Link href='/'>
    <div className='top_nav__home'>
      Home
    </div>
  </Link>
);

const TopNav = ({
  location
}) => {
  return (
    <section css={topNavCss}>
      <Filter
        color={colors.slateDark}
        opacity={0.75}
      />
      <div className='topNavContent'>
        <HomeButton />
      </div>
    </section>
  );
};

export default withRouter(TopNav);
