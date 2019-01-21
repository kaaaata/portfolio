import { css, jsx } from '@emotion/core'; /** @jsx jsx */
import { noop, omit } from 'lodash';
import { Link } from 'react-router-dom';
import { HashLink } from 'react-router-hash-link';
import { connect } from 'react-redux';
import * as actions from '../stores/actions';

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
  const {
    href, onClick = noop, children, currentRoute, setIsSidebarVisible
  } = props;
  const otherProps = omit(props, [
    'href', 'onClick', 'children', 'currentRoute', 'dispatch', 'setIsSidebarVisible'
  ]);

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

    if (useReactRouter && !useReactRouterHashLink) {
      if (isSameRoute) {
        window.scroll(0, 0);
      } else {
        setIsSidebarVisible(false);
      }
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
const mapDispatchToProps = dispatch => ({
  setIsSidebarVisible: payload => dispatch(actions.setIsSidebarVisible(payload)),
});

export default connect(mapStateToProps, mapDispatchToProps)(LinkComponent);
