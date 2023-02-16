import ProductProvider from './context/ProductContext';

import AppRoutes from './routes/routes';

import Header from './components/header';
import Content from './components/content';
import Footer from './components/footer';

function App() {
    return (
        <>
            <Header />
            <ProductProvider>
                <Content>
                    <AppRoutes />
                </Content>
            </ProductProvider>
            <Footer />
        </>
    );
}

export default App;
