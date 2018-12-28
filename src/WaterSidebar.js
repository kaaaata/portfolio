import React from 'react';
import { throttle } from 'lodash';
import { css, jsx } from '@emotion/core'; /** @jsx jsx */

class WaterSidebar extends React.Component {
  constructor() {
    super();
    this.state = {
      waterPercentage: 100
    };

    this.updateWaterPercentage = throttle(() => {
      try {
        const documentHeight = document.getElementById('app').clientHeight;
        const windowHeight = window.innerHeight;
        const { scrollTop } = document.documentElement;
        // waterPercentage = percentage of sidebar filled with water
        const waterPercentage = 100 - Math.floor(scrollTop / (documentHeight - windowHeight) * 100);
        this.setState({ waterPercentage });
      } catch (e) {
        //
      }
    }, 25);
  }

  componentDidMount() {
    window.addEventListener('scroll', this.updateWaterPercentage);
  }

  componentWillUnmount() {
    window.removeEventListener('scroll', this.updateWaterPercentage);
  }

  render() {
    const waterSidebarCss = css`
      position: fixed;
      height: 100%;
      width: 25px;

      .water {
        background: blue;
        height: 100%;
        width: 100%;
        position: absolute;
        top: ${100 - this.state.waterPercentage}%;
        transition: top 0.75s ease-out;
      }

      @keyframes waveAction {
        0% {
          transform: translate(-150px, 0);
        }
        100% {
          transform: translate(0, 0);
        }
      }

      #waveShape {
        animation-name: waveAction;
        animation-iteration-count: infinite;
        animation-timing-function: linear;
        animation-duration: 0.5s;
        width: 25px;
        height: 150px;
        fill: #04ACFF;
      }
    `;
  
    return (
      <section css={waterSidebarCss}>
        {this.state.waterPercentage}
        <div className='water'>
          <svg
            version="1.1"
            xmlns="http://www.w3.org/2000/svg"
            xmlnsXlink="http://www.w3.org/1999/xlink"
            x="0px"
            y="0px"
            width="25px"
            height="25px"
            viewBox="0 0 25 25"
            enableBackground="new 0 0 25 25"
            xmlSpace="preserve"
          >
            <path fill="#04ACFF" id="waveShape" d="M300,300V2.5c0,0-0.6-0.1-1.1-0.1c0,0-25.5-2.3-40.5-2.4c-15,0-40.6,2.4-40.6,2.4
	c-12.3,1.1-30.3,1.8-31.9,1.9c-2-0.1-19.7-0.8-32-1.9c0,0-25.8-2.3-40.8-2.4c-15,0-40.8,2.4-40.8,2.4c-12.3,1.1-30.4,1.8-32,1.9
	c-2-0.1-20-0.8-32.2-1.9c0,0-3.1-0.3-8.1-0.7V300H300z"/>
          </svg>
        </div>
      </section>
    );
  }
}

export default WaterSidebar;
