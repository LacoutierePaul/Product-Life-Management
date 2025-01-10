import React, { useState, useEffect } from 'react';
import './stocks.css';
import { Bar } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';
import { getStocks } from '../../api/stocks';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

function Stocks() {
  const [stocks, setStocks] = useState([]);
  const [showOrderForm, setShowOrderForm] = useState(false);
  const [orderData, setOrderData] = useState({
    quantity: '',
    supplier: '',
  });

  const suppliers = ['Fournisseur A', 'Fournisseur B', 'Fournisseur C'];

  useEffect(() => {
    getStocks()
      .then((data) => {
        console.log('Stocks récupérés :', data);
        setStocks(data);
      })
      .catch((error) => {
        console.error('Erreur lors de la récupération des stocks :', error);
      });
  }, []);

  const handleOrderInputChange = (e) => {
    const { name, value } = e.target;
    setOrderData((prevState) => ({ ...prevState, [name]: value }));
  };

  const handleSubmitOrder = (e) => {
    e.preventDefault();
    console.log('Nouvelle commande:', orderData);
    alert('Commande envoyée avec succès !');
    setShowOrderForm(false);
  };

  const chartData = {
    labels: stocks.map((stock) => stock.nom_ingredient),
    datasets: [
      {
        label: 'Quantité de Stock',
        data: stocks.map((stock) => stock.quantite),
        backgroundColor: 'rgba(75, 192, 192, 0.6)',
        borderColor: 'rgba(75, 192, 192, 1)',
        borderWidth: 1,
      },
    ],
  };

  const chartOptions = {
    responsive: true,
    plugins: {
      legend: { position: 'top' },
      tooltip: { enabled: true },
    },
    scales: {
      x: { beginAtZero: true },
      y: { beginAtZero: true },
    },
  };

  const stocksEnSousSeuil = stocks.filter((stock) => stock.quantite < stock.seuil_minimal);

  return (
    <div className="stocks">
      <h2>Liste des Stocks</h2>

      {stocksEnSousSeuil.length > 0 && (
        <div className="alert">
          <h3>Attention : Certains stocks sont en dessous du seuil minimal !</h3>
          <ul>
            {stocksEnSousSeuil.map((stock) => (
              <li key={stock.idstock}>
                <strong>{stock.nom_ingredient}</strong> : Quantité actuelle ({stock.quantite} {stock.unite}) en dessous du seuil minimal ({stock.seuil_minimal} {stock.unite}).
              </li>
            ))}
          </ul>
        </div>
      )}

      <button onClick={() => setShowOrderForm(!showOrderForm)}>
        {showOrderForm ? 'Annuler la commande' : 'Passer une nouvelle commande'}
      </button>

      {showOrderForm && (
        <form onSubmit={handleSubmitOrder} className="order-form">
          <label>Quantité :
            <input
              type="number"
              name="quantity"
              value={orderData.quantity}
              onChange={handleOrderInputChange}
              required
            />
          </label>
          <label>Fournisseur :
            <select
              name="supplier"
              value={orderData.supplier}
              onChange={handleOrderInputChange}
              required
            >
              <option value="">Sélectionner un fournisseur</option>
              {suppliers.map((supplier, index) => (
                <option key={index} value={supplier}>{supplier}</option>
              ))}
            </select>
          </label>
          <button type="submit">Envoyer la commande</button>
        </form>
      )}

      <table>
        <thead>
          <tr>
            <th>Nom</th>
            <th>Quantité</th>
            <th>Seuil Minimal</th>
            <th>Unité</th>
          </tr>
        </thead>
        <tbody>
          {stocks.map((stock) => (
            <tr key={stock.idstock}>
              <td>{stock.nom_ingredient}</td>
              <td>{stock.quantite}</td>
              <td>{stock.seuil_minimal}</td>
              <td>{stock.unite}</td>
            </tr>
          ))}
        </tbody>
      </table>

      <div className="chart-container">
        <Bar data={chartData} options={chartOptions} />
      </div>
    </div>
  );
}

export default Stocks;
