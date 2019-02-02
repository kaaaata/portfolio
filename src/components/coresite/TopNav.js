import { jsx } from '@emotion/core'; /** @jsx jsx */
import { Link, FlexContainer, FlexItem } from '../particles';
import SidebarToggle from './SidebarToggle';
import { trackStats } from '../utils/graphql';
import { topNavCss, mediaIconsCss } from './topNavCss';

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
    <div css={mediaIconsCss(media.image)} />
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
