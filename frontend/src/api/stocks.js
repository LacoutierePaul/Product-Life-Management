const BASE_URL = "http://localhost:3000"; // Remplacez par l'URL de votre backend

export const getStocks = async () => {
    const response = await fetch(`${BASE_URL}/stocks`);
    if (!response.ok) {
        throw new Error(`Erreur HTTP ! statut : ${response.status}`);
    }
    return response.json();
};

export const addStock = async (data) => {
    const response = await fetch(`${BASE_URL}/stocks`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
    });
    if (!response.ok) {
        throw new Error(`Erreur HTTP ! statut : ${response.status}`);
    }
    return response.json();
};

export const updateStock = async (idstock, data) => {
    const response = await fetch(`${BASE_URL}/stocks/${idstock}`, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
    });
    if (!response.ok) {
        throw new Error(`Erreur HTTP ! statut : ${response.status}`);
    }
    return response.json();
};

export const deleteStock = async (idstock) => {
    const response = await fetch(`${BASE_URL}/stocks/${idstock}`, {
        method: "DELETE",
    });
    if (!response.ok) {
        throw new Error(`Erreur HTTP ! statut : ${response.status}`);
    }
    if (response.status === 204 || response.status === 200 && response.headers.get("Content-Length") === "0") {
        // Retournez simplement un succès si la réponse est vide
        return;
      }
    return await response.json();
};

export const addQuantity = async (idstock, quantity) => {
    const response = await fetch(`${BASE_URL}/stocks/add/${idstock}/${quantity}`);
    if (!response.ok) {
        throw new Error(`Erreur HTTP ! statut : ${response.status}`);
    }
    return response.json();
};

export const removeQuantity = async (idstock, quantity) => {
    const response = await fetch(`${BASE_URL}/stocks/remove/${idstock}/${quantity}`);
    if (!response.ok) {
        throw new Error(`Erreur HTTP ! statut : ${response.status}`);
    }
    return response.json();
};

export const checkStockForOrder = async (data) => {
    const response = await fetch(`${BASE_URL}/stocks/check-stock`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
    });
    if (!response.ok) {
        throw new Error(`Erreur HTTP ! statut : ${response.status}`);
    }
    return response.json();
};