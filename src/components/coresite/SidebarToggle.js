import { css, jsx } from '@emotion/core'; /** @jsx jsx */
import { connect } from 'react-redux';
import * as actions from '../stores/actions';
import { colors } from '../styles';

const sidebarToggleCss = isSidebarVisible => css`
  width: 40px;
  height: 40px;
  position: relative;
  cursor: pointer;

  .three_bar {
    width: 100%;
    margin-top: 5px;
    height: 5px;
    background: ${colors.white};
    position: absolute;
    transition: all 0.25s ease-out;

    &.three_bar--top {
      transform: ${isSidebarVisible ? 'rotate(45deg)' : 'unset'};
      top: ${isSidebarVisible ? '10px' : 0};
    }

    &.three_bar--center {
      top: 10px;
      opacity: ${isSidebarVisible ? 0 : 1};
    }

    &.three_bar--bottom {
      transform: ${isSidebarVisible ? 'rotate(-45deg)' : 'unset'};
      top: ${isSidebarVisible ? '10px' : '20px'};
    }
  }
`;

const SidebarToggleComponent = ({ isSidebarVisible, setIsSidebarVisible }) => (
  <div
    css={sidebarToggleCss(isSidebarVisible)}
    onClick={() => setIsSidebarVisible(!isSidebarVisible)}
  >
    <div className='three_bar three_bar--top' />
    <div className='three_bar three_bar--center' />
    <div className='three_bar three_bar--bottom' />
  </div>
);

const mapStateToProps = state => ({
  isSidebarVisible: state.coresite.isSidebarVisible,
});
const mapDispatchToProps = dispatch => ({
  setIsSidebarVisible: payload => dispatch(actions.setIsSidebarVisible(payload)),
});

export const SidebarToggle = (
  connect(mapStateToProps, mapDispatchToProps)(SidebarToggleComponent)
);
