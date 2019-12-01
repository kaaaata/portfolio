import { useState } from 'react';
import { jsx } from '@emotion/core'; /** @jsx jsx */
import { Image, Button } from '../particles';
import { layout } from '../styles';
import { Snake } from './Snake';
import { trackStats } from '../utils/graphql';
import { introCss, secretCss } from './introCss';

const Logo = () => (
  <Image
    src='logo.png'
    width={[500, 420, 320 - layout.MAIN_PADDING_PHONE * 2]}
    height={[750, 750, 500]}
  />
);

export const Intro = () => {
  const [isSecretFound, setIsSecretFound] = useState(false);

  const secret = (
    <div
      className='secret'
      id='secret'
      css={secretCss(isSecretFound)}
    >
      <Button
        onClick={() => {
          setIsSecretFound(true);
          trackStats('found_secret');
        }}
      >
        <h4>Click Me</h4>
      </Button>
    </div>
  );

  return (
    <section id='intro' css={introCss}>
      {secret}
      {isSecretFound ? <Snake /> : <Logo />}
    </section>
  );
};
