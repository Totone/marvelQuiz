import {toast} from 'react-toastify';
toast.configure();

const failure = () => {
  toast.error("Mauvaise réponse...", {
    position: "top-right",
    autoClose: 2000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: false,
  });
};

export default failure;
