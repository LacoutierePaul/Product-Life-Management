const BASE_URL="http://localhost:3000";

export const getControleQualites = async()=>{
    const response = await fetch(`${BASE_URL}/controlequalite`);
    if (!response.ok){
        throw new Error('Erreur HTTP ! status : ${response.status}');
    }
    return response.json();
}

export const addControleQualite = async(data) =>{
    const response = await fetch(`${BASE_URL}/controlequalite`,{
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

export const updateControleQualite = async(idcontrolequalite, data) =>{
    const response = await fetch(`${BASE_URL}/controlequalite/${idcontrolequalite}`,{
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

export const deleteControleQualite = async (idcontrolequalite) => {
    const response = await fetch(`${BASE_URL}/controlequalite/${idcontrolequalite}`, {
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
