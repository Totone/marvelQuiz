import axios from 'axios';
import config from '../assets/config/marvelAPI';

/**
 * Makes a request to marvelAPI in 
 * order to get data from a Marvel character 
 * @param {string} id Marvel character identifier
 */
const getMarvelApiData = async(id) => {
  const url = config.getUrl(id);
  try {
    const response = await axios.get(url);
    return response.data;
  }
  catch(e) { 
    throw new Error({
      spot: "getMarvelApiData()",
      error: e
    }); 
  }
}

export default getMarvelApiData;