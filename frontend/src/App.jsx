import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Fournisseurs from './pages/Fournisseurs/fournisseurs';
import Planification from './pages/Planification/planification';
import Qualite from './pages/Qualite/qualite';
import Stocks from './pages/Stocks/stocks';
import Header from './components/header/header';
import Recettes from './pages/Recettes/recettes';
import LoginPage from './pages/LoginPage/loginPage.jsx'; // Import de la page de login
import { UserProvider } from './context/user.context.jsx';

function App() {
    return (
        <UserProvider>
            <Router>
                <Header />
                <div style={{ padding: '20px' }}>
                    <Routes>
                        <Route path="/" element={<LoginPage />} />
                        <Route path="/fournisseurs" element={<Fournisseurs />} />
                        <Route path="/planification" element={<Planification />} />
                        <Route path="/qualite" element={<Qualite />} />
                        <Route path="/stocks" element={<Stocks />} />
                        <Route path="/recettes" element={<Recettes />} />
                    </Routes>
                </div>
            </Router>
        </UserProvider>
    );
}

export default App;
