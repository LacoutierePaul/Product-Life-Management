import React, { useState, useEffect } from 'react';
import { Line } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend } from 'chart.js';
import './qualite.css';
import { getControleQualites, updateControleQualite, deleteControleQualite, addControleQualite } from '../../api/controle_qualite';

// Enregistrement des composants nécessaires pour Chart.js
ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

function Qualite() {
  const [controleQualite, setControleQualite] = useState([]);
  const [newControle, setNewControle] = useState({
    idproductionplanifiee: '',
    updatedAt: '',
    resultat: '',
    commentaire_controle: ''
  });

  const [showForm, setShowForm] = useState(false);
  const [searchTerm, setSearchTerm] = useState(''); // State for search term
  const [editingId, setEditingId] = useState(null);

  const fetchControleQualite = async () => {
    try {
      const data = await getControleQualites();
      setControleQualite(data);
    } catch (error) {
      console.error('Erreur lors de la récupération des contrôles qualité:', error);
    }
  };

  useEffect(() => {
    fetchControleQualite();
  }, []);

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setNewControle((prevState) => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };


  const filteredControleQualite = controleQualite.filter((controle) => {
    return (
      controle.idproductionplanifiee.toString().includes(searchTerm) ||
      controle.resultat.toLowerCase().includes(searchTerm.toLowerCase()) ||
      controle.commentaire_controle.toLowerCase().includes(searchTerm.toLowerCase())
    );
  });


  const handleSubmit = async (event) => {
    event.preventDefault();

    if (editingId !== null) {
      try {
        await updateControleQualite(editingId, newControle);
        setControleQualite((prevState) =>
          prevState.map((controle) =>
            controle.idcontrole === editingId ? { ...controle, ...newControle } : controle
          )
        );
      } catch (error) {
        console.error('Erreur lors de la mise à jour du contrôle qualité:', error);
      }
    } else {
      try {
        const createdControle = await addControleQualite(newControle);
        setControleQualite((prevState) => [...prevState, createdControle]);
      } catch (error) {
        console.error("Erreur lors de l'ajout du contrôle qualité:", error);
      }
    }

    setNewControle({
      idproductionplanifiee: '',
      updatedAt: '',
      resultat: '',
      commentaire_controle: ''
    });
    setShowForm(false);
    setEditingId(null);
  };

  const handleDeleteWithConfirmation = async (id) => {
    const confirmDelete = window.confirm('Êtes-vous sûr de vouloir supprimer ce contrôle qualité ?');
    if (confirmDelete) {
      handleDelete(id);
    }
  };

  const handleDelete = async (id) => {
    try {
      await deleteControleQualite(id);
      setControleQualite((prevState) =>
        prevState.filter((controle) => controle.idcontrole !== id)
      );
    } catch (error) {
      console.error('Erreur lors de la suppression du contrôle qualité:', error);
    }
  };

  const handleEdit = (controle) => {
    setNewControle({
      idproductionplanifiee: controle.idproductionplanifiee,
      updatedAt: controle.updatedAt,
      resultat: controle.resultat,
      commentaire_controle: controle.commentaire_controle
    });
    setEditingId(controle.idcontrole);
    setShowForm(true);
  };
  const getGraphData = () => {
    const dateLabels = [];
    const passData = [];
    const failData = [];

    let passCount = 0;
    let failCount = 0;

    // Regrouper les résultats par date
    controleQualite.forEach((controle) => {
      const date = new Date(controle.updatedAt).toLocaleDateString(); // Format de date
      const index = dateLabels.indexOf(date);

      // Si la date n'est pas encore dans le tableau des labels, on l'ajoute
      if (index === -1) {
        dateLabels.push(date);
        passData.push(passCount); // Ajouter le cumul actuel de Pass
        failData.push(failCount); // Ajouter le cumul actuel de Fail
      }

      // Trouver l'indice de la date dans le tableau
      const dateIndex = dateLabels.indexOf(date);

      // Ajouter à la somme cumulative "Pass" ou "Fail" pour cette date
      if (controle.resultat === 'Pass') {
        passCount++;
      } else if (controle.resultat === 'Fail') {
        failCount++;
      }

      // Mettre à jour les données cumulées à chaque itération
      passData[dateIndex] = passCount;
      failData[dateIndex] = failCount;
    });

    // Vérifier que les données sont bien structurées
    console.log("Labels: ", dateLabels);
    console.log("Pass Data: ", passData);
    console.log("Fail Data: ", failData);

    return {
      labels: dateLabels,
      datasets: [
        {
          label: 'Pass',
          data: passData,
          borderColor: 'green',
          fill: false,
          tension: 0.1,
        },
        {
          label: 'Fail',
          data: failData,
          borderColor: 'red',
          fill: false,
          tension: 0.1,
        },
      ],
    };
  };



  return (
    <div className="qualite">
      <h2>Contrôle Qualité</h2>

      <button onClick={() => setShowForm(!showForm)}>
        {showForm ? 'Annuler' : 'Ajouter un contrôle qualité'}
      </button>

      {showForm && (
        <form onSubmit={handleSubmit} className="ajout-controle-form">
          <div>
            <label htmlFor="idproductionplanifiee">ID de Production:</label>
            <input
              type="number"
              id="idproductionplanifiee"
              name="idproductionplanifiee"
              value={newControle.idproductionplanifiee}
              onChange={handleInputChange}
              required
            />
          </div>

          <div>
            <label htmlFor="updatedAt">Date du Contrôle:</label>
            <input
              type="date"
              id="updatedAt"
              name="updatedAt"
              value={newControle.updatedAt}
              onChange={handleInputChange}
              required
            />
          </div>

          <div>
            <label htmlFor="resultat">Résultat:</label>
            <select
              id="resultat"
              name="resultat"
              value={newControle.resultat}
              onChange={handleInputChange}
              required
            >
              <option value="">Sélectionner</option>
              <option value="Pass">Pass</option>
              <option value="Fail">Fail</option>
            </select>
          </div>

          <div>
            <label htmlFor="commentaire_controle">Commentaire:</label>
            <textarea
              id="commentaire_controle"
              name="commentaire_controle"
              value={newControle.commentaire_controle}
              onChange={handleInputChange}
              required
            />
          </div>

          <button type="submit">
            {editingId !== null ? 'Modifier le contrôle qualité' : 'Ajouter le contrôle qualité'}
          </button>
        </form>
      )}
      <div className="search-bar">
        <input
          type="text"
          placeholder="Rechercher un controle qualité..."
          value={searchTerm}
          onChange={handleSearchChange}
        />
      </div>
      <table>
        <thead>
          <tr>
            <th>Produit Fini</th>
            <th>Date du Contrôle</th>
            <th>Résultat</th>
            <th>Commentaire</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {filteredControleQualite.map((controle) => (
            <tr key={controle.idcontrole}>
              <td>{controle.idproductionplanifiee}</td>
              <td>{new Date(controle.updatedAt).toLocaleDateString()}</td>
              <td className={controle.resultat === 'Pass' ? 'resultat-pass' : 'resultat-fail'}>
                {controle.resultat}
              </td>
              <td>{controle.commentaire_controle}</td>
              <td>
                <button className="btn-modifier" onClick={() => handleEdit(controle)}>
                  Modifier
                </button>
                <button
                  className="btn-supprimer"
                  onClick={() => handleDeleteWithConfirmation(controle.idcontrole)}
                >
                  Supprimer
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <div style={{ position: 'relative', width: '70%', height: '400px' }}>
        <Line data={getGraphData()} options={{ responsive: true, maintainAspectRatio: true }} />
      </div>
    </div>
  );
}

export default Qualite;
