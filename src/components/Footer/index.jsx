import React from 'react';
import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer className="footer-container">
      <p>
        Projet réalisé par Totone sur la base du projet de <Link to="https://github.com/DonkeyGeek/marvel-quiz">DonkeyGeek</Link>
      </p>
      <p>
        Images issues de <Link to="https://www.iconfinder.com">IconFinder</Link>
      </p>
    </footer>
  );
};

export default React.memo(Footer);
