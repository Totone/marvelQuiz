import React, {useState, useEffect} from 'react';
import axios from 'axios';
import Loader from '../Loader';
import Modal from '../Modal';
import {GiTrophyCup} from 'react-icons/gi';


const QuizOver = React.forwardRef((props, ref) => {
  const [asked, setAsked] = useState([]);
  const [isModalOpen, setModalOpen] = useState(false);
  const [message, setMessage] = useState("");
  const [characterData, setCharacterData] = useState([]);
  const [isDataLoading, setDataLoading] = useState(true);

  const {
    score,
    succeeds,
    maxQuestions,
    isLastLevel,
    loadLevel,
    isSucceeded
  } = props;
  
  const success = `Réussite: ${score}%`;
  const note = `Note: ${succeeds}/${maxQuestions}`;

  const showModal = (id) => () => {
    setModalOpen(true);

    if(localStorage.getItem(id)) {
      setCharacterData(JSON.parse(localStorage.getItem(id)));
      setDataLoading(false);
    }
    else {
      const MARVEL_API_KEY = process.env.REACT_APP_MARVEL_API_KEY;
      const MARVEL_API_HASH = process.env.REACT_APP_MARVEL_API_HASH;
  
      axios.get(`http://gateway.marvel.com/v1/public/characters/${id}?apikey=${MARVEL_API_KEY}&hash=${MARVEL_API_HASH}`)
      .then(
        (res) => {
          localStorage.setItem(id, JSON.stringify(res.data));
          setCharacterData(res.data);
          setDataLoading(false);
        }
      )
      .catch((err) => {console.log(err)});
    }

  };

  const checkDataAge = (date) => {
    const today = Date.now();
    const diffMs = today - date;

    const diffDays = diffMs / (1000 * 3600 * 24);
    if (diffDays >= 15) {
      localStorage.clear();
      localStorage.setItem("date", today);
    }
  };

  const hideModal = () => {
    setModalOpen(false);
    setDataLoading(true);
  };

  useEffect(() => {
    setAsked(ref.current);
    setMessage(
      ! isSucceeded ? "Vous avez échoué..."
      : isLastLevel ? "Bravo, vous avez réussi tous les niveaux!"
      : "Bravo, vous avez réussi le niveau!"
    );
    checkDataAge(localStorage.getItem("date"));
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  console.log("QuizOver", isLastLevel);

  const resultInModal = !isDataLoading 
  ? (
    <React.Fragment>
      <header className="modalHeader">
        <h2>{characterData.data.results[0].name}</h2>
      </header>
      <main className="modalBody">
        <section className="comicImage">
          <img 
            src={
              characterData.data.results[0].thumbnail.path 
              + "." 
              + characterData.data.results[0].thumbnail.extension
            }
            alt={characterData.data.results[0].name}
          />
          { characterData.attributionText }
        </section>
        <section className="comicDetails">
          <h3>Description</h3>
          <p>
            { 
              characterData.data.results[0].description 
              ? characterData.data.results[0].description 
              : "Description indisponible..."
            }
          </p>

          <h3>Plus d'infos</h3>
          {
            characterData.data.results[0].urls &&
            characterData.data.results[0].urls.map(
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
      <footer className="modalFooter">
        <button className="modalBtn" onClick={hideModal}>Fermer</button>
      </footer>
    </React.Fragment>
  ) 
  : (
    <Loader />
  );

  return (
    <React.Fragment>
      <section className="stepsBtnContainer">
        <p className="successMsg">
          {isLastLevel && isSucceeded && <GiTrophyCup size="50px"/>}{message}
        </p>
        {
          isSucceeded && (
            <button 
              className="btnResult success"
              onClick={() => loadLevel(!isLastLevel)}
            >
              {`${isLastLevel ? "Recommencer" : "Niveau suivant"}`}
            </button>
          )
        }
      </section>
      <section className="percentage">
        <article className="progressPercent">{success}</article>
        <article className="progressPercent">{note}</article>
      </section>
      <hr/>
      <p>Les réponses aux questions:</p>

      <article className="answerContainer">
        <table className="answers">
          <thead>
            <tr>
              <th>Question</th>
              <th>Réponse</th>
              <th>Infos</th> 
            </tr>
          </thead>
          <tbody>
            {
              isSucceeded ? (
                asked.map(
                  current => (
                    <tr key={current.id}>
                      <td>{current.question}</td>
                      <td>{current.answer}</td>
                      <td><button className="btnInfo" onClick={showModal(current.heroId)}>Infos</button></td>
                    </tr>
                  )
                )
              )
              : (
                <tr>
                  <td colSpan="3">
                    <Loader 
                      loadingMsg="Vous verrez les réponses lorsque vous aurez au moins réussi la moitié du test!"
                      styling={{textAlign:"center", color: "red"}}
                    />
                  </td>
                </tr>
              )
            }
          </tbody>
        </table>
      </article>

      <Modal showModal={isModalOpen} hideModal={hideModal}>
        {resultInModal}
      </Modal>


    </React.Fragment>
  );
});

export default React.memo(QuizOver);
