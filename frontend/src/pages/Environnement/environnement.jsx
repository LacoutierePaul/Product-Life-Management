import { useState } from 'react';

function Environnement() {
  const [suivi, setSuivi] = useState({
    eau: 1200,  // Consommation d'eau en litres
    energie: 500,  // Consommation d'énergie en kWh
    dechets: 250,  // Quantité de déchets en kg
  });

  const handleChange = (e) => {
    setSuivi({ ...suivi, [e.target.name]: e.target.value });
  };

  return (
    <div>
      <h2>Suivi Environnemental</h2>
      <form>
        <div>
          <label>Consommation d'eau (litres) :</label>
          <input 
            type="number" 
            name="eau" 
            value={suivi.eau} 
            onChange={handleChange}
          />
        </div>
        <div>
          <label>Consommation d'énergie (kWh) :</label>
          <input 
            type="number" 
            name="energie" 
            value={suivi.energie} 
            onChange={handleChange}
          />
        </div>
        <div>
          <label>Déchets produits (kg) :</label>
          <input 
            type="number" 
            name="dechets" 
            value={suivi.dechets} 
            onChange={handleChange}
          />
        </div>
      </form>
      <div>
        <h3>Graphiques et Objectifs</h3>
        {/* Tu peux ajouter des graphiques ici si nécessaire */}
      </div>
    </div>
  );
}

export default Environnement;
