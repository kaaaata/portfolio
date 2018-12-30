import React from 'react';
import { css, jsx } from '@emotion/core'; /** @jsx jsx */
import { colors, layout } from './styles';
import { Filter, Link } from './particles';

const appListings = [
  {
    name: 'Portfolio Site',
    thumb: 'cat.png',
    href: 'http://www.kaaaata.com',
    ribbon: 'External'
  },
  {
    name: 'Jelly',
    thumb: 'jelly.png',
    href: 'http://jellyfishapp.herokuapp.com',
    ribbon: 'External'
  }
];

const CornerRibbon = ({
  color, text
}) => {
  const cornerRibbonCss = css`
    background: ${color};
    width: 200px;
    height: 40px;
    transform: rotate(45deg);
    ${layout.absolute('25px', '-50px')}
    ${layout.flexCenter}
    font-size: 16px;
    box-shadow: 2px 2px 16px ${colors.slate};
    user-select: none;
  `;

  return (
    <div css={cornerRibbonCss}>
      <div>{text}</div>
    </div>
  );
};

const AppThumb = ({
  application
}) => {
  const { name, thumb, ribbon, href } = application;

  const appThumbCss = css`
    background: url("assets/${thumb}") no-repeat top center;
    background-size: cover;
    width: 200px;
    height: 300px;
    display: inline-block;
    margin: 0 20px 20px 0;
    position: relative;
    transition: transform 0.25s ease-out;
    border-radius: 5px;
    box-shadow: 4px 4px 8px ${colors.darkSlate};
    overflow: hidden;

    &:hover {
      transform: scale(1.1);
    }

    span {
      position: absolute;
      bottom: 20px;
      text-align: center;
      width: 100%;
      font-size: 24px;
    }
  `;

  return (
    <Link href={href} key={name}>
      <article css={appThumbCss} key={name}>
        <Filter opacity={ribbon === 'Coming Soon!' ? 0.75 : 0.25} />
        {!!ribbon && <CornerRibbon color={colors.blue} text={ribbon} />}
        <span>{name}</span>
      </article>
    </Link>
  );
};

const AppListing = () => (
  <section>
    {appListings.map(application => (
      <AppThumb application={application} />
    ))}
  </section>
);

export default AppListing;
