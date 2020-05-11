const getConfig = () => {
  const apiKey = process.env.REACT_APP_MARVEL_API_KEY;
  const hash = process.env.REACT_APP_MARVEL_API_HASH;
  const getUrl = (id) => `http://gateway.marvel.com/v1/public/characters/${id}?apikey=${apiKey}&hash=${hash}`;

  return {
    apiKey,
    hash,
    getUrl
  };
};

export default getConfig();
