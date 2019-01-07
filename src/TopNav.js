import React from 'react';
import { css, jsx } from '@emotion/core'; /** @jsx jsx */
import { colors, fonts, zIndex, layout, mq } from './styles';
import { Filter, Link, FlexSpacer } from './particles';

const topNavCss = css`
  position: fixed;
  width: 100%;
  height: 65px;
  z-index: ${zIndex.stickyNav};
  opacity: 1;
  font-size: 24px;
  color: white;

  .top_nav__content {
    position: absolute;
    padding: 0 40px;
    height: 100%;
    z-index: ${zIndex.stickyNavContent};
    display: flex;
    align-items: center;
    width: 100%;
  }

  .filter {
    z-index: ${zIndex.stickyNavFilter};
  }

  a {
    height: 100%;
    ${layout.flexCenter};
  }
`;

const mediaIcons = [
  { image: 'linkedin.png', url: 'https://www.linkedin.com/in/kaaaata/' },
  { image: 'octocat.png', url: 'https://github.com/kaaaata/' },
  { image: 'facebook.png', url: 'https://www.facebook.com/blueconiferforest/' },
  { image: 'dotabuff.png', url: 'https://www.dotabuff.com/players/125258124/' }
];

const HomeButton = () => (
  <Link href='/'>
    <div css={css`margin-right: 20px;`}>
      Catherine Han
    </div>
  </Link>
);

const MediaIcons = () => mediaIcons.map(media => (
  <Link
    key={media.image}
    href={media.url}
    css={css`
      &:hover {
        div {
          transform: scale(1.25);
        }
      }
    `}
  >
    <div
      css={css`
        background: url("assets/${media.image}") no-repeat center center;
        background-size: cover;
        width: 25px;
        height: 25px;
        margin-left: 25px;
        filter: invert(100%);
        transition: transform 0.25s ease-out;

        ${mq.phone(`
          margin-left: 5px;
        `)}
      `}
    />
  </Link>
));

const TopNav = () => (
  <section css={topNavCss}>
    <Filter
      color={colors.red}
      opacity={0.75}
    />
    <div className='top_nav__content'>
      <HomeButton />
      <FlexSpacer />
      <MediaIcons />
    </div>
  </section>
);

export default TopNav;
