import { jsx } from '@emotion/core'; /** @jsx jsx */
import { Link, FlexContainer, FlexItem, Button } from '../particles';
import { trackStats } from '../utils/graphql';
import { topNavCss, mediaIconsCss } from './topNavCss';
import { useSelector, shallowEqual } from 'react-redux';

const mediaIcons = [
  { image: 'linkedin.png', url: 'https://www.linkedin.com/in/kaaaata/' },
  { image: 'octocat.png', url: 'https://github.com/kaaaata/' },
  { image: 'twitter.png', url: 'https://twitter.com/da_real_kata/' },
  { image: 'facebook.png', url: 'https://www.facebook.com/blueconiferforest/' }
];

const BackButton = () => {
  const { pathname } = useSelector(state => ({
    pathname: state.coresite.currentRoute.pathname,
  }), shallowEqual);

  let destination = null;
  if (['/', undefined].includes(pathname)) {
    destination = null;
  } else if (['/cube'].includes(pathname)) {
    destination = '/projects';
  } else if (['/projects', '/copypaster'].includes(pathname)) {
    destination = '/';
  }
  
  return destination && (
    <Button href={destination}>{`<- Back`}</Button>
  );
};

const MediaIcons = () => mediaIcons.map(media => (
  <Link
    key={media.image}
    href={media.url}
    onClick={() => trackStats('click_media_icon', media.image.split('.')[0])}
  >
    <div css={mediaIconsCss(media.image)} />
  </Link>
));

export const TopNav = () => (
  <section css={topNavCss}>
    <FlexContainer
      alignItems='center'
      className='content'
    >
      <BackButton />
      <FlexItem />
      <MediaIcons />
    </FlexContainer>
  </section>
);
