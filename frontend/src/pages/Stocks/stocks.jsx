import React, { useState, useEffect } from 'react';
import './stocks.css';

function Stocks() {
  const [stocks, setStocks] = useState([]);

  useEffect(() => {
    // Exemple de fetch pour récupérer les stocks depuis l'API
    fetch('/api/stocks')
      .then((response) => response.json())
      .then((data) => setStocks(data));
  }, []);

  return (
    <div className="stocks">
      <h2>Liste des Stocks</h2>
      <table>
        <thead>
          <tr>
            <th>Nom</th>
            <th>Type</th>
            <th>Quantité</th>
            <th>Seuil Minimal</th>
            <th>Unité</th>
          </tr>
        </thead>
        <tbody>
          {stocks.map((stock) => (
            <tr key={stock.id}>
              <td>{stock.nom}</td>
              <td>{stock.type}</td>
              <td>{stock.quantite}</td>
              <td>{stock.seuil_minimal}</td>
              <td>{stock.unite}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default Stocks;
