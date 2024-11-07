import { useState } from 'react';

function Planification() {
  const [productions, setProductions] = useState([]);
  const [produit, setProduit] = useState('');
  const [quantite, setQuantite] = useState('');
  const [date, setDate] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    setProductions([...productions, { produit, quantite, date }]);
    setProduit('');
    setQuantite('');
    setDate('');
  };

  return (
    <div>
      <h2>Planification de la Production</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Produit :</label>
          <input 
            type="text" 
            value={produit} 
            onChange={(e) => setProduit(e.target.value)} 
          />
        </div>
        <div>
          <label>Quantité :</label>
          <input 
            type="number" 
            value={quantite} 
            onChange={(e) => setQuantite(e.target.value)} 
          />
        </div>
        <div>
          <label>Date de production :</label>
          <input 
            type="date" 
            value={date} 
            onChange={(e) => setDate(e.target.value)} 
          />
        </div>
        <button type="submit">Planifier</button>
      </form>

      <h3>Productions Planifiées</h3>
      <table>
        <thead>
          <tr>
            <th>Produit</th>
            <th>Quantité</th>
            <th>Date de production</th>
          </tr>
        </thead>
        <tbody>
          {productions.map((prod, index) => (
            <tr key={index}>
              <td>{prod.produit}</td>
              <td>{prod.quantite}</td>
              <td>{prod.date}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default Planification;
