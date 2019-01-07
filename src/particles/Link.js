import { css, jsx } from '@emotion/core'; /** @jsx jsx */
import { withRouter } from 'react-router';
import { noop, omit } from 'lodash';

const Link = (props) => {
  const { href, location, children, onClick = noop } = props;
  const otherProps = omit(props, ['href', 'location', 'children', 'onClick']);

  if (!children) return null;

  const linkCss = css`
    color: inherit;
    cursor: pointer;
    text-decoration: none;
  `;
  const isSameRoute = href === location.pathname;
  const useReactRouter = href.startsWith('/');

  const linkOnClick = () => {
    onClick();

    if (isSameRoute) window.scroll(0, 0);
  };

  return (
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
