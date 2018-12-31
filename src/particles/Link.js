import React from 'react';
import { css, jsx } from '@emotion/core'; /** @jsx jsx */
import { withRouter } from 'react-router';

const Link = ({
  href, children, location
}) => {
  if (!children) return null;

  const linkCss = css`
    color: inherit;
    cursor: pointer;
  `;

  return (
    <a
      href={href === location.pathname ? null : href}
      target={href.startsWith('/') ? null : '_blank'}
      rel='noopener noreferrer'
      css={linkCss}
    >
      {children}
    </a>
  );
};

export default withRouter(Link);
