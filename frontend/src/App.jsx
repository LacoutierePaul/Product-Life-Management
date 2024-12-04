import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Fournisseurs from './pages/Fournisseurs/fournisseurs';
import Planification from './pages/Planification/planification';
import Qualite from './pages/Qualite/qualite';
import Stocks from './pages/Stocks/stocks';
import Header from './components/header/header';
import Recettes from './pages/Recettes/recettes';

function App() {
  return (
    <Router>
      <Header />
      <div style={{ padding: '20px' }}>
        <Routes>
          <Route path="/fournisseurs" element={<Fournisseurs />} />
          <Route path="/planification" element={<Planification />} />
          <Route path="/qualite" element={<Qualite />} />
          <Route path="/stocks" element={<Stocks />} />
          <Route path="/recettes" element={<Recettes />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
