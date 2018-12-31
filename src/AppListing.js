import React from 'react';
import { css, jsx } from '@emotion/core'; /** @jsx jsx */
import { colors, layout } from './styles';
import { Filter, Link } from './particles';

const appListings = [
  {
    name: 'Portfolio',
    thumb: 'invoker.png',
    href: 'http://www.kaaaata.com',
    github: 'https://github.com/kaaaata/portfolio/tree/old'
  },
  {
    name: 'Copypaster',
    thumb: 'copy.jpg',
    href: '/copypaster',
    ribbon: 'New!',
    github: 'https://github.com/kaaaata/portfolio/tree/dev'
  },
  {
    name: 'Jelly',
    thumb: 'jelly.png',
    href: 'http://jellyfishapp.herokuapp.com',
    github: 'https://github.com/kaaaata/jelly'
  },
  {
    name: 'Big 2',
    thumb: 'cards.png',
    href: 'https://catsbig2.herokuapp.com',
    github: 'https://github.com/kaaaata/big-2'
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
  const { thumb, ribbon, href, github } = application;

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

    a {
      opacity: 0;
      transition: opacity 0.5s ease-out;

      .octocat {
        ${layout.absolute(null, '5px', '5px')}
        width: 40px;
        height: 40px;
        background: url("assets/octocat.png") no-repeat center center;
        background-size: cover;
        transition: transform 0.25s ease-out;
  
        &:hover {
          transform: scale(1.1);
        }
      }
    }

    &:hover {
      transform: scale(1.1);

      a {
        opacity: 1;
      }
    }
  `;

  return (
    <Link href={href}>
      <article css={appThumbCss}>
        <Filter color='black' opacity={0.15} />
        {!!ribbon && <Ribbon text={ribbon} />}
        <Link href={github}>
          <div className='octocat' />
        </Link>
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
