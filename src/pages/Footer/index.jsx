import React from 'react';
import label from './locales';

const Footer = () => {
  return (
    <footer className="footer-container">
      <p>
        {label}
      </p>
    </footer>
  );
};

export default React.memo(Footer);
