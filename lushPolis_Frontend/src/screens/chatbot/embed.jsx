import React, { Component } from 'react';

class ZapierEmbed extends Component {
  componentDidMount() {
    const script = document.createElement('script');
    script.type = 'module';
    script.src = 'https://interfaces.zapier.com/assets/web-components/zapier-interfaces/zapier-interfaces.esm.js';
    document.body.appendChild(script);
  }

  render() {
    return (
      <div>
        <zapier-interfaces-page-embed
          page-id='clowyxafu001fl70qscsx741c'
          no-background='false'
          style={{ maxWidth: '1200px', height: '700px' }}
        ></zapier-interfaces-page-embed>
      </div>
    );
  }
}

export default ZapierEmbed;