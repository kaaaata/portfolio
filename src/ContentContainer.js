import React from 'react';
import { css, jsx } from '@emotion/core'; /** @jsx jsx */

const contentContainerCss = css`
  flex-grow: 1;
`;

const Home = () => {
  return (
    <section css={contentContainerCss}>
      <h2>
        Hi! My name is Cat. I am a software engineer based in San Francisco.
      </h2>
      <div style={{ height: '100px' }}>filler</div>
      <div style={{ height: '100px' }}>filler</div>
      <div style={{ height: '100px' }}>filler</div>
      <div style={{ height: '100px' }}>filler</div>
      <div style={{ height: '100px' }}>filler</div>
      <div style={{ height: '100px' }}>filler</div>
      <div style={{ height: '100px' }}>filler</div>
      <div style={{ height: '100px' }}>filler</div>
      <div style={{ height: '100px' }}>filler</div>
      <div style={{ height: '100px' }}>filler</div>
      <div style={{ height: '100px' }}>filler</div>
      <div style={{ height: '100px' }}>filler</div>
      <div style={{ height: '100px' }}>filler</div>
      <br />
    </section>
  );
};

export default Home;
