import axios from 'axios';
import config from '../assets/config/marvelAPI';

export default (id, callback, fallback = null) => {
  const url = config.getUrl(id);
  axios.get(url)
  .then((res) => callback(res))
  .catch(
    (err) => {
      fallback !== null ? fallback(err) : console.log(err);
    }
  );
};
