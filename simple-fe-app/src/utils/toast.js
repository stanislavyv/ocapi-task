import { toast } from 'react-toastify';

/**
 * Fires a toast notification on error
 */
export const notifyError = () => {
    toast.dismiss();
    toast.error('Error: Please try again later', {
        autoClose: 2500,
        hideProgressBar: true,
        pauseOnHover: false,
    });
};
