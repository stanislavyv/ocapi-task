import { Navigate, Route, Routes } from 'react-router-dom';
import NotFound from '../components/not-found';
import ProductDetails from '../components/product-details';

function AppRoutes() {
    return (
        <Routes>
            <Route path='/' element={<ProductDetails />} />
            <Route path='/not-found' element={<NotFound />} />
            <Route path='*' element={<Navigate to={'/not-found'} />} />
        </Routes>
    );
}

export default AppRoutes;
