import React, { useState, useEffect } from 'react';
import './stocks.css';
import { Line } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend } from 'chart.js';

// Enregistrer les composants nécessaires dans Chart.js
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

function Stocks() {
  const stocksFictifs = [
    {
      id: 1,
      nom: "Lait Cru",
      type: "Matière Première",
      quantite: 500,
      seuil_minimal: 100,
      unite: "Litres"
    },
    {
      id: 2,
      nom: "Crème Fraîche",
      type: "Produit Fini",
      quantite: 200,
      seuil_minimal: 50,
      unite: "Litres"
    },
    {
      id: 3,
      nom: "Beurre",
      type: "Produit Fini",
      quantite: 150,
      seuil_minimal: 30,
      unite: "Kg"
    },
    {
      id: 4,
      nom: "Fromage Blanc",
      type: "Produit Fini",
      quantite: 180,
      seuil_minimal: 40,
      unite: "Kg"
    },
    {
      id: 5,
      nom: "Ferments",
      type: "Matière Première",
      quantite: 80,
      seuil_minimal: 20,
      unite: "Kg"
    },
    {
      id: 6,
      nom: "Lait d'Amande",
      type: "Matière Première",
      quantite: 100,
      seuil_minimal: 50,
      unite: "Litres"
    },
    {
      id: 7,
      nom: "Lait de Chèvre",
      type: "Matière Première",
      quantite: 400,
      seuil_minimal: 100,
      unite: "Litres"
    }
  ];

  const [stocks, setStocks] = useState(stocksFictifs);

  useEffect(() => {
    // Exemple de fetch pour récupérer les stocks depuis l'API
    fetch('/api/stocks')
      .then((response) => response.json())
      .then((data) => setStocks(data));
  }, []);

  // Préparer les données pour le graphique
  const chartData = {
    labels: stocks.map((stock) => stock.nom), // Liste des noms de produits
    datasets: [
      {
        label: 'Quantité de Stock',
        data: stocks.map((stock) => stock.quantite), // Liste des quantités
        borderColor: 'rgba(75, 192, 192, 1)', // Couleur de la ligne
        backgroundColor: 'rgba(75, 192, 192, 0.2)', // Couleur de fond de la ligne
        fill: true, // Remplir sous la ligne
        tension: 0.4, // Courbe lissée
      },
    ],
  };

  return (
    <div className="stocks">
      <h2>Liste des Stocks</h2>


      {/* Tableau des stocks */}
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

      {/* Afficher le graphique */}
      <div className="chart-container">
        <Line data={chartData} />
      </div>
    </div>
  );
}

export default Stocks;
