import { toast } from 'react-toastify';

export const notifyError = () => {
    toast.dismiss();
    toast.error('Error: Please try again later', {
        autoClose: 2500,
        hideProgressBar: true,
        pauseOnHover: false,
    });
};
