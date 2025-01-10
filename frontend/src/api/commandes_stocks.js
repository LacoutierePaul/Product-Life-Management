const BASE_URL = "http://localhost:3000";

export const getCommandeStocks = async () => {
    const response = await fetch(`${BASE_URL}/commandesstocks`);
    if (!response.ok) {
        throw new Error(`Erreur HTTP ! statut : ${response.status}`);
    }
    if (response.status === 204 || response.status === 200 && response.headers.get("Content-Length") === "0") {
        return;
    }
    return response.json();
};

export const addCommandeStocks = async (data) => {
    const response = await fetch(`${BASE_URL}/commandesstocks`, {
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

export const updateCommandeStocks = async (idcommandestocks, data) => {
    const response = await fetch(`${BASE_URL}/commandesstocks/${idcommandestocks}`, {
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

export const deleteCommandeStocks = async (idcommandestocks) => {
    const response = await fetch(`${BASE_URL}/commandesstocks/${idcommandestocks}`, {
        method: "DELETE",
    });
    if (!response.ok) {
        throw new Error(`Erreur HTTP ! statut : ${response.status}`);
    }
    if (response.status === 204 || response.status === 200 && response.headers.get("Content-Length") === "0") {
        return;
    }
    return await response.json();
};