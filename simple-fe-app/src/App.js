import AppRoutes from './routes/routes';

import Header from './components/header';
import Content from './components/content';
import Footer from './components/footer';

function App() {
    return (
        <>
            <Header />
            <Content>
                <AppRoutes />
            </Content>
            <Footer />
        </>
    );
}

export default App;
