import React from 'react';
import Loader from '../Loader';

const Modal = ({
  isDisplayed, 
  hide,
  data,
  attributionText
}) => {
  return data && (
    <article className="modalBackground">
      <section className="modalContainer">
      
        <header className="modalHeader">
          <h2>{data.name}</h2>
        </header>

        {
          !isDisplayed 
          ? <Loader /> 
          : (
            <main className="modalBody">
              <section className="comicImage">
                <img 
                  src={data.thumbnail.path + "." + data.thumbnail.extension}
                  alt={data.name}
                  title={data.name}
                />
                { attributionText }
              </section>
  
              <section className="comicDetails">
                <h3>Description</h3>
                <p>
                  { data.description ? data.description : "Description indisponible..." }
                </p>
                <h3>Plus d'infos</h3>
                {
                  data.urls &&
                  data.urls.map(
                    (url, index) => (
                      <a
                        key={index}
                        href={url.url}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        { url.type[0].toUpperCase() + url.type.slice(1) }
                      </a>
                    )
                  )
                }
              </section>
            </main>
          )
        }

        <footer className="modalFooter">
          <button className="modalBtn" onClick={hide}>
            Fermer
          </button>
        </footer>

      </section>
    </article>
  );
};

export default React.memo(Modal);
