import React from 'react';
import { Link } from 'react-router-dom';
import { css, jsx } from '@emotion/core'; /** @jsx jsx */
import { graphqlQuery, increaseNum } from './utils/graphql';

const color = '';
const emotionCss = css`
  background-color: hotpink;
  &:hover {
    color: ${color};
  }
`;
class About extends React.Component {
  constructor() {
    super();
    this.state = {
      num: 'unset'
    };
  }

  async componentDidMount() {
    const { num } = await graphqlQuery(`{num}`);
    this.setState({ num });
  }

  async increaseNum(increment) {
    const data = await increaseNum(increment);
    this.setState({ num: data.increaseNum });
  }

  render() {
    return (
      <section>
        About page!
        <Link to='/about'>
          go to another page
        </Link>

        <div
          css={emotionCss}
        >
          Num = {this.state.num}
        </div>
        <button type='button' onClick={() => this.increaseNum(5)}>increase num</button>
      </section>
    );
  }
}

export default About;
