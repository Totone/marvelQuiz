import React from 'react';
import {Link} from 'react-router-dom';

const BottomLink = ({
  link
}) => (
  <p>
    <Link
      className="simpleLink"
      to={link.href}
    >
      {link.label}
    </Link>
  </p>
);

export default React.memo(BottomLink);
