import { lazy, Suspense } from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';

import Progress from '../components/progress';
const NotFound = lazy(() => import('../components/not-found'));
const ProductDetails = lazy(() => import('../components/product-details'));

function AppRoutes() {
    return (
        <Suspense fallback={<Progress />}>
            <Routes>
                <Route path='/' element={<ProductDetails />} />
                <Route path='/not-found' element={<NotFound />} />
                <Route path='*' element={<Navigate to={'/not-found'} />} />
            </Routes>
        </Suspense>
    );
}

export default AppRoutes;
