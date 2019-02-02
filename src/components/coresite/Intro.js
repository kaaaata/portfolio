import React from 'react';
import { jsx } from '@emotion/core'; /** @jsx jsx */
import { Image, Button } from '../particles';
import { layout } from '../styles';
import Snake from './Snake';
import { trackStats } from '../utils/graphql';
import { introCss, secretCss } from './introCss';

class Intro extends React.Component {
  constructor() {
    super();
    this.state = {
      isSecretFound: false
    };
  }

  render() {
    const secret = (
      <div
        className='secret'
        id='secret'
        css={secretCss(this.state.isSecretFound)}
      >
        <Button
          text='Click Me'
          onClick={() => {
            this.setState({ isSecretFound: true });
            trackStats('found_secret');
          }}
        />
      </div>
    );
    const logo = (
      <Image
        src='logo.png'
        width={[500, 420, 320 - layout.MAIN_PADDING_PHONE * 2]}
        height={[750, 750, 500]}
      />
    );

    return (
      <section
        id='intro'
        css={introCss}
      >
        {secret}
        {this.state.isSecretFound
          ? <Snake />
          : logo
        }
      </section>
    );
  }
}

export default Intro;
