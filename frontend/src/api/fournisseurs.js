const BASE_URL = "http://localhost:3000";

export const getFournisseurs = async()=> {
    const response = await fetch(`${BASE_URL}/fournisseurs`);
    if (!response.ok){
        throw new Error('Erreur HTTP ! status : ${response.status}');
    }
    return response.json();
}

export const addFournisseur = async(data) =>{
    const response = await fetch(`${BASE_URL}/fournisseurs`,{
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
    });
    if (!response.ok){
        throw new Error('Erreur HTTP ! status : ${response.status}');
    }
    return response.json();
}

export const updateFournisseur = async(idfournisseur, data) =>{
    const response = await fetch(`${BASE_URL}/fournisseurs/${idfournisseur}`,{
        method: "PUT",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
    });
    if (!response.ok){
        throw new Error('Erreur HTTP ! status : ${response.status}');
    }
    return response.json();
}

export const deleteFournisseur = async (idfournisseur) => {
    const response = await fetch(`${BASE_URL}/fournisseurs/${idfournisseur}`, {
      method: 'DELETE',
    });
  
    // Vérifiez si la réponse est vide avant d'appeler `.json()`
    if (!response.ok) {
      throw new Error(`Erreur HTTP: ${response.status}`);
    }
    if (response.status === 204 || response.status === 200 && response.headers.get("Content-Length") === "0") {
      // Retournez simplement un succès si la réponse est vide
      return;
    }
    
    return await response.json();
  };
  

export const getFournisseur = async(idfournisseur) =>{
    const response = await fetch(`${BASE_URL}/fournisseurs/${idfournisseur}`);
    if (!response.ok){
        throw new Error('Erreur HTTP ! status : ${response.status}');
    }
    return response.json();
}