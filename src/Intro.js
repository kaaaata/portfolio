import React from 'react';
import { css, jsx } from '@emotion/core'; /** @jsx jsx */
import { Image, Button } from './particles';
import { zIndex, effects, layout } from './styles';
import Snake from './Snake';

const introCss = css`
  overflow: hidden;

  .image {
    ${effects.flicker}
    ${effects.rainbow}
    animation: flicker 4s ease-out infinite, rainbow 10s linear infinite;
    margin: auto;
  }
`;
const secretCss = isSecretFound => css`
  visibility: ${isSecretFound ? 'hidden' : 'unset'};
  display: none;
  z-index: ${zIndex.mouseEventAreaForeground};
  position: absolute;
  top: 35%;
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
