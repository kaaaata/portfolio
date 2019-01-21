import { css, jsx } from '@emotion/core'; /** @jsx jsx */
import { withRouter } from 'react-router';
import { noop, omit } from 'lodash';
import { HashLink } from 'react-router-hash-link';

const linkCss = css`
  color: inherit;
  width: initial;
  cursor: pointer;
  text-decoration: none;
`;

const Link = (props) => {
  const { href, onClick = noop, children, location } = props;
  const otherProps = omit(props, ['href', 'onClick', 'children', 'location']);

  if (!children) return null;

  const useReactRouter = href.startsWith('/');
  const useReactRouterHashLink = useReactRouter && href.includes('#');
  const isSameRoute = href === `${location.pathname}${location.hash}`;

  const linkOnClick = () => {
    onClick();

    if (isSameRoute && !useReactRouterHashLink) {
      window.scroll(0, 0);
    }
  };

  return useReactRouterHashLink ? (
    <HashLink
      to={href}
      css={linkCss}
      onClick={linkOnClick}
      smooth
      {...otherProps}
    >
      {children}
    </HashLink>
  ) : (
    <a
      href={isSameRoute ? null : href}
      target={useReactRouter ? null : '_blank'}
      rel='noopener noreferrer'
      css={linkCss}
      onClick={linkOnClick}
      {...otherProps}
    >
      {children}
    </a>
  );
};

export default withRouter(Link);
