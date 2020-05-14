import {toast} from 'react-toastify';

toast.configure();

const welcome = pseudo => {
  toast.info(`Bienvenue ${pseudo}!`, {
    position: "top-center",
    autoClose: 5000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: false,
  });
};

export default welcome;
