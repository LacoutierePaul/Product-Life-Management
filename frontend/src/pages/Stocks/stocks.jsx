import { useState } from 'react';

function Stocks() {
  const [stocks, setStocks] = useState([
    { id: 1, nom: 'Matière A', quantite: 100, seuil: 50 },
    { id: 2, nom: 'Matière B', quantite: 30, seuil: 40 },
  ]);

  const handleUpdateStock = (id, quantite) => {
    setStocks(stocks.map(stock => stock.id === id ? { ...stock, quantite } : stock));
  };

  return (
    <div>
      <h2>Gestion des Stocks</h2>
      <table>
        <thead>
          <tr>
            <th>Nom</th>
            <th>Quantité</th>
            <th>Seuil minimal</th>
            <th>Mettre à jour</th>
          </tr>
        </thead>
        <tbody>
          {stocks.map(stock => (
            <tr key={stock.id}>
              <td>{stock.nom}</td>
              <td>{stock.quantite}</td>
              <td>{stock.seuil}</td>
              <td>
                <input 
                  type="number" 
                  value={stock.quantite} 
                  onChange={(e) => handleUpdateStock(stock.id, e.target.value)} 
                />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default Stocks;
