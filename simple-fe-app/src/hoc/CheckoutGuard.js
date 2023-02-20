import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';

const CheckoutGuard = ({ element }) => {
    const { getNumberOfItems } = useCart();
    const navigate = useNavigate();

    useEffect(() => {
        if (getNumberOfItems() < 1) {
            navigate('/not-found');
        }
    }, []);

    return element;
};

export default CheckoutGuard;
