import { css, jsx } from '@emotion/core'; /** @jsx jsx */
import { gloria } from './styles';

const homeCss = css`
  background: url("assets/home.jpg") no-repeat top center;
  background-size: cover;
  height: 60vw;
  ${gloria}
  position: relative;
  header {
    width: 100%;
    position: absolute;
    text-align: center;
    top: 30%;
    font-size: 72px;
    text-shadow: 2px 2px deepskyblue;
  }
  article {
    width: 100%;
    position: absolute;
    text-align: center;
    top: 60%;
    font-size: 36px;
    text-shadow: 1px 1px deepskyblue;
  }
  .filter {
    background: white;
    height: 100%;
    width: 100%;
    opacity: 0.45;
  }
`;

const Home = () => (
  <section css={homeCss}>
    <div className='filter' />
    <header>Hi, I'm Catherine!</header>
    <article>
      I love building cool things on the web.
    </article>
  </section>
);

export default Home;
