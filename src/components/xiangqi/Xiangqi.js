import React from 'react';
import { jsx } from '@emotion/core'; /** @jsx jsx */
// import { xiangqiCss } from './xiangqiCss';
import Board from './Board';

class Xiangqi extends React.Component {
  constructor() {
    super();
    this.state = {
      //
    };
  }

  render() {
    return <Board />;
  }
}

export default Xiangqi;
