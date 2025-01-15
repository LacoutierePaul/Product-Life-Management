import React, { useState, useEffect } from 'react';
import './stocks.css';
import { Bar } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';
import annotationPlugin from 'chartjs-plugin-annotation';

import { getStocks, addQuantity, deleteStock, updateStock } from '../../api/stocks';
import { GetFournisseursToStockById } from "../../api/fournisseurstostocks.js";
import { addCommandeStocks } from "../../api/commandes_stocks.js";

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend,annotationPlugin);

function Stocks() {
  const [stocks, setStocks] = useState([]);
  const [selectedStockId, setSelectedStockId] = useState(null); // ID du stock sélectionné pour commande
  const [editingStockId, setEditingStockId] = useState(null); // ID du stock en cours de modification
  const [suppliers, setSuppliers] = useState([]);
  const [orderData, setOrderData] = useState({ quantity: '', supplier: '' });
  const [editData, setEditData] = useState({ nom_ingredient: '', quantite: '', seuil_minimal: '', unite: '' });

  // Charger les stocks
  useEffect(() => {
    getStocks()
      .then((data) => setStocks(data))
      .catch((error) => console.error('Erreur lors de la récupération des stocks :', error));
  }, []);

  // Charger les fournisseurs pour un stock spécifique
  const loadSuppliersForStock = (stockId) => {
    GetFournisseursToStockById(stockId)
      .then((data) => setSuppliers(data.Fournisseurs || []))
      .catch(() => setSuppliers([]));
  };

  // Gestion de la sélection du stock pour la commande
  const handleStockSelection = (stockId) => {
    if (selectedStockId === stockId) {
      setSelectedStockId(null);
      setSuppliers([]);
    } else {
      setSelectedStockId(stockId);
      loadSuppliersForStock(stockId);
    }
  };

  // Gestion des changements dans le formulaire de commande
  const handleOrderInputChange = (e) => {
    const { name, value } = e.target;
    setOrderData((prev) => ({ ...prev, [name]: value }));
  };

  // Soumission de la commande
  const handleSubmitOrder = (e) => {
    e.preventDefault();
    const stock = stocks.find((s) => s.idstock === selectedStockId);

    const datahistorique = {
      idstock: stock.idstock,
      idfournisseur: parseInt(orderData.supplier, 10),
      quantite_commande: parseInt(orderData.quantity, 10),
      date_livraison: new Date().toISOString(),
      date_commande: new Date().toISOString(),
      statut_commande: "En attente",
    };

    addQuantity(stock.idstock, orderData.quantity)
      .then(() => {
        setStocks((prev) =>
          prev.map((s) => (s.idstock === stock.idstock ? { ...s, quantite: s.quantite + parseInt(orderData.quantity) } : s))
        );
        alert('Commande envoyée avec succès !');
      })
      .catch(() => alert('Erreur lors de la commande. Veuillez réessayer.'));

    addCommandeStocks(datahistorique).catch(() =>
      alert('Erreur lors de l ajout à l historique. Veuillez réessayer.')
    );

    setSelectedStockId(null);
    setOrderData({ quantity: '', supplier: '' });
  };

  // Gestion de la modification du stock
  const handleEditStock = (stock) => {
    setEditingStockId(stock.idstock);
    setEditData({
      nom_ingredient: stock.nom_ingredient,
      quantite: stock.quantite,
      seuil_minimal: stock.seuil_minimal,
      unite: stock.unite,
    });
  };

  const handleEditInputChange = (e) => {
    const { name, value } = e.target;
    setEditData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmitEdit = (e) => {
    e.preventDefault();
    updateStock(editingStockId, editData)
      .then(() => {
        setStocks((prev) =>
          prev.map((stock) =>
            stock.idstock === editingStockId ? { ...stock, ...editData } : stock
          )
        );
        setEditingStockId(null);
        alert('Stock mis à jour avec succès !');
      })
      .catch(() => alert('Erreur lors de la mise à jour du stock. Veuillez réessayer.'));
  };

  const handleDeleteStock = (idstock) => {
    if (window.confirm('Voulez-vous vraiment supprimer ce stock ?')) {
      deleteStock(idstock)
        .then(() => setStocks((prev) => prev.filter((stock) => stock.idstock !== idstock)))
        .catch(() => alert('Erreur lors de la suppression du stock.'));
    }
  };




  const chartData = {
    labels: stocks.map((stock) => stock.nom_ingredient),
    datasets: [
      {
        label: 'Quantité de Stock',
        data: stocks.map((stock) => stock.quantite),
        backgroundColor: stocks.map((stock) =>
          stock.quantite < stock.seuil_minimal ? 'rgba(255, 99, 132, 0.6)' : 'rgba(76, 189, 53, 0.6)'
        ),
        borderColor: stocks.map((stock) =>
          stock.quantite < stock.seuil_minimal ? 'rgba(255, 99, 132, 1)' : 'rgb(65, 199, 65)'
        ),
        borderWidth: 1,
      }
    ],
  };

  const chartOptions = {
    scales: {
      y: {
        beginAtZero: true,
      },
    },
    plugins: {
      annotation: {
        annotations: {
          line1: {
            type: 'line',
            yMin: 0,
            yMax: 0,
            borderColor: 'red',
            borderWidth: 2,
          },
        },
      },
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
              <tr className={stock.quantite < stock.seuil_minimal ? 'low-stock' : ''}>
                <td>{stock.nom_ingredient}</td>
                <td>{stock.quantite}</td>
                <td>{stock.seuil_minimal}</td>
                <td>{stock.unite}</td>
                <td>
                  <button className="btn-modifier"onClick={() => handleEditStock(stock)}>Modifier</button>
                  <button className="btn-supprimer" onClick={() => handleDeleteStock(stock.idstock)}>Supprimer</button>
                  <button onClick={() => handleStockSelection(stock.idstock)}>
                    {selectedStockId === stock.idstock ? 'Annuler' : 'Passer une commande'}
                  </button>
                </td>
              </tr>
              {editingStockId === stock.idstock && (
                <tr>
                  <td colSpan="5">
                    <form onSubmit={handleSubmitEdit}>
                      <label>
                        Nom:
                        <input
                          type="text"
                          name="nom_ingredient"
                          value={editData.nom_ingredient}
                          onChange={handleEditInputChange}
                          required
                        />
                      </label>
                      <label>
                        Quantité:
                        <input
                          type="number"
                          name="quantite"
                          value={editData.quantite}
                          onChange={handleEditInputChange}
                          required
                        />
                      </label>
                      <label>
                        Seuil Minimal:
                        <input
                          type="number"
                          name="seuil_minimal"
                          value={editData.seuil_minimal}
                          onChange={handleEditInputChange}
                          required
                        />
                      </label>
                      <label>
                        Unité:
                        <input
                          type="text"
                          name="unite"
                          value={editData.unite}
                          onChange={handleEditInputChange}
                          required
                        />
                      </label>
                      <button type="submit">Valider</button>
                    </form>
                  </td>
                </tr>
              )}
              {selectedStockId === stock.idstock && (
                <tr>
                  <td colSpan="5">
                    <form onSubmit={handleSubmitOrder}>
                      <label>
                        Quantité:
                        <input
                          type="number"
                          name="quantity"
                          value={orderData.quantity}
                          onChange={handleOrderInputChange}
                          required
                        />
                      </label>
                      <label>
                        Fournisseur:
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
