import { css, jsx } from '@emotion/core'; /** @jsx jsx */
import { connect } from 'react-redux';
import { colors, layout, mq, zIndex } from './styles';
import { Link } from './particles';

const sidebarCss = isSidebarVisible => css`
  width: ${isSidebarVisible ? '300px' : '40px'};
  background: ${isSidebarVisible ? colors.blackDark : 'transparent'};
  height: 100%;
  position: fixed;
  z-index: ${zIndex.stickyNav};
  top: ${layout.TOP_NAV_HEIGHT}px;
  left: 0px;
  transition: width 0.25s ease-out;

  ${mq.phoneAndTablet(`
    display: none;
  `)}
`;
const sidebarLinksCss = isSidebarVisible => css`
  color: ${isSidebarVisible ? 'unset' : 'transparent'};

  .side_nav_link {
    height: 40px;
    background: ${isSidebarVisible ? 'red' : 'transparent'};
    ${layout.flexCenter}
  }
`;

const sidebarLinks = [
  { href: '/#intro', text: 'Top' },
  { href: '/#resume', text: 'Resume' },
  { href: '/#skills', text: 'Skills' },
  { href: '/#contact', text: 'Contact' }
];

const Sidebar = ({ isSidebarVisible }) => (
  <section css={sidebarCss(isSidebarVisible)}>
    <article css={sidebarLinksCss(isSidebarVisible)}>
      {sidebarLinks.map(link => (
        <Link
          href={link.href}
          key={link.text}
        >
          <div className='side_nav_link'>
            <div>{link.text}</div>
          </div>
        </Link>
      ))}
    </article>
  </section>
);

const mapStateToProps = state => ({
  isSidebarVisible: state.isSidebarVisible,
});

export default connect(mapStateToProps)(Sidebar);
