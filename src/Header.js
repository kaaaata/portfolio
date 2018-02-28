import React, { Component } from 'react';
import './Header.css';

export default class Header extends Component {  
  render() {
    return (
      <div className="header">
        <div className="header-background" />
        <div className="header-foreground">
          <div className="header-left">
            {['Home', 'About', 'Projects', 'Skills', 'Contact'].map((scroller, index) => (
              <div key={index} className="header-scroller" onClick={() => this.props.scrollToRef(scroller.toLowerCase())}>
                {scroller.toUpperCase()}
              </div>
            ))}
          </div>
          <div className="header-right">
            {[
              { image: 'github.png', url: 'https://github.com/kaaaata' },
              { image: 'linkedin.png', url: 'https://www.linkedin.com/in/kaaaata/' },
              { image: 'facebook.png', url: 'https://www.facebook.com/blueconiferforest' },
              { image: 'dota.png', url: 'https://www.dotabuff.com/players/125258124' },
            ].map((media, index) => (
              <div key={index}>
                <a href={media.url} target="_blank">
                  <div className="header-media-icon" style={{ backgroundImage: `url(${require(`./assets/${media.image}`)})` }} />
                </a>
              </div>
            ))}        
          </div>
        </div>
      </div>
    );
  }
}
