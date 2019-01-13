import React from 'react';
import { css, jsx } from '@emotion/core'; /** @jsx jsx */
import { colors, layout } from './styles';

const sideNavCss = isNavOpen => css`
  width: ${isNavOpen ? '300px' : '40px'};
  height: ${isNavOpen ? '500px' : '40px'};
  background: ${isNavOpen ? colors.blackDark : 'unset'};
  margin-right: ${layout.MAIN_PADDING}px;
  position: sticky;
  top: ${layout.TOP_NAV_HEIGHT + layout.MAIN_PADDING}px;
  transition: all 0.25s ease-out;
`;
const sideNavToggleCss = isNavOpen => css`
  width: 40px;
  height: 25px;
  position: relative;
  cursor: pointer;

  .three_bar {
    width: 100%;
    height: 5px;
    background: ${colors.white};
    position: absolute;
    transition: all 0.25s ease-out;

    &.three_bar--top {
      transform: ${isNavOpen ? 'rotate(45deg)' : 'unset'};
      top: ${isNavOpen ? '10px' : 0};
    }

    &.three_bar--center {
      top: 10px;
      opacity: ${isNavOpen ? 0 : 1};
    }

    &.three_bar--bottom {
      transform: ${isNavOpen ? 'rotate(-45deg)' : 'unset'};
      top: ${isNavOpen ? '10px' : '20px'};
    }
  }
`;

class SideNav extends React.Component {
  constructor() {
    super();
    this.state = {
      isNavOpen: true,
    };
  }

  render() {
    const { isNavOpen } = this.state;

    const sideNavToggle = (
      <div
        css={sideNavToggleCss(isNavOpen)}
        onClick={() => this.setState({ isNavOpen: !isNavOpen })}
      >
        <div className='three_bar three_bar--top' />
        <div className='three_bar three_bar--center' />
        <div className='three_bar three_bar--bottom' />
      </div>
    );

    return (
      <section css={sideNavCss(isNavOpen)}>
        {sideNavToggle}
      </section>
    );
  }
}

export default SideNav;
