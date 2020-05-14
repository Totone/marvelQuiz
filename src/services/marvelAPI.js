import axios from 'axios';
import config from '../assets/config/marvelAPI';

/**
 * Makes a request to marvelAPI in 
 * order to get data from a Marvel character 
 * @param {string} id Marvel character identifier
 * @param {Function} callback Function which takes response object as argument
 * @param {Function} fallback Function which handles request error case
 */
const getMarvelApiData = (id, callback, fallback = null) => {
  const url = config.getUrl(id);
  axios.get(url)
  .then((res) => callback(res))
  .catch(
    (err) => {
      fallback !== null ? fallback(err) : console.log(err);
    }
  );
};

export default getMarvelApiData;