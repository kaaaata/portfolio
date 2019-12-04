import { css, jsx } from '@emotion/core'; /** @jsx jsx */
import { noop } from 'lodash';
import { Link as ReactRouterLink } from 'react-router-dom';
import { HashLink as ReactRouterHashLink } from 'react-router-hash-link';
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

  if (!children) {
    return null;
  } else if (!href) {
    // onClick not passed down to links without href
    return (
      <span css={linkCssNoHref}>
        {children}
      </span>
    );
  }

  const useReactRouter = href.startsWith('/');
  const useReactRouterHashLink = useReactRouter && href.includes('#');
  const isSameRoute = href === `${currentRoute.pathname}${currentRoute.hash}`;

  const linkOnClick = () => {
    onClick();
    setIsSidebarVisible(false);

    if (useReactRouter && !useReactRouterHashLink && isSameRoute) {
      window.scroll(0, 0);
    }
  };

  if (useReactRouterHashLink) {
    return (
      <ReactRouterHashLink
        to={href}
        css={linkCss}
        onClick={linkOnClick}
        smooth
      >
        {children}
      </ReactRouterHashLink>
    );
  } else if (useReactRouter) {
    return (
      <ReactRouterLink
        to={href}
        css={linkCss}
        onClick={linkOnClick}
      >
        {children}
      </ReactRouterLink>
    );
  } else {
    return (
      <a
        href={href}
        target='_blank'
        rel='noopener noreferrer'
        css={linkCss}
        onClick={linkOnClick}
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

export const Link = connect(mapStateToProps, mapDispatchToProps)(LinkComponent);
