import { css, jsx } from '@emotion/core'; /** @jsx jsx */
import { colors, layout } from './styles';
import { Filter, Link } from './particles';

const appListings = [
  {
    name: 'Snake',
    thumb: 'snake.png',
    href: '/snake',
    github: 'https://github.com/kaaaata/portfolio/tree/dev'
  },
  {
    name: 'A Text Box',
    thumb: 'copy.jpg',
    href: '/copypaster',
    github: 'https://github.com/kaaaata/portfolio/tree/dev'
  },
  {
    name: 'Terminal Clone',
    thumb: 'jelly.png',
    href: 'http://jellyfishapp.herokuapp.com',
    github: 'https://github.com/kaaaata/jelly'
  },
  {
    name: 'Big 2',
    thumb: 'cards.png',
    href: 'https://catsbig2.herokuapp.com',
    github: 'https://github.com/kaaaata/big-2'
  },
  {
    name: 'Mood Tracker',
    thumb: 'daylogger.png',
    href: 'http://day-logger.herokuapp.com',
    github: 'https://github.com/kaaaata/day-logger'
  }
];

const AppThumb = ({
  application
}) => {
  const { name, thumb, href, github } = application;

  const appThumbCss = css`
    background: url("assets/${thumb}") no-repeat center center;
    background-size: cover;
    background-color: ${colors.salmon};
    width: 200px;
    height: 150px;
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

    .ribbon {
      background: ${colors.purple};
      color: white;
      width: 200px;
      height: 35px;
      transform: rotate(40deg);
      ${layout.absolute('-25px', '-100px')}
      ${layout.flexCenter}
      font-size: 16px;
      box-shadow: 2px 2px 16px ${colors.purple};
      user-select: none;
      transition: all 0.5s ease-in-out;
      opacity: 0;
    }

    &:hover {
      transform: scale(1.1);

      a {
        opacity: 1;
      }

      .ribbon {
        ${layout.absolute('30px', '-45px')}
        opacity: 1;
      }
    }
  `;

  return (
    <Link href={href}>
      <article css={appThumbCss}>
        <Filter color='black' opacity={0.15} />
        <div className='ribbon'>
          <div>{name}</div>
        </div>
        <Link href={github}>
          <div className='octocat' />
        </Link>
      </article>
    </Link>
  );
};

const AppListing = () => (
  <section>
    <h2>
      Random Useless Side Projects
    </h2>
    {appListings.map(application => (
      <AppThumb application={application} key={application.name} />
    ))}
  </section>
);

export default AppListing;
