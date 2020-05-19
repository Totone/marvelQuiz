import React from 'react';
import Loader from '../Loader';
import DataLinks from './DataLinks';

import getLocales from './locales';

const Modal = ({
  isDisplayed,
  hide,
  data,
  attributionText
}) => {
  const labels = getLocales(data, attributionText);

  return data && (
    <article className="modalBackground">
      <section className="modalContainer">
      
        <header className="modalHeader">
          <h2>{labels.header}</h2>
        </header>

        {
          !isDisplayed ? <Loader /> 
          : (
            <main className="modalBody">
              <section className="comicImage">
                <img 
                  src={labels.img.src}
                  alt={labels.img.alt}
                  title={labels.img.title}
                />
                {labels.img.attributionText}
              </section>
  
              <section className="comicDetails">
                <h3>{labels.description.header}</h3>
                <p>{labels.description.content}</p>
                <h3>{labels.description.moreData}</h3>

                { data.urls && <DataLinks list={data.urls} />}
              </section>
            </main>
          )
        }

        <footer className="modalFooter">
          <button className="modalBtn" onClick={hide}>
            {labels.closeButton}
          </button>
        </footer>

      </section>
    </article>
  );
};

export default React.memo(Modal);
