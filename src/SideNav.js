import React from 'react';
import { css, jsx } from '@emotion/core'; /** @jsx jsx */
import { colors, layout, mq, zIndex } from './styles';
import { Link, Spacer } from './particles';

// todo: change height to fit-content once there's enough stuff in the sidebar
const sideNavCss = isNavOpen => css`
  width: ${isNavOpen ? '30vw' : '40px'};
  height: ${isNavOpen ? '300px' : '40px'};
  background: ${isNavOpen ? colors.blackDark : 'unset'};
  flex: none;
  max-width: 250px;
  position: fixed;
  z-index: ${zIndex.stickyNav};
  top: ${layout.TOP_NAV_HEIGHT + layout.MAIN_PADDING}px;
  transition: all 0.25s ease-out;

  ${mq.phoneAndTablet(`
    display: none;
  `)}
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
const sideNavLinksCss = isNavOpen => css`
  display: ${isNavOpen ? 'unset' : 'none'};
  
  div {
    margin-top: 5px;
  }
`;

class SideNav extends React.Component {
  constructor() {
    super();
    this.state = {
      isNavOpen: false,
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
        <Spacer height={15} />
        <article css={sideNavLinksCss(isNavOpen)}>
          <Link href='/#intro'><div>Top</div></Link>
          <Link href='/#bio'><div>Bio</div></Link>
          <Link href='/#skills'><div>Skills</div></Link>
          <Link href='/#contact'><div>Contact</div></Link>
        </article>
      </section>
    );
  }
}

export default SideNav;
