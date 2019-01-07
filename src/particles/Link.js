import React from 'react';
import { css, jsx } from '@emotion/core'; /** @jsx jsx */
import { withRouter } from 'react-router';
import { noop, omit } from 'lodash';

const Link = (props) => {
  const { href, location, children } = props;
  const otherProps = omit(props, ['href', 'location', 'children']);

  if (!children) return null;

  const linkCss = css`
    color: inherit;
    cursor: pointer;
    text-decoration: none;
  `;
  const isSameRoute = href === location.pathname;
  const useReactRouter = href.startsWith('/');
  const scrollToTop = isSameRoute
    ? () => window.scroll(0, 0)
    : noop;

  return (
    <a
      href={isSameRoute ? null : href}
      target={useReactRouter ? null : '_blank'}
      rel='noopener noreferrer'
      css={linkCss}
      onClick={scrollToTop}
      {...otherProps}
    >
      {children}
    </a>
  );
};

export default withRouter(Link);
