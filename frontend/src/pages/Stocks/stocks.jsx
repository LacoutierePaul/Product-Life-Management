import React, { useState, useEffect } from 'react';
import './stocks.css';
import { Bar } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';
import { getStocks, addQuantity } from '../../api/stocks';
import { GetFournisseursToStockById } from "../../api/fournisseurstostocks.js";
import { addCommandeStocks } from "../../api/commandes_stocks.js";

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

function Stocks() {
  const [stocks, setStocks] = useState([]);
  const [selectedStockId, setSelectedStockId] = useState(null); // ID du stock sélectionné
  const [suppliers, setSuppliers] = useState([]); // Fournisseurs filtrés
  const [orderData, setOrderData] = useState({
    quantity: '',
    supplier: '',
  });

  // Charger les stocks
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

  // Charger les fournisseurs pour un stock spécifique
  const loadSuppliersForStock = (stockId) => {
    console.log("StockId dans la route:", stockId)
    GetFournisseursToStockById(stockId)
        .then((data) => {
          setSuppliers(data.Fournisseurs || []); // Met à jour la liste des fournisseurs pour ce stock
        })
        .catch((error) => {
          console.error('Erreur lors de la récupération des fournisseurs :', error);
          setSuppliers([]); // Vide la liste en cas d'erreur
        });
  };

  // Gestion de la sélection du stock pour la commande
  const handleStockSelection = (stockId) => {
    if (selectedStockId === stockId) {
      // Si le même stock est sélectionné, désactive le formulaire
      setSelectedStockId(null);
      setSuppliers([]); // Vide les fournisseurs
    } else {
      // Sinon, met à jour l'ID du stock et charge les fournisseurs
      setSelectedStockId(stockId);
      loadSuppliersForStock(stockId);
    }
  };

  // Gestion des changements dans le formulaire
  const handleOrderInputChange = (e) => {
    const { name, value } = e.target;
    setOrderData((prevState) => ({ ...prevState, [name]: value }));
  };

  // Soumission du formulaire de commande
  const handleSubmitOrder = (e) => {
    e.preventDefault();
    const stock = stocks.find((s) => s.idstock === selectedStockId);

    const datahistorique = {
      idstock: stock.idstock,
      idfournisseur: parseInt(orderData.supplier, 10),
      quantite_commande: parseInt(orderData.quantity, 10),
      date_livraison: new Date().toISOString(), // Par défaut, maintenant
      date_commande: new Date().toISOString(), // Maintenant
      statut_commande: "En attente", // Statut initial
    };
    console.log("Body pour l'historique :", datahistorique);

    console.log('Nouvelle commande:', { ...orderData, stock });
    // Add quantity in stocks
    addQuantity(stock.idstock, orderData.quantity)
        .then(() => {
          // Mettre à jour la quantité localement
          setStocks((prevStocks) =>
              prevStocks.map((s) =>
                  s.idstock === stock.idstock
                      ? { ...s, quantite: s.quantite + parseInt(orderData.quantity) }
                      : s
              )
          );
        })
        .catch((error) => {
          console.error('Erreur lors de l ajout de quantité de stocks :', error);
          alert('Erreur lors de la commande. Veuillez réessayer.');
        });

    // Ajout de la commande à l'historique
    addCommandeStocks(datahistorique)
        .then()
        .catch((error) => {
          console.error('Erreur lors de l ajout de quantité de stocks :', error);
          alert('Erreur lors de l ajout a l historique. Veuillez réessayer.');
        });

    alert('Commande envoyée avec succès !');
    setSelectedStockId(null);
    setOrderData({ quantity: '', supplier: '' });
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

        <table>
          <thead>
          <tr>
            <th>Nom</th>
            <th>Quantité</th>
            <th>Seuil Minimal</th>
            <th>Unité</th>
            <th>Actions</th>
          </tr>
          </thead>
          <tbody>
          {stocks.map((stock) => (
              <React.Fragment key={stock.idstock}>
                <tr>
                  <td>{stock.nom_ingredient}</td>
                  <td>{stock.quantite}</td>
                  <td>{stock.seuil_minimal}</td>
                  <td>{stock.unite}</td>
                  <td>
                    <button onClick={() => handleStockSelection(stock.idstock)}>
                      {selectedStockId === stock.idstock ? 'Annuler' : 'Passer une commande'}
                    </button>
                  </td>
                </tr>
                {selectedStockId === stock.idstock && (
                    <tr>
                      <td colSpan="5">
                        <form onSubmit={handleSubmitOrder} className="order-form">
                          <h4>Commande pour {stock.nom_ingredient}</h4>
                          <label>
                            Quantité :
                            <input
                                type="number"
                                name="quantity"
                                value={orderData.quantity}
                                onChange={handleOrderInputChange}
                                required
                            />
                          </label>
                          <label>
                            Fournisseur :
                            <select
                                name="supplier"
                                value={orderData.supplier}
                                onChange={handleOrderInputChange}
                                required
                            >
                              <option value="">Sélectionner un fournisseur</option>
                              {suppliers.map((supplier) => (
                                  <option key={supplier.idfournisseur} value={supplier.idfournisseur}>
                                    {supplier.nom_fournisseur}
                                  </option>
                              ))}
                            </select>
                          </label>
                          <button type="submit">Envoyer la commande</button>
                        </form>
                      </td>
                    </tr>
                )}
              </React.Fragment>
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
