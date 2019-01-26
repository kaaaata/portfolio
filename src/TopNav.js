import { css, jsx } from '@emotion/core'; /** @jsx jsx */
import { colors, zIndex, layout, mq } from './styles';
import { Link, FlexContainer, FlexItem } from './particles';
import { SidebarToggle } from './components';
import { trackStats } from './utils/graphql';

const topNavCss = css`
  position: fixed;
  width: 100%;
  height: ${layout.TOP_NAV_HEIGHT}px;
  z-index: ${zIndex.stickyNav};
  background: ${colors.blackDark};

  .top_nav__content {
    padding: 0 ${layout.MAIN_PADDING}px;
    height: 100%;
    z-index: ${zIndex.stickyNavContent};
    width: 100%;
    
    h2 {
      margin-right: 10px;

      ${mq.phone(`
        margin-right: 5px;
      `)}
    }
  
    a {
      height: 100%;
      ${layout.flexCenter};

      .filter {
        z-index: ${zIndex.stickyNavFilter};
      }

      &:hover {
        div {
          transform: scale(1.2);
        }
      }
    }
  }
`;
const mediaIconsCss = image => css`
  background: url("assets/${image}") no-repeat center center;
  background-size: cover;
  width: 20px;
  height: 20px;
  filter: invert(100%);
  transition: transform 0.25s ease-out;
  margin: 0 10px;

  ${mq.phone(`
    margin: 0 5px;
  `)}
`;

const mediaIcons = [
  { image: 'linkedin.png', url: 'https://www.linkedin.com/in/kaaaata/' },
  { image: 'octocat.png', url: 'https://github.com/kaaaata/' },
  { image: 'facebook.png', url: 'https://www.facebook.com/blueconiferforest/' },
  { image: 'dotabuff.png', url: 'https://www.dotabuff.com/players/125258124/' },
  { image: 'steam.png', url: 'https://steamcommunity.com/id/KATA-' }
];

const MediaIcons = () => mediaIcons.map(media => (
  <Link
    key={media.image}
    href={media.url}
    onClick={() => trackStats('click_media_icon', media.image.split('.')[0])}
  >
    <div
      css={mediaIconsCss(media.image)}
    />
  </Link>
));

const TopNav = () => (
  <section css={topNavCss}>
    <FlexContainer
      alignItems='center'
      className='top_nav__content'
    >
      <SidebarToggle />
      <FlexItem />
      <MediaIcons />
    </FlexContainer>
  </section>
);

export default TopNav;
