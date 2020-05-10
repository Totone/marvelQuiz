import {toast} from 'react-toastify';
toast.configure();

const success = () => {
  toast.success("Bonne réponse!", {
    position: "top-right",
    autoClose: 2000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: false,    
  });
};

export default success;
