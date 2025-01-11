const BASE_URL="http://localhost:3000";

export const GetRecettesWithStocks = async() => {
    const response = await fetch(`${BASE_URL}/recettestostocks`);
    if (!response.ok){
        throw new Error('Erreur HTTP ! status : ${response.status}');
    }
    return response.json();
};