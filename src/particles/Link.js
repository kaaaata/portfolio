import { css, jsx } from '@emotion/core'; /** @jsx jsx */
import { connect } from 'react-redux';
import { noop, omit } from 'lodash';
import { Link } from 'react-router-dom';
import { HashLink } from 'react-router-hash-link';

const linkCss = css`
  color: inherit;
  width: initial;
  cursor: pointer;
  text-decoration: none;
`;
const linkCssNoHref = css`
  cursor: default;
`;

const LinkComponent = (props) => {
  const { href, onClick = noop, children, currentRoute } = props;
  const otherProps = omit(props, ['href', 'onClick', 'children', 'currentRoute', 'dispatch']);

  if (!children) {
    return null;
  } else if (!href) {
    return (
      <span
        css={linkCssNoHref}
        onClick={onClick}
        {...otherProps}
      >
        {children}
      </span>
    );
  }

  const useReactRouter = href.startsWith('/');
  const useReactRouterHashLink = useReactRouter && href.includes('#');
  const isSameRoute = href === `${currentRoute.pathname}${currentRoute.hash}`;

  const linkOnClick = () => {
    onClick();

    if (isSameRoute && !useReactRouterHashLink) {
      window.scroll(0, 0);
    }
  };

  if (useReactRouterHashLink) {
    return (
      <HashLink
        to={href}
        css={linkCss}
        onClick={linkOnClick}
        smooth
        {...otherProps}
      >
        {children}
      </HashLink>
    );
  } else if (useReactRouter) {
    return (
      <Link
        to={href}
        css={linkCss}
        onClick={linkOnClick}
        {...otherProps}
      >
        {children}
      </Link>
    );
  } else {
    return (
      <a
        href={href}
        target='_blank'
        rel='noopener noreferrer'
        css={linkCss}
        onClick={linkOnClick}
        {...otherProps}
      >
        {children}
      </a>
    );
  }
};

const mapStateToProps = state => ({
  currentRoute: state.currentRoute
});

export default connect(mapStateToProps)(LinkComponent);
