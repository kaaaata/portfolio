import React from 'react';
import { css, jsx } from '@emotion/core'; /** @jsx jsx */
import { withRouter } from 'react-router';
import { noop } from 'lodash';

const Link = ({
  href, children, location
}) => {
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
    >
      {children}
    </a>
  );
};

export default withRouter(Link);
