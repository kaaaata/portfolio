import React from 'react';
import { css, jsx } from '@emotion/core'; /** @jsx jsx */
import { connect } from 'react-redux';
import { colors, layout, mq, zIndex } from './styles';
import { Link, Filter } from './particles';

const sidebarCss = isSidebarVisible => css`
  width: ${isSidebarVisible ? '250px' : 0};
  background: ${colors.blackMediumDark};
  height: 100%;
  box-shadow: 0 5px 15px ${colors.blackDark};
  position: fixed;
  z-index: ${zIndex.stickyNav};
  top: ${layout.TOP_NAV_HEIGHT}px;
  left: 0;
  overflow: hidden;
  transition: width 0.25s ease-out;

  ${mq.phoneAndTablet(`
    display: none;
  `)}
`;
const sidebarLinksCss = isSidebarVisible => css`
  white-space: nowrap;
  height: 40px;
  background: ${isSidebarVisible ? colors.green : colors.blackMediumDark};
  transition: background 0.75s ease-out;
  ${layout.flexCenter}

  .filter {
    height: 40px;
    z-index: ${zIndex.stickyNavFilter};
  }

  .sidebar_link--text {
    position: relative;
    z-index: ${zIndex.stickyNavContent};
  }
`;


const sidebarSections = [
  [
    { href: null, text: 'Homepage' },
    { href: '/#intro', text: 'Home' },
    { href: '/#resume', text: 'Resume' },
    { href: '/#skills', text: 'Skills' },
    { href: '/#contact', text: 'Contact' }
  ],
  [
    { href: null, text: 'Misc' },
    { href: '/copypaster', text: 'A Text Box' }
  ]
];

const Sidebar = ({ isSidebarVisible }) => (
  <section css={sidebarCss(isSidebarVisible)}>
    {sidebarSections.map((links, index) => (
      <React.Fragment key={index}>
        {links.map((link, i) => (
          <Link
            href={link.href}
            key={i}
          >
            <div
              className={`sidebar_link ${!i ? 'sidebar_link--title' : ''}`}
              css={sidebarLinksCss(isSidebarVisible)}
            >
              <Filter
                color={colors.blackMediumDark}
                opacity={link.href ? (0.5 + (i + 1) * 0.05) : 1}
              />
              <div className='sidebar_link--text'>
                {link.text}
              </div>
            </div>
          </Link>
        ))}
      </React.Fragment>
    ))}
  </section>
);

const mapStateToProps = state => ({
  isSidebarVisible: state.isSidebarVisible,
});

export default connect(mapStateToProps)(Sidebar);
