import AppRoutes from './routes/routes';

import Header from './components/header';
import ProductDetails from './components/product-details';
import Footer from './components/footer';

function App() {
    return (
        <>
            <Header />
            <AppRoutes />
            <Footer />
        </>
    );
}

export default App;
