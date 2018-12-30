import React from 'react';
import { css, jsx } from '@emotion/core'; /** @jsx jsx */

const Link = ({
  href, children
}) => {
  if (!children) return null;

  const linkCss = css`
    color: inherit;
  `;

  return (
    <a
      href={href}
      target='_blank'
      rel='noopener noreferrer'
      css={linkCss}
    >
      {children}
    </a>
  );
};

export default Link;
