import React from 'react';
import { Header, Icon } from 'semantic-ui-react';

const DefaultPage = () => (
  <div className="default">
    <Header as="h1" icon>
      <Icon name="qrcode" size="huge" />
      <Header.Subheader>
        To use this service please scan a QR Code<br />of a location or an object.
      </Header.Subheader>
    </Header>
  </div>
);

export default DefaultPage;
