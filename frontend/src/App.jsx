import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Fournisseurs from './pages/Fournisseurs/fournisseurs';
import Environnement from './pages/Environnement/environnement';
import Planification from './pages/Planification/planification';
import Qualite from './pages/Qualite/qualite';
import Stocks from './pages/Stocks/stocks';
import Header from './components/header/header';

function App() {
  return (
    <Router>
      <Header />
      <div style={{ padding: '20px' }}>
        <Routes>
          <Route path="/fournisseurs" element={<Fournisseurs />} />
          <Route path="/environnement" element={<Environnement />} />
          <Route path="/planification" element={<Planification />} />
          <Route path="/qualite" element={<Qualite />} />
          <Route path="/stocks" element={<Stocks />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
