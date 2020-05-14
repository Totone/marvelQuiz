# Marvel Quiz

Marvel Quiz is a small ReactJS application for beginners. This is a clone of the eponym [DonkeyGeek project](https://github.com/DonkeyGeek/marvel-quiz) (thank you), done to get myself back on track after some adventures I endured during this historic period & to handle Google Firebase tool.

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

The goal of this project is to be more **component-oriented** than the original. This one was made for beginners & could not have a perfect structure. So the main evolution is about refactoring the project to get more & smaller components. I also renamed some variables & methods to be more understandable.

### Structure

```bash
src/
├── assets
│   ├── config
│   ├── contentData
│   └── images
├── components
│   ├── App
│   │   ├── App.css
│   │   └── index.jsx
│   └── ComponentFolder
│       ├── Container.js
│       ├── style.js
│       ├── useCustomHook.js
│       └── index.jsx
├── pages
│   └── PageComponent
├── services
│   ├── backend
│   ├── marvelAPI.js
│   ├── push
│   └── storage.js
├── index.js
└── serviceWorker.js
```

* **`assets/`** stores app assets like config files, images, styles... In my case, it stores `contentData/` which should rather be in the backend * I wanted to move it but as this project is just an exercise, I didn't do it.
* **`components/`** stores components. Each folder in it stores all necessary needed files.
* **`pages/`** is similar to `components/` but stores layouts instead of components.
* **`services/`** stores services like APIs or features using another technology. The purpose is to compute a service to be accessible in `components/` & pages/ as an API to avoid logic for different components at the same place. For example, `services/` contains `push/` which contains all the logic to display push notifications & can be called in other files by typing `push.welcome()` or `push.success()`.

### About storage.js

`./src/services/storage.js` is an API made to interact with browser local storage. Instead of using calls to local storage like `localStorage.get()`, I thinks a proper way is to get the logic to interact with localStorage in its own file & only call it where we want, to get a code more maintenable & understandable.

## That's it

Don't forget to watch DonkeyGeek project & thank you for watching mine =)  
Maybe there are English bad formulations... I'm French & I didn't practice English for a while, sorry!
