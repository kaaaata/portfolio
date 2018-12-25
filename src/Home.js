import { Link } from 'react-router-dom';
import { css, jsx } from '@emotion/core'; /** @jsx jsx */

const color = '';
const emotionCss = css`
  background-color: hotpink;
  &:hover {
    color: ${color};
  }
`;
const Home = () => (
  <section>
    home page!
    <Link to='/about'>
      go to another page
    </Link>

    <div
      css={emotionCss}
    >
      This has a hotpink background.
    </div>
  </section>
);

export default Home;
