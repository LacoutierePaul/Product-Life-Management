import { useState } from 'react';

function Qualite() {
  const [controles, setControles] = useState([]);
  const [lot, setLot] = useState('');
  const [resultat, setResultat] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    setControles([...controles, { lot, resultat }]);
    setLot('');
    setResultat('');
  };

  return (
    <div>
      <h2>Suivi de la Qualité des Produits</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Numéro de lot :</label>
          <input 
            type="text" 
            value={lot} 
            onChange={(e) => setLot(e.target.value)} 
          />
        </div>
        <div>
          <label>Résultat (Passé/Échoué) :</label>
          <select 
            value={resultat} 
            onChange={(e) => setResultat(e.target.value)}
          >
            <option value="">Choisir</option>
            <option value="Passé">Passé</option>
            <option value="Échoué">Échoué</option>
          </select>
        </div>
        <button type="submit">Enregistrer le contrôle</button>
      </form>

      <h3>Historique des Contrôles Qualité</h3>
      <table>
        <thead>
          <tr>
            <th>Numéro de lot</th>
            <th>Résultat</th>
          </tr>
        </thead>
        <tbody>
          {controles.map((controle, index) => (
            <tr key={index}>
              <td>{controle.lot}</td>
              <td>{controle.resultat}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default Qualite;
