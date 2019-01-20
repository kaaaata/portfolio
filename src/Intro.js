import React from 'react';
import { css, jsx } from '@emotion/core'; /** @jsx jsx */
import { Image, Button } from './particles';
import { zIndex, effects } from './styles';
import Snake from './Snake';

const introCss = css`
  overflow: hidden;
  height: 625px;

  .image {
    ${effects.flicker}
    ${effects.rainbow}
    animation: flicker 4s ease-out infinite, rainbow 9s linear infinite;
    margin: auto;
  }
`;
const secretCss = isSecretFound => css`
  visibility: ${isSecretFound ? 'hidden' : 'unset'};
  display: none;
  z-index: ${zIndex.mouseEventAreaForeground};
  position: absolute;
  top: 50%;
  left: 50%;
`;

class Intro extends React.Component {
  constructor() {
    super();
    this.state = {
      isSecretFound: false,
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
          onClick={() => this.setState({ isSecretFound: true })}
        />
      </div>
    );

    return (
      <section
        id='intro'
        css={introCss}
      >
        {secret}
        {this.state.isSecretFound ? (
          <Snake />
        ) : (
          <Image
            src='logo.png'
            width={[500, 420, 320]}
            height={750}
          />
        )}
      </section>
    );
  }
}

export default Intro;
