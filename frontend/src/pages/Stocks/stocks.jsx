import React, { useState, useEffect } from 'react';
import './stocks.css';
import { Bar } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';
import { getStocks } from '../../api/stocks';
// Enregistrer les composants nécessaires dans Chart.js
ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);


// Initialise les stocks avec la valeur de l'api getStocks
function Stocks() {
  const [stocks, setStocks] = useState([]);

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



  // Préparer les données pour le graphique (diagramme à barres)
  const chartData = {
    labels: stocks.map((stock) => stock.nom_ingredient), // Liste des noms des produits
    datasets: [
      {
        label: 'Quantité de Stock',
        data: stocks.map((stock) => stock.quantite), // Liste des quantités
        backgroundColor: 'rgba(75, 192, 192, 0.6)', // Couleur de fond des barres
        borderColor: 'rgba(75, 192, 192, 1)', // Couleur de bordure des barres
        borderWidth: 1,
      },
    ],
  };

  // Options du graphique
  const chartOptions = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top', // Position de la légende
      },
      tooltip: {
        enabled: true, // Activer les info-bulles
      },
    },
    scales: {
      x: {
        beginAtZero: true, // Commencer l'axe X à zéro
      },
      y: {
        beginAtZero: true, // Commencer l'axe Y à zéro
      },
    },
  };

  // Vérification des stocks en dessous du seuil minimal
  const stocksEnSousSeuil = stocks.filter((stock) => stock.quantite < stock.seuil_minimal);

  return (
    <div className="stocks">
      <h2>Liste des Stocks</h2>

      {/* Alerte si un stock est en dessous du seuil minimal */}
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

      {/* Tableau des stocks */}
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

      {/* Afficher le graphique à barres */}
      <div className="chart-container">
        <Bar data={chartData} options={chartOptions} />
      </div>
    </div>
  );
}

export default Stocks;
