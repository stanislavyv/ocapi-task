import { lazy, Suspense } from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';

import CheckoutGuard from '../hoc/CheckoutGuard';

import Progress from '../components/progress';
import Checkout from '../pages/checkout';
const NotFound = lazy(() => import('../pages/not-found'));
const ProductDetails = lazy(() => import('../pages/product-details'));

function AppRoutes() {
    return (
        <Suspense fallback={<Progress />}>
            <Routes>
                <Route path='/' element={<ProductDetails />} />
                <Route
                    path='/checkout'
                    element={<CheckoutGuard element={<Checkout />} />}
                />
                <Route path='/not-found' element={<NotFound />} />
                <Route path='*' element={<Navigate to={'/not-found'} />} />
            </Routes>
        </Suspense>
    );
}

export default AppRoutes;
