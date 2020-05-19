# Marvel Quiz

Marvel Quiz is a small ReactJS application for beginners. This is a clone of the eponym [DonkeyGeek project](https://github.com/DonkeyGeek/marvel-quiz) done to quietly get myself back on track after some adventures I endured during this historic period & to handle Google Firebase tool.

## Getting started

* Clone the project  
  `git clone https`
* Go to project root & install the dependencies  
  `npm install`
* Create an account in [MarvelAPI](https://developer.marvel.com/) & [Google Firebase](https://firebase.google.com/) platforms
* Create a `.env` file to assign your environment variables with your MarvelAPI & Google Firebase data  

  ```bash
  # Marvel API data
  REACT_APP_MARVEL_API_KEY=#Your Marvel API key#
  REACT_APP_MARVEL_API_HASH=#Your Marvel API hash (check API doc)#

  # Firebase data
  REACT_APP_FIREBASE_API_KEY=#YOUR_DATA_HERE#
  REACT_APP_FIREBASE_AUTH_DOMAIN=#YOUR_DATA_HERE#
  REACT_APP_FIREBASE_DATABASE_URL=#YOUR_DATA_HERE#
  REACT_APP_FIREBASE_PROJECT_ID=#YOUR_DATA_HERE#
  REACT_APP_FIREBASE_STORAGE_BUCKET=#YOUR_DATA_HERE#
  REACT_APP_FIREBASE_MESSAGING_SENDER_ID=#YOUR_DATA_HERE#
  REACT_APP_FIREBASE_APP_ID=#YOUR_DATA_HERE#
  ```

* Run the app  
  `npm start`

## Project resources & dependencies

* [React JS](https://fr.reactjs.org/docs/getting-started.html) - The JavaScript framework used
* [NPM](https://www.npmjs.com/) - The package manager
* [create React App](https://github.com/facebook/create-react-app) - Create React apps with no build configuration
* [Firebase](https://firebase.google.com/docs) - Authentication, databases and hosting
* [Marvel API](https://developer.marvel.com/) - The world's greatest comics API
* [Iconfinder](https://www.iconfinder.com/) - The search engine for icons
* [Axios](https://www.npmjs.com/package/axios) - Promise based HTTP client for the browser and node.js
* [React Icons](https://www.npmjs.com/package/react-icons) - Popular icons in one package
* [React Router Dom](https://www.npmjs.com/package/react-router-dom) - DOM bindings for React Router
* [React Stepper Horizontal](https://www.npmjs.com/package/stepper-horizontal) - Well-designed stepper component for react
* [React Toastify](https://www.npmjs.com/package/stepper-horizontal) - Easy and customizable notifications
* [React Tooltip](https://www.npmjs.com/package/react-tooltip) - Easy and customizable tooltips

## Differences with the original project

The goal of this project is to be more **component-oriented** than the original. So the main evolution is about refactoring the project to get more & smaller components. The aim is to get components as independent as possible from each other & to understand the code more easily.

### Structure

```bash
src/
├── assets/
│   ├── config/
│   ├── contentData/
│   └── images/
├── components/
│   ├── App/
│   │   ├── App.css
│   │   └── index.jsx
│   └── ComponentFolder/
│       ├── Container.js
│       ├── style.js
│       ├── locales.js
│       ├── useCustomHook.js
│       └── index.jsx
├── pages/
│   └── PageComponent
├── services/
│   ├── backend/
│   ├── marvelAPI.js
│   ├── push/
│   └── storage.js
├── index.js
└── serviceWorker.js
```

* **`assets/`** stores app assets like config files, images, styles... In my case, it stores `contentData/` which should rather be in the backend * I wanted to move it but as this project is just an exercise, I didn't do it.
* **`components/`** stores components. Each folder in it stores all necessary needed files.
* **`pages/`** is similar to `components/` but stores layouts instead of components.
* **`services/`** stores services like APIs or features using another technology. The purpose is to compute a service to be accessible in `components/` & pages/ as an API to avoid logic for different components at the same place. For example, `services/` contains `push/` which contains all the logic to display push notifications & can be called in other files by typing `push.welcome()` or `push.success()`.

### About components/ & pages/

Folders are built with files corresponding to components:

* `index.jsx` stores component display
* `Container.jsx` stores component logic
* `useCustomHook` stores component hooks
* `style.js` stores component html style
* `locales.js` stores localization data, useful when you want to translate an application into several languages

This split isn't systematic. In case of a small component, everything can be stored in `index.js`. Ifthe component gets bigger, it can be useful to create a new file corresponding to the data type.

### About storage.js

`./src/services/storage.js` is an API made to interact with browser local storage. Instead of using calls to local storage like `localStorage.get()`, I thinks a proper way is to get the logic to interact with localStorage in its own file & only call it where we want, to get a code more maintenable & understandable.

## That's it

Don't forget to watch [DonkeyGeek](https://www.github.com/DonkeyGeek) project & thank you for watching mine =)  
If I publish this project, it is to get feedbacks about my code structure & practises. Is my approach good? Is there a way to optimize this app? Which React techniques do I not yet master & which ones I'd rather forget?

Thank you! Take care of your loved ones & yourself.
