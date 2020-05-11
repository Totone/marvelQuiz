/** 
 * TOTONE => https://www.github.com/Totone <= Say hi, thanks or anything else to make me feel happy ! (You can also give me a billion of €€€ I will be happy to =)
 * 
 * This service enables to handle browser localStorage object easily & properly.  
 * Cookies names are formatted to be easily found in localStorage 
 * & application accesses logic to localStorage is managed here 
 * to keep other app files clean.
 * 
 * config is an object looking like:
 * 
  const config = {
    dataAgeLimit: 15,
    labels: {
      appPrefix: "MarvelQuiz",
      date: "date",
    },
  } 
*/ 

import config from '../assets/config/storage';

/**
 * Computes key name before storing it in localStorage
 * @param {string} id Key identifier
 */
const getKeyName = (id) => `${config.labels.appPrefix}-${id}`;

/** 
 * Sets current timestamp as data age entry.
 * Called after storage clean.
 */
const setNewDataAge = () => localStorage.setItem(
  getKeyName(config.labels.date),
  Date.now()
);

/**
 * Removes all app entries in localStorage
 * @param {boolean} isNewDataAge If true, sets 
 * a new value in localStorage data age key
 * corresponding to current timestamp.  
 */
const cleanStorage = (isNewDataAge = false) => {
  for(const key of Object.keys(localStorage)) {
    if(key.startsWith(config.labels.appPrefix)) {
      localStorage.removeItem(key)
    }
  }
  return isNewDataAge && setNewDataAge();
};

/**
 * Checks if a cookie with provided id is stored in localStorage. 
 * Returns a boolean or the entry, according to given params.
 * @param {string} id Key identifier
 * @param {boolean} justCheck If true, only checks if entry exists in localStorage. If false, returns founded entry
 * @param {boolean} parse If true, founded entry is parsed into JSON before be returned
 */
const checkDataInLS = (id, justCheck, parse = true) => {
  if(localStorage.getItem(getKeyName(id))) {
    return justCheck ? true
    : parse ? JSON.parse(localStorage.getItem(getKeyName(id)))
    : localStorage.getItem(getKeyName(id));
  }
  else return justCheck ? false : null;
};

/**
 * Checks if data age is under limit.
 * If it is not anymore, stored data is removed & 
 * current timestamp is stored as new data age value in LS
 */
export const checkStoredDataAge = () => {
  const now = Date.now();
  const storedDate = localStorage.getItem(
    getKeyName(config.labels.date)
  );

  const diff = { ms: now - storedDate };
  diff.days = diff.ms / (1000 * 3600 * 24);

  return diff.days > config.dataAgeLimit ? cleanStorage(true) : null;
};

/**
 * Gets data stored in localStorage with provided id. 
 * @param {string} id Key identifier
 * @param {boolean} parse If true, fetched data is parsed into JSON
 */
export const getDataFromLS = (id, parse = true) => checkDataInLS(id, false, parse);

/**
 * Checks if data corresponding to id is in LS & returns the corresponding boolean.
 * @param {string} id Key identifier
 */
export const isDataInLS = (id) => checkDataInLS(id, true);

/**
 * Sets a new entry in localStorage, with provided id as key & data as content
 * @param {string} id Key identifier
 * @param {*} data Data to strore
 * @param {boolean} stringify If true, data is pardes into string before the save in localStorage
 */
export const setDataToLS = (id, data, stringify = true) => {
  localStorage.setItem(
    getKeyName(id),
    stringify ? JSON.stringify(data) : data
  )
};

export default {
  checkStoredDataAge,
  getDataFromLS,
  isDataInLS,
  setDataToLS
};
