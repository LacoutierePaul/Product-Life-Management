import React, { useState, useEffect } from 'react';
import './planification.css';
import { 
  getProductionPlanifiee, 
  updateProductionPlanifiee, 
  deleteProductionPlanifiee, 
  addProductionPlanifiee 
} from '../../api/production_planifiee';

function Planification() {
  // État pour gérer les productions et le formulaire
  const [productions, setProductions] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [newProduction, setNewProduction] = useState({
    produit_fini: '',
    quantite_planifiee: '',
    updatedAt: '',
    status: 'En attente',
  });

  // Chargement des données depuis l'API au montage du composant
  useEffect(() => {
    const fetchProductions = async () => {
      try {
        const data = await getProductionPlanifiee();
        setProductions(data);
      } catch (error) {
        console.error('Erreur lors de la récupération des données :', error);
      }
    };

    fetchProductions();
  }, []);

  // Gère les changements dans le formulaire
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewProduction({
      ...newProduction,
      [name]: value,
    });
  };

  // Ajoute ou modifie une production via l'API
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (newProduction.idproductionplanifiee) {
        await updateProductionPlanifiee(newProduction);
        setProductions((prev) =>
          prev.map((prod) => (prod.idproductionplanifiee === newProduction.idproductionplanifiee ? newProduction : prod))
        );
      } else {
        const addedProduction = await addProductionPlanifiee(newProduction);
        setProductions((prev) => [...prev, addedProduction]);
      }
      setShowForm(false);
      setNewProduction({
        produit_fini: '',
        quantite_planifiee: '',
        updatedAt : '',
        status: 'En attente',
      });
    } catch (error) {
      console.error('Erreur lors de la soumission :', error);
    }
  };

  // Supprime une production via l'API
  const handleDelete = async (idproductionplanifiee) => {
    try {
      await deleteProductionPlanifiee(idproductionplanifiee);
      setProductions((prev) => prev.filter((prod) => prod.idproductionplanifiee !== idproductionplanifiee));
    } catch (error) {
      console.error('Erreur lors de la suppression :', error);
    }
  };

  // Prépare le formulaire pour la modification
  const handleEdit = (production) => {
    setNewProduction(production);
    setShowForm(true);
  };

  return (
    <div className="planification">
      <h2>Planification de la Production</h2>

      {/* Bouton pour afficher ou masquer le formulaire d'ajout */}
      <button onClick={() => setShowForm(!showForm)}>
        {showForm ? 'Annuler' : 'Ajouter une Planification'}
      </button>

      {/* Formulaire d'ajout ou de modification de planification */}
      {showForm && (
        <form onSubmit={handleSubmit}>
          <div>
            <label>Produit Fini:</label>
            <input
              type="text"
              name="produit_fini"
              value={newProduction.produit_fini}
              onChange={handleInputChange}
              required
            />
          </div>
          <div>
            <label>Quantité Planifiée:</label>
            <input
              type="number"
              name="quantite_planifiee"
              value={newProduction.quantite_planifiee}
              onChange={handleInputChange}
              required
            />
          </div>
          <div>
            <label>Date de Production:</label>
            <input
              type="date"
              name="date_production"
              value={newProduction.updatedAt}
              onChange={handleInputChange}
              required
            />
          </div>
          <div>
            <label>Status:</label>
            <select
              name="status"
              value={newProduction.status}
              onChange={handleInputChange}
            >
              <option value="Terminé">Terminé</option>
              <option value="En cours">En cours</option>
              <option value="En attente">En attente</option>
            </select>
          </div>
          <button type="submit">{newProduction.id ? 'Modifier' : 'Ajouter'}</button>
        </form>
      )}

      {/* Tableau de la planification */}
      <table>
        <thead>
          <tr>
            <th>Produit Fini</th>
            <th>Quantité Planifiée</th>
            <th>Date de Production</th>
            <th>Status</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {productions.map((production) => (
            <tr key={production.idproductionplanifiee}>
              <td>{production.produit_fini}</td>
              <td>{production.quantite_planifiee}</td>
              <td>{new Date(production.updatedAt).toLocaleDateString()}</td>
              <td>{production.status}</td>
              <td>
                <button className="modifier" onClick={() => handleEdit(production)}>
                  Modifier
                </button>
                <button className="supprimer" onClick={() => handleDelete(production.idproductionplanifiee)}>
                  Supprimer
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default Planification;
