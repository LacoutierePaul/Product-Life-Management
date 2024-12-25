const BASE_URL="http://localhost:3000";

export const GetRecettes = async() => {
    const response = await fetch(`${BASE_URL}/recettes`);
    if (!response.ok){
        throw new Error('Erreur HTTP ! status : ${response.status}');
    }
    return response.json();
};

export const AddRecette = async(data) =>{
    const response = await fetch(`${BASE_URL}/recettes`,{
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

export const UpdateRecette = async(idrecette, data) =>{
    const response = await fetch(`${BASE_URL}/recettes/${idrecette}`,{
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

export const DeleteRecette = async(idrecette) =>{
    const response = await fetch(`${BASE_URL}/recettes/${idrecette}`,{
        method: "DELETE",
    });
    if (!response.ok){
        throw new Error('Erreur HTTP ! status : ${response.status}');
    }
    return response.json();
}

