import { css, jsx } from '@emotion/core'; /** @jsx jsx */
import { montserrat } from './styles';

const homeCss = css`
  margin-left: 25px;
  background: url("assets/home.jpg") no-repeat top center;
  background-size: cover;
  height: 60vw;
  position: relative;
  ${montserrat}

  header {
    position: absolute;
    top: 30%;
    right: 15%;
    font-size: 48px;
  }

  article {
    position: absolute;
    top: 50%;
    right: 15%;
    font-size: 24px;
  }

  .filter {
    background: white;
    height: 100%;
    width: 100%;
    opacity: 0.25;
  }
`;

const Home = () => (
  <section css={homeCss}>
    <div className='filter' />
    <header>
      Catherine Han
    </header>
    <article>
      Software Engineer
    </article>
  </section>
);

export default Home;
