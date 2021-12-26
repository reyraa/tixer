import React from 'react';
import './header.css';

const Header = () => (
  <header className="header">
      <h1>Tixer</h1>
      <h4>Lisk transactions generator</h4>
      <p>Use this tool to generate Lisk transactions on any network, for any account. Then scan the QR code using Lisk Mobile to sign and broadcast it. You should be signed in to Lisk Mobile using the account that you define as sender.</p>
  </header>
);

export default Header;
