import React from 'react';
import { jsx } from '@emotion/core'; /** @jsx jsx */
import { useSelector } from 'react-redux';
import { colors } from '../styles';
import { Link, Filter } from '../particles';
import { trackStats } from '../utils/graphql';
import { sidebarCss, sidebarLinksCss } from './sidebarCss';

const sidebarSections = [
  [
    { href: null, text: 'Homepage' },
    { href: '/#intro', text: 'Home' },
    { href: '/#skills', text: 'Skills' }
  ],
  [
    { href: null, text: 'Misc' },
    { href: '/cube', text: 'Cubing' },
    { href: '/copypaster', text: 'A Text Box' },
    // { href: '/xiangqi', text: 'Xiangqi' }
  ]
];

export const Sidebar = () => {
  const { isSidebarVisible } = useSelector(state => ({
    isSidebarVisible: state.coresite.isSidebarVisible,
  }));

  return (
    <section css={sidebarCss(isSidebarVisible)}>
      {sidebarSections.map((links, index) => (
        <React.Fragment key={index}>
          {links.map((link, i) => (
            <Link
              key={i}
              href={link.href}
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
};
