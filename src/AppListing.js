import React from 'react';
import { css, jsx } from '@emotion/core'; /** @jsx jsx */
import { colors, layout } from './styles';
import { Filter, Link } from './particles';

const appListings = [
  {
    name: 'Portfolio',
    thumb: 'invoker.png',
    href: 'http://www.kaaaata.com'
  },
  {
    name: 'Copypaster',
    thumb: 'copy.jpg',
    href: '/copypaster',
    ribbon: 'New!'
  },
  {
    name: 'Jelly',
    thumb: 'jelly.png',
    href: 'http://jellyfishapp.herokuapp.com',
  },
  {
    name: 'Big 2',
    thumb: 'cards.png',
    href: 'https://catsbig2.herokuapp.com'
  }
];

const Ribbon = ({
  text
}) => {
  const ribbonCss = css`
    background: ${colors.slate};
    color: white;
    width: 200px;
    height: 30px;
    transform: rotate(45deg);
    ${layout.absolute('25px', '-50px')}
    ${layout.flexCenter}
    font-size: 16px;
    box-shadow: 2px 2px 16px ${colors.slate};
    user-select: none;
  `;

  return (
    <div css={ribbonCss}>
      <div>{text}</div>
    </div>
  );
};

const AppThumb = ({
  application
}) => {
  const { thumb, ribbon, href } = application;

  const appThumbCss = css`
    background: url("assets/${thumb}") no-repeat center center;
    background-size: cover;
    background-color: ${colors.greenLight};
    width: 300px;
    height: 200px;
    display: inline-block;
    margin: 0 15px 15px 0;
    position: relative;
    transition: transform 0.25s ease-out;
    box-shadow: 1px 1px 1px black;
    overflow: hidden;

    &:hover {
      transform: scale(1.1);
    }
  `;

  return (
    <Link href={href}>
      <article css={appThumbCss}>
        <Filter opacity={ribbon === 'Coming Soon!' ? 0.75 : 0.1} />
        {!!ribbon && <Ribbon text={ribbon} />}
      </article>
    </Link>
  );
};

const AppListing = () => (
  <section>
    {appListings.map(application => (
      <AppThumb application={application} key={application.name} />
    ))}
  </section>
);

export default AppListing;
