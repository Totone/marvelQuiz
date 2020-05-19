import React from 'react';
import {uppercaseFirstChar} from './locales';

const DataLinks = ({
  list
}) => {  
  return (
    <React.Fragment>
      {
        list.map(
          (url, index) => (
            <a
              key={`modal-${index}`}
              href={url.url}
              target="_blank"
              rel="noopener noreferrer"
            >
              { uppercaseFirstChar(url.type) }
            </a>
          )
        )
      }
    </React.Fragment>
  );
}

export default DataLinks;
