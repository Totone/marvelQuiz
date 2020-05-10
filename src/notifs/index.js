import welcome from './welcome';
import success from './success';
import failure from './failure';
import { toast } from 'react-toastify';
toast.configure();


const notifs = ({
  failure,
  success,
  welcome,
});


export default notifs;
