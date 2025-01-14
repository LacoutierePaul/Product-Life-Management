const BASE_URL="http://localhost:3000";

export const GetFournisseursToStocks = async() => {
    const response = await fetch(`${BASE_URL}/fournisseurstostocks`);
    if (!response.ok){
        throw new Error('Erreur HTTP ! status : ${response.status}');
    }
    return response.json();
};

export const GetFournisseursToStockById = async (idstock) => {
    console.log(idstock)
    const response = await fetch(`${BASE_URL}/fournisseurstostocks/${idstock}`);
    if (!response.ok) {
        throw new Error(`Erreur HTTP ! status : ${response.status}`);
    }
    return response.json();
};