import React, { useState, useEffect } from 'react';
import './fournisseurs.css';

function Fournisseurs() {
  //const [fournisseurs, setFournisseurs] = useState([]);

  const fournisseursFictifs = [
    {
      id: 1,
      nom: "La Ferme des Prés",
      contact: "contact@fermedespres.fr",
      matiere_premiere: "Lait Cru",
      date_derniere_livraison: "2024-04-15",
      evaluation: 5,
      commentaires: "Excellent service"
    },
    {
      id: 2,
      nom: "Crèmerie Belle Laitière",
      contact: "info@bellelaitiere.fr",
      matiere_premiere: "Crème Fraîche",
      date_derniere_livraison: "2024-04-10",
      evaluation: 4,
      commentaires: "Livraison rapide"
    },
    {
      id: 3,
      nom: "Beurrier du Terroir",
      contact: "ventes@beurrierduterroir.fr",
      matiere_premiere: "Beurre Fermier",
      date_derniere_livraison: "2024-04-12",
      evaluation: 5,
      commentaires: "Qualité exceptionnelle"
    }
  ];

  const [showForm, setShowForm] = useState(false);

  const [newFournisseur, setNewFournisseur] = useState({

    nom: '',

    contact: '',

    matiere_premiere: '',

    date_derniere_livraison: '',

    evaluation: 0,

    commentaires: ''

  });

  const [fournisseurs, setFournisseurs] = useState(fournisseursFictifs); // Utilisation des données fictives


  useEffect(() => {
    // Exemple de fetch pour récupérer les fournisseurs depuis l'API
    fetch('/api/fournisseurs')
      .then((response) => response.json())
      .then((data) => setFournisseurs(data));
  }, []);


  const handleInputChange = (e) => {

    const { name, value } = e.target;

    setNewFournisseur({

      ...newFournisseur,

      [name]: value

    });

  };



  const handleSubmit = (e) => {

    e.preventDefault();

    // Ajouter un nouvel ID basé sur la longueur actuelle du tableau

    const newFournisseurWithId = {

      ...newFournisseur,

      id: fournisseurs.length + 1

    };

    setFournisseurs([...fournisseurs, newFournisseurWithId]);

    setShowForm(false); // Fermer le formulaire après l'ajout

    setNewFournisseur({

      nom: '',

      contact: '',

      matiere_premiere: '',

      date_derniere_livraison: '',

      evaluation: 0,

      commentaires: ''

    });

  };

  return (
    <div className="fournisseurs">
      <h2>Liste des Fournisseurs</h2>

      {/* Bouton pour afficher le formulaire d'ajout */}

      <button onClick={() => setShowForm(!showForm)}>

        {showForm ? 'Annuler' : 'Ajouter un Fournisseur'}

      </button>



      {/* Formulaire d'ajout de fournisseur */}

      {showForm && (

        <form onSubmit={handleSubmit}>

          <div>

            <label>Nom:</label>

            <input

              type="text"

              name="nom"

              value={newFournisseur.nom}

              onChange={handleInputChange}

              required

            />

          </div>

          <div>

            <label>Contact:</label>

            <input

              type="email"

              name="contact"

              value={newFournisseur.contact}

              onChange={handleInputChange}

              required

            />

          </div>

          <div>

            <label>Matière Première:</label>

            <input

              type="text"

              name="matiere_premiere"

              value={newFournisseur.matiere_premiere}

              onChange={handleInputChange}

              required

            />

          </div>

          <div>

            <label>Date Dernière Livraison:</label>

            <input

              type="date"

              name="date_derniere_livraison"

              value={newFournisseur.date_derniere_livraison}

              onChange={handleInputChange}

              required

            />

          </div>

          <div>

            <label>Évaluation:</label>

            <input

              type="number"

              name="evaluation"

              value={newFournisseur.evaluation}

              onChange={handleInputChange}

              min="1"

              max="5"

              required

            />

          </div>

          <div>

            <label>Commentaires:</label>

            <textarea

              name="commentaires"

              value={newFournisseur.commentaires}

              onChange={handleInputChange}

            ></textarea>

          </div>

          <button type="submit">Ajouter le Fournisseur</button>

        </form>

      )}



      {/* Table des fournisseurs */}      
      <table>
        <thead>
          <tr>
            <th>Nom</th>
            <th>Contact</th>
            <th>Matière Première</th>
            <th>Date Dernière Livraison</th>
            <th>Évaluation</th>
            <th>Commentaires</th>
          </tr>
        </thead>
        <tbody>
          {fournisseurs.map((fournisseur) => (
            <tr key={fournisseur.id}>
              <td>{fournisseur.nom}</td>
              <td>{fournisseur.contact}</td>
              <td>{fournisseur.matiere_premiere}</td>
              <td>{new Date(fournisseur.date_derniere_livraison).toLocaleDateString()}</td>
              <td>{fournisseur.evaluation}</td>
              <td>{fournisseur.commentaires}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default Fournisseurs;
