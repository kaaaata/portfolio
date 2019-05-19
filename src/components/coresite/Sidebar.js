import React from 'react';
import { jsx } from '@emotion/core'; /** @jsx jsx */
import { connect } from 'react-redux';
import { colors } from '../styles';
import { Link, Filter } from '../particles';
import { trackStats } from '../utils/graphql';
import { sidebarCss, sidebarLinksCss } from './sidebarCss';

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
    { href: '/copypaster', text: 'A Text Box' },
    // { href: '/xiangqi', text: 'Xiangqi' },
    // { href: '/song', text: 'Music Thing' }
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
            onClick={() => trackStats('sidebar_link_click', link.href)}
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
