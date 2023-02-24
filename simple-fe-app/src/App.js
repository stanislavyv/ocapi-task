import MainProductProvider from './context/MainProductContext';

import AppRoutes from './routes/routes';

import Header from './components/header';
import Content from './components/content';
import Footer from './components/footer';

import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer } from 'react-toastify';

function App() {
    return (
        <>
            <Header />
            <MainProductProvider>
                <Content>
                    <AppRoutes />
                </Content>
            </MainProductProvider>
            <Footer />
            <ToastContainer
                limit={1}
                position='bottom-right'
                closeOnClick={true}
            />
        </>
    );
}

export default App;
